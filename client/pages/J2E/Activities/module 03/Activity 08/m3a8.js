

Template.m3a8.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m3a8_end') {
			return false;
		} return true;
	}
});

Template.m3a8.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(3, 8);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(3, 8, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m3a8.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 3, 8, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m3a8.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m3a8_1.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a8_1");
	}
})

Template.m3a8_1.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m3a8_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a8_1.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m3a8_1.sound.src = {};
	}

});

Template.m3a8_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a8_1 == 'undefined') {
		$.k2l.m3a8_1 = {};
	};

	$.k2l.m3a8_1.sound = new Audio();
}

Template.m3a8_2.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a8_2");
	}
});

Template.m3a8_2.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m3a8_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a8_2.sound, $(evt.currentTarget));
	},

	'click #m3a8_2nextQuestion': function (evt) {
		evt.preventDefault();
		if ($.k2l.m3a8_2.index >= $.k2l.m3a8_2.correctAnswers.length) {
			$.k2l.m3a8_2.index = 0;
			$.k2l.m3a8_2.sound.src = {};
			$('.buttonaudio').removeClass('is-playing');
			$('#transcript').addClass("hidden");
			var parentSection = $(evt.currentTarget).parents('section');
			$(parentSection).addClass('hidden'); // hide this page
			$(parentSection).next('section').removeClass('hidden');// reveal next page.
			document.location.hash = $(parentSection).next('section').attr('id');
			Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
		}
		$('#m3a8_2nextQuestion').addClass("hidden ");
		$('#transcript').addClass("hidden");
		$("#m3a8_2 .caption").html("Sentence " + ($.k2l.m3a8_2.index + 1));
		$("#m3a8_2 .button1").removeClass('noclick');
		$(".buttonaudio").attr("data-audiosrc", "/audio/module3/a8/" + ($.k2l.m3a8_2.index + 1) + ".m4a");
		$.k2l.m3a8_2.sound.src = {};
		$('.buttonaudio').removeClass('is-playing');
	},

	"click #m3a8_2 .button1": function (evt) {
		evt.preventDefault();
		var buttonValue = $(evt.currentTarget).text();
		var correctAnswer = $.k2l.m3a8_2.correctAnswers[$.k2l.m3a8_2.index];

		if ((buttonValue == correctAnswer) && $.k2l.m3a8_2.questionWordLock == false) {
			$.k2l.m3a8_2.questionWordLock = true;
			$("#m3a8_2 .button1").addClass('noclick');
			$('.correctscreen').removeClass("hidden");
			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);
			$("#transcript").html('<div class="caption capgreen">' + $.k2l.m3a8_2.sentences[$.k2l.m3a8_2.index] + '</div>');
			setTimeout(function () {
				$('#transcript').removeClass("hidden");
				$("#m3a8_2nextQuestion").removeClass("hidden pagination");
			}, 1000);
			$.k2l.m3a8_2.index++;
		}
		else if ((buttonValue != correctAnswer) && $.k2l.m3a8_2.questionWordLock == false) {
			$.k2l.m3a8_2.questionWordLock = true;
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
		}
		setTimeout(function () {
			$.k2l.m3a8_2.questionWordLock = false;
		}, 1000);

	}
});

Template.m3a8_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a8_2 == 'undefined') {
		$.k2l.m3a8_2 = {};
	};

	$.k2l.m3a8_2.sound = new Audio();

	var correctAnswers = ["Will",
		"The Present Simple",
		"The Present Simple",
		"The Present Simple",
		"The Present Continuous",
		"Will",
		"Going to",
		"Will"
	];
	var sentences = ["Making preparations <span class='grammar'>will</span> save lives",
		"The panel <span class='grammar'>expects</span> to issue another report",
		"The future <span class='grammar'>gets</span> hotter",
		"We <span class='grammar'>face<b/b> many challenges",
		"Global warming <span class='grammar'>is increasing</span> the risk",
		"The risk <span class='grammar'>will become</span> greater",
		"There<span class='grammar'>’s going to be</span> an increasing number",
		"Citizens <span class='grammar'>will have to</span> learn"
	];

	$.k2l.m3a8_2.index = 0;
	$.k2l.m3a8_2.correctAnswers = correctAnswers;
	$.k2l.m3a8_2.sentences = sentences;

	$.k2l.m3a8_2.questionWordLock = false; //variable to prevent multiple clicks of button
}
