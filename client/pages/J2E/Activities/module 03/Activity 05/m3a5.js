Template.m3a5.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m3a5_end') {
			return false;
		} return true;
	}
});

Template.m3a5.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(3, 5);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(3, 5, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m3a5.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 3, 5, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m3a5.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


Template.m3a5_4.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m3a5_4";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m3a5_4",
		nextPage: "#m3a5_5"
	};
	initDragDrop(selector, dragDropAmount, options);
};

Template.m3a5_4.events({

	"click .pagination": function (evt) {
		// $.k2l.m3a5_4.draggedElement = {};   
		$.k2l.m3a5_4.counter = 0;
	}
});


Template.m3a5_4.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a5_4");
	}
});


Template.m3a5_6.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m3a5_6";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m3a5_6",
		nextPage: "#m3a5_end"
	};
	initDragDrop(selector, dragDropAmount, options);
};

Template.m3a5_6.events({

	"click .pagination": function (evt) {
		$.k2l.m3a5_6.draggedElement = {};
		$.k2l.m3a5_6.counter = 0;
	}

});


Template.m3a5_6.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a5_6");
	}

});

