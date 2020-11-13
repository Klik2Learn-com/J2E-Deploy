

Template.m2a12.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m2a12_end') {
			return false;
		} return true;
	}
});

Template.m2a12.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 12, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};


Template.m2a12.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(2, 12);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 12, subpage);
			oldLocation = location.href;
		}
	}, 500);

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a12 == 'undefined') {
		$.k2l.m2a12 = {};
	};

	$.k2l.m2a12.index = 0;
	$.k2l.m2a12.wrongcount = 0;

}



Template.m2a12.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m2a12_5.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a12_5");
	}
});

Template.m2a12_5.events({

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

		if (userText == $.k2l.m2a12_5.correctAnswers[$.k2l.m2a12.index]) {
			//correct
			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
			}, 1000);
			var section = $(evt.currentTarget).parents('section');
			$.k2l.m2a12.wrongcount = 0;
			$('.stuck').addClass('hidden');  //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m2a12_5.correctAnswers[$.k2l.m2a12.index]);
			$('#entryanswer' + $.k2l.m2a12.index).addClass('correctword');

			if ($.k2l.m2a12.index < $.k2l.m2a12_5.correctAnswers.length - 1) {
				$.k2l.m2a12.index++;
				$('#entryanswer' + $.k2l.m2a12.index).removeClass('textentry-disabled');
				$('#entryanswer' + $.k2l.m2a12.index).html('<form class="textentry"><input type="text" name="userText" size="15" autocomplete="off"><input type="submit" value="OK"></form>');
				$('input[name=userText]').focus();
			} else {
				$.k2l.m2a12.index = 0;
				setTimeout(function () {
					$('#welldonecap').removeClass('hidden');
				}, 1000);
				setTimeout(function () {
					$('#welldonecap').addClass('hidden');
				}, 2000);
				resetActVariables();
				setTimeout(function () {
					section.addClass('hidden'); // hide this page
					section.next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(evt.currentTarget).parents('section').next('section').attr('id');
					Session.set("activeSection", '#' + section.next('section').attr('id'));
				}, 2000);

				// $('#btnNext').removeClass('hidden');
				// $('#welldonecap').removeClass('hidden');
			}
		} else {
			$('.incorrectscreen').removeClass('hidden');
			setTimeout(function () {
				$('.incorrectscreen').addClass('hidden');
			}, 1000);
			$.k2l.m2a12.wrongcount++;

			if ($.k2l.m2a12.wrongcount >= 1) {
				$('.stuck').removeClass('hidden');
			}

			$(evt.currentTarget).parent().nextAll('.incorrect').first().removeClass('hidden');
			$(evt.currentTarget).parent().nextAll('.incorrect').first().fadeOut('3000');
			evt.target.userText.value = "";
		}
	},

	"click .stuck-button": function (evt) {
		var section = $(evt.currentTarget).parents('section');
		$('.stuck').addClass('hidden'); //hide stuck button if visible
		$.k2l.m2a12.wrongcount = 0;
		$('#entryanswer' + $.k2l.m2a12.index).html($.k2l.m2a12_5.correctAnswers[$.k2l.m2a12.index]);
		$('#entryanswer' + $.k2l.m2a12.index).addClass('correctword');

		if ($.k2l.m2a12.index < $.k2l.m2a12_5.correctAnswers.length - 1) {
			$.k2l.m2a12.index++;
			$('#entryanswer' + $.k2l.m2a12.index).removeClass('textentry-disabled');
			$('#entryanswer' + $.k2l.m2a12.index).html('<form class="textentry"><input type="text" name="userText" size="15" autocomplete="off"><input type="submit" value="OK"></form>');
			$('input[name=userText]').focus();
		} else {
			resetActVariables();
			setTimeout(function () {
				section.addClass('hidden'); // hide this page
				section.next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(evt.currentTarget).parents('section').next('section').attr('id');
				Session.set("activeSection", '#' + section.next('section').attr('id'));
			}, 4000);
			// $('.pagination').removeClass('hidden');
			// $('#welldonecap').removeClass('hidden');
		}
	},

});

