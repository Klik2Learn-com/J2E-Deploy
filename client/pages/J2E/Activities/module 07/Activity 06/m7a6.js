Template.m7a6.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m7a6_end') {
			return false;
		}
		return true;
	}
});

Template.m7a6.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(7, 6);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(7, 6, subpage);
			oldLocation = location.href;
		}
	}, 500);

}
Template.m7a6_1.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m7a6_1");
	},

	rightScore: function () {
		return Session.get('m7a6_1RightScore');
	},

	wrongScore: function () {
		return Session.get('m7a6_1WrongScore');
	}
})

Template.scorebox1.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m7a6_1");
	},

	rightScore: function () {
		return Session.get('m7a6_1RightScore');
	},

	wrongScore: function () {
		return Session.get('m7a6_1WrongScore');
	}
})

Template.m7a6_1.events({
	"click .button2": function (evt) {

		if ($.k2l.m7a6_1.allowClick == true) {

			$.k2l.m7a6_1.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m7a6_1.answer_index[$.k2l.m7a6_1.index]) {
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout(function () {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				$.k2l.m7a6_1.rightscore++;
				var rightScore = $.k2l.m7a6_1.rightscore;
				var wrongScore = $.k2l.m7a6_1.wrongscore;

				Session.set('m7a6_1RightScore', rightScore);
				Session.set('m7a6_1WrongScore', wrongScore);

				if ($.k2l.m7a6_1.index < $.k2l.m7a6_1.question.length - 1) {
					$.k2l.m7a6_1.index++;
					setTimeout(function () {
						$('.buttonaudio').attr("data-audiosrc", $.k2l.m7a6_1.questionsaudio[$.k2l.m7a6_1.index]);
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$('.number').html($.k2l.m7a6_1.index + 1);
						$('#question_text').html($.k2l.m7a6_1.question[$.k2l.m7a6_1.index]);
						$.k2l.m7a6_1.allowClick = true; // Make the buttons clickable again
						$.k2l.m7a6_1.sound.src = $('.buttonaudio').attr("data-audiosrc");
						$.k2l.m7a6_1.sound.play();
					}, 1000);
				} else {
					$.k2l.m7a6_1.sound.src = {};

					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);

					setTimeout(function () {
						$('#welldonecap').addClass('hidden');
						$("#m7a6_1").addClass('hidden');

						if ($.k2l.m7a6_1.wrongscore < 3) {
							$("#m7a6_good").removeClass('hidden');
							Session.set("activeSection", "#m7a6_scores");
						} else {
							$("#m7a6_bad").removeClass('hidden');
							Session.set("activeSection", "#m7a6_scores");
						}
					}, 2000);

					// $('.pagination').removeClass('hidden');
				}
			} else {
				$.k2l.m7a6_1.wrongscore++;
				// incorrect
				var rightScore = $.k2l.m7a6_1.rightscore;
				var wrongScore = $.k2l.m7a6_1.wrongscore;

				Session.set('m7a6_1RightScore', rightScore);
				Session.set('m7a6_1WrongScore', wrongScore);
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);


				if ($.k2l.m7a6_1.index < $.k2l.m7a6_1.question.length - 1) {
					$.k2l.m7a6_1.index++;
					setTimeout(function () {
						$('.buttonaudio').attr("data-audiosrc", $.k2l.m7a6_1.questionsaudio[$.k2l.m7a6_1.index]);
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$('.number').html($.k2l.m7a6_1.index + 1);
						$('#question_text').html($.k2l.m7a6_1.question[$.k2l.m7a6_1.index]);
						$.k2l.m7a6_1.allowClick = true; // Make the buttons clickable again
						$.k2l.m7a6_1.sound.src = $('.buttonaudio').attr('data-audiosrc');
						$.k2l.m7a6_1.sound.play();

					}, 1000);
				} else {
					$.k2l.m7a6_1.sound.src = {};
					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);

					setTimeout(function () {
						$('#welldonecap').addClass('hidden');
						$("#m7a6_1").addClass('hidden');

						if ($.k2l.m7a6_1.wrongscore < 3) {
							$("#m7a6_good").removeClass('hidden');
							Session.set("activeSection", "#m7a6_scores");
						} else {
							$("#m7a6_bad").removeClass('hidden');
							Session.set("activeSection", "#m7a6_scores");
						}
					}, 2000);
				}
			}
		}

	},

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m7a6_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a6_1.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {
		$.k2l.m7a6_1.sound.src = {};
		$.k2l.m7a6_1.index = 0;
		$.k2l.m7a6_1.allowClick = true;
	}

});

Template.m7a6_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m7a6_1 == 'undefined') {
		$.k2l.m7a6_1 = {};
	};

	$.k2l.m7a6_1.sound = new Audio();

	var questions = ["Grain can be an ingredient for energy drinks",
		"Students wear academic gowns for some evening meals.",
		"Oxford students can wear casual clothes for exams.",
		"Oxford students wear flowers during exam time.",
		"Oxford colleges still ask applicants to write for three hours on one word. ",
		"Once a year some students walk round the quad backwards, drinking port."];


	var questionsaudio = ["/audio/module7/a6/q1.m4a",
		"/audio/module7/a6/q2.m4a",
		"/audio/module7/a6/q3.m4a",
		"/audio/module7/a6/q4.m4a",
		"/audio/module7/a6/q5.m4a",
		"/audio/module7/a6/q6.m4a"
	];

	var answer_index = ["true", "true", "false", "true", "false", "true"];

	$.k2l.m7a6_1.question = questions;
	$.k2l.m7a6_1.questionsaudio = questionsaudio;
	$.k2l.m7a6_1.answer_index = answer_index;
	$.k2l.m7a6_1.index = 0;
	$.k2l.m7a6_1.rightscore = 0;
	$.k2l.m7a6_1.wrongscore = 0;

	Session.set('m7a6_1RightScore', 0);
	Session.set('m7a6_1WrongScore', 0);

	$.k2l.m7a6_1.allowClick = true;
}


Template.m7a6_scores.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m7a6_scores");
	}
});


Template.m7a6_scores.events({

	"click a.restart": function (evt) {
		if (typeof $.k2l != 'undefined') {
			if (typeof $.k2l.m7a6_1 != 'undefined') {
				if (typeof $.k2l.m7a6_1.index != 'undefined') {
					$.k2l.m7a6_1.index = 0;
				}
				if (typeof $.k2l.m7a6_1.rightscore != 'undefined') {
					$.k2l.m7a6_1.rightscore = 0;
				}
				if (typeof $.k2l.m7a6_1.wrongscore != 'undefined') {
					$.k2l.m7a6_1.wrongscore = 0;
				}
			}
		}


		Session.set('m7a6_1RightScore', 0);
		Session.set('m7a6_1WrongScore', 0);
		// $('#m7a6RightScore').html(Session.get('m7a6RightScore'));
		// $('#m7a6WrongScore').html(Session.get('m7a6WrongScore'));
		$.k2l.m7a6_1.allowClick = true;
		Session.set("activeSection", "#m7a6_1");
		forceReload();
	}
});



Template.m7a6.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 7, 6, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m7a6.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
