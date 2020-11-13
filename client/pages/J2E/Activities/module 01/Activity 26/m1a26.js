Template.m1a26.events({

	'click a.restart': function (evt) {
		$.k2l.m1a26_1.counter = 0;

		$.k2l.m1a26_2.index = 0;
		$.k2l.m1a26_2.allowClick = true;

		$.k2l.m1a26_3.index = 0;
		$.k2l.m1a26_3.wrongcount = 0;

		$.k2l.m1a26_4.counter = 0;

		$.k2l.m1a26_5.counter = 0;

		$.k2l.m1a26_6.index = 0;
		$.k2l.m1a26_6.wrongcount = 0;
	}
})

Template.m1a26.rendered = function () {

	document.title = "Journey 2 English";
	
	setStartActivity(1, 26);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(1, 26, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m1a26.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m1a26_end') {
			return false;
		} return true;
	}
});

Template.m1a26.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 1, 26, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m1a26.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m1a26_1.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a26_1");
	}
});


Template.m1a26_1.events({

	"click .pagination": function (evt) {
		$.k2l.m1a26_1.draggedElement = {};
		$.k2l.m1a26_1.counter = 0;
	}
});

Template.m1a26_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a26_1 == 'undefined') {
		$.k2l.m1a26_1 = {};
	};

	$.k2l.m1a26_1.draggedElement = {};
	$.k2l.m1a26_1.counter = 0;

	//$.k2l.m1a26_1.max = 5; // number of drag spaces on this page.

	$.k2l.m1a26_1.timer = {};

	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m1a26_1";
	initDragDrop(selector, dragDropAmount);


}


Template.m1a26_2.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a26_2");
	}
});


Template.m1a26_2.events({

	"click .button2": function (evt) {

		if ($.k2l.m1a26_2.allowClick == true) {

			$.k2l.m1a26_2.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m1a26_2.answer_index[$.k2l.m1a26_2.index]) {
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout(function () {
					$('.correctscreen').addClass('hidden');
				}, 1000);

				if ($.k2l.m1a26_2.index < $.k2l.m1a26_2.questions.length - 1) {
					$.k2l.m1a26_2.index++;
					setTimeout(function () {
						$('#question').html($.k2l.m1a26_2.questions[$.k2l.m1a26_2.index]);
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$.k2l.m1a26_2.allowClick = true; // Make the buttons clickable again
					}, 1000);
				} else {
					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);
					setTimeout(function () {
						$('#welldonecap').addClass('hidden');
						$.k2l.m1a26_2.index = 0;
						$.k2l.m1a26_2.allowClick = true;
						$(evt.currentTarget).parents('section').addClass('hidden'); // hide this page
						$(evt.currentTarget).parents('section').next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(evt.currentTarget).parents('section').next('section').attr('id');
						Session.set("activeSection", '#' + $(evt.currentTarget).parents('section').next('section').attr('id'));
					}, 2000);

					// $('.pagination').removeClass('hidden');
				}
			} else {
				// incorrect
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
				$.k2l.m1a26_2.allowClick = true; // Make the buttons clickable again
			}
		}
	},
	"click .pagination": function (evt) {
		$.k2l.m1a26_2.index = 0;
		$.k2l.m1a26_2.allowClick = true;
	}
});

Template.m1a26_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a26_2 == 'undefined') {
		$.k2l.m1a26_2 = {};
	};


	var questions = ["<span class='number'>1</span> His part-time job helps him to get by.",
		"<span class='number'>2</span> She didn't get on well with the people in her group",
		"<span class='number'>3</span> Once you get through the first year, it gets easier",
		"<span class='number'>4</span> There's no shortcut, you'll just have to get down to learning the numbers and the alphabet",
		"<span class='number'>5</span> They got out of doing the test because the teacher was off work."
	];

	var answer_index = ["answer2", "answer4", "answer0", "answer1", "answer3"];

	$.k2l.m1a26_2.questions = questions;
	$.k2l.m1a26_2.answer_index = answer_index;
	$.k2l.m1a26_2.index = 0;
	$.k2l.m1a26_2.allowClick = true;
}

Template.m1a26_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a26_3");
	}
});

