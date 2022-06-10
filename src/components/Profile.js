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
                <div className='event-page'>
                    <h2> Hello, {user.email}!</h2>
                    <button onClick = {() => setActive("AddEvent")} className="learnmore-button"> Create Event</button>
                    <button onClick = {logout} className="learnmore-button">Log out</button>
                    <h2> Current Events: </h2>
                    <ul className="current-events-list">
                        {eventList}
                    </ul>

                </div>
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