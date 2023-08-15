import { Class } from "../model/class.js";
import { FeeStructure } from "../model/feeStructure.js";
import { Order } from "../model/order.js";
import { Student } from "../model/student.js";
import { StudentService } from "../services/studentService.js";
import { cloudinary } from "../utils/clouddinary.js";
import csvParser from "csv-parser";
import fs from 'fs'

import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const studentService = new StudentService();

class StudentController {
  constructor() { }

  uploadStudentCSV(req, res) {
    if (!req.file) {
      return res.status(400).send('No CSV file provided.');
    }

    const filePath = req.file.path;
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        fs.unlinkSync(filePath); // Remove the uploaded file after parsing

        let classes = await Class.find({})
        for (let i = 0; i < results.length; i++) {
          const element = results[i];
          let student = studentService.constructStudents(element, classes)
          if (!student) {
            return res.status(400).json({ message: "Something Went Wrong" })
          }
          let isStudentAdded = await studentService.addStudent(student)
          if (!isStudentAdded) {
            return res.status(400).json({ message: "Something Went Wrong", })
          }
        }
        res.json(results);
      })
      .on('error', (error) => {
        console.error('Error parsing CSV:', error.message);
        res.status(500).send('Error parsing CSV.');
      });


  }

  addStudent = async (req, res) => {
    let data = req.body;
    data.password = data.dob;
    var dateParts = data.dob.split("/");
    data.dob = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

    // handling ID
    let studentID =
      data.name.substr(0, 4) + dateParts[0] + dateParts[1] + dateParts[2];
    data.studentID = studentID;

    // Adding Student
    let student = await studentService.addStudent(data);

    let myClass = await Class.findById(data.class);
    myClass.noOfStudents = myClass.noOfStudents + 1;
    student.class = myClass._id;
    await myClass.save();

    // Updating Number Of Student
    if (!student) {
      return res.status(400).json({
        success: "false",
        message: "Student already exist",
      });
    }
    res.status(200).json({
      success: "true",
      message: "Student Successfully Added",
      student: student,
    });
  };

  getAllStudent = async (req, res) => {
    let students = await studentService.getAllStudent();
    res.status(200).json(students);
  };

  getStudentDetails = async (req, res) => {
    let { studentID } = req.params
    let activStudent = await Student.findOne({
      studentID: studentID
    }).populate('class')

    if (activStudent) {
      res.status(200).json({ student: activStudent })
    }
    else {
      res.status(404).json({ message: "Not Found" })
    }
  }

  getStudentsPendingBills = async (req, res) => {
    let studentID = req.studentID;
    // fetch student
    let student = await Student.findOne({studentID}).populate(
      "class"
    );
    // Fetch Classes
    let classId = student.class._id;
    // Get All Fee Structures
    let feeStructures = await FeeStructure.find({ class: classId });
    let yearMapping = {};

    for (const feeStructure of feeStructures) {
      let { year, month } = feeStructure;
      if (!yearMapping[year]) {
        yearMapping[year] = [month];
      } else {
        yearMapping[year].push(month);
      }
    }
    res.status(200).json({
      yearMapping,
      class: {
        className: student.class.className,
        _id: student.class._id,
      },
    });
  }

  getMyPendingBills = async (req, res) => {
    let studentID = req.studentID;
    // fetch student
    let student = await Student.findById(studentID.toString()).populate(
      "class"
    );
    // Fetch Classes
    let classId = student.class._id;
    // Get All Fee Structures
    let feeStructures = await FeeStructure.find({ class: classId });
    let yearMapping = {};

    for (const feeStructure of feeStructures) {
      let { year, month } = feeStructure;
      if (!yearMapping[year]) {
        yearMapping[year] = [month];
      } else {
        yearMapping[year].push(month);
      }
    }
    res.status(200).json({
      yearMapping,
      class: {
        className: student.class.className,
        _id: student.class._id,
      },
    });
  };

  getMyBill = async (req, res) => {
    let { class: className, year, month } = req.body;

    const feeStructure = await FeeStructure.findOne({
      class: new ObjectId(className),
      year,
      month,
    });

    res.status(200).json({
      feeStructure,
    });
  };
  updateProfile = async (req, res) => {
    try {
      const studentID = req.studentID;

      const { file, email, mobile, fatherName, motherName, villageName, postName, policeStation, pinCode, district, state } = req.body;
      // Get the temporary file path
      const filePath = req.file?.path;
      let publicUrl = null;
      if (filePath) {
        const result = await cloudinary.v2.uploader.upload(filePath, {
          resource_type: "auto",
          folder: "profiles",
        });
        publicUrl = result.secure_url;
      }

      let student = await Student.findById(studentID);

      email, mobile, fatherName, motherName, villageName, postName, policeStation, pinCode, district, state

      student.email = email;
      student.mobile = mobile;
      student.fatherName = fatherName
      student.motherName = motherName

      const address = {
        villageName,
        postName,
        policeStation,
        pinCode,
        district,
        state
      }

      student.address = address

      if (publicUrl) {
        student.image = publicUrl;
      }
      await student.save();

      res
        .status(200)
        .json({ message: "Successfully changed profile pic", url: student.image });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Something went wrong" });
    }
  };
  changePassword = async (req, res) => {
    try {
      const studentID = req.studentID;
      const { password, newPassword, confirmPassword } = req.body;

      const authority = await Student.findById(studentID);
      const auth = await authority.matchPassword(password, authority.password);
      if (!auth) {
        return res.status(400).json({ message: "Incorrect password" });
      }
      if (newPassword != confirmPassword) {
        return res.status(400).json({
          message: "New Password and confirm new password must be same",
        });
      }
      authority.password = newPassword;
      await authority.save();

      res.status(200).json({
        message: "Password Successfully Changed",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Something Went Wrong" });
    }
  };

  getCompleteBill = async (req, res) => {
    let studentID = req.studentID;

    // fetching student
    let student = await Student.findById(studentID.toString()).populate("class")

    // fetching all fee structure
    let feeStructures = await FeeStructure.find({ class: student.class._id })

    const bills = []

    for (let i = 0; i < feeStructures.length; i++) {
      const fee = feeStructures[i]
      let currOrder = await Order.findOne({
        classId: student.class,
        studentID: student._id,
        month: fee.month,
        year: fee.year
      })
      // already exist
      if (currOrder) {
        let bill = {}
        bill.status = currOrder.status
        bill.year = currOrder.year
        bill.month = currOrder.month
        bill.transactionDate = currOrder.createdAt
        bill.studentID = student.studentID
        bill.class = student.class.className
        bill.tutionFee = fee.tutionFee
        bill.libraryFee = fee.libraryFee
        bill.hostelFee = fee.hostelFee
        bill.transportFee = fee.transportFee
        bills.push(bill)
      } else {
        let bill = {}
        bill.status = "Not Started"
        bill.year = fee.year
        bill.month = fee.month
        bill.transactionDate = "NA"
        bill.studentID = student.studentID
        bill.class = student.class.className
        bill.tutionFee = fee.tutionFee
        bill.libraryFee = fee.libraryFee
        bill.hostelFee = fee.hostelFee
        bill.transportFee = fee.transportFee
        bills.push(bill)
      }
    }

    res.status(200).json({
      bills,
    });



  }
}

export { StudentController };
