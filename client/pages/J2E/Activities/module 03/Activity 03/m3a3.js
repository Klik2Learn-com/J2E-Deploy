Template.m3a3.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 3, 3, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m3a3.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m3a3_end') {
			return false;
		}
		return true;
	}
});

Template.m3a3.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m3a3_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a3_1");
	}
});

Template.m3a3_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a3_2");
	}
});

Template.m3a3_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a3_3");
	}
});

Template.m3a3_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a3_4");
	}
});

Template.m3a3_5.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a3_5");
	}
});

Template.m3a3_6.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a3_6");
	}
});

Template.m3a3_7.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a3_7");
	}
});

Template.m3a3_8.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a3_8");
	}
});

Template.m3a3.events({

	"click #m3a3_4 .button1": function (evt) {

		var currentSection = $(evt.currentTarget).parents('section');
		var nextSection = $(evt.currentTarget).parents('section').next('section');

		if ($.k2l.m3a3.questionWordLock4 == false) {
			$.k2l.m3a3.questionWordLock4 = true;

			var correctAnswerQ4 = $.k2l.m3a3.correctAnswerQ4;
			if ($(evt.target).text() == correctAnswerQ4) {
				$('.correctscreen').removeClass("hidden");
				$.k2l.m3a3.index++;
				setTimeout(function () {
					$.k2l.m3a3.questionWordLock4 = false;
					$('.correctscreen').addClass("hidden");
					currentSection.addClass('hidden'); // hide this page
					nextSection.removeClass('hidden');// reveal next page
					document.location.hash = nextSection.attr('id'); // change the hash
					Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
				}, 1500);
			}
			else {
				$('.incorrectscreen').removeClass("hidden");
				setTimeout(function () {
					$('.incorrectscreen').addClass("hidden");
				}, 1500);
				$.k2l.m3a3.questionWordLock4 = false;
			}
		}
	},
	"click #m3a3_6 .button1": function (evt) {

		var currentSection = $(evt.currentTarget).parents('section');
		var nextSection = $(evt.currentTarget).parents('section').next('section');

		if ($.k2l.m3a3.questionWordLock6 == false) {
			$.k2l.m3a3.questionWordLock6 = true;

			var correctAnswerQ6 = $.k2l.m3a3.correctAnswerQ6;
			if ($(evt.target).text() == correctAnswerQ6) {
				$('.correctscreen').removeClass("hidden");
				$.k2l.m3a3.index++;
				setTimeout(function () {
					$.k2l.m3a3.questionWordLock6 = false;
					$('.correctscreen').addClass("hidden");
					currentSection.addClass('hidden'); // hide this page
					nextSection.removeClass('hidden');// reveal next page
					document.location.hash = nextSection.attr('id'); // change the hash
					Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
				}, 1500);
			}
			else {
				$('.incorrectscreen').removeClass("hidden");
				setTimeout(function () {
					$('.incorrectscreen').addClass("hidden");
				}, 1500);
				$.k2l.m3a3.questionWordLock6 = false;
			}
		}
	},

	"click #m3a3_7 .button1": function (evt) {

		var currentSection = $(evt.currentTarget).parents('section');
		var nextSection = $(evt.currentTarget).parents('section').next('section');

		if ($.k2l.m3a3.questionWordLock7 == false) {
			$.k2l.m3a3.questionWordLock7 = true;

			var correctAnswerQ7 = $.k2l.m3a3.correctAnswerQ7;
			if ($(evt.target).text() == correctAnswerQ7) {
				$('.correctscreen').removeClass("hidden");
				$.k2l.m3a3.index++;
				setTimeout(function () {
					$.k2l.m3a3.questionWordLock7 = false;
					$('.correctscreen').addClass("hidden");
					currentSection.addClass('hidden'); // hide this page
					nextSection.removeClass('hidden');// reveal next page
					document.location.hash = nextSection.attr('id'); // change the hash
					Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
				}, 1500);
			}
			else {
				$('.incorrectscreen').removeClass("hidden");
				setTimeout(function () {
					$('.incorrectscreen').addClass("hidden");
				}, 1500);
				$.k2l.m3a3.questionWordLock7 = false;
			}
		}
	},


	"click .stuck-button": function (evt) {

		var currentSection = $(evt.currentTarget).parents('section');
		var nextSection = $(evt.currentTarget).parents('section').next('section');

		$('form.textentry').parent().html('<h4 class="text-center caption"> ' + $.k2l.m3a3.displayAnswers[$.k2l.m3a3.index] + ' </h4>');
		$('.incorrectscreen').addClass("hidden"); // Remove a cross if there is one.


		$.k2l.m3a3.index++; //increment the counter
		$(".stuck").addClass('hidden'); // Hide the stuck button if it is visible

		setTimeout(function () {
			$.k2l.m3a3.questionWordLock4 = false; //variable to prevent multiple clicks of button
			$.k2l.m3a3.questionWordLock6 = false; //variable to prevent multiple clicks of button
			$.k2l.m3a3.questionWordLock7 = false; //variable to prevent multiple clicks of button

			$('.correctscreen').addClass("hidden");
			$('.incorrectscreen').addClass("hidden");
			currentSection.addClass('hidden'); // hide this page
			nextSection.removeClass('hidden');// reveal next page
			document.location.hash = nextSection.attr('id'); // change the hash
			Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
		}, 4000);

		$.k2l.m3a3.wrongCount = 0; // reset the wrongCount


	},

	"submit form": function (evt) {
		if (evt.preventDefault) {
			evt.preventDefault();
		}
		var isCorrect = false;

		// Tidy up the user's input
		var userText = evt.target.userText.value;
		if (userText.charAt(userText.length - 1) == '.') {
			userText = userText.substr(0, userText.length - 1);
		}
		userText = $.trim(userText);
		userText = userText.toLowerCase();

		// Check if the answer is correct
		for (var i = 0; i < $.k2l.m3a3.correctAnswers[$.k2l.m3a3.index].length; i++) {
			if (userText == $.k2l.m3a3.correctAnswers[$.k2l.m3a3.index][i]) {
				isCorrect = true;
				break;
			}
		}

		if (isCorrect) {

			var currentSection = $(evt.currentTarget).parents('section');
			var nextSection = $(evt.currentTarget).parents('section').next('section');

			$(evt.currentTarget).parent().html('<h4 class="text-center caption">' + $.k2l.m3a3.displayAnswers[$.k2l.m3a3.index] + ' </h4>');
			$('.incorrectscreen').addClass("hidden"); // Remove a cross if there is one.
			$('.correctscreen').removeClass("hidden");

			$.k2l.m3a3.index++; //increment the counter
			$(".stuck").addClass('hidden'); // Hide the stuck button if it is visible

			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
				$('.incorrectscreen').addClass("hidden");
				currentSection.addClass('hidden'); // hide this page
				nextSection.removeClass('hidden');// reveal next page
				document.location.hash = nextSection.attr('id'); // change the hash
				Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
			}, 1500);

			$.k2l.m3a3.wrongCount = 0; // reset the wrongCount
		} else {

			// Incorrect Answer
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000)
			$.k2l.m3a3.wrongCount++;

			if ($.k2l.m3a3.wrongCount >= 1) {
				$(".stuck").removeClass('hidden');

				$.k2l.m3a3.wrongCount = 0;
			}
		}
	},

	'click a.restart': function (evt) {
		// When clicking to restart the activity this should reset the variables to
		// initial values.

		if (typeof $.k2l != 'undefined') {
			if (typeof $.k2l.m3a3 != 'undefined') {
				if (typeof $.k2l.m3a3.index != 'undefined') {
					$.k2l.m3a3.index = 0;
				}
				if (typeof $.k2l.m3a3.wrongCount != 'undefined') {
					$.k2l.m3a3.wrongCount = 0;
				}
			}
		}
	}

})

