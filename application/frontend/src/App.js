import './App.css';
import SearchAndDisplay from './Components/searchAndDisplay';
import UploadPost from './Components/upload';
function App() {
  const tableStyle = {
    border: "1px solid black"
 }
  const tdStyle = {
    textAlign: "center",
  }

  return (
    <div >
      <table class="table table-striped" style={tableStyle}>
        <thead>
          <tr>
            <th style={tdStyle}>student_id</th>
            <th style={tdStyle}>student_first</th>
            <th style={tdStyle}>student_last</th>
            <th style={tdStyle}>student_email</th>
            <th style={tdStyle}>student_mailing</th>
            <th style={tdStyle}>student_gpa</th>
          </tr>
        </thead>
        <SearchAndDisplay/>
      </table>
      <UploadPost/>
    </div>


  );
}

export default App;
