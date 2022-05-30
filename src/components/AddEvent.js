import { useState } from 'react';
function AddEvent(props) {
    /*
    const setEventName = props.setEventName;
    const setNumberOfMembers = props.setNumberOfMembers;
    const setStartDate = props.setNumberOfMembers;
    const setEndDate = props.setEndDate;
    const setHours = props.setHours;*/

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