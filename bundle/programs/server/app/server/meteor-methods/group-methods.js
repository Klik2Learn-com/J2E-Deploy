(function(){Meteor.methods({
	'addUserToGroupUsingGroupEditor': function (userId, groupId, role) {
		if ((Roles.userIsInRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), 'moderator')) && groups.findOne({_id: groupId}) != null) {
			if (role == "tutor") {
				groups.update({ _id: groupId }, { $push: { tutors: userId } });
			} else if (role == "student") {
				groups.update({ _id: groupId }, { $push: { students: userId } });
			}
			Meteor.users.update({ _id: userId }, { $push: { groups: groupId } });
		}
		else {
			throw new Meteor.Error(500, 'You\'re not authorised.');
		}

	},

	'removeUserFromGroupUsingGroupEditor': function (userId, groupId, role) {
		if (Roles.userIsInRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), 'moderator')) {
			if (role == "tutor") {
				groups.update({ _id: groupId }, { $pull: { tutors: userId } });
			} else if (role == "student") {
				groups.update({ _id: groupId }, { $pull: { students: userId } });
			}
			Meteor.users.update({ _id: userId }, { $pull: { groups: groupId } });
		}
		else {
			throw new Meteor.Error(500, 'You\'re not authorised.');
		}

	},

	'changeOrganisationOfAGroup': function (orgId, groupId) {
		if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
			groups.update({ _id: groupId }, { $set: { organisation: orgId } });
			/*
				Change the forum documents for those organisations
			*/
		}
		else {
			throw new Meteor.Error(500, 'You\'re not authorised.');
		}
	},

	'editGroupName': function (groupId, newTitle, uID) {
		if (Roles.userIsInRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), 'moderator')) {
			groups.update({ _id: groupId }, { $set: { name: newTitle } });
		}
		else {
			throw new Meteor.Error(500, 'You\'re not authorised.');
		}
	},

	// Creates a new group and adds Tutors and Students to the group
	'createNewGroup': function (aName, aTutors, aUsers, aOrganisation) {
		var authorised = false;
		if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
			authorised = true;
		} else if (Roles.userIsInRole(Meteor.userId(), 'moderator')) {
			var userDoc = Meteor.users.findOne({ _id: Meteor.userId() });
			if (userDoc.organisation.indexOf(aOrganisation) >= 0) {
				authorised = true;
			}
			
		}
		if (authorised) {
			var exists = groups.findOne({organisation: aOrganisation, name: aName});
            if(exists != null && exists != undefined)
                throw new Meteor.Error("Group with this name already exists in this organisation.");
 
			groups.insert({
				name: aName,
				tutors: aTutors,
				students: aUsers,
				subgroups: [],
				organisation: aOrganisation
			}, function (error, result) {
				if (error) {
					throw new Meteor.Error("Error creating group.");
				} else {
					for (var i = 0; i < aTutors.length; i++) {
						Meteor.users.update({ _id: aTutors[i] }, { $addToSet: { groups: result.valueOf() } });
					}
					for (var j = 0; j < aUsers.length; j++) {
						Meteor.users.update({ _id: aUsers[j] }, { $addToSet: { groups: result.valueOf() } });
					}

					//creates a forum for the group
					// //Outdated -  f_forums.insert({ organisation: aOrganisation, group: result.valueOf(), threads: [] });

					Meteor.call("UpdateForum", "group", {organisation: aOrganisation, group: result.valueOf()}, function(err){
						if(err) throw new Meteor.Error(err);
					})
				}
			})
		} else {
			throw new Meteor.Error(500, 'You\'re not authorised.');
		}
	},

	// Deletes a Group and removes all references to it
	'deleteGroup': function (groupId) {
		if (Roles.userIsInRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), 'moderator')) {
			var group = groups.findOne({ _id: groupId });
			var tutors = group.tutors;
			var students = group.students;
			var subgroups = group.subgroups;

			// Remove this group from all Tutors
			for (var i = 0; i < tutors; i++) {
				Meteor.users.update({ _id: tutors[i] }, { $pull: { groups: groupId } });
			}

			// Remove this group from all Students
			for (var j = 0; j < students; j++) {
				Meteor.users.update({ _id: students[j] }, { $pull: { groups: groupId } });
			}

			// Remove all subgroups in this group.
			for (var k = 0; k < subgroups; k++){
				Meteor.call("deleteSubgroup", subgroups[k]);
			}

			// Remove this group from the forum
			Meteor.call("UpdateForum", "groupDelete", {group: groupId}, function(err){
				if(err) throw new Meteor.Error(err);
			})


			// Remove the Group
			groups.remove({ _id: groupId });
		} else {
			throw new Meteor.Error(500, 'You\'re not authorised.');
		}
	},

	'createSubgroup': function(subgroupName, tutorId, groupId, organisationId){
		
		var duplicates = subgroups.find({$and: [{ name: subgroupName}, { group: groupId}]}).count();
		if(duplicates != null && duplicates != 'undefined' && duplicates > 0){
			throw new Meteor.Error(500, 'Subgroup with this name already exists, please try again');
			return false;
		}

		if (Roles.userIsInRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), 'moderator') || Roles.userIsInRole(Meteor.userId(), 'tutor')) {
			
			subgroups.insert({
				name: subgroupName,
				tutor: tutorId,
				students: [],
				group: groupId,
				organisation: organisationId
			});
			var subgroupId = subgroups.findOne({name: subgroupName})._id;

			Meteor.users.update({ _id: tutorId}, { $push: { subgroups: subgroupId } });
			groups.update({_id: groupId}, { $push: { subgroups: subgroupId } });
			var updated = f_forums.update({ groups: { $elemMatch: { id: groupId } } }, { $push: { "groups.$.subgroups": {
				id: subgroupId,
				threads: [] 
			 }}});
		} else {
			throw new Meteor.Error(500, 'You\'re not authorised.');
		}
	},

	'deleteSubgroup': function(subgroupId){
		if (Roles.userIsInRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), 'moderator') || Roles.userIsInRole(Meteor.userId(), 'tutor')) {			
			var old = subgroups.findOne({ _id: subgroupId});

			/* remove the subgroup from all students' profiles */
			var users = old.students;
			for(var i = 0; i < users; i++){
				var userId = users[i];
				Meteor.users.update({ _id: userId}, { $pull: { subgroups: subgroupId } });
			}

			/* remove the subgroup from the tutor's profile */
			var tutor = old.tutor;
			Meteor.users.update({ _id: tutor}, { $pull: { subgroups: subgroupId } });

			/* remove the subgroup from the list of subgroups of its parent group */
			var groupId = old.group;
			groups.update({_id: groupId}, { $pull: { subgroups: subgroupId } });

			// Remove this subgroup from the forum
			Meteor.call("UpdateForum", "subgroupDelete", {group: groupId, subgroup: subgroupId}, function(err){
				if(err) throw new Meteor.Error(err);
			})

			/* finally, delete the subgroup itself */
			subgroups.remove({_id: subgroupId});
			
		} else {
			throw new Meteor.Error(500, 'You\'re not authorised.');
		}
	},

	'addStudentToSubgroup': function(subgroupId, studentId){
		if (Roles.userIsInRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), 'moderator') || Roles.userIsInRole(Meteor.userId(), 'tutor')) {			
			
			/* Check if this student exsists */
			var student = Meteor.users.findOne({_id: studentId});
			if(student == null){
				throw new Meteor.Error(500, 'This student is doesn\'t exsist, please try another one.');
				return false;
			}

			/* Check if the user is not already in the subgroup */
			var currStudents = subgroups.findOne({_id: subgroupId}).students;
			if(currStudents > 0){
				currStudents.forEach(function(elem){
					if(elem == studentId){
						throw new Meteor.Error(500, 'This student is already in this subgroup, please try another one.');
						return false;
					}
				});
			}

			/* If everything is okay, proceed to update */
			subgroups.update({ _id: subgroupId }, { $push: { students: studentId } });
			Meteor.users.update({ _id: studentId}, { $push: { subgroups: subgroupId } });
		} else {
			throw new Meteor.Error(500, 'You\'re not authorised.');
		}
	},

	'removeStudentFromSubgroup': function(subgroupId, studentId){
		if (Roles.userIsInRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), 'moderator') || Roles.userIsInRole(Meteor.userId(), 'tutor')) {			
			subgroups.update({ _id: subgroupId }, { $pull: { students: studentId } });
			Meteor.users.update({ _id: studentId}, { $pull: { subgroups: subgroupId } });
		} else {
			throw new Meteor.Error(500, 'You\'re not authorised.');
		}
	}
	

});

}).call(this);
