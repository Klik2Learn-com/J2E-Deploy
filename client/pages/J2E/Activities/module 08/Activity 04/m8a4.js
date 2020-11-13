Template.m8a4.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m8a4_end') {
			return false;
		}
		return true;
	}
});

Template.m8a4.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(8, 4);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 4, subpage);
			oldLocation = location.href;
		}
	}, 500);

}
Template.m8a4_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a4_1");
	}
});

Template.m8a4_1.events({

});

Template.m8a4_1.rendered = function () {
}

Template.m8a4_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a4_2");
	}
});

Template.m8a4_2.events({
	'click .paraclick-word': function (evt) {
		if ($(evt.target).hasClass('correctword')) {
			return;
		}
		var parentSection = $(evt.currentTarget).parents('section');
		if ($.k2l.m8a4_2.questionWordLock == false && $.k2l.m8a4_2.stuckFlag == false) {
			$.k2l.m8a4_2.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m8a4_2.questionWordLock = false;
			}, 1000);
			$(evt.target).addClass('correctword');
			$('.correctscreen').removeClass("hidden");
			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m8a4_2.index--;
			$(".counterleft u").html($.k2l.m8a4_2.index);

			if ($.k2l.m8a4_2.index <= 0) {
				$('.pagination').removeClass('hidden');
				$('.stuck').addClass('hidden');
			}
		}
	},

	'click .wrong': function (evt) {

		if ($.k2l.m8a4_2.questionWordLock == false && $.k2l.m8a4_2.stuckFlag == false) {
			$.k2l.m8a4_2.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m8a4_2.questionWordLock = false;
			}, 1000);
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
			$.k2l.m8a4_2.wrongscore++;

			if ($.k2l.m8a4_2.wrongscore > 2) {
				$('.stuck').removeClass('hidden');
			}

		}
	},
	'click .stuck': function (evt) {
		$('.stuck').addClass('hidden');
		$.k2l.m8a4_2.wrongscore = 0;
		$.k2l.m8a4_2.index = 0;
		$(".counterleft u").html($.k2l.m8a4_2.index);
		$('.paraclick-word').addClass('correctword');
		$('.paraclick-word-sleep').addClass('correctword');
		$('#m8a4_2 .navfooter a').removeClass('hidden');
		$.k2l.m8a4_2.stuckFlag = true;
	},

	'click .navfooter a': function (evt) {
		$('#m8a4_2 .navfooter a').addClass('hidden');
		$('.paraclick-word').removeClass('correctword');
		$.k2l.m8a4_2.wrongscore = 0;
		$.k2l.m8a4_2.index = 8;
		$.k2l.m8a4_2.stuckFlag = false;
		$(".counterleft u").html($.k2l.m8a4_2.index);
	}

});

Template.m8a4_2.rendered = function () {
	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a4_2 == 'undefined') {
		$.k2l.m8a4_2 = {};
	};

	$.k2l.m8a4_2.index = 8;
	$.k2l.m8a4_2.wrongscore = 0;
	$.k2l.m8a4_2.stuckFlag = false;
	$.k2l.m8a4_2.questionWordLock = false;

}

Template.m8a4_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a4_3");
	}
});

Template.m8a4_3.events({

});

Template.m8a4_3.rendered = function () {
}


Template.m8a4.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 4, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a4.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
