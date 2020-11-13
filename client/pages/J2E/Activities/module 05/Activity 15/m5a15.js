Template.m5a15.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m5a15_end') {
			return false;
		} return true;
	}
});

Template.m5a15.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(5, 15);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(5, 15, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m5a15.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 5, 15, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
}

Template.m5a15.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
}

Template.m5a15_1.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 6;
	var selector = "#m5a15_1";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a15_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a15_1");
	}
});

Template.m5a15_2.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m5a15_2";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a15_2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a15_2");
	}
});

Template.m5a15_3.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m5a15_3";
	var options = {
		multiAns: true
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a15_3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a15_3");
	}
});

Template.m5a15_4.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 7;
	var selector = "#m5a15_4";
	var options = {
		multiAns: true
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a15_4.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a15_4");
	}
});

Template.m5a15_5.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m5a15_5";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a15_5.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a15_5");
	}
});

Template.m5a15_6.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m5a15_6";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a15_6.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a15_6");
	}
});

Template.m5a15_7.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m5a15_7";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a15_7.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a15_7");
	}
});