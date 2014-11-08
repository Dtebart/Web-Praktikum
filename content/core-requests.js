function registrate(){
	var newParticipant = buildParticipant("registrate-form");
	if (isValid(newParticipant["lastName"], "#name") & isValid(newParticipant["firstName"], "#vorname") & isValid(newParticipant["password"], "#passwort"))
	{
		$.post("registrate", newParticipant, function(data, status){
							var json_string = data.replace(/'/g, '"');
							var newParticipant = JSON.parse(json_string);
							entries.push(newParticipant);
							addEntry(newParticipant);
		});
	}
}

function edit(){
	var selectedParticipant = buildParticipant("edit-form");
	
	$.post("edit", selectedParticipant, function(data, status){
				var json_string = data.replace(/'/g, '"');
				var selectedParticipant = JSON.parse(json_string);
				editEntry(selectedParticipant);
	});
}

function erase(){
	var selectedParticipant = buildParticipant("delete-form");
	
	$.post("delete", selectedParticipant, function(data, status){
				var json_string = data.replace(/'/g, '"');
				var selectedParticipant = JSON.parse(json_string);
				deleteEntry(selectedParticipant);
	});
}