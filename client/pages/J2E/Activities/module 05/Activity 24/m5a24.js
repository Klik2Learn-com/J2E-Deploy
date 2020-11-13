Template.m5a24.rendered = function () {

	Session.set('m5a24_Correct', 0);
	Session.set('m5a24_Incorrect', 0);

	document.title = "Journey 2 English";
	
	setStartActivity(5, 24);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(5, 24, subpage);
			oldLocation = location.href;
		}
	}, 500);

}


Template.m5a24.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m5a24_end') {
			return false;
		} return true;
	},
	gameAccess: function () {
		var userid = Meteor.userId();
		var passed = gameAccess.find({ "user": userid, "module": "5", "passedTest": true }).count();
		if (passed >= 1) {
			return true;
		} else {
			return false;
		}
	}
});

Template.m5a24.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 5, 24, Meteor.userId());
	this.subscribe('gameAccess');
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m5a24.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m5a24_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a24_1");
	}
});


Template.m5a24_1.events({
	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m5a24_Correct');
		var scoreIncorrect = Session.get('m5a24_Incorrect');

		if ($('#target1').children().attr('data-answer') != 'wade') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().attr('data-answer') != 'accelerate') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().attr('data-answer') != 'chop') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().attr('data-answer') != 'rapids') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().attr('data-answer') != 'dubbed') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m5a24_Correct', scoreCorrect);
		Session.set('m5a24_Incorrect', scoreIncorrect);

		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m5a24_1.rendered = function () {
	initDragDropTest("#m5a24_1");
}

Template.m5a24_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a24_2");
	}
});


Template.m5a24_2.events({
	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m5a24_Correct');
		var scoreIncorrect = Session.get('m5a24_Incorrect');

		if ($('#target1').children().attr('data-answer') != 'articulate') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().attr('data-answer') != 'lagoon') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().attr('data-answer') != 'wilderness') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().attr('data-answer') != 'abuse') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().attr('data-answer') != 'wholesome') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m5a24_Correct', scoreCorrect);
		Session.set('m5a24_Incorrect', scoreIncorrect);

		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m5a24_2.rendered = function () {
	initDragDropTest("#m5a24_2");
}

Template.m5a24_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a24_3");
	}
});


Template.m5a24_3.events({
	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m5a24_Correct');
		var scoreIncorrect = Session.get('m5a24_Incorrect');

		if ($('#target1').children().attr('data-answer') != 'buckle') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().attr('data-answer') != 'buggy') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().attr('data-answer') != 'foundation') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().attr('data-answer') != 'inflatable') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().attr('data-answer') != 'dune') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m5a24_Correct', scoreCorrect);
		Session.set('m5a24_Incorrect', scoreIncorrect);

		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m5a24_3.rendered = function () {
	initDragDropTest("#m5a24_3");
}

Template.m5a24_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a24_4");
	}
});


Template.m5a24_4.events({
	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m5a24_Correct');
		var scoreIncorrect = Session.get('m5a24_Incorrect');

		if ($('#target1').children().attr('data-answer') != 'overcome') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().attr('data-answer') != 'meagre') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().attr('data-answer') != 'junkie') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().attr('data-answer') != 'spectacle') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().attr('data-answer') != 'distribution') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m5a24_Correct', scoreCorrect);
		Session.set('m5a24_Incorrect', scoreIncorrect);

		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m5a24_4.rendered = function () {
	initDragDropTest("#m5a24_4");
}

Template.m5a24_5.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a24_5");
	}
});


Template.m5a24_5.events({
	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m5a24_Correct');
		var scoreIncorrect = Session.get('m5a24_Incorrect');

		if ($('#target1').children().attr('data-answer') != 'terminal') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().attr('data-answer') != 'bizarre') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().attr('data-answer') != 'ancestor') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().attr('data-answer') != 'manoeuvre') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().attr('data-answer') != 'adulation') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m5a24_Correct', scoreCorrect);
		Session.set('m5a24_Incorrect', scoreIncorrect);

		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m5a24_5.rendered = function () {
	initDragDropTest("#m5a24_5");
}

Template.m5a24_6.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a24_6");
	}
});

Template.m5a24_6.events({
	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m5a24_Correct');
		var scoreIncorrect = Session.get('m5a24_Incorrect');


		if ($('#target1').children().attr('data-answer') != 'declines') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().attr('data-answer') != 'adrenalin') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().attr('data-answer') != 'worthy') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().attr('data-answer') != 'diabetes') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().attr('data-answer') != 'massive') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m5a24_Correct', scoreCorrect);
		Session.set('m5a24_Incorrect', scoreIncorrect);

		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m5a24_6.rendered = function () {
	initDragDropTest("#m5a24_6");
}

Template.m5a24_7.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a24_7");
	}
});

Template.m5a24_7.events({
	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m5a24_Correct');
		var scoreIncorrect = Session.get('m5a24_Incorrect');

		if ($('#target1').children().attr('data-answer') != 'predict') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().attr('data-answer') != 'bushcraft') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m5a24_Correct', scoreCorrect);
		Session.set('m5a24_Incorrect', scoreIncorrect);

		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		var score = Session.get('m5a24_Correct') + " out of 32"
		if (Session.get('m5a24_Incorrect') < 9) {
			if (Session.get('m5a24_Correct') >= 24) {
				Meteor.call('setGameAccess', Meteor.userId(), "5", score, true);
			}
			$("#m5a24_good").removeClass('hidden');
			Session.set("activeSection", "#m5a24_good");
		} else {
			if (Session.get('m5a24_Correct') < 24) {
				Meteor.call('setGameAccess', Meteor.userId(), "5", score, false);
			}
			$("#m5a24_bad").removeClass('hidden');
			Session.set("activeSection", "#m5a24_bad");
		}

	}

});

Template.m5a24_7.rendered = function () {
	initDragDropTest("#m5a24_7");
}

Template.m5a24_scores.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m5a24_scores");
	}
});


Template.m5a24_scores.events({

	"click a.restart": function (evt) {
		if (typeof $.k2l != 'undefined') {
			if (typeof $.k2l.m5a24_1 != 'undefined') {
				if (typeof $.k2l.m5a24_1.index != 'undefined') {
					$.k2l.m5a24_1.index = 0;
				}
				if (typeof $.k2l.m5a24_1.rightscore != 'undefined') {
					$.k2l.m5a24_1.rightscore = 0;
				}
				if (typeof $.k2l.m5a24_1.wrongscore != 'undefined') {
					$.k2l.m5a24_1.wrongscore = 0;
				}
			}
		}


		Session.set('m5a24_Correct', 0);
		Session.set('m5a24_Incorrect', 0);
		// $('#m5a24RightScore').html(Session.get('m5a24RightScore'));
		// $('#m5a24WrongScore').html(Session.get('m5a24WrongScore'));
		//  $.k2l.m5a24_1.allowClick = true;
		Session.set("activeSection", "#m5a24_1");
		forceReload();
	}
});
