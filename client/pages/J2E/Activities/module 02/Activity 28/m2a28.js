Template.m2a28.rendered = function () {

	Session.set('m2a28_Correct', 0);
	Session.set('m2a28_Incorrect', 0);

	document.title = "Journey 2 English";
	
	setStartActivity(2, 28);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 28, subpage);
			oldLocation = location.href;
		}
	}, 500);

}


Template.m2a28.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m2a28_end') {
			return false;
		} return true;
	},
	gameAccess: function () {
		var userid = Meteor.userId();
		var passed = gameAccess.find({ "user": userid, "module": "2", "passedTest": true }).count();
		if (passed >= 1) {
			return true;
		} else {
			return false;
		}
	}
});

Template.m2a28.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 28, Meteor.userId());
	this.subscribe('gameAccess');
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m2a28.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m2a28_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a28_1");
	}
});


Template.m2a28_1.events({

	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m2a28_Correct');
		var scoreIncorrect = Session.get('m2a28_Incorrect');

		if ($('#target1').children().attr('data-answer') != 'obviously') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().attr('data-answer') != 'incomprehensible') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().attr('data-answer') != 'regulate') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().attr('data-answer') != 'insurance') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().attr('data-answer') != 'understand') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m2a28_Correct', scoreCorrect);
		Session.set('m2a28_Incorrect', scoreIncorrect);

		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m2a28_1.rendered = function () {
	initDragDropTest("#m2a28_1");
}


Template.m2a28_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a28_2");
	}
});


Template.m2a28_2.events({
	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m2a28_Correct');
		var scoreIncorrect = Session.get('m2a28_Incorrect');

		if ($('#target1').children().attr('data-answer') != 'reply') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().attr('data-answer') != 'observatory') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().attr('data-answer') != 'indefatigable') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().attr('data-answer') != 'visibility') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().attr('data-answer') != 'lemonade') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m2a28_Correct', scoreCorrect);
		Session.set('m2a28_Incorrect', scoreIncorrect);

		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m2a28_2.rendered = function () {
	initDragDropTest("#m2a28_2");
}


Template.m2a28_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a28_3");
	}
});


Template.m2a28_3.events({
	"click #submitButton": function (evt) {

		var scoreCorrect = Session.get('m2a28_Correct');
		var scoreIncorrect = Session.get('m2a28_Incorrect');

		if ($('#target1').children().attr('data-answer') != 'identical') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().attr('data-answer') != 'refrigerator') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().attr('data-answer') != 'explosive') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().attr('data-answer') != 'station') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().attr('data-answer') != 'bureaucratic') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m2a28_Correct', scoreCorrect);
		Session.set('m2a28_Incorrect', scoreIncorrect);

		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m2a28_3.rendered = function () {
	initDragDropTest("#m2a28_3");
}


Template.m2a28_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a28_4");
	}
});


Template.m2a28_4.events({
	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m2a28_Correct');
		var scoreIncorrect = Session.get('m2a28_Incorrect');

		if ($('#target1').children().attr('data-answer') != 'international') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().attr('data-answer') != 'appreciation') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().attr('data-answer') != 'humiliation') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().attr('data-answer') != 'department') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().attr('data-answer') != 'prisoner') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m2a28_Correct', scoreCorrect);
		Session.set('m2a28_Incorrect', scoreIncorrect);

		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m2a28_4.rendered = function () {
	initDragDropTest("#m2a28_4");
}


Template.m2a28_5.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a28_5");
	}
});


Template.m2a28_5.events({
	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m2a28_Correct');
		var scoreIncorrect = Session.get('m2a28_Incorrect');

		if ($('#target1').children().attr('data-answer') != 'bottle') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().attr('data-answer') != 'capitalism') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().attr('data-answer') != 'discount') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().attr('data-answer') != 'parliament') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m2a28_Correct', scoreCorrect);
		Session.set('m2a28_Incorrect', scoreIncorrect);

		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m2a28_5.rendered = function () {
	initDragDropTest("#m2a28_5");
}


Template.m2a28_6.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a28_6");
	}
});


Template.m2a28_6.events({
	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m2a28_Correct');
		var scoreIncorrect = Session.get('m2a28_Incorrect');

		if ($('#target1').children().attr('data-answer') != 'basketball') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().attr('data-answer') != 'economics') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().attr('data-answer') != 'autobiographical') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().attr('data-answer') != 'electricity') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().attr('data-answer') != 'professional') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m2a28_Correct', scoreCorrect);
		Session.set('m2a28_Incorrect', scoreIncorrect);

		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m2a28_6.rendered = function () {
	initDragDropTest("#m2a28_6");
}


Template.m2a28_7.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a28_7");
	}
});


Template.m2a28_7.events({
	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m2a28_Correct');
		var scoreIncorrect = Session.get('m2a28_Incorrect');

		if ($('#target1').children().html() != 'totalitarianism') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'offence') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m2a28_Correct', scoreCorrect);
		Session.set('m2a28_Incorrect', scoreIncorrect);

		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		var score = Session.get('m2a28_Correct') + " out of 32"
		if (Session.get('m2a28_Incorrect') < 8) {
			if (Session.get('m2a28_Correct') >= 24) {
				Meteor.call('setGameAccess', Meteor.userId(), "2", score, true);
			}
			$("#m2a28_good").removeClass('hidden');
			Session.set("activeSection", "#m2a28_good");
		} else {
			if (Session.get('m2a28_Correct') < 24) {
				Meteor.call('setGameAccess', Meteor.userId(), "2", score, false);
			}
			$("#m2a28_bad").removeClass('hidden');
			Session.set("activeSection", "#m2a28_bad");
		}

	}

});

Template.m2a28_7.rendered = function () {
	initDragDropTest("#m2a28_7");
}


Template.m2a28_scores.onRendered(function () {
	// rightScore: function(){
	// return Session.get('m2a28_Correct');
	// },
	// return Session.get('m2a28_Correct');
	$('#m2a28ScoresRight').html(Session.get('m2a28_Correct'));
	$('#m2a28ScoresWrong').html(Session.get('m2a28_Incorrect'));

	// wrongScore: function() {
	// return Session.get('m2a28_Incorrect');
	// }
})

Template.m2a28_scores.events({
	"click .restart": function (evt) {
		Session.set('m2a28_Correct', 0);
		Session.set('m2a28_Incorrect', 0);
		Session.set('activeSection', '#m2a28_1');
		forceReload();
	}
})

