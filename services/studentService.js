import { Class } from "../model/class.js";
import { Student } from "../model/student.js";

class StudentService {
  constructor() { }

  constructStudents = (data , classList) => {
    try {
      data.password = data.DateOfBirth
      // dob
      const datePartsB = data.DateOfBirth.split("-");
      data.dob = new Date(+datePartsB[2], datePartsB[1] - 1, +datePartsB[0]);
      // doa
      const datePartsA = data.DateOfAdmission.split("-");
      data.doa = new Date(+datePartsA[2], datePartsA[1] - 1, +datePartsA[0]);
  
      let studentID =
        data.Name.substr(0, 4) + datePartsB[0] + datePartsB[1] + datePartsB[2];
      data.studentID = studentID;
  
      data.mobile = data?.MobileNumber
      data.email = data?.Email
      data.name = data?.Name
      data.gender = data?.Gender
  
      for (let i = 0; i < classList.length; i++) {
        const element = classList[i];
        if(element.className === data.ClassName || element.className === data.Class ) {
          data.class = element._id
        }      
      }
  
      return data
    } catch (error) {
      console.log(error);
      return false
    }
   


  }

  addStudent = async (data) => {
    try {
      console.log(data);
      let student = new Student(data);
      await student.save();
      return student;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  getAllStudent = async () => {
    let students = [];
    let student = await Student.find({}).populate("class");
    student.forEach((element) => {
      let curr = {};
      Object.assign(curr, element._doc);
      curr.class = element.class.className;
      students.push(curr);
    });

    return students;
  };
}

export { StudentService };
