Template.m7a26.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m7a26_end') {
			return false;
		}
		return true;
	},
	gameAccess: function () {
		var userid = Meteor.userId();
		var passed = gameAccess.find({ "user": userid, "module": "7", "passedTest": true }).count();
		if (passed >= 1) {
			return true;
		} else {
			return false;
		}
	}
});

Template.m7a26.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(7, 26);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(7, 26, subpage);
			oldLocation = location.href;
		}
	}, 500);

	Session.set('m7a26_Correct', 0);
	Session.set('m7a26_Incorrect', 0);
}


Template.m7a26_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a26_1");
	}
});

Template.m7a26_1.events({

	"click .pagination": function (evt) {
		$.k2l.m7a26_1.draggedElement = {};
		$.k2l.m7a26_1.counter = 0;
	},

	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m7a26_Correct');
		var scoreIncorrect = Session.get('m7a26_Incorrect');

		if ($('#target1').children().html() != 'post graduate') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'undergraduate') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'essay') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'prospectus') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().html() != 'plagiarism') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target6').children().html() != 'cheating') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m7a26_Correct', scoreCorrect);
		Session.set('m7a26_Incorrect', scoreIncorrect);

		$.k2l.m7a26_1.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m7a26_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m7a26_1 == 'undefined') {
		$.k2l.m7a26_1 = {};
	};

	$.k2l.m7a26_1.draggedElement = {};

	initDragDropTest("#m7a26_1");
}

Template.m7a26_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a26_2");
	}
});

Template.m7a26_2.events({

	"click .pagination": function (evt) {
		$.k2l.m7a26_2.draggedElement = {};
		$.k2l.m7a26_2.counter = 0;
	},

	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m7a26_Correct');
		var scoreIncorrect = Session.get('m7a26_Incorrect');

		if ($('#target1').children().html() != 'course work') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'tutorial') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'lecture') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'graduate') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().html() != 'degree') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target6').children().html() != 'Halls of residence') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m7a26_Correct', scoreCorrect);
		Session.set('m7a26_Incorrect', scoreIncorrect);

		$.k2l.m7a26_2.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m7a26_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m7a26_2 == 'undefined') {
		$.k2l.m7a26_2 = {};
	};

	$.k2l.m7a26_2.draggedElement = {};

	initDragDropTest("#m7a26_2");
}

Template.m7a26_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a26_3");
	}
});

Template.m7a26_3.events({

	"click .pagination": function (evt) {
		$.k2l.m7a26_3.draggedElement = {};
		$.k2l.m7a26_3.counter = 0;
	},


	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m7a26_Correct');
		var scoreIncorrect = Session.get('m7a26_Incorrect');

		if ($('#target1').children().html() != 'seminar') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'subject') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'professor') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'term') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().html() != 'campus') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target6').children().html() != 'syllabus') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m7a26_Correct', scoreCorrect);
		Session.set('m7a26_Incorrect', scoreIncorrect);

		$.k2l.m7a26_3.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		var score = Session.get('m7a26_Correct') + " out of 18"
		if (Session.get('m7a26_Incorrect') < 4) {
			if (Session.get('m7a26_Correct') >= 13) {
				Meteor.call('setGameAccess', Meteor.userId(), "7", score, true);
			}
			$("#m7a26_good").removeClass('hidden');
			Session.set("activeSection", "#m7a26_good");
		} else {
			if (Session.get('m7a26_Correct') < 13) {
				Meteor.call('setGameAccess', Meteor.userId(), "7", score, false);
			}
			$("#m7a26_bad").removeClass('hidden');
			Session.set("activeSection", "#m7a26_bad");
		}

	}

});

Template.m7a26_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m7a26_3 == 'undefined') {
		$.k2l.m7a26_3 = {};
	};

	$.k2l.m7a26_3.draggedElement = {};

	initDragDropTest("#m7a26_3");
}

Template.m7a26_scores.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m7a26_scores");
	}
});


Template.m7a26_scores.events({

	"click .restart": function (evt) {
		if (typeof $.k2l != 'undefined') {
			if (typeof $.k2l.m7a26_1 != 'undefined') {
				if (typeof $.k2l.m7a26_1.index != 'undefined') {
					$.k2l.m7a26_1.index = 0;
				}
				if (typeof $.k2l.m7a26_1.CorrectScore != 'undefined') {
					$.k2l.m7a26_1.CorrectScore = 0;
				}
				if (typeof $.k2l.m7a26_1.IncorrectScore != 'undefined') {
					$.k2l.m7a26_1.IncorrectScore = 0;
				}
			}
		}
		Session.set('m7a26_Correct', 0);
		Session.set('m7a26_Incorrect', 0);
		// $('#m7a26_Correct').html(Session.get('m7a26_Correct'));
		// $('#m7a26_Incorrect').html(Session.get('m7a26_Incorrect'));
		// $.k2l.m7a26_1.allowClick = true;
		forceReload();
	},
});


Template.m7a26.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 7, 26, Meteor.userId());
	this.subscribe('gameAccess');
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m7a26.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
