Template.m5a7.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m5a7_end') {
			return false;
		} return true;
	}
});

Template.m5a7.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 5, 7, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m5a7.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m5a7_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a7_3");
	}
});

Template.m5a7_3.events({
	'click .paraclick-word-sleep': function (evt) {
		if ($(evt.target).hasClass('correctword')) {
			return;
		}
		var parentSection = $(evt.currentTarget).parents('section');
		if ($.k2l.m5a7_3.questionWordLock == false && $.k2l.m5a7_3.stuckFlag == false) {
			$.k2l.m5a7_3.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m5a7_3.questionWordLock = false;
			}, 1000);
			$('.paraclick-word-sleep').addClass('correctword');
			$('.correctscreen').removeClass("hidden");
			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m5a7_3.index--;
			$(".counterleft u").html($.k2l.m5a7_3.index);

			if ($.k2l.m5a7_3.index <= 0) {
				$('.pagination').removeClass('hidden');
				$('.stuck').addClass('hidden');
			}
		}
	},

	'click .paraclick-word': function (evt) {
		if ($(evt.target).hasClass('correctword')) {
			return;
		}
		var parentSection = $(evt.currentTarget).parents('section');
		if ($.k2l.m5a7_3.questionWordLock == false && $.k2l.m5a7_3.stuckFlag == false) {
			$.k2l.m5a7_3.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m5a7_3.questionWordLock = false;
			}, 1000);
			$(evt.target).addClass('correctword');
			$('.correctscreen').removeClass("hidden");
			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m5a7_3.index--;
			$(".counterleft u").html($.k2l.m5a7_3.index);

			if ($.k2l.m5a7_3.index <= 0) {
				$('.pagination').removeClass('hidden');
				$('.stuck').addClass('hidden');
			}
		}
	},

	'click .wrong': function (evt) {

		if ($.k2l.m5a7_3.questionWordLock == false && $.k2l.m5a7_3.stuckFlag == false) {
			$.k2l.m5a7_3.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m5a7_3.questionWordLock = false;
			}, 1000);
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
			$.k2l.m5a7_3.wrongscore++;

			if ($.k2l.m5a7_3.wrongscore > 2) {
				$('.stuck').removeClass('hidden');
			}

		}
	},
	'click .stuck': function (evt) {
		$('.stuck').addClass('hidden');
		$.k2l.m5a7_3.wrongscore = 0;
		$.k2l.m5a7_3.index = 0;
		$(".counterleft u").html($.k2l.m5a7_3.index);
		$('.paraclick-word').addClass('correctword');
		$('.paraclick-word-sleep').addClass('correctword');
		$('#m5a7_3 .navfooter a').removeClass('hidden');
		$.k2l.m5a7_3.stuckFlag = true;
	},

	'click .navfooter a': function (evt) {
		$('#m5a7_3 .navfooter a').addClass('hidden');
		$('.paraclick-word').removeClass('correctword');
		$.k2l.m5a7_3.wrongscore = 0;
		$.k2l.m5a7_3.index = 1;
		$.k2l.m5a7_3.stuckFlag = false;
		$(".counterleft u").html($.k2l.m5a7_3.index);
	}

});

Template.m5a7_3.rendered = function () {
	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m5a7_3 == 'undefined') {
		$.k2l.m5a7_3 = {};
	};

	$.k2l.m5a7_3.index = 1;
	$.k2l.m5a7_3.wrongscore = 0;
	$.k2l.m5a7_3.stuckFlag = false;
	$.k2l.m5a7_3.questionWordLock = false;

}

Template.m5a7_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a7_4");
	}
});

Template.m5a7_4.events({
	'click .paraclick-word-sleep': function (evt) {
		if ($(evt.target).hasClass('correctword')) {
			return;
		}
		var parentSection = $(evt.currentTarget).parents('section');
		if ($.k2l.m5a7_4.questionWordLock == false && $.k2l.m5a7_4.stuckFlag == false) {
			$.k2l.m5a7_4.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m5a7_4.questionWordLock = false;
			}, 1000);
			$('.paraclick-word-sleep').addClass('correctword');
			$('.correctscreen').removeClass("hidden");
			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m5a7_4.index--;
			$(".counterleft u").html($.k2l.m5a7_4.index);

			if ($.k2l.m5a7_4.index <= 0) {
				$('.pagination').removeClass('hidden');
				$('.stuck').addClass('hidden');
			}
		}
	},

	'click .paraclick-word': function (evt) {
		if ($(evt.target).hasClass('correctword')) {
			return;
		}
		var parentSection = $(evt.currentTarget).parents('section');
		if ($.k2l.m5a7_4.questionWordLock == false && $.k2l.m5a7_4.stuckFlag == false) {
			$.k2l.m5a7_4.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m5a7_4.questionWordLock = false;
			}, 1000);
			$(evt.target).addClass('correctword');
			$('.correctscreen').removeClass("hidden");
			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m5a7_4.index--;
			$(".counterleft u").html($.k2l.m5a7_4.index);

			if ($.k2l.m5a7_4.index <= 0) {
				$('.pagination').removeClass('hidden');
				$('.stuck').addClass('hidden');
			}
		}
	},

	'click .wrong': function (evt) {

		if ($.k2l.m5a7_4.questionWordLock == false && $.k2l.m5a7_4.stuckFlag == false) {
			$.k2l.m5a7_4.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m5a7_4.questionWordLock = false;
			}, 1000);
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
			$.k2l.m5a7_4.wrongscore++;

			if ($.k2l.m5a7_4.wrongscore > 2) {
				$('.stuck').removeClass('hidden');
			}

		}
	},
	'click .stuck': function (evt) {
		$('.stuck').addClass('hidden');
		$.k2l.m5a7_4.wrongscore = 0;
		$.k2l.m5a7_4.index = 0;
		$(".counterleft u").html($.k2l.m5a7_4.index);
		$('.paraclick-word').addClass('correctword');
		$('.paraclick-word-sleep').addClass('correctword');
		$('#m5a7_4 .navfooter a').removeClass('hidden');
		$.k2l.m5a7_4.stuckFlag = true;
	},

	'click .navfooter a': function (evt) {
		$('#m5a7_4 .navfooter a').addClass('hidden');
		$('.paraclick-word').removeClass('correctword');
		$.k2l.m5a7_4.wrongscore = 0;
		$.k2l.m5a7_4.index = 1;
		$.k2l.m5a7_4.stuckFlag = false;
		$(".counterleft u").html($.k2l.m5a7_4.index);
	}

});

Template.m5a7_4.rendered = function () {
	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m5a7_4 == 'undefined') {
		$.k2l.m5a7_4 = {};
	};

	$.k2l.m5a7_4.index = 1;
	$.k2l.m5a7_4.wrongscore = 0;
	$.k2l.m5a7_4.stuckFlag = false;
	$.k2l.m5a7_4.questionWordLock = false;

}

Template.m5a7_5.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m5a7_5";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m5a7.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m5a7_end') {
			return false;
		}
		return true;
	},

	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m5a7");
	}
})

Template.m5a7.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m5a7.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m5a7.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m5a7.sound.src = {};
	}

});

Template.m5a7.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(5, 7);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(5, 7, subpage);
			oldLocation = location.href;
		}
	}, 500);

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m5a7 == 'undefined') {
		$.k2l.m5a7 = {};
	};

	$.k2l.m5a7.sound = new Audio();
}
