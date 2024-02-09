import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import searchicon from "../Assets/search.png"
import "./search.css"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setalldata } from '../reducer/userslice';

function FormExample(props) {

  let dispatch = useDispatch()

  let [searchInput,setsearchInput]= useState("")
  
  const searchapi=()=>{
     dispatch(setalldata(searchInput))
     setsearchInput("")
  }


  return (
    <div className='search-box'>
    <Stack direction="horizontal" className='inputsize' gap={3}>
      <Form.Control onChange={(e)=>{
        setsearchInput(e.target.value)
      }} className="me-auto inputbox" placeholder="Enter Your location..." style={{borderRadius:"50px",fontSize:25,paddingLeft:"3%"}}/>
      <Button onClick={searchapi} className='search-button' style={{backgroundColor:'white',borderRadius:"50%"}} ><img style={{width:"25px"}} src={searchicon} alt='search'/></Button>
    </Stack></div>
  );
}

export default FormExample;