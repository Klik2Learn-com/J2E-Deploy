
/*
*	Global Helpers
* 	
*	These helpers are added to every template and therefore can be used in any template.
*/
Template.registerHelper('isTouchDevice', function () {
	if (Device.isTouch) {
		return true;
	} else {
		return false;
	}
});

Template.registerHelper('internetExplorer', function () {
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");

	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
	{
		return true;
	}

	return false;
});


Template.registerHelper('formatDate', function (dateIn) {
	if (dateIn == undefined) {
		return "N/A";
	} else {
		var date = new Date(dateIn);
		var day = (date.getUTCDate() < 10 ? '0' : '') + date.getUTCDate();
		var month = ((date.getUTCMonth() + 1) < 10 ? '0' : '') + (date.getUTCMonth() + 1); //months from 1-12
		var year = date.getUTCFullYear();
		var hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
		var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

		var formattedDate = day + "/" + month + "/" + year + " " + hours + ":" + minutes;
		return formattedDate;
	}
});

Template.registerHelper('isAdmin', function () {
	if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
		return true;
	} else {
		return false;
	}
});

Template.registerHelper('isAdminOrMod', function () {
	if (Roles.userIsInRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), 'moderator')) {
		return true;
	} else {
		return false;
	}
});

Template.registerHelper('isAdminOrTutor', function () {
	if (Roles.userIsInRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), 'tutor')) {
		return true;
	} else {
		return false;
	}
});

Template.registerHelper('isAdminOrStudent', function () {
	if (Roles.userIsInRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), 'student')) {
		return true;
	} else {
		return false;
	}
});

Template.registerHelper('isAdminModOrTutor', function () {
	if (Roles.userIsInRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), 'moderator') || Roles.userIsInRole(Meteor.userId(), 'tutor')) {
		return true;
	} else {
		return false;
	}
});

Template.registerHelper('isTutor', function () {
	if (Roles.userIsInRole(Meteor.userId(), 'tutor')) {
		return true;
	} else {
		return false;
	}

});

Template.registerHelper('isMod', function () {
	if (Roles.userIsInRole(Meteor.userId(), 'moderator')) {
		return true;
	} else {
		return false;
	}

});

Template.registerHelper('isStudent', function () {
	if (Roles.userIsInRole(Meteor.userId(), 'student')) {
		return true;
	} else {
		return false;
	}
});

Template.registerHelper('notStudent', function () {
	if (!Roles.userIsInRole(Meteor.userId(), 'student')) {
		return true;
	} else {
		return false;
	}
});

Template.registerHelper('getUsernameFromId', function (userId) {
	// var userId = String(userId);
	var user = Meteor.users.findOne({ _id: userId });
	if (user == null || user == 'undefined')
		return false;
	var username = user && user.username;
	return username;
	
	// var username = "";
	// Meteor.call("getUsernameFromId", userId, function(err, result){
	// 	if(err)
	// 		Bert.alert(err, 'danger', 'growl-top-right');

	// 	username = result;
	// });
	// return username;
})

Template.registerHelper('getFullnameFromId', function (userId) {
	// var userId = String(userId);
	// var user = Meteor.users.findOne({ _id: userId });
	// if (user == null || user == 'undefined')
	// 	return false;

	var user = Meteor.users.findOne({ _id: userId }); 
	if (user == null || user == 'undefined') 
	  return false; 
	var username = user.profile.firstname + " " + user.profile.surname; 
	return username; 


	// if(userId == null || userId == 'undefined')
	// 	return "";
	
	// //Need to rework this.. doesnt work!
	// Meteor.call("getUserProfileFromId", userId, function(err, result){
	// 	if(err)
	// 		console.log(err);
	// 	else
	// 		localStorage.setItem("userFullNameHelper", result.firstname + " " + result.surname);
	// });
	// return localStorage.getItem("userFullNameHelper");
})

Template.registerHelper('orgName', function (org) {
	var organisation = organisations.findOne({ _id: org });
	if (organisation != null && organisation != 'undefined')
		return organisation.name;
})

Template.registerHelper('lastLoginDate', function () {
	var never = "_Never";

	if (this.status == null || this.status == 'undefined')
		return never;

	if (this.status.lastLogin && this.status.lastLogin.date) {
		var date = new Date(this.status.lastLogin.date);
	} else if (this.services.resume && this.services.resume.loginTokens[0] && this.services.resume.loginTokens[0].when) {
		var newLogin = this.services.resume.loginTokens.length - 1;
		var date = new Date(this.services.resume.loginTokens[newLogin].when);
	} else {
		return never;
	}

	var day = (date.getUTCDate() < 10 ? '0' : '') + date.getUTCDate();
	var month = ((date.getUTCMonth() + 1) < 10 ? '0' : '') + (date.getUTCMonth() + 1); //months from 1-12
	var year = date.getUTCFullYear();
	var hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
	var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

	var formattedDate = year + "/" + month + "/" + day + " " + hours + ":" + minutes;
	return formattedDate;

})