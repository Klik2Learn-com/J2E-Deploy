Template.m3a17.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m3a17_end') {
			return false;
		} return true;
	}
});

Template.m3a17.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(3, 17);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(3, 17, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m3a17.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 3, 17, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m3a17.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m3a17_4.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a17_4");
	}
});

Template.m3a17_4.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m3a17_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a17_4.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m3a17_4.sound.src = {};
	},

	'click #m3a17_4 .button1': function (evt) {
		var buttonValue = $(evt.currentTarget).text();
		var correctAnswer = $.k2l.m3a17_4.correctAnswers[$.k2l.m3a17_4.index];

		if ((buttonValue == correctAnswer) && $.k2l.m3a17_4.questionWordLock == false) {

			$.k2l.m3a17_4.questionWordLock = true;
			$("#m3a17_4 .button1").addClass('noclick');
			$('.correctscreen').removeClass("hidden");
			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1800);
			$.k2l.m3a17_4.index++;

			var audioUrl = "/audio/module3/a17/" + ($.k2l.m3a17_4.index + 1) + ".m4a"

			if ($.k2l.m3a17_4.index >= $.k2l.m3a17_4.correctAnswers.length) {
				$.k2l.m3a17_4.index = 0;
				var parentSection = $(evt.currentTarget).parents('section');
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
			} else {
				setTimeout(function () {
					$("#m3a17_4 .container-fluid h5").html("Sentence " + ($.k2l.m3a17_4.index + 1));
					$("#m3a17_4 .button1").removeClass('noclick');
					$(".buttonaudio.buttonroundbig.buttonround").attr("data-audiosrc", audioUrl);
				}, 1800);

				setTimeout(function () {
					$.k2l.m3a17_4.sound.load();
					resetAllAudioButtons();
					var audioButton = $('.buttonaudio')[0];
					audioButtonClickSetup($.k2l.m3a17_4.sound, audioButton);
					playPauseAudio($.k2l.m3a17_4.sound, audioButton);
				}, 2000);
			}




		} else if ((buttonValue != correctAnswer) && $.k2l.m3a17_4.questionWordLock == false) {
			$.k2l.m3a17_4.questionWordLock = true;
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 2000);
		}
		setTimeout(function () {
			$.k2l.m3a17_4.questionWordLock = false;
		}, 2000);

	}
});

Template.m3a17_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a17_4 == 'undefined') {
		$.k2l.m3a17_4 = {};
	};

	$.k2l.m3a17_4.sound = new Audio();


	var correctAnswers = ["Probability -Present and Future",
		"Probability -Past",
		"Probability -Present and Future",
		"Possibility/Impossibility - Present and Future",
		"Probability -Past",
		"Possibility/Impossibility - Present and Future",
		"Possibility/Impossibility - Past",
		"Possibility/Impossibility - Present and Future",
		"Possibility/Impossibility - Present and Future",
		"Possibility/Impossibility - Past",
		"Possibility/Impossibility - Past"
	];
	var sentences = ["You’ve been travelling all day. You must be tired.",
		"The flight must have been delayed.",
		"It must be amazing to win an Olympic medal.",
		"He might be declared fit to play on Saturday.",
		"You must have misunderstood. He wouldn’t have said that.",
		"It can get very cold there in winter.",
		"I simply could not have tried any harder.",
		"We could have a good harvest this year.",
		"You can’t expect me to believe that.",
		"They may have got lost.",
		"They could easily have won that match."
	];

	$.k2l.m3a17_4.index = 0;
	$.k2l.m3a17_4.correctAnswers = correctAnswers;
	$.k2l.m3a17_4.sentences = sentences;

	$.k2l.m3a17_4.questionWordLock = false; //variable to prevent multiple clicks of button
}

Template.m3a17_5.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a17_5");
	}
})

Template.m3a17_5.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m3a17_5.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a17_5.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m3a17_5.sound.src = {};
	}

});

Template.m3a17_5.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a17_5 == 'undefined') {
		$.k2l.m3a17_5 = {};
	};

	$.k2l.m3a17_5.sound = new Audio();
}
