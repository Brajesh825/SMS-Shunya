import React from "react";
import axios from "axios";
import { useEffect } from "react";

import { useState } from "react";
import { useSelector } from "react-redux";

const AccountSetting = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [email, setEmail] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [villageName, setVillage] = useState("");
  const [postName, setPost] = useState("");
  const [policeStation, setPoliceStation] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");

  const [profile, setProfile] = useState("/icons/uploadPhoto.svg");
  const studentID = useSelector((state) => {
    return state?.state?.user?.studentID
  })

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.post(
        "/api/v1/student/me",
        {},
        { withCredentials: true }
      );
      let { name, profilePic, email, mobile, motherName, fatherName, address } = data;
      setName(name);
      setEmail(email);
      setMobile(mobile);
      setMotherName(motherName)
      setFatherName(fatherName)
      if (address) {
        setDistrict(address.district)
        setVillage(address.villageName)
        setPinCode(address.pinCode)
        setPoliceStation(address.policeStation)
        setState(address.state)
        setPost(address.postName)
      }

      if (profilePic) {
        setProfile(profilePic);
      }
    };
    fetchData();
  }, []);

  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]);
    console.log(selectedFile);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handleFatherChange(event) {
    setFatherName(event.target.value);
  }
  function handleMotherChange(event) {
    setMotherName(event.target.value);
  }
  function handleMobileChange(event) {
    setMobile(event.target.value);
  }
  function handleVillageChange(event) {
    setVillage(event.target.value);
  }
  function handlePostChange(event) {
    setPost(event.target.value);
  }
  function handlePoliceStationChange(event) {
    setPoliceStation(event.target.value);
  }
  function handlePinCodeChange(event) {
    setPinCode(event.target.value);
  }
  function handleDistrictChange(event) {
    setDistrict(event.target.value);
  }
  function handleStateChange(event) {
    setState(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("email", email);
    formData.append("mobile", mobile);

    // Address
    formData.append("fatherName", fatherName)
    formData.append("motherName", motherName)
    formData.append("villageName", villageName)
    formData.append("postName", postName)
    formData.append("policeStation", policeStation)
    formData.append("pinCode", pinCode)
    formData.append("district", district)
    formData.append("state", state)

    axios
      .patch("/api/v1/student", formData, {
        withCredentials: true,
      })
      .then((response) => {
        let data = response.data;
        setProfile(data.url);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  return (
    <div className="account-setting-form">
      <form onSubmit={handleFormSubmit} style={{ overflow: "auto", height: "80vh" }}>
        <div className="profile-picture-selector">
          <span>Your Profile Picture</span>
          <label for="upload-button" class="custom-button">
            <img src={profile} width={120} height={80} alt="Upload Icon"></img>
            <input
              id="upload-button"
              name="profile-pic"
              type="file"
              onChange={handleFileChange}
            ></input>
            <span>Upload Your Photo</span>
          </label>
        </div>
        <div className="profile-data">
          <div className="form-element">
            <label for="FullName">
              <span>Full Name</span>
              <input
                name="name"
                value={name}
                type="text"
                placeholder="Enter Your Name"
                required
              ></input>
            </label>
            <label for="Email">
              <span>Email</span>
              <input
                name="email"
                type="text"
                onChange={handleEmailChange}
                value={email}
                placeholder="Enter Your Email"
                required
              ></input>
            </label>
          </div>
          <div className="form-element">
            <label for="PhoneNumber">
              <span>Phone Number</span>
              <input
                name="mobile"
                type="text"
                value={mobile}
                onChange={handleMobileChange}
                placeholder="Enter Your Phone Number"
                required
              ></input>
            </label>
            <label for="StudentID">
              <span>Student ID</span>
              <input
                name="studentID"
                type="text"
                value={studentID}
                required
              ></input>
            </label>
          </div>
          <div className="form-element">
            <label for="FatherName">
              <span>Father's Name</span>
              <input
                name="fatherName"
                value={fatherName}
                onChange={handleFatherChange}
                type="text"
                placeholder="Enter Your Father Name"
                required
              ></input>
            </label>
            <label for="MotherName">
              <span>Mother's Name</span>
              <input
                name="motherName"
                type="text"
                value={motherName}
                onChange={handleMotherChange}
                placeholder="Enter Your Mother Name"
                required
              ></input>
            </label>
          </div>
          <span style={{ marginLeft: "1rem", fontWeight: "bold" }} >ADDRESS</span>
          <div className="form-element">
            <label for="VillageName">
              <span>Village's Name</span>
              <input
                name="villageName"
                value={villageName}
                onChange={handleVillageChange}
                type="text"
                placeholder="Enter Your Village Name"
                required
              ></input>
            </label>
            <label for="PostName">
              <span>Post's Name</span>
              <input
                name="postName"
                type="text"
                value={postName}
                onChange={handlePostChange}
                placeholder="Enter Your Post Name"
                required
              ></input>
            </label>
          </div>
          <div className="form-element">
            <label for="PoliceStation">
              <span>Police Station</span>
              <input
                name="policeStation"
                value={policeStation}
                onChange={handlePoliceStationChange}
                type="text"
                placeholder="Enter Your Police Station"
                required
              ></input>
            </label>
            <label for="PinCode">
              <span> Pin Code</span>
              <input
                name="pinCode"
                type="number"
                value={pinCode}
                onChange={handlePinCodeChange}
                placeholder="Enter Your Pin Code"
                required
              ></input>
            </label>
          </div>
          <div className="form-element">
            <label for="District">
              <span>District</span>
              <input
                name="district"
                value={district}
                onChange={handleDistrictChange}
                type="text"
                placeholder="Enter Your District"
                required
              ></input>
            </label>
            <label for="State">
              <span> State</span>
              <input
                name="pinCode"
                type="text"
                value={state}
                onChange={handleStateChange}
                placeholder="Enter Your State"
                required
              ></input>
            </label>
          </div>
        </div>
        <div className="profile-submit-btn">
          <button type="submit">Update Profile</button>
        </div>
      </form>
    </div>
  );
};

export default AccountSetting;
