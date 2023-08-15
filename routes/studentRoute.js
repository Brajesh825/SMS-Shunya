import express from "express";
import { upload } from "../utils/fileUpload.js";

import { StudentController } from "../controllers/studentController.js";
import { Authenticate } from "../middleware/authMiddleWare.js";
import { OrderController } from "../controllers/orderController.js";
const orderController = new OrderController();

const studentController = new StudentController();

const studentRoutes = express.Router();

// Add Student
studentRoutes.post("/student", studentController.addStudent);

// Upload Student
studentRoutes.post("/student/upload",upload.single('file'), studentController.uploadStudentCSV);

// Get All Students
studentRoutes.get("/student", studentController.getAllStudent);

// Get One Student Details
studentRoutes.get("/student/:studentID/Details", studentController.getStudentDetails);

// Get All My Bills
studentRoutes.get(
  "/student/bill",
  Authenticate("student"),
  orderController.getMyOrders
);

// Get All Bill List To Be Paid
studentRoutes.post(
  "/student/bills/pendingList",
  Authenticate("student"),
  studentController.getMyPendingBills
);

// Get my Bill
studentRoutes.post(
  "/student/bill",
  Authenticate("student"),
  studentController.getMyBill
);

// Get one student complete Billing billing list
studentRoutes.get(
  "/student/bill/list",
  Authenticate("student"),
  studentController.getCompleteBill
);

export { studentRoutes };
