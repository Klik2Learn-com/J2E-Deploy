Template.m3a20.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m3a20_end') {
			return false;
		} return true;
	}
});

Template.m3a20.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(3, 20);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(3, 20, subpage);
			oldLocation = location.href;
		}
	}, 500);
}

Template.m3a20.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 3, 20, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m3a20.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m3a20_1.rendered = function () {

	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m3a20_1";
	var options = {
		multiAns: false,
		autoNav: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m3a20_1.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a20_1");
	}

});


Template.m3a20_2.rendered = function () {

	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m3a20_2";
	var options = {
		multiAns: false,
		autoNav: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m3a20_2.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a20_2");
	}

});
