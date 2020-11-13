Template.m3a4.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 3, 4, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m3a4.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(3, 4);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(3, 4, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m3a4.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m3a4_end') {
			return false;
		} return true;
	}
});

Template.m3a4.destroyed = function () {
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
	clearInterval($.locationInterval);
};

Template.m3a4_6.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a4_6");
	}
});

Template.m3a4_6.events({

	'click .paraclick-word': function (evt) {
		if ($(evt.target).hasClass('correctword')) {
			return;
		}
		var parentSection = $(evt.currentTarget).parents('section');
		if ($.k2l.m3a4_6.questionWordLock == false && $.k2l.m3a4_6.stuckFlag == false) {
			$.k2l.m3a4_6.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m3a4_6.questionWordLock = false;
			}, 1000);
			$(evt.target).addClass('correctword');
			$('.correctscreen').removeClass("hidden");
			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m3a4_6.index--;
			$(".counterleft u").html($.k2l.m3a4_6.index);

			if ($.k2l.m3a4_6.index <= 0) {
				$('.pagination').removeClass('hidden');
				$('.stuck').addClass('hidden');
			}
		}
	},

	'click .wrong': function (evt) {

		if ($.k2l.m3a4_6.questionWordLock == false && $.k2l.m3a4_6.stuckFlag == false) {
			$.k2l.m3a4_6.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m3a4_6.questionWordLock = false;
			}, 1000);
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
			$.k2l.m3a4_6.wrongscore++;

			if ($.k2l.m3a4_6.wrongscore > 2) {
				$('.stuck').removeClass('hidden');
			}

		}
	},
	'click .stuck': function (evt) {
		$('.stuck').addClass('hidden');
		$.k2l.m3a4_6.wrongscore = 0;
		$.k2l.m3a4_6.index = 0;
		$(".counterleft u").html($.k2l.m3a4_6.index);
		$('.paraclick-word').addClass('correctword');
		$('#m3a4_6 .navfooter a').removeClass('hidden');
		$.k2l.m3a4_6.stuckFlag = true;
	},

	'click .navfooter a': function (evt) {
		$('#m3a4_6 .navfooter a').addClass('hidden');
		$('.paraclick-word').removeClass('correctword');
		$.k2l.m3a4_6.wrongscore = 0;
		$.k2l.m3a4_6.index = 9;
		$.k2l.m3a4_6.stuckFlag = false;
		$(".counterleft u").html($.k2l.m3a4_6.index);
	}

});

Template.m3a4_6.rendered = function () {
	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a4_6 == 'undefined') {
		$.k2l.m3a4_6 = {};
	};

	$.k2l.m3a4_6.index = 9;
	$.k2l.m3a4_6.wrongscore = 0;
	$.k2l.m3a4_6.stuckFlag = false;
	$.k2l.m3a4_6.questionWordLock = false;

}


Template.m3a4_8.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a4_8");
	}
});

Template.m3a4_8.events({


	'click .paraclick-word': function (evt) {
		if ($(evt.target).hasClass('correctword')) {
			return;
		}
		var parentSection = $(evt.currentTarget).parents('section');
		if ($.k2l.m3a4_8.questionWordLock == false && $.k2l.m3a4_8.stuckFlag == false) {
			$.k2l.m3a4_8.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m3a4_8.questionWordLock = false;
			}, 1000);
			$(evt.target).addClass('correctword');
			$('.correctscreen').removeClass("hidden");
			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m3a4_8.index--;
			$("#startClock2").html($.k2l.m3a4_8.index);

			if ($.k2l.m3a4_8.index <= 0) {
				$('.pagination').removeClass('hidden');
				$('.stuck').addClass('hidden');
			}
		}
	},

	'click .wrong': function (evt) {

		if ($.k2l.m3a4_8.questionWordLock == false && $.k2l.m3a4_8.stuckFlag == false) {
			$.k2l.m3a4_8.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m3a4_8.questionWordLock = false;
			}, 1000);
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
			$.k2l.m3a4_8.wrongscore++;

			if ($.k2l.m3a4_8.wrongscore > 2) {
				$('.stuck').removeClass('hidden');
			}

		}
	},
	'click .stuck': function (evt) {
		$('.stuck').addClass('hidden');
		$.k2l.m3a4_8.wrongscore = 0;
		$.k2l.m3a4_8.index = 0;
		$(".counterleft u").html($.k2l.m3a4_8.index);
		$('.paraclick-word').addClass('correctword');
		$('#m3a4_8 .navfooter a').removeClass('hidden');
		$.k2l.m3a4_8.stuckFlag = true;
	},

	'click .navfooter a': function (evt) {
		$('#m3a4_8 .navfooter a').addClass('hidden');
		$('.paraclick-word').removeClass('correctword');
		$.k2l.m3a4_8.wrongscore = 0;
		$.k2l.m3a4_8.index = 2;
		$.k2l.m3a4_8.stuckFlag = false;
		$(".counterleft u").html($.k2l.m3a4_8.index);
	}

});

Template.m3a4_8.rendered = function () {
	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a4_8 == 'undefined') {
		$.k2l.m3a4_8 = {};
	};

	$.k2l.m3a4_8.index = 2;
	$.k2l.m3a4_8.wrongscore = 0;
	$.k2l.m3a4_8.stuckFlag = false;
	$.k2l.m3a4_8.questionWordLock = false;

}
