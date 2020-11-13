Template.Courses.created = function () {
	this.subscribe('studentAssessments');
	this.subscribe('organisations');
	this.subscribe('users');
	this.subscribe('messages');
	this.subscribe('bug_reports');
	this.subscribe('contact_form');
	this.subscribe('Announcements');

	document.title = "Home - Journey 2 English";

}
Template.moreAnnouncementsModal.created = function () {
	this.subscribe('Announcements');
}

Template.Courses.rendered = function () {
	var images = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png', '11.png', '12.png'];
	$('#welcomeImg').html('<img src="images/welcome/' + images[Math.floor(Math.random() * (images.length - 1) + 1)] + '" draggable="false">');
	$('#welcomeImg2').html('<img src="images/welcome/' + images[Math.floor(Math.random() * (images.length - 1) + 1)] + '" draggable="false">');

	var countInterval = setInterval(function () {
		Announcements.find({}).count();
	}, 20);

	// Global function
	createDoughnutChart();
	localStorage.setItem("forums_org_grouprefreshOnce", "refresh");
	localStorage.setItem("forums_org_group_subgrouprefreshOnce", "refresh");
	localStorage.setItem("adminGroupEditorrefreshOnce", "refresh");
	localStorage.setItem("adminSubGroupEditorrefreshOnce", "refresh");

}

Template.Courses.events({

	'click *[data-function="link"]': function (evt) {
		var target = $(evt.currentTarget).attr('data-target');
		Router.go(target);
	},

	'click *[data-target="profile"]': function (evt) {
		evt.preventDefault();
		Router.go('/user/' + Meteor.userId());
	},

	'click .admin-nav': function (evt) {
		evt.preventDefault();
		var target = $(evt.currentTarget).attr('href');
		Router.go(target);
	},

	'click a[data-target="#messagesmodal"]': function (evt) {
		$('#messages_write').addClass('hidden');
		$('#messages_read').removeClass('hidden');
		$('.msg-inbox .msg-row .msg-details.open').removeClass('open');
		$('.msg-inbox .msg-row.open').addClass('closed');
		$('.msg-inbox .msg-row.open').removeClass('open');
	},

	'click #last-activityBtn': function (evt) {
		evt.preventDefault();
		var target = evt.currentTarget.getAttribute("data-target");
		Router.go("/" + target);
	},

	'click #resetAssessment': function (evt) {
		evt.preventDefault();
		Meteor.call("resetAssessment", Meteor.userId());
	},

	'click *[data-target="underDev"]': function (evt) {
		evt.preventDefault();
		alert("This feature is under development.");
	}

})

