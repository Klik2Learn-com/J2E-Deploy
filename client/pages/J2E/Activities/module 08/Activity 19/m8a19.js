Template.m8a19.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m8a19_end') {
			return false;
		}
		return true;
	}
});

Template.m8a19.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(8, 19);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 19, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m8a19.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 19, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a19.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m8a19_6.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a19_6");
	}
});

Template.m8a19_6.events({
	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m8a19_6.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a19_6.sound, $(evt.currentTarget));
	}
});

Template.m8a19_6.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a19_6 == 'undefined') {
		$.k2l.m8a19_6 = {};
	};

	$.k2l.m8a19_6.sound = new Audio();
	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m8a19_6";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a19_6",
		nextPage: "#m8a19_7",
		currAudio: $.k2l.m8a19_6.sound
	};
	initDragDrop(selector, dragDropAmount, options);
};

Template.m8a19_7.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a19_7");
	}
});

Template.m8a19_7.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m8a19_7.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a19_7.sound, $(evt.currentTarget));
	},
});

Template.m8a19_7.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a19_7 == 'undefined') {
		$.k2l.m8a19_7 = {};
	};

	$.k2l.m8a19_7.sound = new Audio();
	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m8a19_7";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a19_7",
		nextPage: "#m8a19_8",
		currAudio: $.k2l.m8a19_7.sound
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m8a19_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a19_2");
	}
});

Template.m8a19_2.events({
	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m8a19_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a19_2.sound, $(evt.currentTarget));
	},
});

Template.m8a19_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a19_2 == 'undefined') {
		$.k2l.m8a19_2 = {};
	};

	$.k2l.m8a19_2.sound = new Audio();
	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m8a19_2";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a19_2",
		nextPage: "#m8a19_3",
		currAudio: $.k2l.m8a19_2.sound
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m8a19_5.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a19_5");
	}
});

Template.m8a19_5.events({
	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m8a19_5.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a19_5.sound, $(evt.currentTarget));
	},
});

Template.m8a19_5.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a19_5 == 'undefined') {
		$.k2l.m8a19_5 = {};
	};

	$.k2l.m8a19_5.sound = new Audio();
	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m8a19_5";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a19_5",
		nextPage: "#m8a19_6",
		currAudio: $.k2l.m8a19_5.sound
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m8a19_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a19_1");
	}
});

Template.m8a19_1.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m8a19_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a19_1.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m8a19_1.sound.src = {};
	}

});

Template.m8a19_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a19_1 == 'undefined') {
		$.k2l.m8a19_1 = {};
	};

	$.k2l.m8a19_1.sound = new Audio();
}

Template.m8a19_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a19_3");
	}
});

Template.m8a19_3.events({
	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m8a19_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a19_3.sound, $(evt.currentTarget));
	},
});

Template.m8a19_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a19_3 == 'undefined') {
		$.k2l.m8a19_3 = {};
	};

	$.k2l.m8a19_3.sound = new Audio();
	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m8a19_3";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a19_3",
		nextPage: "#m8a19_4",
		currAudio: $.k2l.m8a19_3.sound
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m8a19_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a19_4");
	}
});

Template.m8a19_4.events({
	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m8a19_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a19_4.sound, $(evt.currentTarget));
	},
});

Template.m8a19_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a19_4 == 'undefined') {
		$.k2l.m8a19_4 = {};
	};

	$.k2l.m8a19_4.sound = new Audio();
	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m8a19_4";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a19_4",
		nextPage: "#m8a19_5",
		currAudio: $.k2l.m8a19_4.sound
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m8a19_8.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a19_8");
	}
});

Template.m8a19_8.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m8a19_8.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a19_8.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m8a19_8.sound.src = {};
	}

});

Template.m8a19_8.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a19_8 == 'undefined') {
		$.k2l.m8a19_8 = {};
	};

	$.k2l.m8a19_8.sound = new Audio();
}
