function registrate(){
	
	var newParticipant = buildParticipant("registrate-form");
	if (isValid(newParticipant["lastName"], "#name") & isValid(newParticipant["firstName"], "#vorname") & isValid(newParticipant["password"], "#passwort"))
	{
		$.post("registrate", newParticipant, function(data, status){
							var json_string = data.replace(/'/g, '"');
							var newParticipant = JSON.parse(json_string);
							addEntry(newParticipant);
							$(".nav-tabs .active").removeClass("active");
							$("#registrate-form").removeClass("active");
							$("#participant-table").addClass("active");
							
							var participantId = newParticipant["id"];
							showSuccess("Nr. " + participantId + " erfolgreich registriert");
		});
	}
}

function edit(){
	var selectedParticipant = buildParticipant("edit-form");
	
	$.post("edit", selectedParticipant, function(data, status){
				var json_string = data.replace(/'/g, '"');
				var selectedParticipant = JSON.parse(json_string);
				editEntry(selectedParticipant);
				$(".nav-tabs .active").removeClass("active");
				$("#edit-form").removeClass("active");
				$("#participant-table").addClass("active");
				$("#participant-table").addClass("has-success");
				
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
				$(".nav-tabs .active").removeClass("active");
				$("#delete-form").removeClass("active");
				$("#participant-table").addClass("active");
				
				var participantId = selectedParticipant["id"];
				showSuccess("Löschen von Nr. " + participantId + " erfolgreich!");
	});
}