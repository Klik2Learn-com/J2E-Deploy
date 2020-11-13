Template.m8a8.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m8a8_end') {
			return false;
		}
		return true;
	}
});

Template.m8a8.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(8, 8);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 8, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m8a8.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 8, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a8.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m8a8_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a8_4");
	}
});

Template.m8a8_4.events({

	"click #m8a8restart": function (evt) {
		if (typeof $.k2l != 'undefined') {
			if (typeof $.k2l.m8a8_3 != 'undefined') {
				if (typeof $.k2l.m8a8_3.index != 'undefined') {
					$.k2l.m8a8_3.index = 0;
				}
				if (typeof $.k2l.m8a8_3.rightscore != 'undefined') {
					$.k2l.m8a8_3.rightscore = 0;
				}
				if (typeof $.k2l.m8a8_3.wrongscore != 'undefined') {
					$.k2l.m8a8_3.wrongscore = 0;
				}
			}
		}
		Session.set('m8a8_CorrectScore', 0);
		Session.set('m8a8_IncorrectScore', 0);
		// $('#m8a8CorrectScore').html(Session.get('m8a8CorrectScore'));
		// $('#m8a8IncorrectScore').html(Session.get('m8a8IncorrectScore'));
		// $.k2l.m8a8_3.allowClick = true;
		forceReload();
	}
});

Template.m8a8_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a8_2");
	}
});

Template.m8a8_2.events({

	"click .pagination": function (evt) {
		$('#m8a8vid1').get(0).pause();
		$('#m8a8vid2').get(0).currentTime = 0;
	},

	"play #m8a8vid1": function (evt) {
		$('#m8a8vid2').get(0).pause();
	},

	"play #m8a8vid2": function (evt) {
		$('#m8a8vid1').get(0).pause();
	}
});

Template.m8a8_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a8_3");
	}
});

Template.m8a8_3.events({
	"click .button2": function (evt) {

		if ($.k2l.m8a8_3.allowClick == true) {

			$.k2l.m8a8_3.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m8a8_3.answer_index[$.k2l.m8a8_3.index]) {
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout(function () {
					$('.correctscreen').addClass('hidden');
					$.k2l.m8a8_3.sound.src = {};
					resetAllAudioButtons();
				}, 1000);
				$.k2l.m8a8_3.rightscore++;
				var rightScore = $.k2l.m8a8_3.rightscore;
				var wrongScore = $.k2l.m8a8_3.wrongscore;

				Session.set('m8a8_CorrectScore', rightScore);
				Session.set('m8a8_IncorrectScore', wrongScore);

				if ($.k2l.m8a8_3.index < $.k2l.m8a8_3.question.length - 1) {
					$.k2l.m8a8_3.index++;
					setTimeout(function () {
						$.k2l.m8a8_3.sound.src = {};
						resetAllAudioButtons();
						$('.buttonaudio').attr("data-audiosrc", $.k2l.m8a8_3.questionsaudio[$.k2l.m8a8_3.index]);
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$('.number').html($.k2l.m8a8_3.index + 1);
						$('#A').html($.k2l.m8a8_3.choicesA[$.k2l.m8a8_3.index]);
						$('#B').html($.k2l.m8a8_3.choicesB[$.k2l.m8a8_3.index]);
						$('#question_text').html($.k2l.m8a8_3.question[$.k2l.m8a8_3.index]);
						$.k2l.m8a8_3.allowClick = true; // Make the buttons clickable again
						// setTimeout(function() {
						// 	$.k2l.m8a8_3.sound.src = $('.buttonaudio').attr("data-audiosrc");
						// 	$.k2l.m8a8_3.sound.play();
						// }, 800);
					}, 1000);
				} else {
					$.k2l.m8a8_3.sound.src = {};
					resetAllAudioButtons();

					setTimeout(function () {
						$.k2l.m8a8_3.allowClick = true; // Make the buttons clickable again
						$("#m8a8_3").addClass('hidden');

						if ($.k2l.m8a8_3.wrongscore < 3) {
							$("#m8a8_good").removeClass('hidden');
							Session.set("activeSection", "#m8a8_good");
						} else {
							$("#m8a8_bad").removeClass('hidden');
							Session.set("activeSection", "#m8a8_bad");
						}
					}, 2000);

					// $('.pagination').removeClass('hidden');
				}
			} else {
				$.k2l.m8a8_3.wrongscore++;
				// incorrect
				var rightScore = $.k2l.m8a8_3.rightscore;
				var wrongScore = $.k2l.m8a8_3.wrongscore;

				Session.set('m8a8_CorrectScore', rightScore);
				Session.set('m8a8_IncorrectScore', wrongScore);
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
					$.k2l.m8a8_3.sound.src = {};
					resetAllAudioButtons();
				}, 1000);


				if ($.k2l.m8a8_3.index < $.k2l.m8a8_3.question.length - 1) {
					$.k2l.m8a8_3.index++;
					setTimeout(function () {
						$.k2l.m8a8_3.sound.src = {};
						resetAllAudioButtons();
						$('.buttonaudio').attr("data-audiosrc", $.k2l.m8a8_3.questionsaudio[$.k2l.m8a8_3.index]);
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$('.number').html($.k2l.m8a8_3.index + 1);
						$('#A').html($.k2l.m8a8_3.choicesA[$.k2l.m8a8_3.index]);
						$('#B').html($.k2l.m8a8_3.choicesB[$.k2l.m8a8_3.index]);
						$('#question_text').html($.k2l.m8a8_3.question[$.k2l.m8a8_3.index]);
						$.k2l.m8a8_3.allowClick = true; // Make the buttons clickable again
						// setTimeout(function() {
						// 	$.k2l.m8a8_3.sound.src = $('.buttonaudio').attr('data-audiosrc');
						// 	$.k2l.m8a8_3.sound.play();
						// }, 800);
					}, 1000);
				} else {
					$.k2l.m8a8_3.sound.src = {};
					resetAllAudioButtons();

					setTimeout(function () {
						$.k2l.m8a8_3.allowClick = true; // Make the buttons clickable again
						$("#m8a8_3").addClass('hidden');

						if ($.k2l.m8a8_3.wrongscore < 3) {
							$("#m8a8_good").removeClass('hidden');
							Session.set("activeSection", "#m8a8_good");
						} else {
							$("#m8a8_bad").removeClass('hidden');
							Session.set("activeSection", "#m8a8_bad");
						}
					}, 2000);
				}
			}
		}

	},

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m8a8_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a8_3.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {
		$.k2l.m8a8_3.sound.src = {};
		$.k2l.m8a8_3.index = 0;
		$.k2l.m8a8_3.allowClick = true;
	}

});

