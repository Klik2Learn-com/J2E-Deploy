Template.m8a18.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m8a18_end') {
			return false;
		}
		return true;
	}
});

Template.m8a18.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(8, 18);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 18, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m8a18.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 18, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a18.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m8a18_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a18_2");
	}
});

Template.m8a18_2.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m8a18_good");
	},
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m8a18_bad");
	},
});


Template.m8a18_2.events({

	"click #m8a18restart": function (evt) {
		if (typeof $.k2l != 'undefined') {
			if (typeof $.k2l.m8a18_1 != 'undefined') {
				if (typeof $.k2l.m8a18_1.index != 'undefined') {
					$.k2l.m8a18_1.index = 0;
				}
				if (typeof $.k2l.m8a18_1.rightscore != 'undefined') {
					$.k2l.m8a18_1.rightscore = 0;
				}
				if (typeof $.k2l.m8a18_1.wrongscore != 'undefined') {
					$.k2l.m8a18_1.wrongscore = 0;
				}
			}
		}
		Session.set('m8a18_RightScore', 0);
		Session.set('m8a18_WrongScore', 0);
		// $('#SGscoresCorrectScore').html(Session.get('SGscoresCorrectScore'));
		// $('#SGscoresIncorrectScore').html(Session.get('SGscoresIncorrectScore'));
		$.k2l.m8a18_1.allowClick = true;
		forceReload();
	}
});


Template.m8a18_1.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m8a18_1");
	},

	rightScore: function () {
		return Session.get('m8a18_RightScore');
	},

	wrongScore: function () {
		return Session.get('m8a18_WrongScore');
	}
})

Template.scorebox1.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m8a18_1");
	},

	rightScore: function () {
		return Session.get('m8a18_RightScore');
	},

	wrongScore: function () {
		return Session.get('m8a18_WrongScore');
	}
})

Template.m8a18_1.events({
	"click .button2": function (evt) {

		if ($.k2l.m8a18_1.allowClick == true) {

			$.k2l.m8a18_1.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m8a18_1.answer_index[$.k2l.m8a18_1.index]) {
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout(function () {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				$.k2l.m8a18_1.rightscore++;
				var rightScore = $.k2l.m8a18_1.rightscore;
				var wrongScore = $.k2l.m8a18_1.wrongscore;

				Session.set('m8a18_RightScore', rightScore);
				Session.set('m8a18_WrongScore', wrongScore);

				if ($.k2l.m8a18_1.index < $.k2l.m8a18_1.questionsaudio.length - 1) {
					$.k2l.m8a18_1.index++;
					setTimeout(function () {
						$('.buttonaudio').attr("data-audiosrc", $.k2l.m8a18_1.questionsaudio[$.k2l.m8a18_1.index]);
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$('.number').html($.k2l.m8a18_1.index + 1);
						// $('.question_text').html($.k2l.m8a18_1.question[$.k2l.m8a18_1.index]);
						$.k2l.m8a18_1.allowClick = true; // Make the buttons clickable again
						setTimeout(function() {
							$.k2l.m8a18_1.sound.src = $('.buttonaudio').attr("data-audiosrc");
							playPauseAudio($.k2l.m8a18_1.sound, $('.buttonaudio'));
						}, 800);
					}, 1000);


					//Why is the audio being played before the audio source is changed ??????
					// setTimeout(function () {
					// 	$.k2l.m8a18_1.sound.src = $('.buttonaudio').attr("data-audiosrc");
					// 	$.k2l.m8a18_1.sound.play();
					// }, 800);
				} else {
					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);

					setTimeout(function () {
						$('#welldonecap').addClass('hidden');
						$("#m8a18_1").addClass('hidden');
						$.k2l.m8a18_1.index = 0;
						if ($.k2l.m8a18_1.wrongscore < 8) {
							$("#m8a18_good").removeClass('hidden');
							Session.set("activeSection", "#m8a18_good");
						} else {
							$("#m8a18_bad").removeClass('hidden');
							Session.set("activeSection", "#m8a18_bad");
						}
					}, 2000);

					// $('.pagination').removeClass('hidden');
				}
			} else {
				$.k2l.m8a18_1.wrongscore++;
				// incorrect
				var rightScore = $.k2l.m8a18_1.rightscore;
				var wrongScore = $.k2l.m8a18_1.wrongscore;

				Session.set('m8a18_RightScore', rightScore);
				Session.set('m8a18_WrongScore', wrongScore);
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);


				if ($.k2l.m8a18_1.index < $.k2l.m8a18_1.questionsaudio.length - 1) {
					$.k2l.m8a18_1.index++;
					setTimeout(function () {
						$('.buttonaudio').attr("data-audiosrc", $.k2l.m8a18_1.questionsaudio[$.k2l.m8a18_1.index]);
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$('.number').html($.k2l.m8a18_1.index + 1);
						// $('.question_text').html($.k2l.m8a18_1.question[$.k2l.m8a18_1.index]);
						$.k2l.m8a18_1.allowClick = true; // Make the buttons clickable again
						setTimeout(function() {
							$.k2l.m8a18_1.sound.src = $('.buttonaudio').attr('data-audiosrc');
							playPauseAudio($.k2l.m8a18_1.sound, $('.buttonaudio'));
						}, 800);
					}, 1000);
					// setTimeout(function () {
					// 	$.k2l.m8a18_1.sound.src = $('.buttonaudio').attr("data-audiosrc");
					// 	$.k2l.m8a18_1.sound.play();
					// }, 800);
				} else {
					$.k2l.m8a18_1.sound.src = {};
					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);

					setTimeout(function () {
						$('#welldonecap').addClass('hidden');
						$("#m8a18_1").addClass('hidden');
						$.k2l.m8a18_1.index = 0;
						if ($.k2l.m8a18_1.wrongscore < 3) {
							$("#m8a18_good").removeClass('hidden');
							Session.set("activeSection", "#m8a18_good");
						} else {
							$("#m8a18_bad").removeClass('hidden');
							Session.set("activeSection", "#m8a18_bad");
						}
					}, 2000);
				}
			}
		}

	},

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m8a18_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a18_1.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {
		$.k2l.m8a18_1.sound.src = {};
		$.k2l.m8a18_1.index = 0;
		$.k2l.m8a18_1.allowClick = true;
	}

});

