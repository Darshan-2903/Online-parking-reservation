import React, { useState } from "react";
import "../styles/parking.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import checkdetails from './CheckParkingDetails.js';

const Home = () => {
  const navigate=useNavigate();
  const [errors,setErrors] = useState({})
  const [values, setValues] = useState({
    Date: "",
    Vechile_no: "",
    aTime: "",
    dTime: "",
    Park: "",
    Model: "",
  });

  const handleInput=(event)=>{
    setValues(prev=>({...prev,[event.target.name]:[event.target.value]}))
  }

  const handleSubmit=(event)=>{
    event.preventDefault();
    setErrors(checkdetails(values));
    if(errors.Date===' ' && errors.aTime===' ' && errors.dTime===' '){
      axios
        .post("http://localhost:8081/Home", values)
        .then((res) => {
          navigate("/Home/Slots");
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
    
  }

  return (
    <div>
      <form className="parking_form" onSubmit={handleSubmit}>
        <div>
          <label>Enter Date</label>
          <input type="date" name="Date" id="" onChange={handleInput}/>
        </div>
        <div>
          <label>Vechile No.</label>
          <input type="text" name="Vechile_no" id="" onChange={handleInput}/>
        </div>
        <div>
          <label>Enter Arriving Time</label>
          <input type="time" name="aTime" id="" onChange={handleInput}/>
        </div>
        <div>
          <label>Enter Departure Time</label>
          <input type="time" name="dTime" id="" onChange={handleInput}/>
        </div>
        <div>
          <label htmlFor="">Park</label>
          <input type="text" name="Park" id="" onChange={handleInput}/>
        </div>
        <div>
          <label>Model</label>
          <input type="text" name='Model' onChange={handleInput}/>
        </div>
        
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Home;
