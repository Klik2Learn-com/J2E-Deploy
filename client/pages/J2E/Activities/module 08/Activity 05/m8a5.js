Template.m8a5.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m8a5_end') {
			return false;
		}
		return true;
	}
});

Template.m8a5.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(8, 5);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 5, subpage);
			oldLocation = location.href;
		}
	}, 500);

}
Template.m8a5_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a5_1");
	}
});

Template.m8a5_1.events({

});

Template.m8a5_1.rendered = function () {
}

Template.m8a5_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a5_2");
	}
});

Template.m8a5_2.events({
	"click .button2": function (evt) {

		if ($.k2l.m8a5_2.allowClick == true) {

			$.k2l.m8a5_2.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m8a5_2.answer_index[$.k2l.m8a5_2.index]) {
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout(function () {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				$.k2l.m8a5_2.rightscore++;
				var rightScore = $.k2l.m8a5_2.rightscore;
				var wrongScore = $.k2l.m8a5_2.wrongscore;

				Session.set('m8a5_2RightScore', rightScore);
				Session.set('m8a5_2WrongScore', wrongScore);

				if ($.k2l.m8a5_2.index < $.k2l.m8a5_2.question.length - 1) {
					$.k2l.m8a5_2.index++;
					setTimeout(function () {
						//$('.buttonaudio').attr("data-audiosrc",$.k2l.m8a5_2.questionsaudio[$.k2l.m8a5_2.index]);
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$('.number').html($.k2l.m8a5_2.index + 1);
						$('#question_text').html($.k2l.m8a5_2.question[$.k2l.m8a5_2.index]);
						$.k2l.m8a5_2.allowClick = true; // Make the buttons clickable again
						// setTimeout(function() {
						// 	$.k2l.m8a5_2.sound.src = $('.buttonaudio').attr("data-audiosrc");
						// 	$.k2l.m8a5_2.sound.play();
						// }, 800);
					}, 1000);
				} else {
					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);

					setTimeout(function () {
						$('#welldonecap').addClass('hidden');
						$("#m8a5_2").addClass('hidden');

						if ($.k2l.m8a5_2.wrongscore < 3) {
							$("#m8a5_good").removeClass('hidden');
							Session.set("activeSection", "#m8a5_good");
						} else {
							$("#m8a5_bad").removeClass('hidden');
							Session.set("activeSection", "#m8a5_bad");
						}
					}, 2000);

					// $('.pagination').removeClass('hidden');
				}
			} else {
				$.k2l.m8a5_2.wrongscore++;
				// incorrect
				var rightScore = $.k2l.m8a5_2.rightscore;
				var wrongScore = $.k2l.m8a5_2.wrongscore;

				Session.set('m8a5_2RightScore', rightScore);
				Session.set('m8a5_2WrongScore', wrongScore);
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);


				if ($.k2l.m8a5_2.index < $.k2l.m8a5_2.question.length - 1) {
					$.k2l.m8a5_2.index++;
					setTimeout(function () {
						//$('.buttonaudio').attr("data-audiosrc",$.k2l.m8a5_2.questionsaudio[$.k2l.m8a5_2.index]);
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$('.number').html($.k2l.m8a5_2.index + 1);
						$('#question_text').html($.k2l.m8a5_2.question[$.k2l.m8a5_2.index]);
						$.k2l.m8a5_2.allowClick = true; // Make the buttons clickable again
						// setTimeout(function() {
						// 	$.k2l.m8a5_2.sound.src = $('.buttonaudio').attr('data-audiosrc');
						// 	$.k2l.m8a5_2.sound.play();
						// }, 800);
					}, 1000);
				} else {
					// $.k2l.m8a5_2.sound.src = {};
					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);

					setTimeout(function () {
						$('#welldonecap').addClass('hidden');
						$("#m8a5_2").addClass('hidden');

						if ($.k2l.m8a5_2.wrongscore < 3) {
							$("#m8a5_good").removeClass('hidden');
							Session.set("activeSection", "#m8a5_good");
						} else {
							$("#m8a5_bad").removeClass('hidden');
							Session.set("activeSection", "#m8a5_bad");
						}
					}, 2000);
				}
			}
		}

	},

	// 'click .buttonaudio': function(evt) {
	// 	$.k2l.m8a5_2.sound.src = $(evt.currentTarget).attr('data-audiosrc');
	// 	$.k2l.m8a5_2.sound.play();
	// },

	'click .pagination': function (evt) {
		// $.k2l.m8a5_2.sound.src = {};
		$.k2l.m8a5_2.index = 0;
		$.k2l.m8a5_2.allowClick = true;
	}

});

