Template.m9a28.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m9a28_end') {
			return false;
		}
		return true;
	}
});

Template.m9a28.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(9, 28);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(9, 28, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m9a28.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 9, 28, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m9a28.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m9a28_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a28_2");
	}
});

Template.m9a28_2.events({

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

		for (var i = 0; i < $.k2l.m9a28_2.correctAnswers[$.k2l.m9a28_2.index].length; i++) {
			if (userText == $.k2l.m9a28_2.correctAnswers[$.k2l.m9a28_2.index][i]) {
				isCorrect = true;
				$.k2l.m9a28_2.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m9a28_2.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			// $(evt.currentTarget).parent().html($.k2l.m9a28_2.correctAnswers[$.k2l.m9a28_2.index]);
			$(evt.currentTarget).parent().html($.k2l.m9a28_2.displayAnswers[$.k2l.m9a28_2.index]); // use this if there are multiple possible answers
			$('#entryanswer' + $.k2l.m9a28_2.index).addClass('correctword');

			if ($.k2l.m9a28_2.index < $.k2l.m9a28_2.correctAnswers.length - 1) {
				$.k2l.m9a28_2.index++;
				$("#wordCount").html($.k2l.m9a28_2.wordCounts[$.k2l.m9a28_2.index]);
				$('#entryanswer' + $.k2l.m9a28_2.index).removeClass('textentry-disabled');
				$('#entryanswer' + $.k2l.m9a28_2.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m9a28_2.index = 0;
				$.k2l.m9a28_2.wrongcount = 0;
				setTimeout(function () {
					$('#welldonecap').removeClass('hidden');
				}, 1000);
				setTimeout(function () {
					$('#welldonecap').addClass('hidden');
				}, 2000);
				setTimeout(function () {
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
				}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m9a28_2.wrongcount++;
			if ($.k2l.m9a28_2.wrongcount >= 1) {
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
		$.k2l.m9a28_2.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m9a28_2.index).html($.k2l.m9a28_2.correctAnswers[$.k2l.m9a28_2.index]);
		$('#entryanswer' + $.k2l.m9a28_2.index).html($.k2l.m9a28_2.displayAnswers[$.k2l.m9a28_2.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer' + $.k2l.m9a28_2.index).addClass('correctword');

		if ($.k2l.m9a28_2.index < $.k2l.m9a28_2.correctAnswers.length - 1) {
			$.k2l.m9a28_2.index++;
			$("#wordCount").html($.k2l.m9a28_2.wordCounts[$.k2l.m9a28_2.index]);
			$('#entryanswer' + $.k2l.m9a28_2.index).removeClass('textentry-disabled');
			$('#entryanswer' + $.k2l.m9a28_2.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
			$('input[name=userText]').focus();
		} else {
			$.k2l.m9a28_2.index = 0;
			$.k2l.m9a28_2.wrongcount = 0;
			setTimeout(function () {
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
			}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},

	"click .pagination": function (evt) {
		$.k2l.m9a28_2.index = 0;
		$.k2l.m9a28_2.wrongcount = 0;
	}

});

Template.m9a28_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m9a28_2 == 'undefined') {
		$.k2l.m9a28_2 = {};
	};

	$.k2l.m9a28_2.index = 0;
	$.k2l.m9a28_2.wrongcount = 0;
	$.k2l.m9a28_2.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
		["red handed", "red-handed"], // Possible answers for Q1.
		["pass"],   // Possible answers for Q2.
		["buck"], // etc.
		["question", "matter"],
		//["answer1", "answer2"], // Use this for multiple possible answers
		["finger"],
		["every pie"]
	];

	var displayAnswers = [
		["red-handed"], // Possible answers for Q1.
		["pass"],   // Possible answers for Q2.
		["buck"], // etc.
		["question/matter"],
		//["answer1", "answer2"], // Use this for multiple possible answers
		["finger"],
		["every pie"]
	];

	var wordCounts = [2,1,1,1,1,2];

	$.k2l.m9a28_2.displayAnswers = displayAnswers;
	$.k2l.m9a28_2.correctAnswers = correctAnswers;
	$.k2l.m9a28_2.wordCounts = wordCounts;

}

Template.m9a28_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a28_1");
	}
});

Template.m9a28_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m9a28_1 == 'undefined') {
		$.k2l.m9a28_1 = {};
	};

	var dragDropAmount = 4;
	var selector = "#m9a28_1";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m9a28_1",
		nextPage: "#m9a28_2",
	};
	initDragDrop(selector, dragDropAmount, options);
}

