const postTimeElapsed = (firstDate, secondDate) => {
    const timeDifferenceInMilli = secondDate - Date.parse(firstDate);
    const timeDifferenceInSeconds = timeDifferenceInMilli / 1000;
    const timeDifferenceInMinutes = timeDifferenceInSeconds / 60;
    const timeDifferenceInHours = timeDifferenceInMinutes / 60;
    const timeDifferenceInDays = timeDifferenceInHours / 24;
    const timeDifferenceInWeeks = timeDifferenceInDays / 7;
    const timeDifferenceInYears = timeDifferenceInWeeks / 52;
    
    const timeString = 
        (timeDifferenceInYears >= 1) ? Math.floor(timeDifferenceInYears) + " Year"  :
        (timeDifferenceInWeeks >= 1) ? Math.floor(timeDifferenceInWeeks) + " Week" : 
        (timeDifferenceInDays >= 1) ? Math.floor(timeDifferenceInDays) + " Day" :
        (timeDifferenceInHours >= 1) ? Math.floor(timeDifferenceInHours) + " Hour" :
        (timeDifferenceInMinutes >= 1) ? Math.floor(timeDifferenceInMinutes) + " Minute" :
        Math.floor(timeDifferenceInSeconds) + " Second";
    
     return (parseInt(timeString.split(" ")[0]) > 1) ? timeString + "s" : timeString;
};

export default postTimeElapsed;