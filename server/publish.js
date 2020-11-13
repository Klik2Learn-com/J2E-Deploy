
/**
*	@summary: Publishes data from 'userNotes' collection. Data should be published in the following way.
*				- Admins can see all notes and comments.
*				- Tutors can only see their own comments and notes of Students in their groups.
*				- Students can only see their own notes and the comments from a Tutor.
*/
Meteor.publish("nbnotes", function () {
	if (Roles.userIsInRole(this.userId, 'admin')) {
		return userNotes.find({});
	} else if (Roles.userIsInRole(this.userId, 'moderator')) {
		var userDoc = Meteor.users.findOne({ _id: this.userId });
		var userArray = [];
		userArray = Meteor.users.find({
			"organisation": { $in: userDoc.organisation}
		}).map(function (user) {
			return user._id;
		});
		var result = userArray.map(function (item) {
			return item.toString();
		})
		return userNotes.find({ noteAuthor: { $in: result } });
	} else if (Roles.userIsInRole(this.userId, 'tutor')) {
		var studentArray = [];
		var cursor = groups.find({ "tutors": this.userId });
		cursor.forEach(function (doc) {
			for (var i = 0; i < doc.students.length; i++) {
				studentArray.push(doc.students[i]);
			}
		})
		var result = studentArray.map(function (item) {
			return item.toString();
		});
		result.push(this.userId);
		return userNotes.find({ noteAuthor: { $in: result } });
	} else {
		return userNotes.find({ noteAuthor: this.userId })
	}
});

/**
*	@summary: Publishes data from the 'organisations' collection. Data should be published in the following way:
*				- Admins can see all organisations and the users that constitute each organisation.
*				- Tutors and Moderators can only see organisations to which they belong.
*				- Students can only see organisations to which they belong.
*/
Meteor.publish("organisations", function () {
	// Rule 1
	if (Roles.userIsInRole(this.userId, 'admin')) {
		return organisations.find({});
	} // Rule 2 & Rule 3 (Non-Admins)
	else {
		if (!this.userId) {
			return;
		}
		var user = Meteor.users.findOne({ _id: this.userId });
		var userOrganisation = user.organisation;
		return organisations.find({ _id: { $in: userOrganisation} });
	}
})

Meteor.publish("group", function (groupId) {
	return groups.find({ _id: groupId });
})


Meteor.publish("messages", function () {
	var uID = this.userId;
	return messages.find({ "$or": [{ "p1": uID }, { "p2": uID }] });
})
/**
*	@summary: Publishes data from the 'groups' collection. Data should be published in the following way:
*				- Admins can see all groups and the users that constitute each group.
*				- Tutors and Moderators can only see groups belonging to their organisation and their constituents.
*				- Students can only see Groups to which they belong and other users in the same group as them.
*/
Meteor.publish("groups", function () {

	if (Roles.userIsInRole(this.userId, 'admin')) {
		return groups.find({});
	} else if (Roles.userIsInRole(this.userId, 'moderator') || Roles.userIsInRole(this.userId, 'tutor')) {
		var user = Meteor.users.findOne({ _id: this.userId });
		var userOrganisation = user.organisation;
		return groups.find({ organisation: {$in: userOrganisation} });
	} else {
		var user = Meteor.users.findOne({ _id: this.userId });
		if (user.groups) {
			var userGroups = user.groups;
			return groups.find({ _id: { $in: userGroups } });
		}
	}
});

/**
*	@summary: Publishes data from the 'subgroups' collection. Data should be published in the following way:
*				- Admins can see all subgroups and the users that constitute each subgroups.
*				- Tutors and Moderators can only see subgroups belonging to their organisation and their constituents.
*				- Students can only see subgroups to which they belong and other users in the same group as them.
*/
Meteor.publish("subgroups", function () {
	if (Roles.userIsInRole(this.userId, 'admin')) {
		return subgroups.find({});
	} else if (Roles.userIsInRole(this.userId, 'moderator') || Roles.userIsInRole(this.userId, 'tutor')) {
		var user = Meteor.users.findOne({ _id: this.userId });
		var userOrganisation = user.organisation;

		return subgroups.find({ organisation: {$in: userOrganisation} });
	} else {
		var user = Meteor.users.findOne({ _id: this.userId });
		if (user.subgroups) {
			var userSubgroups = user.subgroups;

			return subgroups.find({ _id: { $in: userSubgroups } });
		}
	}
})

