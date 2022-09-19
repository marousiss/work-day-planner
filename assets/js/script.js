// Dynamically built time blocks
//block one
var rowEl = $("<div class='row custom-row'></div>");
var divEl = $("<div class='col-sm-1 hour'></div>");
divEl.text("9AM");
rowEl.append(divEl);
var textareaEl = $("<textarea class='col-sm-10 event'></textarea>");
rowEl.append(textareaEl);
var btnEl = $("<button type='submit' class='col-sm-1 saveBtn' data-index='0'></button>");
var iconEl = $("<i class='fa fa-save'></i>");
btnEl.append(iconEl);
rowEl.append(btnEl);
$('#container').append(rowEl);

//block two
var rowEl = $("<div class='row custom-row'></div>");
var divEl = $("<div class='col-sm-1 hour'></div>");
divEl.text("10AM");
rowEl.append(divEl);
var textareaEl = $("<textarea class='col-sm-10 event'></textarea>");
rowEl.append(textareaEl);
var btnEl = $("<button type='submit' class='col-sm-1 saveBtn' data-index='1'></button>");
var iconEl = $("<i class='fa fa-save'></i>");
btnEl.append(iconEl);
rowEl.append(btnEl);
$('#container').append(rowEl);

//block three
var rowEl = $("<div class='row custom-row'></div>");
var divEl = $("<div class='col-sm-1 hour'></div>");
divEl.text("11AM");
rowEl.append(divEl);
var textareaEl = $("<textarea class='col-sm-10 event'></textarea>");
rowEl.append(textareaEl);
var btnEl = $("<button type='submit' class='col-sm-1 saveBtn' data-index='2'></button>");
var iconEl = $("<i class='fa fa-save'></i>");
btnEl.append(iconEl);
rowEl.append(btnEl);
$('#container').append(rowEl);

//block four
var rowEl = $("<div class='row custom-row'></div>");
var divEl = $("<div class='col-sm-1 hour'></div>");
divEl.text("12PM");
rowEl.append(divEl);
var textareaEl = $("<textarea class='col-sm-10 event'></textarea>");
rowEl.append(textareaEl);
var btnEl = $("<button type='submit' class='col-sm-1 saveBtn' data-index='3'></button>");
var iconEl = $("<i class='fa fa-save'></i>");
btnEl.append(iconEl);
rowEl.append(btnEl);
$('#container').append(rowEl);

//block five
var rowEl = $("<div class='row custom-row'></div>");
var divEl = $("<div class='col-sm-1 hour'></div>");
divEl.text("1PM");
rowEl.append(divEl);
var textareaEl = $("<textarea class='col-sm-10 event'></textarea>");
rowEl.append(textareaEl);
var btnEl = $("<button type='submit' class='col-sm-1 saveBtn' data-index='4'></button>");
var iconEl = $("<i class='fa fa-save'></i>");
btnEl.append(iconEl);
rowEl.append(btnEl);
$('#container').append(rowEl);

//block six
var rowEl = $("<div class='row custom-row'></div>");
var divEl = $("<div class='col-sm-1 hour'></div>");
divEl.text("2PM");
rowEl.append(divEl);
var textareaEl = $("<textarea class='col-sm-10 event'></textarea>");
rowEl.append(textareaEl);
var btnEl = $("<button type='submit' class='col-sm-1 saveBtn' data-index='5'></button>");
var iconEl = $("<i class='fa fa-save'></i>");
btnEl.append(iconEl);
rowEl.append(btnEl);
$('#container').append(rowEl);

//block seven
var rowEl = $("<div class='row custom-row'></div>");
var divEl = $("<div class='col-sm-1 hour'></div>");
divEl.text("3PM");
rowEl.append(divEl);
var textareaEl = $("<textarea class='col-sm-10 event'></textarea>");
rowEl.append(textareaEl);
var btnEl = $("<button type='submit' class='col-sm-1 saveBtn' data-index='6'></button>");
var iconEl = $("<i class='fa fa-save'></i>");
btnEl.append(iconEl);
rowEl.append(btnEl);
$('#container').append(rowEl);

//block eight
var rowEl = $("<div class='row custom-row'></div>");
var divEl = $("<div class='col-sm-1 hour'></div>");
divEl.text("4PM");
rowEl.append(divEl);
var textareaEl = $("<textarea class='col-sm-10 event'></textarea>");
rowEl.append(textareaEl);
var btnEl = $("<button type='submit' class='col-sm-1 saveBtn' data-index='7'></button>");
var iconEl = $("<i class='fa fa-save'></i>");
btnEl.append(iconEl);
rowEl.append(btnEl);
$('#container').append(rowEl);

//block nine
var rowEl = $("<div class='row custom-row'></div>");
var divEl = $("<div class='col-sm-1 hour'></div>");
divEl.text("5PM");
rowEl.append(divEl);
var textareaEl = $("<textarea class='col-sm-10 event'></textarea>");
rowEl.append(textareaEl);
var btnEl = $("<button type='submit' class='col-sm-1 saveBtn' data-index='8'></button>");
var iconEl = $("<i class='fa fa-save'></i>");
btnEl.append(iconEl);
rowEl.append(btnEl);
$('#container').append(rowEl);

//DOM elememts
var currentDayEl = document.getElementById("currentDay");
var blockHourEl = document.querySelectorAll(".hour");
var blockEventEl = document.querySelectorAll(".event");


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
    var savedEvent = "";
    for (var i = 0; i < blockHourEl.length; i++){
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
            localStorage.removeItem(blockHourEl[i].textContent.trim());
        }
    }
}

// Save event if button is clicked
function buttonClickHandler(event) {
    var target = $(event.target);
   
    if (target.is("button")) {
        var index = target.attr("data-index");
    } else if (target.is("i")) {
        var index = target.parent("button").attr("data-index");
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
$('#container').on('click', '.saveBtn', buttonClickHandler);

init();