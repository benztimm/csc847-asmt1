import './App.css';
import SearchAndDisplay from './Components/searchAndDisplay';
import UploadPost from './Components/upload';
function App() {
  const tableStyle = {
    border: "1px solid black",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop : '5px'
      
 }
  const tdStyle = {
    textAlign: "center",
  }

  return (
    <div >
      <table class="table table-striped" style={tableStyle}>
        <thead>
          <tr>
          </tr>
        </thead>
        <SearchAndDisplay/>
      </table>
      <UploadPost/>
    </div>


  );
}

export default App;
