import { useState } from "react";
import axios from 'axios'

const UploadStudentForm = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    function handleFileChange(event) {
        setSelectedFile(event.target.files[0]);
    }

    const uploadStudents = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("file", selectedFile);

        axios
            .post("/api/v1/student/upload", formData, {
                withCredentials: true,
            })
            .then((response) => {
                let data = response.data;
                console.log(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    return (
        <form className='csvForm' onSubmit={uploadStudents} >
            <input
                id="upload-student-button"
                name="students"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
            ></input>
            <button type="submit">Upload CSV</button>
        </form>
    )

}

export default UploadStudentForm