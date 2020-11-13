Template.m5a14.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m5a14_end') {
			return false;
		} return true;
	}
});

Template.m5a14.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(5, 14);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(5, 14, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m5a14.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 5, 14, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m5a14.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m5a14_4.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m5a14_4";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a14_4.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a14_4");
	}
});

Template.m5a14_5.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m5a14_5";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a14_5.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a14_5");
	}
});

Template.m5a14_6.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m5a14_6";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a14_6.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a14_6");
	}
});