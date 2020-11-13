Template.m4a22.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m4a22_end') {
			return false;
		} return true;
	}
});

Template.m4a22.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(4, 22);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 22, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m4a22.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 22, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a22.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m4a22_10.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a22_10");
	}
});

Template.m4a22_10.events({
	'click .paraclick-word-sleep': function (evt) {
		evt.preventDefault();
		if ($(evt.target).hasClass('correctword')) {
			return;
		}
		var parentSection = $(evt.currentTarget).parents('section');
		if ($.k2l.m4a22_10.questionWordLock == false && $.k2l.m4a22_10.stuckFlag == false) {
			$.k2l.m4a22_10.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m4a22_10.questionWordLock = false;
			}, 1000);
			$('.paraclick-word-sleep').addClass('correctword');
			$('.correctscreen').removeClass("hidden");
			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m4a22_10.index--;
			$(".counterleft u").html($.k2l.m4a22_10.index);

			if ($.k2l.m4a22_10.index <= 0) {
				$('.pagination').removeClass('hidden');
				$('.stuck').addClass('hidden');
			}
		}
	},

	'click .paraclick-word': function (evt) {
		evt.preventDefault();
		if ($(evt.target).hasClass('correctword')) {
			return;
		}
		var parentSection = $(evt.currentTarget).parents('section');
		if ($.k2l.m4a22_10.questionWordLock == false && $.k2l.m4a22_10.stuckFlag == false) {
			$.k2l.m4a22_10.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m4a22_10.questionWordLock = false;
			}, 1000);
			$('[data-toggle="popover"]').popover();
			$(evt.target).addClass('correctword');
			$(evt.target).popover('show');
			$('.correctscreen').removeClass("hidden");
			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m4a22_10.index--;
			$(".counterleft u").html($.k2l.m4a22_10.index);

			if ($.k2l.m4a22_10.index <= 0) {
				$('.pagination').removeClass('hidden');
				$('.stuck').addClass('hidden');
			}
		}
	},

	'click .wrong': function (evt) {
		evt.preventDefault();
		if ($.k2l.m4a22_10.questionWordLock == false && $.k2l.m4a22_10.stuckFlag == false) {
			$.k2l.m4a22_10.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m4a22_10.questionWordLock = false;
			}, 1000);
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
			$.k2l.m4a22_10.wrongscore++;

			if ($.k2l.m4a22_10.wrongscore > 2) {
				$('.stuck').removeClass('hidden');
			}

		}
	},
	'click .stuck': function (evt) {
		$('.stuck').addClass('hidden');
		$.k2l.m4a22_10.wrongscore = 0;
		$.k2l.m4a22_10.index = 0;
		$(".counterleft u").html($.k2l.m4a22_10.index);
		$('.paraclick-word').addClass('correctword');
		$('.paraclick-word').children().popover('show');
		$('.paraclick-word-sleep').addClass('correctword');
		$('#m4a22_10 .navfooter a').removeClass('hidden');
		$.k2l.m4a22_10.stuckFlag = true;
	},

	'click .navfooter a': function (evt) {
		$('#m4a22_10 .navfooter a').addClass('hidden');
		$('.paraclick-word').removeClass('correctword');
		$.k2l.m4a22_10.wrongscore = 0;
		$.k2l.m4a22_10.index = 2;
		$.k2l.m4a22_10.stuckFlag = false;
		$(".counterleft u").html($.k2l.m4a22_10.index);
	}

});

Template.m4a22_10.rendered = function () {
	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a22_10 == 'undefined') {
		$.k2l.m4a22_10 = {};
	};
	$('[data-toggle="popover"]').popover();
	$.k2l.m4a22_10.index = 2;
	$.k2l.m4a22_10.wrongscore = 0;
	$.k2l.m4a22_10.stuckFlag = false;
	$.k2l.m4a22_10.questionWordLock = false;

}


Template.m4a22_11.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a22_11");
	}
});

