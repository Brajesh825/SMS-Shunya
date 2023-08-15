import React from "react";

const StudentProfile = ({ student }) => {

  function calculateAgeFromDate(inputDate) {
    // Parse the input date string into a Date object
    const birthDate = new Date(inputDate);
  
    // Get the current date
    const currentDate = new Date();
  
    // Calculate the age
    let age = currentDate.getFullYear() - birthDate.getFullYear();
  
    // Check if the birthday has occurred this year
    const birthMonth = birthDate.getMonth();
    const currentMonth = currentDate.getMonth();
    const birthDay = birthDate.getDate();
    const currentDay = currentDate.getDate();
  
    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
      age--;
    }
  
    return age;
  }
  

  let gender = student.gender;
  let dob = student.dob
  let age = calculateAgeFromDate(dob)
  let name = student.name;
  let avatar = student.image || "";
  let sclass = student.class;
  let sID = student.studentID;
  let motherName = student.motherName
  let fatherName = student.fatherName
  let village = student.address?.villageName || ""

  console.log(student);

  return (
    <div class="student-profile">
      <div class="main-student-profile">
        <div class="student-id">
          <p>{sID}</p>
        </div>
        <div class="student-profile-wrapper">
          <img width="200" height="200" src={avatar} alt="profile pic"></img>
        </div>
        <div class="student-card">
          <p>{name}</p>
          <p>{sclass}</p>
        </div>
      </div>
      <div class="student-misc">
        <div class="student-age">
          <h3>Mother Name</h3>
          <p>{motherName}</p>
        </div>
        <div class="student-gender">
          <h3>Father Name</h3>
          <p>{fatherName}</p>
        </div>
        <div class="student-gender">
          <h3>Village</h3>
          <p>{village}</p>
        </div>
      </div>
      <div class="student-misc">
        <div class="student-age">
          <h3>Age</h3>
          <p>{age}</p>
        </div>
        <div class="student-gender">
          <h3>Gender</h3>
          <p>{gender}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
