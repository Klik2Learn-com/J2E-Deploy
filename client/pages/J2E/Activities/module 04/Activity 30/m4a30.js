Template.m4a30.rendered = function () {

	Session.set('m4a30_Correct', 0);
	Session.set('m4a30_Incorrect', 0);

	document.title = "Journey 2 English";
	
	setStartActivity(4, 30);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 30, subpage);
			oldLocation = location.href;
		}
	}, 500);
}


Template.m4a30.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m4a30_end') {
			return false;
		} return true;
	},
	gameAccess: function () {
		var userid = Meteor.userId();
		var passed = gameAccess.find({ "user": userid, "module": "4", "passedTest": true }).count();
		if (passed >= 1) {
			return true;
		} else {
			return false;
		}
	}
});


Template.m4a30.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 30, Meteor.userId());
	this.subscribe('gameAccess');
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a30.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m4a30_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a30_1");
	}
});


Template.m4a30_1.events({

	"click .pagination": function (evt) {
		$.k2l.m4a30_1.draggedElement = {};
		$.k2l.m4a30_1.counter = 0;
	},

	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m4a30_Correct');
		var scoreIncorrect = Session.get('m4a30_Incorrect');

		if ($('#target1').children().attr('data-answer') != 'jogging') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().attr('data-answer') != 'effective') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().attr('data-answer') != 'calories') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().attr('data-answer') != 'trainers') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().attr('data-answer') != 'metabolism') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m4a30_Correct', scoreCorrect);
		Session.set('m4a30_Incorrect', scoreIncorrect);

		$.k2l.m4a30_1.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m4a30_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a30_1 == 'undefined') {
		$.k2l.m4a30_1 = {};
	};

	$.k2l.m4a30_1.draggedElement = {};

	initDragDropTest("#m4a30_1");
}

Template.m4a30_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a30_2");
	}
});


Template.m4a30_2.events({

	"click .pagination": function (evt) {
		$.k2l.m4a30_2.draggedElement = {};
		$.k2l.m4a30_2.counter = 0;
	},

	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m4a30_Correct');
		var scoreIncorrect = Session.get('m4a30_Incorrect');

		if ($('#target1').children().attr('data-answer') != 'stressful') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().attr('data-answer') != 'priority') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m4a30_Correct', scoreCorrect);
		Session.set('m4a30_Incorrect', scoreIncorrect);

		$.k2l.m4a30_2.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		var score = Session.get('m4a30_Correct') + " out of 7"
		if (Session.get('m4a30_Incorrect') < 2) {
			if (Session.get('m4a30_Correct') >= 5) {
				Meteor.call('setGameAccess', Meteor.userId(), "4", score, true);
			}
			$("#m4a30_good").removeClass('hidden');
			Session.set("activeSection", "#m4a30_good");
		} else {
			if (Session.get('m4a30_Correct') < 5) {
				Meteor.call('setGameAccess', Meteor.userId(), "4", score, false);
			}
			$("#m4a30_bad").removeClass('hidden');
			Session.set("activeSection", "#m4a30_bad");
		}

	}

});

Template.m4a30_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a30_2 == 'undefined') {
		$.k2l.m4a30_2 = {};
	};

	$.k2l.m4a30_2.draggedElement = {};

	initDragDropTest("#m4a30_2");
}

Template.m4a30_scores.onRendered(function () {
	// rightScore: function(){
	// return Session.get('m4a30_Correct');
	// },
	// return Session.get('m4a30_Correct');
	$('#m4a30ScoresRight').html(Session.get('m4a30_Correct'));
	$('#m4a30ScoresWrong').html(Session.get('m4a30_Incorrect'));

	// wrongScore: function() {
	// return Session.get('m4a30_Incorrect');
	// }
})

Template.m4a30_scores.events({
	"click .restart": function (evt) {
		if (typeof $.k2l != 'undefined') {
			if (typeof $.k2l.m4a30_1 != 'undefined') {
				if (typeof $.k2l.m4a30_1.index != 'undefined') {
					$.k2l.m8a34_1.index = 0;
				}
				if (typeof $.k2l.m4a30_1.Correct != 'undefined') {
					$.k2l.m8a34_1.Correct = 0;
				}
				if (typeof $.k2l.m4a30_1.Incorrect != 'undefined') {
					$.k2l.m8a34_1.Incorrect = 0;
				}
			}
		}
		Session.set('m4a30_Correct', 0);
		Session.set('m4a30_Incorrect', 0);
		// $('#m8a34Correct').html(Session.get('m8a34Correct'));
		// $('#m8a34Incorrect').html(Session.get('m8a34Incorrect'));
		//$.k2l.m8a34_1.allowClick = true;
		Session.set("activeSection", "#m4a30_1");
		forceReload();
	}
})

