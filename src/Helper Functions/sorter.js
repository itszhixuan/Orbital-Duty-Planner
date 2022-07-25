import {auth, database} from "../Firebase_config";
import { push, set, ref, update, onValue, get} from "firebase/database";
import { shuffleArray} from "./shuffle";


function plan(event) {
    //logging information
    const currentEventRef = ref(database, "events/" + event.eventKey);
    const numberOfDays = Math.ceil((new Date(event.endDate).getTime() - new Date(event.startDate).getTime()) / (1000 * 3600 * 24)) + 1;

    console.log("Current event: " + event.eventKey);
    console.log("Planning event: ");
    console.log("");
    console.log("From: " + event.startDate);
    console.log("To: " + event.endDate);
    console.log("Number of days :" + numberOfDays);
    
    
    //random assignment
    
    get(currentEventRef)
    .then(currentEvent => {

        //code to randomise shifts
        let dayArray = Array(numberOfDays * 2);
        for(let i = 0; i < numberOfDays * 2; i ++) {
            dayArray[i] = i;
        }
        shuffleArray(dayArray);
        console.log("Day Array = "  + dayArray);

        //Shifts per member = the number of shifts needed to fill all days rounded up
        let numOfMembers = currentEvent.child("users").size;
        console.log("Number of members: " + numOfMembers);
        let shiftsPerMember =  Math.ceil(numberOfDays * 2 / numOfMembers);
        console.log("Number of shifts per member : " + shiftsPerMember );

        //Array to keep track of confirmed dates
        let confirmedDateArray = Array(numberOfDays * 2);
        
        //variable to keep track of number of overall allocated shifts
        let currentOverallShift = 0;

        //Loops through each user
        currentEvent.child("users").forEach((user) => {

            //Establish a Set of unavailable shifts
            let currentNumShifts = shiftsPerMember; 
            let unavailableDateSet = new Set();
            user.child("inputs/unavailableDates").forEach((t) => {
                const timeslot = t.val();
                const date = timeslot.date;
                const description = timeslot.description;
                unavailableDateSet.add (date + " " + description);
                console.log("Unavailable date added : (" + date + " " + description + ")");
            });
            //console.log("Set of unavailable dates for " + user.key + ": " + Array.from(unavailableDateSet));

            //allocate shifts
            if (currentOverallShift < numberOfDays * 2) {
                while (currentNumShifts > 0){
                    let shift, pickedDate
                    let blockedArray = [];
                    let pickedShift = dayArray.pop()
                    let isBlocked = true;
                    
                    while(isBlocked) {
                        const date= new Date(event.startDate);
                        date.setDate(new Date(event.startDate).getDate() + Math.floor(pickedShift / 2));//.setDate(new Date(event.startDate).getDate() + pickedShift / 2);
                        pickedDate = date.toDateString();
                        console.log("");
                        console.log("Current picked date: " + pickedDate);
                        if (pickedShift % 2 === 0) {
                            shift= "Day Shift";
                        } else {
                            shift = "Night Shift";
                        }
                        if (! unavailableDateSet.has(pickedDate + " " + shift)){ //if picked date does not clash
                            console.log("Success! " + user.key + " gets " + pickedDate); 
                            console.log("number of remaining shifts to be filled: " + currentOverallShift); 
                            confirmedDateArray[pickedShift] = user.key;
                            set(ref(database, "usersConfirmedDates/" + user.key + "/" + pickedDate + event.eventKey + shift), {
                                eventName : event.eventName
                            });
                            dayArray = dayArray.concat(blockedArray);
                            blockedArray = [];
                            isBlocked = false;
                        } else { //if picked date clashes
                            blockedArray.push(pickedShift);
                            pickedShift = dayArray.pop();
                            console.log("Found unavailable date: " + pickedDate);
                            console.log("Finding new date...")
                        }
                    }
                
                    currentNumShifts --;
                    currentOverallShift ++;
                }
            }
            console.log(confirmedDateArray);
            
            
        });

        //In case of dates that are blocked by all users, randomly assigns date to a user.


        //After looping through each user, apply confirmed dates to calendar
        for (let i = 0; i < confirmedDateArray.length; i += 2) {
                const daysFromStart = i / 2;
                const currentDate = new Date();
                currentDate.setDate(new Date(event.startDate).getDate() + daysFromStart);

                
                set(ref(database, "events/" + event.eventKey + "/confirmedDates/" + currentDate.toDateString() + " Day Shift")
                , confirmedDateArray[i]);
                set(ref(database, "events/" + event.eventKey + "/confirmedDates/" + currentDate.toDateString() + " Night Shift")
                , confirmedDateArray[i + 1]);
                
            }
    });


    
    /*onValue(currentEventRef, (users) => {
        let remainingUserShift = shiftsPerMember;
        users.forEach((user) => {
            const blockedOutDates = user.child("inputs/unavailableDates").val();

            /*user.child("inputs/unavailableDates").forEach((blockedDate) => {
                const array = blockedDate.val().description.split("-");
                blockedOutDates.push(array);
            });
        while(remainingUserShift > 0) {
            if (remainingEventShift > 0) {
                const randomDay = Math.random() * numberOfDays;
                const randomShiftNum = Math.round(Math.random());
                let shift = "";
                if (randomShiftNum === 1) {
                    shift = "Night Shift";
                } else {
                    shift = "Day Shift";
                }
                const allocatedDate = event.startDate.setDay(event.startDate.getDay() + randomDay);
                let isBlocked = false;

                for (let index = 0; index < blockedOutDates.length; index++) {
                    const dateArray = blockedOutDates[index].split("-");
                    const currShift = dateArray[0];
                    const date = dateArray[1];
                    if (date === allocatedDate || currShift === shift || date) {
                        isBlocked = true;
                        break;
                    }
                }
                if (!isBlocked) {

                    remainingUserShift--;
                    remainingEventShift -- ;
                }
            }    
        }

        })
    }); 
    
    const usersList = ref(database, "events").forEach;
    const hours = event.hours;
    const totalUsers = usersList.length;
    //Checks if the event is using the point system
    if (event.usesPoints) {
        usersList.sort((a, b) => a.points - b.points);
    };
    usersList.forEach((user)=> {
        const blockedOutDates = user.blockedOutDates;
        

    });
*/
    
}
export default plan;