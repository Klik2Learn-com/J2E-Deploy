Template.ukQuiz_7.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#ukQuiz_7"); 
	}
}); 

Template.ukQuiz_7.events({

	// Click Audio Button
	'click .buttonaudio': function(evt) {
		$.k2l.ukQuiz_7.sound.src = $(evt.currentTarget).attr('data-audiosrc');
		$.k2l.ukQuiz_7.sound.play();
	},

	'click #ukQuiz_7 .button1': function(evt) {

		// Get value of button and the correct answer for this question
		var buttonValue = $(evt.currentTarget).text();
		var correctAnswer = $.k2l.ukQuiz_7.words[$.k2l.ukQuiz_7.index][1];
		var parentSection = $(evt.currentTarget).parents('section');
		
		// Disable clicking
		$("#ukQuiz_7 .button1").addClass('noclick');
		$("#ukQuiz_7 .buttonaudio").removeClass('rubberBand');
		$("#ukQuiz_7 .number").removeClass('rubberBand');
		var scoreCorrect = Session.get('quiz_Correct');
		var scoreIncorrect = Session.get('quiz_Incorrect');

		// Check for correct answer
		if(buttonValue == correctAnswer) {
			// $('.correctscreen').removeClass('hidden');
			// setTimeout(function(){
			// 	$('.correctscreen').addClass("hidden");
			// }, 1000);

			scoreCorrect++
			Session.set('quiz_Correct', scoreCorrect);
			// var rightScore = $.k2l.ukQuiz_7.rightscore;
			// var wrongScore = $.k2l.ukQuiz_7.wrongscore;
			// Session.set('ukQuiz_7RightScore', rightScore);
			// Session.set('ukQuiz_7WrongScore', wrongScore);
		}
		else {
			scoreIncorrect++
			Session.set('quiz_Incorrect', scoreIncorrect);
			// var incorrectText = $.k2l.ukQuiz_7.words[$.k2l.ukQuiz_7.index][0] + ' has ' + $.k2l.ukQuiz_7.words[$.k2l.ukQuiz_7.index][1] + ' syllables.';
			// incorrectText = incorrectText.charAt(0).toUpperCase() + incorrectText.slice(1);
			// $('.capwrong').text(incorrectText);
			// $('.capwrong').removeClass("hidden");
			// setTimeout(function(){
			// 	$('.capwrong').addClass("hidden");
			// }, 2000);
		}

		// Autoadvance to next screen
		if ($.k2l.ukQuiz_7.index < $.k2l.ukQuiz_7.words.length - 1) {
			$.k2l.ukQuiz_7.index++;
			setTimeout(function() {
				$(".buttonaudio").attr("data-audiosrc", "/audio/syllables/"+ ($.k2l.ukQuiz_7.words[$.k2l.ukQuiz_7.index][0]) +".m4a");
				$('.incorrectscreen').addClass('hidden');
				$('.correctscreen').addClass('hidden');
				// $('.numberBig').html($.k2l.ukQuiz_7.index+1);
				$("#ukQuiz_7 .button1").removeClass('noclick');

				setTimeout(function() {
					$.k2l.ukQuiz_7.sound.src = $('.buttonaudio').attr('data-audiosrc');
					$.k2l.ukQuiz_7.sound.play();
					$("#ukQuiz_7 .buttonaudio").addClass('rubberBand');
				$("#ukQuiz_7 .number").addClass('rubberBand');
				$("#ukQuiz_7 .number").html($.k2l.ukQuiz_7.index + 1);
				}, 800);
			}, 1000);
		} else {
				
			setTimeout(function () {
				$("#ukQuiz_7").addClass('hidden');
				$.k2l.ukQuiz_7.index = 0;
				$.k2l.ukQuiz_7.sound.src = {};
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
				
		});

	}


}
});

Template.ukQuiz_7.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	}

	if (typeof $.k2l.ukQuiz_7 == 'undefined') {
		$.k2l.ukQuiz_7 = {};
	}

	$.k2l.ukQuiz_7.sound = new Audio();

	var words = [
	["bottle", 2],
		// ["offence", 2],
		// ["explosives", 3],
		// ["department", 3],
		// ["indefatigable", 6],
		// ["parliament", 3],
		// ["reply", 2],
		["basketball", 3],
		// ["appreciation", 5],
		// ["economics", 4],
		// ["observatory", 5],
		// ["identical", 4],
		// ["obviously", 4],
		// ["refrigerator", 5],
		["incomprehensible", 6],
		// ["prisoner", 3],
		// ["professional", 4],
		// ["autobiographical", 7],
		// ["electricity", 5],
		// ["humiliation", 5],
		// ["understand", 3],
		// ["totalitarianism", 8],
		// ["capitalism", 5],
		// ["station", 2],
		// ["international", 5],		
		// ["cannibalism", 5],
		// ["lemonade", 3],
		// ["bureaucratic", 4],
	];

	$.k2l.ukQuiz_7.words = words;
	$.k2l.ukQuiz_7.index = 0;

	// $.k2l.ukQuiz_7.rightscore = 0;
	// $.k2l.ukQuiz_7.wrongscore = 0;

	// Session.set('ukQuiz_7RightScore', 0);
	// Session.set('ukQuiz_7WrongScore', 0);
	// $('#m2a18RightScore').html(Session.get('ukQuiz_7RightScore'));
	// $('#m2a18WrongScore').html(Session.get('ukQuiz_7WrongScore'));

	function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

};