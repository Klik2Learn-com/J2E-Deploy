Template.m9a17.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m9a17_end') {
			return false;
		}
		return true;
	}
});

Template.m9a17.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(9, 17);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(9, 17, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m9a17.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 9, 17, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m9a17.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m9a17_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a17_1");
	}
});

Template.m9a17_1.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m9a17_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m9a17_1.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m9a17_1.sound.src = {};
	}

});

Template.m9a17_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m9a17_1 == 'undefined') {
		$.k2l.m9a17_1 = {};
	};

	$.k2l.m9a17_1.sound = new Audio();
}


Template.m9a17_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a17_2");
	}
});

Template.m9a17_2.events({
	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m9a17_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m9a17_2.sound, $(evt.currentTarget));
	},

	"click .pagination": function (evt) {
		$.k2l.m9a17_2.sound.src = {};
	}
});

Template.m9a17_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m9a17_2 == 'undefined') {
		$.k2l.m9a17_2 = {};
	};

	$.k2l.m9a17_2.sound = new Audio();
	var dragDropAmount = 13;
	var selector = "#m9a17_2";
	var options = {
		multiAns: true,
		autoNav : false,
		currPage: "#m9a17_2",
		nextPage: "#m9a17_3",
	};
	initDragDrop(selector, dragDropAmount, options);
}
