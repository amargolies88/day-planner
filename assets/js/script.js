//Grab top display elements
var topDayDisplay = $("#current-day");
var topTimeDisplay = $("#current-time");
var timeblockContainer = $("#timeblock-container");

//Function to update topDayDisplay to show current day and time
function updateTopDisplays() {
    topDayDisplay.text(moment().format("dddd"));
    topTimeDisplay.text(moment().format("h:mm:ss a"));
}

//Function to update color of textfields depending on time
function updateColor() {
    for (let i = 9; i < moment().format("HH") && i < 18; i++) {
        $(".timeblock-" + i).removeClass("present future");
        $(".timeblock-" + i).addClass("past");
    }
    $(".timeblock-" + moment().format("HH")).removeClass("past future");
    $(".timeblock-" + moment().format("HH")).addClass("present");
}

//Function to update all time dependent elements
function updateTime() {
    updateTopDisplays();
    updateColor();
}

// Appending timeblocks according to standard work hours
//Counting loop in military time for simplicity (will change back to regular time before displaying)
for (let i = 9; i < 18; i++) {

    //Set AM/PM text depending on time
    if (i >= 12) {
        ampm = "PM";
    } else {
        var ampm = "AM";
    }

    //Create timeblock elements with attribute, data-hour, set to i
    var timeblockRow = $("<div>").addClass("row no-gutters").attr("data-hour", i);
    var timeblockHour = $("<div>").addClass("col-2 col-md-1 hour").attr("data-hour", i);
    var timeblock = $("<div>").addClass("col-8 col-md-10 timeblock future timeblock-" + i).attr("data-hour", i);
    var timeblockSaveBtnCol = $("<div>").addClass("col-2 col-md-1 save-btn-col").attr("data-hour", i);
    var timeblockSaveBtn = $("<button>").addClass("saveBtn btn").attr("data-hour", i);
    var timeblockTextArea = $("<textarea>").addClass("description").attr({
        datahour: i,
        id: "textarea-" + i
    });

    //Save Button text
    timeblockSaveBtn.text("Save");

    //Append content to columns
    timeblockSaveBtnCol.append(timeblockSaveBtn);
    timeblock.append(timeblockTextArea);

    //Convert military time back to regular before displaying
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

    //Display previously saved plans
        //Format fix. Prepend 0 to loop iteration if iteration is less than 10
        //This is because local storage keys use timecodes with 2 digits for the hour
    if (i < 10) {
        if (localStorage.getItem(moment().format("YYYYMMDD") + "0" + i) !== null) {
            timeblockTextArea.val(localStorage.getItem(moment().format("YYYYMMDD") + "0" + i));
        }
    } else {
        if (localStorage.getItem(moment().format("YYYYMMDD") + i) !== null) {
            timeblockTextArea.val(localStorage.getItem(moment().format("YYYYMMDD") + i));
        }
    }

    //When Save button clicked
    timeblockSaveBtn.click(function () {
        //Formatting for local storage format which uses a 2 digit hour value
        if ($(this).attr("data-hour") < 10) {
            var hour = "0" + $(this).attr("data-hour");
        } else {
            var hour = $(this).attr("data-hour");
        }
        //Set timecode to use in local storage
        var timecode = moment().format("YYYYMMDD") + hour;
        //Locate the textarea associated with this button and store value in variable, plan
        var plan = $("#textarea-" + $(this).attr("data-hour")).val();
        //Store plan in localStorage with key, timecode
        localStorage.setItem(timecode, plan);
    });
}

//Innitial update of all time dependent elements
updateTime();

//Continuously update all time dependent elements every second
setInterval(function () {
    updateTime()
}
    , 1000);