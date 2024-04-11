import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/slots.css';

const Slots = () => {
  const numRows = 5;
  const slotsPerRow = 10;
  
  const location = useLocation();
  const arr = location.state.arrTime;
  const dep = location.state.depTime;
  const vecno = location.state.Vechileno;
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [slotData, setSlotData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:8081/Home/Slots')
      .then((response) => response.json())
      .then((data) => {
        setSlotData(data);

      })
      .catch((error) => {
        console.error('Error fetching slot data:', error);
      });
  }, []);
//  console.log(slotData[0].slot);
  const handleslotClick = (slotNum) => {
    if (bookedSlots.includes(slotNum)) {
      alert('This slot is already booked.');
      return;
    }

    setSelectedSlot(slotNum);
  };
  console.log(selectedSlot);
  const handleSubmit = () => {
    
    const data = {
      selectedSlot: selectedSlot,
      Vechile_no: vecno,
      arr: arr,
      dep: dep,
    };
  
    axios
      .post("http://localhost:8081/Home/Slots", data)
      .then((res) => {
        navigate("/Home/Slots/Confirmation");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };


  const calculateRemainingTime = (slotNum) => {
    let remainingTime=0;
    if (!slotData) {
      return false;
    }
    for(let i=0;i<5;i++)
    {
      var dataslot=slotData[i];
      if(dataslot.slot===slotNum){
        
        
        if (arr > dataslot.startTime){
    
          if(  dep < dataslot.endTime) {
            return remainingTime;
          }
          if(arr < dataslot.endTime){
            console.log(arr,dataslot.endTime);
            const arrString = String(arr);

      const arrTimeParts = arrString.split(":"); // Split arr time into hours and minutes
      const depTimeParts = dataslot.endTime.split(":"); // Split dataslot.endTime into hours, minutes, and seconds

      // Create Date objects using the hours and minutes
      const arrDate = new Date(0, 0, 0, parseInt(arrTimeParts[0]), parseInt(arrTimeParts[1]));
      const depDate = new Date(0, 0, 0, parseInt(depTimeParts[0]), parseInt(depTimeParts[1]));

      // Calculate the time difference in minutes
      const timeDifferenceInMilliseconds = depDate - arrDate;
      remainingTime = Math.floor(timeDifferenceInMilliseconds / (1000 * 60));
      console.log(remainingTime);
      return remainingTime;
           
            
          }
        }
      
      }

    }
  };

  return (
    <div className='slots1'
    data-aos="fade-up"
    data-aos-offset="200"
    data-aos-delay="50"
    data-aos-duration="2000">
      <div id="slot-container">
        {Array.from({ length: numRows }, (_, row) => (
          <div key={row}>
            {Array.from({ length: slotsPerRow }, (_, slotNum) => {
              const slotNumber = row * slotsPerRow + slotNum + 1;
              const remainingTime = calculateRemainingTime(slotNumber);
              return (
                <div
                  key={slotNumber}
                  className={`slot ${remainingTime>=0 ? 'booked' :  slotNumber===selectedSlot ? 'selected' : ''}`}
                  
                  onClick={() => handleslotClick(slotNumber)}
                >
                  {slotNumber}
                  {remainingTime>0 && (
                  <div className="remaining-time-box">
                    Remaining time: {remainingTime} minutes
                  </div>
                )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <p>
        <span className="slot">Available</span>
        <span className="slot selected">Selected</span>
        <span className="slot booked">Booked</span>
        <button className='bookedButton' onClick={handleSubmit}>Booked</button>
      </p>
    </div>
  );
};

export default Slots;



