import { useState } from "react";
import AddEvent from "./AddEvent";
import {auth} from "../Firebase_config"
import { signOut } from "firebase/auth";

function Profile(props) {
    const [active, setActive] = useState("Profile")
    const [events, setEvents] = useState([]);

    const handleLoggedIn = props.handleLoggedIn;
    const user = props.user;

    const eventList = events.map((e) => 
        <li>
            {e.eventName} |
            <button> Test button</button>
        </li>
    )

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
                    <ul>
                        {eventList}
                    </ul>
                    
                    <button onClick = {() => setActive("add")}> Create Event</button>
                    <button onClick = {logout}>Log out</button>

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