Template.m10a28.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m10a28_end') {
			return false;
		}
		return true;
	},
	gameAccess: function () {
		var userid = Meteor.userId();
		var passed = gameAccess.find({ "user": userid, "module": "10", "passedTest": true }).count();
		if (passed >= 1) {
			return true;
		} else {
			return false;
		}
	}
});

Template.m10a28.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(10, 28);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(10, 28, subpage);
			oldLocation = location.href;
		}
	}, 500);

	Session.set('m10a28_CorrectScore', 0);
	Session.set('m10a28_IncorrectScore', 0);

}

Template.m10a28.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 10, 28, Meteor.userId());
	this.subscribe('gameAccess');
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m10a28.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


Template.vocab.rendered = function () {


}

Template.m10a28_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a28_2");
	}
});

Template.m10a28_2.events({
	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m10a28_CorrectScore');
		var scoreIncorrect = Session.get('m10a28_IncorrectScore');

		if ($('#target1').children().html() != 'evidence') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'aspire') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'wisdom') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'admiration') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().html() != 'drinker') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m10a28_CorrectScore', scoreCorrect);
		Session.set('m10a28_IncorrectScore', scoreIncorrect);

		$.k2l.m10a28_2.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m10a28_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m10a28_2 == 'undefined') {
		$.k2l.m10a28_2 = {};
	};
	
	var selector = "#m10a28_2";
	initDragDropTest(selector);
}


Template.m10a28_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a28_1"); 
	} 
});

Template.m10a28_1.events({

	"click #submitButton": function(evt){
		var scoreCorrect = Session.get('m10a28_CorrectScore');
		var scoreIncorrect = Session.get('m10a28_IncorrectScore');

		var answers = ['skill', 'irritable', 'strive', 'to axe something', 'crisis'];

		for(var i = 1; i <= answers.length; i++){
			if ($('#target'+ i.toString()).children().html() != answers[i-1]){			
				scoreIncorrect++;
				//('incorrect ' + scoreIncorrect);
			} else {			
				scoreCorrect++;
				//console.log('correct ' + scoreCorrect);
			}	
		}
		//console.log('correct ' + scoreCorrect);

		Session.set('m10a28_CorrectScore', scoreCorrect);
		Session.set('m10a28_IncorrectScore', scoreIncorrect);
		
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
			
	}
	
});
 
Template.m10a28_1.rendered = function(){
	var selector = "#m10a28_1";
	initDragDropTest(selector);
}

Template.m10a28_4.events({

	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('m10a28_CorrectScore');
		var scoreIncorrect = Session.get('m10a28_IncorrectScore');

		if ($('#target1').children().html() != 'productive') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'potential') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'impact') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'disappointment') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().html() != 'sparkles') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m10a28_CorrectScore', scoreCorrect);
		Session.set('m10a28_IncorrectScore', scoreIncorrect);
		
				var parentSection = $(evt.currentTarget).parents('section');
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
			
	}

});

Template.m10a28_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m10a28_4 == 'undefined') {
		$.k2l.m10a28_4 = {};
	};
	
	var selector = "#m10a28_4";
	initDragDropTest(selector);
}

Template.m10a28_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a28_4"); 
	} 
}); 

Template.m10a28_5.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a28_5");
	}
});

Template.m10a28_5.events({
	
	"click #submitButton": function(evt){
		var scoreCorrect = Session.get('m10a28_CorrectScore');
		var scoreIncorrect = Session.get('m10a28_IncorrectScore');

		if ($('#target1').children().html() != 'failure') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'fun') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'contrast') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'obesity') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().html() != 'Paediatrician') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m10a28_CorrectScore', scoreCorrect);
		Session.set('m10a28_IncorrectScore', scoreIncorrect);

		$.k2l.m10a28_5.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m10a28_5.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m10a28_5 == 'undefined') {
		$.k2l.m10a28_5 = {};
	};
	
	var selector = "#m10a28_5";
	initDragDropTest(selector);
}