Template.m1a26_3.events({

	"submit form": function (evt) {

		if (evt.preventDefault) {
			evt.preventDefault();
		}

		// Tidy the user input
		var userText = evt.target.userText.value;
		if (userText.charAt(userText.length - 1) == '.') {
			userText = userText.substr(0, userText.length - 1);
		}
		userText = $.trim(userText);
		userText = userText.toLowerCase();

		if (userText == $.k2l.m1a26_3.correctAnswers[$.k2l.m1a26_3.index]) {
			var parentSection = $(evt.currentTarget).parents('section');
			//correct
			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
			}, 1000);
			$.k2l.m1a26_3.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m1a26_3.correctAnswers[$.k2l.m1a26_3.index]);
			$('#entryanswer' + $.k2l.m1a26_3.index).addClass('correctword');

			if ($.k2l.m1a26_3.index < $.k2l.m1a26_3.correctAnswers.length - 1) {
				$.k2l.m1a26_3.index++;
				$('#entryanswer' + $.k2l.m1a26_3.index).removeClass('blank');
				$('#entryanswer' + $.k2l.m1a26_3.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				$('input[name=userText]').focus();
			} else {

				setTimeout(function () {
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
					$.k2l.m1a26_3.index = 0;
					$.k2l.m1a26_3.wrongcount = 0;
				}, 1000);
			}
		} else {
			$.k2l.m1a26_3.wrongcount++;
			if ($.k2l.m1a26_3.wrongcount >= 1) {
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
		$.k2l.m1a26_3.wrongcount = 0;
		$('#entryanswer' + $.k2l.m1a26_3.index).html($.k2l.m1a26_3.correctAnswers[$.k2l.m1a26_3.index]);
		$('#entryanswer' + $.k2l.m1a26_3.index).addClass('correctword');

		if ($.k2l.m1a26_3.index < $.k2l.m1a26_3.correctAnswers.length - 1) {
			$.k2l.m1a26_3.index++;
			$('#entryanswer' + $.k2l.m1a26_3.index).removeClass('blank');
			$('#entryanswer' + $.k2l.m1a26_3.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
			$('input[name=userText]').focus();
		} else {
			setTimeout(function () {
				$(evt.currentTarget).parents('section').addClass('hidden'); // hide this page
				$(evt.currentTarget).parents('section').next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(evt.currentTarget).parents('section').next('section').attr('id');
				$.k2l.m1a26_3.index = 0;
				$.k2l.m1a26_3.wrongcount = 0;
				Session.set("activeSection", '#' + $(evt.currentTarget).parents('section').next('section').attr('id'));
			}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},

	"click .pagination": function (evt) {
		$.k2l.m1a26_3.index = 0;
		$.k2l.m1a26_3.wrongcount = 0;
	}

});

Template.m1a26_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a26_3 == 'undefined') {
		$.k2l.m1a26_3 = {};
	};

	$.k2l.m1a26_3.index = 0;
	$.k2l.m1a26_3.wrongcount = 0;

	var correctAnswers = [
		["on"], // Possible answers for Q1.
		["by"],   // Possible answers for Q2.
		["through"], // etc.
		["down"],
		["out"]
	];

	$.k2l.m1a26_3.correctAnswers = correctAnswers;
}

Template.m1a26_4.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a26_4");
	}
});


Template.m1a26_4.events({

	"click .pagination": function (evt) {
		$.k2l.m1a26_4.draggedElement = {};
		$.k2l.m1a26_4.counter = 0;
	}
});

Template.m1a26_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a26_4 == 'undefined') {
		$.k2l.m1a26_4 = {};
	};

	$.k2l.m1a26_4.draggedElement = {};
	$.k2l.m1a26_4.counter = 0;

	//$.k2l.m1a26_4.max = 2; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m1a26_4";
	initDragDrop(selector, dragDropAmount);

}


Template.m1a26_5.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a26_5");
	}
});


Template.m1a26_5.events({

	"click .pagination": function (evt) {
		$.k2l.m1a26_5.draggedElement = {};
		$.k2l.m1a26_5.counter = 0;
	}
});

Template.m1a26_5.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a26_5 == 'undefined') {
		$.k2l.m1a26_5 = {};
	};

	$.k2l.m1a26_5.draggedElement = {};
	$.k2l.m1a26_5.counter = 0;

	//$.k2l.m1a26_5.max = 2; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m1a26_5";
	initDragDrop(selector, dragDropAmount);

}


