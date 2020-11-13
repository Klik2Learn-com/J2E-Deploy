Template.m5a21.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m5a21_end') {
			return false;
		} return true;
	}
});

Template.m5a21.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(5, 21);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(5, 21, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m5a21.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 5, 21, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m5a21.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m5a21_2.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m5a21_2";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a21_2.helpers({
	
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a21_2");
	}

});

Template.m5a21_3.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m5a21_3";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a21_3.helpers({
	
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a21_3");
	}

});

Template.m5a21_4.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m5a21_4";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a21_4.helpers({
	
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a21_4");
	}

});

Template.m5a21_5.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m5a21_5";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a21_5.helpers({
	
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a21_5");
	}

});