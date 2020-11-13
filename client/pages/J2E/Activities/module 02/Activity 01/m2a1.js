Template.m2a1.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m2a1_end') {
			return false;
		}
		return true;
	},

})

Template.m2a1.events({

	'click a[data-function="restart"]': function (evt) {
		evt.preventDefault();
		// Click this button to reset activity 1
		$.k2l.m2a1_2.index = 0;
		$.k2l.m2a1_2.rightscore = 0;
		$.k2l.m2a1_2.wrongscore = 0;
		$.k2l.m2a1_2.allowClick = true;
		Session.set("activeSection", "#m2a1_2");
		$("#m2a1_end").addClass('hidden');
		$("#m2a1").removeClass('hidden');
		$(".number").html($.k2l.m2a1_2.index + 1);
		Session.set('m2a1RightScore', 0);
		Session.set('m2a1WrongScore', 0);
		forceReload();
	}
})

Template.m2a1.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(2, 1);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 1, subpage);
			oldLocation = location.href;
		}
	}, 500);
}

Template.m2a1.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 1, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m2a1.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


Template.m2a1_bad.helpers({
	rightScore: function () {
		return Session.get('m2a1RightScore');
	},

	wrongScore: function () {
		return Session.get('m2a1WrongScore');
	}
})

Template.m2a1_bad.events({

	"click .button1": function (evt) {
		// Click this button to reset activity 1
		evt.preventDefault();
		$.k2l.m2a1_2.index = 0;
		$.k2l.m2a1_2.rightscore = 0;
		$.k2l.m2a1_2.wrongscore = 0;
		$.k2l.m2a1_2.allowClick = true;
		Session.set("activeSection", "#m2a1_2");
		$("#m2a1_bad").addClass('hidden');
		$("#m2a1_2").removeClass('hidden');
		$(".number").html($.k2l.m2a1_2.index + 1);
		Session.set('m2a1RightScore', 0);
		Session.set('m2a1WrongScore', 0);
		forceReload();
	}
})

Template.m2a1_good.helpers({
	rightScore: function () {
		return Session.get('m2a1RightScore');
	},

	wrongScore: function () {
		return Session.get('m2a1WrongScore');
	}
})

Template.m2a1_good.rendered = function () {}

Template.m2a1_1.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a1_1");
	}
})

Template.m2a1_1.events({
	'click .pagination': function (evt) {

		$.k2l.m2a1shops.sound.src = {};
	}
})

Template.m2a1shops.events({

	'click img': function (evt) {
		audioButtonClickSetup($.k2l.m2a1shops.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a1shops.sound, $(evt.currentTarget));
	},

	"click .button2": function (evt) {
		$.k2l.m2a1shops.sound.src = {};
	}

});

Template.m2a1shops.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a1shops == 'undefined') {
		$.k2l.m2a1shops = {};
	};

	$.k2l.m2a1shops.sound = new Audio();
}

Template.m2a1_2.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a1_2");
	},

	rightScore: function () {
		return Session.get('m2a1RightScore');
	},

	wrongScore: function () {
		return Session.get('m2a1WrongScore');
	}
})