Template.m2a12_5.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a12_5 == 'undefined') {
		$.k2l.m2a12_5 = {};
	};


	var correctAnswers = [
		["run"], // Possible answers for Q1.
		["don't run"],
		["let him run"]
	];

	$.k2l.m2a12_5.correctAnswers = correctAnswers;
}

Template.m2a12_6.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a12_6");
	}
});

Template.m2a12_6.events({

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

		if (userText == $.k2l.m2a12_6.correctAnswers[$.k2l.m2a12.index]) {
			//correct
			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
			}, 1000);
			var section = $(evt.currentTarget).parents('section');
			$.k2l.m2a12.wrongcount = 0;
			$('.stuck').addClass('hidden');  //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m2a12_6.correctAnswers[$.k2l.m2a12.index]);
			$('#entryanswer' + $.k2l.m2a12.index).addClass('correctword');

			if ($.k2l.m2a12.index < $.k2l.m2a12_6.correctAnswers.length - 1) {
				$.k2l.m2a12.index++;
				$('#entryanswer' + $.k2l.m2a12.index).removeClass('textentry-disabled');
				$('#entryanswer' + $.k2l.m2a12.index).html('<form class="textentry"><input type="text" name="userText" size="15" autocomplete="off"><input type="submit" value="OK"></form>');
				$('input[name=userText]').focus();
			} else {
				$.k2l.m2a12.index = 0;
				setTimeout(function () {
					$('#welldonecap').removeClass('hidden');
				}, 1000);
				setTimeout(function () {
					$('#welldonecap').addClass('hidden');
				}, 2000);
				resetActVariables();
				setTimeout(function () {
					section.addClass('hidden'); // hide this page
					section.next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(evt.currentTarget).parents('section').next('section').attr('id');
					Session.set("activeSection", '#' + section.next('section').attr('id'));
				}, 2000);

				// $('#btnNext').removeClass('hidden');
				// $('#welldonecap').removeClass('hidden');
			}
		} else {
			$('.incorrectscreen').removeClass('hidden');
			setTimeout(function () {
				$('.incorrectscreen').addClass('hidden');
			}, 1000);
			$.k2l.m2a12.wrongcount++;

			if ($.k2l.m2a12.wrongcount >= 1) {
				$('.stuck').removeClass('hidden');
			}

			$(evt.currentTarget).parent().nextAll('.incorrect').first().removeClass('hidden');
			$(evt.currentTarget).parent().nextAll('.incorrect').first().fadeOut('3000');
			evt.target.userText.value = "";
		}
	},

	"click .stuck-button": function (evt) {
		var section = $(evt.currentTarget).parents('section');
		$('.stuck').addClass('hidden'); //hide stuck button if visible
		$.k2l.m2a12.wrongcount = 0;
		$('#entryanswer' + $.k2l.m2a12.index).html($.k2l.m2a12_6.correctAnswers[$.k2l.m2a12.index]);
		$('#entryanswer' + $.k2l.m2a12.index).addClass('correctword');

		if ($.k2l.m2a12.index < $.k2l.m2a12_6.correctAnswers.length - 1) {
			$.k2l.m2a12.index++;
			$('#entryanswer' + $.k2l.m2a12.index).removeClass('textentry-disabled');
			$('#entryanswer' + $.k2l.m2a12.index).html('<form class="textentry"><input type="text" name="userText" size="15" autocomplete="off"><input type="submit" value="OK"></form>');
			$('input[name=userText]').focus();
		} else {
			resetActVariables();
			setTimeout(function () {
				section.addClass('hidden'); // hide this page
				section.next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(evt.currentTarget).parents('section').next('section').attr('id');
				Session.set("activeSection", '#' + section.next('section').attr('id'));
			}, 4000);
		}
	}

});