/**
*	@summary: Publishes data from the 'audioRecordings' collection. Data should be published in the following way:
*			- Admins can see all recordings
*			- Moderators can see all recordings by Users in their organisation.
*			- Tutors can only see recordings by Users in their group.
*			- Students can only hear their own recordings and replies from Tutors.
*/
Meteor.publish("audioRecordings", function () {
	if (Roles.userIsInRole(this.userId, 'admin')) {
		return audioRecordings.find({});
	} else if (Roles.userIsInRole(this.userId, 'moderator')) {
		var userDoc = Meteor.users.findOne({ _id: this.userId });
		var userArray = [];
		userArray = Meteor.users.find({
			"organisation": {$in: userDoc.organisation}
		}).map(function (user) {
			return user._id;
		});
		var result = userArray.map(function (item) {
			return item.toString();
		});
		return audioRecordings.find({ audioAuthor: { $in: result } });
	} else if (Roles.userIsInRole(this.userId, 'tutor')) {
		var studentArray = [];
		var cursor = groups.find({ "tutors": this.userId });
		cursor.forEach(function (doc) {
			for (var i = 0; i < doc.students.length; i++) {
				studentArray.push(doc.students[i]);
			}
		});
		var result = studentArray.map(function (item) {
			return item.toString();
		});
		result.push(this.userId);
		return audioRecordings.find({ audioAuthor: { $in: result } });
	} else {
		return audioRecordings.find({ audioAuthor: this.userId })
	}
});

/**
*	@summary: Publishes data from the 'commentAudioRecordings' collection. Data should be published in the following way:
*			- Admins can see all recordings.
*			- Moderators can see all recordings by Users in their organisation.
*			- Tutors can only see recordings by Users in their group.
*			- Students can only hear their own recordings and replies from Tutors.
*/
Meteor.publish("commentAudioRecordings", function () {
	if (Roles.userIsInRole(this.userId, 'admin')) {
		return commentRecordings.find({});
	} else if (Roles.userIsInRole(this.userId, 'moderator')) {
		var userDoc = Meteor.users.findOne({ _id: this.userId });
		var userArray = [];
		userArray = Meteor.users.find({
			"organisation": {$in: userDoc.organisation}
		}).map(function (user) {
			return user._id;
		});
		var result = userArray.map(function (item) {
			return item.toString();
		});
		return commentRecordings.find({ audioAuthor: { $in: result } });
	} else if (Roles.userIsInRole(this.userId, 'tutor')) {
		var studentArray = [];
		var cursor = groups.find({ "tutors": this.userId });
		cursor.forEach(function (doc) {
			for (var i = 0; i < doc.students.length; i++) {
				studentArray.push(doc.students[i]);
			}
		});

		var commentArray = [];
		var audioCursor = audioRecordings.find({ audioAuthor: { $in: studentArray } });
		audioCursor.forEach(function (doc) {
			for (var i = 0; i < doc.comments.length; i++) {
				if (doc.comments[i].type == "audio") {
					commentArray.push(doc.comments[i]._id);
				}
			}
		})

		var result = commentArray.map(function (item) {
			return item.toString();
		});


		return commentRecordings.find({ _id: { $in: result } });
	} else if (Roles.userIsInRole(this.userId, 'student')) {
		var commentArray = [];
		var cursor = audioRecordings.find({ "audioAuthor": this.userId })
		cursor.forEach(function (doc) {
			for (var i = 0; i < doc.comments.length; i++) {
				if (doc.comments[i].type == "audio") {
					commentArray.push(doc.comments[i]._id);
				}
			}
		})
		var result = commentArray.map(function (item) {
			return item.toString();
		});
		return commentRecordings.find({ _id: { $in: result } });
	}
});

Meteor.publish("assessmentRecordings", function () {
	return assessmentRecordings.find({});
});

