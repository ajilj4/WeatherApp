import React, { useEffect, useState} from "react";
import ColorSchemesExample from './components/nav'
import FormExample from './components/search'
import "./app.css"
import cloud from './Assets/cloud.png'
import humidity from './Assets/humidity.png'
import wind from './Assets/wind.png'
import axios from "axios"
import { useLayoutEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';

function App() {

  const [alldata,setalldata]= useState("")
  const [allapidata,setallapidata]= useState([])
  const [weatherdata,setweatherdata]= useState([])
  let [istrue,setistrue] = useState(false)

  let loc = alldata.split(" ");
  let location = loc[0];
  console.log("hhh",location)

  // if ("geolocation" in navigator) {
  //   // Get the current position
  //   navigator.geolocation.getCurrentPosition(
  //     // Success callback
  //     function(position) {
  //       const latitude = position.coords.latitude;
  //       const longitude = position.coords.longitude;
        
  //       console.log("Latitude: " + latitude);
  //       console.log("Longitude: " + longitude);
        
  //       // You can use these coordinates to display a map, find nearby places, etc.
  //     },
  //     // Error callback
  //     function(error) {
  //       console.error("Error getting geolocation:", error.message);
  //     }
  //   );
  // } else {
  //   console.error("Geolocation is not supported by this browser.");
  // }

  useLayoutEffect(()=>{
    axios.get(`https://api.geoapify.com/v1/ipinfo?&apiKey=bdae5ff1e27846269261bd40b674a456`).then((res)=>{
      console.log(res)
      setalldata(res.data.city.name)
    })
  },[])

  useEffect(()=>{
    if (alldata != ""){
      axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=924b07222b465adc91ca511e1ac899fe&units=Metric`).then((res)=>{
      console.log(res)
      setweatherdata(res.data)
      setallapidata(res.data)
      setistrue(true)
    })
    }
  },[alldata])   

console.log(alldata)
console.log(allapidata)
console.log("weather",weatherdata)
  return (
    <div className="App" style={{maxHeight: "100vh"}}>
      <ColorSchemesExample/>
      {alldata!="" && istrue ?<div className="box">
         
      <FormExample/>
      
      <div className="cloud">
          <img src={cloud} alt="cloud"/>
          
      </div>
      <div className="temp">
         <p>{allapidata.list[0].main.temp}</p>
          
      </div>
      <div className="country">
          <h1>{allapidata.city.name}</h1>
      </div>
      <div className="lastbox">
        <div className="leftbox">
          <img src={humidity} alt="humidity"/>
          <div className="leftcolumn">
            <h2>{allapidata.list[0].main.humidity} %</h2>
            <h5>humidity</h5>
          </div>
        </div>
        <div className="rightbox">
          <img src={wind} alt="wind"/>
          <div className="rightcolumn">
            <h2>{allapidata.list[0].wind.speed} km/h</h2>
            <h5>wind speed</h5>
          </div>
        </div>

      </div>
      </div>:<Spinner animation="border" role="status" style={{display:"flex",justifyContent:"center",height:"100vh",alignItems:"center"}}>
      <span className="visually-hidden" >Loading...</span>
    </Spinner>}
      
    </div>
  );
}

export default App;


