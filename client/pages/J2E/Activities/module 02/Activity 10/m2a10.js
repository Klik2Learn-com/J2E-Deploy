Template.m2a10.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m2a10_end') {
			return false;
		} return true;
	}
});

Template.m2a10.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(2, 10);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 10, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m2a10.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 10, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m2a10.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m2a10_1.rendered = function () {

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m2a10_1";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m2a10_1",
		nextPage: "#m2a10_2"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m2a10_1.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a10_1");
	}

});


Template.m2a10_2.rendered = function () {

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m2a10_2";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m2a10_2",
		nextPage: "#m2a10_3"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m2a10_2.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a10_2");
	}

});

Template.m2a10_3.rendered = function () {

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m2a10_3";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m2a10_3",
		nextPage: "#m2a10_4"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m2a10_3.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a10_3");
	}

});

Template.m2a10_4.rendered = function () {

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m2a10_4";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m2a10_4",
		nextPage: "#m2a10_5"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m2a10_4.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a10_4");
	}

});

Template.m2a10_5.rendered = function () {

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m2a10_5";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m2a10_5",
		nextPage: "#m2a10_6"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m2a10_5.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a10_5");
	}

});

Template.m2a10_6.rendered = function () {

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m2a10_6";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m2a10_6",
		nextPage: "#m2a10_7"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m2a10_6.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a10_6");
	}

});