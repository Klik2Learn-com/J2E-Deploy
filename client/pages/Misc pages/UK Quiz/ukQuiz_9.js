Template.ukQuiz_9.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#ukQuiz_9");
	}
});

Template.ukQuiz_9.events({
	"click .button2": function(evt){
		var scoreCorrect = Session.get('quiz_Correct');
			var scoreIncorrect = Session.get('quiz_Incorrect');
		if ($.k2l.ukQuiz_9.allowClick == true) {
			var parentSection = $(evt.currentTarget).parents('section');
			$.k2l.ukQuiz_9.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.ukQuiz_9.answer_index[$.k2l.ukQuiz_9.index]) {
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				scoreCorrect++
				Session.set('quiz_Correct', scoreCorrect);

				if ($.k2l.ukQuiz_9.index < $.k2l.ukQuiz_9.questions.length-1) {
					$.k2l.ukQuiz_9.index++;
					setTimeout(function() {
						$('.buttonaudio').attr("data-audiosrc",$.k2l.ukQuiz_9.questionsaudio[$.k2l.ukQuiz_9.index]);
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						//$('.number').html($.k2l.ukQuiz_9.index+1);
						$('#question_text').html($.k2l.ukQuiz_9.questions[$.k2l.ukQuiz_9.index]);
						$.k2l.ukQuiz_9.allowClick = true; // Make the buttons clickable again
						setTimeout(function() {
							$.k2l.ukQuiz_9.sound.src = $('.buttonaudio').attr("data-audiosrc");
							$.k2l.ukQuiz_9.sound.play();
						}, 800);
					}, 1000);
				} else {
					// setTimeout (function() {
					// 	$('#welldonecap').removeClass('hidden');
					// }, 1000);

					setTimeout(function() {
						$.k2l.ukQuiz_9.index = 0;
						
						$.k2l.ukQuiz_9.allowClick = true;

						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
						
					}, 2000);

					// $('.pagination').removeClass('hidden');
				}
			} else {
				scoreIncorrect++
			Session.set('quiz_Incorrect', scoreIncorrect);
				// $('.incorrectscreen').removeClass('hidden');
				// setTimeout( function() {
				// 	$('.incorrectscreen').addClass('hidden');
				// }, 1000);


				if ($.k2l.ukQuiz_9.index < $.k2l.ukQuiz_9.questions.length-1) {
					$.k2l.ukQuiz_9.index++;
					setTimeout(function() {
						$('.buttonaudio').attr("data-audiosrc",$.k2l.ukQuiz_9.questionsaudio[$.k2l.ukQuiz_9.index]);
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						//$('.number').html($.k2l.ukQuiz_9.index+1);
						$('#question_text').html($.k2l.ukQuiz_9.questions[$.k2l.ukQuiz_9.index]);
						$.k2l.ukQuiz_9.allowClick = true; // Make the buttons clickable again
						setTimeout(function() {
							$.k2l.ukQuiz_9.sound.src = $('.buttonaudio').attr('data-audiosrc');
							$.k2l.ukQuiz_9.sound.play();
						}, 800);
					}, 1000);
				} else {
					$.k2l.ukQuiz_9.index = 0;
					$.k2l.ukQuiz_9.sound.src = {};
					// setTimeout (function() {
					// 	$('#welldonecap').removeClass('hidden');
					// }, 1000);

					setTimeout(function() {
						// $('#welldonecap').addClass('hidden');
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
						
					}, 2000);
			}
		}
		}

	},

	'click .buttonaudio': function(evt) {
		$.k2l.ukQuiz_9.sound.src = $(evt.currentTarget).attr('data-audiosrc');
		$.k2l.ukQuiz_9.sound.play();
	},

	'click .pagination': function(evt) {
		$.k2l.ukQuiz_9.sound.src = {};
		$.k2l.ukQuiz_9.index = 0;
		$.k2l.ukQuiz_9.allowClick = true;
	}

});

Template.ukQuiz_9.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.ukQuiz_9 == 'undefined') {
		$.k2l.ukQuiz_9 = {};
	};

	$.k2l.ukQuiz_9.sound = new Audio();

	var questions = ["Sentence 1a",
					 "Sentence 1b",
					 // "Sentence 2a",
					 // "Sentence 2b",
					 // "Sentence 3a",
					 // "Sentence 3b",
					 // "Sentence 4a",
					 // "Sentence 4b",
					 // "Sentence 5",
					 // "Sentence 6a",
					 // "Sentence 6b",
					 // "Sentence 7a",
					 // "Sentence 7b",
					 "Sentence 2a",
					 "Sentence 2b"];


	var questionsaudio = ["/audio/module6/a15/1a.m4a",
					"/audio/module6/a15/1b.m4a",
					// "/audio/module6/a15/2a.m4a",
					// "/audio/module6/a15/2b.m4a",
					// "/audio/module6/a15/3a.m4a",
					// "/audio/module6/a15/3b.m4a",
					// "/audio/module6/a15/4a.m4a",
					// "/audio/module6/a15/4b.m4a",
					// "/audio/module6/a15/5.m4a",
					// "/audio/module6/a15/6a.m4a",
					// "/audio/module6/a15/6b.m4a",
					// "/audio/module6/a15/7a.m4a",
					// "/audio/module6/a15/7b.m4a",
					"/audio/module6/a15/8a.m4a",
					"/audio/module6/a15/8b.m4a"
					];

	var answer_index = ["no", "yes","yes","no"];

	$.k2l.ukQuiz_9.questions = questions;
	$.k2l.ukQuiz_9.questionsaudio = questionsaudio;
	$.k2l.ukQuiz_9.answer_index = answer_index;
	$.k2l.ukQuiz_9.index = 0;
	$.k2l.ukQuiz_9.rightscore = 0;
	$.k2l.ukQuiz_9.wrongscore = 0;

	$.k2l.ukQuiz_9.allowClick = true;
}