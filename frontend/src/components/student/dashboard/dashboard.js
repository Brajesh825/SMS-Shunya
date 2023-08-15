import React, { useRef } from "react";
import { useEffect } from "react";

const StudentDashboard = () => {

  const inputRef = useRef(null);

  useEffect(() => {
    // Automatically focus the input element when it's rendered
    inputRef.current.focus();
  }, []);

  return (
    <div tabIndex={-1} ref={inputRef} className="dashboard-main">
      <div className="dash-action-container">
        <h2>Welcome to your dashboard , P.N Academy</h2>
        <div className="main-faculty">
          <div className="faculty-container">
            <img src="/images/director.jpeg" alt=""></img>
            <span>Dr. Ashok Tiwari </span>
            <span className="title">Director</span>
          </div>
          <div className="faculty-container">
            <img src="/images/principle.jpeg" alt=""></img>
            <span>Mr Lama</span>
            <span className="title">Principle</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
