Template.ukQuiz_14.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#ukQuiz_14");
	}
})


Template.ukQuiz_14.events({
	"click .button2": function(evt){
		
		if ($.k2l.ukQuiz_14.allowClick == true) {
			var scoreCorrect = Session.get('quiz_Correct');
			var scoreIncorrect = Session.get('quiz_Incorrect');
			var parentSection = $(evt.currentTarget).parents('section');
			$.k2l.ukQuiz_14.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.ukQuiz_14.answer_index[$.k2l.ukQuiz_14.index]) {
				// Correct
				scoreCorrect++
			Session.set('quiz_Correct', scoreCorrect);
				
				if ($.k2l.ukQuiz_14.index < $.k2l.ukQuiz_14.question.length-1) {
					$.k2l.ukQuiz_14.index++;
					setTimeout(function() {
						// $('.buttonaudio').attr("data-audiosrc",$.k2l.ukQuiz_14.questionsaudio[$.k2l.ukQuiz_14.index]);
						// $('.incorrectscreen').addClass('hidden');
						// $('.correctscreen').addClass('hidden');
						// $('.number').html($.k2l.ukQuiz_14.index+1);
						$('.question_text').html($.k2l.ukQuiz_14.question[$.k2l.ukQuiz_14.index]);
						$.k2l.ukQuiz_14.allowClick = true; // Make the buttons clickable again
						// setTimeout(function() {
						// 	$.k2l.ukQuiz_14.sound.src = $('.buttonaudio').attr("data-audiosrc");
						// 	$.k2l.ukQuiz_14.sound.play();
						// }, 800);
					}, 1000);
				} else {
					// setTimeout (function() {
					// 	$('#welldonecap').removeClass('hidden');
					// }, 1000);
					
					setTimeout(function() {
						// $('#welldonecap').addClass('hidden');
						// $("#ukQuiz_14").addClass('hidden');
						
						$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					
					}, 2000);
					
					// $('.pagination').removeClass('hidden');
				}
			} else {
				// $.k2l.ukQuiz_14.wrongscore++;
				// incorrect
			// 	var rightScore = $.k2l.ukQuiz_14.rightscore;
			// var wrongScore = $.k2l.ukQuiz_14.wrongscore;
			
			// Session.set('ukQuiz_14RightScore', rightScore);
			// Session.set('ukQuiz_14WrongScore', wrongScore);
			// 	$('.incorrectscreen').removeClass('hidden');
			// 	setTimeout( function() {
			// 		$('.incorrectscreen').addClass('hidden');
			// 	}, 1000);
				scoreIncorrect++
			Session.set('quiz_Incorrect', scoreIncorrect);
				
				if ($.k2l.ukQuiz_14.index < $.k2l.ukQuiz_14.question.length-1) {
					$.k2l.ukQuiz_14.index++;
					setTimeout(function() {
						// $('.buttonaudio').attr("data-audiosrc",$.k2l.ukQuiz_14.questionsaudio[$.k2l.ukQuiz_14.index]);
						// $('.incorrectscreen').addClass('hidden');
						// $('.correctscreen').addClass('hidden');
						// $('.number').html($.k2l.ukQuiz_14.index+1);
						$('.question_text').html($.k2l.ukQuiz_14.question[$.k2l.ukQuiz_14.index]);
						$.k2l.ukQuiz_14.allowClick = true; // Make the buttons clickable again
						// setTimeout(function() {
						// 	$.k2l.ukQuiz_14.sound.src = $('.buttonaudio').attr('data-audiosrc');
						// 	$.k2l.ukQuiz_14.sound.play();
						// }, 800);
					}, 1000);
				} else {
					// $.k2l.ukQuiz_14.sound.src = {};
					// setTimeout (function() {
					// 	$('#welldonecap').removeClass('hidden');
					// }, 1000);
					
					setTimeout(function() {
						// $('#welldonecap').addClass('hidden');
						// $("#ukQuiz_14").addClass('hidden');
						
						$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					
					}, 2000);
			}
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.ukQuiz_14.sound.src = {};
		$.k2l.ukQuiz_14.index = 0;
		$.k2l.ukQuiz_14.allowClick = true;
	}

});

Template.ukQuiz_14.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.ukQuiz_14 == 'undefined') {
		$.k2l.ukQuiz_14 = {};
	};
	
	// $.k2l.ukQuiz_14.sound = new Audio();
	
	var questions = ["The worlds largest seed bank is the Eden Project in Cornwall."];
	
	
	// var questionsaudio = ["/audio/module2/a1/Statement1.m4a",
	// 				"/audio/module2/a1/Statement2.m4a",
	// 				"/audio/module2/a1/Statement3.m4a", 
	// 				"/audio/module2/a1/Statement4.m4a",
	// 				"/audio/module2/a1/Statement5.m4a",
	// 				"/audio/module2/a1/Statement6.m4a",
	// 				"/audio/module2/a1/Statement7.m4a",
	// 				"/audio/module2/a1/Statement8.m4a",
	// 				"/audio/module2/a1/Statement9.m4a",
	// 				"/audio/module2/a1/Statement10.m4a",
	// 				"/audio/module2/a1/Statement11.m4a",
	// 				"/audio/module2/a1/Statement12.m4a",
	// 				"/audio/module2/a1/Statement13.m4a",
	// 				"/audio/module2/a1/Statement14.m4a",
	// 				"/audio/module2/a1/Statement15.m4a",
	// 				"/audio/module2/a1/Statement16.m4a"					
	// 				];
					
	var answer_index = ["false"];
	
	$.k2l.ukQuiz_14.question = questions;
	// $.k2l.ukQuiz_14.questionsaudio = questionsaudio;
	$.k2l.ukQuiz_14.answer_index = answer_index;
	$.k2l.ukQuiz_14.index = 0;
	// $.k2l.ukQuiz_14.rightscore = 0;
	// $.k2l.ukQuiz_14.wrongscore = 0;
	
	// Session.set('ukQuiz_14RightScore', 0);
	// Session.set('ukQuiz_14WrongScore', 0);

	$.k2l.ukQuiz_14.allowClick = true;
}