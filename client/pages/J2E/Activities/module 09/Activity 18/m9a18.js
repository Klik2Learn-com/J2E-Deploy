Template.m9a18.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m9a18_end') {
			return false;
		}
		return true;
	}
});

Template.m9a18.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(9, 18);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(9, 18, subpage);
			oldLocation = location.href;
		}
	}, 500);
	Session.set("flip-set", false);
}

Template.m9a18.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 9, 18, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m9a18.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m9a18_6.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a18_6");
	}
});

Template.m9a18_6.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m9a18_6 == 'undefined') {
		$.k2l.m9a18_6 = {};
	};

	$.k2l.m9a18_6.draggedElement = {};
	$.k2l.m9a18_6.counter = 0;

	var dragDropAmount = 5;
	var selector = "#m9a18_6";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m9a18_6",
		nextPage: "#m9a18_7",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m9a18_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a18_1");
	}
});

Template.m9a18_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m9a18_1 == 'undefined') {
		$.k2l.m9a18_1 = {};
	};

	var dragDropAmount = 5;
	var selector = "#m9a18_1";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m9a18_1",
		nextPage: "#m9a18_2",
	};
	initDragDrop(selector, dragDropAmount, options);
}



Template.m9a18_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a18_3");
	}
});

Template.m9a18_3.events({

	'click .flippable': function (evt) {
		$(".flippable").flip({
				trigger: 'manual'
		});
		$(evt.currentTarget).flip("toggle");
	}

});


Template.m9a18_5.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a18_5");
	}
});


Template.m9a18_5.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m9a18_5 == 'undefined') {
		$.k2l.m9a18_5 = {};
	};

	var dragDropAmount = 5;
	var selector = "#m9a18_5";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m9a18_5",
		nextPage: "#m9a18_end",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m9a18_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a18_4");
	}
});


Template.m9a18_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m9a18_4 == 'undefined') {
		$.k2l.m9a18_4 = {};
	};

	var dragDropAmount = 5;
	var selector = "#m9a18_4";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m9a18_4",
		nextPage: "#m9a18_5",
	};
	initDragDrop(selector, dragDropAmount, options);
}
