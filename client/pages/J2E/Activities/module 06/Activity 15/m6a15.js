Template.m6a15.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m6a15_end') {
			return false;
		}
		return true;
	}
});

Template.m6a15.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(6, 15);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(6, 15, subpage);
			oldLocation = location.href;
		}
	}, 500);
	Session.set("flip-set", false);
}

Template.m6a15.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 6, 15, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m6a15.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m6a15_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a15_1");
	}
});

Template.m6a15_1.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m6a15_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m6a15_1.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m6a15_1.sound.src = {};
	}

});

Template.m6a15_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m6a15_1 == 'undefined') {
		$.k2l.m6a15_1 = {};
	};

	$.k2l.m6a15_1.sound = new Audio();
}

Template.m6a15_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a15_2");
	}
});

Template.m6a15_2.events({
	"click .button2": function (evt) {

		if ($.k2l.m6a15_2.allowClick == true) {

			$.k2l.m6a15_2.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m6a15_2.answer_index[$.k2l.m6a15_2.index]) {
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout(function () {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				$.k2l.m6a15_2.rightscore++;
				var rightScore = $.k2l.m6a15_2.rightscore;
				var wrongScore = $.k2l.m6a15_2.wrongscore;

				Session.set('m6a15CorrectScore', rightScore);
				Session.set('m6a15IncorrectScore', wrongScore);

				if ($.k2l.m6a15_2.index < $.k2l.m6a15_2.questions.length - 1) {
					$.k2l.m6a15_2.index++;
					setTimeout(function () {
						$('.buttonaudio').attr("data-audiosrc", $.k2l.m6a15_2.questionsaudio[$.k2l.m6a15_2.index]);
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						//$('.number').html($.k2l.m6a15_2.index+1);
						$('#question_text').html($.k2l.m6a15_2.questions[$.k2l.m6a15_2.index]);
						$.k2l.m6a15_2.allowClick = true; // Make the buttons clickable again
						setTimeout(function () {
							$.k2l.m6a15_2.sound.src = $('.buttonaudio').attr("data-audiosrc");
							playPauseAudio(	$.k2l.m6a15_2.sound, $('.buttonaudio'));
						}, 800);
					}, 1000);
				} else {
					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);

					setTimeout(function () {
						$.k2l.m6a15_2.index = 0;
						$('#welldonecap').addClass('hidden');
						$("#m6a15_2").addClass('hidden');
						$.k2l.m6a15_2.allowClick = true;

						if ($.k2l.m6a15_2.wrongscore < 5) {
							$("#m6a15_good").removeClass('hidden');
							Session.set("activeSection", "#m6a15_good");
						} else {
							$("#m6a15_bad").removeClass('hidden');
							Session.set("activeSection", "#m6a15_bad");
						}
					}, 2000);

					// $('.pagination').removeClass('hidden');
				}
			} else {
				$.k2l.m6a15_2.wrongscore++;
				// incorrect
				var rightScore = $.k2l.m6a15_2.rightscore;
				var wrongScore = $.k2l.m6a15_2.wrongscore;

				Session.set('m6a15CorrectScore', rightScore);
				Session.set('m6a15IncorrectScore', wrongScore);
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);


				if ($.k2l.m6a15_2.index < $.k2l.m6a15_2.questions.length - 1) {
					$.k2l.m6a15_2.index++;
					setTimeout(function () {
						$('.buttonaudio').attr("data-audiosrc", $.k2l.m6a15_2.questionsaudio[$.k2l.m6a15_2.index]);
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						//$('.number').html($.k2l.m6a15_2.index+1);
						$('#question_text').html($.k2l.m6a15_2.questions[$.k2l.m6a15_2.index]);
						$.k2l.m6a15_2.allowClick = true; // Make the buttons clickable again
						setTimeout(function () {
							$.k2l.m6a15_2.sound.src = $('.buttonaudio').attr('data-audiosrc');
							playPauseAudio(	$.k2l.m6a15_2.sound, $('.buttonaudio'));
						}, 800);
					}, 1000);
				} else {
					$.k2l.m6a15_2.index = 0;
					$.k2l.m6a15_2.sound.src = {};
					$.k2l.m6a15_2.allowClick = true;
					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);

					setTimeout(function () {
						$('#welldonecap').addClass('hidden');
						$("#m6a15_2").addClass('hidden');
						$.k2l.m6a15_2.sound.src = {};

						if ($.k2l.m6a15_2.wrongscore < 5) {
							$("#m6a15_good").removeClass('hidden');
							Session.set("activeSection", "#m6a15_good");
						} else {
							$("#m6a15_bad").removeClass('hidden');
							Session.set("activeSection", "#m6a15_bad");
						}
					}, 2000);
				}
			}
		}

	},

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m6a15_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m6a15_2.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {
		$.k2l.m6a15_2.sound.src = {};
		$.k2l.m6a15_2.index = 0;
		$.k2l.m6a15_2.allowClick = true;
	}

});

