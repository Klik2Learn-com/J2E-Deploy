Template.m5a8.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m5a8_end') {
			return false;
		} return true;
	}
});

Template.m5a8.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(5, 8);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(5, 8, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m5a8.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 5, 8, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m5a8.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m5a8_1.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 12;
	var selector = "#m5a8_1";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a8_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a8_1");
	}
});

Template.m5a8_2.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m5a8_2";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a8_2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a8_2");
	}
});

Template.m5a8_3.rendered = function () {

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m5a8_3";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a8_3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a8_3");
	}
});

Template.m5a8_4.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m5a8_4";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a8_4.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a8_4");
	}
});

Template.m5a8_5.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m5a8_5";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a8_5.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a8_5");
	}
});

Template.m5a8_6.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m5a8_6";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a8_6.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a8_6");
	}
});