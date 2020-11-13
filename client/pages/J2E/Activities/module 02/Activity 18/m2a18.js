

Template.m2a18.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 18, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m2a18.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(2, 18);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 18, subpage);
			oldLocation = location.href;
		}
	}, 500);
	Session.set('m2a18_2RightScore', 0);
	Session.set('m2a18_2WrongScore', 0);

}

Template.m2a18.events({
	'click .try-again': function (evt) {
		$.k2l.m2a18_2.index = 0;
		$.k2l.m2a18_2.rightscore = 0;
		$.k2l.m2a18_2.wrongscore = 0;
		Session.set('m2a18_2RightScore', 0);
		Session.set('m2a18_2WrongScore', 0);
		forceReload();
	}
});

Template.m2a18.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m2a18_end') {
			return false;
		} return true;
	}
});


Template.m2a18.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m2a18_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a18_2");
	},

	rightScore: function () {
		return Session.get('m2a18_2RightScore');
	},

	wrongScore: function () {
		return Session.get('m2a18_2WrongScore');
	}
});

Template.m2a18_2.events({

	// Click Audio Button
	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m2a18_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a18_2.sound, $(evt.currentTarget));
	},

	'click #m2a18_2 .button1': function (evt) {
		evt.preventDefault();

		// Get value of button and the correct answer for this question
		var buttonValue = $(evt.currentTarget).text();
		var correctAnswer = $.k2l.m2a18_2.words[$.k2l.m2a18_2.index][1];

		// Disable clicking
		$("#m2a18_2 .button1").addClass('noclick');



		// Check for correct answer
		if (buttonValue == correctAnswer) {
			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m2a18_2.rightscore++;
			var rightScore = $.k2l.m2a18_2.rightscore;
			var wrongScore = $.k2l.m2a18_2.wrongscore;
			Session.set('m2a18_2RightScore', rightScore);
			Session.set('m2a18_2WrongScore', wrongScore);
		} else {
			$.k2l.m2a18_2.wrongscore++;
			var rightScore = $.k2l.m2a18_2.rightscore;
			var wrongScore = $.k2l.m2a18_2.wrongscore;
			Session.set('m2a18_2RightScore', rightScore);
			Session.set('m2a18_2WrongScore', wrongScore);
			var incorrectText = $.k2l.m2a18_2.words[$.k2l.m2a18_2.index][0] + ' has ' + $.k2l.m2a18_2.words[$.k2l.m2a18_2.index][1] + ' syllables.';
			incorrectText = incorrectText.charAt(0).toUpperCase() + incorrectText.slice(1);
			$('.capwrong').text(incorrectText);
			$('.capwrong').removeClass("hidden");
			setTimeout(function () {
				$('.capwrong').addClass("hidden");
			}, 2000);
		}

		// Autoadvance to next screen
		if ($.k2l.m2a18_2.index < $.k2l.m2a18_2.words.length - 1) {
			$.k2l.m2a18_2.index++;
			setTimeout(function () {
				resetAllAudioButtons();
				$("#audioBtn").attr("data-audiosrc", "/audio/syllables/" + ($.k2l.m2a18_2.words[$.k2l.m2a18_2.index][0]) + ".m4a");
				$('.incorrectscreen').addClass('hidden');
				$('.correctscreen').addClass('hidden');
				$('.numberBig').html($.k2l.m2a18_2.index + 1);
				$("#m2a18_2 .button1").removeClass('noclick');
				setTimeout(function () {
					var audioButton = $('.buttonaudio')[0];
					audioButtonClickSetup($.k2l.m2a18_2.sound, audioButton);
					playPauseAudio($.k2l.m2a18_2.sound, audioButton);
				}, 800);
			}, 1000);
		} else {

			setTimeout(function () {
				$("#m2a18_2").addClass('hidden');
				$.k2l.m2a18_2.index = 0;
				$.k2l.m2a18_2.sound.src = {};
				if ($.k2l.m2a18_2.wrongscore < 8) {
					$("#m2a18_good").removeClass('hidden');
					Session.set("activeSection", "#m2a18_good");
				} else {
					$("#m2a18_bad").removeClass('hidden');
					Session.set("activeSection", "#m2a18_bad");
				}
			}, 2000);
		}

	}


});

Template.m2a18_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	}

	if (typeof $.k2l.m2a18_2 == 'undefined') {
		$.k2l.m2a18_2 = {};
	}

	$.k2l.m2a18_2.sound = new Audio();

	var words = [
		["bottle", 2],
		["offence", 2],
		["explosives", 3],
		["department", 3],
		["indefatigable", 6],
		["parliament", 3],
		["reply", 2],
		["basketball", 3],
		["appreciation", 5],
		["economics", 4],
		["observatory", 4],
		["identical", 4],
		["obviously", 4],
		["refrigerator", 5],
		["incomprehensible", 6],
		["prisoner", 3],
		["professional", 4],
		["autobiographical", 7],
		["electricity", 5],
		["humiliation", 5],
		["understand", 3],
		["totalitarianism", 8],
		["capitalism", 5],
		["station", 2],
		["international", 5],
		["lemonade", 3],
		["bureaucratic", 4],
	];

	$.k2l.m2a18_2.words = words;
	$.k2l.m2a18_2.index = 0;

	$.k2l.m2a18_2.rightscore = 0;
	$.k2l.m2a18_2.wrongscore = 0;

	Session.set('m2a18_2RightScore', 0);
	Session.set('m2a18_2WrongScore', 0);
	// $('#m2a18RightScore').html(Session.get('m2a18_2RightScore'));
	// $('#m2a18WrongScore').html(Session.get('m2a18_2WrongScore'));

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

};

Template.m2a18_summary.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a18_summary");
	}
});

Template.m2a18_summary.events({

	'click .buttonaudio': function (evt) {

		audioButtonClickSetup($.k2l.m2a18_summary.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a18_summary.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m2a18_summary.sound.src = {};
	}

});

Template.m2a18_summary.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a18_summary == 'undefined') {
		$.k2l.m2a18_summary = {};
	};

	$.k2l.m2a18_summary.sound = new Audio();
}



Template.m2a18_end.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a18_end");
	}
});