// This code works over multiple slides, only one this one .js page is needed. Set the Template. functions to the base activity
//GIVE ALL acrtiveSection PAGES A HELPER CLASS
// i.e. m1a20 and not the sub sections such as m1a20_2
Template.m4a8.events({
	"click .stuck-button": function (evt) {

		var currentSection = $(evt.currentTarget).parents('section');
		var nextSection = $(evt.currentTarget).parents('section').next('section');

		$('form.textentry').parent().html('<h4 class="text-center caption"> ' + $.k2l.m4a8.displayAnswers[$.k2l.m4a8.index] + ' </h4>');
		$('.incorrectscreen').addClass("hidden"); // Remove a cross if there is one.


		$.k2l.m4a8.index++; //increment the counter
		$(".stuck").addClass('hidden'); // Hide the stuck button if it is visible

		setTimeout(function () {
			$('.correctscreen').addClass("hidden");
			$('.incorrectscreen').addClass("hidden");
			currentSection.addClass('hidden'); // hide this page
			nextSection.removeClass('hidden');// reveal next page
			document.location.hash = nextSection.attr('id'); // change the hash
			Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
			$('input[name=userText]').focus();
		}, 4000);

		$.k2l.m4a8.wrongCount = 0; // reset the wrongCount


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
		for (var i = 0; i < $.k2l.m4a8.correctAnswers[$.k2l.m4a8.index].length; i++) {
			if (userText == $.k2l.m4a8.correctAnswers[$.k2l.m4a8.index][i]) {
				isCorrect = true;
				break;
			}
		}

		if (isCorrect) {

			var currentSection = $(evt.currentTarget).parents('section');
			var nextSection = $(evt.currentTarget).parents('section').next('section');

			$(evt.currentTarget).parent().html('<h4 class="text-center caption">' + $.k2l.m4a8.displayAnswers[$.k2l.m4a8.index] + ' </h4>');
			$('.incorrectscreen').addClass("hidden"); // Remove a cross if there is one.
			$('.correctscreen').removeClass("hidden");

			$.k2l.m4a8.index++; //increment the counter
			$(".stuck").addClass('hidden'); // Hide the stuck button if it is visible

			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
				$('.incorrectscreen').addClass("hidden");
				currentSection.addClass('hidden'); // hide this page
				nextSection.removeClass('hidden');// reveal next page
				document.location.hash = nextSection.attr('id'); // change the hash
				Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
				$('input[name=userText]').focus();
			}, 1500);

			$.k2l.m4a8.wrongCount = 0; // reset the wrongCount
		} else {

			// Incorrect Answer
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000)
			$.k2l.m4a8.wrongCount++;

			if ($.k2l.m4a8.wrongCount >= 1) {
				$(".stuck").removeClass('hidden');

				$.k2l.m4a8.wrongCount = 0;
			}
		}
	},

	'click a.restart': function (evt) {
		// When clicking to restart the activity this should reset the variables to
		// initial values.


		if (typeof $.k2l != 'undefined') {
			if (typeof $.k2l.m4a8 != 'undefined') {
				if (typeof $.k2l.m4a8.index != 'undefined') {
					$.k2l.m4a8.index = 0;
				}
				if (typeof $.k2l.m4a8.wrongCount != 'undefined') {
					$.k2l.m4a8.wrongCount = 0;
				}
			}
		}
	}

})

Template.m4a8.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(4, 8);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 8, subpage);
			oldLocation = location.href;
		}
	}, 500);

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a8 == 'undefined') {
		$.k2l.m4a8 = {};
	};

	// the actual answers in acceptable form (after lowercase and trimming)
	var correctAnswers = [
		["fortified", "fortify"], // Possible answers for Q1.
		["justify"],   // Possible answers for Q2.
		["dose", "dosing"], // etc.
		["launch", "launched"],
		["conference"],
		["prevent"],
		["rife"],
		["deficient", "deficiency"],
		["adequate"]
	]

	// The answers as they should be displayed
	var displayAnswers = ["fortified/fortify", "justify", "dose/dosing", "launch/launched", "conference",
		"prevent", "rife", "deficient/deficiency", "adequate"];

	$('input[name=userText]').focus();
	$.k2l.m4a8.index = 0;
	$.k2l.m4a8.correctAnswers = correctAnswers;
	$.k2l.m4a8.displayAnswers = displayAnswers;
	$.k2l.m4a8.wrongCount = 0;
}

Template.m4a8.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m4a8_end') {
			return false;
		} return true;
	}
});



Template.m4a8.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 8, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a8.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m4a8_7.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a8_7");
	}
});


Template.m4a8_7.events({

	"click .pagination": function (evt) {
		$.k2l.m4a8_7.draggedElement = {};
		$.k2l.m4a8_7.counter = 0;
	}

});

Template.m4a8_7.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a8_7 == 'undefined') {
		$.k2l.m4a8_7 = {};
	};


	$.k2l.m4a8_7.draggedElement = {};
	$.k2l.m4a8_7.counter = 0;

	// $.k2l.m4a8_7.max = 4; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m4a8_7";
	initDragDrop(selector, dragDropAmount);
}


Template.m4a8_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a8_1");
	}
});

Template.m4a8_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a8_2");
	}
});


Template.m4a8_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a8_3");
	}
});

Template.m4a8_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a8_4");
	}
});

Template.m4a8_5.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a8_5");
	}
});

Template.m4a8_6.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a8_6");
	}
});

Template.m4a8_8.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a8_8");
	}
});

Template.m4a8_9.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a8_9");
	}
});

Template.m4a8_10.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a8_10");
	}
});

Template.m4a8_input.rendered = function () {
	$('input[name=userText]').first().focus();
}

