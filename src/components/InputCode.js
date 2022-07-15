import { ref, get, val, set} from "firebase/database";
import { useState } from "react";
import {database, auth} from "../Firebase_config";


function InputCode(props) {
    const [eventCode, setEventCode] = useState("");
    const [invalidCode, setInvalidCode] = useState(null);

    const setActive = props.setActive;
    const events = props.events;
    const setEvents = props.setEvents;
    function handleSubmit(e) {
        e.preventDefault();
        
/*         try{ */
            get(ref(database, "events/" + eventCode + "/planner"))
            .then((eventPlanner) => {
                get(ref(database, "users/" + eventPlanner.val() + "/" + eventCode))
                .then((snapshot) => {
                    const value = snapshot.val();
                    console.log(eventCode);
                    console.log(snapshot.val());
                    if (snapshot.exists()) {
                        set(ref(database, "users/" + auth.currentUser.uid + "/" + eventCode), value);
                    
                        const newEvents = [
                            ...events,
                            value
                        ]
                        console.log(snapshot.val());
                        console.log(eventPlanner.val());
                        setEvents(newEvents);
                    } else {
                        alert ("Code is invalid")
                        /* setInvalidCode("The code is invalid.") */
                    }
                })
            })
        /*} catch(error) {
            console.log(error)
            if (snapshot.val() === null){
                alert ("Code is invalid. Please check again.")
            }
        }; */
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
            {/* { invalidCode && <p>{ invalidCode }</p> } */}
            <button onClick={() => setActive("Profile")} className = "learnmore-button"> Return</button>
        </>
    )
}

export default InputCode;