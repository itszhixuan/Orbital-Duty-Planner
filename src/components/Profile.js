import { useState } from "react";
import AddEvent from "./AddEvent";

function Profile(props) {
    const [active, setActive] = useState("Profile")
    const [events, setEvents] = useState([]);

    const user = props.user;

    const eventList = events.map((e) => 
        <li>
            {e.eventName},
            {e.numberOfMembers},
            {e.startDate},
            {e.endDate},
            {e.hours}
        </li>
    )

    

    return (
        <>
            {
                active === "Profile" 
                ? <> 
                    <h2> Hello, {user.email} !</h2>
                    <ul>
                        {eventList}
                    </ul>
                    
                    <button onClick = {() => setActive("add")}> Create Event</button>

                </>
                
                : <AddEvent 
                    setActive = {setActive}
                    events = {events}
                    setEvents = {setEvents}

                />
            }
        </>
        
        
    )
}

export default Profile;