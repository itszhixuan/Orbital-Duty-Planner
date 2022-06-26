

function plan(event, calendar) {
    const usersList = event.users;
    const hours = event.hours;
    const totalUsers = usersList.length;
    //Checks if the event is using the point system
    if (event.usesPoints) {
        usersList.sort((a, b) => a.points - b.points);
    };
    usersList.forEach((user)=> {
        const blockedOutDates = user.blockedOutDates;
        

    });


    
}
export default plan;