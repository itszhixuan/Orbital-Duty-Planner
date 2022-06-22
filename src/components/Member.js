import { useEffect } from "react";
import { Calendar } from "react-calendar";

function Member(props) {
    const currentEvent = props.currentEvent;
    const setActive = props.setActive;
    const points = props.points;
    const setPoints = props.setPoints;
    const weekendPoints = props.weekendPoints;
    const weekdayPoints = props.weekdayPoints;
    const minDate = new Date(currentEvent.startDate);
    const maxDate = new Date(currentEvent.endDate);

    function handleClick(value) {
        const dayOfWeek = value.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            setPoints(points + weekendPoints);
        } else {
            setPoints(points + weekdayPoints);
        }
    }
    useEffect(() => console.log("Current points = " + points));
    
    return (
        <>
            <h2 className="toppadding"> Choose your dates! {currentEvent.startDate}</h2>
            <body>
                <Calendar
                minDate = {minDate}
                maxDate = {maxDate}
                tileContent = {<p></p>}
                onClickDay = {(value, event) => handleClick(value)}
                />
                <button onClick = {() => setActive("Profile")} className='learnmore-button'>Return to profile</button>
            </body>
        </>
    )

}
export default Member;