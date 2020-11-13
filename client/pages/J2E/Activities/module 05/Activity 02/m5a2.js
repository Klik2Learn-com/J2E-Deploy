

Template.m5a2.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m5a2_end') {
			return false;
		} return true;
	}
});

Template.m5a2.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(5, 2);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(5, 2, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m5a2.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 5, 2, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m5a2.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m5_tv.events({

	// When link in the dropdown list is clicked, unhide the appropriate div and hide the rest
	'click a.tvshow': function (evt) {
		userChoice = '';
		$('.programme').addClass('hidden');
		userChoice = $(evt.currentTarget).attr('href');
		$(userChoice).removeClass('hidden');

	}

});

Template.m5_tv.rendered = function () {

	var userChoice = '';

};


Template.m5a2_1.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m5a2_1");
	}
});

Template.m5a2_2.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m5a2_2");
	},

	rightScore: function () {
		return Session.get('m5a2_2RightScore');
	},

	wrongScore: function () {
		return Session.get('m5a2_2WrongScore');
	}
});

Template.m5a2_2.events({
	// When True or False is clicked
	"click .ddwidth9": function (evt) {
		// Accept the click if allowed, then disable clicking until logic is complete
		if ($.k2l.m5a2_2.allowClick === true) {

			$.k2l.m5a2_2.allowClick = false;

			// If the answer is correct
			if ($(evt.currentTarget).attr('id') == $.k2l.m5a2_2.answer_index[$.k2l.m5a2_2.index]) {
				// Show the tick
				$('.correctscreen').removeClass('hidden');
				setTimeout(function () {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				// Increase the score
				$.k2l.m5a2_2.rightscore++;

				// Update the Right and Wrong Scores then set these to update the Scorebox
				var rightScore = $.k2l.m5a2_2.rightscore;
				var wrongScore = $.k2l.m5a2_2.wrongscore;
				Session.set('m5a2_2RightScore', rightScore);
				Session.set('m5a2_2WrongScore', wrongScore);

				// If this is not the last question
				if ($.k2l.m5a2_2.index < $.k2l.m5a2_2.questions.length - 1) {
					// Load the next question
					$.k2l.m5a2_2.index++;
					setTimeout(function () {
						//$('.buttonaudio').attr("data-audiosrc",$.k2l.m5a2_2.questionsaudio[$.k2l.m5a2_2.index]);
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$('.number').html($.k2l.m5a2_2.index + 1);
						$('#question_text').html($.k2l.m5a2_2.questions[$.k2l.m5a2_2.index]);

						// Make the buttons clickable again
						$.k2l.m5a2_2.allowClick = true;

						// Automatically play the new audio
						/*setTimeout(function() {
							$.k2l.m5a2_2.sound.src = $('.buttonaudio').attr("data-audiosrc");
							$.k2l.m5a2_2.sound.play();
						}, 800);*/
					}, 1000);

					// If this is the last question
				} else {
					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);

					setTimeout(function () {
						$('#welldonecap').addClass('hidden');
						$("#m5a2_2").addClass('hidden');

						// Show either the good or bad result page depending on user's score
						if ($.k2l.m5a2_2.wrongscore < 3) {
							$("#m5a2_good").removeClass('hidden');
							Session.set("activeSection", "#m5a2_good");
						} else {
							$("#m5a2_bad").removeClass('hidden');
							Session.set("activeSection", "#m5a2_bad");
						}
					}, 2000);

					// $('.pagination').removeClass('hidden');
				}

				// If the answer is wrong
			} else {
				$.k2l.m5a2_2.wrongscore++;

				// Assign the correct scores and set the scorebox values to these scores
				var rightScore = $.k2l.m5a2_2.rightscore;
				var wrongScore = $.k2l.m5a2_2.wrongscore;
				Session.set('m5a2_2RightScore', rightScore);
				Session.set('m5a2_2WrongScore', wrongScore);

				// Show the cross
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);


				if ($.k2l.m5a2_2.index < $.k2l.m5a2_2.questions.length - 1) {
					$.k2l.m5a2_2.index++;
					setTimeout(function () {
						//$('.buttonaudio').attr("data-audiosrc",$.k2l.m5a2_2.questionsaudio[$.k2l.m5a2_2.index]);
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$('.number').html($.k2l.m5a2_2.index + 1);
						$('#question_text').html($.k2l.m5a2_2.questions[$.k2l.m5a2_2.index]);
						$.k2l.m5a2_2.allowClick = true; // Make the buttons clickable again
						/*setTimeout(function() {
							$.k2l.m5a2_2.sound.src = $('.buttonaudio').attr('data-audiosrc');
							$.k2l.m5a2_2.sound.play();
						}, 800);*/
					}, 1000);
				} else {
					//$.k2l.m5a2_2.sound.src = {};
					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);

					setTimeout(function () {
						$('#welldonecap').addClass('hidden');
						$("#m5a2_2").addClass('hidden');

						if ($.k2l.m5a2_2.wrongscore < 3) {
							$("#m5a2_good").removeClass('hidden');
							Session.set("activeSection", "#m5a2_good");
						} else {
							$("#m5a2_bad").removeClass('hidden');
							Session.set("activeSection", "#m5a2_bad");
						}
					}, 2000);
				}
			}
		}

		$('#m5a2_2RightScore').html(Session.get('m5a2_2RightScore'));
		$('#m5a2_2WrongScore').html(Session.get('m5a2_2WrongScore'));

	},

	/*'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m5a2_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m5a2_2.sound, $(evt.currentTarget));
	},*/

	'click .pagination': function (evt) {
		//$.k2l.m5a2_2.sound.src = {};
		$.k2l.m5a2_2.index = 0;
		$.k2l.m5a2_2.allowClick = true;
	}

});

