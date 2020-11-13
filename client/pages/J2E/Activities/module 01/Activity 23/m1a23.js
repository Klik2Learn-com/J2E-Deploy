Template.m1a23.rendered = function () {

	document.title = "Journey 2 English";
	
	setStartActivity(1, 23);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(1, 23, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m1a23.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m1a23_end') {
			return false;
		} return true;
	}
});

Template.m1a23.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 1, 23, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m1a23.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m1a23_1.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a23_1");
	}
});


Template.m1a23_1.events({
	"click .pagination": function (evt) {
		$.k2l.m1a23_1.draggedElement = {};
		$.k2l.m1a23_1.counter = 0;
	}
});

Template.m1a23_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a23_1 == 'undefined') {
		$.k2l.m1a23_1 = {};
	};

	$.k2l.m1a23_1.draggedElement = {};
	$.k2l.m1a23_1.counter = 0;

	//$.k2l.m1a23_1.max = 5; // number of drag spaces on this page.
	
	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m1a23_1";
	initDragDrop(selector, dragDropAmount);

}

