Template.adminGroupEditor.created = function () {
	this.subscribe('organisations');
	this.subscribe('groups');
	this.subscribe('subgroups');
	this.subscribe('Users');
	$.currGroupId = Router.current().params.groupId;
}

Template.adminGroupEditor.rendered = function () {
	this.subscribe('organisations');
	this.subscribe('groups');
	this.subscribe('subgroups');
	this.subscribe('Users');

	document.title = "Group Editor - Journey 2 English";
	refreshPageOnce("adminGroupEditor");
}

Template.adminGroupEditor.helpers({

	trial: function () {
		var UId = Meteor.userId();
		var userOrg = Meteor.users.findOne({ _id: UId }).organisation;
		var trialOrg = organisations.findOne({ name: "Trial" });
		if (trialOrg != null && trialOrg != 'undefined') {
			trialOrg = trialOrg._id;
		}
		userOrg.forEach(function(org){
			if(org == trialOrg){
				return true;
			}
		});
		return false;
	},

	userInCharge: function (tutorId) {
		if (tutorId == "") {
			var isTutor = subgroups.find({ $and: [{ group: $.currGroupId }, { tutor: Meteor.userId() }] }).count() > 0;
		} else {
			var isTutor = tutorId == Meteor.userId();
		}
		return (Roles.userIsInRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), 'moderator') || isTutor);
	},

	subgroupstudents: function (subgroupId) {
		return Meteor.users.find({ $and: [{ subgroups: { $in: [subgroupId] } }, { roles: { $nin: ["tutor"] } }] });
	},

	users: function (role) {
		var result = Meteor.users.find({ $and: [{ organisation: [this.organisation] }, { roles: { $in: [role] } }, { groups: { $in: [this._id] } }] }).fetch();
		return result;
	},

	orgName: function (orgId) {
		var org = organisations.findOne({ _id: orgId });
		if (org == null || org == 'undefined')
			return "No Organisation";

		return organisations.findOne({ _id: orgId }).name;
	},

	usersThatCanBeAdded: function () {
		var result = Meteor.users.find({ $and: [{ organisation: {$in: [this.organisation]}}, { roles: { $in: ["student","tutor"] } }, { groups: { $nin: [this._id] } }] }).fetch();
		//var stuQ = Meteor.users.find({ $and: [{ organisation: this.organisation }, { roles: { $in: ["student"] } }, { groups: [] }] }).fetch();

		//var result = tutQ.concat(stuQ);
		var tutors = Meteor.users.find({roles: {$in: ["tutor"]}});
		return result;
	},

	subGroups: function () {
		if (Roles.userIsInRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), 'moderator') || Roles.userIsInRole(Meteor.userId(), 'tutor')) {
			return subgroups.find({ group: $.currGroupId });
		} else {
			return subgroups.find({ $and: [{ group: $.currGroupId }, { students: { $in: Meteor.userId() } }] });
		}
	},

	tutorId: function () {
		var subgroupId = this._id;
		var tutor = subgroups.findOne({ _id: subgroupId }).tutor;
		return tutor;
	},

	tutor: function () {
		//We can't get information from the DB about admins and / or users from other organisation etc. (publish.js server side problem.)
		var subgroupId = this._id;
		var tutor = subgroups.findOne({ _id: subgroupId }).tutor;
		var tutorName = Meteor.users.findOne({ _id: tutor }).username;
		return tutorName;
	},

	numberStudents: function () {
		var subgroupId = this._id;
		var students = subgroups.findOne({ _id: subgroupId }).students;
		return students.length;
	}
});

Template.adminGroupEditor.events({

	'click tr > td > a': function (evt) {
		if ($(evt.currentTarget).attr("href") == null || $(evt.currentTarget).attr("href") == 'undefined')
			Router.go('/user/' + this._id);
	},

	'click button.addToGroup': function (evt) {
		evt.preventDefault();

		var userId = $(evt.target).attr('data-userId');
		var role = $(evt.target).attr('data-role');

		Meteor.call("addUserToGroupUsingGroupEditor", userId, $.currGroupId, role, function (error) {
			if (!error) {
				Bert.alert('User added to group', 'success', 'growl-top-right');
			} else {
				Bert.alert(error.toString(), 'danger', 'growl-top-right');
			}
		});
	},

	'click button.removeFromGroup': function (evt) {
		evt.preventDefault();

		var userId = $(evt.target).attr('data-userId');
		var role = $(evt.target).attr('data-role');

		Meteor.call("removeUserFromGroupUsingGroupEditor", userId, $.currGroupId, role, function (error) {
			if (!error) {
				Bert.alert('User removed from group', 'success', 'growl-top-right');
			} else {
				Bert.alert(error.toString(), 'danger', 'growl-top-right');
			}
		});
	},

	'click .subgroup-delete': function (evt) {
		evt.preventDefault();

		if (confirm("Are you sure that you want to delete this subgroup?") === true) {
			Meteor.call("deleteSubgroup", $(evt.currentTarget).data("subgroupid"));
		}
	},

	'click .subgroup-list': function (evt) {
		evt.preventDefault();
		var subgroupId = $(evt.currentTarget).data("subgroupid");
		var currSubGroup = subgroups.findOne({_id: subgroupId});

		if(currSubGroup.students.length > 0)
			$('.studentlist-wrap[data-studentlist="' + subgroupId + '"]').removeClass("hidden");

	},

	'click .studentlist-close': function (evt) {
		evt.preventDefault();
		var subgroupId = $(evt.currentTarget).data("studentlist");
		$('.studentlist-wrap[data-studentlist="' + subgroupId + '"]').addClass("hidden");
	},

	'click .student-remove': function (evt) {
		evt.preventDefault();
		var studentId = $(evt.currentTarget).data("studentid");
		var subgroupId = $(evt.currentTarget).data("subgroupid");

		if (confirm("Are you sure that you want to remove this student from the subgroup?") === true) {
			Meteor.call("removeStudentFromSubgroup", subgroupId, studentId);
		} else {
			return false;
		}
	},

});
