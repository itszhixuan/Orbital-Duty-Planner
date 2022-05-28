import { Calendar } from "react-calendar";

function Member(props) {
    const currentEvent = props.currentEvent;
    const setActive = props.setActive;
    const minDate = new Date(currentEvent.startDate);
    const maxDate = new Date(currentEvent.endDate);

    
    return (
        <>
            <h2> Choose your dates! {currentEvent.startDate}</h2>
            <body>
                <Calendar
                minDate = {minDate}
                maxDate = {maxDate}
                tileContent = {<p>Hello</p>}
                />
                <button onClick = {() => setActive("Profile")} >Return to profile</button>
            </body>
        </>
    )

}
export default Member;