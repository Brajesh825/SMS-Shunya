import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import { useParams } from "react-router";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import StudentSidebar from "../sidebar/studentSidebar";
import Navbar from "../navbar/navbar";

import { useDispatch } from "react-redux";

const StudentLayout = () => {

  const inputRef = useRef(null);
  const handleFocus = () => {
    inputRef.current.focus();
  };

  const dispatch = useDispatch();
  useParams();
  const navigate = useNavigate();

  const [cookies, removeCookie] = useCookies([]);

  // Handling Login Logics

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/student/login");
      }
      const { data } = await axios.post(
        "/api/v1/student/me",
        {},
        { withCredentials: true }
      );
      const { status, name, studentID } = data;

      console.log(data);

      dispatch({ type: "student/add", payload: data });

      return status
        ? toast(`Welcome back ! ${studentID} or should i say ${name}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/student/login"));
    };
    verifyCookie();
  }, [cookies,dispatch,navigate,removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate("/student/login");
  };

  return (
    <>
      <div className="container">
        <ToastContainer />
        <div className="wrapper">
          <StudentSidebar />
          <div className="main">
            <Navbar logout={Logout} handleFocus={handleFocus} />
            <Outlet  />
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentLayout;