Template.m4a22_11.events({
	'click .paraclick-word-sleep': function (evt) {
		evt.preventDefault();
		if ($(evt.target).hasClass('correctword')) {
			return;
		}
		var parentSection = $(evt.currentTarget).parents('section');
		if ($.k2l.m4a22_11.questionWordLock == false && $.k2l.m4a22_11.stuckFlag == false) {
			$.k2l.m4a22_11.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m4a22_11.questionWordLock = false;
			}, 1000);
			$('.paraclick-word-sleep').addClass('correctword');
			$('.correctscreen').removeClass("hidden");
			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m4a22_11.index--;
			$(".counterleft u").html($.k2l.m4a22_11.index);

			if ($.k2l.m4a22_11.index <= 0) {
				$('.pagination').removeClass('hidden');
				$('.stuck').addClass('hidden');
			}
		}
	},

	'click .paraclick-word': function (evt) {
		evt.preventDefault();
		if ($(evt.target).hasClass('correctword')) {
			return;
		}
		var parentSection = $(evt.currentTarget).parents('section');
		if ($.k2l.m4a22_11.questionWordLock == false && $.k2l.m4a22_11.stuckFlag == false) {
			$.k2l.m4a22_11.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m4a22_11.questionWordLock = false;
			}, 1000);
			$('[data-toggle="popover"]').popover();
			$(evt.target).addClass('correctword');
			$(evt.target).popover('show');
			$('.correctscreen').removeClass("hidden");
			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m4a22_11.index--;
			$(".counterleft u").html($.k2l.m4a22_11.index);

			if ($.k2l.m4a22_11.index <= 0) {
				$('.pagination').removeClass('hidden');
				$('.stuck').addClass('hidden');
			}
		}
	},

	'click .wrong': function (evt) {
		evt.preventDefault();
		if ($.k2l.m4a22_11.questionWordLock == false && $.k2l.m4a22_11.stuckFlag == false) {
			$.k2l.m4a22_11.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m4a22_11.questionWordLock = false;
			}, 1000);
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
			$.k2l.m4a22_11.wrongscore++;

			if ($.k2l.m4a22_11.wrongscore > 2) {
				$('.stuck').removeClass('hidden');
			}

		}
	},
	'click .stuck': function (evt) {
		$('.stuck').addClass('hidden');
		$.k2l.m4a22_11.wrongscore = 0;
		$.k2l.m4a22_11.index = 0;
		$(".counterleft u").html($.k2l.m4a22_11.index);
		$('.paraclick-word').addClass('correctword');
		$('.paraclick-word').children().popover('show');
		$('.paraclick-word-sleep').addClass('correctword');
		$('#m4a22_11 .navfooter a').removeClass('hidden');
		$.k2l.m4a22_11.stuckFlag = true;
	},

	'click .navfooter a': function (evt) {
		$('#m4a22_11 .navfooter a').addClass('hidden');
		$('.paraclick-word').removeClass('correctword');
		$.k2l.m4a22_11.wrongscore = 0;
		$.k2l.m4a22_11.index = 1;
		$.k2l.m4a22_11.stuckFlag = false;
		$(".counterleft u").html($.k2l.m4a22_11.index);
	}

});

Template.m4a22_11.rendered = function () {
	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a22_11 == 'undefined') {
		$.k2l.m4a22_11 = {};
	};
	$('[data-toggle="popover"]').popover();
	$.k2l.m4a22_11.index = 1;
	$.k2l.m4a22_11.wrongscore = 0;
	$.k2l.m4a22_11.stuckFlag = false;
	$.k2l.m4a22_11.questionWordLock = false;

}


Template.m4a22_7.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a22_7");
	}
});

Template.m4a22_7.events({
	'click .paraclick-word-sleep': function (evt) {
		evt.preventDefault();
		if ($(evt.target).hasClass('correctword')) {
			return;
		}
		var parentSection = $(evt.currentTarget).parents('section');
		if ($.k2l.m4a22_7.questionWordLock == false && $.k2l.m4a22_7.stuckFlag == false) {
			$.k2l.m4a22_7.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m4a22_7.questionWordLock = false;
			}, 1000);
			$('.paraclick-word-sleep').addClass('correctword');
			$('.correctscreen').removeClass("hidden");
			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m4a22_7.index--;
			$(".counterleft u").html($.k2l.m4a22_7.index);

			if ($.k2l.m4a22_7.index <= 0) {
				$('.pagination').removeClass('hidden');
				$('.stuck').addClass('hidden');
			}
		}
	},

	'click .paraclick-word': function (evt) {
		evt.preventDefault();
		if ($(evt.target).hasClass('correctword')) {
			return;
		}
		var parentSection = $(evt.currentTarget).parents('section');
		if ($.k2l.m4a22_7.questionWordLock == false && $.k2l.m4a22_7.stuckFlag == false) {
			$.k2l.m4a22_7.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m4a22_7.questionWordLock = false;
			}, 1000);
			$('[data-toggle="popover"]').popover();
			$(evt.target).addClass('correctword');
			$(evt.target).popover('show');
			$('.correctscreen').removeClass("hidden");
			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m4a22_7.index--;
			$(".counterleft u").html($.k2l.m4a22_7.index);

			if ($.k2l.m4a22_7.index <= 0) {
				$('.pagination').removeClass('hidden');
				$('.stuck').addClass('hidden');
			}
		}
	},

	'click .wrong': function (evt) {
		evt.preventDefault();
		if ($.k2l.m4a22_7.questionWordLock == false && $.k2l.m4a22_7.stuckFlag == false) {
			$.k2l.m4a22_7.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m4a22_7.questionWordLock = false;
			}, 1000);
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
			$.k2l.m4a22_7.wrongscore++;

			if ($.k2l.m4a22_7.wrongscore > 2) {
				$('.stuck').removeClass('hidden');
			}

		}
	},
	'click .stuck': function (evt) {
		$('.stuck').addClass('hidden');
		$.k2l.m4a22_7.wrongscore = 0;
		$.k2l.m4a22_7.index = 0;
		$(".counterleft u").html($.k2l.m4a22_7.index);
		$('.paraclick-word').addClass('correctword');
		$('.paraclick-word').children().popover('show');
		$('.paraclick-word-sleep').addClass('correctword');
		$('#m4a22_7 .navfooter a').removeClass('hidden');
		$.k2l.m4a22_7.stuckFlag = true;
	},

	'click .navfooter a': function (evt) {
		$('#m4a22_7 .navfooter a').addClass('hidden');
		$('.paraclick-word').removeClass('correctword');
		$.k2l.m4a22_7.wrongscore = 0;
		$.k2l.m4a22_7.index = 2;
		$.k2l.m4a22_7.stuckFlag = false;
		$(".counterleft u").html($.k2l.m4a22_7.index);
	}

});