Meteor.publish("connectionCheck", function (user, assessment, section) {
	this.onStop(function () {
		Meteor.call('handleAssessmentDisconnect', user, assessment, section);
	})
	return undefined;
})

Meteor.publish("pauseConnection", function (mod, act, user) {

	var uId = user;
	this.onStop(function () {
		Meteor.call('setPauseActivity', mod, act, uId);
	});
});

/**
*	@summary: Publishes user data from the 'users' collection. Data should be published in the following way:
*			- Admins can see all user data.
*			- Tutors can see users in the organisation
*			- Students can only only see users in their groups.
*/
Meteor.publish("Users", function () {

	var trial = organisations.findOne({ name: "Trial" });
	var user = Meteor.users.findOne({ _id: this.userId });
	
	if(user == null || user == 'undefined')
		return null;

	var orgId = user.organisation;

	if (trial != null && trial != 'undefined') {
		trial = trial._id;
	}

	if (orgId == trial) {
		return Meteor.users.find({ roles: { $ne: "tutor" } });
	} else {
		if (Roles.userIsInRole(this.userId, 'admin')) {

			return Meteor.users.find({});

		} else if (Roles.userIsInRole(this.userId, 'moderator')) {

			var user = Meteor.users.findOne({ _id: this.userId });
			var userOrganisation = user.organisation;
			return Meteor.users.find({ organisation: { $in: userOrganisation}, "roles": { $ne: "admin" } })

		} else if (Roles.userIsInRole(this.userId, 'tutor')) {

			var user = Meteor.users.findOne({ _id: this.userId });
			var userOrganisation = user.organisation;
			return Meteor.users.find({ organisation: { $in: userOrganisation}, "roles": { $ne: "admin" } })

		} else if (Roles.userIsInRole(this.userId, 'student')) {

			var studentArray = [];
			var cursor = groups.find({ "students": this.userId });
			cursor.forEach(function (doc) {
				for (var i = 0; i < doc.students.length; i++) {
					studentArray.push(doc.students[i]);
				}
				for (var i = 0; i < doc.tutors.length; i++) {
					studentArray.push(doc.tutors[i]);
				}
			});

			var result = studentArray.map(function (item) {
				return item.toString();
			});
			return Meteor.users.find({ _id: { $in: result } }, { fields: { username: 1, 'emails.address': 1, profile: 1, groups: 1, organisation: 1, roles: 1 } })
		}
	}
});

Meteor.publish("User", function () {
	return Meteor.users.find({ _id: this.userId });
})

/**
*	@summary: Publishes data from the 'userProgress' collection. Data should be published in the following way:
*			- Admins can see all userProgress.
*			- Moderators can see all progress by Users in their organisation.
*			- Tutors can only see progress by Users in their group.
*			- Students can only see their own progress
*/
Meteor.publish("userProgress", function () {
	// ADMIN
	if (Roles.userIsInRole(this.userId, 'admin')) {
		return userProgress.find({});
		// MODERATOR
	} else if (Roles.userIsInRole(this.userId, 'moderator')) {
		var userDoc = Meteor.users.findOne({ _id: this.userId });
		var userArray = [];
		userArray = Meteor.users.find({
			"organisation": {$in: userDoc.organisation}
		}).map(function (user) {
			return user._id;
		});
		var result = userArray.map(function (item) {
			return item.toString();
		});
		return userProgress.find({ userId: { $in: result } });
		// TUTOR
	} else if (Roles.userIsInRole(this.userId, 'tutor')) {

		var userDoc = Meteor.users.findOne({ _id: this.userId });
		var userArray = [];
		userArray = Meteor.users.find({
			"groups": { $in: userDoc.groups }
		}).map(function (user) {
			return user._id;
		});
		var result = userArray.map(function (item) {
			return item.toString();
		});
		return userProgress.find({ userId: { $in: result } });

	} else if (Roles.userIsInRole(this.userId, 'student')) {
		return userProgress.find({ userId: this.userId });
	}
});

