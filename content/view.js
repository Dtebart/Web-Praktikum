var participantIndex;

// Get ready to change the view to a form when a button was clicked
$(document).ready(function(){
	$("table").on("click", "button.btn-primary", function(event) {
		$("#participant-table").removeClass("active");
		$(".nav-tabs .active").removeClass("active");
		
		participantIndex = $(this).data("index");
		var participantEntry = entries[participantIndex];
		var inputFields;
		
		$("#feedback").hide();
		if ($(this).text() == "Bearbeiten"){
			$("#edit-form").addClass("active");
			inputFields = $("#edit-form").find(":text");
		}
		else{
			$("#delete-form").addClass("active");
			inputFields = $("#delete-form").find(":text");
		}
		
		for (var i = 1; i <= inputFields.length; i++){
			var participantData = participantEntry[participantKeywords[i]];
			inputFields[i - 1].value = participantData;
		}
    });
});

function getFormData(formName){
	var content = [];
	
	if (formName != "registrate-form"){
		content.push(entries[participantIndex]["id"]);
	}
	
	for (i = 1; i < participantKeywords.length; i++){
		content.push($("#" + formName + " " + "#" + participantKeywords[i]).val());
	}
	
	return content;
}

// Switch to another view component
function changeView(oldView, newView){
	$(".nav-tabs .active").removeClass("active");
	$(oldView).removeClass("active");
	$(newView).addClass("active");
}

// View operation after adding a user
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

// View operation after changing a user
function showChangedEntry(participant){
	var row = $("#user" + participant["id"]);
	row.children().each(function(i){
		if (i < participantKeywords.length - 1){
			$(this).text(participant[participantKeywords[i]]);
		}
	});
}

// View operation after removing a user
function deleteEntry(participant){
	$("#user" + participant["id"]).remove();
}

function showFeedback(feedbackText, operationSuccessfull){

	if (operationSuccessfull){
		$("#feedback").css("background-color", "green");
	}
	else{
		$("#feedback").css("background-color", "red");
	}
	$("#feedback-text").text(feedbackText);
	$("#feedback").show();
}