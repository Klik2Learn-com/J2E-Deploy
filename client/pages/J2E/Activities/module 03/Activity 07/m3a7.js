Template.m3a7.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m3a7_end') {
			return false;
		} return true;
	}
});

Template.m3a7.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(3, 7);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(3, 7, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m3a7.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 3, 7, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m3a7.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


Template.m3a7_1.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a7_1");
	}
})


Template.m3a7_2.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a7_2");
	},

	rightScore: function () {
		return Session.get('m3a7_2RightScore');
	},

	wrongScore: function () {
		return Session.get('m3a7_2WrongScore');
	}
});


Template.m3a7_2.events({

	// Click Audio Button
	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m3a7_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a7_2.sound, $(evt.currentTarget));
	},

	// User clicks an answer
	"click #m3a7_2 .button1, click #m3a7_2 .button2": function (evt) {
		// Get the text belonging to the button that is clicked, also get the correct answer for this question
		var buttonValue = $(evt.currentTarget).text();
		var correctAnswer = $.k2l.m3a7_2.correctAnswers[$.k2l.m3a7_2.index];

		// Is the answer correct?
		if (buttonValue == correctAnswer) {

			// Disable clicking
			$("#m3a7_2 .button1, #m3a7_2 .button2").addClass('noclick');

			// Increase and Display the right score
			$.k2l.m3a7_2.rightscore++;
			var rightScore = $.k2l.m3a7_2.rightscore;
			var wrongScore = $.k2l.m3a7_2.wrongscore;
			Session.set('m3a7_2RightScore', rightScore);
			Session.set('m3a7_2WrongScore', wrongScore);

			// Display a 'well done' message
			$('.correctscreen').removeClass("hidden");
			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			// Autoadvance to next screen
			if ($.k2l.m3a7_2.index < $.k2l.m3a7_2.correctAnswers.length - 1) {
				$.k2l.m3a7_2.index++;
				setTimeout(function () {
					//$.k2l.m3a7_2.sound.src = {};
					resetAllAudioButtons();
					$(".buttonaudio").attr("data-audiosrc", "/audio/module3/a7/" + ($.k2l.m3a7_2.index + 1) + ".m4a");
					$('.incorrectscreen').addClass('hidden');
					$('.correctscreen').addClass('hidden');
					$('.numberBig').html($.k2l.m3a7_2.index + 1);
					$("#m3a7_2 .button1, #m3a7_2 .button2").removeClass('noclick');
					setTimeout(function () {
						var audioButton = $('.buttonaudio')[0];
						audioButtonClickSetup($.k2l.m3a7_2.sound, audioButton);
						playPauseAudio($.k2l.m3a7_2.sound, audioButton);
					}, 800);
				}, 1000);
			} else {
				setTimeout(function () {
					$.k2l.m3a7_2.index = 0;
					$.k2l.m3a7_2.sound.src = {};
					var parentSection = $(evt.currentTarget).parents('section');
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
				}, 2000);
			}
		}
		else {
			// Disable Clicking
			$("#m3a7_2 .button1, #m3a7_2 .button2").addClass('noclick');

			// Increase and Display the wrong score
			$.k2l.m3a7_2.wrongscore++;
			var rightScore = $.k2l.m3a7_2.rightscore;
			var wrongScore = $.k2l.m3a7_2.wrongscore;
			Session.set('m3a7_2RightScore', rightScore);
			Session.set('m3a7_2WrongScore', wrongScore);

			// Display an 'incorrect' message
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);

			// Autoadvance to next screen
			if ($.k2l.m3a7_2.index < 9) {
				$.k2l.m3a7_2.index++;
				setTimeout(function () {
					//$.k2l.m3a7_2.sound.src = {};
					resetAllAudioButtons();
					$(".buttonaudio").attr("data-audiosrc", "/audio/module3/a7/" + ($.k2l.m3a7_2.index + 1) + ".m4a");
					$('.incorrectscreen').addClass('hidden');
					$('.correctscreen').addClass('hidden');
					$('.numberBig').html($.k2l.m3a7_2.index + 1);
					$("#m3a7_2 .button1, #m3a7_2 .button2").removeClass('noclick');
					setTimeout(function () {
						var audioButton = $('.buttonaudio')[0];
						audioButtonClickSetup($.k2l.m3a7_2.sound, audioButton);
						playPauseAudio($.k2l.m3a7_2.sound, audioButton);
					}, 800);
				}, 1000);
			} else {
				setTimeout(function () {
					$.k2l.m3a7_2.index = 0;
					$.k2l.m3a7_2.sound.src = {};
					var parentSection = $(evt.currentTarget).parents('section');
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
				}, 2000);

			}
		}
		// ASSIGN SCORES
		$('#m3a7RightScore').html(Session.get('m3a7_2RightScore'))
		$('#m3a7WrongScore').html(Session.get('m3a7_2WrongScore'))
	},

	"click .pagination": function(evt) {
		$.k2l.m3a7_2.sound.src = {};
	}


});

