var numberOfRows = 1;
var entries = new Array();

window.onload = function() {
	$.get("get_list", function(data,status){
		var participantsStr = data.replace(/'/g, '"');
		var participantList = JSON.parse(participantsStr);
		for (i = 0; i < participantList.length; i++){
			addEntry(participantList[i]);
		}
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

function registrate(){
	var newParticipant = buildParticipant();
	if (isValid(newParticipant["lastName"], "#name") & isValid(newParticipant["firstName"], "#vorname") & isValid(newParticipant["password"], "#passwort"))
	{
		$.post("registrate", newParticipant, function(data, status){
							var json_string = data.replace(/'/g, '"');
							var newParticipant = JSON.parse(json_string);
							var newParticipant = JSON.parse(json_string);
							addEntry(newParticipant);
						});
	}
}

function getEditForm(){
	$("#participant-table").removeClass("active");
	$("#edit-form").addClass("active");
	$(".nav-tabs .active").removeClass("active");
	var userRow = $("this").parent();
	alert($(userRow).text);
	var userData = userRow.children("td.edit-data");
	for (var i = 0; i < userData.length; i++){
		alert($(userData[i]).text);
	}
}

$(document).ready(function(){
	$("table").on("click", "button.btn-primary", function(event) {
		$("#participant-table").removeClass("active");
		$("#edit-form").addClass("active");
		$(".nav-tabs .active").removeClass("active");
		
		var participantIndex = $(this).data("index");
		var participantEntry = entries[participantIndex];
		
		var inputField = $("#edit-form").find(":text");
		inputField[0].value = participantEntry["lastName"];
		inputField[1].value = participantEntry["firstName"];
    });
});

function insertIntoField(text, field){
	field.value = text;
}

function getDiscardForm(){

}

function buildParticipant(){
	var fieldId = ["#name", "#vorname", "#anzahl-begleitpersonen", 
					"#studiengang", "#betreuer", "#passwort"];
	var content = [];
	for (i = 0; i < fieldId.length; i++){
		content[content.length] = $(fieldId[i]).val();
	}
	
	var newParticipant = {"lastName": content[0], "firstName": content[1], "numOfCompanions": content[2],
							"course": content[3], "advisor": content[4], "password": content[5]};
							
	return newParticipant;
}

function addEntry(participant){
	entries.push(participant);
	renderEntry(participant, entries.length - 1);
}

function renderEntry(participant, numberOfParticipant){
	var number = $("<td></td>").text(numberOfRows++);
	var lastName = $("<td></td>").text(participant["lastName"]).addClass("edit-data");
	var firstName = $("<td></td>").text(participant["firstName"]).addClass("edit-data");
	var editButton = $("<button type=\"button\" class = \"btn btn-primary\"></button>").text("Bearbeiten");
	var deleteButton = $("<button type=\"button\" class = \"btn btn-primary\"></button>").text("Löschen");
	
	editButton.data("index", numberOfParticipant);
	deleteButton.data("index", numberOfParticipant);
	
	var buttonData = $("<td></td>").append(editButton, deleteButton);
	
	var row = $("<tr></tr>").append(number, lastName, firstName, buttonData);
	$("#participant-table table").append(row);
}