Template.m4a22_7.rendered = function () {
	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a22_7 == 'undefined') {
		$.k2l.m4a22_7 = {};
	};
	$('[data-toggle="popover"]').popover();
	$.k2l.m4a22_7.index = 2;
	$.k2l.m4a22_7.wrongscore = 0;
	$.k2l.m4a22_7.stuckFlag = false;
	$.k2l.m4a22_7.questionWordLock = false;

}


Template.m4a22_8.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a22_8");
	}
});

Template.m4a22_8.events({
	'click .paraclick-word-sleep': function (evt) {
		evt.preventDefault();
		if ($(evt.target).hasClass('correctword')) {
			return;
		}
		var parentSection = $(evt.currentTarget).parents('section');
		if ($.k2l.m4a22_8.questionWordLock == false && $.k2l.m4a22_8.stuckFlag == false) {
			$.k2l.m4a22_8.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m4a22_8.questionWordLock = false;
			}, 1000);
			$('.paraclick-word-sleep').addClass('correctword');
			$('.correctscreen').removeClass("hidden");
			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m4a22_8.index--;
			$(".counterleft u").html($.k2l.m4a22_8.index);

			if ($.k2l.m4a22_8.index <= 0) {
				$('.pagination').removeClass('hidden');
				$('.stuck').addClass('hidden');
			}
		}
	},

	'click .paraclick-word': function (evt) {
		evt.preventDefault();
		if ($(evt.target).hasClass('correctword')) {
			return;
		}
		var parentSection = $(evt.currentTarget).parents('section');
		if ($.k2l.m4a22_8.questionWordLock == false && $.k2l.m4a22_8.stuckFlag == false) {
			$.k2l.m4a22_8.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m4a22_8.questionWordLock = false;
			}, 1000);
			$('[data-toggle="popover"]').popover();
			$(evt.target).addClass('correctword');
			$(evt.target).popover('show');
			$('.correctscreen').removeClass("hidden");
			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m4a22_8.index--;
			$(".counterleft u").html($.k2l.m4a22_8.index);

			if ($.k2l.m4a22_8.index <= 0) {
				$('.pagination').removeClass('hidden');
				$('.stuck').addClass('hidden');
			}
		}
	},

	'click .wrong': function (evt) {
		evt.preventDefault();
		if ($.k2l.m4a22_8.questionWordLock == false && $.k2l.m4a22_8.stuckFlag == false) {
			$.k2l.m4a22_8.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m4a22_8.questionWordLock = false;
			}, 1000);
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
			$.k2l.m4a22_8.wrongscore++;

			if ($.k2l.m4a22_8.wrongscore > 2) {
				$('.stuck').removeClass('hidden');
			}

		}
	},
	'click .stuck': function (evt) {
		$('.stuck').addClass('hidden');
		$.k2l.m4a22_8.wrongscore = 0;
		$.k2l.m4a22_8.index = 0;
		$(".counterleft u").html($.k2l.m4a22_8.index);
		$('.paraclick-word').addClass('correctword');
		$('.paraclick-word').children().popover('show');
		$('.paraclick-word-sleep').addClass('correctword');
		$('#m4a22_8 .navfooter a').removeClass('hidden');
		$.k2l.m4a22_8.stuckFlag = true;
	},

	'click .navfooter a': function (evt) {
		$('#m4a22_8 .navfooter a').addClass('hidden');
		$('.paraclick-word').removeClass('correctword');
		$.k2l.m4a22_8.wrongscore = 0;
		$.k2l.m4a22_8.index = 1;
		$.k2l.m4a22_8.stuckFlag = false;
		$(".counterleft u").html($.k2l.m4a22_8.index);
	}

});

