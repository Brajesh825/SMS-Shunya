import React, { useState } from "react";
import { Link } from "react-router-dom";
import AccountSetting from "./accountSetting";
import SecuritySetting from "./securitySetting";
import RoleSetting from "./roleSetting";
import { useEffect } from "react";
import { useRef } from "react";

const StudentSettings = () => {
  const [slider, setSlider] = useState("Account");

  const divRef = useRef(null);

  useEffect(() => {
    // Automatically focus the div element when it's rendered
    divRef.current.focus();
  }, []);

  function View() {
    switch (slider) {
      case "Account":
        return <AccountSetting />;
      case "Security":
        return <SecuritySetting />;
      case "Role":
        return <RoleSetting />;
      default:
        return <AccountSetting />;

    }
  }

  return (
    <>
      <div ref={divRef}
        tabIndex={-1} className="fee-structure-main">
        <div className="fee-structure-slider">
          <Link
            className={slider === "Account" ? "active-slider" : ""}
            onClick={() => setSlider("Account")}
          >
            {" "}
            Account Setting
          </Link>
          <Link
            className={slider === "Security" ? "active-slider" : ""}
            onClick={() => setSlider("Security")}
          >
            {" "}
            Login & Security{" "}
          </Link>
          <Link
            className={slider === "Role" ? "active-slider" : ""}
            onClick={() => setSlider("Role")}
          >
            {" "}
            Role & Permissions
          </Link>
        </div>
        {View()}
      </div>
    </>
  );
};

export default StudentSettings;