Template.Courses.helpers({

	'getAssessmentId': function () {
		var assessment = studentAssessments.findOne({ userId: Meteor.userId(), type: 'initial-assessment' });
		if (assessment)
			return assessment._id;
	},

	// 'getExitTestId': function () {
	// 	var exittest = 
	// }

	'studentHasAssessment': function () {
		if (studentAssessments.findOne({ userId: Meteor.userId(), type: 'initial-assessment', pass: null, userRole: { $nin: ["admin", "moderator", "tutor"] } })) {
			return true;
		} else {
			return false;
		}
	},

	'completedAssessment': function () {
		var studentAssessment = studentAssessments.findOne({ userId: Meteor.userId(), type: 'initial-assessment', pass: { $ne: null } });
		return (studentAssessment != null && studentAssessment != 'undefined');
	},

	'hasCourse': function () {
		if (Meteor.users.findOne({ _id: Meteor.userId(), authorisedCourses: { "journey2English": true } })) {
			return true;
		} else {
			return false;
		}
	},

	'hasCourseSidebar': function () {
		if (Meteor.users.findOne({ _id: Meteor.userId(), authorisedCourses: { "journey2English": true } })) {
			return "with-tools-sidebar";
		} else {
			return "";
		}
	},

	'hasLastActivity': function () {
		Session.set("lastAtivity", null);
		Meteor.call('getLastActivity', Meteor.userId(), function (err, result) {
			if (err) {
				console.log(err);
			}
			console.log("last activity: " + result);
			Session.set("lastActivity", result);
			//localStorage.setItem("lastActivity", result);
		});
		var disableBtn = Session.get("disableButton");
		if ((disableBtn == null || disableBtn == 'undefined') && Session.get("lastActivity") != null) {
			return true;
		} else {
			return false;
		}
		//return  Session.get("lastActivity") != null;
		//return localStorage.getItem("lastActivity") != null;
	},

	'lastActivity': function () {
		var lastActivity = Session.get("lastActivity");
		var gameActivities = ["m1a28", "m2a29", "m3a30", "m4a31", "m5a25", "m6a30", "m7a27", "m8a35", "m9a31", "m10a29"];
		if (gameActivities.indexOf(lastActivity) >= 0) {
			return "m" + lastActivity.charAt(1) + "Game";
		} else {
			return lastActivity;
		}
		//return Session.get("lastActivity");
		//return localStorage.getItem("lastActivity");
	},

	'organisation': function () {
		var user = Meteor.users.findOne({ _id: Meteor.userId() });

		if (user == null || user == 'undefined' || user.organisation == 'undefined' || user.oranisation == null) {
			return null;
		}
		var org = user.organisation[0];

		return org;
	},

	'Announcements': function () {
		return Announcements.find({}, { sort: { date: -1 }, limit: 1 });
	},

	// 'display':function(){
	// 	var display = this.expiry;
	// 	var date = new Date();
	// 	if(display >= date){
	// 		return true;
	// 	}
	// },

	'announcement': function () {
		if (Announcements.find({}).count() > 0) {
			var data = Announcements.find().fetch();
			var display = _.pluck(data, "expiry");
			var date = new Date();
			for (i = 0; i < display.length; i++) {
				if (display[i] >= date) {
					return true;
				}
			}
		}
	},

	'trial': function () {
		var trial = organisations.findOne({ name: "Trial" })._id;
		var oranisations = Meteor.users.findOne({ _id: Meteor.userId() }).organisation;
		oranisations.forEach(function (element) {
			if (element == trial)
				return true;
		});
		return false;
	},

	'hasAssessment': function () {
		if (studentAssessments.findOne({ userId: Meteor.userId(), type: 'initial-assessment', pass: null })) {
			return true;
		} else {
			return false;
		}
	},

	'courseDashboard': function () {
		return getCourseDashboard();
	},

	'isExpired': function () {
		if (Meteor.user() == null || Meteor.user() == undefined)
			return true;

		var expiryDate = moment(Meteor.user().expiry, "DD/MM/YYYY H:mm");
		var now = moment();
		if (Meteor.user().expiredSubscription == true) {
			return true;
		}
		// else if(Meteor.user().expiry === null){
		// 	return true;

		// }
		else if (now > expiryDate) {
			return true;
		}
		else {
			return false;
		}
	},
	
	'isScormSession': function () {
		// This helper is to check if the SCORM API should be triggered - used to push the user progress 
		var scormActive = localStorage.getItem("isScormAPIActive");

		scormSession = false;
		if (scormActive != null && scormActive != 'undefined' && scormActive == 'yes') {
			scormSession = true;
		}
		return scormSession;

	}



});

Template.AdminDashboard.events({
	'click #achievementsButton': function () {
		doAchievementsSetUp();
	},

	'click #certificateDetailsButton': function (evt) {
		evt.preventDefault();
		//$(this).find("div").text("");
	
		window.removeEventListener("beforeunload", beforeUnloadConfirm);
		Session.set("dirty", false);
		var currUser = Meteor.users.findOne({ _id: Meteor.userId() });
		if(currUser != undefined || currUser != null){
			if(currUser.certificateNotification !== 'detailsSubmitted')
				Meteor.call('setCertificateNotification', false);	
		}
		setTimeout(function(){
			window.location.href = '/certificate';
		}, 1000)
	}


});

Template.ModeratorDashboard.events({
	'click #achievementsButton': function () {
		doAchievementsSetUp();
	}

});

Template.TutorDashboard.events({
	'click #achievementsButton': function () {
		doAchievementsSetUp();
	}

});

Template.StudentDashboard.events({
	'click #achievementsButton': function () {
		doAchievementsSetUp();
	},

	'click #certificateDetailsButton': function (evt) {
		evt.preventDefault();
		//$(this).find("div").text("");
	
		window.removeEventListener("beforeunload", beforeUnloadConfirm);
		Session.set("dirty", false);
		var currUser = Meteor.users.findOne({ _id: Meteor.userId() });
		if(currUser != undefined || currUser != null){
			if(currUser.certificateNotification !== 'detailsSubmitted')
				Meteor.call('setCertificateNotification', false);	
		}
		setTimeout(function(){
			window.location.href = '/certificate';
		}, 1000)
	}

});

