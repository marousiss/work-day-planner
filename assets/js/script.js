var currentDayEl = document.getElementById("currentDay");
var blockHourEl = document.querySelectorAll(".hour");
var blockEventEl = document.querySelectorAll(".event");
var container = document.querySelector(".container");


function init() { 
    currentDayEl.textContent = moment().format("dddd, MMMM Do");
    var currentHour = moment().format("HH");
    var currentDate = moment().format("YYYYMMDD"); 
   
    //get the saved date from the local storage 
    var savedDate = localStorage.getItem("date");

    // Validate the date
    if (savedDate !== null){
        // If not current date save current date and clean local storage
        if (savedDate !== currentDate){
            localStorage.setItem("date", currentDate);
            cleanUplocalStorage();
        }
    } else {
        // save the current date to local storage
        localStorage.setItem("date", currentDate);
    }

    // Color the event blocks according to the time(i.e past, present, future)
    for (var i = 0; i < blockHourEl.length; i++) {
        var plannerHour = moment(blockHourEl[i].textContent.trim(), "hA").format("HH");
        if (plannerHour < currentHour){
            blockEventEl[i].classList.add("past");
        } else if (plannerHour > currentHour) {
            blockEventEl[i].classList.add("future");
        } else {
            blockEventEl[i].classList.add("present");
        } 
    }

    renderSavedEvents();

}

// Display saved events
function renderSavedEvents() {
    var eventTime = "";
    var savedEvent = "";
    for (var i = 0; i < blockHourEl.length; i++){
        eventTime  = blockHourEl[i].textContent.trim();
        savedEvent = localStorage.getItem(blockHourEl[i].textContent.trim());
        if (savedEvent !== null) {
            blockEventEl[i].value = savedEvent;
        }
    }
}

// clean up local storage from previous day events 
function cleanUplocalStorage() {
    for (var i = 0; i < blockHourEl.length; i++) {
        if (localStorage.getItem(blockHourEl[i].textContent) !== null) {
            localStorage.getItem(blockHourEl[i].textContent.trim()).removeItem();
        }
    }
}

// Save event if button is clicked
function buttonClickHandler(event) {
  
    var element = event.target;
    
    if (element.matches("button")) {
        var index = element.getAttribute("data-index");
    } else if (element.matches("i")) {
        var index = element.parentElement.getAttribute("data-index");
    } else {
        return;
    }
    
    var timeBlockEl = document.querySelectorAll(".hour");
    var eventBlockEl = document.querySelectorAll(".event");

    //save the event if there is any text
    if (eventBlockEl[index].value.trim()) {
        localStorage.setItem(timeBlockEl[index].textContent.trim(), eventBlockEl[index].value.trim());
    } else if (eventBlockEl[index].value.trim() ==="") {
        // check local storage if previously stored and remove it 
        if (localStorage.getItem(timeBlockEl[index].textContent.trim()) !== null){
            localStorage.removeItem(timeBlockEl[index].textContent.trim());
        }
    }
}

// Attach event listener to the time blocks container 
container.addEventListener('click', buttonClickHandler);

init();