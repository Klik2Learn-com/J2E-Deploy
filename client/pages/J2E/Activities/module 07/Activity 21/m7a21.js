Template.m7a21.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m7a21_end') {
			return false;
		}
		return true;
	}
});

Template.m7a21.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(7, 21);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(7, 21, subpage);
			oldLocation = location.href;
		}
	}, 500);

}
Template.m7a21_1.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m7a21_1");
	},

	rightScore: function () {
		return Session.get('m7a21RightScore');
	},

	wrongScore: function () {
		return Session.get('m7a21WrongScore');
	}
})

Template.m7a21_1.events({
	"click .button2": function (evt) {

		if ($.k2l.m7a21_1.allowClick == true) {

			$.k2l.m7a21_1.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m7a21_1.answer_index[$.k2l.m7a21_1.index]) {
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout(function () {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				$.k2l.m7a21_1.rightscore++;
				var rightScore = $.k2l.m7a21_1.rightscore;
				var wrongScore = $.k2l.m7a21_1.wrongscore;

				Session.set('m7a21RightScore', rightScore);
				Session.set('m7a21WrongScore', wrongScore);

				if ($.k2l.m7a21_1.index < $.k2l.m7a21_1.question.length - 1) {
					$.k2l.m7a21_1.index++;
					setTimeout(function () {
						$('.buttonaudio').attr("data-audiosrc", $.k2l.m7a21_1.questionsaudio[$.k2l.m7a21_1.index]);
						$.k2l.m7a21_1.sound.src = $.k2l.m7a21_1.questionsaudio[$.k2l.m7a21_1.index];
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$('.buttonaudio').removeClass('is-playing');
						//$('.number').html($.k2l.m7a21_1.index+1);
						$('#question_text').html($.k2l.m7a21_1.question[$.k2l.m7a21_1.index]);
						$.k2l.m7a21_1.allowClick = true; // Make the buttons clickable again
						setTimeout(function () {
							// $.k2l.m7a21_1.sound.src = $('.buttonaudio').attr("data-audiosrc");
							$.k2l.m7a21_1.sound.play();
							$('.buttonaudio').addClass('is-playing');
							//$('#questions_audio').click();
						}, 500);
					}, 1000);
				} else {
					//$.k2l.m7a21_1.sound.src = {};
					playPauseAudio($.k2l.m7a21_1.sound, $('.buttonaudio'));
					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);

					setTimeout(function () {
						$('#welldonecap').addClass('hidden');
						$("#m7a21_1").addClass('hidden');

						if ($.k2l.m7a21_1.wrongscore < 3) {
							$("#m7a21_good").removeClass('hidden');
							Session.set("activeSection", "#m7a21_good");
						} else {
							$("#m7a21_bad").removeClass('hidden');
							Session.set("activeSection", "#m7a21_bad");
						}
					}, 2000);

					// $('.pagination').removeClass('hidden');
				}
			} else {
				$.k2l.m7a21_1.wrongscore++;
				// incorrect
				var rightScore = $.k2l.m7a21_1.rightscore;
				var wrongScore = $.k2l.m7a21_1.wrongscore;

				Session.set('m7a21RightScore', rightScore);
				Session.set('m7a21WrongScore', wrongScore);
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);


				if ($.k2l.m7a21_1.index < $.k2l.m7a21_1.question.length - 1) {
					$.k2l.m7a21_1.index++;
					setTimeout(function () {
						$('.buttonaudio').attr("data-audiosrc", $.k2l.m7a21_1.questionsaudio[$.k2l.m7a21_1.index]);
						$.k2l.m7a21_1.sound.src = $.k2l.m7a21_1.questionsaudio[$.k2l.m7a21_1.index];
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$('.buttonaudio').removeClass('is-playing');
						//$('.number').html($.k2l.m7a21_1.index+1);
						$('#question_text').html($.k2l.m7a21_1.question[$.k2l.m7a21_1.index]);
						$.k2l.m7a21_1.allowClick = true; // Make the buttons clickable again
						setTimeout(function () {
							// $.k2l.m7a21_1.sound.src = $('.buttonaudio').attr('data-audiosrc');
							// $.k2l.m7a21_1.sound.play();
							//$('#questions_audio').click();
							$.k2l.m7a21_1.sound.play();
							$('.buttonaudio').addClass('is-playing');
						}, 500);
					}, 1000);
				} else {
					//$.k2l.m7a21_1.sound.src = {};
					playPauseAudio($.k2l.m7a21_1.sound, $('.buttonaudio'));
					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);

					setTimeout(function () {
						$('#welldonecap').addClass('hidden');
						$("#m7a21_1").addClass('hidden');

						if ($.k2l.m7a21_1.wrongscore < 3) {
							$("#m7a21_good").removeClass('hidden');
							Session.set("activeSection", "#m7a21_good");
						} else {
							$("#m7a21_bad").removeClass('hidden');
							Session.set("activeSection", "#m7a21_bad");
						}
					}, 2000);
				}
			}
		}

	},

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m7a21_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a21_1.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {
		$.k2l.m7a21_1.sound.src = {};
		$.k2l.m7a21_1.index = 0;
		$.k2l.m7a21_1.allowClick = true;
	}

});

