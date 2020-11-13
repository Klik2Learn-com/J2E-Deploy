Template.Yeti_d1_e3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#Yeti_d1_e3");
	}
});

Template.Yeti_d1_e3.events({
	
	"click li": function(evt){
		if ($.k2l.Yeti_d1_e3.allowClick) {
			$.k2l.Yeti_d1_e3.allowClick = false;
			var clickedAnswer = $(evt.currentTarget).attr('id');
			if (clickedAnswer == $.k2l.Yeti_d1_e3.correctAnswer[$.k2l.Yeti_d1_e3.index]){
				$('#'+clickedAnswer).children('.correct').removeClass('hidden');
				
				var score = Session.get('yetiScore');
				score += 1;
				Session.set('yetiScore', score);
				$.k2l.Yeti_d1_e3.correctCount++;
			
			} else {
				$('#'+clickedAnswer).children('.incorrect').removeClass('hidden');
			}

			$.k2l.Yeti_d1_e3.index++; // increment the index

			if ($.k2l.Yeti_d1_e3.index < $.k2l.Yeti_d1_e3.questions.length) {
				setTimeout(function() {
					$('#qu1').html($.k2l.Yeti_d1_e3.questions[0][$.k2l.Yeti_d1_e3.index]);
					$('#qu2').html($.k2l.Yeti_d1_e3.questions[1][$.k2l.Yeti_d1_e3.index]);
					$('#qu3').html($.k2l.Yeti_d1_e3.questions[2][$.k2l.Yeti_d1_e3.index]);
					$('.correct').addClass('hidden');
					$('.incorrect').addClass('hidden');
					$.k2l.Yeti_d1_e3.allowClick = true;
				}, 1500)
			} else {
				if ($.k2l.Yeti_d1_e3.correctCount == 3) {
					Session.set('d1_e3_result', 'correct');					
				} else {
					Session.set('d1_e3_result', 'incorrect');	
				}
				setTimeout(function() {
					var parentSection = $(evt.currentTarget).parents('section');
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));

					// Reset the activity..
					$.k2l.Yeti_d1_e3.index = 0;
					$.k2l.Yeti_d1_e3.allowClick = true;
					$.k2l.Yeti_d1_e3.correctCount = 0;
				}, 1500);
			}
		}
	}
});

Template.Yeti_d1_e3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.Yeti_d1_e3 == 'undefined') {
		$.k2l.Yeti_d1_e3 = {};
	};
	var questions = [
			["The leader of our expedition is coming from America.", "I’ve red lots of articles about yeti sightings.", "There not easy to find."], 
			["Our expedition leader is from American.", "Have you read any?", "They’re walk like a man."],
			["The leader of our expedition comes from America.", "Our tents are read.", "There are photographs of their footprints."]
		];
	
	var correctAnswer = ["answer3", "answer2", "answer3"];
	
	$.k2l.Yeti_d1_e3.correctAnswer = correctAnswer;
	$.k2l.Yeti_d1_e3.questions = questions;
	$.k2l.Yeti_d1_e3.index = 0;
	$.k2l.Yeti_d1_e3.allowClick = true;
	$.k2l.Yeti_d1_e3.correctCount = 0;
};