Template.m2a12_6.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a12_6 == 'undefined') {
		$.k2l.m2a12_6 = {};
	};


	var correctAnswers = [
		["jump"], // Possible answers for Q1.
		["don't jump"],
		["let him jump"]
	];

	$.k2l.m2a12_6.correctAnswers = correctAnswers;
}

Template.m2a12_7.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a12_7");
	}
});

Template.m2a12_7.events({

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

		if (userText == $.k2l.m2a12_7.correctAnswers[$.k2l.m2a12.index]) {
			//correct
			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
			}, 1000);
			var section = $(evt.currentTarget).parents('section');
			$.k2l.m2a12.wrongcount = 0;
			$('.stuck').addClass('hidden');  //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m2a12_7.correctAnswers[$.k2l.m2a12.index]);
			$('#entryanswer' + $.k2l.m2a12.index).addClass('correctword');

			if ($.k2l.m2a12.index < $.k2l.m2a12_7.correctAnswers.length - 1) {
				$.k2l.m2a12.index++;
				$('#entryanswer' + $.k2l.m2a12.index).removeClass('textentry-disabled');
				$('#entryanswer' + $.k2l.m2a12.index).html('<form class="textentry"><input type="text" name="userText" size="15" autocomplete="off"><input type="submit" value="OK"></form>');
				$('input[name=userText]').focus();
			} else {
				$.k2l.m2a12.index = 0;
				setTimeout(function () {
					$('#welldonecap').removeClass('hidden');
				}, 1000);
				setTimeout(function () {
					$('#welldonecap').addClass('hidden');
				}, 2000);
				resetActVariables();
				setTimeout(function () {
					section.addClass('hidden'); // hide this page
					section.next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(evt.currentTarget).parents('section').next('section').attr('id');
					Session.set("activeSection", '#' + section.next('section').attr('id'));
				}, 2000);

				// $('#btnNext').removeClass('hidden');
				// $('#welldonecap').removeClass('hidden');
			}
		} else {
			$('.incorrectscreen').removeClass('hidden');
			setTimeout(function () {
				$('.incorrectscreen').addClass('hidden');
			}, 1000);
			$.k2l.m2a12.wrongcount++;

			if ($.k2l.m2a12.wrongcount >= 1) {
				$('.stuck').removeClass('hidden');
			}

			$(evt.currentTarget).parent().nextAll('.incorrect').first().removeClass('hidden');
			$(evt.currentTarget).parent().nextAll('.incorrect').first().fadeOut('3000');
			evt.target.userText.value = "";
		}
	},

	"click .stuck-button": function (evt) {
		var section = $(evt.currentTarget).parents('section');
		$('.stuck').addClass('hidden'); //hide stuck button if visible
		$.k2l.m2a12.wrongcount = 0;
		$('#entryanswer' + $.k2l.m2a12.index).html($.k2l.m2a12_7.correctAnswers[$.k2l.m2a12.index]);
		$('#entryanswer' + $.k2l.m2a12.index).addClass('correctword');

		if ($.k2l.m2a12.index < $.k2l.m2a12_7.correctAnswers.length - 1) {
			$.k2l.m2a12.index++;
			$('#entryanswer' + $.k2l.m2a12.index).removeClass('textentry-disabled');
			$('#entryanswer' + $.k2l.m2a12.index).html('<form class="textentry"><input type="text" name="userText" size="15" autocomplete="off"><input type="submit" value="OK"></form>');
			$('input[name=userText]').focus();
		} else {
			resetActVariables();
			setTimeout(function () {
				section.addClass('hidden'); // hide this page
				section.next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(evt.currentTarget).parents('section').next('section').attr('id');
				Session.set("activeSection", '#' + section.next('section').attr('id'));
			}, 4000);
		}
	}

});

