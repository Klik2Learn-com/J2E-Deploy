

Template.m4a28.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m4a28_end') {
			return false;
		} return true;
	}
});

Template.m4a28.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(4, 28);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 28, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m4a28.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 28, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a28.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m4a28_1.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m4a28_1");
	}
})

Template.m4a28_1.events({

	'click .pagination': function (evt) {

		$.k2l.mod4_idioms_GH.sound.src = {};
	}

});

Template.m4a28_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a28_1 == 'undefined') {
		$.k2l.m4a28_1 = {};
	};

	$.k2l.m4a28_1.sound = new Audio();
}

Template.m4a28_2.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m4a28_2");
	}
})

Template.m4a28_2.events({

	'click .pagination': function (evt) {
		
		$.k2l.mod4_idioms.sound.src = {};
	}

});

Template.m4a28_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a28_2 == 'undefined') {
		$.k2l.m4a28_2 = {};
	};

	$.k2l.m4a28_2.sound = new Audio();
}


Template.m4a28_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a28_3");
	}
});


Template.m4a28_3.events({

	"click .pagination": function (evt) {
		$.k2l.m4a28_3.draggedElement = {};
		$.k2l.m4a28_3.counter = 0;
	}

});

Template.m4a28_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a28_3 == 'undefined') {
		$.k2l.m4a28_3 = {};
	};

	$.k2l.m4a28_3.draggedElement = {};
	$.k2l.m4a28_3.counter = 0;

	// $.k2l.m4a28_3.max = 4; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m4a28_3";
	initDragDrop(selector, dragDropAmount);
}

