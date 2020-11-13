Template.m1a12.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m1a12_end') {
			return false;
		}
		return true;
	},

	// This allows us to render the template when it becomes active.
	loadM1a12_1: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m1a12_1");
	}

});

Template.m1a12.events({

	'click a.restart': function (evt) {
		Session.set('m1a12RightScore', 0);
		Session.set('m1a12WrongScore', 0);
		$.k2l.m1a12.index = 0;
		$.k2l.m1a12.rightscore = 0;
		$.k2l.m1a12.wrongscore = 0;
	},

	'click i.titlereturn': function (evt) {
		var activeSection = $(evt.currentTarget).parent('a').attr('href');
		Session.set('activeSection', activeSection);
	}

});

Template.m1a12.rendered = function () {
	setStartActivity(1, 12);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(1, 12, subpage);
			oldLocation = location.href;
		}
	}, 500);


	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	}
	if (typeof $.k2l.m1a12 == 'undefined') {
		$.k2l.m1a12 = {};
	};

	$.k2l.m1a12.buttonsUnlocked = true;

    document.title = "Journey 2 English";

}

Template.m1a12.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 1, 12, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m1a12.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m1a12_1.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m1a12_1");
	},

	rightScore: function () {
		return Session.get('m1a12RightScore');
	},

	wrongScore: function () {
		return Session.get('m1a12WrongScore');
	}
});

Template.m1a12_1.events({

	"click .buttonaudio": function (evt) {
		$(evt.currentTarget).attr('data-audiosrc', "audio/module1/a12/" + $.k2l.m1a12.task_answers[$.k2l.m1a12.index].audioFile);

		audioButtonClickSetup($.k2l.m1a12.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m1a12.sound, $(evt.currentTarget));
	},

	"click #questionButton": function (evt) {
		if ($.k2l.m1a12.index < 10 && $.k2l.m1a12.buttonsUnlocked) {
			$.k2l.m1a12.buttonsUnlocked = false;
			if ($.k2l.m1a12.task_answers[$.k2l.m1a12.index].answer == "question") {
				//increment the correct score
				$.k2l.m1a12.rightscore++;
				$('.correctscreen').removeClass('hidden');
				setTimeout(function () {
					$('.correctscreen').addClass('hidden');
				}, 1000);
			} else {
				$.k2l.m1a12.wrongscore++;
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
			}

			setTimeout(function(){
				$.k2l.m1a12.buttonsUnlocked = true;
			}, 2000);
			var rightScore = $.k2l.m1a12.rightscore;
			var wrongScore = $.k2l.m1a12.wrongscore;

			Session.set('m1a12RightScore', rightScore);
			Session.set('m1a12WrongScore', wrongScore);

			//increment the index
			$.k2l.m1a12.index++;

			// Check if there is another question
			if ($.k2l.m1a12.index < $.k2l.m1a12.task_answers.length) {
				var tempIndex = $.k2l.m1a12.index;

				var audioButton = $(".buttonaudio")[0];
				audioButton.setAttribute('data-audiosrc', "audio/module1/a12/" + $.k2l.m1a12.task_answers[tempIndex].audioFile);
				/* Reset all audio buttons because its gonna be a new question */
				resetAllAudioButtons();

				setTimeout(function () {
					audioButtonClickSetup($.k2l.m1a12.sound, audioButton);
					playPauseAudio($.k2l.m1a12.sound, audioButton);
					$("#m1a12Ex").html(tempIndex + 1);
				}, 1000);
			} else {
				setTimeout(function () {
					$("#m1a12_1").addClass('hidden');
					if ($.k2l.m1a12.wrongscore < 5) {
						$("#m1a12_2_good").removeClass('hidden');
						Session.set("activeSection", "#m1a12_2_good");
					} else {
						$("#m1a12_2_bad").removeClass('hidden');
						Session.set("activeSection", "#m1a12_2_bad");
					}
				}, 200);
			}
		}
	},

	"click #statementButton": function (evt) {
		if ($.k2l.m1a12.index < 10 && $.k2l.m1a12.buttonsUnlocked) {
			$.k2l.m1a12.buttonsUnlocked = false;
			if ($.k2l.m1a12.task_answers[$.k2l.m1a12.index].answer == "statement") {
				//increment the correct score
				$.k2l.m1a12.rightscore++;
				$('.correctscreen').removeClass('hidden');
				setTimeout(function () {
					$('.correctscreen').addClass('hidden');
				}, 1000);
			} else {
				$.k2l.m1a12.wrongscore++;
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
			}

			setTimeout(function(){
				$.k2l.m1a12.buttonsUnlocked = true;
			}, 2000);


			var rightScore = $.k2l.m1a12.rightscore;
			var wrongScore = $.k2l.m1a12.wrongscore;

			Session.set('m1a12RightScore', rightScore);
			Session.set('m1a12WrongScore', wrongScore);

			//increment the index
			$.k2l.m1a12.index++;

			// Check if there is another question
			if ($.k2l.m1a12.index < $.k2l.m1a12.task_answers.length) {
				var tempIndex = $.k2l.m1a12.index;

				var audioButton = $(".buttonaudio")[0];
				audioButton.setAttribute('data-audiosrc', "audio/module1/a12/" + $.k2l.m1a12.task_answers[tempIndex].audioFile);
				/* Reset all audio buttons because its gonna be a new question */
				resetAllAudioButtons();

				setTimeout(function () {
					audioButtonClickSetup($.k2l.m1a12.sound, audioButton);
					playPauseAudio($.k2l.m1a12.sound, audioButton);
					$("#m1a12Ex").html(tempIndex + 1);
				}, 1000);
			} else {
				setTimeout(function () {
					$("#m1a12_1").addClass('hidden');
					if ($.k2l.m1a12.wrongscore < 3) {
						$("#m1a12_2_good").removeClass('hidden');
						Session.set("activeSection", "#m1a12_2_good");
					} else {
						$("#m1a12_2_bad").removeClass('hidden');
						Session.set("activeSection", "#m1a12_2_bad");
					}
				}, 200);
			}
		}
	}
})