Meteor.publish('singleUserProgress', function () {
	if (this.userId) {
		return userProgress.find({ userId: this.userId });
	} else {
		return
	}
});

Meteor.publish("studentAssessments", function () {
	if (Roles.userIsInRole(this.userId, 'admin')) {
		return studentAssessments.find({});
	} else if (Roles.userIsInRole(this.userId, 'moderator')) {
		var userDoc = Meteor.users.findOne({ _id: this.userId });
		var userArray = [];
		userArray = Meteor.users.find({
			"organisation": {$in: userDoc.organisation}
		}).map(function (user) {
			return user._id;
		});
		var result = userArray.map(function (item) {
			return item.toString();
		});
		result.push(this.userId);
		return studentAssessments.find({ userId: { $in: result } });
	} else if (Roles.userIsInRole(this.userId, 'tutor')) {
		var studentArray = [];
		var cursor = groups.find({ "tutors": this.userId });
		cursor.forEach(function (doc) {
			for (var i = 0; i < doc.students.length; i++) {
				studentArray.push(doc.students[i]);
			}
		});
		studentArray.push(this.userId); // This line ensures Tutor can see his own assessments (if ever any).
		return studentAssessments.find({ userId: { $in: studentArray } });
	} else if (Roles.userIsInRole(this.userId, 'student')) {
		return studentAssessments.find({ userId: this.userId })
	}
})

Meteor.publish("f_forums", function () {

	var user = Meteor.users.findOne({ _id: this.userId });
	var userOrg = user.organisation;
	var userGroups = user.groups;

	// if admin
	if (Roles.userIsInRole(this.userId, 'admin')) {
		return f_forums.find({});
	} else if (Roles.userIsInRole(this.userId, 'tutor') || Roles.userIsInRole(this.userId, 'moderator')) {
		return f_forums.find({ "organisation": {$in: userOrg} });
	} else if (Roles.userIsInRole(this.userId, 'student')) {
		return f_forums.find({ "organisation": {$in: userOrg} });
11	} else {
		return {};
	}
})

Meteor.publish("assessmentTypes", function () {
	return assessmentTypes.find({});
})

Meteor.publish("bug_reports", function () {
	if (Roles.userIsInRole(this.userId, 'admin')) {
		return bug_reports.find({});
	}
})

Meteor.publish("feedback_forms", function () {
	if (Roles.userIsInRole(this.userId, 'admin')) {
		return feedback_forms.find({});
	}
})

Meteor.publish("vouchers", function () {
	if (Roles.userIsInRole(this.userId, 'admin')) {
		return vouchers.find({});
	}
})

Meteor.publish("payment_plans", function () {
	if (Roles.userIsInRole(this.userId, 'admin')) {
		return payment_plans.find({});
	}
})

Meteor.publish("contact_form", function () {
	if (Roles.userIsInRole(this.userId, 'admin')) {
		return contact_form.find({});
	}
})

Meteor.publish("duration_log", function () {
	if (Roles.userIsInRole(this.userId, 'admin')) {
		return duration_log.find({});
	}
})

Meteor.publish("gameAccess", function () {
	var userId = this.userId;
	if (Roles.userIsInRole(userId, 'admin')) {
		return gameAccess.find({});
	} else {
		return gameAccess.find({ user: userId });
	}
})

Meteor.publish("Announcements", function () {
	if (Roles.userIsInRole(this.userId, 'admin')) {
		return Announcements.find({});
	} else if (Roles.userIsInRole(this.userId, 'moderator') || Roles.userIsInRole(this.userId, 'tutor') || Roles.userIsInRole(this.userId, 'student')) {
		var org = Meteor.users.findOne({ _id: this.userId }).organisation;
		return Announcements.find({ organisation: {$in: org} });
	};
})


Meteor.publish("appliedVouchers", function () {
	if (Roles.userIsInRole(this.userId, 'admin')) {
		return appliedVouchers.find({});
	}
})

Meteor.publish("Orglogos", function () {
	return Orglogos.find({});
})

Meteor.publish("LogoURLs", function () {
	return LogoURLs.find({});
})

Meteor.publish(null, function () {
	return Meteor.roles.find({})
})