Template.m10a28_6.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a28_6");
	}
});

Template.m10a28_6.events({
	
	"click #submitButton": function(evt){
		var scoreCorrect = Session.get('m10a28_CorrectScore');
		var scoreIncorrect = Session.get('m10a28_IncorrectScore');

		if ($('#target1').children().html() != 'tolerance') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'trouble') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'soars') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'surprise') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().html() != 'mistake') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m10a28_CorrectScore', scoreCorrect);
		Session.set('m10a28_IncorrectScore', scoreIncorrect);

		$.k2l.m10a28_6.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	}

});

Template.m10a28_6.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m10a28_6 == 'undefined') {
		$.k2l.m10a28_6 = {};
	};
	
	var selector = "#m10a28_6";
	initDragDropTest(selector);
}


Template.m10a28_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a28_3");
	}
});

Template.m10a28_3.events({
	"click #submitButton": function(evt){
		var scoreCorrect = Session.get('m10a28_CorrectScore');
		var scoreIncorrect = Session.get('m10a28_IncorrectScore');

		if ($('#target1').children().html() != 'excitement') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'pride') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'improvement') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'commitment') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target5').children().html() != 'compensate') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m10a28_CorrectScore', scoreCorrect);
		Session.set('m10a28_IncorrectScore', scoreIncorrect);
		
				var parentSection = $(evt.currentTarget).parents('section');
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
			
	}

});

Template.m10a28_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m10a28_3 == 'undefined') {
		$.k2l.m10a28_3 = {};
	};
	
	var selector = "#m10a28_3";
	initDragDropTest(selector);
}


Template.m10a28_7.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a28_7");
	}
});


Template.m10a28_7.events({
	"click #submitButton": function(evt){
		var scoreCorrect = Session.get('m10a28_CorrectScore');
		var scoreIncorrect = Session.get('m10a28_IncorrectScore');

		if ($('#target1').children().html() != 'smoker') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target2').children().html() != 'wealth') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target3').children().html() != 'quantity') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		if ($('#target4').children().html() != 'rain') {
			scoreIncorrect++;
		} else {
			scoreCorrect++;
		}

		Session.set('m10a28_CorrectScore', scoreCorrect);
		Session.set('m10a28_IncorrectScore', scoreIncorrect);

		$.k2l.m10a28_7.draggedElement = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		var score = Session.get('m10a28_CorrectScore') + " out of 34"
		if (Session.get('m10a28_IncorrectScore') < 8) {
			if (Session.get('m10a28_CorrectScore') >= 25) {
				Meteor.call('setGameAccess', Meteor.userId(), "10", score, true);
			}
			$("#m10a28_good").removeClass('hidden');
			Session.set("activeSection", "#m10a28_good");
		} else {
			if (Session.get('m10a28_CorrectScore') < 25) {
				Meteor.call('setGameAccess', Meteor.userId(), "10", score, false);
			}
			$("#m10a28_bad").removeClass('hidden');
			Session.set("activeSection", "#m10a28_bad");
		}

	}

});

Template.m10a28_7.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m10a28_7 == 'undefined') {
		$.k2l.m10a28_7 = {};
	};
	
	var selector = "#m10a28_7";
	initDragDropTest(selector);
}


Template.m10a28_8.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m10a28_8");
	}
});


Template.m10a28_8.events({

	"click .restart": function (evt) {
		Session.set('m10a28_CorrectScore', 0);
		Session.set('m10a28_IncorrectScore', 0);
		Session.set("activeSection", "#m10a28_1");
		// $('#SGscoresCorrectScore').html(Session.get('SGscoresCorrectScore'));
		// $('#SGscoresIncorrectScore').html(Session.get('SGscoresIncorrectScore'));
		// $.k2l.SGscores_1.allowClick = true;
		forceReload();
	}
});
