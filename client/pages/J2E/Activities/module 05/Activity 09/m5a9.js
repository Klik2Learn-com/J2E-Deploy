Template.m5a9.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m5a9_end') {
			return false;
		} return true;
	}
});

Template.m5a9.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(5, 9);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(5, 9, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m5a9.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 5, 9, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m5a9.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m5a9_5.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m5a9_5";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a9_5.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a9_5");
	}
});

Template.m5a9_6.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m5a9_6";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a9_6.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a9_6");
	}
});

Template.m5a9_7.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m5a9_7";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a9_7.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a9_7");
	}
});

Template.m5a9_8.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m5a9_8";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a9_8.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a9_8");
	}
});

Template.m5a9_9.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m5a9_9";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a9_9.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a9_9");
	}
});

Template.m5a9_10.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m5a9_10";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a9_10.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a9_10");
	}
});

Template.m5a9_11.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m5a9_11";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a9_11.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a9_11");
	}
});

Template.m5a9_12.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m5a9_12";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a9_12.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a9_12");
	}
});

Template.m5a9_13.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m5a9_13";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a9_13.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a9_13");
	}
});

Template.m5a9_14.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m5a9_14";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a9_14.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a9_14");
	}
});