import { auth } from "../Firebase_config";


function DisplayCode(props) {
    const setActive = props.setActive;
    const currentEvent = props.currentEvent;
    console.log(currentEvent.planner);
    console.log(currentEvent.planner === auth.currentUser.uid);

    return (
        <>
            <div className="display_code">
                <h1> Code for {currentEvent.eventName}:</h1>
                <h2> {currentEvent.eventKey}</h2>
                <p> Share the code with your Members/Participants!</p>
                <button onClick = {() => setActive("Profile")} className='learnmore-button'>Return to profile</button>
            </div>               
        </>
    );

}

export default DisplayCode;