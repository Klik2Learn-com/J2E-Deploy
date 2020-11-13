Template.m2a22.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(2, 22);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 22, subpage);
			oldLocation = location.href;
		}
	}, 500);

}


Template.m2a22.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m2a22_end') {
			return false;
		} return true;
	}
});

Template.m2a22.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 22, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m2a22.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m2a22_1.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m2a22_1";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m2a22_1.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a22_1");
	}

});


Template.m2a22_3.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m2a22_3";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m2a22_3.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a22_3");
	}

});

Template.m2a22_5.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m2a22_5";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m2a22_5.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a22_5");
	}

});

Template.m2a22_7.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m2a22_7";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m2a22_7.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a22_7");
	}

});

Template.m2a22_9.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m2a22_9";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m2a22_9.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a22_9");
	}

});


