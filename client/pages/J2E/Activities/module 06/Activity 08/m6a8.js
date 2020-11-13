Template.m6a8.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m6a8_end') {
			return false;
		} return true;
	}
});


Template.m6a8.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(6, 8);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(6, 8, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m6a8.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 6, 8, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m6a8.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m6a8_7.events({
	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m6a8_7.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m6a8_7.sound, $(evt.currentTarget));
	},

	"click .pagination": function (evt) {
		$.k2l.m6a8_7.sound.src = {};
	}
});

Template.m6a8_7.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m6a8_7 == 'undefined') {
		$.k2l.m6a8_7 = {};
	};

	$.k2l.m6a8_7.sound = new Audio();
	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m6a8_7";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m6a8_7",
		nextPage: "#m6a8_8",
		currAudio: $.k2l.m6a8_7.sound
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m6a8_8.events({
	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m6a8_8.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m6a8_8.sound, $(evt.currentTarget));
	},

	"click .pagination": function (evt) {
		$.k2l.m6a8_8.sound.src = {};
	}
});

Template.m6a8_8.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m6a8_8 == 'undefined') {
		$.k2l.m6a8_8 = {};
	};

	$.k2l.m6a8_8.sound = new Audio();
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m6a8_8";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m6a8_8",
		nextPage: "#m6a8_end",
		currAudio: $.k2l.m6a8_8.sound
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m6a8_7.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a8_7");
	}
});

Template.m6a8_8.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a8_8");
	}
});