Template.m3a14_1.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a14_1");
	}
})

Template.m3a14_1.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m3a14_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a14_1.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m3a14_1.sound.src = {};
	}

});

Template.m3a14_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a14_1 == 'undefined') {
		$.k2l.m3a14_1 = {};
	};

	$.k2l.m3a14_1.sound = new Audio();
}

Template.m3a14_2.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a14_2");
	}
})

Template.m3a14_2.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m3a14_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a14_2.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m3a14_2.sound.src = {};
	}

});

Template.m3a14_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a14_2 == 'undefined') {
		$.k2l.m3a14_2 = {};
	};

	$.k2l.m3a14_2.sound = new Audio();
}

Template.m3a14_3.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a14_3");
	}
})

Template.m3a14_3.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m3a14_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a14_3.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m3a14_3.sound.src = {};
	}

});

Template.m3a14_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a14_3 == 'undefined') {
		$.k2l.m3a14_3 = {};
	};

	$.k2l.m3a14_3.sound = new Audio();
}

Template.m3a14_4.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a14_4");
	}
})

Template.m3a14_4.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m3a14_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a14_4.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m3a14_4.sound.src = {};
	}

});

Template.m3a14_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a14_4 == 'undefined') {
		$.k2l.m3a14_4 = {};
	};

	$.k2l.m3a14_4.sound = new Audio();
}

Template.m3a14.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m3a14_end') {
			return false;
		} return true;
	}
});

Template.m3a14.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(3, 14);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(3, 14, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m3a14.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 3, 14, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m3a14.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


Template.m3a14_7.rendered = function () {

	// Add drag and drop
	var dragDropAmount = 13;
	var selector = "#m3a14_7";
	var options = {
		multiAns: false,
		autoNav: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m3a14_7.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a14_7");
	}

});