Template.m3a7_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	}

	if (typeof $.k2l.m3a7_2 == 'undefined') {
		$.k2l.m3a7_2 = {};
	}

	$.k2l.m3a7_2.sound = new Audio();

	var correctAnswers = [
		['the'],
		['There is no missing word'],
		['There is no missing word'],
		['the'],
		['There is no missing word'],
		['There is no missing word'],
		['a'],
		['the'],
		['a'],
		['a']
	];

	$.k2l.m3a7_2.index = 0;
	$.k2l.m3a7_2.correctAnswers = correctAnswers;

	$.k2l.m3a7_2.rightscore = 0;
	$.k2l.m3a7_2.wrongscore = 0;

	Session.set('m3a7_2RightScore', 0);
	Session.set('m3a7_2WrongScore', 0);
	$('#m3a7RightScore').html(Session.get('m3a7_2RightScore'))
	$('#m3a7WrongScore').html(Session.get('m3a7_2WrongScore'))


};


Template.m3a7_4.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a7_4");
	},

	rightScore: function () {
		return Session.get('m3a7_4RightScore');
	},

	wrongScore: function () {
		return Session.get('m3a7_4WrongScore');
	}
});

Template.m3a7_4.events({
	// Click Audio Button
	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m3a7_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a7_4.sound, $(evt.currentTarget));
	},

	// User clicks an answer
	"click #m3a7_4 .button1, click #m3a7_4 .button2": function (evt) {
		// Get the text belonging to the button that is clicked, also get the correct answer for this question
		var buttonValue = $(evt.currentTarget).text();
		var correctAnswer = $.k2l.m3a7_2.correctAnswers[$.k2l.m3a7_4.index];
		// Is the answer correct?
		if (buttonValue == correctAnswer) {
			// Disable clicking
			$("#m3a7_4 .button1, #m3a7_4 .button2").addClass('noclick');
			// Increase and Display the right score
			$.k2l.m3a7_4.rightscore++;
			var rightScore = $.k2l.m3a7_4.rightscore;
			var wrongScore = $.k2l.m3a7_4.wrongscore;
			Session.set('m3a7_4RightScore', rightScore);
			Session.set('m3a7_4WrongScore', wrongScore);

			// Display a 'well done' message
			$('.correctscreen').removeClass("hidden");
			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			// Autoadvance to next screen
			if ($.k2l.m3a7_4.index < $.k2l.m3a7_4.questions.length - 1) {
				$.k2l.m3a7_4.index++;
				setTimeout(function () {
					$.k2l.m3a7_4.sound.src = {}
					resetAllAudioButtons();
					$(".buttonaudio").attr("data-audiosrc", "/audio/module3/a7/" + ($.k2l.m3a7_4.index + 1) + ".m4a");
					$('.incorrectscreen').addClass('hidden');
					$('.correctscreen').addClass('hidden');
					$('.numberBig').html($.k2l.m3a7_4.index + 1);
					$("#m3a7_4 .button1, #m3a7_4 .button2").removeClass('noclick');
					$('.m3a7_4questions').html($.k2l.m3a7_4.questions[$.k2l.m3a7_4.index]);
				}, 1000);
			} else {
				$.k2l.m3a7_4.index = 0;
				$.k2l.m3a7_4.sound.src = {}
				setTimeout(function () {
					var parentSection = $(evt.currentTarget).parents('section');
					$(parentSection).addClass('hidden'); // hide this page
					// $(parentSection).next('section').removeClass('hidden');// reveal next page.
					// document.location.hash = $(parentSection).next('section').attr('id');
					// Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));

					$('#m3a7_6').removeClass('hidden');// reveal next page.
					document.location.hash = $('#m3a7_6').attr('id');
					Session.set("activeSection", '#' + $('#m3a7_6').attr('id'));
				}, 1000);
			}
		}
		else {

			// Disable Clicking
			$("#m3a7_4 .button1, #m3a7_4 .button2").addClass('noclick');

			// Increase and Display the wrong score
			$.k2l.m3a7_4.wrongscore++;
			var rightScore = $.k2l.m3a7_4.rightscore;
			var wrongScore = $.k2l.m3a7_4.wrongscore;
			Session.set('m3a7_4RightScore', rightScore);
			Session.set('m3a7_4WrongScore', wrongScore);

			// Load the correct wrong caption
			$('.wrongcaptions').html($.k2l.m3a7_4.wrongCaptions[$.k2l.m3a7_4.index]);
			// Display an 'incorrect' message
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
				$('.caption').removeClass('hidden');
			}, 1000);

			// Close the caption when X is clicked
			$('.caption').click(function () {
				$('.caption').addClass('hidden');
				$("#m3a7_4 .button1, #m3a7_4 .button2").removeClass('noclick');
			});

			// Autoadvance to next screen
			if ($.k2l.m3a7_4.index < $.k2l.m3a7_4.questions.length - 1) {
				$.k2l.m3a7_4.index++;
				setTimeout(function () {
					$.k2l.m3a7_4.sound.src = {}
					resetAllAudioButtons();
					$(".buttonaudio").attr("data-audiosrc", "/audio/module3/a7/" + ($.k2l.m3a7_4.index + 1) + ".m4a");
					$('.incorrectscreen').addClass('hidden');
					$('.correctscreen').addClass('hidden');
					$('.numberBig').html($.k2l.m3a7_4.index + 1);
					$('.m3a7_4questions').html($.k2l.m3a7_4.questions[$.k2l.m3a7_4.index]);
				}, 1000);
			} else {
				$.k2l.m3a7_4.index = 0;
				$.k2l.m3a7_4.sound.src = {}
				setTimeout(function () {
					var parentSection = $(evt.currentTarget).parents('section');
					$(parentSection).addClass('hidden'); // hide this page
					// $(parentSection).next('section').removeClass('hidden');
					//document.location.hash = $(parentSection).next('section').attr('id');
					// Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));

					$('#m3a7_6').removeClass('hidden'); // reveal next page - temporary line until we get new audio
					document.location.hash = $('#m3a7_6').attr('id');
					Session.set("activeSection", '#' + $('#m3a7_6').attr('id'));
				}, 1000);
			}
		}
	},
});

