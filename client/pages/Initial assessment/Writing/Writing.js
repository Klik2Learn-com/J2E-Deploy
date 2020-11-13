Template.InitialWriting.helpers({

	'assessmentStarted': function() {
		var assessmentId = Router.current().params.assessmentid;
		var assessment = studentAssessments.findOne({ _id : assessmentId })
		for (var i = 0; i < assessment.sections.length; i++) {
			if (assessment.sections[i].name == "Writing") {
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
			if (assessment.sections[i].name == "Writing") {
				if (assessment.sections[i].completeDate == null) {
					return false;
				} else {
					return true;
				}
			}
		}		
	}

});

Template.InitialWriting.events({
	
	'click .assess-begin': function(evt, template) {
		Session.set("activeSection", "#InitialWriting_1");
		Session.set('dirty', true);
		var assessmentId = Router.current().params.assessmentid;
		Meteor.call('setAssessmentStart', assessmentId, "Writing");
		template.subscribe('connectionCheck', Meteor.userId(), assessmentId, "Writing");
		window.addEventListener("beforeunload", beforeUnloadConfirm);
	},

	'click *[data-function="return"]': function(evt) {
		var id = Router.current().params.assessmentid;
		Router.go('/assessment/' + id);
	}

});

Template.InitialWriting.created = function() {
	Template.instance().assessmentId = Router.current().params.assessmentid;
}

Template.InitialWriting.destroyed = function() {
	var assessmentId = Template.instance().assessmentId;
	Meteor.call('handleAssessmentDisconnect', Meteor.userId(), assessmentId, "Writing");
	window.removeEventListener("beforeunload", beforeUnloadConfirm);

	Session.set('dirty', false);
}