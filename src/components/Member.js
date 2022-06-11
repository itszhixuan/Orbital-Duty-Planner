import { Calendar } from "react-calendar";

function Member(props) {
    const currentEvent = props.currentEvent;
    const setActive = props.setActive;
    const minDate = new Date(currentEvent.startDate);
    const maxDate = new Date(currentEvent.endDate);

    function helper(activeStartDate, date, view ) {
        
    }

    
    return (
        <>
            <h2 className="toppadding"> Choose your dates! {currentEvent.startDate}</h2>
            <body>
                <Calendar
                minDate = {minDate}
                maxDate = {maxDate}
                tileContent = {<p></p>}
                />
                <button onClick = {() => setActive("Profile")} className='learnmore-button'>Return to profile</button>
            </body>
        </>
    )

}
export default Member;