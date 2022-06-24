import {useState} from 'react';
import Calendar from 'react-calendar';
import Time_slots from './time_slots'
import React from 'react'

function Calendar_display(props) {
 
    return (
    <div>
    {props.showTime ? 
    <Time_slots 
    date={props.date}
    currentEvent={props.currentEvent}
    /> : null}
    </div>
    )
}

export default Calendar_display;