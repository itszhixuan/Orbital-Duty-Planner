import React from 'react'
import { Alert, Snackbar } from '@mui/material';

function AlertMessages(props) {
 
    const submitted = props.submitted; 
    const setSubmitted = props.setSubmitted;
    const codeCorrect = props.codeCorrect;
    const setCodeCorrect = props.setCodeCorrect;
    const codeIncorrect = props.codeIncorrect;
    const setCodeIncorrect = props.setCodeIncorrect;
    const chooseShiftInputs = props.chooseShiftInputs;
    const setChooseShiftInputs = props.setChooseShiftInputs;
    const eventPlanned = props.eventPlanned;
    const setEventPlanned = props.setEventPlanned;

    function hideMessage(){
        setSubmitted(false);
        console.log(submitted);
    }

    function checkCode(){
        setCodeCorrect(false);
        console.log(codeCorrect);
    }

    return (
        <>
            {submitted && 
                <Snackbar open={submitted} anchorOrigin={{vertical: 'top', horizontal: 'center',}} autoHideDuration={6000} onClose={() => {hideMessage()}}>
                    <Alert severity="success" onClose={() => {hideMessage()}}>
                        Event successfully created!
                    </Alert>
                </Snackbar>
            }
            {codeCorrect &&
                <Snackbar open={codeCorrect} anchorOrigin={{vertical: 'top', horizontal: 'center',}} autoHideDuration={6000} onClose={() => {checkCode()}}>
                    <Alert severity="success" onClose={() => {checkCode()}}>
                        Event Joined Successfully!
                    </Alert>
                </Snackbar>
            }
            {codeIncorrect &&
                <Snackbar open={codeIncorrect} anchorOrigin={{vertical: 'top', horizontal: 'center',}} autoHideDuration={6000} onClose={() => {setCodeIncorrect(false)}}>
                    <Alert severity="error" onClose={() => {setCodeIncorrect(false)}}>
                        Code is invalid!
                    </Alert>
                </Snackbar>
            }
            {chooseShiftInputs &&
                <Snackbar open={chooseShiftInputs} anchorOrigin={{vertical: 'top', horizontal: 'center',}} autoHideDuration={6000} onClose={() => {setChooseShiftInputs(false)}}>
                    <Alert severity="success" onClose={() => {setChooseShiftInputs(false)}}>
                        Your inputs have been recorded!
                    </Alert>
                </Snackbar>
            }
            {eventPlanned &&
                <Snackbar open={eventPlanned} anchorOrigin={{vertical: 'top', horizontal: 'center',}} autoHideDuration={6000} onClose={() => {setEventPlanned(false)}}>
                    <Alert severity="success" onClose={() => {setEventPlanned(false)}}>
                        Your event has been planned! The shifts will be displayed on each individual Member's account.
                    </Alert>
                </Snackbar>
            }                
        </>
    )
}

export default AlertMessages;