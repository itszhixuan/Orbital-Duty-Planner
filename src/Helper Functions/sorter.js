import {auth, database} from "../Firebase_config";
import { push, set, ref, update, onValue } from "firebase/database";


function plan(event) {
    //find number of days
    const numberOfDays = Math.ceil((event.endDate.getTime() - event.startDate.getTime()) / (1000 * 3600 * 24));
    const shiftsPerMember =  Math.ceil(numberOfDays * 2 / event.numberOfMembers);
    const usersRef = ref(database, "events/" + event.eventKey + "/users");
    let remainingEventShift = numberOfDays * 2;
    onValue(usersRef, (users) => {
        let remainingUserShift = shiftsPerMember;
        users.forEach((user) => {
            const blockedOutDates = user.child("inputs/unavailableDates").val();

            /*user.child("inputs/unavailableDates").forEach((blockedDate) => {
                const array = blockedDate.val().description.split("-");
                blockedOutDates.push(array);
            });*/
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
    /*
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
    return 
}
export default plan;