Template.m1a26_6.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a26_6");
	}
});

Template.m1a26_6.events({

	"submit form": function (evt) {

		if (evt.preventDefault) {
			evt.preventDefault();
		}

		// Tidy the user input
		var userText = evt.target.userText.value;
		if (userText.charAt(userText.length - 1) == '.') {
			userText = userText.substr(0, userText.length - 1);
		}
		userText = $.trim(userText);
		userText = userText.toLowerCase();

		if (userText == $.k2l.m1a26_6.correctAnswers[$.k2l.m1a26_6.index]) {
			//correct
			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
			}, 1000);
			var section = $(evt.currentTarget).parents('section');
			$.k2l.m1a26_6.wrongcount = 0;
			$('.stuck').addClass('hidden');  //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m1a26_6.correctAnswers[$.k2l.m1a26_6.index]);
			$('#entryanswer' + $.k2l.m1a26_6.index).addClass('correctword');

			if ($.k2l.m1a26_6.index < $.k2l.m1a26_6.correctAnswers.length - 1) {
				$.k2l.m1a26_6.index++;
				$('#entryanswer' + $.k2l.m1a26_6.index).removeClass('blank');
				$('#entryanswer' + $.k2l.m1a26_6.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				$('input[name=userText]').focus();
			} else {

				setTimeout(function () {
					section.addClass('hidden'); // hide this page
					section.next('section').removeClass('hidden');// reveal next page.
					document.location.hash = section.next('section').attr('id');
					Session.set("activeSection", section.next('section').attr('id'));
					$.k2l.m1a26_6.index = 0;
					$.k2l.m1a26_6.wrongcount = 0;
				}, 1500);

				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m1a26_6.wrongcount++;
			$('.incorrectscreen').removeClass('hidden');
			setTimeout(function () {
				$('.incorrectscreen').addClass('hidden');
			}, 1000);

			if ($.k2l.m1a26_6.wrongcount >= 1) {
				$('.stuck').removeClass('hidden');
			}
			$(evt.currentTarget).parent().nextAll('.incorrect').first().css('visibility', 'visible');
			//$(evt.currentTarget).parent().nextAll('.incorrect').first().css('display','block');
			setTimeout(function () {
				$(evt.currentTarget).parent().nextAll('.incorrect').first().css('visibility', 'hidden');
			}, 1200);
			evt.target.userText.value = "";
		}
	},

	"click .stuck-button": function (evt) {
		$('.incorrect').css('visibility', 'hidden');
		var section = $(evt.currentTarget).parents('section');
		$('.stuck').addClass('hidden'); //hide stuck button if visible
		$.k2l.m1a26_6.wrongcount = 0;
		$('#entryanswer' + $.k2l.m1a26_6.index).html($.k2l.m1a26_6.correctAnswers[$.k2l.m1a26_6.index]);
		$('#entryanswer' + $.k2l.m1a26_6.index).addClass('correctword');

		if ($.k2l.m1a26_6.index < $.k2l.m1a26_6.correctAnswers.length - 1) {
			$.k2l.m1a26_6.index++;
			$('#entryanswer' + $.k2l.m1a26_6.index).removeClass('blank');
			$('#entryanswer' + $.k2l.m1a26_6.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
			$('input[name=userText]').focus();
		} else {
			setTimeout(function () {
				section.addClass('hidden'); // hide this page
				section.next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(evt.currentTarget).parents('section').next('section').attr('id');
				$.k2l.m1a26_6.index = 0;
				$.k2l.m1a26_6.wrongcount = 0;
				Session.set("activeSection", '#' + section.next('section').attr('id'));
			}, 4000);
		}
	},

	"click .pagination": function (evt) {
		$.k2l.m1a26_6.index = 0;
		$.k2l.m1a26_6.wrongcount = 0;
	}

});

Template.m1a26_6.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a26_6 == 'undefined') {
		$.k2l.m1a26_6 = {};
	};

	$.k2l.m1a26_6.index = 0;
	$.k2l.m1a26_6.wrongcount = 0;

	var correctAnswers = [
		["find out"], // Possible answers for Q1.
		["comes to"]
	];

	$.k2l.m1a26_6.correctAnswers = correctAnswers;
}
