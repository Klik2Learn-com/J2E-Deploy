Template.m2a7.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 7, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};


Template.m2a7.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(2, 7);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 7, subpage);
			oldLocation = location.href;
		}
	}, 500);
}


Template.m2a7.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m2a7_end') {
			return false;
		} return true;
	}
});



Template.m2a7.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m2a7_4.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a7_4");
	}
});

Template.m2a7_4.events({

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

		if (userText == $.k2l.m2a7_4.correctAnswers[$.k2l.m2a7_4.index]) {
			//correct
			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
			}, 1000);
			var section = $(evt.currentTarget).parents('section');
			$.k2l.m2a7_4.wrongcount = 0;
			$('.stuck').addClass('hidden');  //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m2a7_4.correctAnswers[$.k2l.m2a7_4.index]);
			$('#entryanswer' + $.k2l.m2a7_4.index).addClass('correctword');

			if ($.k2l.m2a7_4.index < $.k2l.m2a7_4.correctAnswers.length - 1) {
				$.k2l.m2a7_4.index++;
				$('#entryanswer' + $.k2l.m2a7_4.index).removeClass('textentry-disabled');
				$('#entryanswer' + $.k2l.m2a7_4.index).html('<form class="textentry"><input type="text" name="userText" size="7"><input type="submit" value="OK"></form>');
			} else {
				/*
				setTimeout(function() {
					section.addClass('hidden'); // hide this page
					section.next('section').removeClass('hidden');// reveal next page.
					document.location.hash = section.next('section').attr('id');
					Session.set("activeSection", section.next('section').attr('id'));
				}, 1500);
				*/
				setTimeout(function () {
					$('#m2a7_4 .pagination').removeClass('hidden');
					$('#welldonecap').removeClass('hidden');
					setTimeout(function(){
						$('#welldonecap').addClass('hidden');
					}, 1000);
				}, 1000);
			}
		} else {
			$.k2l.m2a7_4.wrongcount++;

			if ($.k2l.m2a7_4.wrongcount >= 1) {
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
		var section = $(evt.currentTarget).parents('section');
		$('.stuck').addClass('hidden'); //hide stuck button if visible
		$.k2l.m2a7_4.wrongcount = 0;
		$('#entryanswer' + $.k2l.m2a7_4.index).html($.k2l.m2a7_4.correctAnswers[$.k2l.m2a7_4.index]);
		$('#entryanswer' + $.k2l.m2a7_4.index).addClass('correctword');

		if ($.k2l.m2a7_4.index < $.k2l.m2a7_4.correctAnswers.length - 1) {
			$.k2l.m2a7_4.index++;
			$('#entryanswer' + $.k2l.m2a7_4.index).removeClass('textentry-disabled');
			$('#entryanswer' + $.k2l.m2a7_4.index).html('<form class="textentry"><input type="text" name="userText" size="7"><input type="submit" value="OK"></form>');
		} else {
			setTimeout(function () {
				section.addClass('hidden'); // hide this page
				section.next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(evt.currentTarget).parents('section').next('section').attr('id');
				Session.set("activeSection", '#' + section.next('section').attr('id'));
			}, 4000);
		}
	},

	"click .pagination": function (evt) {
		$.k2l.m2a7_4.index = 0;
		$.k2l.m2a7_4.wrongcount = 0;
	}

});

Template.m2a7_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a7_4 == 'undefined') {
		$.k2l.m2a7_4 = {};
	};

	$.k2l.m2a7_4.index = 0;
	$.k2l.m2a7_4.wrongcount = 0;

	var correctAnswers = [
		["working"], // Possible answers for Q1.
		["going"],
		["eating"],
		["trains"],
		["travelling"]
	];

	$.k2l.m2a7_4.correctAnswers = correctAnswers;
}
