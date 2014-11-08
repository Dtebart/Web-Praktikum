var entries = new Array();
var participantKeywords = ["id", "lastName", "firstName", "numOfCompanions", "course", "advisor", "password"];
var participantIndex;

// Fetch a list of registrated users from the server
$(document).ready(function(){
	$.get("get_list", function(data,status){
		var participantsStr = data.replace(/'/g, '"');
		var participantList = JSON.parse(participantsStr);
		for (i = 0; i < participantList.length; i++){
			addEntry(participantList[i]);
		}
	});
});

// Get ready to change the view to a form when a button was clicked
$(document).ready(function(){
	$("table").on("click", "button.btn-primary", function(event) {
		$("#participant-table").removeClass("active");
		$("#edit-form").addClass("active");
		$(".nav-tabs .active").removeClass("active");
		
		participantIndex = $(this).data("index");
		var participantEntry = entries[participantIndex];
		
		var inputField = $("#edit-form").find(":text");
		
		for (var i = 1; i < participantKeywords.length - 1; i++){
			inputField[i - 1].value = participantEntry[participantKeywords[i]];
		}
    });
});

function registrate(){
	var newParticipant = buildParticipant("registrate-form");
	if (isValid(newParticipant["lastName"], "#name") & isValid(newParticipant["firstName"], "#vorname") & isValid(newParticipant["password"], "#passwort"))
	{
		$.post("registrate", newParticipant, function(data, status){
							var json_string = data.replace(/'/g, '"');
							var newParticipant = JSON.parse(json_string);
							addEntry(newParticipant);
		});
	}
}

function edit(){
	var selectedParticipant = buildParticipant("edit-form");
	selectedParticipant["id"] = participantIndex;
	
	$.post("edit", selectedParticipant, function(data, status){
				var json_string = data.replace(/'/g, '"');
				var selectedParticipant = JSON.parse(json_string);
				editEntry(selectedParticipant);
	});
}

function checkInput(event){
	var idName = $(event).attr("id");
	return isValid($(event).val(), "#" + idName);
}

function isValid(fieldContent, fieldName){
	var formgroup = $(fieldName).parent().parent();
	if (fieldContent == ""){
		formgroup.addClass("has-error");
		formgroup.removeClass("has-success");
		return false;
	}
	else{
		formgroup.addClass("has-success");
		formgroup.removeClass("has-error");
		return true;
	}
}

function buildParticipant(formName){
	var newParticipant = {};
	var content = [];
	
	// fill a new json object with the entered data
	for (i = 1; i < participantKeywords.length; i++){
		content[i] = $("#" + formName + " " + "#" + participantKeywords[i]).val();
		newParticipant[participantKeywords[i]] = content[i];
	}
							
	return newParticipant;
}

function addEntry(participant){
	entries.push(participant);
	renderEntry(participant);
}

function editEntry(participant){
	var row = $("#user" + participant["id"]);
	row.children().each(function(i){
		if (i < participantKeywords.length - 1){
			$(this).text(participant[participantKeywords[i]]);
		}
	});
}

function renderEntry(participant){
	var row = $("<tr id = \"user" + participant["id"] + "\"></tr>");
	var rowData = new Array();
	
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
	editButton.data("index", participant["id"]);
	deleteButton.data("index", participant["id"]);
	
	// insert the row and buttons into the table
	var buttonData = $("<td></td>").append(editButton, deleteButton);
	row.append(rowData, buttonData);
	$("#participant-table table").append(row);
}