var topDayDisplay = $("#currentDay");

var timeblockContainer = $("#timeblock-container");

// Appending timeblocks according to standard work hours
for (let i = 9; i != 6; i++) {
    if (i >= 13) {i = i - 12;}
    var timeblockRow = $("<div>").addClass("row no-gutters row-"+i);
    var timeblockHour = $("<div>").addClass("col-1 hour hour-"+i);
    var timeblock = $("<div>").addClass("col-10 timeblock timeblock-"+i);
    var timeblockSaveBtnCol = $("<div>").addClass("col-1 save-btn-col save-btn-col-"+i);
    var timeblockTextArea = $("<textarea>").addClass("description description-"+i);
    var timeblockSaveBtn = $("<button>").addClass("saveBtn saveBtn-"+i);
    
    //Save Button text
    timeblockSaveBtn.text("Save");

    //Append content to columns
    timeblockSaveBtnCol.append(timeblockSaveBtn);
    timeblock.append(timeblockTextArea);
    timeblockHour.text(`${i} p.m.`)

    //Append columns to row
    timeblockRow.append(timeblockHour);
    timeblockRow.append(timeblock);
    timeblockRow.append(timeblockSaveBtnCol);

    //Append row
    timeblockContainer.append(timeblockRow);
    console.log("appended timeblock");
}