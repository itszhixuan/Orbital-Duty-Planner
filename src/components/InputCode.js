import { ref, get, val, set} from "firebase/database";
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
                set(ref(database, "users/" + auth.currentUser.uid + "/" + eventCode), value);
                
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
            <form onSubmit = {handleSubmit} className="display_code">
            <h2>Have a code? Input it here!</h2>
            {/* <h2 className = "event-left">Input your code!</h2> */}
            <input  onChange = {(e) => setEventCode(e.target.value)} className="event-right"/>
            <input type = "submit" value = "Apply" className="learnmore-button"/>
            <p>Don't have a code? Create a new event!</p>
            </form>
            <button onClick={() => setActive("Profile")} className = "learnmore-button"> Return</button>
        </>
    )
}

export default InputCode;