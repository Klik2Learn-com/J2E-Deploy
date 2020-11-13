Template.m3a29.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(3, 29);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(3, 29, subpage);
			oldLocation = location.href;
		}
	}, 500);


	Session.set('m3a29_Correct', 0);
	Session.set('m3a29_Incorrect', 0);
}


Template.m3a29.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m3a29_end') {
			return false;
		} return true;
	},
	gameAccess: function () {
		var userid = Meteor.userId();
		var passed = gameAccess.find({ "user": userid, "module": "3", "passedTest": true }).count();
		if (passed >= 1) {
			return true;
		} else {
			return false;
		}
	}
});

Template.m3a29.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 3, 29, Meteor.userId());
	this.subscribe('gameAccess');
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m3a29.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m3a29_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a29_1");
	}
});


Template.m3a29_1.events({
	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m3a29_Correct');
		var scoreIncorrect = Session.get('m3a29_Incorrect');

		if ($('#target1').children().attr('data-answer') != 'unflattering') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().attr('data-answer') != 'sacrifice') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().attr('data-answer') != 'unprecedented') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().attr('data-answer') != 'nattering') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().attr('data-answer') != 'tolerance') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m3a29_Correct', scoreCorrect);
		Session.set('m3a29_Incorrect', scoreIncorrect);

		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m3a29_1.rendered = function() {
	initDragDropTest("#m3a29_1");
}


Template.m3a29_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a29_2");
	}
});


Template.m3a29_2.events({
	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m3a29_Correct');
		var scoreIncorrect = Session.get('m3a29_Incorrect');

		if ($('#target1').children().attr('data-answer') != 'option') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().attr('data-answer') != 'poll') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().attr('data-answer') != 'tagging') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().attr('data-answer') != 'tweeting') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().attr('data-answer') != 'drought') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m3a29_Correct', scoreCorrect);
		Session.set('m3a29_Incorrect', scoreIncorrect);

		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m3a29_2.rendered = function () {
	initDragDropTest("#m3a29_2");
}


Template.m3a29_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a29_3");
	}
});


Template.m3a29_3.events({
	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m3a29_Correct');
		var scoreIncorrect = Session.get('m3a29_Incorrect');

		if ($('#target1').children().attr('data-answer') != 'pervasive') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().attr('data-answer') != 'etiquette') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().attr('data-answer') != 'norm') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}


		Session.set('m3a29_Correct', scoreCorrect);
		Session.set('m3a29_Incorrect', scoreIncorrect);

		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		var score = Session.get('m3a29_Correct') + " out of 13"
		if (Session.get('m3a29_Incorrect') < 3) {
			if (Session.get('m3a29_Correct') >= 10) {
				Meteor.call('setGameAccess', Meteor.userId(), "3", score, true);
			}
			$("#m3a29_good").removeClass('hidden');
			Session.set("activeSection", "#m3a29_good");
		} else {
			if (Session.get('m3a29_Correct') < 10) {
				Meteor.call('setGameAccess', Meteor.userId(), "3", score, false);
			}
			$("#m3a29_bad").removeClass('hidden');
			Session.set("activeSection", "#m3a29_bad");
		}

	}

});

Template.m3a29_3.rendered = function () {
	initDragDropTest("#m3a29_3");
}

Template.m3a29_scores.onRendered(function () {
	// rightScore: function(){
	// return Session.get('m3a29_Correct');
	// },
	// return Session.get('m3a29_Correct');
	$('#m3a29ScoresRight').html(Session.get('m3a29_Correct'));
	$('#m3a29ScoresWrong').html(Session.get('m3a29_Incorrect'));

	// wrongScore: function() {
	// return Session.get('m3a29_Incorrect');
	// }
})

Template.m3a29_scores.events({
	"click .restart": function (evt) {
		Session.set('m3a29_Correct', 0);
		Session.set('m3a29_Incorrect', 0);
		Session.set('activeSection', "#m3a29_1");
		forceReload();
	}
})

