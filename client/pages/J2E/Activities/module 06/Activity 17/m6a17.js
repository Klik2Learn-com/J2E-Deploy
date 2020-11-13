Template.m6a17.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m6a17_end') {
			return false;
		}
		return true;
	}
});

Template.m6a17.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(6, 17);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(6, 17, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m6a17.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 6, 17, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m6a17.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


Template.m6a17_1.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 20;
	var selector = "#m6a17_1";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}