Template.m2a1_2.events({
	"click .button2": function (evt) {
		evt.preventDefault();

		if ($.k2l.m2a1_2.allowClick == true) {
			$.k2l.m2a1_2.sound.src = {};
			pauseAudio($.k2l.m2a1_2.sound, $(".buttonaudio.m2a2item")[0]);
			$.k2l.m2a1_2.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m2a1_2.answer_index[$.k2l.m2a1_2.index]) {
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout(function () {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				$.k2l.m2a1_2.rightscore++;
				var rightScore = $.k2l.m2a1_2.rightscore;
				var wrongScore = $.k2l.m2a1_2.wrongscore;

				Session.set('m2a1RightScore', rightScore);
				Session.set('m2a1WrongScore', wrongScore);

				if ($.k2l.m2a1_2.index < $.k2l.m2a1_2.questions.length - 1) {
					$.k2l.m2a1_2.index++;
					setTimeout(function () {
						$('.buttonaudio.m2a2item').attr("data-audiosrc", $.k2l.m2a1_2.questions[$.k2l.m2a1_2.index]);
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$('.number').html($.k2l.m2a1_2.index + 1);
						$.k2l.m2a1_2.allowClick = true; // Make the buttons clickable again
						setTimeout(function () {
							/* This is a special case because the event target is not the audio button so we have to pass the button itself in another way */
							$(".is-paused").removeClass("is-paused");
							audioButtonClickSetup($.k2l.m2a1_2.sound, $(".buttonaudio.m2a2item")[0]);
							playPauseAudio($.k2l.m2a1_2.sound, $(".buttonaudio.m2a2item")[0]);
						}, 800);
					}, 1000);
				} else {
					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);

					setTimeout(function () {
						$('#welldonecap').addClass('hidden');
						$("#m2a1_2").addClass('hidden');
						if ($.k2l.m2a1_2.wrongscore < 3) {
							$("#m2a1_good").removeClass('hidden');
							Session.set("activeSection", "#m2a1_good");
						} else {
							$("#m2a1_bad").removeClass('hidden');
							Session.set("activeSection", "#m2a1_bad");
						}
					}, 2000);

					// $('.pagination').removeClass('hidden');
				}
			} else {
				$.k2l.m2a1_2.wrongscore++;
				// incorrect
				var rightScore = $.k2l.m2a1_2.rightscore;
				var wrongScore = $.k2l.m2a1_2.wrongscore;

				Session.set('m2a1RightScore', rightScore);
				Session.set('m2a1WrongScore', wrongScore);
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);


				if ($.k2l.m2a1_2.index < $.k2l.m2a1_2.questions.length - 1) {
					$.k2l.m2a1_2.index++;
					setTimeout(function () {
						$('.buttonaudio.m2a2item').attr("data-audiosrc", $.k2l.m2a1_2.questions[$.k2l.m2a1_2.index]);
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$('.number').html($.k2l.m2a1_2.index + 1);
						$.k2l.m2a1_2.allowClick = true; // Make the buttons clickable again
						setTimeout(function () {
							/* This is a special case because the event target is not the audio button so we have to pass the button itself in another way */
							$(".is-paused").removeClass("is-paused");
							audioButtonClickSetup($.k2l.m2a1_2.sound, $(".buttonaudio.m2a2item")[0]);
							playPauseAudio($.k2l.m2a1_2.sound, $(".buttonaudio.m2a2item")[0]);
						}, 800);
					}, 1000);
				} else {
					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);

					setTimeout(function () {
						$('#welldonecap').addClass('hidden');
						$("#m2a1_2").addClass('hidden');
						if ($.k2l.m2a1_2.wrongscore < 3) {
							$("#m2a1_good").removeClass('hidden');
							Session.set("activeSection", "#m2a1_good");
						} else {
							$("#m2a1_bad").removeClass('hidden');
							Session.set("activeSection", "#m2a1_bad");
						}
					}, 2000);
				}
			}
		}

	},

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m2a1_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a1_2.sound, $(evt.currentTarget));
		$.k2l.m2a1shops.sound.src = {};
	},

	'click img': function (evt) {

		$.k2l.m2a1_2.sound.src = {};
	},

	'click .pagination': function (evt) {
		$.k2l.m2a1_2.sound.src = {};
		$.k2l.m2a1_2.index = 0;
		$.k2l.m2a1_2.allowClick = true;
	}

});

Template.m2a1_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a1_2 == 'undefined') {
		$.k2l.m2a1_2 = {};
	};

	$.k2l.m2a1_2.sound = new Audio();


	var questions = ["/audio/module2/a1/Statement1.m4a",
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
		"/audio/module2/a1/Statement13.m4a",
		"/audio/module2/a1/Statement14.m4a",
		"/audio/module2/a1/Statement15.m4a",
		"/audio/module2/a1/Statement16.m4a"
	];

	var answer_index = ["true", "false", "true", "false", "true", "true", "false", "false", "true", "false", "true", "true", "false", "false", "false", "true"];

	$.k2l.m2a1_2.questions = questions;
	$.k2l.m2a1_2.answer_index = answer_index;
	$.k2l.m2a1_2.index = 0;
	$.k2l.m2a1_2.rightscore = 0;
	$.k2l.m2a1_2.wrongscore = 0;

	Session.set('m2a1RightScore', 0);
	Session.set('m2a1WrongScore', 0);
	$.k2l.m2a1_2.allowClick = true;
}
