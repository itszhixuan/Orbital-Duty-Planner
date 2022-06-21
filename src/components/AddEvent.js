import { useState } from 'react';
import { database, auth} from '../Firebase_config';
import { push, set, ref } from "firebase/database";

function AddEvent(props) {

    const [eventName, setEventName] = useState("");
    const [numberOfMembers, setNumberOfMembers] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [hours, setHours] = useState("");
    const [key, setKey] = useState("");
    
    const setActive = props.setActive; 
    const events = props.events;
    const setEvents = props.setEvents;

    function handleSubmit(event) {
        event.preventDefault();
        addEventToDatabase(auth.currentUser.uid);
        console.log(key);
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
                hours: hours,
                key: key
            }
        ];
        setEvents(newEvents);
        setActive("Profile");
    }

    function addEventToDatabase(profileUID) {
        const eventRef = ref(database, "users/" + profileUID);
        const newEventRef = push(eventRef);
        setKey(newEventRef.key);
        
        set(newEventRef, 
            {
            eventName: eventName,
            numberOfMembers: numberOfMembers,
            startDate: startDate,
            endDate: endDate,
            hours: hours,
            key : key
        }
        );
    }
    
    return (
        <>
            <h2>Add an event!</h2>
            <form onSubmit={handleSubmit}>
                <label >
                    Name of event:
                    <input type = 'text' onChange={(e) => setEventName(e.target.value)} />
                </label>
                <label>
                    Total number of members:
                    <input type = 'number' onChange={(e) => setNumberOfMembers(e.target.value)}/>
                </label>
                <label>
                    Start Date:
                    <input type = 'datetime-local' onChange={(e) => setStartDate(e.target.value)}/>
                </label>
                <label>
                    End Date:
                    <input type = 'datetime-local' onChange={(e) => setEndDate(e.target.value)}/>
                </label>
                <label>
                    Total hours per slot:
                    <input type = 'number' onChange={(e) => setHours(e.target.value)}/>
                </label>
                <input type="submit" value="Create" />
            </form>
            <div>
                <button onClick = {() => setActive("Profile")}> Return to your profile</button>
            </div>
            
        </>
    )
}
export default AddEvent;