var currentDayEl = document.getElementById("currentDay");
var blockHourEl = document.querySelectorAll(".hour");
var blockEventEl = document.querySelectorAll(".event");


function init() { 
    currentDayEl.textContent = moment().format("dddd, MMMM Do");
    var currentHour = moment().format("HH");
    console.log(currentHour);

    for (var i = 0; i < blockHourEl.length; i++) {
        var plannerHour = moment(blockHourEl[i].textContent.trim(), "hA").format("HH");
        console.log(plannerHour);
        
        
        if (plannerHour < currentHour){
            blockEventEl[i].classList.add("past");
        } else if (plannerHour > currentHour) {
            blockEventEl[i].classList.add("future");
        } else {
            blockEventEl[i].classList.add("present");
        }
        
    }

}


init();