Template.m2a12_7.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a12_7 == 'undefined') {
		$.k2l.m2a12_7 = {};
	};


	var correctAnswers = [
		["listen"], // Possible answers for Q1.
		["don't listen"],
		["let her listen"]
	];

	$.k2l.m2a12_7.correctAnswers = correctAnswers;
}

Template.m2a12_9.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a12_9");
	}
});

Template.m2a12_9.events({

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

		if (userText == $.k2l.m2a12_9.correctAnswers[$.k2l.m2a12.index]) {
			//correct
			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
			}, 1000);
			var section = $(evt.currentTarget).parents('section');
			$.k2l.m2a12.wrongcount = 0;
			$('.stuck').addClass('hidden');  //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m2a12_9.correctAnswers[$.k2l.m2a12.index]);
			$('#entryanswer' + $.k2l.m2a12.index).addClass('correctword');

			if ($.k2l.m2a12.index < $.k2l.m2a12_9.correctAnswers.length - 1) {
				$.k2l.m2a12.index++;
				$('#entryanswer' + $.k2l.m2a12.index).removeClass('textentry-disabled');
				$('#entryanswer' + $.k2l.m2a12.index).html('<form class="textentry"><input type="text" name="userText" size="15" autocomplete="off"><input type="submit" value="OK"></form>');
				$('input[name=userText]').focus();
			} else {
				$.k2l.m2a12.index = 0;
				setTimeout(function () {
					$('#welldonecap').removeClass('hidden');
				}, 1000);
				setTimeout(function () {
					$('#welldonecap').addClass('hidden');
				}, 2000);
				resetActVariables();
				setTimeout(function () {
					section.addClass('hidden'); // hide this page
					section.next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(evt.currentTarget).parents('section').next('section').attr('id');
					Session.set("activeSection", '#' + section.next('section').attr('id'));
				}, 2000);

				// $('.pagination').removeClass('hidden');
				// $('#welldonecap').removeClass('hidden');
			}
		} else {
			$.k2l.m2a12.wrongcount++;
			$('.incorrectscreen').removeClass('hidden');
			setTimeout(function () {
				$('.incorrectscreen').addClass('hidden');
			}, 1000);

			if ($.k2l.m2a12.wrongcount >= 1) {
				$('.stuck').removeClass('hidden');
			}
			evt.target.userText.value = "";
		}
	},

	"click .stuck-button": function (evt) {
		var section = $(evt.currentTarget).parents('section');
		$('.stuck').addClass('hidden'); //hide stuck button if visible
		$.k2l.m2a12.wrongcount = 0;
		$('#entryanswer' + $.k2l.m2a12.index).html($.k2l.m2a12_9.correctAnswers[$.k2l.m2a12.index]);
		$('#entryanswer' + $.k2l.m2a12.index).addClass('correctword');

		if ($.k2l.m2a12.index < $.k2l.m2a12_9.correctAnswers.length - 1) {
			$.k2l.m2a12.index++;
			$('#entryanswer' + $.k2l.m2a12.index).removeClass('textentry-disabled');
			$('#entryanswer' + $.k2l.m2a12.index).html('<form class="textentry"><input type="text" name="userText" size="15" autocomplete="off"><input type="submit" value="OK"></form>');
			$('input[name=userText]').focus();
		} else {
			resetActVariables();
			setTimeout(function () {
				section.addClass('hidden'); // hide this page
				section.next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(evt.currentTarget).parents('section').next('section').attr('id');
				Session.set("activeSection", '#' + section.next('section').attr('id'));
			}, 4000);
		}
	}

});

Template.m2a12_9.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a12_9 == 'undefined') {
		$.k2l.m2a12_9 = {};
	};


	var correctAnswers = [
		["let's go"], // Possible answers for Q1.
		["let's run"],
		["let's jump"],
		["let's listen"]
	];

	$.k2l.m2a12_9.correctAnswers = correctAnswers;
}


resetActVariables = function () {
	$.k2l.m2a12.index = 0;
	$.k2l.m2a12.wrongcount = 0;
}