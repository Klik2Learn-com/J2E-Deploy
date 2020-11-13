Template.InitialReading_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#InitialReading_1");
	},

	isComplete: function() {
		var doc = studentAssessments.findOne({ _id : Router.current().params.assessmentid });
		var section = {};
		for (var i = 0; i < doc.sections.length; i++) {
			if (doc.sections[i].name == "Reading") {
				section = doc.sections[i];
			}
		}
		return (section.completeDate != null)
	}

});

Template.InitialReading_1.events({
	'keypress .textentry input': function (evt) {
		if (evt.which === 13){
			evt.preventDefault();
		}

	},

	'click #assess-finish': function(evt) {
		$(".finish").removeClass('hidden');
		$(".finish").addClass('fadeIn');
	}
});


// Template.finishBtnReading.events({
// 	"click .finishYesButton": function(evt){
// 		Session.set('dirty', false);
// 		var answers = [];
// 		var answerCollector = [];
		
// 		$('*[data-function="answerBox"]').each(function() {
// 			var userAnswers = $(this).val();
// 			if (answers[$(this).attr('id')] == undefined) {
// 				answers[$(this).attr('id')] = [];
// 			}
// 			answers.push({
// 				"question" : $('*[data-questionFor="' +  $(this).attr('id') + '"]').html(),
// 				"answerNumber" : $(this).attr('id'),
// 				"answerValue" : userAnswers
// 			})
// 		});

// 		var assessmentId = Router.current().params.assessmentid;
// 		// Meteor.call('setScoredSectionComplete', assessmentId, "Reading", answers,0, function() {
// 		// 	Session.set("activeSection", "#InitialAssessment");
// 		// 	Router.go('/assessment/' + assessmentId);
// 		// });	
// 	},

// 	"click .finishNoButton": function(evt){
// 		$(".finish").addClass("hidden");
// 	}
// });