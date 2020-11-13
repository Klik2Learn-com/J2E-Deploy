

Template.m4a20.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m4a20_end') {
			return false;
		} return true;
	}
});

Template.m4a20.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(4, 20);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 20, subpage);
			oldLocation = location.href;
		}
	}, 500);
	Session.set("flip-set", false);
}

Template.m4a20.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 20, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a20.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m4a20_2.events({

	'click .paraclick-word': function (evt) {
		if ($(evt.target).hasClass('correctword')) {
			return;
		}
		if ($.k2l.m4a20_2.questionWordLock == false && $.k2l.m4a20_2.stuckFlag == false) {
			$.k2l.m4a20_2.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m4a20_2.questionWordLock = false;
			}, 1000);
			$(evt.target).addClass('correctword');
			$('.correctscreen').removeClass("hidden");
			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m4a20_2.index--;
			$(".counterleft u").html($.k2l.m4a20_2.index);

			if ($.k2l.m4a20_2.index <= 0) {
				$('.navfooter a').removeClass('hidden');
				$('.stuck').addClass('hidden');
			}
		}
	},

	'click .wrong': function (evt) {

		if ($.k2l.m4a20_2.questionWordLock == false && $.k2l.m4a20_2.stuckFlag == false) {
			$.k2l.m4a20_2.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m4a20_2.questionWordLock = false;
			}, 1000);
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
			$.k2l.m4a20_2.wrongscore++;

			if ($.k2l.m4a20_2.wrongscore > 2) {
				$('.stuck').removeClass('hidden');
			}

		}
	},
	'click .stuck': function (evt) {
		$('.stuck').addClass('hidden');
		$.k2l.m4a20_2.wrongscore = 0;
		$.k2l.m4a20_2.index = 0;
		$(".counterleft u").html($.k2l.m4a20_2.index);
		$('.paraclick-word').addClass('correctword');
		$('#m4a20_2 .navfooter a').removeClass('hidden');
		$.k2l.m4a20_2.stuckFlag = true;
	},

	'click .navfooter a': function (evt) {
		$('#m4a20_2 .navfooter a').addClass('hidden');
		$('.stuck').addClass('hidden');
		$('.paraclick-word').removeClass('correctword');
		$.k2l.m4a20_2.wrongscore = 0;
		$.k2l.m4a20_2.index = 6;
		$.k2l.m4a20_2.stuckFlag = false;
		$(".counterleft u").html($.k2l.m4a20_2.index);
	}

});

Template.m4a20_2.rendered = function () {
	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a20_2 == 'undefined') {
		$.k2l.m4a20_2 = {};
	};

	$.k2l.m4a20_2.index = 6;
	$.k2l.m4a20_2.wrongscore = 0;
	$.k2l.m4a20_2.stuckFlag = false;
	$.k2l.m4a20_2.questionWordLock = false;

}


Template.m4a20_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a20_3");
	}
});

Template.m4a20_3.events({

	'click .flippable': function (evt) {

		if (Session.get("flip-set") !== true) {
			$(".flippable").flip({
				trigger: 'manual'
			});
			Session.set("flip-set", true);
		}

		$(evt.currentTarget).flip("toggle");
	}

});

// Template.m4a20.rendered = function () {
// 	$(".flippable").flip({
// 		axis: 'y',
// 		trigger: 'click'
// 	});
// }

Template.m4a20_4.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a20_4");
	}
});

Template.m4a20_4.events({

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

		for (var i = 0; i < $.k2l.m4a20_4.correctAnswers[$.k2l.m4a20_4.index].length; i++) {
			if (userText == $.k2l.m4a20_4.correctAnswers[$.k2l.m4a20_4.index][i]) {
				isCorrect = true;
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
			$.k2l.m4a20_4.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			// $(evt.currentTarget).parent().html($.k2l.m4a20_4.correctAnswers[$.k2l.m4a20_4.index]); //
			$(evt.currentTarget).parent().html($.k2l.m4a20_4.displayAnswers[$.k2l.m4a20_4.index]);
			$('#entryanswer' + $.k2l.m4a20_4.index).addClass('correctword');

			if ($.k2l.m4a20_4.index < $.k2l.m4a20_4.correctAnswers.length - 1) {
				$.k2l.m4a20_4.index++;
				$('#entryanswer' + $.k2l.m4a20_4.index).removeClass('textentry-disabled ddwidth9d');
				$('#entryanswer' + $.k2l.m4a20_4.index).html('<form class="textentry"><input type="text" name="userText" size="9" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m4a20_4.index = 0;
				$.k2l.m4a20_4.wrongcount = 0;
				setTimeout(function () {
					$('#m4a20_4 #welldonecap').removeClass('hidden');
				}, 1000);
				setTimeout(function () {
					$('#m4a20_4 #welldonecap').addClass('hidden');
				}, 2000);
				setTimeout(function () {
					// $(parentSection).addClass('hidden'); // hide this page
					// $(parentSection).next('section').removeClass('hidden');// reveal next page.
					// document.location.hash = $(parentSection).next('section').attr('id');
					// Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 2000);
					$('#m4a20_4 .pagination').removeClass('hidden');
				}, 2000);
			}
		} else {
			$.k2l.m4a20_4.wrongcount++;
			if ($.k2l.m4a20_4.wrongcount >= 1) {
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
		$.k2l.m4a20_4.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m4a20_4.index).html($.k2l.m4a20_4.correctAnswers[$.k2l.m4a20_4.index]); //
		$('#entryanswer' + $.k2l.m4a20_4.index).html($.k2l.m4a20_4.displayAnswers[$.k2l.m4a20_4.index]);
		$('#entryanswer' + $.k2l.m4a20_4.index).addClass('correctword');

		if ($.k2l.m4a20_4.index < $.k2l.m4a20_4.correctAnswers.length - 1) {
			$.k2l.m4a20_4.index++;
			$('#entryanswer' + $.k2l.m4a20_4.index).removeClass('textentry-disabled ddwidth9d');
			$('#entryanswer' + $.k2l.m4a20_4.index).html('<form class="textentry"><input type="text" name="userText" size="9" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
			$('input[name=userText]').focus();
		} else {
			$.k2l.m4a20_4.index = 0;
			$.k2l.m4a20_4.wrongcount = 0;
			// setTimeout(function() {
			// $(parentSection).addClass('hidden'); // hide this page
			// $(parentSection).next('section').removeClass('hidden');// reveal next page.
			// document.location.hash = $(parentSection).next('section').attr('id');
			// Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
			// }, 4000);
			$('#m4a20_4 .pagination').removeClass('hidden');
		}
	},

	"click .pagination": function (evt) {
		$.k2l.m4a20_4.index = 0;
		$.k2l.m4a20_4.wrongcount = 0;
	}

});

Template.m4a20_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a20_4 == 'undefined') {
		$.k2l.m4a20_4 = {};
	};

	$.k2l.m4a20_4.index = 0;
	$.k2l.m4a20_4.wrongcount = 0;

	var correctAnswers = [
		["recently"],
		["too much"],
		["absolutely"],
		["seldom"],
		["locally"],
		["however"]
	];

	var displayAnswers = [
		["Recently"],
		["too much"],
		["absolutely"],
		["seldom"],
		["locally"],
		["However"]
	];

	$.k2l.m4a20_4.displayAnswers = displayAnswers;
	$.k2l.m4a20_4.correctAnswers = correctAnswers;

}


Template.m4a20_input.rendered = function () {
	$('input[name=userText]').first().focus();
}

