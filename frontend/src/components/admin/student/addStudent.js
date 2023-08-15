import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import AddStudentForm from "./addStudentForm";
import UploadStudentForm from "./uploadStudentForm";


const AddStudent = (data) => {
  const { addStudent } = useOutletContext();
  const [activeForm, setActiveForm] = useState('normal')

  return (
    <div class="student-add">
      <h3>Add Students</h3>
      <div class="add-students-options">
        <div class="manual-add-btn">
          <a onClick={() => setActiveForm('normal')}  >Manually</a>
        </div>
        <div class="csv-add-btn">
          <a onClick={() => setActiveForm('csv')} >Upload CSV</a>
        </div>
      </div>
      <div class="student-add-form-wrapper">
        {activeForm === 'normal' ? <AddStudentForm addStudent={addStudent} /> : <UploadStudentForm/>}
      </div>
    </div>
  );
};

export default AddStudent;
