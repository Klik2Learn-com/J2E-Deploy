Template.m1a11.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m1a11_end') {
			return false;
		}
		return true;
	},

	/*
	*	- Helper functions to find the activeSection for 'onLoad/onVisible' events.
	*/
	activeSection_m1a11_4: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a11_4");
	},


});

Template.m1a11.rendered = function () {
	setStartActivity(1, 11);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(1, 11, subpage);
			oldLocation = location.href;
		}
	}, 500);

    document.title = "Journey 2 English";

}

Template.m1a11.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 1, 11, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m1a11.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m1a11_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a11_2");
	}
})

Template.m1a11_2_questions.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a11_2");
	}
});

Template.m1a11_2.events({

	// EVENT: Audio button is clicked.
	"click .buttonaudio": function (evt) {
		if ($.k2l.m1a11_2_q.audioButtonLock == false) {
			$.k2l.m1a11_2_q.audioButtonLock = true;
			// Load the sound file

			var audio = $.k2l.m1a11_2_q.audio[$.k2l.m1a11_2_q.index];
			var soundfile = "audio/module1/a11/" + audio;
			$.k2l.m1a11_2_q.sound.src = soundfile;

			$(evt.currentTarget).attr('data-audiosrc', soundfile);

			// Load and Display the question
			var split = $.k2l.m1a11_2_q.questions[$.k2l.m1a11_2_q.index].split(" ");
			$("#questionDisplay").html("");
			displayDelay(split, 0);

			// Play the sound
			audioButtonClickSetup($.k2l.m1a11_2_q.sound, $(evt.currentTarget));
			playPauseAudio($.k2l.m1a11_2_q.sound, $(evt.currentTarget));
			//$.k2l.m1a11_2_q.sound.play()
		}
	},

	// EVENT: word in sentence is clicked.
	"click .questionWord": function (evt) {
		if ($.k2l.m1a11_2_q.questionWordLock == false) {
			$.k2l.m1a11_2_q.questionWordLock = true;
			$.k2l.m1a11_2_q.audioButtonLock = true;
			var guess = evt.currentTarget.id; // This will be an integer
			var wrongIndex = $.k2l.m1a11_2_q.wrongIndex[$.k2l.m1a11_2_q.index];

			// CORRECT WORD CLICKED
			if (guess == wrongIndex) {
				$.k2l.m1a11_2_q.attempts = 0;
				$("#stuckbtn").addClass("hidden");
				$('.correctscreen').removeClass('hidden');
				$("#m1a11_q2_bg").css('background-color', '#86E289');
				setTimeout(function () {
					$("#m1a11_q2_bg").css('background-color', '#dbe9ff');
					$('.correctscreen').addClass('hidden');
					// $(evt.target).addClass('textentry');
					$(evt.target).removeClass('questionWord');
					$(evt.target).html("");
					$(evt.target).append(" <form class=\"textentry\"><input type=\"text\" name=\"userText\" size=\"5\" autocomplete=\"off\"><input type=\"submit\" value=\"OK\"></form> ");
				}, 1000)
			} else {
				$("#m1a11_q2_bg").css('background-color', '#fa6b6b');
				$.k2l.m1a11_2_q.attempts++;
				if ($.k2l.m1a11_2_q.attempts > 2) {
					$("#stuckbtn").removeClass("hidden");
				}
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$("#m1a11_q2_bg").css('background-color', '#dbe9ff'); // Reset the background
					$('.incorrectscreen').addClass('hidden');
					$.k2l.m1a11_2_q.questionWordLock = false; // Unlock the question word
				}, 1000)
			}
			setTimeout(function(){
				$.k2l.m1a11_2_q.audioButtonLock = false;
			}, 1000);
		}

	},

	// EVENT: Guess at the correct word is entered and button clicked.
	"submit form, click #makeaguess": function (evt) {
		evt.preventDefault();
		// Lock the audio button here since it auto-reads.
		$.k2l.m1a11_2_q.questionWordLock = true;
		$.k2l.m1a11_2_q.audioButtonLock = true;

		var userText = evt.target.userText.value;
		if (userText.charAt(userText.length - 1) == '.') {
			userText = userText.substr(0, userText.length - 1);
		}
		userText = $.trim(userText);
		userText = userText.toLowerCase();

		// var guess = $("#guess").val(); // The word typed into the guess box.
		var answer = $.k2l.m1a11_2_q.answers[$.k2l.m1a11_2_q.index]; // The answer from answers list.
		var complete_answers = $.k2l.m1a11_2_q.complete_answers[$.k2l.m1a11.index];
		if (userText == answer) {
			var parentSection = $(evt.currentTarget).parents('section');
			$.k2l.m1a11_2_q.attempts = 0; // Reset wrong attempts.
			$("#stuckbtn2").addClass("hidden");
			$('.incorrectscreen').addClass('hidden'); // Hide any X's that are visible.
			//Show the answer immediately after correct answer.
			$("#questionDisplay").html("");
			var split = $.k2l.m1a11_2_q.complete_answers[$.k2l.m1a11_2_q.index].split(" ");
			for (var i = 0; i < split.length; i++) {
				$("#questionDisplay").append("<span class=\"questionWord\">&nbsp;" + split[i] + " </span>");
			}
			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
				// Check we've not just done the last question
				if ($.k2l.m1a11_2_q.index < $.k2l.m1a11_2_q.answers.length - 1) {
					$.k2l.m1a11_2_q.index += 1; //increment to the next question.

					var split = $.k2l.m1a11_2_q.questions[$.k2l.m1a11_2_q.index].split(" ");
					setTimeout(function () {
						$("#questionDisplay").html("");
						displayDelay(split, 0);
						var audio = $.k2l.m1a11_2_q.audio[$.k2l.m1a11_2_q.index];
						var soundfile = "audio/module1/a11/" + audio;
						$.k2l.m1a11_2_q.sound.src = soundfile;

						$(evt.currentTarget).attr('data-audiosrc', soundfile);

						audioButtonClickSetup($.k2l.m1a11_2_q.sound, $(evt.currentTarget));
						playPauseAudio($.k2l.m1a11_2_q.sound, $(evt.currentTarget));
						//$.k2l.m1a11_2_q.sound.play();
					}, 1500);

				} else {
					$("#stuckbtn2").addClass("hidden");
					$("#questionDisplay").html("");
					$("#m1a11_q2_bg").addClass('hidden');
					$('#welldonecap').removeClass('hidden');

					setTimeout(function () {
						$('#welldonecap').addClass('hidden');
					}, 1000);
					setTimeout(function () {
						$.k2l.m1a11_2_q.audioButtonLock = false;
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
					}, 1000);
					
				};
			}, 1500);
		} else {
			$.k2l.m1a11_2_q.attempts++;
			// Show X 
			$('.incorrectscreen').removeClass('hidden');
			setTimeout(function () {
				$('.incorrectscreen').addClass('hidden');
			}, 1000)

			if (evt.type == "click") {
				if ($.k2l.m1a11_2_q.attempts > 2) {
					$("#stuckbtn2").removeClass("hidden");
				}
			} else if (evt.type == "submit") {
				if ($.k2l.m1a11_2_q.attempts < 2) {
					$("#stuckbtn2").removeClass("hidden");
				}
			}

			
			$.k2l.m1a11_2_q.audioButtonLock = false;
		}
		
	},


	"click #stuckbtn": function (evt) {
		$.k2l.m1a11_2_q.attempts = 0;
		// $("#stuckbtn").addClass("hidden");
		// $('.correctscreen').removeClass('hidden');
		// $("#m1a11_q2_bg").css('background-color', '#86E289');
		// setTimeout(function() {
		// 	$("#m1a11_q2_bg").css('background-color', '#dbe9ff');
		// 	$('.correctscreen').addClass('hidden');
		// 	// $(evt.target).addClass('textentry');
		// 	$(evt.target).removeClass('questionWord');
		// 	$(evt.target).html("");
		// 	$(evt.target).append("<form class=\"textentry\"><input type=\"text\" name=\"userText\" size=\"5\" autocomplete=\"off\"><input type=\"submit\" value=\"OK\"></form>");
		// }, 1000);

		$("#stuckbtn").addClass("hidden");
		var wrongIndex = $.k2l.m1a11_2_q.wrongIndex[$.k2l.m1a11_2_q.index];
		//setTimeout(function() {
		// $('#' + wrongIndex).addClass('textentry');
		$('#' + wrongIndex).removeClass('questionWord');
		$('#' + wrongIndex).html("");
		$('#' + wrongIndex).append(" <form class=\"textentry\"><input type=\"text\" name=\"userText\" size=\"5\" autocomplete=\"off\"><input type=\"submit\" value=\"OK\"></form> ");
		//}, 1000)
	},


	"click #stuckbtn2": function (evt) {
		// console.log("stuck2");
		var parentSection = $(evt.currentTarget).parents('section');
		$.k2l.m1a11_2_q.attempts = 0; // Reset wrong attempts.
		$("#stuckbtn2").addClass("hidden");
		$('.incorrectscreen').addClass('hidden'); // Hide any X's that are visible.
		//Show the answer immediately after correct answer.
		$("#questionDisplay").html("");
		var split = $.k2l.m1a11_2_q.complete_answers[$.k2l.m1a11_2_q.index].split(" ");
		for (var i = 0; i < split.length; i++) {
			$("#questionDisplay").append("<span class=\"questionWord\">&nbsp;" + split[i] + " </span>");
		}
		// $('.correctscreen').removeClass('hidden');
		setTimeout(function () {
			// $('.correctscreen').addClass('hidden');
			// Check we've not just done the last question
			if ($.k2l.m1a11_2_q.index < $.k2l.m1a11_2_q.answers.length - 1) {
				$.k2l.m1a11_2_q.index += 1; //increment to the next question.

				var split = $.k2l.m1a11_2_q.questions[$.k2l.m1a11_2_q.index].split(" ");
				setTimeout(function () {
					$.k2l.m1a11_2_q.audioButtonLock = true; // Lock the audio button here since it auto-reads.
					$("#questionDisplay").html("");
					displayDelay(split, 0);
					var audio = $.k2l.m1a11_2_q.audio[$.k2l.m1a11_2_q.index];
					var soundfile = "audio/module1/a11/" + audio;
					$.k2l.m1a11_2_q.sound.src = soundfile;

					$(evt.currentTarget).attr('data-audiosrc', soundfile);

					audioButtonClickSetup($.k2l.m1a11_2_q.sound, $(evt.currentTarget));
					playPauseAudio($.k2l.m1a11_2_q.sound, $(evt.currentTarget));
					//$.k2l.m1a11_2_q.sound.play();
				}, 1500);

			} else {
				$("#stuckbtn").addClass("hidden");
				$("#questionDisplay").html("");
				$("#m1a11_q2_bg").addClass('hidden');
				$('#welldonecap').removeClass('hidden');

				setTimeout(function () {
					$('#welldonecap').addClass('hidden');
				}, 1000);
				setTimeout(function () {
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
				}, 1000);
			};
		}, 1500);
	},
})



