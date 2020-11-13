Template.m2Game.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(2, 29);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 29, subpage);
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

};

Template.m2Game.events({

	'click .game-begin': function (evt) {

		Session.set("activeSection", "#m2Game_1");
	},

	'click .roadsign': function (evt) {
		Session.set('Easy_Correct', 0);
		Session.set('Easy_Incorrect', 0);
	},

	'click .roadsign-left': function (evt) {
		Session.set('Easy_Correct', 0);
		Session.set('Easy_Incorrect', 0);
	}
});

Template.m2Game.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 29, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m2Game.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

