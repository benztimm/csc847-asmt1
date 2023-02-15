import { useState, useEffect } from 'react';

function UploadPost() {

    const [student_id, setId] = useState("");
    const [student_first, setFirst] = useState("");
    const [student_last, setlast] = useState("");
    const [student_email, setEmail] = useState("");
    const [student_mailing, setMailing] = useState("");
    const [student_gpa, setGpa] = useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();

            data.append('student_id', student_id);
            data.append('student_first', student_first);
            data.append('student_last', student_last);
            data.append('student_email', student_email);
            data.append('student_mailing', student_mailing);
            data.append('student_gpa', student_gpa);
            let res = fetch('http://localhost:8000/upload/', {
                method: 'POST',
                body: data,
              })
            if (res.status === 200) {
                setId('');
                setFirst('');
                setlast('');
                setEmail('');
                setMailing('');
                setGpa('');
            }
            window.location.reload(false);
        } catch (err) {
            console.log(err);
        }
    };
    return (

        <form onSubmit={handleSubmit}>
            <br></br>
            Create New student profile
            <br></br>
            <input
                type="text"
                value={student_id}
                placeholder="student_id"
                onChange={(e) => setId(e.target.value)}
            /><br></br>
            <input
                type="text"
                value={student_first}
                placeholder="student_firstname"
                onChange={(e) => setFirst(e.target.value)}
            /><br></br>
            <input
                type="text"
                value={student_last}
                placeholder="student_lastname"
                onChange={(e) => setlast(e.target.value)}
            /><br></br>
            <input
                type="text"
                value={student_email}
                placeholder="student_email"
                onChange={(e) => setEmail(e.target.value)}
            /><br></br>
            <input
                type="text"
                value={student_mailing}
                placeholder="student_mailing address"
                onChange={(e) => setMailing(e.target.value)}
            /><br></br>
            <input
                type="text"
                value={student_gpa}
                placeholder="student_gpa"
                onChange={(e) => setGpa(e.target.value)}
            />

            <button type="submit">Create</button>

        </form>
    )
}
export default UploadPost;
