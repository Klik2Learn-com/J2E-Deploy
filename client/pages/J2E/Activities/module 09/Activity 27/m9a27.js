Template.m9a27.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m9a27_end') {
			return false;
		}
		return true;
	}
});

Template.m9a27.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(9, 27);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(9, 27, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m9a27.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 9, 27, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m9a27.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m9a27_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a27_2");
	}
});

Template.m9a27_2.events({

	'click .pagination': function (evt) {

		$.k2l.mod9_idioms.sound.src = {};
	}

});

Template.m9a27_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m9a27_2 == 'undefined') {
		$.k2l.m9a27_2 = {};
	};

	$.k2l.m9a27_2.sound = new Audio();
}


Template.m9a27_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a27_1");
	}
});

Template.m9a27_1.events({

	'click .pagination': function (evt) {

		$.k2l.mod9_idioms_QR.sound.src = {};
	}

});

Template.m9a27_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m9a27_1 == 'undefined') {
		$.k2l.m9a27_1 = {};
	};

	$.k2l.m9a27_1.sound = new Audio();
}

