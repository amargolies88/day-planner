var topDayDisplay = $("#currentDay");

var timeblockContainer = $("#timeblock-container");

currentHour = parseInt(moment().format("H"));

// Appending timeblocks according to standard work hours
//Counting loop in military time for simplicity (will change back to regular time before displaying)
for (let i = 9; i < 18; i++) {

    if (i >= 12) {
        ampm = "PM";
    } else {
        var ampm = "AM";
    }
    var timeblockRow = $("<div>").addClass("row no-gutters");
    var timeblockHour = $("<div>").addClass("col-1 hour");
    var timeblock = $("<div>").addClass("col-10 timeblock future timeblock-"+i);
    var timeblockSaveBtnCol = $("<div>").addClass("col-1 save-btn-col");
    var timeblockTextArea = $("<textarea>").addClass("description");
    var timeblockSaveBtn = $("<button>").addClass("saveBtn");

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

//Sets topDayDisplay to show current day
topDayDisplay.text(moment().format('dddd'));



function updateColor() {
    for (let i = 9; i < parseInt(moment().format("H")) && i < 18; i++) {
        $(".timeblock-"+i).removeClass("present future");
        $(".timeblock-"+i).addClass("past");
    }
    $(".timeblock-"+ parseInt(moment().format("H"))).removeClass("past future");
    $(".timeblock-"+ parseInt(moment().format("H"))).addClass("present");
}

updateColor();