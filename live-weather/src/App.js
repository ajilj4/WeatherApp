import React, { useEffect, useState} from "react";
import ColorSchemesExample from './components/nav'
import FormExample from './components/search'
import "./app.css"
import cloud from './Assets/cloud.png'
import clear from './Assets/clear.png'
import rain from './Assets/rain.png'
import snow from './Assets/snow.png'
import drizzle from './Assets/drizzle.png'
import humidity from './Assets/humidity.png'
import wind from './Assets/wind.png'
import axios from "axios"
import { useLayoutEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch,useSelector } from "react-redux";
import { setalldata ,setweatherdata} from "./reducer/userslice";
import { Button } from "bootstrap";

function App() {
  
  let dispatch = useDispatch()
  let alldata = useSelector((state) => state.counter.alldata)
  let weatherdata = useSelector((state) => state.counter.weatherdata)
  const [allapidata,setallapidata]= useState([])
  let [istrue,setistrue] = useState(false)
  let [apisearch,setapisearch]=useState(false)

  let loc = alldata.split(" ");
  let location = loc[0];
  // console.log("hhh",location)

  useLayoutEffect(()=>{
    axios.get(`https://api.geoapify.com/v1/ipinfo?&apiKey=bdae5ff1e27846269261bd40b674a456`).then((res)=>{
      console.log(res)
      dispatch(setalldata(res.data.city.name))
    })
  },[])

  useEffect(()=>{
    if (alldata != ""){
      axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=924b07222b465adc91ca511e1ac899fe&units=Metric`).then((res)=>{
      console.log(res)
      dispatch(setweatherdata(res.data))
      setallapidata(res.data)
      setistrue(true)
    }).catch((err)=>{setapisearch(true)})
    }
  },[alldata])   
  

return (
    <div className="App" style={{maxHeight: "100vh"}}>
      <ColorSchemesExample/>
      
      {apisearch?<div >
        <div className="apierror">
        <h1>Enter City Name Correctly</h1>
        <button className="btn btn-primary mt-5" onClick={()=>setapisearch(false)}>back</button>
        </div>
      </div>:alldata!="" && istrue ?<div className="box">
      <FormExample />
    
      <div className="cloud">
          {weatherdata.list[0].weather[0].main=="Clouds"?
          <img src={cloud} alt="cloud"/>:
          weatherdata.list[0].weather[0].main=="Clear"?
          <img src={clear} alt="clear"/>:
          weatherdata.list[0].weather[0].main=="Snow"?
          <img src={snow} alt="snow"/>:
          weatherdata.list[0].weather[0].main=="Rain"?
          <img src={rain} alt="rain"/>:
          // weatherdata.list[0].weather[0].main=="drizzle"?
          <img src={drizzle} alt="drizzle"/>
        }
          
          
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
      </div>:<div style={{width:"100%",height:"100vh",position:"relative"}}>
      <Spinner animation="border" role="status" style={{width:"100px",height:"100px",left:"45%",bottom:"50%",position:"absolute"}}>
      <span className="visually-hidden" >Loading...</span>
    </Spinner>
    </div>}
      
    </div>
  );
}

export default App;


