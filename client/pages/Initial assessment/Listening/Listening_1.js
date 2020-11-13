Template.InitialListening_1.helpers({

	activeSection: function() {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#InitialListening_1");
	},

	remainingPlays: function() {
		return Template.instance().remainingPlays.get();
	},

	isComplete: function() {
		var doc = studentAssessments.findOne({ _id : Router.current().params.assessmentid });
		var section = {};
		for (var i = 0; i < doc.sections.length; i++) {
			if (doc.sections[i].name == "Listening") {
				section = doc.sections[i];
			}
		}
		return (section.completeDate != null)
	}

});

Template.InitialListening_1.events({

	'click *[data-function="playAudio"]': function(evt) {
		if (Template.instance().remainingPlays.get() > 0) {
			Template.instance().audio.play();
			Template.instance().remainingPlays.set(Template.instance().remainingPlays.get() - 1);
		}
	},

	'click #assess-finish': function(evt) {
		evt.preventDefault();
		$(".finish").removeClass('hidden');
		$(".finish").addClass('fadeIn');
	}

});

Template.finishBtnListening.events({
	"click .finishYesButton": function(evt){
		evt.preventDefault()
		Session.set('dirty', false);
		var userAnswers = [];
		var tempAnswers = [];

		// Each Checkbox..
		$('input').each(function() {
			if ($(this).attr('type') == 'checkbox') {
				if ($(this).is(':checked')) {
					if (tempAnswers[$(this).attr('name')] == undefined) {
						tempAnswers[$(this).attr('name')] = [];
					}
					tempAnswers[$(this).attr('name')].push($(this).val());			
				} else {
					if (tempAnswers[$(this).attr('name')] == undefined) {
						tempAnswers[$(this).attr('name')] = [];
					}
					tempAnswers[$(this).attr('name')].push();	
				}
			} else if ($(this).attr('type') == 'radio') {
				if ($(this).is(':checked')) {
					if (tempAnswers[$(this).attr('name')] == undefined) {
						tempAnswers[$(this).attr('name')] = [];
					}
					tempAnswers[$(this).attr('name')].push($(this).val());
				} else {
					if (tempAnswers[$(this).attr('name')] == undefined) {
						tempAnswers[$(this).attr('name')] = [];
					}
					tempAnswers[$(this).attr('name')].push();
				}
			}
		})

		for (key in tempAnswers) {
			var q =  $('*[data-questionFor="' + key + '"]').html();
			userAnswers.push({
				"question" : q,
				"answerNumber" : key,
				"answerValue" : tempAnswers[key] 
			})

		}	

		var assessmentId = Router.current().params.assessmentid;
		// Meteor.call('setScoredSectionComplete', assessmentId, "Listening", userAnswers,0, function() {
		// 	Session.set("activeSection", "#InitialAssessment");
		// 	Router.go('/assessment/' + assessmentId);			
		// });

	},

	"click .finishNoButton": function(evt){
		$(".finish").addClass("hidden");
	}
});

Template.InitialListening_1.created = function() {
	this.subscribe('studentAssessments');
	Template.instance().remainingPlays = new ReactiveVar();
	var doc = studentAssessments.findOne({ _id : Router.current().params.assessmentid });
	for (var i = 0; i < doc.sections.length; i++) {
		if (doc.sections[i].name == "Listening") {
			Template.instance().remainingPlays.set(doc.sections[i].playsAllowed);
		}
	}

	Template.instance().audio = new Audio();
	Template.instance().audio.src = "/audio/initial/listening-test-audio.m4a";
};

Template.InitialListening_1.destroyed = function() {
	Template.instance().audio.pause();
	Template.instance().audio = {};
}