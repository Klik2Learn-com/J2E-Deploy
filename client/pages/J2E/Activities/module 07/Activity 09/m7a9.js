Template.m7a9.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m7a9_end') {
			return false;
		}
		return true;
	}
});

Template.m7a9.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(7, 9);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(7, 9, subpage);
			oldLocation = location.href;
		}
	}, 500);

}
Template.m7a9_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a9_1");
	}
});

Template.m7a9_1.events({

	'click .buttonaudioc': function (evt) {
		;
		audioButtonClickSetup($.k2l.m7a9_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a9_1.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m7a9_1.sound.src = {};
	}

});

Template.m7a9_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m7a9_1 == 'undefined') {
		$.k2l.m7a9_1 = {};
	};

	$.k2l.m7a9_1.sound = new Audio();
}

Template.m7a9_2.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a9_2");
	}
});

Template.m7a9_2.events({

	"submit form": function (evt) {

		if (evt.preventDefault) {
			evt.preventDefault();
		}
		var isCorrect = false;

		// Tidy the user input
		var userText = evt.target.userText.value;
		if (userText.charAt(userText.length - 1) == '.') {
			userText = userText.substr(0, userText.length - 1);
		}
		userText = $.trim(userText);
		userText = userText.toLowerCase();

		for (var i = 0; i < $.k2l.m7a9_2.correctAnswers[$.k2l.m7a9_2.index].length; i++) {
			if (userText == $.k2l.m7a9_2.correctAnswers[$.k2l.m7a9_2.index][i]) {
				isCorrect = true;
				$.k2l.m7a9_2.correctAnswerIndex = i; // use this if there are multiple possible answers
				break;
			}
		}

		if (isCorrect) {
			//correct
			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
			}, 1000);
			var parentSection = $(evt.currentTarget).parents('section');
			$.k2l.m7a9_2.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			//$(evt.currentTarget).parent().html($.k2l.m7a9_2.correctAnswers[$.k2l.m7a9_2.index]);
			$(evt.currentTarget).parent().html($.k2l.m7a9_2.displayAnswers[$.k2l.m7a9_2.index]); // use this if there are multiple possible answers
			$('#entryanswer' + $.k2l.m7a9_2.index).addClass('correctword');

			if ($.k2l.m7a9_2.index < $.k2l.m7a9_2.correctAnswers.length - 1) {
				$.k2l.m7a9_2.index++;
				for (var ctr = 0; ctr < $.k2l.m7a9_2.switcherIndexes.length; ctr++) {
					if ($.k2l.m7a9_2.index - 1 == $.k2l.m7a9_2.switcherIndexes[ctr]) {
						setTimeout(function () {
							resetAllAudioButtons();
							$.k2l.m7a9_2.sound.src = {};
							$.k2l.m7a9_2.questionIndex++
							$('.buttonaudioc').attr("data-audiosrc", $.k2l.m7a9_2.questionsaudio[$.k2l.m7a9_2.questionIndex]);
							$("#entryanswer" + ($.k2l.m7a9_2.index - 1)).parent("li").addClass("hidden");
							$("#entryanswer" + ($.k2l.m7a9_2.index)).parent("li").removeClass("hidden");
						}, 1500);
					}
				}
				$('#entryanswer' + $.k2l.m7a9_2.index).removeClass('textentry-disabled');
				$('#entryanswer' + $.k2l.m7a9_2.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m7a9_2.index = 0;
				$.k2l.m7a9_2.wrongcount = 0;
				$.k2l.m7a9_2.questionIndex = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
				setTimeout(function () {
					$('#welldonecap').addClass('hidden');
				}, 2000);
				setTimeout(function () {
					$.k2l.m7a9_2.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
				}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m7a9_2.wrongcount++;
			if ($.k2l.m7a9_2.wrongcount >= 1) {
				$('.stuck').removeClass('hidden');
			}
			$('.incorrectscreen').removeClass('hidden');
			setTimeout(function () {
				$('.incorrectscreen').addClass('hidden');
			}, 1000);
			evt.target.userText.value = "";
		}
	},

	"click .stuck-button": function (evt) {
		$('.incorrectscreen').addClass('hidden');
		var parentSection = $(evt.currentTarget).parents('section');
		$('.stuck').addClass('hidden'); //hide stuck button if visible
		$.k2l.m7a9_2.wrongcount = 0;
		//$('#entryanswer'+$.k2l.m7a9_2.index).html($.k2l.m7a9_2.correctAnswers[$.k2l.m7a9_2.index]);
		$('#entryanswer' + $.k2l.m7a9_2.index).html($.k2l.m7a9_2.displayAnswers[$.k2l.m7a9_2.index]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer' + $.k2l.m7a9_2.index).addClass('correctword');

		if ($.k2l.m7a9_2.index < $.k2l.m7a9_2.correctAnswers.length - 1) {
			$.k2l.m7a9_2.index++;

			for (var ctr = 0; ctr < $.k2l.m7a9_2.switcherIndexes.length; ctr++) {
				if ($.k2l.m7a9_2.index - 1 == $.k2l.m7a9_2.switcherIndexes[ctr]) {
					setTimeout(function () {
						resetAllAudioButtons();
						$.k2l.m7a9_2.sound.src = {};
						$.k2l.m7a9_2.questionIndex++
						$('.buttonaudioc').attr("data-audiosrc", $.k2l.m7a9_2.questionsaudio[$.k2l.m7a9_2.questionIndex]);
						$("#entryanswer" + ($.k2l.m7a9_2.index - 1)).parent("li").addClass("hidden");
						$("#entryanswer" + ($.k2l.m7a9_2.index)).parent("li").removeClass("hidden");
					}, 4000);

				}
			}
			$('#entryanswer' + $.k2l.m7a9_2.index).removeClass('textentry-disabled');
			$('#entryanswer' + $.k2l.m7a9_2.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
			$('input[name=userText]').focus();
		} else {
			$.k2l.m7a9_2.index = 0;
			$.k2l.m7a9_2.wrongcount = 0;
			//$.k2l.m7a9_2.sound.src = {};
			$.k2l.m7a9_2.questionIndex = 0;
				setTimeout(function() {
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 1000);
			//$('.pagination').removeClass('hidden');
		}
	},

	'click .buttonaudioc': function (evt) {
		audioButtonClickSetup($.k2l.m7a9_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a9_2.sound, $(evt.currentTarget));
	},

	/*
	"click .pagination": function(evt){
		$.k2l.m7a9_2.index = 0;
		$.k2l.m7a9_2.wrongcount = 0;
		$.k2l.m7a9_2.sound.src = {};
	}
	*/
	
});

Template.m7a9_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m7a9_2 == 'undefined') {
		$.k2l.m7a9_2 = {};
	};

	$.k2l.m7a9_2.index = 0;
	$.k2l.m7a9_2.wrongcount = 0;
	$.k2l.m7a9_2.correctAnswerIndex = 0; // for multiple answers
	$.k2l.m7a9_2.questionIndex = 0;
	var questionsaudio = ["/audio/module7/a9/Con_1.m4a", "/audio/module7/a9/Con_2.m4a", "/audio/module7/a9/Con_3.m4a", "/audio/module7/a9/Con_4.m4a", "/audio/module7/a9/Con_5.m4a", "/audio/module7/a9/Con_6.m4a", "/audio/module7/a9/Con_7.m4a", "/audio/module7/a9/Con_8.m4a", "/audio/module7/a9/Con_9.m4a", "/audio/module7/a9/Con_10.m4a",];

	$.k2l.m7a9_2.questionsaudio = questionsaudio;
	$.k2l.m7a9_2.sound = new Audio();

	var switcherIndexes = [1, 3, 5, 7, 9, 12, 14, 16, 18];
	$.k2l.m7a9_2.switcherIndexes = switcherIndexes;



	var correctAnswers = [
			["need"], 
			["will be"],  
			["want"], 
			["can buy"],
			["get"],
			["will be"],
			["will help"],
			["'re", "are"],
			["'re", "are"],
			["have"],
			["get"],
			["'ve", "have"],
			["been"],
			["'re", "are"],
			["check out"],
			["go"], 
			["make"],
			["'re", "are"], 
			["don't"],
			["you're", "you are"], 
			["is"]
		];
		
		 var displayAnswers = [
			["need"], ["will be"],  
			["want"], ["can buy"],
			["get"],["will be"],
			["will help"],["'re"],
			["'re"],["have"],
			["get"],["'ve"],["been"],
			["'re"],["check out"],
			["go"], ["make"],
			["'re"], ["don't"],
			["you're"], ["is"]
		]; 
		
	$.k2l.m7a9_2.displayAnswers = displayAnswers; 
	$.k2l.m7a9_2.correctAnswers = correctAnswers;

}


Template.m7a9_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a9_3");
	}
});