var doAchievementsSetUp = function () {
	var modulesFinishedNotification = Meteor.users.findOne({ _id: Meteor.userId() }).moduleFinishedNotification;
	var moduleNum = 10;
	if (modulesFinishedNotification != null && modulesFinishedNotification != undefined) {
		for (var i = 1; i <= moduleNum; i++) {
			if (modulesFinishedNotification[i] != null && modulesFinishedNotification[i] != undefined) {
				var modulestr = '.mod' + i.toString();
				var parentWrapper = $(modulestr).parent();
				parentWrapper.removeClass('locked');
				var moduleHtml = $($(parentWrapper).children('.trophy-label')).children('.avoid-wrap').html();
				var newHtml = 'Completed <span class="avoid-wrap">' + moduleHtml + '</span>';
				$(parentWrapper).children('.trophy-label').html(newHtml);
			}
		}
	}
	var trophies = Meteor.users.findOne({ _id: Meteor.userId() }).trophyAchieved;
	var trophiesNum = 3;
	if (trophies != null && trophies != undefined) {
		for (var i = 1; i <= trophiesNum; i++) {
			if (trophies[i] != null && trophies[i] != undefined) {
				var trophystr = '.t' + i.toString();
				var parentWrapper = $(trophystr).parent();
				parentWrapper.removeClass('locked');
				var oldText = $($(parentWrapper).children('.trophy-label')).text();
				if (oldText.slice(0, 9) != 'Completed') {
					var newHtml = 'Completed' + oldText.slice(8);
					$(parentWrapper).children('.trophy-label').html(newHtml);
				}
			}
		}
	}
	$("#achievementsModal").modal();

}


Template.AdminDashboard.helpers({
	'unmarkedCount': function () {
		var count = studentAssessments.find({ "pass": null, "completeDate": { $ne: null }, "userRole": { $ne: "tutor" } }).count();
		if (count == 0) { return false };
		return count;
	},

	'unmarkedCountBug': function () {
		var count = bug_reports.find({ "status": "New" }).count();
		if (count == 0) { return false };
		return count;
	},

	'unreadMessages': function () {
		var count = messages.find({ "p2": Meteor.userId(), "p2_unread": true, "p2_visible": true }).count();
		if (count == 0) { return false };
		return count;
	},

	'unmarkedCountContactForm': function () {
		var count = contact_form.find({ "status": "New" }).count();
		if (count == 0) { return false };
		return count;
	},

	'getAchievementsCount': function () {
		var count = checkNewAchievements();
		if (count == 0) {
			return false;
		} else {
			return count;
		}
	},

	'isScormSession': function () {
		// This helper is to check if the SCORM API should be triggered - used to push the user progress 
		var scormActive = localStorage.getItem("isScormAPIActive");

		scormSession = false;
		if (scormActive != null && scormActive != 'undefined' && scormActive == 'yes') {
			scormSession = true;
		}

		return scormSession;

	},

	'certificateEligible': function () {
		var certificate = Meteor.users.findOne({ _id: Meteor.userId() }).certificateNotification;
		var elegible = Meteor.users.findOne({ _id: Meteor.userId() }).certificateEnabled;
		if (certificate != null && certificate != undefined && elegible) {
			return true;
		}
		return false;
	}
});

var checkNewAchievements = function (counter) {
	var counter = 0;
	var modulesFinishedNotification = Meteor.users.findOne({ _id: Meteor.userId() }).moduleFinishedNotification;
	var modulesCount = 10;
	if (modulesFinishedNotification != null && modulesFinishedNotification != undefined) {
		for (var i = 1; i <= modulesCount; i++) {
			if (modulesFinishedNotification[i] != null && modulesFinishedNotification[i] != undefined) {
				if ((modulesFinishedNotification[i] == 'Finished' || modulesFinishedNotification[i] == 'Read') && modulesFinishedNotification[i] != 'ModalSeen') {
					counter++;
				}
			}
		}
	}

	var trophies = Meteor.users.findOne({ _id: Meteor.userId() }).trophyAchieved;
	var trophiesCount = 3;
	if (trophies != null && trophies != undefined) {
		for (var i = 1; i <= trophiesCount; i++) {
			if (trophies[i] != null && trophies[i] != undefined) {
				if ((trophies[i] == 'Finished' || trophies[i] == 'Read') && trophies[i] != 'ModalSeen') {
					counter++;
				}
			}
		}
	}

	return counter;

}