Template.m1a11_2_questions.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	}

	if (typeof $.k2l.m1a11_2_q == 'undefined') {
		$.k2l.m1a11_2_q = {};
	};

	var questions = [
		"Have you get a mobile phone ?",
		"Yes I've got a Nokia, have you got ?",
		"No I don't get one .",
		"Do you get a camera ?",
		"Yes I get one .",
		"I've a digital one.",
		"Do you have ?",
		"No I don't have ."
	];

	var complete_answers = [
		"Have you got a mobile phone?",
		"Yes I've got a Nokia, have you got one?",
		"No I don't have one.",
		"Do you have a camera?",
		"Yes I have one.",
		"I've got a digital one.",
		"Do you have one?",
		"No I don't have one."
	];

	var wrong_index = [
		"2",
		"space7",
		"3",
		"2",
		"2",
		"space0",
		"space2",
		"space3"
	];

	var answer_words = [
		"got",
		"one",
		"have",
		"have",
		"have",
		"got",
		"one",
		"one"
	];

	var audio_files = [
		"have_you_get_a_mobile.m4a",
		"yes_ive_got_a_nokia.m4a",
		"no_i_dont_get_one.m4a",
		"do_you_get_a_camera.m4a",
		"yes_i_get_one.m4a",
		"ive_a_digital_one.m4a",
		"do_you_have.m4a",
		"no_i_dont_have.m4a"
	];

	$.k2l.m1a11_2_q.answers = answer_words;
	$.k2l.m1a11_2_q.complete_answers = complete_answers;
	$.k2l.m1a11_2_q.wrongIndex = wrong_index;
	$.k2l.m1a11_2_q.attempts = 0;
	$.k2l.m1a11_2_q.index = 0;
	$.k2l.m1a11_2_q.questions = questions;
	$.k2l.m1a11_2_q.sound = new Audio();
	$.k2l.m1a11_2_q.audio = audio_files;
	$.k2l.m1a11_2_q.audioButtonLock = false; //variable to prevent multiple clicks of audio button.
	$.k2l.m1a11_2_q.questionWordLock = false; //variable to prevent multiple clicks of audio button.

	$.k2l.m1a11_2_q.audioButtonLock = true;
	// Load the sound file
	var audio = $.k2l.m1a11_2_q.audio[$.k2l.m1a11_2_q.index];
	var soundfile = "audio/module1/a11/" + audio;
	$.k2l.m1a11_2_q.sound.src = soundfile;

	//$(evt.currentTarget).attr('data-audiosrc', soundfile);

	// Load and Display the question
	var split = $.k2l.m1a11_2_q.questions[$.k2l.m1a11_2_q.index].split(" ");
	$("#questionDisplay").html("");
	displayDelay(split, 0);

	// Play the sound
	//audioButtonClickSetup($.k2l.m1a11_2_q.sound, $(evt.currentTarget));
	//playPauseAudio($.k2l.m1a11_2_q.sound, $(evt.currentTarget));
	$.k2l.m1a11_2_q.sound.play()

}

