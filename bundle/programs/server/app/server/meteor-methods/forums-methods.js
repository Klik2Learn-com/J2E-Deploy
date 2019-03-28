(function(){Meteor.methods({
	'UpdateForum': function (target, ids) {
		if (target == "organisation") { /* Add new Organisation */
			f_forums.insert({
				organisation: ids.organisation,
				groups: []
			});

		} else if (target == "group") { /* Add new Group */
			var newGroup = {
				id: ids.group,
				threads: [],
				subgroups: []
			};

			f_forums.update({ organisation: ids.organisation }, {
				$push: {
					groups: newGroup
				}
			});

		} else if (target == "subgroup") { /* Add new Subgroup */
			var newSubgroup = {
				id: ids.subgroup,
				threads: []
			};

			f_forums.update({ organisation: ids.organisation, groups: { $elemMatch: { id: ids.group } } }, {
				$push: {
					"$.subgroups": newSubgroup
				}
			});

		} else if (target == "organisationDelete") {
			f_forums.remove({ organisation: orgId });

		} else if (target == "groupDelete") {
			var orgId = groups.findOne({ _id: ids.group }).organisation;
			f_forums.update({ organisation: orgId }, { $pull: { groups: { $elemMatch: { id: ids.group } } } });

		} else if (target == "subgroupDelete") {
			var orgId = groups.findOne({ _id: ids.group }).organisation;
			f_forums.update({ organisation: orgId, groups: { $elemMatch: { id: ids.group } } }, { $pull: { "$.subgroups": { $elemMatch: { id: ids.subgroup } } } });

		} else {
			throw new Meteor.Error("Unknown operation '" + target + "' in Meteor method 'UpdateForum'");
		}
	},


	'createNewThread': function (organisationId, group, subgroup, title, post, uID) {
		var formattedDate = getFormattedDate();

		var currentUser = Meteor.users.findOne({ _id: uID });
		var orgId = currentUser.organisation;
		var groups = currentUser.groups;
		var oldGroupThreads = [];
		getGroupThreads(organisationId, group).forEach(function (thread) {
			oldGroupThreads.push(thread);
		});

		if (!admin()) {
			var wrongOrg = (orgId != organisationId);
			var wrongGroup = (student() || tutor()) && (groups.indexOf(group) == -1);
			if (wrongOrg || wrongGroup) {
				throw new Meteor.Error(500, 'No permission to make a thread here.');
				return false;
			}
			var newThreads = { "title": title, "date": formattedDate, "posts": [{ poster: Meteor.userId(), date: formattedDate, content: post }] };
		} else {
			var newThreads = { "title": title, "date": formattedDate, sticky: false, "posts": [{ poster: Meteor.userId(), date: formattedDate, content: post }] };
		}


		if (subgroup == null) {
			/* New Group Thread */
			oldGroupThreads.push(newThreads);
			f_forums.update({ organisation: organisationId, groups: { $elemMatch: { id: group } } }, { $set: { "groups.$.threads": oldGroupThreads } });

		} else {
			/* New Subgroup Thread */
			//This does not work in mongoDB - multiple $ are not allowed.
			//Instead take the whole subgroups part of groups.$ and replace that.
			var oldSubgroups = getGroupSubgroups(organisationId, group);
			oldSubgroups = pushSubgroupThread(oldSubgroups, subgroup, newThreads);
			f_forums.update({ organisation: organisationId, groups: { $elemMatch: { id: group } } }, { $set: { "groups.$.subgroups": oldSubgroups } });
		}

	},


	'toggleSticky': function (orgId, group, subgroup, threadNo, uID, lock) {
		if (lock == true) {
			throw new Meteor.Error(500, 'Previous toggle still executing. Please wait.');
		}

		var currentUser = Meteor.users.findOne({ _id: uID });

		for(orgId of currentUser.organisation){
			if (!admin() && orgId != currentUser.organisation) {
				throw new Meteor.Error(500, 'You\'re not part of this organisation!');
			}
		}
		

		if (subgroup == null) {
			var threads = getGroupThreads(orgId, group);
			threads[threadNo].sticky = (sticky == null || sticky == undefined) ? true : !threads[threadNo].sticky;

			f_forums.update({ organisation: orgId, groups: { $elemMatch: { id: group } } }, { $set: { "groups.$.threads": threads } });
		} else {
			var subgroups = getGroupSubgroups(orgId, group);
			subgroups.forEach(function (subG) {
				if (subG.id == subgroup) {
					subG.threads[threadNo].sticky = !subG.threads[threadNo].sticky;
					return false;
				}
			});
			f_forums.update({ organisation: orgId, groups: { $elemMatch: { id: group } } }, { $set: { "groups.$.subgroups": subgroups } });
		}
	},

	'editThreadTitle': function (orgId, group, subgroup, threadNo, uID, newTitle) {

		var currentUser = Meteor.users.findOne({ _id: uID });

		for(orgId of currentUser.organisation){
			if (!admin() && orgId != currentUser.organisation) {
				throw new Meteor.Error(500, 'You\'re not part of this organisation!');
			}
		}

		if (subgroup == null) {
			var threads = getGroupThreads(orgId, group);
			threads[threadNo].title = newTitle;

			f_forums.update({ organisation: orgId, groups: { $elemMatch: { id: group } } }, { $set: { "groups.$.threads": threads } });
		} else {
			var subgroups = getGroupSubgroups(orgId, group);
			subgroups.forEach(function (subG) {
				if (subG.id == subgroup) {
					subG.threads[threadNo].title = newTitle;
					return false;
				}
			});
			f_forums.update({ organisation: orgId, groups: { $elemMatch: { id: group } } }, { $set: { "groups.$.subgroups": subgroups } });
		}
	},

	'deleteThread': function (orgId, group, subgroup, threadNo, uID) {

		var currentUser = Meteor.users.findOne({ _id: uID });

		for(orgId of currentUser.organisation) {
			if (!admin() && orgId != currentUser.organisation) {
				throw new Meteor.Error(500, 'You\'re not part of this organisation!');
			}
		}		

		if (subgroup == null) {

			var threads = getGroupThreads(orgId, group);
			threads.splice(threadNo, 1);

			f_forums.update({ organisation: orgId, groups: { $elemMatch: { id: group } } }, { $set: { "groups.$.threads": threads } });

		} else {

			var oldSubgroups = getGroupSubgroups(orgId, group);
			oldSubgroups.forEach(function (subG) {
				if (subG.id == subgroup) {
					subG.threads.splice(threadNo, 1);
					return false;
				}
			});

			f_forums.update({ organisation: orgId, groups: { $elemMatch: { id: group } } }, { $set: { "groups.$.subgroups": oldSubgroups } });

		}
	},

	'editPost': function (orgId, group, subgroup, threadNo, postNo, uID, newContent) {
		var formattedDate = getFormattedDate();

		var currentUser = Meteor.users.findOne({ _id: uID });

		for(orgId of currentUser.organisation) {
			if (!admin() && orgId != currentUser.organisation) {
				throw new Meteor.Error(500, 'You\'re not part of this organisation!');
			}
		}		

		newContent = newContent + "\n\nEdited by poster on " + formattedDate;

		if (subgroup == null) {

			var threads = getGroupThreads(orgId, group);
			threads[threadNo].posts[postNo].content = newContent;

			f_forums.update({ organisation: orgId, groups: { $elemMatch: { id: group } } }, { $set: { "groups.$.threads": threads } });

		} else {

			var oldSubgroups = getGroupSubgroups(orgId, group);
			oldSubgroups.forEach(function (subG) {
				if (subG.id == subgroup) {
					subG.threads[threadNo].posts[postNo].content = newContent;
					return false;
				}
			});

			f_forums.update({ organisation: orgId, groups: { $elemMatch: { id: group } } }, { $set: { "groups.$.subgroups": oldSubgroups } });

		}
	},

	'replyInThread': function (orgId, group, subgroup, threadNo, post, uID) {
		var formattedDate = getFormattedDate();

		
		var currentUser = Meteor.users.findOne({ _id: uID });
		
		for (orgId of currentUser.organisation) {
			if (!admin() && orgId != currentUser.organisation) {
				throw new Meteor.Error(500, 'You\'re not part of this organisation!');
			}
		}		

		var newPost = {
			poster: uID,
			date: formattedDate,
			content: post
		};
		if (subgroup == null) {

			var threads = getGroupThreads(orgId, group);
			threads[threadNo].posts.push(newPost);

			f_forums.update({ organisation: orgId, groups: { $elemMatch: { id: group } } }, { $set: { "groups.$.threads": threads } });

		} else {

			var oldSubgroups = getGroupSubgroups(orgId, group);
			oldSubgroups.forEach(function (subG) {
				if (subG.id == subgroup) {
					subG.threads[threadNo].posts.push(newPost);
					return false;
				}
			});

			f_forums.update({ organisation: orgId, groups: { $elemMatch: { id: group } } }, { $set: { "groups.$.subgroups": oldSubgroups } });

		}

	},

	'deletePost': function (orgId, group, subgroup, threadNo, postNo, uID) {

		var currentUser = Meteor.users.findOne({ _id: uID });
		
		for (orgId of currentUser.organisation) {
			if (!admin() && orgId != currentUser.organisation) {
				throw new Meteor.Error(500, 'You\'re not part of this organisation!');
			}
		}		
		
		if (subgroup == null) {

			var threads = getGroupThreads(orgId, group);
			threads[threadNo].posts.splice(postNo, 1);

			f_forums.update({ organisation: orgId, groups: { $elemMatch: { id: group } } }, { $set: { "groups.$.threads": threads } });
			
			if(threads[threadNo].posts.length == 0){
				Meteor.call("deleteThread", orgId, group, subgroup, threadNo, uID);
			}
		} else {

			var oldSubgroups = getGroupSubgroups(orgId, group);
			var removeTopic = false;
			oldSubgroups.forEach(function (subG) {
				if (subG.id == subgroup) {
					subG.threads[threadNo].posts.splice(postNo, 1);
					if(subG.threads[threadNo].posts.length == 0){
						removeTopic = true;
					}
					return false;
				}
			});

			f_forums.update({ organisation: orgId, groups: { $elemMatch: { id: group } } }, { $set: { "groups.$.subgroups": oldSubgroups } });
			
			if(removeTopic){
				Meteor.call("deleteThread", orgId, group, subgroup, threadNo, uID);
			}
		}
	}
});


updateForumPost = function (target, ids, obj) {
	if (target == "group") {
		f_forums.update({ organisation: ids.organisation, groups: { $elemMatch: { id: ids.group } } }, { $set: obj });
	} else if (target == "subgroup") {
		f_forums.update({ organisation: ids.organisation, groups: { $elemMatch: { id: ids.group } }, "$.subgroups": { $elemMatch: { id: ids.subgroup } } }, { $set: obj });
	}
}


getFormattedDate = function () {
	var d = new Date();
	// var formattedDate = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
	var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
	var date = new Date();
	var dayIndex = date.getDay();
	var dateNo = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();
	var hours = date.getHours();
	var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

	return dayNames[dayIndex] + ' ' + monthNames[monthIndex] + ' ' + dateNo + ' ' + year + ' ' + hours + ':' + minutes;
}

admin = function () {
	return Roles.userIsInRole(Meteor.userId(), 'admin');
}

moderator = function () {
	return Roles.userIsInRole(Meteor.userId(), 'moderator');
}

tutor = function () {
	return Roles.userIsInRole(Meteor.userId(), 'tutor');
}

student = function () {
	return Roles.userIsInRole(Meteor.userId(), 'student');
}

getSubgroupThread = function (org, group, subgroup, thread) {
	var groups = f_forums.findOne({ organisation: org, "groups.id": group }).groups;
	var currG = null;
	groups.forEach(function (item) {
		if (item["id"] == groupId) {
			currG = item;
		}
	});

	var threads = [];

	currG.subgroups.forEach(function (item) {
		if (item["id"] == subgroup) {
			threads = item.threads;
		}
	});

	return threads[thread];

}

getGroupThread = function (org, group) {
	var groups = f_forums.findOne({ organisation: org, "groups.id": group }).groups;
	var currG = null;
	groups.forEach(function (item) {
		if (item["id"] == groupId) {
			currG = item;
		}
	});

	var threads = currG.threads;

	return threads;
}


getGroupThreads = function (orgId, groupId) {
	forumDoc = f_forums.findOne({ organisation: orgId });
	var threads = [];

	forumDoc.groups.forEach(function (item) {
		if (item.id == groupId) {
			item.threads.forEach(function (thread) {
				threads.push(thread);
			});
			return false;
		}
	});

	return threads;

}

getGroupSubgroups = function (orgId, groupId) {
	var subgroups = [];
	var forumDoc = f_forums.findOne({ organisation: orgId });
	forumDoc.groups.forEach(function (group) {
		if (group.id == groupId) {
			subgroups = group.subgroups;
			return false;
		}
	});

	return subgroups;
}


pushSubgroupThread = function (oldGroupThreads, subgroupId, newThreads) {
	oldGroupThreads.forEach(function (subgroup) {
		if (subgroup.id == subgroupId) {
			subgroup.threads.push(newThreads);
			return false;
		}
	});

	return oldGroupThreads;
}
}).call(this);
