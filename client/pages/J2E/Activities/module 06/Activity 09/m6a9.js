Template.m6a9.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m6a9_end') {
			return false;
		} return true;
	}
});

Template.m6a9.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(6, 9);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(6, 9, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m6a9.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 6, 9, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m6a9.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m6a9_2.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m6a9_2";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m6a9_2",
		nextPage: "#m6a9_3"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m6a9_3.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m6a9_3";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m6a9_3",
		nextPage: "#m6a9_end"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m6a9_3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a9_3");
	}
});

Template.m6a9_2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a9_2");
	}
});