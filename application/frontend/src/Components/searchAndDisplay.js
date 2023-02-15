import { useState, useEffect } from 'react';
function SearchAndDisplay() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('')
    const handleChange = event => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        datas()
    }, [])

    const datas = async () => {
        const response = await fetch('http://localhost:8000/homepage/');
        setData(await response.json())
    }
    const tdStyle = {
        textAlign: "center",
    }

    const DisplayData = data.filter((d) => { return String(d.student_id).includes(search) }).map((data) => {
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
            {DisplayData}
            <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={handleChange}
                style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',}}
            />
        </tbody>

    )
}



export default SearchAndDisplay;
