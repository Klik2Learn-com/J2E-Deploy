Template.m2a15.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m2a15_end') {
			return false;
		} return true;
	}
});

Template.m2a15.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 15, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m2a15.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(2, 15);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 15, subpage);
			oldLocation = location.href;
		}
	}, 500);
}

Template.m2a15.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


Template.m2a15_2.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 19;
	var selector = "#m2a15_2";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m2a15_2.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a15_2");
	}

});

Template.m2a15_2.events({
	"click .pagination": function (evt) {
		resetActivityVariables();
	}

});



Template.m2a15_4.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 10;
	var selector = "#m2a15_4";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m2a15_4.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a15_4");
	}

});

Template.m2a15_4.events({
	"click .pagination": function (evt) {
		resetActivityVariables();
	}

});

Template.m2a15_7.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 6;
	var selector = "#m2a15_7";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m2a15_7.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a15_7");
	}

});

Template.m2a15_7.events({
	"click .pagination": function (evt) {
		resetActivityVariables();
	}

});

Template.m2a15_8.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 6;
	var selector = "#m2a15_8";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m2a15_8.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a15_8");
	}

});

Template.m2a15_8.events({
	"click .pagination": function (evt) {
		resetActivityVariables();
	}

});