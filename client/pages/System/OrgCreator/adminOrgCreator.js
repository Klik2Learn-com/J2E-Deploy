Template.adminOrgCreator.rendered = function() {
	
	document.title = "Add Organisation- Journey 2 English";
	
}

Template.adminOrgCreator.helpers({

	organisationList: function() {
		return organisations.find({});
	}

});

Template.adminOrgCreator.events({

	'click button[data-function="createOrg"]': function(evt) {
		var orgName = $('#orgName').val().trim();

		if(orgName == '') {
			alert("Please, provide a valid organisation name.");
			return;
		}

		Meteor.call('createNewOrg', orgName, function(err, result){ 
			if (!err) {
				Bert.alert( 'Organisation Created!', 'success', 'growl-top-right' );
				$('#orgName').val('')
			} else {
				alert('Error: ' + err.message);
			}
		});
	}

});

Template.adminOrgCreator.created = function() {
	this.subscribe('organisations');
}