Template.m4a22_8.rendered = function () {
	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a22_8 == 'undefined') {
		$.k2l.m4a22_8 = {};
	};
	$('[data-toggle="popover"]').popover();
	$.k2l.m4a22_8.index = 1;
	$.k2l.m4a22_8.wrongscore = 0;
	$.k2l.m4a22_8.stuckFlag = false;
	$.k2l.m4a22_8.questionWordLock = false;

}


Template.m4a22_9.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a22_9");
	}
});

Template.m4a22_9.events({
	'click .paraclick-word-sleep': function (evt) {
		evt.preventDefault();
		if ($(evt.target).hasClass('correctword')) {
			return;
		}
		var parentSection = $(evt.currentTarget).parents('section');
		if ($.k2l.m4a22_9.questionWordLock == false && $.k2l.m4a22_9.stuckFlag == false) {
			$.k2l.m4a22_9.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m4a22_9.questionWordLock = false;
			}, 1000);
			$('.paraclick-word-sleep').addClass('correctword');
			$('.correctscreen').removeClass("hidden");
			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m4a22_9.index--;
			$(".counterleft u").html($.k2l.m4a22_9.index);

			if ($.k2l.m4a22_9.index <= 0) {
				$('.pagination').removeClass('hidden');
				$('.stuck').addClass('hidden');
			}
		}
	},

	'click .paraclick-word': function (evt) {
		evt.preventDefault();
		if ($(evt.target).hasClass('correctword')) {
			return;
		}
		var parentSection = $(evt.currentTarget).parents('section');
		if ($.k2l.m4a22_9.questionWordLock == false && $.k2l.m4a22_9.stuckFlag == false) {
			$.k2l.m4a22_9.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m4a22_9.questionWordLock = false;
			}, 1000);
			$('[data-toggle="popover"]').popover();
			$(evt.target).addClass('correctword');
			$(evt.target).popover('show');
			$('.correctscreen').removeClass("hidden");
			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m4a22_9.index--;
			$(".counterleft u").html($.k2l.m4a22_9.index);

			if ($.k2l.m4a22_9.index <= 0) {
				$('.pagination').removeClass('hidden');
				$('.stuck').addClass('hidden');
			}
		}
	},

	'click .wrong': function (evt) {
		evt.preventDefault();
		if ($.k2l.m4a22_9.questionWordLock == false && $.k2l.m4a22_9.stuckFlag == false) {
			$.k2l.m4a22_9.questionWordLock = true;
			setTimeout(function () {
				$.k2l.m4a22_9.questionWordLock = false;
			}, 1000);
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
			$.k2l.m4a22_9.wrongscore++;

			if ($.k2l.m4a22_9.wrongscore > 2) {
				$('.stuck').removeClass('hidden');
			}

		}
	},
	'click .stuck': function (evt) {
		$('.stuck').addClass('hidden');
		$.k2l.m4a22_9.wrongscore = 0;
		$.k2l.m4a22_9.index = 0;
		$(".counterleft u").html($.k2l.m4a22_9.index);
		$('.paraclick-word').addClass('correctword');
		$('.paraclick-word').children().popover('show');
		$('.paraclick-word-sleep').addClass('correctword');
		$('#m4a22_9 .navfooter a').removeClass('hidden');
		$.k2l.m4a22_9.stuckFlag = true;
	},

	'click .navfooter a': function (evt) {
		$('#m4a22_9 .navfooter a').addClass('hidden');
		$('.paraclick-word').removeClass('correctword');
		$.k2l.m4a22_9.wrongscore = 0;
		$.k2l.m4a22_9.index = 2;
		$.k2l.m4a22_9.stuckFlag = false;
		$(".counterleft u").html($.k2l.m4a22_9.index);
	}

});

Template.m4a22_9.rendered = function () {
	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a22_9 == 'undefined') {
		$.k2l.m4a22_9 = {};
	};
	$('[data-toggle="popover"]').popover();
	$.k2l.m4a22_9.index = 2;
	$.k2l.m4a22_9.wrongscore = 0;
	$.k2l.m4a22_9.stuckFlag = false;
	$.k2l.m4a22_9.questionWordLock = false;

}

