

Template.m2a17.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m2a17_end') {
			return false;
		} return true;
	}
});

Template.m2a17.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(2, 17);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 17, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m2a17.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 17, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m2a17.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m2a17_7.rendered = function () {

	// Add drag and drop
	var dragDropAmount = 6;
	var selector = "#m2a17_7";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
};

Template.m2a17_7.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a17_7");
	}

});