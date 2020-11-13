Template.m1Game_h_23.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1Game_h_23");
	}
});

Template.m1Game_h_23.events({

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

		for (var i = 0; i < $.k2l.m1Game_h_23.correctAnswers[$.k2l.m1Game_h_23.index].length; i++) {
			if (userText == $.k2l.m1Game_h_23.correctAnswers[$.k2l.m1Game_h_23.index][i]) {
				isCorrect = true;
				$.k2l.m1Game_h_23.correctAnswerIndex = i; // use this if there are multiple possible answers
				break;
			}
		}

		if (isCorrect) {
			//correct
			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
			}, 1000);
			var parentSection = $(evt.currentTarget).parents('section');
			$.k2l.m1Game_h_23.wrongcount = 0;
			var scoreCorrect = Session.get('Hard_Correct');
			scoreCorrect++
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			// $(evt.currentTarget).parent().html($.k2l.m1Game_h_23.correctAnswers[$.k2l.m1Game_h_23.index]);
			$(evt.currentTarget).parent().html($.k2l.m1Game_h_23.displayAnswers[$.k2l.m1Game_h_23.index]); // use this if there are multiple possible answers
			$('#entryanswer' + $.k2l.m1Game_h_23.index).addClass('correctword');
			Session.set('Hard_Correct', scoreCorrect);
			if ($.k2l.m1Game_h_23.index < $.k2l.m1Game_h_23.correctAnswers.length - 1) {
				$.k2l.m1Game_h_23.index++;
				$('#entryanswer' + $.k2l.m1Game_h_23.index).removeClass('textentry-disabled');
				$('#entryanswer' + $.k2l.m1Game_h_23.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$(".button1").addClass("hidden");
				$.k2l.m1Game_h_23.index = 0;
				$.k2l.m1Game_h_23.wrongcount = 0;
				setTimeout(function () {
					$('#welldonecap').removeClass('hidden');
				}, 1000);
				setTimeout(function () {
					$('#welldonecap').addClass('hidden');
				}, 2000);
				setTimeout(function () {
					$.k2l.m1Game_h_23.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
				}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			// $.k2l.m1Game_h_23.wrongcount++;
			// if ($.k2l.m1Game_h_23.wrongcount >= 1) {
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
		var scoreIncorrect = Session.get('Hard_Incorrect');
		scoreIncorrect++
		var parentSection = $(evt.currentTarget).parents('section');
		// $('.stuck').addClass('hidden'); //hide stuck button if visible
		// $.k2l.m1Game_h_23.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m1Game_h_23.index).html($.k2l.m1Game_h_23.correctAnswers[$.k2l.m1Game_h_23.index]);
		$('#entryanswer' + $.k2l.m1Game_h_23.index).html($.k2l.m1Game_h_23.displayAnswers[$.k2l.m1Game_h_23.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer' + $.k2l.m1Game_h_23.index).addClass('correctword');
		Session.set('Hard_Incorrect', scoreIncorrect);
		if ($.k2l.m1Game_h_23.index < $.k2l.m1Game_h_23.correctAnswers.length - 1) {
			$.k2l.m1Game_h_23.index++;
			$('#entryanswer' + $.k2l.m1Game_h_23.index).removeClass('textentry-disabled');
			$('#entryanswer' + $.k2l.m1Game_h_23.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
			$('input[name=userText]').focus();
		} else {
			$(".button1").addClass("hidden");
			$.k2l.m1Game_h_23.index = 0;
			$.k2l.m1Game_h_23.wrongcount = 0;
			setTimeout(function () {
				$.k2l.m1Game_h_23.sound.src = {};
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
			}, 1000);
			//$('.pagination').removeClass('hidden');
		}
	},

	'click .buttonaudio': function (evt) {
		$.k2l.m1Game_h_23.sound.src = $(evt.currentTarget).attr('data-audiosrc');
		addSpinner($.k2l.m1Game_h_23.sound, $(evt.currentTarget));
		$.k2l.m1Game_h_23.sound.play();
	},

	"click .pagination": function (evt) {
		$.k2l.m1Game_h_23.sound.src = {};
		$.k2l.m1Game_h_23.index = 0;
		$.k2l.m1Game_h_23.wrongcount = 0;
	}

});

Template.m1Game_h_23.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1Game_h_23 == 'undefined') {
		$.k2l.m1Game_h_23 = {};
	};

	$.k2l.m1Game_h_23.index = 0;
	$.k2l.m1Game_h_23.wrongcount = 0;
	$.k2l.m1Game_h_23.sound = new Audio();
	// $.k2l.m1Game_h_23.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
		["10.30", "10:30"], // Possible answers for Q1.
		["2"],   // Possible answers for Q2.
		["12"], // etc.
		["5"],
		["2.50", "2 50"],
		["12"],
		["3.50", "3 50"]
	];

	var displayAnswers = [
		["10:30"], // Possible answers for Q1.
		["2"],   // Possible answers for Q2.
		["12"], // etc.
		["5"],
		["2.50"],
		["12"],
		["3.50"]
	];

	$.k2l.m1Game_h_23.displayAnswers = displayAnswers;
	$.k2l.m1Game_h_23.correctAnswers = correctAnswers;

}