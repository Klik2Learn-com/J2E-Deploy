Template.notifications.events({

	'click #notificationRead': function (evt) {
		evt.preventDefault();
		//Meteor.call('setProgCompNotification', "Read");
		$("#notificationModal1").modal('toggle');
		//localStorage.removeItem("completionStatus");
	},

	// 'click .close, hidden.bs.modal #notificationModal1': function (evt) {
	// 	evt.preventDefault();
	// 	//localStorage.removeItem("completionStatus");
	// 	//Meteor.call('setProgCompNotification', "Read");
	// },

	// 'hidden.bs.modal #notificationModal1': function (evt) {
	// 	evt.preventDefault();
	// 	//localStorage.removeItem("completionStatus");
	// 	Meteor.call('setProgCompNotification', "Read");
	// },

	'click #fillInForm': function (evt) {
		evt.preventDefault();
		//Meteor.call('setProgCompNotification', "Read");
		//localStorage.removeItem("completionStatus");
		$("#notificationModal1").modal('toggle');
		window.removeEventListener("beforeunload", beforeUnloadConfirm);
		Session.set("dirty", false);
		window.location.href = '/certificate';
	}

});


Template.notifications.helpers({

	'completionNotification': function () {

		/**
		 * This is an alternative to the notification badge on the certificate button. 
		 * An announcement is supposed to appear for the user, but at the moment
		 * the announcements are build-up.
		 */
		// var certificateAnnouncement = Announcements.findOne({title:"Certificate"});
		// console.log(certificateAnnouncement);
		// if (!certificateAnnouncement) {
		// 	var trophies = Meteor.users.findOne({ _id: Meteor.userId() }).trophyAchieved;
		// 	if (trophies != null && trophies != undefined) {
		// 		//check only for the 'Course Completed' trophy 
		// 		if (trophies[3] != null && trophies[3] != undefined) {
		// 			var title = "Certificate"
		// 			var msg = "You have completed the whole course! You are now eligible for a certificate! You can find the certificate button on your dashboard, where you will be asked for your details after which the certificate will be made available for download."
		// 			var expiry = 30;
		// 			var userId = Meteor.userId();
		// 			Meteor.call('addAnnouncements', title, msg, expiry, userId);
		// 		}
		// 	}
		// }		


		var user = Meteor.users.findOne({ _id: Meteor.userId() });
		if (user != null && user != 'undefined' && user.organisation != null && user.organisation != 'undefined') {
			var completionStatus = 0;
			if (Session.get("completionStatus") != null && Session.get("completionStatus") != undefined) {
				completionStatus = Session.get("completionStatus");
			}

			return "Congratulations! You have completed all 10 modules of the course. You can now receive two course completion certificates: one from The CPD Certification Service and one from City & Guilds. We will need some information from you if you want this. Are you happy to supply your full name, gender, email address and your date of birth?";
		}

		
	},

	'progressCompletion': function () {
		return Session.get("completionStatus");
	},

	'fullCompletion': function () {
		return Session.get("completionStatus") == "80";
	},

	'halfCompletion': function () {
		return Session.get("completionStatus") == "40";
	}

});

Template.finishedModule.helpers({
	'moduleFinished': function () {
		moduleNumber = Session.get("finishedModule");
		return moduleNumber;
	},

	'trophyNumber': function () {
		moduleNumber = Session.get("finishedModule");
		var moduleNumberString = '';
		if (moduleNumber != null && moduleNumber != undefined)
			moduleNumberString = moduleNumber.toString();
		return moduleNumberString;
	},
});

Template.finishedModule.events({
	'hidden.bs.modal #notificationModal2': function (evt) {
		evt.preventDefault();
		var finishedModule = Session.get("finishedModule");
		//localStorage.removeItem("completionStatus");
		Meteor.call('setModuleProgress', finishedModule, "Read");
		setTimeout(function () {
			Session.set("finishedModule", "");
		}, 2000);
	},
});

Template.trophyEarned.helpers({

	'trophyNumber': function () {
		trophyNum = Session.get("trophyEarned");
		var trophyNumString = '';
		if (trophyNum != null && trophyNum != undefined) {
			if (trophyNum == 1) {
				trophyNumString = "30";
			} else if (trophyNum == 2) {
				trophyNumString = "60";
			} else if (trophyNum == 3) {
				trophyNumString = "100";
			}
		}

		return trophyNumString;
	},


});

Template.trophyEarned.events({

	'hidden.bs.modal #notificationModal3': function (evt) {
		evt.preventDefault();
		var trophyIndex = Session.get("trophyEarned");
		var certificateStatus = Meteor.users.findOne({_id: Meteor.userId()}).certificateEnabled;
		if (trophyIndex == 3 && certificateStatus == true) {
			if(Meteor.users.findOne({_id: Meteor.userId()}).certificateEnabled){
				Meteor.call('setCertificateNotification', true);
				setTimeout(function () {
					$("#notificationModal1").modal({
						backdrop: 'static',
						keyboard: false
					});
					//$("#notificationModal1").modal();
				}, 2000);
			}
		}

		//localStorage.removeItem("completionStatus");
		Meteor.call('setTrophyProgress', trophyIndex, "Read");
		setTimeout(function () {
			Session.set("trophyEarned", "");
		}, 2000);

		

		// var trophies = Meteor.users.findOne({ _id: Meteor.userId() }).trophyAchieved;
		// if (trophies != null && trophies != undefined) {
		// 	//check only for the 'Course Completed' trophy 
		// 	if (trophies[3] != null && trophies[3] != undefined) {
		// 		var title = "Certificate"
		// 		var msg = "You have completed the whole course! You are now eligible for a certificate! You can find the certificate button on your dashboard, where you will be asked for your details after which the certificate will be made available for download."
		// 		var expiry = 30;
		// 		var userId = Meteor.userId();
		// 		Meteor.call('addAnnouncements', title, msg, expiry, userId);
		// 	}
		// }
	},

});