Template.ModeratorDashboard.helpers({
	'unmarkedCount': function () {
		var count = studentAssessments.find({ "pass": null, "completeDate": { $ne: null }, "userRole": { $ne: "tutor" } }).count();
		if (count == 0) { return false };
		return count;
	},

	'getAchievementsCount': function () {
		var count = checkNewAchievements();
		if (count == 0) {
			return false;
		} else {
			return count;
		}
	},

	'isScormSession': function () {
		// This helper is to check if the SCORM API should be triggered - used to push the user progress 
		var scormActive = localStorage.getItem("isScormAPIActive");

		scormSession = false;
		if (scormActive != null && scormActive != 'undefined' && scormActive == 'yes') {
			scormSession = true;
		}

		return scormSession;

	}
});


Template.TutorDashboard.helpers({
	'unmarkedCount': function () {
		var count = studentAssessments.find({ "pass": null, "completeDate": { $ne: null }, "userRole": { $ne: "tutor" } }).count();
		if (count == 0) { return false };
		return count;
	},

	'hasGroup': function () {
		var group = Meteor.users.find({ _id: Meteor.userId(), groups: { $exists: true, $not: { $size: 0 } } }).count();
		if (group == 0) {
			return false;
		} else {
			return true;
		}
	},

	'getAchievementsCount': function () {
		var count = checkNewAchievements();
		if (count == 0) {
			return false;
		} else {
			return count;
		}
	},

	'isScormSession': function () {
		// This helper is to check if the SCORM API should be triggered - used to push the user progress 
		var scormActive = localStorage.getItem("isScormAPIActive");

		scormSession = false;
		if (scormActive != null && scormActive != 'undefined' && scormActive == 'yes') {
			scormSession = true;
		}

		return scormSession;

	}

});

Template.StudentDashboard.helpers({
	'hasGroup': function () {
		var group = Meteor.users.find({ _id: Meteor.userId(), groups: { $exists: true, $not: { $size: 0 } } }).count();
		if (group == 0) {
			return false;
		} else {
			return true;
		}
	},

	'studentHasAssessment': function () {
		if (studentAssessments.findOne({ userId: Meteor.userId(), type: 'initial-assessment', pass: null })) {
			return true;
		} else {
			return false;
		}
	},

	'hasCourse': function () {
		if (Meteor.users.findOne({ _id: Meteor.userId(), authorisedCourses: { "journey2English": true } })) {
			return true;
		} else {
			return false;
		}
	},

	'unreadMessages': function () {
		var count = messages.find({ "p2": Meteor.userId(), "p2_unread": true, "p2_visible": true }).count();
		if (count == 0) { return false };
		return count;
	},

	'getAchievementsCount': function () {
		var count = checkNewAchievements();
		if (count == 0) {
			return false;
		} else {
			return count;
		}
	},

	'certificateEligible': function () {
		var certificate = Meteor.users.findOne({ _id: Meteor.userId() }).certificateNotification;
		var elegible = Meteor.users.findOne({ _id: Meteor.userId() }).certificateEnabled;
		if (certificate != null && certificate != undefined && elegible) {
			return true;
		}
		return false;
	},

	'modalIgnored': function () {
		setTimeout(function(){
			var certificateNotification = Meteor.users.findOne({ _id: Meteor.userId() }).certificateNotification;
			if (certificateNotification != null && certificateNotification != undefined) {
				if (certificateNotification) {
					return true;
				}
		}},1000)
		return false;
	},

	'isScormSession': function () {
		// This helper is to check if the SCORM API should be triggered - used to push the user progress 
		var scormActive = localStorage.getItem("isScormAPIActive");

		scormSession = false;
		if (scormActive != null && scormActive != 'undefined' && scormActive == 'yes') {
			scormSession = true;
		}

		return scormSession;

	}

});

Template.resit_modal.helpers({
	'getAssessmentId': function () {
		var assessment = studentAssessments.findOne({ userId: Meteor.userId(), type: 'initial-assessment' });
		if (assessment)
			return assessment._id;
	},
})