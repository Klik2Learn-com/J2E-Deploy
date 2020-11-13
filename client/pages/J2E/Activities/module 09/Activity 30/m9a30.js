Template.m9a30.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m9a30_end') {
			return false;
		}
		return true;
	},
	gameAccess: function () {
		var userid = Meteor.userId();
		var passed = gameAccess.find({ "user": userid, "module": "9", "passedTest": true }).count();
		if (passed >= 1) {
			return true;
		} else {
			return false;
		}
	}
});

Template.m9a30.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(9, 30);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(9, 30, subpage);
			oldLocation = location.href;
		}
	}, 500);

	Session.set('m9a30_Correct', 0);
	Session.set('m9a30_Incorrect', 0);

}

Template.m9a30.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 9, 30, Meteor.userId());
	this.subscribe('gameAccess');
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m9a30.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m9a30_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a30_4");
	}
});


Template.m9a30_4.events({
	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m9a30_Correct');
		var scoreIncorrect = Session.get('m9a30_Incorrect');

		if ($('#target1').children().html() != 'chairman') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'recession') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'sack') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'warehouse') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().html() != 'temporary') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m9a30_Correct', scoreCorrect);
		Session.set('m9a30_Incorrect', scoreIncorrect);

		$.k2l.m9a30_4.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m9a30_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m9a30_4 == 'undefined') {
		$.k2l.m9a30_4 = {};
	};

	var selector = '#m9a30_4';
	initDragDropTest(selector);
}


Template.m9a30_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a30_1");
	}
});


Template.m9a30_1.events({
	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m9a30_Correct');
		var scoreIncorrect = Session.get('m9a30_Incorrect');

		if ($('#target1').children().html() != 'scribble') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'drudgery') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'deadline') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'first-aid') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().html() != 'therapist') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m9a30_Correct', scoreCorrect);
		Session.set('m9a30_Incorrect', scoreIncorrect);

		$.k2l.m9a30_1.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m9a30_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m9a30_1 == 'undefined') {
		$.k2l.m9a30_1 = {};
	};

	var selector = '#m9a30_1';
	initDragDropTest(selector);
}


Template.m9a30_7.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a30_7");
	}
});

Template.m9a30_7.events({

	"click .restart": function (evt) {
		if (typeof $.k2l != 'undefined') {
			if (typeof $.k2l.m9a30_1 != 'undefined') {
				if (typeof $.k2l.m9a30_1.index != 'undefined') {
					$.k2l.m9a30_1.index = 0;
				}
				if (typeof $.k2l.m9a30_1.Correct != 'undefined') {
					$.k2l.m9a30_1.Correct = 0;
				}
				if (typeof $.k2l.m9a30_1.Incorrect != 'undefined') {
					$.k2l.m9a30_1.Incorrect = 0;
				}
			}
		}
		Session.set('m9a30_Correct', 0);
		Session.set('m9a30_Incorrect', 0);
		//Session.set('activeSection', '#m9a30_1');
		// $('#m9a30CorrectScore').html(Session.get('m9a30CorrectScore'));
		// $('#m9a30IncorrectScore').html(Session.get('m9a30IncorrectScore'));
		//$.k2l.m9a30_1.allowClick = true;
		forceReload();
	}

});


Template.m9a30_5.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a30_5");
	}
});


Template.m9a30_5.events({

	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m9a30_Correct');
		var scoreIncorrect = Session.get('m9a30_Incorrect');

		if ($('#target1').children().html() != 'contract') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'be full of yourself') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'corporation') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'skyscraper') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().html() != 'induction') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m9a30_Correct', scoreCorrect);
		Session.set('m9a30_Incorrect', scoreIncorrect);

		$.k2l.m9a30_5.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m9a30_5.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m9a30_5 == 'undefined') {
		$.k2l.m9a30_5 = {};
	};

	var selector = '#m9a30_5';
	initDragDropTest(selector);
}


Template.m9a30_6.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a30_6");
	}
});


Template.m9a30_6.events({
	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m9a30_Correct');
		var scoreIncorrect = Session.get('m9a30_Incorrect');

		if ($('#target1').children().html() != 'bullying') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'work ethic') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'incredibly') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'gourmet') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().html() != 'treadmill') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m9a30_Correct', scoreCorrect);
		Session.set('m9a30_Incorrect', scoreIncorrect);

		$.k2l.m9a30_6.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		var score = Session.get('m9a30_Correct') + " out of 30"
		if (Session.get('m9a30_Incorrect') < 7) {
			if (Session.get('m9a30_Correct') >= 23) {
				Meteor.call('setGameAccess', Meteor.userId(), "9", score, true);
			}
			$("#m9a30_good").removeClass('hidden');
			Session.set("activeSection", "#m9a30_good");
		} else {
			if (Session.get('m9a30_Correct') < 23) {
				Meteor.call('setGameAccess', Meteor.userId(), "9", score, false);
			}
			$("#m9a30_bad").removeClass('hidden');
			Session.set("activeSection", "#m9a30_bad");
		}

	}

});

Template.m9a30_6.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m9a30_6 == 'undefined') {
		$.k2l.m9a30_6 = {};
	};

	var selector = '#m9a30_6';
	initDragDropTest(selector);
}


Template.m9a30_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a30_3");
	}
});


Template.m9a30_3.events({
	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m9a30_Correct');
		var scoreIncorrect = Session.get('m9a30_Incorrect');

		if ($('#target1').children().html() != 'glamorous') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'entrepreneur') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'discrimination') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'esteem') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().html() != 'chaotic') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m9a30_Correct', scoreCorrect);
		Session.set('m9a30_Incorrect', scoreIncorrect);

		$.k2l.m9a30_3.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m9a30_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m9a30_3 == 'undefined') {
		$.k2l.m9a30_3 = {};
	};

	var selector = '#m9a30_3';
	initDragDropTest(selector);
}


Template.m9a30_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a30_2");
	}
});


Template.m9a30_2.events({
	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m9a30_Correct');
		var scoreIncorrect = Session.get('m9a30_Incorrect');

		if ($('#target1').children().html() != 'apprenticeship') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'bracelet') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'interpreter') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'mentor') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().html() != 'grow a thick skin') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m9a30_Correct', scoreCorrect);
		Session.set('m9a30_Incorrect', scoreIncorrect);

		$.k2l.m9a30_2.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m9a30_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m9a30_2 == 'undefined') {
		$.k2l.m9a30_2 = {};
	};

	var selector = '#m9a30_2';
	initDragDropTest(selector);
}

