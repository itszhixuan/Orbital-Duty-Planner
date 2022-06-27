

function DisplayCode(props) {
    const setActive = props.setActive;
    const currentEvent = props.currentEvent;

    return (
        <>
            <h1> Code for {currentEvent.eventName} : {currentEvent.eventKey}</h1>
            <button onClick = {() => setActive("Profile")} className='learnmore-button'>Return to profile</button>
        </>
    );

}

export default DisplayCode;