Template.ukQuiz_8.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#ukQuiz_8"); 
	}
}); 

Template.ukQuiz_8.events({

	// Click Audio Button
	'click .buttonaudio': function(evt) {
		$.k2l.ukQuiz_8.sound.src = $(evt.currentTarget).attr('data-audiosrc');
		$.k2l.ukQuiz_8.sound.play();
	},

	'click #ukQuiz_8 .button1': function(evt) {

		// Get value of button and the correct answer for this question
		var buttonValue = $(evt.currentTarget).text();
		var correctAnswer = $.k2l.ukQuiz_8.words[$.k2l.ukQuiz_8.index][1];
		var parentSection = $(evt.currentTarget).parents('section');
		// Disable clicking
		$("#ukQuiz_8 .button1").addClass('noclick');
		$("#ukQuiz_8 .buttonaudio").removeClass('rubberBand');
		$("#ukQuiz_8 .number").removeClass('rubberBand');
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
			// var rightScore = $.k2l.ukQuiz_8.rightscore;
			// var wrongScore = $.k2l.ukQuiz_8.wrongscore;
			// Session.set('ukQuiz_8RightScore', rightScore);
			// Session.set('ukQuiz_8WrongScore', wrongScore);
		}
		else {
			scoreIncorrect++
			Session.set('quiz_Incorrect', scoreIncorrect);
			// var incorrectText = $.k2l.ukQuiz_8.words[$.k2l.ukQuiz_8.index][0] + ' has ' + $.k2l.ukQuiz_8.words[$.k2l.ukQuiz_8.index][1] + ' syllables.';
			// incorrectText = incorrectText.charAt(0).toUpperCase() + incorrectText.slice(1);
			// $('.capwrong').text(incorrectText);
			// $('.capwrong').removeClass("hidden");
			// setTimeout(function(){
			// 	$('.capwrong').addClass("hidden");
			// }, 2000);
		}

		// Autoadvance to next screen
		if ($.k2l.ukQuiz_8.index < $.k2l.ukQuiz_8.words.length - 1) {
			$.k2l.ukQuiz_8.index++;
			setTimeout(function() {
				$(".buttonaudio").attr("data-audiosrc", "/audio/syllables/"+ ($.k2l.ukQuiz_8.words[$.k2l.ukQuiz_8.index][0]) +".m4a");
				$('.incorrectscreen').addClass('hidden');
				$('.correctscreen').addClass('hidden');
				// $('.numberBig').html($.k2l.ukQuiz_8.index+1);
				$("#ukQuiz_8 .button1").removeClass('noclick');

				setTimeout(function() {
					$.k2l.ukQuiz_8.sound.src = $('.buttonaudio').attr('data-audiosrc');
					$.k2l.ukQuiz_8.sound.play();
					$("#ukQuiz_8 .buttonaudio").addClass('rubberBand');
				$("#ukQuiz_8 .number").addClass('rubberBand');
				$("#ukQuiz_8 .number").html($.k2l.ukQuiz_8.index + 1);
				}, 800);
			}, 1000);
		} else {
				
			setTimeout(function () {
				$("#ukQuiz_8").addClass('hidden');
				$.k2l.ukQuiz_8.index = 0;
				$.k2l.ukQuiz_8.sound.src = {};
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
				
		});

	}


}
});

Template.ukQuiz_8.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	}

	if (typeof $.k2l.ukQuiz_8 == 'undefined') {
		$.k2l.ukQuiz_8 = {};
	}

	$.k2l.ukQuiz_8.sound = new Audio();

	var words = [
	// ["bottle", 2],
		// ["offence", 2],
		// ["explosives", 3],
		// ["department", 3],
		// ["indefatigable", 6],
		// ["parliament", 3],
		["reply", 2],
		// ["basketball", 3],
		// ["appreciation", 5],
		// ["economics", 4],
		// ["observatory", 5],
		// ["identical", 4],
		// ["obviously", 4],
		// ["refrigerator", 5],
		// ["incomprehensible", 6],
		// ["prisoner", 3],
		["professional", 2],
		// ["autobiographical", 7],
		// ["electricity", 5],
		// ["humiliation", 5],
		// ["understand", 3],
		// ["totalitarianism", 8],
		["capitalism", 1],
		// ["station", 2],
		// ["international", 5],		
		// ["cannibalism", 5],
		// ["lemonade", 3],
		// ["bureaucratic", 4],
	];

	$.k2l.ukQuiz_8.words = words;
	$.k2l.ukQuiz_8.index = 0;

	// $.k2l.ukQuiz_8.rightscore = 0;
	// $.k2l.ukQuiz_8.wrongscore = 0;

	// Session.set('ukQuiz_8RightScore', 0);
	// Session.set('ukQuiz_8WrongScore', 0);
	// $('#m2a18RightScore').html(Session.get('ukQuiz_8RightScore'));
	// $('#m2a18WrongScore').html(Session.get('ukQuiz_8WrongScore'));

	function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

};