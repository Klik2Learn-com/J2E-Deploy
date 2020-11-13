Template.m6a27.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m6a27_end') {
			return false;
		}
		return true;
	}
});

Template.m6a27.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(6, 27);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(6, 27, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m6a27.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 6, 27, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m6a27.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m6a27_1.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m6a27_1";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m6a27_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a27_2");
	}
});

Template.m6a27_2.events({
	'click .paraclick-word': function (evt) {
		if ($(evt.target).hasClass('correctword')) {
			return;
		}
		//var parentSection = $(evt.currentTarget).parents('section');
		if ($.k2l.m6a27_2.questionWordLock == false && $.k2l.m6a27_2.stuckFlag == false) {
			$.k2l.m6a27_2.questionWordLock = true;
			$.k2l.m6a27_2.stucktype = true;
			setTimeout(function () {
				$.k2l.m6a27_2.questionWordLock = false;
			}, 1000);
			$('.paraclick-word').addClass('correctword');
			$('.stuck').addClass('hidden');
			$('.correctscreen').removeClass("hidden");
			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			setTimeout(function () {
				$('.paraclick-word').html('<form class="textentry"><input type="text" name="userText" size="30" autocomplete="off"><input type="submit" value="OK"></form>');
				$('.paraclick-word').removeClass('correctword paraclick-word');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			}, 1500);
		}

	},

	'click .wrong': function (evt) {

		if ($.k2l.m6a27_2.questionWordLock == false && $.k2l.m6a27_2.stuckFlag == false) {
			$.k2l.m6a27_2.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m6a27_2.questionWordLock = false;
			}, 1000);
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
			$.k2l.m6a27_2.wrongCount++;

			if ($.k2l.m6a27_2.wrongCount >= 1) {
				$('.stuck').removeClass('hidden');
			}

		}
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
		for (var i = 0; i < $.k2l.m6a27_2.correctAnswers[$.k2l.m6a27_2.index].length; i++) {
			if (userText == $.k2l.m6a27_2.correctAnswers[$.k2l.m6a27_2.index][i]) {
				isCorrect = true;
				break;
			}
		}

		if (isCorrect) {

			var parentSection = $(evt.currentTarget).parents('section');

			$(evt.currentTarget).parent().html('<span class="correctword">' + $.k2l.m6a27_2.displayAnswers[$.k2l.m6a27_2.index] + ' </span>');
			$('.incorrectscreen').addClass("hidden"); // Remove a cross if there is one.
			$('.correctscreen').removeClass("hidden");


			$(".stuck").addClass('hidden'); // Hide the stuck button if it is visible

			if ($.k2l.m6a27_2.index < $.k2l.m6a27_2.correctAnswers.length - 1) {
				$.k2l.m6a27_2.index++;
				setTimeout(function () {
					$('.correctscreen').addClass("hidden");
					$('.incorrectscreen').addClass("hidden");
				}, 1000);
				setTimeout(function () {
					$('#paratext').html($.k2l.m6a27_2.questions[$.k2l.m6a27_2.index]);
					$('.number').html($.k2l.m6a27_2.index + 1);

				}, 2000);

				$.k2l.m6a27_2.stucktype = false;
				$.k2l.m6a27_2.wrongCount = 0; // reset the wrongCount
			} else {
				$.k2l.m6a27_2.index = 0;
				$.k2l.m6a27_2.wrongcount = 0;
				setTimeout(function () {
					$('#welldonecap').removeClass('hidden');
				}, 2000);
				setTimeout(function () {
					$('#welldonecap').addClass('hidden');
				}, 3000);
				setTimeout(function () {
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
				}, 3000);
			}
		} else {

			// Incorrect Answer
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000)
			$.k2l.m6a27_2.wrongCount++;

			if ($.k2l.m6a27_2.wrongCount >= 1) {
				$(".stuck").removeClass('hidden');

				$.k2l.m6a27_2.wrongCount = 0;
			}
		}
	},
	'click .stuck': function (evt) {
		var parentSection = $(evt.currentTarget).parents('section');

		$('.stuck').addClass('hidden');
		$.k2l.m6a27_2.wrongCount = 0;
		if ($.k2l.m6a27_2.stucktype == false) {
			if ($.k2l.m6a27_2.questionWordLock == false && $.k2l.m6a27_2.stuckFlag == false) {
				$.k2l.m6a27_2.questionWordLock = true;
				$.k2l.m6a27_2.stucktype = true;
				setTimeout(function () {
					$.k2l.m6a27_2.questionWordLock = false;
				}, 1000);
				$('.paraclick-word').addClass('correctword');
				$('.correctscreen').removeClass("hidden");
				setTimeout(function () {
					$('.correctscreen').addClass("hidden");
				}, 1000);

				setTimeout(function () {
					$('.paraclick-word').html('<form class="textentry"><input type="text" name="userText" size="30" autocomplete="off"><input type="submit" value="OK"></form>');
					$('.paraclick-word').removeClass('correctword paraclick-word');
					// Need to get the cursor to focus on the next attempt
					$('input[name=userText]').focus();
				}, 1500);
			}
		} else {
			if ($.k2l.m6a27_2.index < $.k2l.m6a27_2.correctAnswers.length - 1) {

				$('.paratext').html('<span class="correctword">' + $.k2l.m6a27_2.displayAnswers[$.k2l.m6a27_2.index] + ' </span>');
				$.k2l.m6a27_2.index++;
				setTimeout(function () {
					$('.correctscreen').addClass("hidden");
					$('.incorrectscreen').addClass("hidden");
				}, 1000);
				setTimeout(function () {
					$('#paratext').html($.k2l.m6a27_2.questions[$.k2l.m6a27_2.index]);
					$('.number').html($.k2l.m6a27_2.index + 1);

				}, 2000);

				$.k2l.m6a27_2.stucktype = false;
				$.k2l.m6a27_2.wrongCount = 0; // reset the wrongCount
			} else {
				$('.paratext').html('<span class="correctword">' + $.k2l.m6a27_2.displayAnswers[$.k2l.m6a27_2.index] + ' </span>');
				setTimeout(function () {
					$('.correctscreen').addClass("hidden");
					$('.incorrectscreen').addClass("hidden");
				}, 1000);
				setTimeout(function () {
					$('#welldonecap').removeClass('hidden');
				}, 1000);
				setTimeout(function () {
					$('#welldonecap').addClass('hidden');
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
				}, 2000);
				$.k2l.m6a27_2.index = 0;
				$.k2l.m6a27_2.wrongcount = 0;
			}

		}
	},

	'click .navfooter a': function (evt) {
		$('#m6a27_2 .navfooter a').addClass('hidden');
		$('.paraclick-word').removeClass('correctword');
		$.k2l.m6a27_2.wrongCount = 0;
		$.k2l.m6a27_2.stuckFlag = false;
	}

});

