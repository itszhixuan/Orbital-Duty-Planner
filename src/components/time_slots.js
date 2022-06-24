import React from 'react'
import {useState} from 'react';
import Calendar from 'react-calendar';


const time = ['08:00-10:00', '10:00-12:00', '12:00-14:00', '14:00-16:00', '16:00-18:00']


function Time_slots(props) {

  const [event, setEvent] = useState(null);
  const [info, setInfo] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");

  function displayInfo(e) {
    setInfo(true);
    setEvent(e.target.innerText);
  }
  function handleAddTask(event) {
    event.preventDefault();
    addTask(newTaskText);
  }
  function addTask(description) {
    const newTasks = [
      ...tasks,
      {
        description: description,
      }
    ];
    setTasks(newTasks);
    console.log(newTasks);
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
              onClick={(event) => setNewTaskText(event.target.innerText + " " + props.date.toDateString())}
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
            <th>Selected</th>
          </thead>

        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.description}>
              <td>{index + 1}</td>
              <td>{task.description}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  )
}

export default Time_slots;