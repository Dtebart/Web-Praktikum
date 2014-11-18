function changeView(oldView, newView){
	$(".nav-tabs .active").removeClass("active");
	$(oldView).removeClass("active");
	$(newView).addClass("active");
}

function showNewEntry(participant){
	var row = $("<tr id = \"user" + participant["id"] + "\"></tr>");
	var rowData = []
	
	// record the received data into the table row
	for (var i = 0; i < participantKeywords.length - 1; i++){
		var keyWord_str = participantKeywords[i];
		var tableData = $("<td></td>").text(participant[keyWord_str]).addClass("edit-data");
		rowData.push(tableData);
	}
	
	// create buttons for the entry
	var editButton = $("<button type=\"button\" class = \"btn btn-primary\"></button>").text("Bearbeiten");
	var deleteButton = $("<button type=\"button\" class = \"btn btn-primary\"></button>").text("Löschen");
	
	// associate each button with an user index
	editButton.data("index", entries.length - 1);
	deleteButton.data("index", entries.length - 1);
	
	// insert the row and buttons into the table
	var buttonData = $("<td></td>").append(editButton, deleteButton);
	row.append(rowData, buttonData);
	$("#participant-table table").append(row);
}

function showChangedEntry(participant){
	var row = $("#user" + participant["id"]);
	row.children().each(function(i){
		if (i < participantKeywords.length - 1){
			$(this).text(participant[participantKeywords[i]]);
		}
	});
}

function deleteEntry(participant){
	$("#user" + participant["id"]).remove();
}

function showSuccess(feedbackText){
	$("#feedback-text").text(feedbackText);
	$("#feedback").show();
}