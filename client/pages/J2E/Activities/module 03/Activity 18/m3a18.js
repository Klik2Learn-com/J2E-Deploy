Template.m3a18.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m3a18_end') {
			return false;
		} return true;
	}
});

Template.m3a18.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(3, 18);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(3, 18, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m3a18.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 3, 18, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m3a18.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


Template.m3a18_2.rendered = function () {

	// Add drag and drop
	var dragDropAmount = 8;
	var selector = "#m3a18_2";
	var options = {
		multiAns: false,
		autoNav: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m3a18_2.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a18_2");
	}

});


