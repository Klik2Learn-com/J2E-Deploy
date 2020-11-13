Template.m8a26.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m8a26_end') {
			return false;
		}
		return true;
	}
});

Template.m8a26.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(8, 26);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 26, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m8a26.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 26, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a26.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m8a26_3.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m8a26_good");
	},
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m8a26_bad");
	}
});


Template.m8a26_3.events({

	"click #m8a26restart": function (evt) {
		if (typeof $.k2l != 'undefined') {
			if (typeof $.k2l.m8a26_2 != 'undefined') {
				if (typeof $.k2l.m8a26_2.index != 'undefined') {
					$.k2l.m8a26_2.index = 0;
				}
				if (typeof $.k2l.m8a26_2.rightscore != 'undefined') {
					$.k2l.m8a26_2.rightscore = 0;
				}
				if (typeof $.k2l.m8a26_2.wrongscore != 'undefined') {
					$.k2l.m8a26_2.wrongscore = 0;
				}
			}
		}
		Session.set('m8a26_2RightScore', 0);
		Session.set('m8a26_2WrongScore', 0);
		// $('#m8a26CorrectScore').html(Session.get('m8a26CorrectScore'));
		// $('#m8a26IncorrectScore').html(Session.get('m8a26IncorrectScore'));
		$.k2l.m8a26_2.allowClick = true;
		forceReload();
	}
});

Template.m8a26_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a26_1");
	}
});

Template.m8a26_1.events({

	'click .button1': function (evt) {
		audioButtonClickSetup($.k2l.m8a26_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a26_1.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m8a26_1.sound.src = {};
	}

});

Template.m8a26_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a26_1 == 'undefined') {
		$.k2l.m8a26_1 = {};
	};

	$.k2l.m8a26_1.sound = new Audio();
}

Template.m8a26_2.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m8a26_2");
	},

	rightScore: function () {
		return Session.get('m8a26_2RightScore');
	},

	wrongScore: function () {
		return Session.get('m8a26_2WrongScore');
	}
})


Template.m8a26_2.events({
	"click .button2": function (evt) {

		if ($.k2l.m8a26_2.allowClick == true) {

			$.k2l.m8a26_2.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m8a26_2.answer_index[$.k2l.m8a26_2.index]) {
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout(function () {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				$.k2l.m8a26_2.rightscore++;
				var rightScore = $.k2l.m8a26_2.rightscore;
				var wrongScore = $.k2l.m8a26_2.wrongscore;

				Session.set('m8a26_2RightScore', rightScore);
				Session.set('m8a26_2WrongScore', wrongScore);

				if ($.k2l.m8a26_2.index < $.k2l.m8a26_2.question.length - 1) {
					$.k2l.m8a26_2.index++;
					setTimeout(function () {
						$('.buttonaudio').attr("data-audiosrc", $.k2l.m8a26_2.questionsaudio[$.k2l.m8a26_2.index]);
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$('.number').html($.k2l.m8a26_2.index + 1);
						$('#question_text').html($.k2l.m8a26_2.question[$.k2l.m8a26_2.index]);
						$.k2l.m8a26_2.allowClick = true; // Make the buttons clickable again
						setTimeout(function () {
							$.k2l.m8a26_2.sound.src = $('.buttonaudio').attr("data-audiosrc");
							$.k2l.m8a26_2.sound.play();
						}, 800);
					}, 1000);
				} else {
					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);

					setTimeout(function () {
						$('#welldonecap').addClass('hidden');
						$("#m8a26_2").addClass('hidden');
						$.k2l.m8a26_2.sound.src = {};
						if ($.k2l.m8a26_2.wrongscore < 3) {
							$("#m8a26_good").removeClass('hidden');
							Session.set("activeSection", "#m8a26_good");
						} else {
							$("#m8a26_bad").removeClass('hidden');
							Session.set("activeSection", "#m8a26_bad");
						}
					}, 2000);

					// $('.pagination').removeClass('hidden');
				}
			} else {
				$.k2l.m8a26_2.wrongscore++;
				// incorrect
				var rightScore = $.k2l.m8a26_2.rightscore;
				var wrongScore = $.k2l.m8a26_2.wrongscore;

				Session.set('m8a26_2RightScore', rightScore);
				Session.set('m8a26_2WrongScore', wrongScore);
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);


				if ($.k2l.m8a26_2.index < $.k2l.m8a26_2.question.length - 1) {
					$.k2l.m8a26_2.index++;
					setTimeout(function () {
						$('.buttonaudio').attr("data-audiosrc", $.k2l.m8a26_2.questionsaudio[$.k2l.m8a26_2.index]);
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$('.number').html($.k2l.m8a26_2.index + 1);
						$('#question_text').html($.k2l.m8a26_2.question[$.k2l.m8a26_2.index]);
						$.k2l.m8a26_2.allowClick = true; // Make the buttons clickable again
						setTimeout(function () {
							$.k2l.m8a26_2.sound.src = $('.buttonaudio').attr('data-audiosrc');
							$.k2l.m8a26_2.sound.play();
						}, 800);
					}, 1000);
				} else {
					$.k2l.m8a26_2.sound.src = {};
					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);

					setTimeout(function () {
						$('#welldonecap').addClass('hidden');
						$("#m8a26_2").addClass('hidden');
						$.k2l.m8a26_2.sound.src = {};
						if ($.k2l.m8a26_2.wrongscore < 3) {
							$("#m8a26_good").removeClass('hidden');
							Session.set("activeSection", "#m8a26_good");
						} else {
							$("#m8a26_bad").removeClass('hidden');
							Session.set("activeSection", "#m8a26_bad");
						}
					}, 2000);
				}
			}
		}

	},

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m8a26_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a26_2.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {
		$.k2l.m8a26_2.sound.src = {};
		$.k2l.m8a26_2.index = 0;
		$.k2l.m8a26_2.allowClick = true;
	}

});

Template.m8a26_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a26_2 == 'undefined') {
		$.k2l.m8a26_2 = {};
	};

	$.k2l.m8a26_2.sound = new Audio();

	var questions = ["“People are happier now than they were in the 1950s.”",
		"“Technology has been more of a disadvantage than an advantage.”",
		"“More people worked part time in the 1950s.”",
		"“People work longer hours today.”",
		"“A lot of jobs in manufacturing have disappeared.”",
		"“Two thirds of women have jobs today.”",
		"“More young people had jobs in the 1950s.”"];

	var questionsaudio = ["/audio/module8/a26/Para_1.m4a",
		"/audio/module8/a26/Para_2.m4a",
		"/audio/module8/a26/Para_3.m4a",
		"/audio/module8/a26/Para_4.m4a",
		"/audio/module8/a26/Para_5.m4a",
		"/audio/module8/a26/Para_6.m4a",
		"/audio/module8/a26/Para_7.m4a"
	];

	var answer_index = ["false", "true", "false", "false", "true", "true", "true"];

	$.k2l.m8a26_2.question = questions;
	$.k2l.m8a26_2.questionsaudio = questionsaudio;
	$.k2l.m8a26_2.answer_index = answer_index;
	$.k2l.m8a26_2.index = 0;
	$.k2l.m8a26_2.rightscore = 0;
	$.k2l.m8a26_2.wrongscore = 0;

	Session.set('m8a26_2RightScore', 0);
	Session.set('m8a26_2WrongScore', 0);

	$.k2l.m8a26_2.allowClick = true;
}