Template.m1a12_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	}
	if (typeof $.k2l.m1a12 == 'undefined') {
		$.k2l.m1a12 = {};
	};

	$.k2l.m1a12.index = 0;
	$.k2l.m1a12.rightscore = 0;
	$.k2l.m1a12.wrongscore = 0;
	$.k2l.m1a12.sound = new Audio();

	/*
	* To add/remove questions from this activity subsection, just
	* update this array. This is all that should require changing.
	*/
	var task_answers = [
		{ audioFile: "act_12_hi_im_david_i_dont_think.m4a", answer: "statement" },
		{ audioFile: "act_12_im_from_spain.m4a", answer: "statement" },
		{ audioFile: "act_12f_how_do_you.m4a", answer: "question" },
		{ audioFile: "act_12_how_old_are_you.m4a", answer: "question" },
		{ audioFile: "act_12_so_you_speak_mandarin.m4a", answer: "statement" },
		{ audioFile: "act_12f_i_speak_polish.m4a", answer: "statement" },
		{ audioFile: "act_12f_what_language_do_you.m4a", answer: "question" },
		{ audioFile: "act_12f_where_are_you_from.m4a", answer: "question" },
		{ audioFile: "act_12f_my_names_maria.m4a", answer: "question" },
		{ audioFile: "act_12f_im_25.m4a", answer: "question" }
	]
	$.k2l.m1a12.task_answers = task_answers;
	Session.set('m1a12RightScore', 0);
	Session.set('m1a12WrongScore', 0);

	var audioButton = $(".buttonaudio")[0];
	audioButton.setAttribute('data-audiosrc', "audio/module1/a12/" + $.k2l.m1a12.task_answers[$.k2l.m1a12.index].audioFile);
	/* Reset all audio buttons because its gonna be a new question */
	resetAllAudioButtons();

	setTimeout(function () {
		audioButtonClickSetup($.k2l.m1a12.sound, audioButton);
		playPauseAudio($.k2l.m1a12.sound, audioButton);
	}, 800);

}

Template.m1a12_2_bad.helpers({
	rightScore: function () {
		return Session.get('m1a12RightScore');
	},

	wrongScore: function () {
		return Session.get('m1a12WrongScore');
	}
})

Template.m1a12_2_bad.events({

	"click .button1": function (evt) {
		// Click this button to reset activity 12
		$.k2l.m1a12.index = 0;
		$.k2l.m1a12.rightscore = 0;
		$.k2l.m1a12.wrongscore = 0;

		Session.set("activeSection", "#m1a12_1");
		$("#m1a12_2_bad").addClass('hidden');
		$("#m1a12_1").removeClass('hidden');
		$("#m1a12Ex").html($.k2l.m1a12.index + 1);
		Session.set('m1a12RightScore', 0);
		Session.set('m1a12WrongScore', 0);
		forceReload();
	}
})

Template.m1a12_2_good.helpers({
	rightScore: function () {
		return Session.get('m1a12RightScore');
	},

	wrongScore: function () {
		return Session.get('m1a12WrongScore');
	}
})

Template.m1a12_3.helpers({
})

Template.m1a12_3.events({

	"click .numbutt": function (evt) {
		$.k2l.m1a12_3.index = evt.currentTarget.id;
		$("#textDisplay").html($.k2l.m1a12_3.audio_phrases[$.k2l.m1a12_3.index].phrase);
		$("#m1a12Sen").html($(evt.currentTarget).html());
		if($.k2l.m1a12.sound != undefined){
			$.k2l.m1a12.sound.src = {};
			resetAllAudioButtons();
		}
	},

	"click .buttonaudio": function (evt) {
		var soundfile = "audio/module1/a12/" + $.k2l.m1a12_3.audio_phrases[$.k2l.m1a12_3.index].audioFile;

		$(evt.currentTarget).attr('data-audiosrc', soundfile);

		audioButtonClickSetup($.k2l.m1a12.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m1a12.sound, $(evt.currentTarget));
	}
})

Template.m1a12_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	}
	if (typeof $.k2l.m1a12_3 == 'undefined') {
		$.k2l.m1a12_3 = {};
	};

	if (typeof $.k2l.m1a12_3 == 'undefined') {
		$.k2l.m1a12_3 = {};
	};

	$.k2l.m1a12_3.index = 0;


	var audio_phrases = [
		{ audioFile: "act_12f_my_names_maria.m4a", phrase: "My name's Maria. What's yours?" },
		{ audioFile: "act_12_hi_im_david_i_dont_think.m4a", phrase: "Hi I'm David, I don't think we've met." },
		{ audioFile: "act_12f_how_do_you.m4a", phrase: "How do you spell that?" },
		{ audioFile: "act_12_im_from_spain.m4a", phrase: "I'm from Spain." },
		{ audioFile: "act_12f_where_are_you_from.m4a", phrase: "Where are you from?" },
		{ audioFile: "act_12f_i_speak_polish.m4a", phrase: "I Speak Polish." },
		{ audioFile: "act_12f_what_language_do_you.m4a", phrase: "What language do you speak?" },
		{ audioFile: "act_12_so_you_speak_mandarin.m4a", phrase: "So you speak Mandarin." },
		{ audioFile: "act_12_how_old_are_you.m4a", phrase: "How old are you?" },
		{ audioFile: "act_12f_im_25.m4a", phrase: "I'm 25... and you?" }
	]

	$.k2l.m1a12_3.audio_phrases = audio_phrases;
}
