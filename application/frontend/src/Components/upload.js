import { useState, useEffect } from 'react';
import * as MetaData from './routeconfig'
const route = MetaData.route

function UploadPost() {
    const style = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
    const margin = {
        marginTop: '5px'
    }

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
            let res = await fetch(`http://${route}:8000/upload`, {
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
                window.location.reload(false);
            } else {
                window.alert(`Incorrect format`)
            }
        } catch (err) {
            console.log(err);
            window.location.reload(false);
            window.alert('incorrect format')
        }
    };
    return (

        <form onSubmit={handleSubmit} style={style}  >
            Create New student profile
            <br></br>
            <input
                type="text"
                value={student_id}
                placeholder="student_id"
                onChange={(e) => setId(e.target.value)}
                style={{ marginTop: '5px' }}
            />
            <input
                style={{ marginTop: '5px' }}
                type="text"
                value={student_first}
                placeholder="student_firstname"
                onChange={(e) => setFirst(e.target.value)}
            />
            <input
                type="text"
                value={student_last}
                placeholder="student_lastname"
                onChange={(e) => setlast(e.target.value)}
                style={{ marginTop: '5px' }}
            />
            <input
                type="text"
                value={student_email}
                placeholder="student_email"
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginTop: '5px' }}
            />
            <input
                type="text"
                value={student_mailing}
                placeholder="student_mailing address"
                onChange={(e) => setMailing(e.target.value)}
                style={{ marginTop: '5px' }}
            />
            <input
                type="text"
                value={student_gpa}
                placeholder="student_gpa"
                onChange={(e) => setGpa(e.target.value)}
                style={{ marginTop: '5px' }}
            />
            <br></br>
            <button type="submit">Create</button>

        </form>
    )
}
export default UploadPost;
