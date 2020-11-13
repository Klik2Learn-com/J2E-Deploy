Template.InitialListening.helpers({ 

	'assessmentStarted': function() {
		var assessmentId = Router.current().params.assessmentid;
		var assessment = studentAssessments.findOne({ _id : assessmentId })
		for (var i = 0; i < assessment.sections.length; i++) {
			if (assessment.sections[i].name == "Listening") {
				if (assessment.sections[i].startDate == null) {
					return false;
				} else {
					return true;
				}
			}
		}
	},

	'sectionComplete': function() {
		var assessmentId = Router.current().params.assessmentid;
		var assessment = studentAssessments.findOne({ _id : assessmentId })
		for (var i = 0; i < assessment.sections.length; i++) {
			if (assessment.sections[i].name == "Listening") {
				if (assessment.sections[i].completeDate == null) {
					return false;
				} else {
					return true;
				}
			}
		}		
	},

	'activeSection': function() {
		if(!Session.get("activeSection")){
			return null;
		}
		var activeSection = Session.get("activeSection");
		return activeSection.length <= 4 ? activeSection.substring(1,4) : activeSection;
	},

	'currLevel': function(){
		return Session.get("currLevel");
	}

});

Template.InitialListening.events({
	
	'click .assess-begin': function(evt, template) {
		Session.set("activeSection", "#A2l");
		Session.set('dirty', true);
		var assessmentId = Router.current().params.assessmentid;
		Meteor.call('setAssessmentStart', assessmentId, "Listening");
		template.subscribe('connectionCheck', Meteor.userId(), assessmentId, "Listening");
		window.addEventListener("beforeunload", beforeUnloadConfirm);
	},

	'click *[data-function="return"]': function(evt) {
		var id = Router.current().params.assessmentid;
		Router.go('/assessment/' + id);
	}
});

Template.InitialListening.created = function() {
	Template.instance().assessmentId = Router.current().params.assessmentid;
}

Template.InitialListening.destroyed = function() {
	var assessmentId = Template.instance().assessmentId;
	Meteor.call('handleAssessmentDisconnect', Meteor.userId(), assessmentId, "Speaking");
	window.removeEventListener("beforeunload", beforeUnloadConfirm);	
	Session.set('dirty', false);
}