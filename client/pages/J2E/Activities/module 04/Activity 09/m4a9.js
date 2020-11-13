/**
 * CHANGE THIS PAGE TO USE JqueryUI drag-drop
 */


Template.m4a9.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m4a9_end') {
			return false;
		}
		return true;
	},

	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m4a9");
	}
})

Template.m4a9.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m4a9.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m4a9.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m4a9.sound.src = {};
	}

});

Template.m4a9.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(4, 9);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 9, subpage);
			oldLocation = location.href;
		}
	}, 500);


	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a9 == 'undefined') {
		$.k2l.m4a9 = {};
	};

	$.k2l.m4a9.sound = new Audio();
}


Template.m4a9.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 9, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a9.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m4a9_10.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a9_10");
	}
});

Template.m4a9_10.events({

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

		for (var i = 0; i < $.k2l.m4a9_10.correctAnswers[$.k2l.m4a9_10.index].length; i++) {
			if (userText == $.k2l.m4a9_10.correctAnswers[$.k2l.m4a9_10.index][i]) {
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
			$.k2l.m4a9_10.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m4a9_10.correctAnswers[$.k2l.m4a9_10.index]);
			// $(evt.currentTarget).parent().html($.k2l.m4a9_10.displayAnswers[$.k2l.m4a9_10.index]); // use this is there is multiple possible answers
			$('#entryanswer' + $.k2l.m4a9_10.index).addClass('correctword');

			if ($.k2l.m4a9_10.index < $.k2l.m4a9_10.correctAnswers.length - 1) {
				$.k2l.m4a9_10.index++;
				$('#entryanswer' + $.k2l.m4a9_10.index).removeClass('textentry-disabled ddwidth10');
				$('#entryanswer' + $.k2l.m4a9_10.index).html('<form class="textentry"><input type="text" name="userText" size="10" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m4a9_10.index = 0;
				$.k2l.m4a9_10.wrongcount = 0;
				setTimeout(function () {
					$('#welldonecap').removeClass('hidden');
				}, 1000);
				setTimeout(function () {
					$('#welldonecap').addClass('hidden');
				}, 2000);
				setTimeout(function () {
					$.k2l.m4a9.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
				}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m4a9_10.wrongcount++;
			if ($.k2l.m4a9_10.wrongcount >= 1) {
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
		$.k2l.m4a9_10.wrongcount = 0;
		$('#entryanswer' + $.k2l.m4a9_10.index).html($.k2l.m4a9_10.correctAnswers[$.k2l.m4a9_10.index]);
		// $('#entryanswer'+$.k2l.m4a9_10.index).html($.k2l.m4a9_10.displayAnswers[$.k2l.m4a9_10.index]); // use this is there is multiple possible answers
		$('#entryanswer' + $.k2l.m4a9_10.index).addClass('correctword');

		if ($.k2l.m4a9_10.index < $.k2l.m4a9_10.correctAnswers.length - 1) {
			$.k2l.m4a9_10.index++;
			$('#entryanswer' + $.k2l.m4a9_10.index).removeClass('textentry-disabled ddwidth10');
			$('#entryanswer' + $.k2l.m4a9_10.index).html('<form class="textentry"><input type="text" name="userText" size="10" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
			$('input[name=userText]').focus();
		} else {
			$.k2l.m4a9_10.index = 0;
			$.k2l.m4a9_10.wrongcount = 0;
			setTimeout(function () {
				$.k2l.m4a9.sound.src = {};
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
			}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},

	"click .pagination": function (evt) {
		$.k2l.m4a9_10.index = 0;
		$.k2l.m4a9_10.wrongcount = 0;
	}

});

Template.m4a9_10.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a9_10 == 'undefined') {
		$.k2l.m4a9_10 = {};
	};

	$.k2l.m4a9_10.index = 0;
	$.k2l.m4a9_10.wrongcount = 0;

	var correctAnswers = [
		["sling"],
		["bandage"],
		["drip"]
	];

	/* var displayAnswers = [
		["sling"],
		["bandage"],
		["drip"]
	]; 
	
$.k2l.m4a9_10.displayAnswers = displayAnswers; */
	$.k2l.m4a9_10.correctAnswers = correctAnswers;

}

Template.m4a9_11.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a9_11");
	}
});


Template.m4a9_11.events({

	"click .pagination": function (evt) {
		$.k2l.m4a9_11.draggedElement = {};
		$.k2l.m4a9_11.index = 0;
	},
	
	"drop .ddtarget2": function (evt) {
		evt.preventDefault();
		var nodeEl = evt.originalEvent.target;
		var parent = nodeEl.parentElement;
		//var drag = evt.toElement.parentElement;
        if ($(parent).data("destination") == $(evt.target).data('destinationid')){
			$(parent).addClass('dd-img-wrapper2');
        }
    }

});

Template.m4a9_11.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a9_11 == 'undefined') {
		$.k2l.m4a9_11 = {};
	};

	$.k2l.m4a9_11.draggedElement = {};
	$.k2l.m4a9_11.index = 0;

	// $.k2l.m4a9_11.max = 1; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m4a9_11";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m4a9_11",
		nextPage: "#m4a9_12"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m4a9_13.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a9_13");
	}
});

