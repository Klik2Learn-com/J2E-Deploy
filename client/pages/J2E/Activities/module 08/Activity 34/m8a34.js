Template.m8a34.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m8a34_end') {
			return false;
		}
		return true;
	},
	gameAccess: function () {
		var userid = Meteor.userId();
		var passed = gameAccess.find({ "user": userid, "module": "8", "passedTest": true }).count();
		if (passed >= 1) {
			return true;
		} else {
			return false;
		}
	}
});

Template.m8a34.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(8, 34);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 34, subpage);
			oldLocation = location.href;
		}
	}, 500);

	Session.set('m8a34_Correct', 0);
	Session.set('m8a34_Incorrect', 0);

}

Template.m8a34.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 34, Meteor.userId());
	this.subscribe('gameAccess');
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a34.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m8a34_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a34_1");
	}
});

Template.m8a34_1.events({
	"click #submitButton": function(evt){
		var scoreCorrect = Session.get('m8a34_Correct');
		var scoreIncorrect = Session.get('m8a34_Incorrect');

		if ($('#target1').children().html() != 'raven') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'administration') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'intensive') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'conforming') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().html() != 'compensation') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m8a34_Correct', scoreCorrect);
		Session.set('m8a34_Incorrect', scoreIncorrect);

		$.k2l.m8a34_1.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m8a34_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a34_1 == 'undefined') {
		$.k2l.m8a34_1 = {};
	};
	
	var selector = "#m8a34_1";
	initDragDropTest(selector);
}

Template.m8a34_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a34_3");
	}
});

Template.m8a34_3.events({
	"click #submitButton": function(evt){
		var scoreCorrect = Session.get('m8a34_Correct');
		var scoreIncorrect = Session.get('m8a34_Incorrect');

		if ($('#target1').children().html() != 'decorator') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'significant') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'dramatically') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'cell') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().html() != 'impose') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m8a34_Correct', scoreCorrect);
		Session.set('m8a34_Incorrect', scoreIncorrect);

		$.k2l.m8a34_3.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m8a34_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a34_3 == 'undefined') {
		$.k2l.m8a34_3 = {};
	};
	
	var selector = "#m8a34_3";
	initDragDropTest(selector);
}

Template.m8a34_8.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a34_8");
	}
});

Template.m8a34_8.events({
	"click #submitButton": function(evt){
		var scoreCorrect = Session.get('m8a34_Correct');
		var scoreIncorrect = Session.get('m8a34_Incorrect');

		if ($('#target1').children().html() != 'tumbles') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'cardiovascular') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'balloons') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'professional') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().html() != 'strategic') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m8a34_Correct', scoreCorrect);
		Session.set('m8a34_Incorrect', scoreIncorrect);

		$.k2l.m8a34_8.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m8a34_8.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a34_8 == 'undefined') {
		$.k2l.m8a34_8 = {};
	};
	
	var selector = "#m8a34_8";
	initDragDropTest(selector);
}

Template.m8a34_6.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a34_6");
	}
});

Template.m8a34_6.events({
	"click #submitButton": function(evt){
		var scoreCorrect = Session.get('m8a34_Correct');
		var scoreIncorrect = Session.get('m8a34_Incorrect');

		if ($('#target1').children().html() != 'plumber') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'flourishes') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'impact') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'labourer') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().html() != 'commercial') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m8a34_Correct', scoreCorrect);
		Session.set('m8a34_Incorrect', scoreIncorrect);

		$.k2l.m8a34_6.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m8a34_6.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a34_6 == 'undefined') {
		$.k2l.m8a34_6 = {};
	};
	
	var selector = "#m8a34_6";
	initDragDropTest(selector);
}

Template.m8a34_10.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a34_10");
	}
});
Template.m8a34_10.events({
	"click #submitButton": function(evt){
		var scoreCorrect = Session.get('m8a34_Correct');
		var scoreIncorrect = Session.get('m8a34_Incorrect');

		if ($('#target1').children().html() != 'architect') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'carpenter') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'confident') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'joiner') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m8a34_Correct', scoreCorrect);
		Session.set('m8a34_Incorrect', scoreIncorrect);

		$.k2l.m8a34_10.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		var score = Session.get('m8a34_Correct') + " out of 49"
		if (Session.get('m8a34_Incorrect') < 12) {
			if (Session.get('m8a34_Correct') >= 37) {
				Meteor.call('setGameAccess', Meteor.userId(), "8", score, true);
			}
			$("#m8a34_good").removeClass('hidden');
			Session.set("activeSection", "#m8a34_good");
		} else {
			if (Session.get('m8a34_Correct') < 37) {
				Meteor.call('setGameAccess', Meteor.userId(), "8", score, false);
			}
			$("#m8a34_bad").removeClass('hidden');
			Session.set("activeSection", "#m8a34_bad");
		}

	}

});

