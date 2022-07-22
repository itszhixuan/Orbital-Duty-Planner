import { useEffect } from "react";
import { useState } from "react";
import { Calendar } from "react-calendar";
import CalendarDisplay from "./CalendarDisplay";

function Member(props) {
    const [markedDatesSet, setMarkedDatesSet] = useState([new Date()]);

    const currentEvent = props.currentEvent;
    const setActive = props.setActive;
    const points = props.points;
    const setPoints = props.setPoints;
    const weekendPoints = props.weekendPoints;
    const weekdayPoints = props.weekdayPoints;
    const minDate = new Date(currentEvent.startDate);
    const maxDate = new Date(currentEvent.endDate);

    function handleDayClick(value, event) {
        setShowTime(true);
        const newMarkedDates = [
            ...markedDatesSet,
            value
        ];
        
        setMarkedDatesSet(newMarkedDates);
        console.log("Dates " + markedDatesSet + value);
    }

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
    const onDateChange = (newDate) => {
        setDate(newDate);
        console.log(newDate.toDateString());
    }

    /*onCLickday ={() => setShowTime(true)}
                tileClassName = {(activeStartDate, date, view) =>  
                {
                    console.log("Tile date: " + date);
                    console.log("marked date: " + markedDatesSet);
                    if (view === 'month' && markedDatesSet.find(date)) {
                        return 'highlight';
                    } 
                }
                }*/
    return (
        <>
            <h2 className="toppadding"> Choose your dates! {currentEvent.startDate}</h2>
            <body>
                <Calendar
                minDate = {minDate}
                maxDate = {maxDate}
                tileContent = {<p></p>}
                onClickDay = {() => setShowTime(true)} 
                onChange={onDateChange}
                value={date}
                />
                
                <button onClick = {() => setActive("Profile")} className='learnmore-button'>Return to profile</button>

                <CalendarDisplay 
                showTime={showTime}
                date={date}
                currentEvent={currentEvent}
                setActive = {setActive}
                />
            </body>
        </>
    )

}
export default Member;