Template.m4a9_13.events({

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

		for (var i = 0; i < $.k2l.m4a9_13.correctAnswers[$.k2l.m4a9_13.index].length; i++) {
			if (userText == $.k2l.m4a9_13.correctAnswers[$.k2l.m4a9_13.index][i]) {
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
			$.k2l.m4a9_13.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m4a9_13.correctAnswers[$.k2l.m4a9_13.index]);
			// $(evt.currentTarget).parent().html($.k2l.m4a9_13.displayAnswers[$.k2l.m4a9_13.index]); // use this is there is multiple possible answers
			$('#entryanswer' + $.k2l.m4a9_13.index).addClass('correctword');

			if ($.k2l.m4a9_13.index < $.k2l.m4a9_13.correctAnswers.length - 1) {
				$.k2l.m4a9_13.index++;
				$('#entryanswer' + $.k2l.m4a9_13.index).removeClass('textentry-disabled ddwidth10');
				$('#entryanswer' + $.k2l.m4a9_13.index).html('<form class="textentry"><input type="text" name="userText" size="10" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m4a9_13.index = 0;
				$.k2l.m4a9_13.wrongcount = 0;
				setTimeout(function () {
					$('#welldonecap').removeClass('hidden');
				}, 1000);
				setTimeout(function () {
					$('#welldonecap').addClass('hidden');
				}, 2000);
				setTimeout(function () {
					$.k2l.m4a9.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
				}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m4a9_13.wrongcount++;
			if ($.k2l.m4a9_13.wrongcount >= 1) {
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
		$.k2l.m4a9_13.wrongcount = 0;
		$('#entryanswer' + $.k2l.m4a9_13.index).html($.k2l.m4a9_13.correctAnswers[$.k2l.m4a9_13.index]);
		// $('#entryanswer'+$.k2l.m4a9_13.index).html($.k2l.m4a9_13.displayAnswers[$.k2l.m4a9_13.index]); // use this is there is multiple possible answers
		$('#entryanswer' + $.k2l.m4a9_13.index).addClass('correctword');

		if ($.k2l.m4a9_13.index < $.k2l.m4a9_13.correctAnswers.length - 1) {
			$.k2l.m4a9_13.index++;
			$('#entryanswer' + $.k2l.m4a9_13.index).removeClass('textentry-disabled ddwidth10');
			$('#entryanswer' + $.k2l.m4a9_13.index).html('<form class="textentry"><input type="text" name="userText" size="10" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
			$('input[name=userText]').focus();
		} else {
			$.k2l.m4a9_13.index = 0;
			$.k2l.m4a9_13.wrongcount = 0;
			setTimeout(function () {
				$.k2l.m4a9.sound.src = {};
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
			}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},

	"click .pagination": function (evt) {
		$.k2l.m4a9_13.index = 0;
		$.k2l.m4a9_13.wrongcount = 0;
	}

});

Template.m4a9_13.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a9_13 == 'undefined') {
		$.k2l.m4a9_13 = {};
	};

	$.k2l.m4a9_13.index = 0;
	$.k2l.m4a9_13.wrongcount = 0;

	var correctAnswers = [
		["stretcher"]
	];

	$.k2l.m4a9_13.correctAnswers = correctAnswers;

}

Template.m4a9_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a9_2");
	}
});

Template.m4a9_2.events({
	"click .pagination": function (evt) {
		$.k2l.m4a9_2.draggedElement = {};
		$.k2l.m4a9_2.index = 0;
	},
	
	"drop .ddtarget2": function (evt) {
		evt.preventDefault();
		// console.log(evt.toElement);
		// console.log(evt.target);
		// console.log(evt.relatedTarget);
		// console.log(evt.currentTarget);
		
		var nodeEl = evt.originalEvent.target;
		var parent = nodeEl.parentElement;
		//var drag = evt.toElement.parentElement;
        if ($(parent).data("destination") == $(evt.target).data('destinationid')){
			$(parent).addClass('dd-img-wrapper2');
        }
    }
});

Template.m4a9_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a9_2 == 'undefined') {
		$.k2l.m4a9_2 = {};
	};

	$.k2l.m4a9_2.draggedElement = {};
	$.k2l.m4a9_2.index = 0;

	// $.k2l.m4a9_2.max = 3; // number of drag spaces on this page.
	Session.set("init", false);

	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m4a9_2";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m4a9_2",
		nextPage: "#m4a9_3"
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m4a9_4.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a9_4");
	}
});

