import { useState, useEffect } from 'react';
function SearchAndDisplay() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState('student_id')
    const handleChange = event => {
        setSearch(event.target.value);
    };
    const handleSelectedChange = event =>{
        setSelected(event.target.value)
    }

    useEffect(() => {
        datas()
    }, [])

    const datas = async () => {
        const response = await fetch('http://35.236.39.216:8000/homepage/');
        setData(await response.json())
    }
    const tdStyle = {
        textAlign: "center",
        color: 'blue'
    }

    const DisplayData = data.filter((d) => { return (String(d[selected])).toLowerCase().includes(search.toLowerCase()) }).map((data) => {
        return (
            <tr>
                <td style={tdStyle}>{data.student_id}</td>
                <td style={tdStyle}>{data.student_first}</td>
                <td style={tdStyle}>{data.student_last}</td>
                <td style={tdStyle}>{data.student_email}</td>
                <td style={tdStyle}>{data.student_mailing}</td>
                <td style={tdStyle}>{data.student_gpa}</td>
            </tr>
        )
    })
    return (
        <tbody>
            <th style={tdStyle}>student_id</th>
            <th style={tdStyle}>student_first</th>
            <th style={tdStyle}>student_last</th>
            <th style={tdStyle}>student_email</th>
            <th style={tdStyle}>student_mailing</th>
            <th style={tdStyle}>student_gpa</th>
            {DisplayData}
            <br></br>
            Search by
            <select name="selected" onChange={handleSelectedChange}>
                <option value="student_id">Student ID</option>
                <option value="student_first">Student First Name</option>
                <option value="student_last">Student Last Name</option>
                <option value="student_email">Student Email</option>
                <option value="student_mailing">Student Mailing Address</option>
                <option value="student_gpa">Student GPA</option>
            </select>
            <input
                type="text"
                placeholder="Keyword"
                value={search}
                onChange={handleChange}
                style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            />
        </tbody>
    )
}



export default SearchAndDisplay;
