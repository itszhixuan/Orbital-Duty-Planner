import { useState } from "react";
import AddEvent from "./AddEvent";
import {auth} from "../Firebase_config";
import { signOut } from "firebase/auth";
import Member from "./Member";
import { database } from "../Firebase_config";
import { get, onChildAdded, onChildRemoved, ref, remove, set, update, push} from "firebase/database";
import Calendar from "react-calendar";
import plan from "../Helper Functions/sorter";
import DisplayCode from "./DisplayCode";
import InputCode from "./InputCode";
import AlertMessages from "./AlertMessages";

function Profile(props) {
    const [active, setActive] = useState("Profile")
    const [events, setEvents] = useState([]);
    const [currentEvent, setCurrentEvent] = useState("");
    const [points, setPoints] = useState(0);
    const [init, setInit] = useState(true);
    const [weekdayPoints, setCurrentWeekdayPoints] = useState(1);
    const [weekendPoints, setCurrentWeekendPoints] = useState(2);
    const [confirmedDates, setConfirmedDates] = useState([])
    
    const [tabOpen, setTabOpen] = useState();
    const [joinedTabOpen, setJoinedTabOpen] = useState();
    const [buttonProcess, setButtonProcess] = useState({
        label: 'Plan Your Event'
    })

    const handleLoggedIn = props.handleLoggedIn;
    const user = props.user;

    const [submitted, setSubmitted] = useState(false);
    const [codeCorrect, setCodeCorrect] = useState(false);
    const [codeIncorrect, setCodeIncorrect] = useState(false);
    const [chooseShiftInputs, setChooseShiftInputs] = useState(false);
    const [eventPlanned, setEventPlanned] = useState(false);

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
                        eventData
                    ];
                
                });
                setEvents(newEvents);
            } else {
                console.log("hello there's nothing here");
            } 

        const confirmedRef = ref(database, "usersConfirmedDates/" + auth.currentUser.uid);
            get(confirmedRef).then((snapshot) => {
                if (snapshot.exists()) {
                    var newConfirmedDates = [];
                    snapshot.forEach((event) => {
                        const eventData = event.val();
                        eventData.date = event.key;
                        newConfirmedDates = [
                            ...newConfirmedDates,
                            eventData,
                        ];
                    });
                    console.log(newConfirmedDates);
                    setConfirmedDates(newConfirmedDates);
                } else {
                    console.log("No confirmed dates");
                }
            })

            }).catch ((error) => {
                    console.error(error);
            });
    }

    //initialise confirmed dates
    
    
    //check current event list
    console.log(events);

     const logout = async () => {
        try {
           await signOut(auth);
           handleLoggedIn();
        } catch (error) {
            console.log(error.message);
        }
    }

    function handlePlan(event){  
        setButtonProcess({label: 'Loading...'});
        setTimeout(() => {
            setButtonProcess({
                label: 'Plan Complete!'
            })
            setEventPlanned(true);
        }, 3000)      
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
        setActive("Member");
    }

    function deleteEvent(event, planned) {
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
       
        if(planned) {
            //remove from other users event lists
           get(ref(database, "events/" + eventKey + "/users"))
           .then((members) => {
            members.forEach((member) => {
            console.log("Member :" + member.key);
                remove(ref(database, "users/" + member.key + "/" + eventKey));
            });
           });
           //remove event from main events
            remove(ref(database, "events/" + eventKey))
            .then(function(event) {
                console.log("Removed from event node :" + eventKey);
            })
            .catch(function(error) {
                console.log("Error while removing event from events :" + error);
            })
        } else {
            //remove user from event in main event list
            remove(ref(database, "events/" + eventKey + "/users/" + auth.currentUser.uid));
        }
        setEvents(newEvents);
    }
    function mapEventsToListPlanned(e) {
        return <li className="shrink">
            <label className="current-events-left">{e.eventName}  </label>
            <label className="dropdown">
                <i class="fa fa-bars" onClick={() =>  setTabOpen(!tabOpen)}></i>
            </label>
            <div className={tabOpen ? 'test' : 'test-hidden'}>
                <button onClick = {() => showCode(e)} className = "current-events-button"> View Code</button>        
                <button onClick = {() => handlePlan(e)} className= "current-events-button"> {buttonProcess.label} </button>
                <button onClick={() => deleteEvent(e, true)} className="current-events-button"> Remove</button>
            </div>
        </li>
    }
    function mapEventsToListJoined(e) {
        return <li className="shrink">
            <label className="current-events-left">{e.eventName}  </label>         
            <label className="dropdown">
                <i class="fa fa-bars" onClick={() =>  setJoinedTabOpen(!joinedTabOpen)}></i>
            </label>
            <div className={joinedTabOpen ? 'test' : 'test-hidden'}>
                <button onClick ={() => handleMember(e)} className="current-events-button"> Choose shifts</button>
                <button onClick = {() => showCode(e)} className = "current-events-button"> View Code</button>
                <button onClick={() => deleteEvent(e, false)} className="current-events-button"> Remove</button>
            </div>   
        </li>
    }