Template.m5a2_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	}

	if (typeof $.k2l.m5a2_2 == 'undefined') {
		$.k2l.m5a2_2 = {};
	}

	//$.k2l.m5a2_2.sound = new Audio();

	var questions = ["<i>Emmerdale</i> is a documentary.",
		"<i>University Challenge</i> is a Game Show.",
		"<i>Holby City</i> is a drama.",
		"<i>The X Factor</i> is a chat show.",
		"<i>The Simpsons</i> is a cartoon.",
		"<i>Live at the Apollo</i> is a chat show.",
		"<i>The Graham Norton Show</i> is a sitcom.",
		"<i>Dad's Army</i> is a documentary.",
		"<i>Life on Earth</i> is a documentary.",
		"<i>The X Factor</i> is a reality TV show.",
		"<i>Mock the Week</i> is a sitcom.",
		"<i>Game of Thrones</i> is a drama.",
		"<i>Sunday Night Football</i> is a sports programme."];


	/*var questionsaudio = ["/audio/module2/a1/Statement1.m4a",
					"/audio/module2/a1/Statement2.m4a",
					"/audio/module2/a1/Statement3.m4a",
					"/audio/module2/a1/Statement4.m4a",
					"/audio/module2/a1/Statement5.m4a",
					"/audio/module2/a1/Statement6.m4a",
					"/audio/module2/a1/Statement7.m4a",
					"/audio/module2/a1/Statement8.m4a",
					"/audio/module2/a1/Statement9.m4a",
					"/audio/module2/a1/Statement10.m4a",
					"/audio/module2/a1/Statement11.m4a",
					"/audio/module2/a1/Statement12.m4a",
					"/audio/module2/a1/Statement13.m4a"
				]; */

	var answer_index = ["false", "true", "true", "false", "true", "false", "false", "false", "true", "true", "false", "true", "true"];

	$.k2l.m5a2_2.questions = questions;
	//$.k2l.m5a2_2.questionsaudio = questionsaudio;
	$.k2l.m5a2_2.answer_index = answer_index;
	$.k2l.m5a2_2.index = 0;

	$.k2l.m5a2_2.rightscore = 0;
	$.k2l.m5a2_2.wrongscore = 0;

	Session.set('m5a2_2RightScore', 0);
	Session.set('m5a2_2WrongScore', 0);
	$('#m5a2_2RightScore').html(Session.get('m5a2_2RightScore'));
	$('#m5a2_2WrongScore').html(Session.get('m5a2_2WrongScore'));

	$.k2l.m5a2_2.allowClick = true;
};


Template.m5a2_end.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a2_end");
	}
});

Template.m5a2.events({

	"click .restart": function (evt) {

		if (typeof $.k2l != 'undefined') {
			if (typeof $.k2l.m5a2_2 != 'undefined') {
				if (typeof $.k2l.m5a2_2.index != 'undefined') {
					$.k2l.m5a2_2.index = 0;
				}
				if (typeof $.k2l.m5a2_2.rightscore != 'undefined') {
					$.k2l.m5a2_2.rightscore = 0;
				}
				if (typeof $.k2l.m5a2_2.wrongscore != 'undefined') {
					$.k2l.m5a2_2.wrongscore = 0;
				}
			}
		}

		Session.set('m5a2_2RightScore', 0);
		Session.set('m5a2_2WrongScore', 0);
		$('#m5a2_2RightScore').html(Session.get('m5a2_2RightScore'));
		$('#m5a2_2WrongScore').html(Session.get('m5a2_2WrongScore'));
		$.k2l.m5a2_2.allowClick = true;
		forceReload();
	}

});


Template.m5a2_good.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m5a2_good");
	}
});

Template.m5a2_bad.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m5a2_bad");
	}
});