Template.m6a15_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m6a15_2 == 'undefined') {
		$.k2l.m6a15_2 = {};
	};

	$.k2l.m6a15_2.sound = new Audio();

	var questions = ["Sentence 1a",
		"Sentence 1b",
		"Sentence 2a",
		"Sentence 2b",
		"Sentence 3a",
		"Sentence 3b",
		"Sentence 4a",
		"Sentence 4b",
		"Sentence 5",
		"Sentence 6a",
		"Sentence 6b",
		"Sentence 7a",
		"Sentence 7b",
		"Sentence 8a",
		"Sentence 8b"];


	var questionsaudio = ["/audio/module6/a15/1a.m4a",
		"/audio/module6/a15/1b.m4a",
		"/audio/module6/a15/2a.m4a",
		"/audio/module6/a15/2b.m4a",
		"/audio/module6/a15/3a.m4a",
		"/audio/module6/a15/3b.m4a",
		"/audio/module6/a15/4a.m4a",
		"/audio/module6/a15/4b.m4a",
		"/audio/module6/a15/5.m4a",
		"/audio/module6/a15/6a.m4a",
		"/audio/module6/a15/6b.m4a",
		"/audio/module6/a15/7a.m4a",
		"/audio/module6/a15/7b.m4a",
		"/audio/module6/a15/8a.m4a",
		"/audio/module6/a15/8b.m4a"
	];

	var answer_index = ["no", "yes", "yes", "no", "no", "yes", "no", "yes", "yes", "yes", "no", "no", "yes", "yes", "no"];

	$.k2l.m6a15_2.questions = questions;
	$.k2l.m6a15_2.questionsaudio = questionsaudio;
	$.k2l.m6a15_2.answer_index = answer_index;
	$.k2l.m6a15_2.index = 0;
	$.k2l.m6a15_2.rightscore = 0;
	$.k2l.m6a15_2.wrongscore = 0;

	Session.set('m6a15CorrectScore', 0);
	Session.set('m6a15IncorrectScore', 0);

	$.k2l.m6a15_2.allowClick = true;
}


Template.m6a15_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a15_3");
	}
});

Template.m6a15_3.rendered = function () {


	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m6a15_3 == 'undefined') {
		$.k2l.m6a15_3 = {};
	};

	$.k2l.m6a15_3.sound = new Audio();
}

Template.m6a15_3.events({

	'click .flippable': function (evt) {

		if (Session.get("flip-set") !== true) {
			$(".flippable").flip({
				trigger: 'manual'
			});
			Session.set("flip-set", true);
		}

		$(evt.currentTarget).flip("toggle");

	},
	
	'click .wrong-sentence .caption-no-bg > u': function (evt) {
		$(evt.currentTarget).parent().parent().toggleClass('selected');
	},

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m6a15_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m6a15_3.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m6a15_3.sound.src = {};
	}

});

Template.m6a15_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a15_4");
	}
});

Template.m6a15_4.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m6a15_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m6a15_4.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m6a15_4.sound.src = {};
	}

});

Template.m6a15_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m6a15_4 == 'undefined') {
		$.k2l.m6a15_4 = {};
	};

	$.k2l.m6a15_4.sound = new Audio();
}

Template.m6a15_scores.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m6a15_scores");
	}
});


Template.m6a15_scores.events({
	"click #m6a15restart": function (evt) {

		Session.set('m6a15CorrectScore', 0);
		Session.set('m6a15IncorrectScore', 0);
		Session.set("activeSection", "#m6a15_2");
		forceReload();
	}
});