Template.m6a27_2.rendered = function () {
	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m6a27_2 == 'undefined') {
		$.k2l.m6a27_2 = {};
	};

	var questions = [
		['<span class="wrong">The interviewer tried to get him to </span><span class="paratext paraclick-word">kick himself</span><span class="wrong"> but he refused.</span>'],
		['<span class="wrong">He went back to his old habits, it just proves</span> <span class="paratext paraclick-word">a spade a spade</span>.'],
		['<span class="wrong">You would</span> <span class="paratext paraclick-word">be a class act</span> <span class="wrong">if you threw away a winning ticket.</span>'],
		["<span class='wrong'>When she makes a speech in parliament, everyone listens - she's</span> <span class='paratext paraclick-word'>a leopard who can't change its spots</span>."]

	];
	// the actual answers in acceptable form (after lowercase and trimming)
	var correctAnswers = [
		["call a spade a spade"], // Possible answers for Q1.
		["that a leopard can not change its spots", "that a leopard can't change its spots", "a leopard can not change its spots", "a leopard can't change its spots", "that a leopard can not change its spots.", "that a leopard can't change its spots.", "a leopard can not change its spots.", "a leopard can't change its spots.", "a leopard cant change its spots", "that a leopard cant change its spots.", "that a leopard cant change its spots", "a leopard cant change its spots."],
		["kick yourself"], // etc.
		["a class act", "a class act."]
		// ["data"],
		// ["unfounded"],
		// ["exaggerate", "exaggerating"],
		// ["nevertheless"],
		// ["in a good light"],
		// ["serve a purpose"]
	];

	// The answers as they should be displayed
	var displayAnswers = ["call a spade a spade", "a leopard can't change its spots", "kick yourself", "a class act"];

	$.k2l.m6a27_2.index = 0;
	$.k2l.m6a27_2.questions = questions;
	$.k2l.m6a27_2.correctAnswers = correctAnswers;
	$.k2l.m6a27_2.displayAnswers = displayAnswers;
	$.k2l.m6a27_2.wrongCount = 0;
	$.k2l.m6a27_2.stuckFlag = false;
	$.k2l.m6a27_2.questionWordLock = false;
	$.k2l.m6a27_2.stucktype = false;

}
