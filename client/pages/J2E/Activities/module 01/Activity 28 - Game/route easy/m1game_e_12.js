Template.m1Game_e_12.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1Game_e_12");
	}
});

Template.m1Game_e_12.events({

	"submit form": function (evt) {

		if (evt.preventDefault) {
			evt.preventDefault();
		}
		var isCorrect = false;

		// Tidy the user input
		var userText = evt.target.userText.value;
		if (userText.charAt(userText.length - 1) == '.') {
			userText = userText.substr(0, userText.length - 1);
		}
		userText = $.trim(userText);
		userText = userText.toLowerCase();

		for (var i = 0; i < $.k2l.m1Game_e_12.correctAnswers[$.k2l.m1Game_e_12.index].length; i++) {
			if (userText == $.k2l.m1Game_e_12.correctAnswers[$.k2l.m1Game_e_12.index][i]) {
				isCorrect = true;
				// $.k2l.m1Game_e_12.correctAnswerIndex = i; // use this if there are multiple possible answers
				break;
			}
		}

		if (isCorrect) {
			//correct
			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
			}, 1000);
			var scoreCorrect = Session.get('Easy_Correct');
			scoreCorrect++
			var parentSection = $(evt.currentTarget).parents('section');
			$.k2l.m1Game_e_12.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			// $(evt.currentTarget).parent().html($.k2l.m1Game_e_12.correctAnswers[$.k2l.m1Game_e_12.index]);
			$(evt.currentTarget).parent().html($.k2l.m1Game_e_12.displayAnswers[$.k2l.m1Game_e_12.index]); // use this if there are multiple possible answers
			$('#entryanswer' + $.k2l.m1Game_e_12.index).addClass('correctword');
			Session.set('Easy_Correct', scoreCorrect);
			if ($.k2l.m1Game_e_12.index < $.k2l.m1Game_e_12.correctAnswers.length - 1) {
				$.k2l.m1Game_e_12.index++;
				$('#entryanswer' + $.k2l.m1Game_e_12.index).removeClass('textentry-disabled');
				$('#entryanswer' + $.k2l.m1Game_e_12.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$(".button1").addClass("hidden");
				$.k2l.m1Game_e_12.index = 0;
				$.k2l.m1Game_e_12.wrongcount = 0;
				setTimeout(function () {
					$('#welldonecap').removeClass('hidden');
				}, 1000);
				setTimeout(function () {
					$('#welldonecap').addClass('hidden');
				}, 2000);
				setTimeout(function () {
					$.k2l.m1Game_e_12.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
				}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			// $.k2l.m1Game_e_12.wrongcount++;
			// if ($.k2l.m1Game_e_12.wrongcount >= 1) {
			// 	$('.stuck').removeClass('hidden');
			// }
			$('.incorrectscreen').removeClass('hidden');
			setTimeout(function () {
				$('.incorrectscreen').addClass('hidden');
			}, 1000);
			evt.target.userText.value = "";
		}
	},

	"click .button1": function (evt) {
		evt.preventDefault();
		$('.incorrectscreen').addClass('hidden');
		var scoreIncorrect = Session.get('Easy_Incorrect');
		scoreIncorrect++
		var parentSection = $(evt.currentTarget).parents('section');
		// $('.stuck').addClass('hidden'); //hide stuck button if visible
		// $.k2l.m1Game_e_12.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m1Game_e_12.index).html($.k2l.m1Game_e_12.correctAnswers[$.k2l.m1Game_e_12.index]);
		$('#entryanswer' + $.k2l.m1Game_e_12.index).html($.k2l.m1Game_e_12.displayAnswers[$.k2l.m1Game_e_12.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer' + $.k2l.m1Game_e_12.index).addClass('correctword');
		Session.set('Easy_Incorrect', scoreIncorrect);
		if ($.k2l.m1Game_e_12.index < $.k2l.m1Game_e_12.correctAnswers.length - 1) {
			$.k2l.m1Game_e_12.index++;
			$('#entryanswer' + $.k2l.m1Game_e_12.index).removeClass('textentry-disabled');
			$('#entryanswer' + $.k2l.m1Game_e_12.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
			$('input[name=userText]').focus();
		} else {
			$(".button1").addClass("hidden");
			$.k2l.m1Game_e_12.index = 0;
			$.k2l.m1Game_e_12.wrongcount = 0;
			setTimeout(function () {
				$.k2l.m1Game_e_12.sound.src = {};
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
			}, 1000);
			//$('.pagination').removeClass('hidden');
		}
	},

	'click .buttonaudio': function (evt) {
		$.k2l.m1Game_e_12.sound.src = $(evt.currentTarget).attr('data-audiosrc');
		addSpinner($.k2l.m1Game_e_12.sound, $(evt.currentTarget));
		$.k2l.m1Game_e_12.sound.play();
	},

	"click .pagination": function (evt) {
		$.k2l.m1Game_e_12.sound.src = {};
		$.k2l.m1Game_e_12.index = 0;
		$.k2l.m1Game_e_12.wrongcount = 0;
	}

});

Template.m1Game_e_12.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1Game_e_12 == 'undefined') {
		$.k2l.m1Game_e_12 = {};
	};

	$.k2l.m1Game_e_12.index = 0;
	$.k2l.m1Game_e_12.wrongcount = 0;
	$.k2l.m1Game_e_12.sound = new Audio();
	// $.k2l.m1Game_e_12.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
		["over"], // Possible answers for Q1.
		["of"],   // Possible answers for Q2.
		["from"], // etc.
		["there"],
		["about"],
		["in"],
		["of"],
		["in"],
		["from"],
		["over"],
	];

	var displayAnswers = [
		["over"], // Possible answers for Q1.
		["of"],   // Possible answers for Q2.
		["from"], // etc.
		["There"],
		["about"],
		["in"],
		["of"],
		["in"],
		["from"],
		["over"],
	];

	$.k2l.m1Game_e_12.displayAnswers = displayAnswers;
	$.k2l.m1Game_e_12.correctAnswers = correctAnswers;

}