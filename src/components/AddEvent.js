import { useState } from 'react';
import { database, auth} from '../Firebase_config';
import { push, set, ref } from "firebase/database";
import userEvent from '@testing-library/user-event';

function AddEvent(props) {

    const [eventName, setEventName] = useState("");
    const [numberOfMembers, setNumberOfMembers] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [hours, setHours] = useState("");
    

    const setActive = props.setActive; 
    const events = props.events;
    const setEvents = props.setEvents;

    function handleSubmit(event) {
        event.preventDefault();
        addEventToDatabase(auth.currentUser.uid);
        addEvent();
    }

    function addEvent() {
        const newEvents = [
            ...events,
            {
                eventName: eventName,
                numberOfMembers: numberOfMembers,
                startDate: startDate,
                endDate: endDate,
                hours: hours
            }
        ];
        setEvents(newEvents);
        setActive("Profile");
    }
    function addEventToDatabase(profileUID) {
        const eventRef = ref(database, "users/" + profileUID);
        const newEventRef = push(eventRef);
        console.log(newEventRef.key);
        
        set(newEventRef, {
            eventName: eventName,
            numberOfMembers: numberOfMembers,
            startDate: startDate,
            endDate: endDate,
            hours: hours,
            key : newEventRef.key
        });
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
                        <input type = 'datetime-local' onChange={(e) => setStartDate(e.target.value)} className="event-right"/>
                    </div>
                    <div>
                        <p className="event-left">End Date: </p> 
                        <input type = 'datetime-local' onChange={(e) => setEndDate(e.target.value)} className="event-right"/>
                    </div>
                    <div>
                        <p className="event-left">Total Hours per Slot: </p> 
                        <input type = 'number' onChange={(e) => setHours(e.target.value)} className="event-right"/>
                    </div>
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