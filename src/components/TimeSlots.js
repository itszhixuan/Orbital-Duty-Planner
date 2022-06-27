import React from 'react'
import {useState} from 'react';
import Calendar from 'react-calendar';
import { database, auth} from '../Firebase_config';
import { push, set, ref } from "firebase/database";


const time = ['Day Shift', 'Night Shift']


function Time_slots(props) {

  const [event, setEvent] = useState(null);
  const [info, setInfo] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [currDate, setCurrDate] = useState(""); 
  const currentEvent = props.currentEvent;
  const setActive = props.setActive; 

  function displayInfo(e) {
    setInfo(true);
    setEvent(e.target.innerText);
  }
  function test(shift) {

    setNewTaskText(shift);
    setCurrDate(props.date.toDateString());
  }
  function handleAddTask(event) {
    /* setCurrDate(props.date.toDateString()); */
    event.preventDefault();
    /* setNewTaskText(event.target.innerText); */
    
    console.log(newTaskText);
    console.log(currDate);
    addTask(newTaskText, currDate);
  }
  function addTask(description,date) {
    const newTasks = [
      ...tasks,
      {
        description: description,
        date: date,
      }
    ];
    setTasks(newTasks);
    console.log(newTasks);
  }
  function handleSubmit(event) {
    event.preventDefault();
    addEventToDatabase(auth.currentUser.uid, currentEvent.eventKey);
    setActive("Profile");
  }
  function addEventToDatabase(profileUID, eventKey) {
    const eventRef = ref(database, "events/" + eventKey + "/users/" + profileUID + "/inputs/")
    console.log("Event Key: " + eventKey);
    /* const inputsRef = push(eventRef);
    const inputKey = inputsRef.key;
    console.log("User Input key: " + inputKey); */
    set(eventRef, {
      unavailableDates: tasks,/* 
      inputKey : inputKey, */
    });
  }

return (
    <div>
      <div>
        <div>
          <p>You are looking at shifts for {event} {props.date.toDateString()} </p>
          <p>Please select dates that you are unavailable/would like to block out</p>
          
        </div>
        <form onSubmit={handleAddTask} className="scrolling_for_shifts">
          {time.map(times => {
            return (
            <div>
              <button className="calendar-button"
/*               onClick={(event) => setNewTaskText(event.target.innerText + " " + props.date.toDateString())} */
              onClick={(event) => test(event.target.innerText)}
              value={newTaskText}  
              onChange={(e)=> displayInfo(e)}>
              {times} 
              </button>
            </div>
                )
          })}
{/*           <input type="submit" value="Add" /> */}
        </form>
      </div>

      <div className="scrolling-for-list">
        <p>Current list of blocked out dates:</p>
        <table className='center'>
          <thead>
            <th>No.</th>
            <th>Shift</th>
            <th>Date</th>
          </thead>

        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.description}>
              <td>{index + 1}</td>
              <td>{task.description}</td>
              <td>{task.date}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
      <form onSubmit={handleSubmit}>
        <button 
        type='submit'
        value='Create'
        className='learnmore-button'
        > Submit </button>
      </form>
    </div>
  )
}

export default Time_slots;