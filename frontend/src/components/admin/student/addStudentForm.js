import ClassDropDown from "./classDropDown";
import GenderDropDown from "./genderDropDown";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";

const AddStudentForm = ({ addStudent }) => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const submitForm = async (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        var object = {};
        formData.forEach(function (value, key) {
            object[key] = value;
        });
        let response = await addStudent(object);
        if (response.success === "true") {
            navigate("/admin/student");
        } else {
            setError(response.message);
        }
    };

    return (
        <form action="" onSubmit={submitForm} class="student-add-form">
            <span>{error}</span>
            <div class="form-element">
                <input
                    name="name"
                    type="text"
                    placeholder="Enter Student Name"
                    required
                ></input>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Students Email Address"
                ></input>
            </div>
            <div class="form-element">
                <ClassDropDown />
                <GenderDropDown />
                <input
                    type="text"
                    name="dob"
                    placeholder="Date of birth , DD/MM/YYYY"
                    required
                ></input>
            </div>
            <div class="form-element">
                <input
                    type="text"
                    name="doa"
                    placeholder="Date of admission , DD/MM/YYYY"
                    required
                ></input>
            </div>
            <div class="form-element"></div>
            <div class="form-element">
                <button class="add-one-btn" type="submit">
                    Add Student
                </button>
            </div>
        </form>
    )

}

export default AddStudentForm