Template.m3a3.rendered = function () {

	document.title = "Journey 2 English";
	
	setStartActivity(3, 3);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(3, 3, subpage);
			oldLocation = location.href;
		}
	}, 500);


	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a3 == 'undefined') {
		$.k2l.m3a3 = {};
	};

	// the actual answers in acceptable form (after lowercase and trimming)
	var correctAnswers = [
		["nattering"], // Possible answers for Q1.
		["so much so"],   // Possible answers for Q2.
		["no-no", "no-nos"], // etc.
		[" "],
		["code of conduct"],
		[" "],
		[" "],
		["norm"],
	]

	// The answers as they should be displayed
	var displayAnswers = ["nattering", "so much so", "no-nos", " ", "code of conduct", " ", " ", "norm"];

	var correctAnswerQ4 = "intensive";
	var correctAnswerQ6 = "'sacrifice' means the same as 'give up'";
	var correctAnswerQ7 = "'signalled' always suggests a physical gesture";

	$.k2l.m3a3.correctAnswerQ4 = correctAnswerQ4;
	$.k2l.m3a3.correctAnswerQ6 = correctAnswerQ6;
	$.k2l.m3a3.correctAnswerQ7 = correctAnswerQ7;

	$.k2l.m3a3.index = 0;
	$.k2l.m3a3.correctAnswers = correctAnswers;
	$.k2l.m3a3.displayAnswers = displayAnswers;
	$.k2l.m3a3.wrongCount = 0;

	$.k2l.m3a3.questionWordLock4 = false; //variable to prevent multiple clicks of button
	$.k2l.m3a3.questionWordLock6 = false; //variable to prevent multiple clicks of button
	$.k2l.m3a3.questionWordLock7 = false; //variable to prevent multiple clicks of button
}