Template.m3a7_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	}

	if (typeof $.k2l.m3a7_4 == 'undefined') {
		$.k2l.m3a7_4 = {};
	}

	$.k2l.m3a7_4.sound = new Audio();

	var wrongCaptions = [
		['<strong>"Well it’s an unsettled picture as we head towards <span class="correctword">the</span> end of the week."</strong><br><br>The missing word was <b>the</b>.'],
		['<strong>"We’re under the influence of low pressure..."</strong><br><br>There was no missing word.'],
		['<strong>"This weather front pushing northwards is bringing cloud and outbreaks of rain."</strong><br><br>There was no missing word.'],
		['<strong>"<span class="correctword">The</span> rain of course will be heaviest over the borders."</strong><br><br>The missing word was \'<b>the</b>\'.'],
		['<strong>"In the west, rain’ll be lighter and patchier though with maybe a few drier interludes over Dumfries House in Ayrshire."</strong><br><br>There was no missing word.'],
		['<strong>"There’ll be snow for the higher ground of the Highlands and Aberdeenshire..."</strong><br><br>There was no missing word.'],
		['<strong>"The potential for <span class="correctword">a</span> few flurries over Balmoral."</strong><br><br>The missing word was \'<b>a</b>\'.'],
		['<strong>"The best of <span class="correctword">the</span> drier and brighter weather will of course be over the northern isles and the far north of the mainland."</strong><br><br>The missing word was \'<b>the</b>\'.'],
		['<strong>"So <span class="correctword">a</span> little hazy sunshine for the Castle of Mey in Caithness."</strong><br><br>The missing word was \'<b>a</b>\'.'],
		['<strong>"But a cold day everywhere with temperatures of just 8 Celsius and <span class="correctword">the</span> brisk north easterly wind."</strong><br><br>The missing word was \'<b>a</b>\'.']
	];

	var questions = [
		['Well it’s an unsettled picture as we head towards <span class="blankpart"></span> end of the week.'],
		['We’re under the influence of <span class="blankpart"></span> low pressure...'],
		['This weather front pushing northwards is bringing <span class="blankpart"></span> cloud and outbreaks of rain.'],
		['<span class="blankpart"></span> rain of course will be heaviest over the borders.'],
		['In the west, rain’ll be lighter and patchier though with maybe a few drier interludes over <span class="blankpart"></span> Dumfries House in Ayrshire.'],
		['There’ll be snow for the higher ground of the Highlands and <span class="blankpart"></span> Aberdeenshire...'],
		['The potential for <span class="blankpart"></span> few flurries over Balmoral.'],
		['The best of <span class="blankpart"></span> drier and brighter weather will of course be over the northern isles and the far north of the mainland.'],
		['So <span class="blankpart"></span> little hazy sunshine for the Castle of Mey in Caithness.'],
		['But a cold day everywhere with temperatures of just 8 Celsius and <span class="blankpart"></span> brisk north easterly wind.']
	];

	$.k2l.m3a7_4.index = 0;
	$.k2l.m3a7_4.rightscore = 0;
	$.k2l.m3a7_4.wrongscore = 0;
	$.k2l.m3a7_4.wrongCaptions = wrongCaptions;
	$.k2l.m3a7_4.questions = questions;

	Session.set('m3a7_4RightScore', 0);
	Session.set('m3a7_4WrongScore', 0);

};


