Template.m6a21.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m6a21_end') {
			return false;
		}
		return true;
	}
});

// Template.m6a21.events({
// 	"click .pagination" :function(evt){
// 			$(".pagination").addClass("hidden");
// 	}
// });


Template.m6a21.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(6, 21);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(6, 21, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m6a21.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 6, 21, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m6a21.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m6a21_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a21_1");
	}
});

Template.m6a21_1.events({
	"click .next_question_button": function (evt) {
		evt.preventDefault();
		$.k2l.m6a21_1.sound.src = $('.buttonaudio').attr("data-audiosrc");
		playPauseAudio($.k2l.m6a21_1.sound, $('.buttonaudio'));
		$('.number').html($.k2l.m6a21_1.index + 1);
		$('#question_text').html($.k2l.m6a21_1.questions[$.k2l.m6a21_1.index]);
		$(".button2").removeClass("noclick");
		$(".buttonaudio").removeClass("noclick");
		$(".next_question_button").addClass("hidden");

	},
	"click .button2": function (evt) {
		evt.preventDefault();
		// Correct
		if (
			($(evt.currentTarget).html() == $.k2l.m6a21_1.answer_index[$.k2l.m6a21_1.index]) ||
			($(evt.currentTarget).html() == "for" && $.k2l.m6a21_1.index == 1)
		) {
			$(".button2").addClass("noclick");
			$(".buttonaudio").addClass("noclick");
			$('.correctscreen').removeClass('hidden');
			$(".next_question_button").removeClass("hidden");
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
			}, 1000);

			if ($.k2l.m6a21_1.index < $.k2l.m6a21_1.questions.length - 1) {

				$('#question_text').html($.k2l.m6a21_1.answers[$.k2l.m6a21_1.index]);

				$.k2l.m6a21_1.index++;

				setTimeout(function () {
					$('.buttonaudio').attr("data-audiosrc", $.k2l.m6a21_1.questionsaudio[$.k2l.m6a21_1.index]);
					$('.incorrectscreen').addClass('hidden');
					$('.correctscreen').addClass('hidden');

				}, 1000);
			} else {
				$(".next_question_button").addClass("hidden");
				$('#question_text').html($.k2l.m6a21_1.answers[$.k2l.m6a21_1.index]);
				// $('.pagination').removeClass('hidden');
				setTimeout(function () {
					$('#welldonecap').removeClass('hidden');
				}, 1000);

				setTimeout(function () {
					$.k2l.m6a21_1.index = 0;
					$('#welldonecap').addClass('hidden');
				}, 2000);

				$('.pagination').removeClass('hidden');
			}
		} else {

			$('.incorrectscreen').removeClass('hidden');
			setTimeout(function () {
				$('.incorrectscreen').addClass('hidden');
			}, 1000);
		}


	},

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m6a21_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m6a21_1.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {
		$.k2l.m6a21_1.sound.src = {};
		$.k2l.m6a21_1.index = 0;
	}

});

Template.m6a21_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m6a21_1 == 'undefined') {
		$.k2l.m6a21_1 = {};
	};

	$.k2l.m6a21_1.sound = new Audio();

	var questions = ["The police were attacked by petrol bombs.",
		"Trouble flared in the second night.",
		"The season runs at April through August.",
		"Some marches pass on sensitive areas of the city.",
		"These areas are occupied mainly with Catholics.",
		"Many families and children were caught out in the violence.",
		"Petrol bombs and bricks were thrown to the police.",
		"The police responded by water cannons.",
		"A Belfast MP was knocked unconscious so he was hit by a missile.",
		"The majority of the parades passed on peacefully.",
		"They need to reflect about their responsibility."
	];

	var answers = ["The police were attacked <u>with</u> petrol bombs.",
		"Trouble flared <u>on</u> the second night. OR Trouble flared <u>for</u> the second night.",
		"The season runs <u>from</u> April through August.",
		"Some marches pass <u>through</u> sensitive areas of the city.",
		"These areas are occupied mainly <u>by</u> Catholics.",
		"Many families and children were caught <u>up</u> in the violence.",
		"Petrol bombs and bricks were thrown <u>at</u> the police.",
		"The police responded <u>with</u> water cannons.",
		"A Belfast MP was knocked unconscious <u>after</u> he was hit by a missile.",
		"The majority of the parades passed <u>off</u> peacefully.",
		"They need to reflect <u>on</u> their responsibility."
	];


	var questionsaudio = ["/audio/module6/a21/police1.m4a",
		"/audio/module6/a21/police2.m4a",
		"/audio/module6/a21/police3.m4a",
		"/audio/module6/a21/police4.m4a",
		"/audio/module6/a21/police5.m4a",
		"/audio/module6/a21/police6.m4a",
		"/audio/module6/a21/police7.m4a",
		"/audio/module6/a21/police8.m4a",
		"/audio/module6/a21/police9.m4a",
		"/audio/module6/a21/police10.m4a",
		"/audio/module6/a21/police11.m4a"
	];

	var answer_index = ["with", "on", "from", "through", "by", "up", "at", "with", "after", "off", "on"];

	$.k2l.m6a21_1.questions = questions;
	$.k2l.m6a21_1.answers = answers;
	$.k2l.m6a21_1.answer_index = answer_index;
	$.k2l.m6a21_1.questionsaudio = questionsaudio;
	$.k2l.m6a21_1.answer_index = answer_index;
	$.k2l.m6a21_1.index = 0;
}

