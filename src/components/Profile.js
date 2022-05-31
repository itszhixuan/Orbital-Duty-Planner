import { useState } from "react";
import AddEvent from "./AddEvent";
import {auth} from "../Firebase_config"
import { signOut } from "firebase/auth";
import Member from "./Member";

function Profile(props) {
    const [active, setActive] = useState("Profile")
    const [events, setEvents] = useState([]);
    const [currentEvent, setCurrentEvent] = useState("");
    /*{const [points, setPoints] = useState(0);}*/

    const handleLoggedIn = props.handleLoggedIn;
    const user = props.user;

    const eventList = events.map((e) => 
        <li>
            <label>{e.eventName}  </label>         
            <button onClick ={() => handleMember(e)} > Choose shifts</button>
            <button> Remove(test) </button>
        </li>
    )

    function handleMember(member) {
        setCurrentEvent(member);
        setActive("Member");
    }

    const logout = async () => {
        try {
           await signOut(auth);
           handleLoggedIn();
        } catch (error) {
            console.log(error.message);
        }
    }
      

    return (
        <>
            {
                active === "Profile" 
                ? <> 
                    <h2> Hello, {user.email} !</h2>
                    <h2> Let's create an event!</h2>
                    <ul>
                        {eventList}
                    </ul>
                    
                    <button onClick = {() => setActive("AddEvent")}> Create Event</button>
                    <button onClick = {logout}>Log out</button>

                </>
                : active === "AddEvent" 
                ?<AddEvent 
                    setActive = {setActive}
                    events = {events}
                    setEvents = {setEvents}
                />

                :<Member 
                    currentEvent = {currentEvent}
                    setActive = {setActive}
                />
            }
        </>
    )
}

export default Profile;