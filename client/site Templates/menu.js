Template.MenuLearningTools.events({

	'click a[data-target="#notebookmodal"]': function(evt) {
		$('#note_read').addClass('hidden');
		$('#note_write').removeClass('hidden');
	},

	'click a[data-target="#voicerecordermodal"]': function(evt) {
		$('#recorder_listen').addClass('hidden');
		$('#recorder_save').removeClass('hidden');
	},

	'click a[data-target="#grammarmodal"]': function(evt) {
		$('#grammarmodal section').not('#GGintro').addClass('hidden');
		$('#GGintro').removeClass('hidden');
	},

	'click a[data-target="#messagesmodal"]': function(evt) {
		$('#messages_write').addClass('hidden');
		$('#messages_read').removeClass('hidden');
		$('.msg-inbox .msg-row .msg-details.open').removeClass('open');
		$('.msg-inbox .msg-row.open').addClass('closed');
		$('.msg-inbox .msg-row.open').removeClass('open');
	}

})

Template.MenuLinks.events({

	'click a[data-target="home"]': function(evt) {
		evt.preventDefault();
		Router.go('/');
	},
	
	'click a[data-target="tutorguide"]': function(evt) {
		evt.preventDefault();
		Router.go('/TutorGuide');
	},
	
	'click a[data-target="overview"]': function(evt) {
		evt.preventDefault();
		Router.go('/Overview');
	},
	
	'click a[data-target="userguide"]': function(evt) {
		evt.preventDefault();
		Router.go('/UserGuide');
	}

})

Template.MenuLinks.helpers({
	
	'hasCourse': function() {
		if (Meteor.users.findOne({ _id : Meteor.userId(), authorisedCourses : {"journey2English" : true}})) {
			return true;
		} else {
			return false;
		}
	},

	'newAnnouncements': function(){
		var today = new Date();
		var newAnnouncements = Announcements.findOne({'readBy': {$nin: [Meteor.userId()]}, 'expiry': {$gte: today}});
		return (newAnnouncements != null && newAnnouncements != undefined);
	},

	'unreadAnnouncements': function(){
		var today = new Date();
		var unread = Announcements.find({'readBy': {$nin: [Meteor.userId()]}, 'expiry': {$gte: today}}).count();
		return unread;
	},

	'announcement': function(){
		var today = new Date();
		var announcement = Announcements.findOne({'expiry': {$gte: today}});
		
		return (announcement != null && announcement != undefined);;
	}
	
})

Template.menu.helpers({
	'newAnnouncements': function(){
		var today = new Date();
		var newAnnouncements = Announcements.findOne({'readBy': {$nin: [Meteor.userId()]}, 'expiry': {$gte: today}});
		return (newAnnouncements != null && newAnnouncements != undefined);
	}
})

Template.MenuAccount.events({

	'click a[data-target="home"]': function(evt) {
		evt.preventDefault();
		Router.go('/');
	},

	'click a[data-target="admin-panel"]': function(evt) {
		evt.preventDefault();
		Router.go('/admin');
	},

	'click a[data-target="styleguide"]': function(evt) {
		evt.preventDefault();
		Router.go('/styleguide');
	},

	'click a[data-target="profile"]': function(evt) {
		evt.preventDefault();
		Router.go('/user/'+Meteor.userId());
	},

	'click a[data-target="tutor-panel"]': function(evt) {
		evt.preventDefault();
		Router.go('/admin');
	},

	'click a[data-target="#messagesmodal"]': function(evt) {
		$('#messages_write').addClass('hidden');
		$('#messages_read').removeClass('hidden');
		$('.msg-inbox .msg-row .msg-details.open').removeClass('open');
		$('.msg-inbox .msg-row.open').addClass('closed');
		$('.msg-inbox .msg-row.open').removeClass('open');
	},

	'click .sign-out': function(evt){
		evt.preventDefault();
		
        Meteor.logout(function(){
			if($(".sign-out").attr("href") != "#"){
				Session.set("redirect", false);
				window.location = $(".sign-out").attr("href");
			}else{
				Router.go("/");
			}
			
		});
    }

})

Template.MenuHeader.events({
	
	'click a[data-target="userguide"]': function(evt) {
		evt.preventDefault();
		Router.go('/UserGuide');
	},

	'click a[data-target="tutorguide"]': function(evt) {
		evt.preventDefault();
		Router.go('/TutorGuide');
	},
	
})

Template.MenuAccount.created = function() {
	this.subscribe('User');
	this.subscribe('messages');
}

Template.MenuAccount.helpers({

	'unreadMessages':function(){
		var count = messages.find({"p2" : Meteor.userId(), "p2_unread" : true, "p2_visible" : true}).count();
		if(count == 0) {return false};
		return count;
	},
	'hasGroup': function() {
		var group = Meteor.users.find({ _id : Meteor.userId(), groups : {$exists: true, $not: {$size: 0}} }).count();
		if (group == 0){
			return false;
		} else {
			return true;
		}
	},
	'hasCourse': function() {
		if (Meteor.users.findOne({ _id : Meteor.userId(), authorisedCourses : {"journey2English" : true}})) {
			return true;
		} else {
			return false;
		}
	},
	'signOutLink': function() {
		var user = Meteor.users.findOne({_id: Meteor.userId()})
		if(user == null || user == 'undefined' || user.organisation == 'undefined' || user.organisation == null )
			return "#";

		var orgId = user.organisation[0];
		var organisation = organisations.findOne({_id: orgId});
		if(organisation == null || organisation == "undefined"){
			return "#";
		}
		var landingPage = organisation.landingPage;
		if(landingPage == null || landingPage == 'undefined'){
			landingPage = "#"; // - Default home page
		}

		return landingPage;
	},

	'isScormSession': function () {
		var scormActive = localStorage.getItem("isScormAPIActive");
		if (scormActive != null && scormActive != 'undefined' && scormActive == 'yes') {
			return false;
			
		} else {
			return true;
		}
	}

})

Template.MenuLearningTools.created = function() {
	this.subscribe('User');
	this.subscribe('messages');
}

Template.MenuLearningTools.helpers({

	'unreadMessages':function(){
		var count = messages.find({"p2" : Meteor.userId(), "p2_unread" : true, "p2_visible" : true}).count();
		if(count == 0) {return false};
		return count;
	},
	'hasGroup': function() {
		var group = Meteor.users.find({ _id : Meteor.userId(), groups : {$exists: true, $not: {$size: 0}} }).count();
		if (group == 0){
			return false;
		} else {
			return true;
		}
	},

})

Template.MenuLearningToolsDis.created = function() {
	this.subscribe('User');
	this.subscribe('messages');
}

Template.MenuLearningToolsDis.helpers({

	'unreadMessages':function(){
		var count = messages.find({"p2" : Meteor.userId(), "p2_unread" : true, "p2_visible" : true}).count();
		if(count == 0) {return false};
		return count;
	},
	'hasGroup': function() {
		var group = Meteor.users.find({ _id : Meteor.userId(), groups : {$exists: true, $not: {$size: 0}} }).count();
		if (group == 0){
			return false;
		} else {
			return true;
		}
	},

})

