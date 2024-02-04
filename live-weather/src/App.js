import React from "react";
import ColorSchemesExample from './components/nav'
import FormExample from './components/search'
import "./app.css"
import cloud from './Assets/cloud.png'
import humidity from './Assets/humidity.png'
import wind from './Assets/wind.png'

function App() {
  return (
    <div className="App" style={{maxHeight: "100vh"}}>
      
      <ColorSchemesExample/>
      
      <div className="box">
      <FormExample/>
      <div className="cloud">
          <img src={cloud} alt="cloud"/>
      </div>
      <div className="temp">
          <p>100.56°c</p>
          
      </div>
      <div className="country">
          <h1>New york</h1>
      </div>
      <div className="lastbox">
        <div className="leftbox">
          <img src={humidity} alt="humidity"/>
          <div className="leftcolumn">
            <h2>74 %</h2>
            <h5>humidity</h5>
          </div>
        </div>
        <div className="rightbox">
          <img src={wind} alt="wind"/>
          <div className="rightcolumn">
            <h2>5,66 km/h</h2>
            <h5>wind speed</h5>
          </div>
        </div>

      </div>
      </div>
      
    </div>
  );
}

export default App;
