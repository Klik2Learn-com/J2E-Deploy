Template.m2a16.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m2a16_end') {
			return false;
		} return true;
	}
});

Template.m2a16.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(2, 16);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 16, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m2a16.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 16, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m2a16.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


Template.m2a16_2.rendered = function () {

	// Add drag and drop
	var dragDropAmount = 16;
	var selector = "#m2a16_2";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m2a16_2.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a16_2");
	}

});



Template.m2a16_3.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a16_3");
	}
});

Template.m2a16_3.events({

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

		// Determine if the user's input is the correct answer or not
		for (var i = 0; i < $.k2l.m2a16_3.correctAnswers[$.k2l.m2a16_3.index].length; i++) {
			if (userText == $.k2l.m2a16_3.correctAnswers[$.k2l.m2a16_3.index][i]) {
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
			$.k2l.m2a16_3.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			//$(evt.currentTarget).parent().html($.k2l.m2a16_3.correctAnswers[$.k2l.m2a16_3.index]);
			$(evt.currentTarget).parent().html($.k2l.m2a16_3.displayAnswers[$.k2l.m2a16_3.index]); // use this is there is multiple possible answers
			$('#entryanswer' + $.k2l.m2a16_3.index).addClass('correctword');

			if ($.k2l.m2a16_3.index < $.k2l.m2a16_3.correctAnswers.length - 1) {
				$.k2l.m2a16_3.index++;
				$('#entryanswer' + $.k2l.m2a16_3.index).removeClass('textentry-disabled');
				$('#entryanswer' + $.k2l.m2a16_3.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off" ><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();


			} else {
				$.k2l.m2a16_3.index = 0;
				$.k2l.m2a16_3.wrongcount = 0;
				setTimeout(function () {
					$('#welldonecap').removeClass('hidden');
				}, 1000);
				setTimeout(function () {
					$('#welldonecap').addClass('hidden');
				}, 2000);
				// setTimeout(function() {
				// $(parentSection).addClass('hidden'); // hide this page
				// $(parentSection).next('section').removeClass('hidden');// reveal next page.
				// document.location.hash = $(parentSection).next('section').attr('id');
				// Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
				// }, 2000);
				$('#m2a16_3 .pagination').removeClass('hidden');
			}
		} else {
			// store previous attempt
			$.k2l.m2a16_3.wrongcount++;
			if ($.k2l.m2a16_3.wrongcount >= 1) {
				$('.stuck').removeClass('hidden');
			}
			$('.incorrectscreen').removeClass('hidden');
			setTimeout(function () {
				$('.incorrectscreen').addClass('hidden');
			}, 1000);
			// Clear the previous attempt to show placeholder
			evt.target.userText.value = "";
		}
	},

	"click .stuck-button": function (evt) {
		$('.incorrectscreen').addClass('hidden');
		var parentSection = $(evt.currentTarget).parents('section');
		$('.stuck').addClass('hidden'); //hide stuck button if visible
		$.k2l.m2a16_3.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m2a16_3.index).html($.k2l.m2a16_3.correctAnswers[$.k2l.m2a16_3.index]);
		$('#entryanswer' + $.k2l.m2a16_3.index).html($.k2l.m2a16_3.displayAnswers[$.k2l.m2a16_3.index]); // use this is there is multiple possible answers
		$('#entryanswer' + $.k2l.m2a16_3.index).addClass('correctword');

		if ($.k2l.m2a16_3.index < $.k2l.m2a16_3.correctAnswers.length - 1) {
			$.k2l.m2a16_3.index++;
			$('#entryanswer' + $.k2l.m2a16_3.index).removeClass('textentry-disabled');
			$('#entryanswer' + $.k2l.m2a16_3.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off" ><input type="submit" value="OK"></form>');
			$('input[name=userText]').focus();

		} else {
			$.k2l.m2a16_3.index = 0;
			$.k2l.m2a16_3.wrongcount = 0;
			setTimeout(function () {
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
			}, 4000);
			// $('.pagination').removeClass('hidden');
		}
	},

	"click .pagination": function (evt) {
		$.k2l.m2a16_3.index = 0;
		$.k2l.m2a16_3.wrongcount = 0;
	}

});

Template.m2a16_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	}

	if (typeof $.k2l.m2a16_3 == 'undefined') {
		$.k2l.m2a16_3 = {};
	}

	$.k2l.m2a16_3.index = 0;
	$.k2l.m2a16_3.wrongcount = 0;

	var correctAnswers = [
		["luggage"], // Possible answers for Q1.
		["view"],   // Possible answers for Q2.
		["furniture"], // etc.
		["music"],
		["travel"],
		["battery"],
		["hotel"],
		["work"]
	];

	var displayAnswers = [
		["Luggage"], // Possible answers for Q1.
		["View"],   // Possible answers for Q2.
		["Furniture"], // etc.
		["Music"],
		["Travel"],
		["Battery"],
		["Hotel"],
		["Work"]
	];


	// This could be 'better' but I'm cheating for now
	//  var firstLetters = [
	//    ["L"],
	// ["V"],
	// ["F"],
	// ["M"],
	// ["T"],
	// ["B"],
	// ["H"],
	// ["W"]
	//  ];

	//for (var i=0; i<displayAnswers.length; i++) {
	//var temp = displayAnswers[i].slice(0,1);
	//firstLetters.push(temp);
	//}

	$.k2l.m2a16_3.displayAnswers = displayAnswers;
	$.k2l.m2a16_3.correctAnswers = correctAnswers;
	// $.k2l.m2a16_3.firstLetters = firstLetters;

	// Function used to change cursor position
	$.fn.selectRange = function (start, end) {
		if (end === undefined) {
			end = start;
		}
		return this.each(function () {
			if ('selectionStart' in this) {
				this.selectionStart = start;
				this.selectionEnd = end;
			} else if (this.setSelectionRange) {
				this.setSelectionRange(start, end);
			} else if (this.createTextRange) {
				var range = this.createTextRange();
				range.collapse(true);
				range.moveEnd('character', end);
				range.moveStart('character', start);
				range.select();
			}
		});
	};

};