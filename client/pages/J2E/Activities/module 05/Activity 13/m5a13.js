Template.m5a13.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m5a13_end') {
			return false;
		} return true;
	}
});

Template.m5a13.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(5, 13);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(5, 13, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m5a13.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 5, 13, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m5a13.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m5a13_3.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 6;
	var selector = "#m5a13_3";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a13_3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a13_3");
	}
});

Template.m5a13_4.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m5a13_4";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a13_4.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a13_4");
	}
});

Template.m5a13_5.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m5a13_5";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a13_5.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a13_5");
	}
});

Template.m5a13_6.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m5a13_6";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a13_6.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a13_6");
	}
});

Template.m5a13_7.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m5a13_7";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a13_7.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a13_7");
	}
});

Template.m5a13_8.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m5a13_8";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a13_8.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a13_8");
	}
});

Template.m5a13_9.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m5a13_9";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a13_9.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a13_9");
	}
});
