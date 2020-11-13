Template.m6a25.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m6a25_end') {
			return false;
		}
		return true;
	}
});

Template.m6a25.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(6, 25);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(6, 25, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m6a25.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 6, 25, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m6a25.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m6a25_1.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m6a25_1";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m6a25_2.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m6a25_2";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m6a25_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a25_1");
	}
});

Template.m6a25_2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a25_2");
	}
});