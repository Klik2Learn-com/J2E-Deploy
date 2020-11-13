Template.m5a1.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m5a1_end') {
			return false;
		} return true;
	}
});

Template.m5a1.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(5, 1);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(5, 1, subpage);
			oldLocation = location.href;
		}
	}, 500);
}

Template.m5a1.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 5, 1, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m5a1.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m5a1_1.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 6;
	var selector = "#m5a1_1";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a1_2.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 6;
	var selector = "#m5a1_2";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a1_2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a1_2");
	}
});

Template.m5a1_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a1_1");
	}
});