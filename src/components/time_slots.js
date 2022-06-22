import React from 'react'
import {useState} from 'react';
import Calendar from 'react-calendar';

const time = ['08:00','09:00','10:00','14:00','15:00']

function Time_slots(props) {

 const [event, setEvent] = useState(null)
 const [info, setInfo] = useState(false)

 function displayInfo(e) {
   setInfo(true);
   setEvent(e.target.innerText);
}

return (
 
 <div className="times">
   {time.map(times => {
    return (
    <div>
      <button onClick={(e)=> displayInfo(e)}> {times} </button>
    </div>
        )
     })}
    <div>
      {info ? `You have selected ${event} ${props.date.toDateString()}` : null}
    </div>
 </div>
  )
}

export default Time_slots;