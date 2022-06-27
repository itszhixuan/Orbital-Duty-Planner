import {useState} from 'react';
import Calendar from 'react-calendar';
import TimeSlots from './TimeSlots'
import React from 'react'

function Calendar_display(props) {
 
    const setActive = props.setActive; 

    return (
    <div>
    {props.showTime ? 
    <TimeSlots 
    date={props.date}
    currentEvent={props.currentEvent}
    setActive = {setActive}
    /> : null}
    </div>
    )
}

export default Calendar_display;