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
    const [points, setPoints] = useState(0);
    const [init, setInit] = useState(true);
    const [weekdayPoints, setCurrentWeekdayPoints] = useState(1);
    const [weekendPoints, setCurrentWeekendPoints] = useState(2);

    const handleLoggedIn = props.handleLoggedIn;
    const user = props.user;

    //checks if events are initialised
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
                            /* hours: eventData.hours, */
                            dayShiftStartTime: eventData.dayShiftStartTime,
                            nightShiftStartTime: eventData.nightShiftStartTime,
                            dayShiftHours: eventData.dayShiftHours,
                            nightShiftHours: eventData.nightShiftHours,
                            eventKey: eventData.eventKey
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
            <label className="current-events-left">{e.eventName}  </label>         
            <button onClick ={() => handleMember(e)} className="current-events-button"> Choose shifts</button>
            <button onClick={() => deleteEvent(e)} className="current-events-button"> Remove</button>
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
        console.log("Profile member key:" + member.eventKey);
        console.log("Start Date:" + member.eventName);
        /*
        setCurrentWeekendPoints(member.weekendPoints);
        setCurrentWeekdayPoints(member.weekdayPoints);
        */
        setActive("Member");
    }

    function deleteEvent(event) {
        const eventIndex = events.indexOf(event);
        const eventKey = event.eventKey;
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
                    points = {points}
                    setPoints = {setPoints}
                    weekdayPoints = {weekdayPoints}
                    weekendPoints = {weekendPoints}
                />
            }
        </>
    )
}

export default Profile;