Template.m8a18_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a18_1 == 'undefined') {
		$.k2l.m8a18_1 = {};
	};

	$.k2l.m8a18_1.sound = new Audio();

	// var questions = ["Grain can be an ingredient for energy drinks",
	// 				 "Question 2",
	// 				 "Question 3",
	// 				 "Question 4",
	// 				 "Question 5",];


	var questionsaudio = [
		"/audio/module8/a18/q-your_not_going.m4a",
		"/audio/module8/a18/s-she_didnt_leave.m4a",
		"/audio/module8/a18/s-you_didnt_tell.m4a",
		"/audio/module8/a18/s-he_never_turned.m4a",
		"/audio/module8/a18/q-she_said_that.m4a",
		"/audio/module8/a18/q-they_were_late_again.m4a",
		"/audio/module8/a18/s-thats_his_house.m4a",
		"/audio/module8/a18/q-shes_going_to_ven.m4a",
		"/audio/module8/a18/q-he_got_the_job.m4a",
		"/audio/module8/a18/s-noones_heard_anything.m4a",
		"/audio/module8/a18/q-the_show_was_canceled.m4a",
		"/audio/module8/a18/q-she_went_out.m4a",
		"/audio/module8/a18/s-he_got_the_job.m4a",
		"/audio/module8/a18/s-youre_not_going.m4a",
		"/audio/module8/a18/s-shes_going_to_Venezuela.m4a",
		"/audio/module8/a18/q-thats_his_house.m4a",
		"/audio/module8/a18/q-she_didnt_leave.m4a",
		"/audio/module8/a18/s-they_were_late_again.m4a",
		"/audio/module8/a18/s-she_said_that.m4a",
		"/audio/module8/a18/s-the_show_was_cancelled.m4a",
		"/audio/module8/a18/s-she_went_out_with_him.m4a",
		"/audio/module8/a18/q-he_never_turned_up.m4a",
		"/audio/module8/a18/q-you_didnt_tell_them.m4a",
		"/audio/module8/a18/q-no_ones_heard_anything.m4a",
	];

	var answer_index = ["q", "s", "s", "s", "q", "q", "s", "q", "q", "s", "q", "q", "s", "s", "s", "q", "q", "s", "s", "s", "s", "q", "q", "q"];

	// $.k2l.m8a18_1.question = questions;
	$.k2l.m8a18_1.questionsaudio = questionsaudio;
	$.k2l.m8a18_1.answer_index = answer_index;
	$.k2l.m8a18_1.index = 0;
	$.k2l.m8a18_1.rightscore = 0;
	$.k2l.m8a18_1.wrongscore = 0;

	Session.set('m8a18_RightScore', 0);
	Session.set('m8a18_WrongScore', 0);

	$.k2l.m8a18_1.allowClick = true;
}

Template.m8a18_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a18_3");
	}
});

Template.m8a18_3.events({

	'click .button1': function (evt) {
		audioButtonClickSetup($.k2l.m8a18_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a18_3.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m8a18_3.sound.src = {};
	}

});

Template.m8a18_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a18_3 == 'undefined') {
		$.k2l.m8a18_3 = {};
	};

	$.k2l.m8a18_3.sound = new Audio();
}
