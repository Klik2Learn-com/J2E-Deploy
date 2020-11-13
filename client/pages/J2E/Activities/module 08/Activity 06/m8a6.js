Template.m8a6.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m8a6_end') {
			return false;
		}
		return true;
	}
});

Template.m8a6.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(8, 6);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 6, subpage);
			oldLocation = location.href;
		}
	}, 500);

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a6 == 'undefined') {
		$.k2l.m8a6 = {};
	};

	$.k2l.m8a6.answer_index = 0;
	$.k2l.m8a6.CV_Answers = [0, 8]
}

Template.m8a6.events({
	'click .cv-select': function (evt) {
		evt.preventDefault();
		var select = $(".cv-select-score-" + $.k2l.m8a6.answer_index)[0];
		var userAns = select.options[select.selectedIndex].textContent;

		if (userAns == $.k2l.m8a6.CV_Answers[$.k2l.m8a6.answer_index]) {
			$.k2l.m8a6.answer_index++;
			// Correct
			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
			}, 1000);

			$('.pagination').removeClass('hidden');
		} else {
			$('.incorrectscreen').removeClass('hidden');
			setTimeout(function () {
				$('.incorrectscreen').addClass('hidden');
			}, 1000);

			return false;
		}

	}
})

Template.m8a6.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 6, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a6.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};



Template.m8a6_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a6_4");
	}
});

Template.m8a6_5.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a6_5");
	}
});

Template.m8a6_8.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a6_8");
	}
});

Template.m8a6_9.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a6_9");
	}
});
