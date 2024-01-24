import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { Circles } from "react-loader-spinner";

function App() {
  const [apiData, setApiData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [show, setshow] = useState(true);
  
  const callAPI = async ()=> {
    setLoading(true);
    const resData = await axios.get("https://reqres.in/api/users?page=1");
    
    setTimeout(() => {
      setApiData(resData.data);
      setLoading(false);
    }, 1000);
    setshow(() =>{
      setshow(false);
    })
  }
  return (
    <div className="App">
      <header className="header">
        <div className="logo">
         ZIPPY
        </div>
        <h3 onClick={() => callAPI()}>Get Users</h3>
      </header>
      
      <div className='body'>
      {isLoading ? (
          <Circles
          height="80"
          width="80"
          color="linear-gradient(to right, lightblue, pink);"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          />
        ) : (
          apiData &&
          apiData.data &&
          apiData.data.map((data) => {
            return (
              <div className="card" key={data.id}>
                <div className="card-img">
                  <img src={data.avatar} alt="asdf" />
                </div>
                <div className="card-intro">
                  <h1>{data.first_name + " " + data.last_name}</h1>
                  <h3>{data.email}</h3>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      <div className="container">
       {
         show?<h1> Click on Get Users to fetch the user info from the API</h1>:null
       }
      </div>
    </div>
    
  );
}

export default App;