Template.m8a5_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a5_2 == 'undefined') {
		$.k2l.m8a5_2 = {};
	};

	$.k2l.m8a5_2.sound = new Audio();

	var questions = ["Rob Yeung asks people to think about their schooldays.",
		"He had a summer job when he was a student",
		"He worked for a ship cargo company",
		"He liked the people but not the job.",
		"He enjoys working in a large team of people.",
		"Rob Yeung is a trained psychologist. ",
		"He considers himself to be a computer geek.",
		"The computer he was using went on fire.",
		"You should think about when you were happy in a job.",
		"Reflecting on the past will help you find your ideal job.",
	];


	// var questionsaudio = ["/audio/module2/a1/Statement1.m4a",
	// 				"/audio/module2/a1/Statement2.m4a",
	// 				"/audio/module2/a1/Statement3.m4a", 
	// 				"/audio/module2/a1/Statement4.m4a",
	// 				"/audio/module2/a1/Statement5.m4a",
	// 				"/audio/module2/a1/Statement6.m4a",
	// 				"/audio/module2/a1/Statement7.m4a",
	// 				"/audio/module2/a1/Statement8.m4a",
	// 				"/audio/module2/a1/Statement9.m4a",
	// 				"/audio/module2/a1/Statement10.m4a",
	// 				"/audio/module2/a1/Statement11.m4a",
	// 				"/audio/module2/a1/Statement12.m4a",
	// 				"/audio/module2/a1/Statement13.m4a",
	// 				"/audio/module2/a1/Statement14.m4a",
	// 				"/audio/module2/a1/Statement15.m4a",
	// 				"/audio/module2/a1/Statement16.m4a"					
	// 				];

	var answer_index = ["true", "true", "false", "false", "false", "true", "true", "false", "true", "true"];

	$.k2l.m8a5_2.question = questions;
	// $.k2l.m8a5_2.questionsaudio = questionsaudio;
	$.k2l.m8a5_2.answer_index = answer_index;
	$.k2l.m8a5_2.index = 0;
	$.k2l.m8a5_2.rightscore = 0;
	$.k2l.m8a5_2.wrongscore = 0;

	Session.set('m8a5_2RightScore', 0);
	Session.set('m8a5_2WrongScore', 0);

	$.k2l.m8a5_2.allowClick = true;
}


Template.m8a5_scores.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a5_bad");
	},
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a5_good");
	},
});

Template.m8a5_scores.events({

	"click #m8a5restart": function (evt) {
		if (typeof $.k2l != 'undefined') {
			if (typeof $.k2l.m8a5_2 != 'undefined') {
				if (typeof $.k2l.m8a5_2.index != 'undefined') {
					$.k2l.m8a5_2.index = 0;
				}
				if (typeof $.k2l.m8a5_2.rightscore != 'undefined') {
					$.k2l.m8a5_2.rightscore = 0;
				}
				if (typeof $.k2l.m8a5_2.wrongscore != 'undefined') {
					$.k2l.m8a5_2.wrongscore = 0;
				}
			}
		}
		Session.set('m8a5_2RightScore', 0);
		Session.set('m8a5_2WrongScore', 0);
		// $('#m8a5_2RightScore').html(Session.get('m8a5_2RightScore'));
		// $('#m8a5_2RightScore').html(Session.get('m8a5_2RightScore'));
		$.k2l.m8a5_2.allowClick = true;
		forceReload();
	}
});

Template.m8a5.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 5, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a5.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
