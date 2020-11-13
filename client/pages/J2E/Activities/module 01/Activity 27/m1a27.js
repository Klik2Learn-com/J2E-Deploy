Template.m1a27.rendered = function () {

	document.title = "Journey 2 English";
	


	Session.set('m1a27_Correct', 0);
	Session.set('m1a27_Incorrect', 0);

	setStartActivity(1, 27);
}

Template.m1a27.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m1a27_end') {
			return false;
		} return true;
	},

	gameAccess: function () {
		var userid = Meteor.userId();
		var passed = gameAccess.find({ "user": userid, "module": "1", "passedTest": true }).count();
		if (passed >= 1) {
			return true;
		} else {
			return false;
		}
	}
});

Template.m1a27.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 1, 27, Meteor.userId());
	this.subscribe('gameAccess');
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m1a27.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m1a27_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a27_1");
	}
});


Template.m1a27_1.events({

	"click .pagination": function (evt) {
		$.k2l.m1a27_1.draggedElement = {};
		$.k2l.m1a27_1.counter = 0;
	},

	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m1a27_Correct');
		var scoreIncorrect = Session.get('m1a27_Incorrect');

		if ($('#target1').children().attr('data-answer') != 'creative') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().attr('data-answer') != 'talkative') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().attr('data-answer') != 'crisis') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().attr('data-answer') != 'sensible') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().attr('data-answer') != 'quick-thinking') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m1a27_Correct', scoreCorrect);
		Session.set('m1a27_Incorrect', scoreIncorrect);

		$.k2l.m1a27_1.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m1a27_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a27_1 == 'undefined') {
		$.k2l.m1a27_1 = {};
	};

	$.k2l.m1a27_1.draggedElement = {};

	initDragDropTest("#m1a27_1");

}


Template.m1a27_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a27_2");
	}
});


Template.m1a27_2.events({

	"click .pagination": function (evt) {
		$.k2l.m1a27_2.draggedElement = {};
		$.k2l.m1a27_2.counter = 0;
	},

	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m1a27_Correct');
		var scoreIncorrect = Session.get('m1a27_Incorrect');

		if ($('#target1').children().attr('data-answer') != 'helpful') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().attr('data-answer') != 'myth') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().attr('data-answer') != 'unfounded') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().attr('data-answer') != 'output') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().attr('data-answer') != 'ambitious') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m1a27_Correct', scoreCorrect);
		Session.set('m1a27_Incorrect', scoreIncorrect);

		$.k2l.m1a27_2.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m1a27_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a27_2 == 'undefined') {
		$.k2l.m1a27_2 = {};
	};

	$.k2l.m1a27_2.draggedElement = {};

	initDragDropTest("#m1a27_2");
}


Template.m1a27_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a27_3");
	}
});


Template.m1a27_3.events({

	"click .pagination": function (evt) {
		$.k2l.m1a27_3.draggedElement = {};
		$.k2l.m1a27_3.counter = 0;
	},

	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m1a27_Correct');
		var scoreIncorrect = Session.get('m1a27_Incorrect');

		if ($('#target1').children().attr('data-answer') != 'adventurous') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().attr('data-answer') != 'organised') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().attr('data-answer') != 'stereotype') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().attr('data-answer') != 'fun-loving') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().attr('data-answer') != 'awkward') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m1a27_Correct', scoreCorrect);
		Session.set('m1a27_Incorrect', scoreIncorrect);

		$.k2l.m1a27_3.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m1a27_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a27_3 == 'undefined') {
		$.k2l.m1a27_3 = {};
	};

	$.k2l.m1a27_3.draggedElement = {};

	initDragDropTest("#m1a27_3");
}


Template.m1a27_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a27_4");
	}
});


Template.m1a27_4.events({

	"click .pagination": function (evt) {
		$.k2l.m1a27_4.draggedElement = {};
		$.k2l.m1a27_4.counter = 0;
	},

	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m1a27_Correct');
		var scoreIncorrect = Session.get('m1a27_Incorrect');

		if ($('#target1').children().attr('data-answer') != 'serious') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().attr('data-answer') != 'typical') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().attr('data-answer') != 'brash') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().attr('data-answer') != 'exaggerate') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().attr('data-answer') != 'kind') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m1a27_Correct', scoreCorrect);
		Session.set('m1a27_Incorrect', scoreIncorrect);

		$.k2l.m1a27_4.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		var score = Session.get('m1a27_Correct') + " out of 20";
		if (Session.get('m1a27_Incorrect') < 8) {
			if (Session.get('m1a27_Correct') >= 15) {
				Meteor.call('setGameAccess', Meteor.userId(), "1", score, true);
			}
			$("#m1a27_good").removeClass('hidden');
			Session.set("activeSection", "#m1a27_good");
		} else {
			if (Session.get('m1a27_Correct') < 15) {
				Meteor.call('setGameAccess', Meteor.userId(), "1", score, false);
			}
			$("#m1a27_bad").removeClass('hidden');
			Session.set("activeSection", "#m1a27_bad");
		}
		// $(parentSection).next('section').removeClass('hidden');// reveal next page.
		// document.location.hash = $(parentSection).next('section').attr('id');
		// Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));

	}

});

Template.m1a27_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a27_4 == 'undefined') {
		$.k2l.m1a27_4 = {};
	};

	$.k2l.m1a27_4.draggedElement = {};

	initDragDropTest("#m1a27_4");
}


Template.m1a27_scores.onRendered(function () {

})

Template.m1a27_scores.events({
	"click .restart": function (evt) {
		//	$.k2l.m1a27_1.draggedElement = {};
		// var correct = Session.get('m1a27_Correct');

		// if (correct >= 15){
		// 	Meteor.call('setGameAccess', Meteor.userId(), "1", true);
		// }}
		// } else {
		// 	Meteor.call('setGameAccess', Meteor.userId(), "1", false);			
		// }
		Session.set('m1a27_Correct', 0);
		Session.set('m1a27_Incorrect', 0);
		forceReload();
	}
})

