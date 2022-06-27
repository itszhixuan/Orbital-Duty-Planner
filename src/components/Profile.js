import { useState } from "react";
import AddEvent from "./AddEvent";
import {auth} from "../Firebase_config"
import { signOut } from "firebase/auth";
import Member from "./Member";
import { database } from "../Firebase_config";
import { get, onChildAdded, ref, remove, set, update } from "firebase/database";
import Calendar from "react-calendar";
import plan from "../Helper Functions/sorter";
import DisplayCode from "./DisplayCode";
import InputCode from "./InputCode";

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
    onChildAdded(ref(database, "users/" + auth.currentUser.uid), (event) =>{
        set(ref(database, "events/" + event.key ), {
            emails : event.val().emails
        });
        set(ref(database, "events/" + event.key ), {
            planner : auth.currentUser.uid
        });
    })

    const eventList = events.map((e) => 
        <li>
            <label className="current-events-left">{e.eventName}  </label>         
            <button onClick ={() => handleMember(e)} className="current-events-button"> Choose shifts</button>
            <button onClick = {() => showCode(e)} className = "current-events-button"> View Code</button>
            <button onClick = {() => handlePlan(e)} className= "current-events-button"> Plan</button>
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

    function handlePlan(event){
        plan(event);
    }

    function showCode (event) {
        setCurrentEvent(event);
        setActive("DisplayCode");
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
                    <button onClick={() => setActive("InputCode")} className = "learnmore-button">Input code</button>
                    <button onClick = {logout} className="learnmore-button">Log out</button>

                    <h2> Current Events: </h2>
                    <ul className="current-events-list">
                        {eventList}
                    </ul>
                    <h2> Your active calendar: </h2>
                    <Calendar 
                        tileContent={({activeStartDate, date, view}) => {
                            const a = get(ref(database, "users/" + auth.currentUser.uid + "/ConfirmedDates/" + date));
                            if (a && view === "month") {
                                <p>{a.eventName} + {a.shift}</p>
                            } 
                        }
                        }
                    />

                </div>
                </>
                : active === "AddEvent" 
                ?<AddEvent 
                    setActive = {setActive}
                    events = {events}
                    setEvents = {setEvents}
                />

                :active === "DisplayCode"
                ?<DisplayCode 
                    currentEvent = {currentEvent}
                    setActive = {setActive}
                />
                
                :active === "InputCode"
                ? <InputCode
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