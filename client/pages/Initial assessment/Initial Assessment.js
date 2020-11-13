Template.InitialAssessment.helpers({

	
	
	assessmentDoc: function() {
		var assessmentId = Router.current().params.assessmentid;
		return studentAssessments.findOne({ _id : assessmentId })	
	},

	assessmentOwner: function() {
		return this.userId == Meteor.userId();
	},

	readingCompleted: function() {
		for (var i = 0; i < this.sections.length; i++) {
			if (this.sections[i].name == "Reading") {
				if (this.sections[i].completeDate != null ) { 
					// return false;
					return "completed"
				}
			}
		}
		return false;
	},

	writingCompleted: function() {
		for (var i = 0; i < this.sections.length; i++) {
			if (this.sections[i].name == "Writing") {
				if (this.sections[i].completeDate != null ) { 
					// return true;
					return "completed"
				}
			}
		}
		return false;
	},

	listeningCompleted: function() {
		for (var i = 0; i < this.sections.length; i++) {
			if (this.sections[i].name == "Listening") {
				if (this.sections[i].completeDate != null ) { 
					// return true;
					return "completed"
				}
			}
		}
		return false;
	},

	speakingCompleted: function() {
		for (var i = 0; i < this.sections.length; i++) {
			if (this.sections[i].name == "Speaking") {
				if (this.sections[i].completeDate != null ) { 
					// return true;
					return "completed"
				}
			}
		}
		return false;
	},

	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#InitialAssessment_end') { 
			return false; 
		}
		return true;	 
	},

	helpVideoSource: function(){
		if(Roles.userIsInRole( Meteor.userId(), 'student')){
			return "/video/guide/student/initial-assess.mp4";
		}else{
			return "/video/guide/tutor/initial-assess.mp4";
		}
	},

	helpVideoPoster: function(){
		if(Roles.userIsInRole( Meteor.userId(), 'student')){
			return "/video/guide/student/initial-assess.png";
		}else{
			return "/video/guide/tutor/initial-assess.png";
		}
	},

});

Template.InitialAssessment.events({

	'click *[data-function="link"]': function(evt) {
		evt.preventDefault();
		// Uncomment to disable click when section is completed.
		if (!$(evt.currentTarget).children('li').hasClass('completed')) {
			var target = $(evt.currentTarget).attr('data-target');
			Router.go('/assessment/' + this._id + '/' + target);
		} 
	},

	'click #helpvideoShow': function(evt){
		evt.preventDefault();
		$(".video-wrap").removeClass("hidden");
		if (Device.isTouch) { 
			window.scrollTo(0,0);
		}
	},

	'click #initialAssessClose': function(evt){
		closeVideo(evt);
		
	},

	'click .initial-assess-video-wrap': function(evt){
		closeVideo(evt);
	},

	'click .initial-assess-video-wrap .videoplayer': function(evt){
		evt.stopPropagation();
	}

});

Template.InitialAssessment.created = function() {
	this.subscribe('userProgress'),
	this.subscribe('studentAssessments')
};

Template.InitialAssessment.rendered = function() {	
	document.title = "English Skills Test - Journey 2 English";
}



Template.AssessComplete.events({ 
	'click *[data-function="exitAssessment"]': function(evt) {
		Router.go($(evt.currentTarget).attr('data-target'));
	}
})

closeVideo = function(evt){
	evt.preventDefault();
	$(".video-wrap").addClass("hidden");
	var video = $("#helpvideo").get(0);
	video.pause();
	video.currentTime = 0;
}