Template.m7a9_3.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m7a9_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a9_3.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m7a9_3.sound.src = {};
	}

});

Template.m7a9_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m7a9_3 == 'undefined') {
		$.k2l.m7a9_3 = {};
	};

	$.k2l.m7a9_3.sound = new Audio();
}

Template.m7a9_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a9_4");
	}
});

Template.m7a9_4.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m7a9_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a9_4.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m7a9_4.sound.src = {};
	}

});

Template.m7a9_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m7a9_4 == 'undefined') {
		$.k2l.m7a9_4 = {};
	};

	$.k2l.m7a9_4.sound = new Audio();
}

Template.m7a9_5.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a9_5");
	}
});

Template.m7a9_5.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m7a9_5.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a9_5.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m7a9_5.sound.src = {};
	}

});

Template.m7a9_5.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m7a9_5 == 'undefined') {
		$.k2l.m7a9_5 = {};
	};

	$.k2l.m7a9_5.sound = new Audio();
}

Template.m7a9_6.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a9_6");
	}
});

Template.m7a9_6.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m7a9_6.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a9_6.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m7a9_6.sound.src = {};
	}

});

Template.m7a9_6.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m7a9_6 == 'undefined') {
		$.k2l.m7a9_6 = {};
	};

	$.k2l.m7a9_6.sound = new Audio();
}

Template.m7a9_7.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a9_7");
	}
});

Template.m7a9_7.events({

	'click .buttonaudioc': function (evt) {
		audioButtonClickSetup($.k2l.m7a9_7.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a9_7.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m7a9_7.sound.src = {};
	}

});

Template.m7a9_7.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m7a9_7 == 'undefined') {
		$.k2l.m7a9_7 = {};
	};

	$.k2l.m7a9_7.sound = new Audio();
}


Template.m7a9.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 7, 9, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m7a9.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
