var topDayDisplay = $("#current-day");
var topTimeDisplay = $("#current-time");
var history;
var timeblockContainer = $("#timeblock-container");
if (JSON.parse(localStorage.getItem("history")) !== null){
    history = JSON.parse(localStorage.getItem("history"));
} else {
    history = {};
}

function saveHistory(){
    localStorage.setItem("history", JSON.stringify(history));
}

//Sets topDayDisplay to show current day and time
function updateTopDisplays(){
    topDayDisplay.text(moment().format("dddd"));
    topTimeDisplay.text(moment().format("h:mm:ss a"));
}

function updateColor() {
    for (let i = 9; i < 13 && i < 18; i++) {
        $(".timeblock-" + i).removeClass("present future");
        $(".timeblock-" + i).addClass("past");
    }
    $(".timeblock-" + 13).removeClass("past future");
    $(".timeblock-" + 13).addClass("present");
}

function updateTime(){
    updateTopDisplays();
    updateColor();
}

function saveInput() {
history[moment().format("yyyy")][moment().format("mm")][moment().format("d")][$(this).attr("data-hour")] = "something";
console.log(history[moment().format("yyyy")][moment().format("mm")][moment().format("d")][$(this).attr("data-hour")]);
}
// Appending timeblocks according to standard work hours
//Counting loop in military time for simplicity (will change back to regular time before displaying)
for (let i = 9; i < 18; i++) {

    if (i >= 12) {
        ampm = "PM";
    } else {
        var ampm = "AM";
    }
    var timeblockRow = $("<div>").addClass("row no-gutters").attr("data-hour", i);
    var timeblockHour = $("<div>").addClass("col-2 col-md-1 hour").attr("data-hour", i);
    var timeblock = $("<div>").addClass("col-8 col-md-10 timeblock future timeblock-" + i).attr("data-hour", i);
    var timeblockSaveBtnCol = $("<div>").addClass("col-2 col-md-1 save-btn-col").attr("data-hour", i);
    var timeblockTextArea = $("<textarea>").addClass("description").attr("data-hour", i);
    var timeblockSaveBtn = $("<button>").addClass("saveBtn btn").attr("data-hour", i);

    timeblockRow.attr("data-hour", i);

    //Save Button text
    timeblockSaveBtn.text("Save");

    //Append content to columns
    timeblockSaveBtnCol.append(timeblockSaveBtn);
    timeblock.append(timeblockTextArea);

    if (i > 12) {
        timeblockHour.text(`${i - 12} ${ampm}`)
    } else {
        timeblockHour.text(`${i} ${ampm}`)
    }


    //Append columns to row
    timeblockRow.append(timeblockHour);
    timeblockRow.append(timeblock);
    timeblockRow.append(timeblockSaveBtnCol);

    //Append row
    timeblockContainer.append(timeblockRow);
    console.log("appended timeblock");
}




updateTime();

setInterval(function(){
    updateTime()
}
,1000);
