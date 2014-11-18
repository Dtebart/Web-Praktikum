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

function registrate(){
	
	var newParticipant = buildParticipant("registrate-form");
	if (isValid(newParticipant["lastName"], "#name") & isValid(newParticipant["firstName"], "#vorname") & isValid(newParticipant["password"], "#passwort"))
	{
		$.post("registrate", newParticipant, function(data, status){
							var json_string = data.replace(/'/g, '"');
							var newParticipant = JSON.parse(json_string);
							addEntry(newParticipant);
							changeView("#registrate-form", "#participant-table");
							
							var participantId = newParticipant["id"];
							showSuccess("Nr. " + participantId + " erfolgreich registriert");
		});
	}
}

function edit(){
	var selectedParticipant = buildParticipant("edit-form");
	
	$.post("edit", selectedParticipant, function(data, status){
				var json_string = data.replace(/'/g, '"');
				var changedParticipant = JSON.parse(json_string);
				
				changeView("#edit-form", "#participant-table");
				editEntry(changedParticipant);
				
				var participantId = selectedParticipant["id"];
				showSuccess("Bearbeiten von Nr. " + participantId + " erfolgreich!");
	});
}

function erase(){
	var selectedParticipant = buildParticipant("delete-form");
	
	$.post("delete", selectedParticipant, function(data, status){
				var json_string = data.replace(/'/g, '"');
				var selectedParticipant = JSON.parse(json_string);
				deleteEntry(selectedParticipant);
				changeView("#delete-form", "#participant-table");
				
				var participantId = selectedParticipant["id"];
				showSuccess("Löschen von Nr. " + participantId + " erfolgreich!");
	});
}