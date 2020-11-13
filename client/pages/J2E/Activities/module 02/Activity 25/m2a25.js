Template.m2a25.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m2a25_end') {
			return false;
		} return true;
	}
});



Template.m2a25.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(2, 25);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 25, subpage);
			oldLocation = location.href;
		}
	}, 500);
}

Template.m2a25.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 25, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m2a25.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m2a25_3.helpers( {
    activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a25_3");
	}
});

Template.m2a25_3.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 7;
	var selector = "#m2a25_3";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m2a25_3",
		nextPage: "#m2a25_4"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m2a25_4.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m2a25_4";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m2a25_4",
		nextPage: "#m2a25_5"
	};
	initDragDrop(selector, dragDropAmount, options);
} 

Template.m2a25_4.helpers( {
    activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a25_4");
	}
});