Template.m4a9_4.events({

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

		for (var i = 0; i < $.k2l.m4a9_4.correctAnswers[$.k2l.m4a9_4.index].length; i++) {
			if (userText == $.k2l.m4a9_4.correctAnswers[$.k2l.m4a9_4.index][i]) {
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
			$.k2l.m4a9_4.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m4a9_4.correctAnswers[$.k2l.m4a9_4.index]);
			// $(evt.currentTarget).parent().html($.k2l.m4a9_4.displayAnswers[$.k2l.m4a9_4.index]); // use this is there is multiple possible answers
			$('#entryanswer' + $.k2l.m4a9_4.index).addClass('correctword');

			if ($.k2l.m4a9_4.index < $.k2l.m4a9_4.correctAnswers.length - 1) {
				$.k2l.m4a9_4.index++;
				$('#entryanswer' + $.k2l.m4a9_4.index).removeClass('textentry-disabled');
				$('#entryanswer' + $.k2l.m4a9_4.index).html('<form class="textentry"><input type="text" name="userText" size="10" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m4a9_4.index = 0;
				$.k2l.m4a9_4.wrongcount = 0;
				setTimeout(function () {
					$('#welldonecap').removeClass('hidden');
				}, 1000);
				setTimeout(function () {
					$('#welldonecap').addClass('hidden');
				}, 2000);
				setTimeout(function () {
					$.k2l.m4a9.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
				}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m4a9_4.wrongcount++;
			if ($.k2l.m4a9_4.wrongcount >= 1) {
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
		$.k2l.m4a9_4.wrongcount = 0;
		$('#entryanswer' + $.k2l.m4a9_4.index).html($.k2l.m4a9_4.correctAnswers[$.k2l.m4a9_4.index]);
		// $('#entryanswer'+$.k2l.m4a9_4.index).html($.k2l.m4a9_4.displayAnswers[$.k2l.m4a9_4.index]); // use this is there is multiple possible answers
		$('#entryanswer' + $.k2l.m4a9_4.index).addClass('correctword');

		if ($.k2l.m4a9_4.index < $.k2l.m4a9_4.correctAnswers.length - 1) {
			$.k2l.m4a9_4.index++;
			$('#entryanswer' + $.k2l.m4a9_4.index).removeClass('textentry-disabled');
			$('#entryanswer' + $.k2l.m4a9_4.index).html('<form class="textentry"><input type="text" name="userText" size="10" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
			$('input[name=userText]').focus();
		} else {
			$.k2l.m4a9_4.index = 0;
			$.k2l.m4a9_4.wrongcount = 0;
			setTimeout(function () {
				$.k2l.m4a9.sound.src = {};
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
			}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},

	"click .pagination": function (evt) {
		$.k2l.m4a9_4.index = 0;
		$.k2l.m4a9_4.wrongcount = 0;
	}

});

Template.m4a9_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a9_4 == 'undefined') {
		$.k2l.m4a9_4 = {};
	};

	$.k2l.m4a9_4.index = 0;
	$.k2l.m4a9_4.wrongcount = 0;

	var correctAnswers = [
		["plaster"],
		["syringe"],
		["stethoscope"]
	];

	/* var displayAnswers = [
		["plaster"],
		["syringe"],
		["stethoscope"]
	]; 
	
$.k2l.m4a9_4.displayAnswers = displayAnswers; */
	$.k2l.m4a9_4.correctAnswers = correctAnswers;

}

Template.m4a9_5.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a9_5");
	}
});


Template.m4a9_5.events({

	"click .pagination": function (evt) {
		$.k2l.m4a9_5.draggedElement = {};
		$.k2l.m4a9_5.index = 0;
	},
	
	"drop .ddtarget2": function (evt) {
		evt.preventDefault();
		var nodeEl = evt.originalEvent.target;
		var parent = nodeEl.parentElement;
		//var drag = evt.toElement.parentElement;
        if ($(parent).data("destination") == $(evt.target).data('destinationid')){
			$(parent).addClass('dd-img-wrapper2');
        }
    }
});

Template.m4a9_5.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a9_5 == 'undefined') {
		$.k2l.m4a9_5 = {};
	};

	$.k2l.m4a9_5.draggedElement = {};
	$.k2l.m4a9_5.index = 0;

	// $.k2l.m4a9_5.max = 2; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m4a9_5";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m4a9_5",
		nextPage: "#m4a9_6"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m4a9_7.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a9_7");
	}
});

