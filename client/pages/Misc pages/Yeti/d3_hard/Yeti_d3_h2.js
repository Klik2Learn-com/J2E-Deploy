Template.Yeti_d3_h2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#Yeti_d3_h2");
	}
});

Template.Yeti_d3_h2.events({
	
	"click li": function(evt){
		if ($.k2l.Yeti_d3_h2.allowClick) {
			$.k2l.Yeti_d3_h2.allowClick = false;
			var clickedAnswer = $(evt.currentTarget).attr('id');
			
			if (clickedAnswer == $.k2l.Yeti_d3_h2.correctAnswer[$.k2l.Yeti_d3_h2.index]){
				$('#'+clickedAnswer).children('.correct').removeClass('hidden');
				
				var score = Session.get('yetiScore');
				score += 2;
				Session.set('yetiScore', score);
				$.k2l.Yeti_d3_h2.correctCount++;
				
			} else {
				$('#'+clickedAnswer).children('.incorrect').removeClass('hidden');
			}

			$.k2l.Yeti_d3_h2.index++; // increment the index

			if ($.k2l.Yeti_d3_h2.index < $.k2l.Yeti_d3_h2.questions.length) {
				setTimeout(function() {
					$('#qu1').html($.k2l.Yeti_d3_h2.questions[0][$.k2l.Yeti_d3_h2.index]);
					$('#qu2').html($.k2l.Yeti_d3_h2.questions[1][$.k2l.Yeti_d3_h2.index]);
					$('#qu3').html($.k2l.Yeti_d3_h2.questions[2][$.k2l.Yeti_d3_h2.index]);
					$('.correct').addClass('hidden');
					$('.incorrect').addClass('hidden');
					$.k2l.Yeti_d3_h2.allowClick = true;
				}, 1500)
			} else {
				if ($.k2l.Yeti_d3_h2.correctCount == 3) {
					Session.set('d3_h2_result', 'correct');					
				} else {
					Session.set('d3_h2_result', 'incorrect');	
				}
				setTimeout(function() {
					var parentSection = $(evt.currentTarget).parents('section');
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));

					// Reset the activity..
					$.k2l.Yeti_d3_h2.index = 0;
					$.k2l.Yeti_d3_h2.allowClick = true;
					$.k2l.Yeti_d3_h2.correctCount = 0;
				}, 1500);
			}
		}
	}
});

Template.Yeti_d3_h2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.Yeti_d3_h2 == 'undefined') {
		$.k2l.Yeti_d3_h2 = {};
	};
	var questions = [
			["No-one isn’t sure which way to go.", "It’s been snowing since the night.", "I’ve no longer seen such enormous blocks of ice before."], 
			["There is no such thing that we cannot do it.", "We can’t any more see our footprints in the snow.", "One of these could crush a man."],
			["We must hurry as the wind is getting stronger and stronger.", "We’re glad we’ve got a local guide with us.", "We need to contact base camp for advices."]
		];
	
	var correctAnswer = ["answer3", "answer3", "answer2"];
	
	$.k2l.Yeti_d3_h2.correctAnswer = correctAnswer;
	$.k2l.Yeti_d3_h2.questions = questions;
	$.k2l.Yeti_d3_h2.index = 0;
	$.k2l.Yeti_d3_h2.allowClick = true;
	$.k2l.Yeti_d3_h2.correctCount = 0;
};