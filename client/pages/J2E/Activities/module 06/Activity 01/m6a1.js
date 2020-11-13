Template.m6a1.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m6a1_end') {
			return false;
		}
		return true;
	},

	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m6a1");
	}
})

Template.m6a1.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m6a1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m6a1.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m6a1.sound.src = {};
		$(".buttonaudio").removeClass("is-playing");
	}

});

Template.m6a1.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(6, 1);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(6, 1, subpage);
			oldLocation = location.href;
		}
	}, 500);

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m6a1 == 'undefined') {
		$.k2l.m6a1 = {};
	};

	$.k2l.m6a1.sound = new Audio();
}

Template.m6a1.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 6, 1, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m6a1.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m6a1_1.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m6a1_1";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}