import { useState } from "react";
import AddEvent from "./AddEvent";
import {auth} from "../Firebase_config"
import { signOut } from "firebase/auth";
import Member from "./Member";
import { database } from "../Firebase_config";
import { get, ref, remove } from "firebase/database";

function Profile(props) {
    const [active, setActive] = useState("Profile")
    const [events, setEvents] = useState([]);
    const [currentEvent, setCurrentEvent] = useState("");
    const [init, setInit] = useState(true);

    const handleLoggedIn = props.handleLoggedIn;
    const user = props.user;

    if (init) {
        setInit(false);
        const eventRef = ref(database, 'users/' + auth.currentUser.uid);
        get(eventRef).then((snapshot) => {
            if(snapshot.exists()) {
                console.log(snapshot.val());
                var newEvents = [];
                snapshot.forEach((event) => {
                    const eventData = event.val();
                    newEvents = [
                        ...newEvents, 
                        {
                            eventName: eventData.eventName,
                            numberOfMembers: eventData.numberOfMembers,
                            startDate: eventData.startDate,
                            endDate: eventData.endDate,
                            hours: eventData.hours,

                        }
                    ];
                
                });
                setEvents(newEvents);
            } else {
                console.log("hello there's nothing here");
            } 
        }).catch ((error) => {
                console.error(error);
        });
    }
    
    
   /* eventRef.once('value', (eventlist) => {
        
                eventlist.forEach((event) => {
                const eventData = event.val();
                const newEvents = [
                    ...events, 
                    {
                        eventName: eventData.eventName,
                        numberOfMembers: eventData.numberOfMembers,
                        startDate: eventData.startDate,
                        endDate: eventData.endDate,
                        hours: eventData.hours
                    }
                ];
                setEvents(newEvents);
            });
           
        });
         */

    const eventList = events.map((e) => 
        <li>
            <label>{e.eventName}  </label>         
            <button onClick ={() => handleMember(e)} > Choose shifts</button>
            <button onClick={() => deleteEvent(e)}> Remove</button>
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

    function handleMember(member) {
        setCurrentEvent(member);
        setActive("Member");
    }

    function deleteEvent(event) {
        const eventIndex = events.indexOf(event);
        const eventKey = event.key;
        events.splice(eventIndex, 1);
        const newEvents = [
            ...events
        ]
        
        remove(ref(database, "users/" + auth.currentUser.uid + "/" + eventKey))
        .then(function() {
            console.log("Removal success!");
            console.log("Event key :" + eventKey);
        })
        .catch(function(error) {
            console.log("Error detected while removing event :" + error);
        });     
       
        
        setEvents(newEvents);
    }
      

    return (
        <>
            {
                active === "Profile" 
                ? <> 
                    <h2> Hello, {user.email} !</h2>
                    <h2> Create or join an event!</h2>
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