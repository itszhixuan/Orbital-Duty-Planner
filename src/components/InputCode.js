import { ref, get, val} from "firebase/database";
import { useState } from "react";
import {database, auth} from "../Firebase_config";


function InputCode(props) {
    const [eventCode, setEventCode] = useState("");

    const setActive = props.setActive;
    const events = props.events;
    const setEvents = props.setEvents;
    function handleSubmit(e) {
        e.preventDefault();

        get(ref(database, "events/" + eventCode + "/planner"))
        .then((eventPlanner) => {
            get(ref(database, "users/" + eventPlanner.val() + "/" + eventCode))
            .then((snapshot) => {
                const value = snapshot.val();
                
                const newEvents = [
                    ...events,
                    value
                ]
                console.log(snapshot.val());
                console.log(eventPlanner.val());
                setEvents(newEvents);
            })
        });
       // const emails = get(ref(database, "events/" + eventCode + "/emails")).val();
        /*for (let index = 0; index < emails.length; index++) {
            const element = emails[index];
            if (auth.currentUser.email === element){
               
                break;
            }
            -N5ZyYInWDy-oArWdZAb
        }*/
         
        setActive("Profile");
    }
    return(
        <>
            <form onSubmit = {handleSubmit}>
            <h2 className = "event-left">Input your code!</h2>
            <input  onChange = {(e) => setEventCode(e.target.value)} className="event-right"/>
            <input type = "submit" value = "Apply" className="event-right"/>
            </form>
            <button onClick={() => setActive("Profile")} className = "event-right"> Return</button>
        </>
    )
}

export default InputCode;