/*     function collapseStatus(e) {
        setTabOpen((prevState) =>  ({...prevState, [e.eventKey]: !prevState[e.eventKey]}))
        console.log(tabOpen);
    } */

    const plannedEvents = events.filter((event) => event.planner === auth.currentUser.uid);
    const joinedEvents = events.filter((event) => event.planner !== auth.currentUser.uid);
    const plannedEventList = plannedEvents.map(mapEventsToListPlanned);
    const joinedEventList = joinedEvents.map(mapEventsToListJoined);

    /*
                        tileContent={({date, view}) => {
                            const a = get(ref(database, "usersConfirmedDates/" + auth.currentUser.uid + "/confirmedDates/" + date));
                            if (a && view === "month") {
                                <p>{a.eventName} + {" " + a.description}</p>
                            } else {
                                <p>HI</p>
                            }
                        }
                        }*/
                    
    return (
        <>
            {
                active === "Profile" 
                ? <> 
                <div className='event-page'>
                    <AlertMessages
                        submitted = {submitted}
                        setSubmitted = {setSubmitted}
                        codeCorrect = {codeCorrect}
                        setCodeCorrect = {setCodeCorrect}
                        codeIncorrect = {codeIncorrect}
                        setCodeIncorrect = {setCodeIncorrect}
                        chooseShiftInputs = {chooseShiftInputs}
                        setChooseShiftInputs = {setChooseShiftInputs}
                        eventPlanned = {eventPlanned}
                        setEventPlanned = {setEventPlanned}                
                    />
                    <h2> Hello, {user.email}!</h2>
                    <button onClick = {() => setActive("AddEvent")} className="learnmore-button"> Create Event</button>
                    <button onClick={() => setActive("InputCode")} className = "learnmore-button">Input code</button>
                    <button onClick = {logout} className="learnmore-button">Log out</button>

                    <h2> Events Created:</h2>
                    <ul className="current-events-list">
                        {plannedEventList}
                    </ul>
                    <h2> Events Joined:</h2>
                    <ul className="current-events-list">
                        {joinedEventList}
                    </ul>
                    <h2> Your active calendar: </h2>
                    <Calendar 
                        tileContent={({date, view}) => {
                            let dates = confirmedDates.filter((item) => item.date === date.toDateString() + " Day Shift"
                            || item.date === date.toDateString() + " Night Shift")
                            .map((item) => {
                                return <li> 
                                <label> {item.eventName} : {item.description}</label>
                                
                                 </li>
                            });
                            return <ul>
                                {dates}
                            </ul>
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
                    setSubmitted = {setSubmitted}
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
                    setCodeCorrect = {setCodeCorrect}
                    setCodeIncorrect = {setCodeIncorrect}
                />

                :<Member 
                    currentEvent = {currentEvent}
                    setActive = {setActive}
                    points = {points}
                    setPoints = {setPoints}
                    weekdayPoints = {weekdayPoints}
                    weekendPoints = {weekendPoints}
                    setChooseShiftInputs = {setChooseShiftInputs}
                />
            }
        </>
    )
}

export default Profile;