Template.m4a9_7.events({

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

		for (var i = 0; i < $.k2l.m4a9_7.correctAnswers[$.k2l.m4a9_7.index].length; i++) {
			if (userText == $.k2l.m4a9_7.correctAnswers[$.k2l.m4a9_7.index][i]) {
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
			$.k2l.m4a9_7.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m4a9_7.correctAnswers[$.k2l.m4a9_7.index]);
			// $(evt.currentTarget).parent().html($.k2l.m4a9_7.displayAnswers[$.k2l.m4a9_7.index]); // use this is there is multiple possible answers
			$('#entryanswer' + $.k2l.m4a9_7.index).addClass('correctword');

			if ($.k2l.m4a9_7.index < $.k2l.m4a9_7.correctAnswers.length - 1) {
				$.k2l.m4a9_7.index++;
				$('#entryanswer' + $.k2l.m4a9_7.index).removeClass('textentry-disabled ddwidth10');
				$('#entryanswer' + $.k2l.m4a9_7.index).html('<form class="textentry"><input type="text" name="userText" size="10" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m4a9_7.index = 0;
				$.k2l.m4a9_7.wrongcount = 0;
				setTimeout(function () {
					$('#welldonecap').removeClass('hidden');
				}, 1000);
				setTimeout(function () {
					$('#welldonecap').addClass('hidden');
				}, 2000);
				setTimeout(function () {
					$.k2l.m4a9.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
				}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m4a9_7.wrongcount++;
			if ($.k2l.m4a9_7.wrongcount >= 1) {
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
		$.k2l.m4a9_7.wrongcount = 0;
		$('#entryanswer' + $.k2l.m4a9_7.index).html($.k2l.m4a9_7.correctAnswers[$.k2l.m4a9_7.index]);
		// $('#entryanswer'+$.k2l.m4a9_7.index).html($.k2l.m4a9_7.displayAnswers[$.k2l.m4a9_7.index]); // use this is there is multiple possible answers
		$('#entryanswer' + $.k2l.m4a9_7.index).addClass('correctword');

		if ($.k2l.m4a9_7.index < $.k2l.m4a9_7.correctAnswers.length - 1) {
			$.k2l.m4a9_7.index++;
			$('#entryanswer' + $.k2l.m4a9_7.index).removeClass('textentry-disabled ddwidth10');
			$('#entryanswer' + $.k2l.m4a9_7.index).html('<form class="textentry"><input type="text" name="userText" size="10" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
			$('input[name=userText]').focus();
		} else {
			$.k2l.m4a9_7.index = 0;
			$.k2l.m4a9_7.wrongcount = 0;
			setTimeout(function () {
				$.k2l.m4a9.sound.src = {};
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
			}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},

	"click .pagination": function (evt) {
		$.k2l.m4a9_7.index = 0;
		$.k2l.m4a9_7.wrongcount = 0;
	}

});

Template.m4a9_7.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a9_7 == 'undefined') {
		$.k2l.m4a9_7 = {};
	};

	$.k2l.m4a9_7.index = 0;
	$.k2l.m4a9_7.wrongcount = 0;

	var correctAnswers = [
		["filling"],
		["drill"]
	];

	/* var displayAnswers = [
		["filling"],
		["drill"]
	]; 
	
$.k2l.m4a9_7.displayAnswers = displayAnswers; */
	$.k2l.m4a9_7.correctAnswers = correctAnswers;

}

Template.m4a9_8.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a9_8");
	}
});


Template.m4a9_8.events({

	"click .pagination": function (evt) {
		$.k2l.m4a9_8.draggedElement = {};
		$.k2l.m4a9_8.index = 0;
	},
	
	"drop .ddtarget2": function (evt) {
		evt.preventDefault();
		var nodeEl = evt.originalEvent.target;
		var parent = nodeEl.parentElement;
		//var drag = evt.toElement.parentElement;
        if ($(parent).data("destination") == $(evt.target).data('destinationid')){
			$(parent).addClass('dd-img-wrapper2');
        }
    }
});

Template.m4a9_8.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a9_8 == 'undefined') {
		$.k2l.m4a9_8 = {};
	};

	$.k2l.m4a9_8.draggedElement = {};
	$.k2l.m4a9_8.index = 0;

	// $.k2l.m4a9_8.max = 3; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m4a9_8";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m4a9_8",
		nextPage: "#m4a9_9"
	};
	initDragDrop(selector, dragDropAmount, options);

	
}
