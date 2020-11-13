Template.m6a29.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m6a29_end') {
			return false;
		}
		return true;
	},
	gameAccess: function () {
		var userid = Meteor.userId();
		var passed = gameAccess.find({ "user": userid, "module": "6", "passedTest": true }).count();
		if (passed >= 1) {
			return true;
		} else {
			return false;
		}
	}
});

Template.m6a29.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(6, 29);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(6, 29, subpage);
			oldLocation = location.href;
		}
	}, 500);


	Session.set('m6a29CorrectScore', 0);
	Session.set('m6a29IncorrectScore', 0);
}

Template.m6a29.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 6, 29, Meteor.userId());
	this.subscribe('gameAccess');
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m6a29.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m6a29_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a29_1");
	}
});

Template.m6a29_1.events({
	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m6a29CorrectScore');
		var scoreIncorrect = Session.get('m6a29IncorrectScore');

		if ($('#target1').children().html() != 'limelight') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'missile') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'controversial') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'recommend') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().html() != 'debate') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m6a29CorrectScore', scoreCorrect);
		Session.set('m6a29IncorrectScore', scoreIncorrect);

		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m6a29_1.rendered = function () {
	initDragDropTest("#m6a29_1");
}

Template.m6a29_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a29_2");
	}
});


Template.m6a29_2.events({
	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m6a29CorrectScore');
		var scoreIncorrect = Session.get('m6a29IncorrectScore');

		if ($('#target1').children().html() != 'protestant') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'reckless') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'whereas') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'dominate') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().html() != 'sectarian') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m6a29CorrectScore', scoreCorrect);
		Session.set('m6a29IncorrectScore', scoreIncorrect);

		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m6a29_2.rendered = function () {
	initDragDropTest("#m6a29_2");
}

Template.m6a29_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a29_3");
	}
});


Template.m6a29_3.events({
	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m6a29CorrectScore');
		var scoreIncorrect = Session.get('m6a29IncorrectScore');

		if ($('#target1').children().html() != 'assent') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'riot') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'elect') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'scrutinise') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().html() != 'baton') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m6a29CorrectScore', scoreCorrect);
		Session.set('m6a29IncorrectScore', scoreIncorrect);

		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m6a29_3.rendered = function () {
	initDragDropTest("#m6a29_3");
}

Template.m6a29_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a29_4");
	}
});


Template.m6a29_4.events({
	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m6a29CorrectScore');
		var scoreIncorrect = Session.get('m6a29IncorrectScore');

		if ($('#target1').children().html() != 'plaudits') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'commemorate') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m6a29CorrectScore', scoreCorrect);
		Session.set('m6a29IncorrectScore', scoreIncorrect);

		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		var score = Session.get('m6a29CorrectScore') + " out of 17"
		if (Session.get('m6a29IncorrectScore') < 4) {
			if (Session.get('m6a29CorrectScore') >= 13) {
				Meteor.call('setGameAccess', Meteor.userId(), "6", score, true);
			}
			$("#m6a29_good").removeClass('hidden');
			Session.set("activeSection", "#m6a29_good");
		} else {
			if (Session.get('m6a29CorrectScore') < 13) {
				Meteor.call('setGameAccess', Meteor.userId(), "6", score, false);
			}
			$("#m6a29_bad").removeClass('hidden');
			Session.set("activeSection", "#m6a29_bad");
		}

	}

});

Template.m6a29_4.rendered = function () {
	initDragDropTest("#m6a29_4");
}

Template.m6a29_scores.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m6a29_scores");
	}
});


Template.m6a29_scores.events({

	"click a.restart": function (evt) {
		if (typeof $.k2l != 'undefined') {
			if (typeof $.k2l.m6a29_1 != 'undefined') {
				if (typeof $.k2l.m6a29_1.index != 'undefined') {
					$.k2l.m6a29_1.index = 0;
				}
				if (typeof $.k2l.m6a29_1.rightscore != 'undefined') {
					$.k2l.m6a29_1.rightscore = 0;
				}
				if (typeof $.k2l.m6a29_1.wrongscore != 'undefined') {
					$.k2l.m6a29_1.wrongscore = 0;
				}
			}
		}


		Session.set('m6a29CorrectScore', 0);
		Session.set('m6a29IncorrectScore', 0);
		// $('#m6a29RightScore').html(Session.get('m6a29RightScore'));
		// $('#m6a29WrongScore').html(Session.get('m6a29WrongScore'));
		//  $.k2l.m6a29_1.allowClick = true;
		Session.set("activeSection", "#m6a29_1");
		forceReload();

	}
});
