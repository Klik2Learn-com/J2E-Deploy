Template.m2a19.events({

	'click a[data-function="restart"]': function (evt) {

		$("#m2a19_1 .button1").removeClass('noclick');
		$.k2l.m2a19_1.index = 0;
		$.k2l.m2a19_1.rightscore = 0;
		$.k2l.m2a19_1.wrongscore = 0;
		Session.set("activeSection", "#m2a4");
		Session.set("m2a19_1RightScore", $.k2l.m2a19_1.rightscore);
		Session.set("m2a19_1WrongScore", $.k2l.m2a19_1.wrongscore);
	}
});

Template.m2a19.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m2a19_end') {
			return false;
		} return true;
	}
});

Template.m2a19.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(2, 19);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 19, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m2a19.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 19, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m2a19.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m2a19_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a19_1");
	},

	rightScore: function () {
		return Session.get('m2a19_1RightScore');
	},

	wrongScore: function () {
		return Session.get('m2a19_1WrongScore');
	}
});

Template.m2a19_1.events({

	'click .pagination.next': function (evt) {
		$.k2l.m2a19_1.index = 0;
		$.k2l.m2a19_1.rightscore = 0;
		$.k2l.m2a19_1.wrongscore = 0;

		Session.set("m2a19_1RightScore", $.k2l.m2a19_1.rightscore);
		Session.set("m2a19_1WrongScore", $.k2l.m2a19_1.wrongscore);
	},

	// Click Audio Button
	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m2a19_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a19_1.sound, $(evt.currentTarget));
	},

	'click #m2a19_1 .button1': function (evt) {
		// Get value of button and the correct answer for this question
		var buttonValue = $(evt.currentTarget).text();
		var correctAnswer = $.k2l.m2a19_1.words[$.k2l.m2a19_1.index][1];

		// Disable clicking
		$("#m2a19_1 .button1").addClass('noclick');


		// Check for correct answer
		if (buttonValue == correctAnswer) {

			$.k2l.m2a19_1.rightscore++;
			$('#m2a19_1RightScore').html($.k2l.m2a19_1.rightscore);

			Session.set("m2a19_1RightScore", $.k2l.m2a19_1.rightscore);
			Session.set("m2a19_1WrongScore", $.k2l.m2a19_1.wrongscore);

			var correctText = '<div class="correctbig"><i class="fa fa-check"></i></div> <span style="font-size:1.5em;">' + $.k2l.m2a19_1.answers[$.k2l.m2a19_1.index] + "</span>";
			//correctText = correctText.charAt(0).toUpperCase() + correctText.slice(1);
			$('.capright').html(correctText);
			$('.capright').removeClass("hidden");
			setTimeout(function () {
				$('.capright').addClass("hidden");
			}, 2500);
		}
		else {

			$.k2l.m2a19_1.wrongscore++;
			$('#m2a19_1WrongScore').html($.k2l.m2a19_1.wrongscore);

			Session.set("m2a19_1RightScore", $.k2l.m2a19_1.rightscore);
			Session.set("m2a19_1WrongScore", $.k2l.m2a19_1.wrongscore);

			var incorrectText = '<div class="incorrectbig"><i class="fa fa-close"></i></div> <span style="font-size:1.5em;">' + $.k2l.m2a19_1.answers[$.k2l.m2a19_1.index] + "</span>";
			//	incorrectText = incorrectText.charAt(0).toUpperCase() + incorrectText.slice(1);
			$('.capwrong').html(incorrectText);
			$('.capwrong').removeClass("hidden");
			setTimeout(function () {
				$('.capwrong').addClass("hidden");
			}, 2500);
		}

		// Autoadvance to next screen

		if ($.k2l.m2a19_1.index < $.k2l.m2a19_1.words.length - 1) {
			$.k2l.m2a19_1.index++;
			setTimeout(function () {
				resetAllAudioButtons();
				$("#m2a19Audio").attr("data-audiosrc", "/audio/syllables/" + ($.k2l.m2a19_1.words[$.k2l.m2a19_1.index][0]) + ".m4a");
				$('.incorrectscreen').addClass('hidden');
				$('.correctscreen').addClass('hidden');
				$('.numberBig').html($.k2l.m2a19_1.index + 1);
				$("#m2a19_1 .button1").removeClass('noclick');
				setTimeout(function () {
					var audioButton = $('.buttonaudio')[0];
					audioButtonClickSetup($.k2l.m2a19_1.sound, audioButton);
					playPauseAudio($.k2l.m2a19_1.sound, audioButton);
				}, 800);
			}, 1500);
		} else {

			setTimeout(function () {
				$("#m2a19_1").addClass('hidden');
				$.k2l.m2a19_1.index = 0;
				$.k2l.m2a19_1.sound.src = {};
				if ($.k2l.m2a19_1.wrongscore < 8) {
					$("#m2a19_good").removeClass('hidden');
					Session.set("activeSection", "#m2a19_good");
				} else {
					$("#m2a19_bad").removeClass('hidden');
					Session.set("activeSection", "#m2a19_bad");
				}
			}, 2000);
		}

	}


});

