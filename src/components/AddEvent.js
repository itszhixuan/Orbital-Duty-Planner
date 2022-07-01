import { useState } from 'react';
import { database, auth} from '../Firebase_config';
import { push, set, ref, update } from "firebase/database";

function AddEvent(props) {

    const [eventName, setEventName] = useState("");
    const [numberOfMembers, setNumberOfMembers] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
  /*   const [hours, setHours] = useState(""); */
    const [dayShiftStartTime, setDayShiftStart] = useState("");
    const [nightShiftStartTime, setNightShiftStart] = useState("");
    const [dayShiftHours, setDayShiftHours] = useState("");
    const [nightShiftHours, setNightShiftHours] = useState("");
    const [emails, setEmails] = useState([""]);
    const [em, setEm] = useState("");
    
    
    const setActive = props.setActive; 
    const events = props.events;
    const setEvents = props.setEvents;
    const emailList = emails.map((e) => 
        <li>
            {e}
        </li>)

    let eventComponent = {
            eventName: eventName,
            numberOfMembers: numberOfMembers,
            startDate: startDate,
            endDate: endDate,
           /* hours: hours, */
            dayShiftStartTime: dayShiftStartTime,
            nightShiftStartTime: nightShiftStartTime,
            dayShiftHours: dayShiftHours,
            nightShiftHours: nightShiftHours,
            planner: auth.currentUser.uid,
            emails : emails,
    }

    function handleSubmit(event) {
        event.preventDefault();
        const newKey = addEventToDatabase(auth.currentUser.uid);
        addEvent(newKey);
    }

    function addEvent(newKey) {
        eventComponent.eventKey = newKey;
        const newEvents = [
            ...events,
            eventComponent
        ];
        setEvents(newEvents);
        setActive("Profile");
    }

    function addEventToDatabase(profileUID) {
        const profileRef = ref(database, "users/" + profileUID);
        const eventRef = push(profileRef);
        const newKey = eventRef.key;
        console.log("Event key: " + newKey);

        eventComponent.eventKey = newKey;
        set(eventRef, eventComponent);
        return newKey;
    }

    function addEmail() {
        const newEmails = [
            ...emails,
            em
        ];
        setEmails(newEmails);
        console.log(em);
        console.log(emails);
    }

    function handleEmailSubmit(e) {
        e.preventDefault();
        addEmail();
    }
    
    return (
        <>
            <div className="event-page">
                <h2>Add an event!</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <p className="event-left">Name of Event: </p> 
                        <input type = 'text' onChange={(e) => setEventName(e.target.value)} className="event-right"/>
                    </div>
                    <div>
                        <p className="event-left">Total Number of Members: </p> 
                        <input type = 'number' onChange={(e) => setNumberOfMembers(e.target.value)} className="event-right"/>
                    </div>
                    <div>
                        <p className="event-left">Start Date: </p> 
                        <input type = 'date' onChange={(e) => setStartDate(e.target.value)} className="event-right"/>
                    </div>
                    <div>
                        <p className="event-left">End Date: </p> 
                        <input type = 'date' onChange={(e) => setEndDate(e.target.value)} className="event-right"/>
                    </div>
{/*                     <div>
                        <p className="event-left">Total Hours per Slot: </p> 
                        <input type = 'number' onChange={(e) => setHours(e.target.value)} className="event-right"/>
                    </div> */}
                    <div>
                        <p className="event-left">Starting time for Day Shift: </p> 
                        <input type = 'time' onChange={(e) => setDayShiftStart(e.target.value)} className="event-right"/>
                    </div>
                    <div>
                        <p className="event-left">Starting time for Night Shift: </p> 
                        <input type = 'time' onChange={(e) => setNightShiftStart(e.target.value)} className="event-right"/>
                    </div>
                    <div>
                        <p className="event-left">Number of Hours for Day Shift: </p> 
                        <input type = 'number' onChange={(e) => setDayShiftHours(e.target.value)} className="event-right"/>
                    </div>
                    <div>
                        <p className="event-left">Number of Hours for Night Shift: </p> 
                        <input type = 'number' onChange={(e) => setNightShiftHours(e.target.value)} className="event-right"/>
                    </div>
                        {/* <div>
                            <p className = "event-left"> Add Email addresses</p>
                            <input onChange={(e) => setEm(e.target.value)} className = "event-right"/>
                            <button onClick={handleEmailSubmit}>Add</button>
                        </div> */}
                    
                    {/* <div>
                            {emailList}
                        </div> */}

                        
                    
                    {/*
                    <div>
                        <p className= "event-left"> Email of members</p> 
                        <input type = "text" onChange = {(e) => handleSubmitEmails(e.target.value) }/>
                    </div>
                    */}
                    <input type="submit" value="Create" className='learnmore-button'/>
                    <button onClick = {() => setActive("Profile")} className="learnmore-button"> Return to your profile</button>
                </form>
{/*                 <div>
                    <button onClick = {() => setActive("Profile")} className="enter-field"> Return to your profile</button>
                </div> */}
            </div>
        </>
    )
}
export default AddEvent;