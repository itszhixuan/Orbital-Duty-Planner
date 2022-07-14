import { auth } from "../Firebase_config";


function DisplayCode(props) {
    const setActive = props.setActive;
    const currentEvent = props.currentEvent;
    console.log(currentEvent.planner);
    console.log(currentEvent.planner === auth.currentUser.uid);

    let isCopied = false;
    const copyText = async () => {
        try {
            await navigator.clipboard
            .writeText(currentEvent.eventKey)
            .then(() => {
                alert ("Successfully copied")
            })
            .catch(() => {
                alert ("Failed to copy to Clipboard")
            })
            isCopied = true;
            setTimeout(() => {
                isCopied = false;
            }, 1500)
        } catch (error) {
            console.error('error', error)
        }
    }
    return (
        <>
            <div className="display_code">
                <h1> Code for {currentEvent.eventName}:</h1>
                <h2 className="code-left"> {currentEvent.eventKey}</h2>
                <button onClick={copyText} className = 'learnmore-button'>
                    { isCopied ? 'Copied!' : 'Copy Code' }
                </button>

                <p> Share the code with your Members/Participants!</p>
                <button onClick = {() => setActive("Profile")} className='learnmore-button'>Return to profile</button>
            </div>               
        </>
    );

}

export default DisplayCode;