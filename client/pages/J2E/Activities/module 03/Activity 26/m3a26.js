Template.m3a26.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 3, 26, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m3a26.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(3, 26);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(3, 26, subpage);
			oldLocation = location.href;
		}
	}, 500);


	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a26 == 'undefined') {
		$.k2l.m3a26 = {};
	};

	$.k2l.m3a26.sound = new Audio();
}

Template.m3a26.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m3a26_end') {
			return false;
		}
		return true;
	},

	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a26");
	}
})

Template.m3a26.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m3a26.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a26.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m3a26.sound.src = {};
	}

});

Template.m3a26.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m3a26_2.rendered = function () {

	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m3a26_2";
	var options = {
		multiAns: false,
		autoNav: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m3a26_2.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a26_2");
	}

});


Template.m3a26_4.rendered = function () {

	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m3a26_4";
	var options = {
		multiAns: false,
		autoNav: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m3a26_4.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a26_4");
	}

});

Template.m3a26_5.rendered = function () {

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m3a26_5";
	var options = {
		multiAns: false,
		autoNav: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m3a26_5.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a26_5");
	}

});

Template.m3a26_6.rendered = function () {

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m3a26_6";
	var options = {
		multiAns: false,
		autoNav: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m3a26_6.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a26_6");
	}

});
