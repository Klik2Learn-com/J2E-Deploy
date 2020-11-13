Template.m10a4.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m10a4_end') {
			return false;
		}
		return true;
	}
});

Template.m10a4.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(10, 4);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(10, 4, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m10a4.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 10, 4, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m10a4.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


Template.m10a4_5.events({
	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m10a4_5.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m10a4_5.sound, $(evt.currentTarget));
	},

});

Template.m10a4_5.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m10a4_5 == 'undefined') {
		$.k2l.m10a4_5 = {};
	};

	$.k2l.m10a4_5.sound = new Audio();

	var dragDropAmount = 8;
	var selector = "#m10a4_5";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m10a4_5",
		nextPage: "#m10a4_6",
		currAudio: $.k2l.m10a4_5.sound
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m10a4_11.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a4_11");
	}
});

Template.m10a4_11.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m10a4_11.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m10a4_11.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m10a4_11.sound.src = {};
	}

});

Template.m10a4_11.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m10a4_11 == 'undefined') {
		$.k2l.m10a4_11 = {};
	};

	$.k2l.m10a4_11.sound = new Audio();
}

Template.m10a4_8.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a4_8");
	}
});

Template.m10a4_8.events({
	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m10a4_8.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m10a4_8.sound, $(evt.currentTarget));
	},
});

Template.m10a4_8.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m10a4_8 == 'undefined') {
		$.k2l.m10a4_8 = {};
	};

	$.k2l.m10a4_8.sound = new Audio();

	var dragDropAmount = 7;
	var selector = "#m10a4_8";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m10a4_8",
		nextPage: "#m10a4_9",
		currAudio: $.k2l.m10a4_8.sound
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m10a4_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a4_1");
	}
});

Template.m10a4_1.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m10a4_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m10a4_1.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m10a4_1.sound.src = {};
	}

});

Template.m10a4_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m10a4_1 == 'undefined') {
		$.k2l.m10a4_1 = {};
	};

	$.k2l.m10a4_1.sound = new Audio();
}

Template.m10a4_9.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a4_9");
	}
});

Template.m10a4_9.events({
	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m10a4_9.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m10a4_9.sound, $(evt.currentTarget));
	}
});

Template.m10a4_9.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m10a4_9 == 'undefined') {
		$.k2l.m10a4_9 = {};
	};

	$.k2l.m10a4_9.sound = new Audio();

	var dragDropAmount = 5;
	var selector = "#m10a4_9";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m10a4_9",
		nextPage: "#m10a4_10",
		currAudio: $.k2l.m10a4_9.sound
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m10a4_2.events({
	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m10a4_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m10a4_2.sound, $(evt.currentTarget));
	},
});

Template.m10a4_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m10a4_2 == 'undefined') {
		$.k2l.m10a4_2 = {};
	};

	$.k2l.m10a4_2.sound = new Audio();

	var dragDropAmount = 7;
	var selector = "#m10a4_2";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m10a4_2",
		nextPage: "#m10a4_3",
		currAudio: $.k2l.m10a4_2.sound
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a4_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a4_2");
	}
});

Template.m10a4_6.events({
	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m10a4_6.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m10a4_6.sound, $(evt.currentTarget));
	},
});

Template.m10a4_6.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m10a4_6 == 'undefined') {
		$.k2l.m10a4_6 = {};
	};
	$.k2l.m10a4_6.sound = new Audio();

	var dragDropAmount = 5;
	var selector = "#m10a4_6";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m10a4_6",
		nextPage: "#m10a4_7",
		currAudio: $.k2l.m10a4_6.sound
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a4_6.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a4_6");
	}
});

Template.m10a4_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a4_4");
	}
});

Template.m10a4_4.events({
	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m10a4_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m10a4_4.sound, $(evt.currentTarget));
	},
});

Template.m10a4_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m10a4_4 == 'undefined') {
		$.k2l.m10a4_4 = {};
	};

	$.k2l.m10a4_4.sound = new Audio();

	var dragDropAmount = 5;
	var selector = "#m10a4_4";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m10a4_4",
		nextPage: "#m10a4_5",
		currAudio: $.k2l.m10a4_4.sound
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a4_5.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a4_5");
	}
});

Template.m10a4_7.events({
	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m10a4_7.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m10a4_7.sound, $(evt.currentTarget));
	}
});

Template.m10a4_7.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m10a4_7 == 'undefined') {
		$.k2l.m10a4_7 = {};
	};
	$.k2l.m10a4_7.sound = new Audio();

	var dragDropAmount = 3;
	var selector = "#m10a4_7";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m10a4_7",
		nextPage: "#m10a4_8",
		currAudio: $.k2l.m10a4_7.sound
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a4_7.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a4_7");
	}
});

Template.m10a4_3.events({
	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m10a4_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m10a4_3.sound, $(evt.currentTarget));
	},
});

Template.m10a4_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m10a4_3 == 'undefined') {
		$.k2l.m10a4_3 = {};
	};

	$.k2l.m10a4_3.sound = new Audio();
	var dragDropAmount = 5;
	var selector = "#m10a4_3";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m10a4_3",
		nextPage: "#m10a4_4",
		currAudio: $.k2l.m10a4_3.sound
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a4_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a4_3");
	}
});

Template.m10a4_10.events({
	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m10a4_10.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m10a4_10.sound, $(evt.currentTarget));
	},

});

Template.m10a4_10.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m10a4_10 == 'undefined') {
		$.k2l.m10a4_10 = {};
	};

	$.k2l.m10a4_10.draggedElement = {};
	$.k2l.m10a4_10.counter = 0;
	$.k2l.m10a4_10.sound = new Audio();

	var dragDropAmount = 6;
	var selector = "#m10a4_10";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m10a4_10",
		nextPage: "#m10a4_11",
		currAudio: $.k2l.m10a4_10.sound
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a4_10.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a4_10");
	}
});

