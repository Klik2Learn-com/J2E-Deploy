Template.m8a16.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m8a16_end') {
			return false;
		}
		return true;
	}
});

Template.m8a16.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(8, 16);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 16, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m8a16.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 16, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a16.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


Template.m8a16_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a16_3");
	}
});

Template.m8a16_3.events({

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

		if (userText == $.k2l.m8a16_3.correctAnswers[$.k2l.m8a16_3.index]) {
			//correct
			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
			}, 1000);
			var parentSection = $(evt.currentTarget).parents('section');
			$.k2l.m8a16_3.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html('<h4 style="font-size:2.5em;">' + $.k2l.m8a16_3.correctAnswers[$.k2l.m8a16_3.index] + '</h4>');
			// $(evt.currentTarget).parent().html($.k2l.m8a16_3.displayAnswers[$.k2l.m8a16_3.index]); // use this if there are multiple possible answers
			$('#entryanswer').addClass('correctword');

			if ($.k2l.m8a16_3.index < $.k2l.m8a16_3.correctAnswers.length - 1) {
				$.k2l.m8a16_3.index++;
				$('#entryanswer' + $.k2l.m8a16_3.index).removeClass('textentry-disabled');
				$('#entryanswer' + $.k2l.m8a16_3.index).html('<form id="userTextEntryForm" class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m8a16_3.index = 0;
				$.k2l.m8a16_3.wrongcount = 0;
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
			$.k2l.m8a16_3.wrongcount++;
			if ($.k2l.m8a16_3.wrongcount >= 1) {
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
		$.k2l.m8a16_3.wrongcount = 0;
		$('input[name=userText]').val($.k2l.m8a16_3.correctAnswers[$.k2l.m8a16_3.index]);
		// $('#entryanswer'+$.k2l.m8a16_3.index).html($.k2l.m8a16_3.displayAnswers[$.k2l.m8a16_3.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$("#userTextEntryForm").submit();
		
	},

	"click .pagination": function (evt) {
		$.k2l.m8a16_3.index = 0;
		$.k2l.m8a16_3.wrongcount = 0;
	}

});

Template.m8a16_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a16_3 == 'undefined') {
		$.k2l.m8a16_3 = {};
	};

	$.k2l.m8a16_3.index = 0;
	$.k2l.m8a16_3.wrongcount = 0;
	// $.k2l.m8a16_3.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
		"to"
	];

	$.k2l.m8a16_3.correctAnswers = correctAnswers;

}

Template.m8a16_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a16_1");
	}
});

Template.m8a16_1.events({
	"drop .ddseatedtarget": function (evt) {
		if (($(".ddseatedtarget2").length + 1) == $.k2l.m8a16_1.max) {
			$(".correctword, .next, #extra").removeClass("hidden");
		}
	},
});

Template.m8a16_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a16_1 == 'undefined') {
		$.k2l.m8a16_1 = {};
	};

	$.k2l.m8a16_1.max = 5; // number of drag spaces on this page.
	initDragDropTest("#m8a16_1");
}


Template.m8a16_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a16_2");
	}
});

Template.m8a16_2.events({
	"drop .ddseatedtarget": function (evt) {
		if (($(".ddseatedtarget2").length + 1) == $.k2l.m8a16_2.max) {
			$(".correctword, .next, #extra, .m8a16-hidden").removeClass("hidden");
			$(".m8a16-shown").addClass("hidden");
		}
	},
});

Template.m8a16_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a16_2 == 'undefined') {
		$.k2l.m8a16_2 = {};
	};

	$.k2l.m8a16_2.max = 4;
	initDragDropTest("#m8a16_2");
}