import {auth, database} from "../Firebase_config";
import { push, set, ref, update, onValue, get} from "firebase/database";
import { shuffleArray} from "shuffle";


function plan(event) {
    //logging information
    const currentEventRef = ref(database, "events/" + event.eventKey);
    const numberOfDays = Math.ceil((new Date(event.endDate).getTime() - new Date(event.startDate).getTime()) / (1000 * 3600 * 24));

    console.log("Current event: " + event.eventKey);
    console.log("Planning event: ");
    console.log("");
    console.log("From :" + event.startDate);
    console.log("Number of days :" + numberOfDays);
    
    
    //random assignment
    
    get(currentEventRef)
    .then(currentEvent => {
        let remainingEventShift = numberOfDays * 2;

        //code to randomise shifts
        let dayArray;
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
        let currentShift = 0;

        //Loops through each user
        currentEvent.child("users").forEach((user) => {

            //Establish a Set of unavailable shifts
            let currentNumShifts = shiftsPerMember; 
            let unavailableDateSet = new Set();
            user.child("inputs/unavailableDates").forEach((t) => {
                const timeslot = t.val();
                const date = timeslot.date;
                const description = timeslot.description;
                unavailableDateSet.add( date + " " + description);
            });

            //allocate shifts
            if (currentShift < numberOfDays * 2) {
                while (currentNumShifts > 0){
                    let shift, pickedDate, blockedArray;
                    let pickedShift = dayArray.pop()
                    let isBlocked = true;
                    
                    while(isBlocked) {
                        pickedDate = new Date().setDate(event.startDate + pickedShift / 2).toDateString();
                        if (pickedShift % 2 === 0) {
                            shift= "Day Shift";
                        } else {
                            shift = "Night Shift";
                        }
                        if (! unavailableDateSet.has(pickedDate + shift)){ //if picked date does not clash
                            confirmedDateArray[pickedShift] = user.key;
                            dayArray.concat(blockedArray);
                            isBlocked = false;
                        } else { //if picked date clashes
                            blockedArray.push(pickedShift);
                            pickedShift.pop();
                        }
                    }
                
                    currentNumShifts --;
                    currentShift ++;
                }
            }
            console.log(dayArray);
            for (let i = 0; i < dayArray.length; i += 2) {
                const daysFromStart = i / 2;
                const currentDate = new Date().setDate(event.startDate + daysFromStart).toDateString();

                set(ref(database, "events/" + event.eventKey + "/confirmedDates/" + currentDate + "Day Shift")
                , dayArray[i]);
                set(ref(database, "events/" + event.eventKey + "/confirmedDates/" + currentDate + "Night Shift")
                , dayArray[i + 1]);
            }
            
        })


        //After looping through each user, apply confirmed dates to calendar

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