//This function might be run twice by accident when answering the question and clicking the play button again.
//this triggers the function to be called again, and due to navigation to the next page it is triggered for a second time
//maybe set a session variable to see if the function was called recently and if yes, don't execute it or
//terminate the previous execution (removing any elements already shown) and start over
/**
* Loads and writes a question with each word going into a 'span' element.
* Each word is displayed after 250ms delay.
* @author James
*/
function displayDelay(split, i) {
	setTimeout(function () {
		$("#questionDisplay").append("<span class=\"questionWord \" id=\"" + i + "\">" + split[i] + "</span>");
		$("#questionDisplay").append("<span class=\"questionWord\" id=\"space" + i + "\">&nbsp;&nbsp;</span>");
		i++;
		if (i < split.length) {
			displayDelay(split, i);
		} else {
			$.k2l.m1a11_2_q.audioButtonLock = false; // Unlock the audio button
			$.k2l.m1a11_2_q.questionWordLock = false; // Unlock the words
		}
	}, 200)
};

Template.m1a11_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a11_3");
	}
})

Template.m1a11_4.helpers({
	// Helper function handles 'onLoad' event.
	load_m1a11_4: function () {
		if (typeof $.k2l == 'undefined') {
			$.k2l = {};
		}
		if (typeof $.k2l.m1a11 == 'undefined') {
			$.k2l.m1a11 = {};
		}
		if (typeof $.k2l.m1a11._4 == 'undefined') {
			$.k2l.m1a11._4 = {};
		}
		if (typeof $.k2l.m1a11._4.banner == 'undefined') {

		} else {
			drawCanvas();
		}
		//drawCanvas();
	},

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a11_4");
	}

});

Template.m1a11_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	}
	if (typeof $.k2l.m1a11 == 'undefined') {
		$.k2l.m1a11 = {};
	}
	if (typeof $.k2l.m1a11._4 == 'undefined') {
		$.k2l.m1a11._4 = {};
	}
	$.k2l.m1a11._4.banner = $('#yesNoBanner');

}

function drawCanvas() {
	$.k2l.m1a11._4.banner.hide().fadeIn(3000);
}

Template.m1a11_5.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a11_5");
	}
});

Template.m1a11_5.events({
	"click .button2": function (evt) {
		if ($(evt.currentTarget).attr('id') == "correct") {
			var parentSection = $(evt.currentTarget).parents('section');
			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
			}, 1000);
			setTimeout(function () {
				// $.k2l.m1a11_5.counter = 0;
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
			}, 2000);
		} else {
			$('.incorrectscreen').removeClass('hidden');
			setTimeout(function () {
				$('.incorrectscreen').addClass('hidden');
			}, 1000);
		}
	}
});

Template.m1a11_5.rendered = function () {
}


Template.m1a11_6.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a11_6");
	}
})

Template.m1a11_7.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a11_7");
	}
})
