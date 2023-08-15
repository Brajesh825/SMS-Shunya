import { Outlet } from "react-router-dom";

import { useState } from "react";
import { useEffect } from "react";

const Class = () => {
  let [myClass, setClass] = useState([]);

  useEffect(() => {
    // Fetch All Class
    fetch("/api/v1/class")
      .then((myClass) => myClass.json())
      .then((data) => setClass(data));
  }, []);

  // Add Classes
  const addClass = async (data) => {
    let response = await fetch("/api/v1/class", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    let myClass = await response.json();
    if (myClass.success === "true") {
      setClass((previousState) => {
        return [...previousState, myClass.class];
      });
    }
    return myClass;
  };

  const getAllClass = () => {
    return myClass || [{}];
  };
  const allClasses = getAllClass();
  return (
    <div class="entity-main">
      <Outlet context={{ addClass, allClasses }} />
    </div>
  );
};

export default Class;
