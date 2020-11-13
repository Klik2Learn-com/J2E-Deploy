Template.m3a9.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m3a9_end') {
			return false;
		} return true;
	}
});

Template.m3a9.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(3, 9);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(3, 9, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m3a9.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 3, 9, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m3a9.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m3a9_6.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a9_6");
	}

});



Template.m3a9_6.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m3a9_6";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m3a9_6",
		nextPage: "#m3a9_end"
	};
	initDragDrop(selector, dragDropAmount, options);
}