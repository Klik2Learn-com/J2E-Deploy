Template.adminGroupCreator.created = function () {
	this.subscribe('organisations');
	Template.instance().selectedOrganisation = new ReactiveVar();
}


Template.adminGroupCreator.rendered = function () {

	document.title = "Add Group - Journey 2 English";

}

Template.adminGroupCreator.helpers({

	user: function () {
		var selectedOrganisation = Template.instance().selectedOrganisation.get();
		return Meteor.users.find({roles: "student", organisation: { $elemMatch: {id: selectedOrganisation}}});
	},

	tutor: function () {
		var selectedOrganisation = Template.instance().selectedOrganisation.get();
		return Meteor.users.find({roles: "tutor", organisation: { $elemMatch: {id: selectedOrganisation}}});
	},

	organisation: function () {
		var orgs = [];
		if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
			orgs = organisations.find({});
		} else if (Roles.userIsInRole(Meteor.userId(), 'moderator')) {
			var userOrgs = Meteor.users.findOne({ _id: Meteor.userId() }).organisation;
			orgs = organisations.find({ _id: { $in: userOrgs } });
		}
		return orgs;
	},

	orgIsSelected: function () {
		return (Template.instance().selectedOrganisation.get() != undefined)
	}

});


Template.adminGroupCreator.events({

	'click button[data-function="createGroup"]': function (evt) {
		var groupName = $('#groupName').val();
		var tutors = [];
		$('input:checkbox[name="tutors"]:checked').each(function () {
			tutors.push(this.value);
		});

		var users = [];
		$('input:checkbox[name="users"]:checked').each(function () {
			users.push(this.value);
		});

		
		var selectedOrganisation = $('#adminOrgSelector').val() || $('#modOrgSelector').val();
		
		Meteor.call('createNewGroup', groupName, tutors, users, selectedOrganisation, function (err, result) {
			if (err) {
				Bert.alert(error.toString(), 'danger', 'growl-top-right');
			} else {
				Bert.alert('Group Created!', 'success', 'growl-top-right');
				$('input:checkbox[name="tutors"]').prop('checked', false);
				$('input:checkbox[name="users"]').prop('checked', false);
				$('#groupName').val('');
			}
		});
	},

	'change .orgSelector': function (evt) {
		var selectedOrg = $('#adminOrgSelector').val() || $('#modOrgSelector').val();
		Template.instance().selectedOrganisation.set(selectedOrg);
	}

});