Template.m7a21_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m7a21_1 == 'undefined') {
		$.k2l.m7a21_1 = {};
	};

	$.k2l.m7a21_1.sound = new Audio();

	var questions = ["Sentence 1",
		"Sentence 2",
		"Sentence 3",
		"Sentence 4",
		"Sentence 5",
		"Sentence 6",
		"Sentence 7",
		"Sentence 8",
		"Sentence 9",
		"Sentence 10",];


	var questionsaudio = ["/audio/module7/a21/sentence1.m4a",
		"/audio/module7/a21/sentence2.m4a",
		"/audio/module7/a21/sentence3.m4a",
		"/audio/module7/a21/sentence4.m4a",
		"/audio/module7/a21/sentence5.m4a",
		"/audio/module7/a21/sentence6.m4a",
		"/audio/module7/a21/sentence7.m4a",
		"/audio/module7/a21/sentence8.m4a",
		"/audio/module7/a21/sentence9.m4a",
		"/audio/module7/a21/sentence10.m4a"
	];

	var answer_index = ["false", "true", "true", "false", "false", "false", "true", "true", "true", "true"];

	$.k2l.m7a21_1.question = questions;
	$.k2l.m7a21_1.questionsaudio = questionsaudio;
	$.k2l.m7a21_1.answer_index = answer_index;
	$.k2l.m7a21_1.index = 0;
	$.k2l.m7a21_1.rightscore = 0;
	$.k2l.m7a21_1.wrongscore = 0;

	Session.set('m7a21RightScore', 0);
	Session.set('m7a21WrongScore', 0);

	$.k2l.m7a21_1.allowClick = true;
}

Template.m7a21_3.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m7a21_3");
	}
})

Template.m7a21_3.events({

	'click .button1': function (evt) {
		;
		audioButtonClickSetup($.k2l.m7a21_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a21_3.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m7a21_3.sound.src = {};
	}

});

Template.m7a21_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m7a21_3 == 'undefined') {
		$.k2l.m7a21_3 = {};
	};

	$.k2l.m7a21_3.sound = new Audio();
}

Template.m7a21_4.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m7a21_4");
	}
})

Template.m7a21_4.events({

	'click .button1': function (evt) {
		;
		audioButtonClickSetup($.k2l.m7a21_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a21_4.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m7a21_4.sound.src = {};
	}

});

Template.m7a21_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m7a21_4 == 'undefined') {
		$.k2l.m7a21_4 = {};
	};

	$.k2l.m7a21_4.sound = new Audio();
}

Template.m7a21_scores.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m7a21_scores");
	}
});


Template.m7a21_scores.events({

	"click #m7a21restart": function (evt) {
		
		Session.set('m7a21RightScore', 0);
		Session.set('m7a21WrongScore', 0);
		// $('#m7a21RightScore').html(Session.get('m7a21RightScore'));
		// $('#m7a21WrongScore').html(Session.get('m7a21WrongScore'));
		$.k2l.m7a21_1.allowClick = true;
		Session.set("activeSection", "#m7a21_1");
		forceReload();
	}
});


Template.m7a21.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 7, 21, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m7a21.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
