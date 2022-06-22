import { useState } from 'react';
import { database, auth} from '../Firebase_config';
import { push, set, ref } from "firebase/database";

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
        const newKey = addEventToDatabase(auth.currentUser.uid);
        addEvent(newKey);
    }

    function addEvent(newKey) {
        const newEvents = [
            ...events,
            {
                eventName: eventName,
                numberOfMembers: numberOfMembers,
                startDate: startDate,
                endDate: endDate,
                hours: hours,
                eventKey: newKey
            }
        ];
        setEvents(newEvents);
        setActive("Profile");
    }

    function addEventToDatabase(profileUID) {
        const profileRef = ref(database, "users/" + profileUID);
        
        const eventRef = push(profileRef);
        const newKey = eventRef.key;
        console.log("Event key: " + newKey);
        set(eventRef, {
            eventName: eventName,
            numberOfMembers: numberOfMembers,
            startDate: startDate,
            endDate: endDate,
            hours: hours,
            key : newKey
          });
        return newKey;
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