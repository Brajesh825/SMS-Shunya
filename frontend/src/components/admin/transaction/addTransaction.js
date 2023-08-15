import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import ClassDropDown from "./classDropDown";
import YearDropDown from "./yearDropDown";
import MonthDropDown from "./monthDropDown";
import axios from "axios"

const AddTransaction = () => {
  const [error, setError] = useState("");
  const { addTransaction } = useOutletContext();
  useNavigate();

  const [studentID, setStudentID] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [myClasses, setClass] = useState("")    // All Classes in dropdown
  const [activeClass, setACtiveClass] = useState("") // Selected Class
  const [months, setMonths] = useState("")
  const [years, setYears] = useState("")

  const handlestudentIDChange = (e) => {
    setStudentID(e.target.value)
    if (studentID.length == 12) {
      getStudentData()
    }
  }

  const handleMobileChange = (e) => {
    setMobile(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }


  const getStudentData = async () => {
    axios
      .get("/api/v1/student/" + studentID + "/details", {
        withCredentials: true,
      })
      .then((res) => {
        let data = res.data;
        let { student } = data
        setEmail(student?.email || "")
        setMobile(student?.mobile || "")

        console.log(student);

        setClass(student?.class)
      })

  }

  const submitForm = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    var object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    let order = await addTransaction(object);
    if (order.success === "true") {
      window.location.reload()
    } else {
      setError(order.message);
    }
  };

  return (
    <div class="transaction-add">
      <h3>Add Transactions</h3>
      <div class="transaction-add-form-wrapper">
        <form action="" class="transaction-add-form" onSubmit={submitForm}>
          <span>{error}</span>
          <div class="form-element">
            <input
              name="studentID"
              type="text"
              placeholder="Enter Student ID"
              value={studentID}
              onChange={handlestudentIDChange}
              required
            ></input>
          </div>
          <div class="form-element">
            <ClassDropDown setActiveClass={setACtiveClass} classes={myClasses} activeClass={activeClass} />
            <YearDropDown />
            <MonthDropDown />
          </div>
          <div class="form-element">
            <input
              type="tel"
              name="phone"
              value={mobile}
              onChange={handleMobileChange}
              placeholder="Enter Student Mobile Number"
            ></input>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter Student Email Address"
            ></input>
          </div>
          <div class="form-element">
            <input type="txt" name="amount" placeholder="Enter Amount"></input>
            <select name="transactionType" required>
              <option value="" disabled selected hidden>
                Mode
              </option>
              <option value="cash">Cash</option>
              <option value="online">Online</option>
            </select>
          </div>
          <div class="form-element">
            <button class="add-one-btn" type="submit">
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