Template.m8a34_10.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a34_10 == 'undefined') {
		$.k2l.m8a34_10 = {};
	};
	
	var selector = "#m8a34_10";
	initDragDropTest(selector);
}

Template.m8a34_9.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a34_9");
	}
});

Template.m8a34_9.events({
	
	"click #submitButton": function(evt){
		var scoreCorrect = Session.get('m8a34_Correct');
		var scoreIncorrect = Session.get('m8a34_Incorrect');

		if ($('#target1').children().html() != 'agreeable') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'surveillance') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'whinge') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'sue') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().html() != 'catering') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m8a34_Correct', scoreCorrect);
		Session.set('m8a34_Incorrect', scoreIncorrect);

		$.k2l.m8a34_9.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m8a34_9.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a34_9 == 'undefined') {
		$.k2l.m8a34_9 = {};
	};
	
	var selector = "#m8a34_9";
	initDragDropTest(selector);
}

Template.m8a34_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a34_2");
	}
});

Template.m8a34_2.events({
	"click #submitButton": function(evt){
		var scoreCorrect = Session.get('m8a34_Correct');
		var scoreIncorrect = Session.get('m8a34_Incorrect');

		if ($('#target1').children().html() != 'peculiar') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'environmental') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'creative') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'fundamental') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().html() != 'boost') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m8a34_Correct', scoreCorrect);
		Session.set('m8a34_Incorrect', scoreIncorrect);

		$.k2l.m8a34_2.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m8a34_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a34_2 == 'undefined') {
		$.k2l.m8a34_2 = {};
	};
	
	var selector = "#m8a34_2";
	initDragDropTest(selector);
}

Template.m8a34_7.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a34_7");
	}
});

Template.m8a34_7.events({
	
	"click #submitButton": function(evt){
		var scoreCorrect = Session.get('m8a34_Correct');
		var scoreIncorrect = Session.get('m8a34_Incorrect');

		if ($('#target1').children().html() != 'introvert') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'conventional') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'diabetes') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'sensitive') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().html() != 'innovation') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m8a34_Correct', scoreCorrect);
		Session.set('m8a34_Incorrect', scoreIncorrect);

		$.k2l.m8a34_7.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m8a34_7.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a34_7 == 'undefined') {
		$.k2l.m8a34_7 = {};
	};
	
	var selector = "#m8a34_7";
	initDragDropTest(selector);
}

Template.m8a34_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a34_4");
	}
});

Template.m8a34_4.events({
	"click #submitButton": function(evt){
		var scoreCorrect = Session.get('m8a34_Correct');
		var scoreIncorrect = Session.get('m8a34_Incorrect');

		if ($('#target1').children().html() != 'extrovert') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'stem cells') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'era') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'surveyor') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().html() != 'vital') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m8a34_Correct', scoreCorrect);
		Session.set('m8a34_Incorrect', scoreIncorrect);

		$.k2l.m8a34_4.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m8a34_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a34_4 == 'undefined') {
		$.k2l.m8a34_4 = {};
	};
	
	var selector = "#m8a34_4";
	initDragDropTest(selector);
}

Template.m8a34_5.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a34_5");
	}
});

Template.m8a34_5.events({
	"click #submitButton": function(evt){
		var scoreCorrect = Session.get('m8a34_Correct');
		var scoreIncorrect = Session.get('m8a34_Incorrect');

		if ($('#target1').children().html() != 'automated') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'sector') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'renewable') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'astonishing') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().html() != 'blurred') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m8a34_Correct', scoreCorrect);
		Session.set('m8a34_Incorrect', scoreIncorrect);

		$.k2l.m8a34_5.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m8a34_5.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a34_5 == 'undefined') {
		$.k2l.m8a34_5 = {};
	};
	
	var selector = "#m8a34_5";
	initDragDropTest(selector);
}

Template.m8a34_11.events({

	"click .restart": function (evt) {
		if (typeof $.k2l != 'undefined') {
			if (typeof $.k2l.m8a34_1 != 'undefined') {
				if (typeof $.k2l.m8a34_1.index != 'undefined') {
					$.k2l.m8a34_1.index = 0;
				}
				if (typeof $.k2l.m8a34_1.Correct != 'undefined') {
					$.k2l.m8a34_1.Correct = 0;
				}
				if (typeof $.k2l.m8a34_1.Incorrect != 'undefined') {
					$.k2l.m8a34_1.Incorrect = 0;
				}
			}
		}
		Session.set('m8a34_Correct', 0);
		Session.set('m8a34_Incorrect', 0);
		// $('#m8a34Correct').html(Session.get('m8a34Correct'));
		// $('#m8a34Incorrect').html(Session.get('m8a34Incorrect'));
		//$.k2l.m8a34_1.allowClick = true;
		Session.set("activeSection", "#m8a34_1");
		forceReload();
	}
});
