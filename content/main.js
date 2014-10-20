var numberOfRows = 1;

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

function edit(eventObj){
	
}

function discard(eventObj){

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
	var number = $("<td></td>").text(numberOfRows++);
	var lastName = $("<td></td>").text(participant["lastName"]);
	var firstName = $("<td></td>").text(participant["firstName"]);
	var editButton = $("<button type=\"button\" class = \"btn btn-primary\" onclick = \"edit(this)\"></button>").text("Bearbeiten");
	var deleteButton = $("<button type=\"button\" class = \"btn btn-primary\" onclick = \"discard(this)\"></button>").text("Löschen");
	var buttonData = $("<td></td>").append(editButton, deleteButton);
	
	var row = $("<tr></tr>").append(number, lastName, firstName, buttonData);
	$("#participant-table table").append(row);
}