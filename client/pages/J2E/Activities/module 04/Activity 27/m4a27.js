

Template.m4a27.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m4a27_end') {
			return false;
		} return true;
	}
});

Template.m4a27.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(4, 27);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 27, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m4a27.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 27, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a27.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m4a27_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a27_2");
	}
});


Template.m4a27_2.events({

	"click .pagination": function (evt) {
		$.k2l.m4a27_2.draggedElement = {};
		$.k2l.m4a27_2.counter = 0;
		$('#welldonecap').addClass('hidden');
	}

});

Template.m4a27_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a27_2 == 'undefined') {
		$.k2l.m4a27_2 = {};
	};

	$.k2l.m4a27_2.draggedElement = {};
	$.k2l.m4a27_2.counter = 0;

	// $.k2l.m4a27_2.max = 5; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m4a27_2";
	initDragDrop(selector, dragDropAmount);


}


Template.m4a27_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a27_3");
	}
});


Template.m4a27_3.events({

	"click .pagination": function (evt) {
		$.k2l.m4a27_3.draggedElement = {};
		$.k2l.m4a27_3.counter = 0;
		$('#welldonecap').addClass('hidden');
	}
});

Template.m4a27_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a27_3 == 'undefined') {
		$.k2l.m4a27_3 = {};
	};

	$.k2l.m4a27_3.draggedElement = {};
	$.k2l.m4a27_3.counter = 0;

	// $.k2l.m4a27_3.max = 3; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m4a27_3";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m4a27_3",
		nextPage: "#m4a27_4"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m4a27_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a27_4");
	}
});


Template.m4a27_4.events({

	"click .pagination": function (evt) {
		$.k2l.m4a27_4.draggedElement = {};
		$.k2l.m4a27_4.counter = 0;
		$('#welldonecap').addClass('hidden');
	}
});

Template.m4a27_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a27_4 == 'undefined') {
		$.k2l.m4a27_4 = {};
	};

	$.k2l.m4a27_4.draggedElement = {};
	$.k2l.m4a27_4.counter = 0;

	// $.k2l.m4a27_4.max = 2; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m4a27_4";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m4a27_4",
		nextPage: "#m4a27_5"
	};
	initDragDrop(selector, dragDropAmount, options);
}
