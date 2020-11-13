Template.m3a25.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m3a25_end') {
			return false;
		}
		return true;
	},


})

Template.m3a25.events({

	'click a[data-function="restart"]': function (evt) {
		evt.preventDefault();
		// Click this button to reset activity 1
		$.k2l.m3a25_2.index = 0;
		$.k2l.m3a25_2.rightscore = 0;
		$.k2l.m3a25_2.wrongscore = 0;
		$.k2l.m3a25_2.allowClick = true;
		Session.set("activeSection", "#m3a25_2");
		$("#m3a25_end").addClass('hidden');
		$("#m3a25").removeClass('hidden');
		$(".number").html($.k2l.m3a25_2.index + 1);
		Session.set('m3a25RightScore', 0);
		Session.set('m3a25WrongScore', 0);
		forceReload();
	}
})

Template.m3a25.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(3, 25);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(3, 25, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m3a25.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 3, 25, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m3a25.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m3a25_2.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a25_2");
	}
});


Template.m3a25_2.events({
	"click .button1": function (evt) {
		

		if ($.k2l.m3a25_2.allowClick == true) {

			$.k2l.m3a25_2.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m3a25_2.answer_index[$.k2l.m3a25_2.index]) {
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout(function () {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				$.k2l.m3a25_2.rightscore++;
				var rightScore = $.k2l.m3a25_2.rightscore;
				var wrongScore = $.k2l.m3a25_2.wrongscore;

				Session.set('m3a25RightScore', rightScore);
				Session.set('m3a25WrongScore', wrongScore);

				if ($.k2l.m3a25_2.index < $.k2l.m3a25_2.questions.length - 1) {
					$.k2l.m3a25_2.index++;
					setTimeout(function () {
						resetAllAudioButtons();
						$('.buttonaudio').attr("data-audiosrc", $.k2l.m3a25_2.questions[$.k2l.m3a25_2.index]);
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$('#sentence').html("Sentence " + ($.k2l.m3a25_2.index + 1));
						$.k2l.m3a25_2.allowClick = true; // Make the buttons clickable again
						setTimeout(function () {
							var audioButton = $('.buttonaudio')[0];
							audioButtonClickSetup($.k2l.m3a25_2.sound, audioButton);
							playPauseAudio($.k2l.m3a25_2.sound, audioButton);
						}, 300);
					}, 1000);
				} else {
					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);

					setTimeout(function () {
						$('#welldonecap').addClass('hidden');
						$("#m3a25_2").addClass('hidden');

						if ($.k2l.m3a25_2.wrongscore < 3) {
							$("#m3a25_good").removeClass('hidden');
							Session.set("activeSection", "#m3a25_good");
						} else {
							$("#m3a25_bad").removeClass('hidden');
							Session.set("activeSection", "#m3a25_bad");
						}
					}, 2000);

					// $('.pagination').removeClass('hidden');
				}
			} else {
				$.k2l.m3a25_2.wrongscore++;
				// incorrect
				var rightScore = $.k2l.m3a25_2.rightscore;
				var wrongScore = $.k2l.m3a25_2.wrongscore;

				Session.set('m3a25RightScore', rightScore);
				Session.set('m3a25WrongScore', wrongScore);
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);


				if ($.k2l.m3a25_2.index < $.k2l.m3a25_2.questions.length - 1) {
					$.k2l.m3a25_2.index++;
					setTimeout(function () {
						resetAllAudioButtons();
						$('.buttonaudio').attr("data-audiosrc", $.k2l.m3a25_2.questions[$.k2l.m3a25_2.index]);
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$('#sentence').html("Sentence " + ($.k2l.m3a25_2.index + 1));
						$.k2l.m3a25_2.allowClick = true; // Make the buttons clickable again
						setTimeout(function () {
							var audioButton = $('.buttonaudio')[0];
							audioButtonClickSetup($.k2l.m3a25_2.sound, audioButton);
							playPauseAudio($.k2l.m3a25_2.sound, audioButton);
						}, 300);
					}, 1000);
				} else {
					$.k2l.m3a25_2.sound.src = {};
					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);

					setTimeout(function () {
						$('#welldonecap').addClass('hidden');
						$("#m3a25_2").addClass('hidden');

						if ($.k2l.m3a25_2.wrongscore < 3) {
							$("#m3a25_good").removeClass('hidden');
							Session.set("activeSection", "#m3a25_good");
						} else {
							$("#m3a25_bad").removeClass('hidden');
							Session.set("activeSection", "#m3a25_bad");
						}
					}, 2000);
				}
			}
		}

	},

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m3a25_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a25_2.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {
		$.k2l.m3a25_2.sound.src = {};
		$.k2l.m3a25_2.index = 0;
		$.k2l.m3a25_2.allowClick = true;
	}

});

Template.m3a25_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a25_2 == 'undefined') {
		$.k2l.m3a25_2 = {};
	};

	$.k2l.m3a25_2.sound = new Audio();


	var questions = ["/audio/module3/a25/1.m4a",
		"/audio/module3/a25/2.m4a",
		"/audio/module3/a25/3.m4a",
		"/audio/module3/a25/4.m4a",
		"/audio/module3/a25/5.m4a",
		"/audio/module3/a25/6.m4a",
		"/audio/module3/a25/7.m4a",
		"/audio/module3/a25/8.m4a",
		"/audio/module3/a25/9.m4a",
		"/audio/module3/a25/10.m4a",
		"/audio/module3/a25/11.m4a",
		"/audio/module3/a25/12.m4a",
	];

	var answer_index = ["question", "question", "statement", "question", "question", "statement", "question", "statement", "statement", "statement", "question", "statement"];

	$.k2l.m3a25_2.questions = questions;
	$.k2l.m3a25_2.answer_index = answer_index;
	$.k2l.m3a25_2.index = 0;
	$.k2l.m3a25_2.rightscore = 0;
	$.k2l.m3a25_2.wrongscore = 0;

	Session.set('m3a25RightScore', 0);
	Session.set('m3a25WrongScore', 0);
	$.k2l.m3a25_2.allowClick = true;
}

Template.m3a25_3.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a25_3");
	}
})

Template.m3a25_3.events({

	'click .button1': function (evt) {
		;
		audioButtonClickSetup($.k2l.m3a25_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a25_3.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m3a25_3.sound.src = {};
	}

});

Template.m3a25_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a25_3 == 'undefined') {
		$.k2l.m3a25_3 = {};
	};

	$.k2l.m3a25_3.sound = new Audio();
}

Template.m3a25_bad.helpers({
	rightScore: function () {
		return Session.get('m3a25RightScore');
	},

	wrongScore: function () {
		return Session.get('m3a25WrongScore');
	}
})

Template.m3a25_bad.events({

	"click .button1": function (evt) {
		evt.preventDefault();
		// Click this button to reset activity 1
		$.k2l.m3a25_2.index = 0;
		$.k2l.m3a25_2.rightscore = 0;
		$.k2l.m3a25_2.wrongscore = 0;
		$.k2l.m3a25_2.allowClick = true;
		Session.set("activeSection", "#m3a25_2");
		$("#m3a25_bad").addClass('hidden');
		$("#m3a25_2").removeClass('hidden');
		$(".number").html($.k2l.m3a25_2.index + 1);
		Session.set('m3a25RightScore', 0);
		Session.set('m3a25WrongScore', 0);
		forceReload();
	}
})

Template.m3a25_good.helpers({
	rightScore: function () {
		return Session.get('m3a25RightScore');
	},

	wrongScore: function () {
		return Session.get('m3a25WrongScore');
	}
})

Template.m3a25_good.rendered = function () {




}