Template.m8a8_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a8_3 == 'undefined') {
		$.k2l.m8a8_3 = {};
	};

	$.k2l.m8a8_3.sound = new Audio();

	var questions = ["Keith seems very pleasant to start with because:", "Keith asks about Lorraine's ‘unique gift’ because:", "Lorraine’s ‘unique gift’ is:", "Keith stops smiling because:", "What ‘mistake’ did Lorraine make?", "How did Lorraine react after the interview?", "Claude lists some of Debra’s good qualities because:", "Claude states that:", "Claude’s conclusion about Debra is that:"];


	var questionsaudio = ["/audio/module8/a8/Conversation1.m4a",
		"/audio/module8/a8/Conversation1.m4a",
		"/audio/module8/a8/Conversation1.m4a",
		"/audio/module8/a8/Conversation1.m4a",
		"/audio/module8/a8/Conversation1.m4a",
		"/audio/module8/a8/Conversation1.m4a",
		"/audio/module8/a8/Conversation2.m4a",
		"/audio/module8/a8/Conversation2.m4a",
		"/audio/module8/a8/Conversation2.m4a"
	];

	var answer_index = ["A", "B", "A", "B", "A", "B", "B", "A", "A",];

	var choicesA = ["A) he is deliberately setting a trap for Lorraine.", "A) he is genuinely impressed with Lorraine.", "A) a natural ability to make the right decisions.", "A) he thinks Lorraine has made a genuine mistake.", "A) she gave the wrong information about her employment history.", "A) she wasn’t affected by the experience at all.", "A) he is genuinely impressed with her CV.", "A) Debra is not a good team player.", "A) she would be a difficult person to work with."];

	var choicesB = ["B) he is just a very friendly person.", "B) he wants to lead up to a more difficult question later.", "B) always being right about things.", "B) he thinks Lorraine has been dishonest.", "B) she gave wrong information about where she had worked.", "B) she learned an important lesson for the future.", "B) he is pretending to be impressed with her CV.", "B) Debra works well in a team.", "B) she is very ambitious and hard working."];

	$.k2l.m8a8_3.question = questions;
	$.k2l.m8a8_3.questionsaudio = questionsaudio;
	$.k2l.m8a8_3.answer_index = answer_index;
	$.k2l.m8a8_3.choicesA = choicesA;
	$.k2l.m8a8_3.choicesB = choicesB;
	$.k2l.m8a8_3.index = 0;
	$.k2l.m8a8_3.rightscore = 0;
	$.k2l.m8a8_3.wrongscore = 0;

	Session.set('m8a8_CorrectScore', 0);
	Session.set('m8a8_IncorrectScore', 0);

	$.k2l.m8a8_3.allowClick = true;
}
