Template.m1Game.helpers({

	hardpath: function () {
		var path = Session.get('hardpath');
		if (path == true) {
			return true;
		} else {
			return false;
		}
	}

});

Template.m1Game.rendered = function () {

	document.title = "Journey 2 English";
	
	setStartActivity(1, 28);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(1, 28, subpage);
			oldLocation = location.href;
		}
	}, 500);

	$('footer').removeClass('invisible');

	if (Session.get('Easy_Correct') == undefined) {
		Session.set('Easy_Correct', 0);
	};
	if (Session.get('Easy_Incorrect') == undefined) {
		Session.set('Easy_Incorrect', 0);
	};
	if (Session.get('Hard_Correct') == undefined) {
		Session.set('Hard_Correct', 0);
	};
	if (Session.get('Hard_Incorrect') == undefined) {
		Session.set('Hard_Incorrect', 0);
	};

};

Template.m1Game.events({

	'click .game-begin': function (evt) {

		Session.set("activeSection", "#m1Game_intro");
	},

	'click .roadsign': function (evt) {
		Session.set('Easy_Correct', 0);
		Session.set('Easy_Incorrect', 0);
		Session.set('Hard_Correct', 0);
		Session.set('Hard_Incorrect', 0);
		Session.set('hardpath', false);
	},

	'click .roadsign-left': function (evt) {
		Session.set('Easy_Correct', 0);
		Session.set('Easy_Incorrect', 0);
		Session.set('Hard_Correct', 0);
		Session.set('Hard_Incorrect', 0);
		Session.set('hardpath', false);
	},

	'click .start-again': function (evt) {
		Session.set('Easy_Correct', 0);
		Session.set('Easy_Incorrect', 0);
		Session.set('Hard_Correct', 0);
		Session.set('Hard_Incorrect', 0);
		Session.set('hardpath', false);
	}
});

Template.m1Game.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 1, 28, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m1Game.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