Template.m3a7_5.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a7_5");
	},

	listeningRightScore: function () {
		return Session.get('m3a7_2RightScore');
	},

	listeningWrongScore: function () {
		return Session.get('m3a7_2WrongScore');
	},

	readingRightScore: function () {
		return Session.get('m3a7_4RightScore');
	},

	readingWrongScore: function () {
		return Session.get('m3a7_4WrongScore');
	}

});

Template.m3a7_6.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a7_6");
	},

	readingRightScore: function () {
		return Session.get('m3a7_4RightScore');
	},

	readingWrongScore: function () {
		return Session.get('m3a7_4WrongScore');
	}

});

Template.m3a7_end.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a7_end");
	}
});

Template.m3a7_end.events({

	'click a[data-function="restart"]': function (evt) {

		if (typeof $.k2l != 'undefined') {
			if (typeof $.k2l.m3a7_2 != 'undefined') {
				if (typeof $.k2l.m3a7_2.index != 'undefined') {
					$.k2l.m3a7_2.index = 0;
				}
				if (typeof $.k2l.m3a7_2.rightscore != 'undefined') {
					$.k2l.m3a7_2.rightscore = 0;
				}
				if (typeof $.k2l.m3a7_2.wrongscore != 'undefined') {
					$.k2l.m3a7_2.wrongscore = 0;
				}
			}
			if (typeof $.k2l.m3a7_4 != 'undefined') {
				if (typeof $.k2l.m3a7_4.index != 'undefined') {
					$.k2l.m3a7_4.index = 0;
				}
				if (typeof $.k2l.m3a7_4.rightscore != 'undefined') {
					$.k2l.m3a7_4.rightscore = 0;
				}
				if (typeof $.k2l.m3a7_4.wrongscore != 'undefined') {
					$.k2l.m3a7_4.wrongscore = 0;
				}
			}
		}

		Session.set('m3a7_4RightScore', 0);
		Session.set('m3a7_4WrongScore', 0);
		Session.set('m3a7_2RightScore', 0);
		Session.set('m3a7_2WrongScore', 0);
	},



});

Template.m3a7_end.rendered = function () {

};

