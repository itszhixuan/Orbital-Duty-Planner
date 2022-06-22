import { useEffect } from "react";
import { useState } from "react";
import { Calendar } from "react-calendar";
import Calendar_display from "./calendar_display";

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
    
    const [date, setDate] = useState(new Date());
    const [showTime, setShowTime] = useState(false);

    return (
        <>
            <h2 className="toppadding"> Choose your dates! {currentEvent.startDate}</h2>
            <body>
                <Calendar
                minDate = {minDate}
                maxDate = {maxDate}
                tileContent = {<p></p>}
/*                 onClickDay = {(value, event) => handleClick(value)} */
                onChange={setDate}
                value={date}
                onClickDay={() => setShowTime(true)}
                />
                <button onClick = {() => setActive("Profile")} className='learnmore-button'>Return to profile</button>
{/*                 <div>
                    <Calendar onChange={setDate} value={date} onClickDay={() => setShowTime(true)}/>
                </div> */}
                {date.length > 0 ? (
                <p>
                    <span>Start:</span>
                    {date[0].toDateString()}
                    &nbsp;
                    &nbsp;
                    <span>End:</span>{date[1].toDateString()}
                </p>
                        ) : (
                <p>
                    <span>Default selected date:</span>{date.toDateString()}
                </p> 
                        )
                }
                <Calendar_display showTime={showTime} date={date}/>
            </body>
        </>
    )

}
export default Member;