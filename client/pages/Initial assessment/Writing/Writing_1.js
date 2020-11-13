Template.InitialWriting_1.helpers({

	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#InitialWriting_1");
	},

	// wordCountStyle: function() {
		// if (Template.instance().wordCount.get().words > 125) {
			// return 'color:red;'
		// }
	// },

	wordCountValue: function() {
		return (Template.instance().wordCount.get().words);	
	},

	// isComplete: function() {
	// 	var doc = studentAssessments.findOne({ _id : Router.current().params.assessmentid });
	// 	var section = {};
	// 	for (var i = 0; i < doc.sections.length; i++) {
	// 		if (doc.sections[i].name == "Writing") {
	// 			section = doc.sections[i];
	// 		}
	// 	}
	// 	return (section.completeDate != null)
	// }

});

Template.InitialWriting_1.events({

	'keyup': function(evt) {
		Template.instance().wordCount.set(wordCountParser($('#answerBox').val()));
	},

	'click #answerBox': function(evt) {
		Template.instance().wordCount.set(wordCountParser($('#answerBox').val()));
	},

	'click .select-question': function(evt){
		evt.preventDefault();

		var qnum = $(evt.currentTarget).data("qnum");
		if(confirm("Are you sure you want to select question number " + qnum + "? Once selected, you cannot change it.") === true){
			$(".qnum-1, .qnum-2, .qnum-3, .qnum-4").addClass("hidden");
			$(".qnum-" + qnum).removeClass("hidden");
			$(".writing-text-area").removeClass("hidden");
			$(".qnum-" + qnum).append($(".writing-text-area"));
			$(".select-button").addClass("hidden");
			$(".writing-title").addClass("hidden");
			Session.set("writing-qnum", qnum);
		}
		
	},

	'click #assess_finish': function(evt) {
		$(".finish").removeClass('hidden');
		$(".finish").addClass('fadeIn');
	}
	
});


Template.InitialWriting_1.created = function() {
	Template.instance().wordCount = new ReactiveVar({words : 0});
}

function wordCountParser( val ){
    var wom = val.match(/\S+/g);
    return {
        charactersNoSpaces : val.replace(/\s+/g, '').length,
        characters         : val.length,
        words              : wom ? wom.length : 0,
        lines              : val.split(/\r*\n/).length
    };
}