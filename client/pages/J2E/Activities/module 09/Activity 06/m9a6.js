Template.m9a6.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m9a6_end') {
			return false;
		}
		return true;
	}
});

Template.m9a6.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(9, 6);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(9, 6, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m9a6.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 9, 6, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m9a6.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m9a6_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a6_4");
	}
});

Template.m9a6_4.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m9a6_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m9a6_4.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m9a6_4.sound.src = {};
	}

});

Template.m9a6_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m9a6_4 == 'undefined') {
		$.k2l.m9a6_4 = {};
	};

	$.k2l.m9a6_4.sound = new Audio();
}


Template.m9a6_7.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a6_7");
	}
});

Template.m9a6_7.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m9a6_7 == 'undefined') {
		$.k2l.m9a6_7 = {};
	};

	var dragDropAmount = 2;
	var selector = "#m9a6_7";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m9a6_7",
		nextPage: "#m9a6_8",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m9a6_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a6_2");
	}
});

Template.m9a6_2.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m9a6_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m9a6_2.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m9a6_2.sound.src = {};
	}

});

Template.m9a6_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m9a6_2 == 'undefined') {
		$.k2l.m9a6_2 = {};
	};

	$.k2l.m9a6_2.sound = new Audio();
}


Template.m9a6_5.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a6_5");
	}
});

Template.m9a6_5.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m9a6_5.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m9a6_5.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m9a6_5.sound.src = {};
	}

});

Template.m9a6_5.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m9a6_5 == 'undefined') {
		$.k2l.m9a6_5 = {};
	};

	$.k2l.m9a6_5.sound = new Audio();
}


Template.m9a6_8.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a6_8");
	}
});


Template.m9a6_8.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m9a6_8 == 'undefined') {
		$.k2l.m9a6_8 = {};
	};

	var dragDropAmount = 2;
	var selector = "#m9a6_8";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m9a6_8",
		nextPage: "#m9a6_9",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m9a6_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a6_1");
	}
});

Template.m9a6_1.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m9a6_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m9a6_1.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m9a6_1.sound.src = {};
	}

});

Template.m9a6_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m9a6_1 == 'undefined') {
		$.k2l.m9a6_1 = {};
	};

	$.k2l.m9a6_1.sound = new Audio();
}


Template.m9a6_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a6_3");
	}
});

Template.m9a6_3.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m9a6_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m9a6_3.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m9a6_3.sound.src = {};
	}

});

Template.m9a6_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m9a6_3 == 'undefined') {
		$.k2l.m9a6_3 = {};
	};

	$.k2l.m9a6_3.sound = new Audio();
}


Template.m9a6_9.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a6_9");
	}
});

Template.m9a6_9.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m9a6_9 == 'undefined') {
		$.k2l.m9a6_9 = {};
	};

	var dragDropAmount = 2;
	var selector = "#m9a6_9";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m9a6_9",
		nextPage: "#m9a6_10",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m9a6_6.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a6_6");
	}
});

Template.m9a6_6.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m9a6_6.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m9a6_6.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m9a6_6.sound.src = {};
	}

});

Template.m9a6_6.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m9a6_6 == 'undefined') {
		$.k2l.m9a6_6 = {};
	};

	$.k2l.m9a6_6.sound = new Audio();
}

Template.m9a6_10.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a6_10");
	}
});

Template.m9a6_10.events({

});

Template.m9a6_10.rendered = function () {
}