Template.m2a19_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	}

	if (typeof $.k2l.m2a19_1 == 'undefined') {
		$.k2l.m2a19_1 = {};
	}

	$.k2l.m2a19_1.sound = new Audio();

	var words = [
		["bottle", 1],
		["department", 2],
		["economics", 3],
		["discriminatory", 4],
		["lemonade", 3],
		["parliament", 1],
		["station", 1],
		["oversimplification", 6],
		["appreciation", 4],
		["international", 3],
		["observatory", 2],
		["understand", 3],
		["reply", 2],
		["obviously", 1],
		["indefatigable", 3],
		["autobiographical", 5],
		["offence", 2],
		["supernumerary", 3],
		["humiliation", 4],
		["totalitarianism", 4],
		["refrigerator", 2],
		["identical", 2],
		["telecommunication", 6],
		["professional", 2],
		["electricity", 3],
		["explosives", 2],
		["superficiality", 5],
		["basketball", 1],
		["circumnavigation", 5],
		["revitalisation", 5],
		["internationalisation", 7],
		["bureaucratic", 3],
		["incomprehensible", 4],
		["prisoner", 1],
		["capitalism", 1],
	];

	var answers = [
		['<span class="correctword">bo</span>ttle'],
		["de<span class='correctword'>part</span>ment"],
		["eco<span class='correctword'>no</span>mics"],
		["discrimi<span class='correctword'>na</span>tory"],
		["lemon<span class='correctword'>ade</span>"],
		["<span class='correctword'>par</span>liament"],
		["<span class='correctword'>sta</span>tion"],
		["oversimplifi<span class='correctword'>ca</span>tion"],
		["appreci<span class='correctword'>a</span>tion"],
		["inter<span class='correctword'>nat</span>ional"],
		["ob<span class='correctword'>ser</span>vatory"],
		["under<span class='correctword'>stand</span>"],
		["re<span class='correctword'>ply</span>"],
		["<span class='correctword'>ob</span>viously"],
		["inde<span class='correctword'>fa</span>tigable"],
		["autobio<span class='correctword'>gra</span>phical"],
		["o<span class='correctword'>ffence</span>"],
		["super<span class='correctword'>nu</span>merary"],
		["humili<span class='correctword'>a</span>tion"],
		["totali<span class='correctword'>ta</span>rianism"],
		["re<span class='correctword'>fri</span>gerator"],
		["i<span class='correctword'>dent</span>ical"],
		["telecommuni<span class='correctword'>ca</span>tion"],
		["pro<span class='correctword'>fess</span>ional"],
		["elec<span class='correctword'>tri</span>city"],
		["ex<span class='correctword'>plo</span>sives"],
		["superfici<span class='correctword'>a</span>lity"],
		["<span class='correctword'>ba</span>sketball"],
		["circumnavi<span class='correctword'>ga</span>tion"],
		["revitalis<span class='correctword'>a</span>tion"],
		["internationalis<span class='correctword'>a</span>tion"],
		["bureau<span class='correctword'>cra</span>tic"],
		["incompre<span class='correctword'>hen</span>sible"],
		["<span class='correctword'>pri</span>soner"],
		["<span class='correctword'>ca</span>pitalism"]
	];

	$.k2l.m2a19_1.answers = answers;
	$.k2l.m2a19_1.words = words;
	$.k2l.m2a19_1.index = 0;

	$.k2l.m2a19_1.rightscore = 0;
	$.k2l.m2a19_1.wrongscore = 0;

	Session.set('m2a19_1RightScore', 0);
	Session.set('m2a19_1WrongScore', 0);

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

};


Template.m2a19_2.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a19_2");
	}
})

Template.m2a19_2.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m2a19_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a19_2.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m2a19_2.sound.src = {};
	}

});

Template.m2a19_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a19_2 == 'undefined') {
		$.k2l.m2a19_2 = {};
	};

	$.k2l.m2a19_2.sound = new Audio();
}

Template.m2a19_bad.helpers({

	rightScore: function () {
		return Session.get('m2a19_1RightScore');
	},

	wrongScore: function () {
		return Session.get('m2a19_1WrongScore');
	}
});

Template.m2a19_bad.events({

	"click #m2a19_bad .reTry": function (evt) {
		evt.preventDefault();
		// Click this button to reset activity 4
		$.k2l.m2a19_1.index = 0;
		$.k2l.m2a19_1.rightscore = 0;
		$.k2l.m2a19_1.wrongscore = 0;

		Session.set("activeSection", "#m2a19_1");
		Session.set("m2a19_1RightScore", $.k2l.m2a19_1.rightscore);
		Session.set("m2a19_1WrongScore", $.k2l.m2a19_1.wrongscore);

		$("#m2a19_bad").addClass('hidden');
		$("#m2a19").removeClass('hidden');

		$.k2l.m2a19_1.index = 0;
		$.k2l.m2a19_1.sound.src = {};
		forceReload();
	}
})


Template.m2a19_good.helpers({

	rightScore: function () {
		return Session.get('m2a19_1RightScore');
	},

	wrongScore: function () {
		return Session.get('m2a19_1WrongScore');
	}
});

Template.m2a19_good.events({

	'click .pagination.next': function (evt) {
		$.k2l.m2a19_1.index = 0;
		$.k2l.m2a19_1.rightscore = 0;
		$.k2l.m2a19_1.wrongscore = 0;

		Session.set("m2a19_1RightScore", $.k2l.m2a19_1.rightscore);
		Session.set("m2a19_1WrongScore", $.k2l.m2a19_1.wrongscore);
	}
});

