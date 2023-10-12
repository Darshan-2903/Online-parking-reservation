import React, { useEffect, useState } from 'react';
import '../styles/slots.css'
const Slots = () => {
  const numRows = 5;
  const slotsPerRow = 10;

  const [selectedslots, setSelectedslots] = useState([]);
  const [bookedslots, setBookedslots] = useState([]);

  useEffect(() => {
    
    fetch('http://localhost:8081/Home/Slots')
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const bookedslotNumbers = data
          .filter((slot) => slot.pstatus === 'Booked')
          .map((slot) => slot.slots);
        setBookedslots(bookedslotNumbers);
      })
      .catch((error) => {
        console.error('Error fetching slot data:', error);
      });
  }, []);
  console.log(bookedslots);
  const handleslotClick = (slotNum) => {
    if (bookedslots.includes(slotNum)) {
      alert('This slot is already booked.');
      return;
    }

    if (selectedslots.includes(slotNum)) {
      setSelectedslots(selectedslots.filter((selectedslot) => selectedslot !== slotNum));
    } else {
      setSelectedslots([...selectedslots, slotNum]);
    }
  };

  return (
    <div className='slots1'>
      <div id="slot-container">
        {Array.from({ length: numRows }, (_, row) => (
          <div key={row}>
            {Array.from({ length: slotsPerRow }, (_, slotNum) => (
              <div
                key={slotNum}
                className={`slot ${bookedslots.includes(row * slotsPerRow + slotNum + 1) ? 'booked' : selectedslots.includes(row * slotsPerRow + slotNum + 1) ? 'selected' : ''}`}
                onClick={() => handleslotClick(row * slotsPerRow + slotNum + 1)}
              >
                {slotNum + 1}
              </div>
            ))}
          </div>
        ))}
      </div>
      <p><span className="slot">Available</span> <span className="slot selected">Selected</span> <span className="slot booked">Booked</span></p>
    </div>
  );
};

export default Slots;

