
Template.m3a6.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m3a6_end') {
			return false;
		} return true;
	}
});

Template.m3a6.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(3, 6);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(3, 6, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m3a6.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 3, 6, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m3a6.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m3a6_4.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m3a6_4";
	var options = {
		multiAns: true
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m3a6_4.events({

	"click .pagination": function (evt) {
		// $.k2l.m3a6_4.draggedElement = {};   
		$.k2l.m3a6_4.counter = 0;
	}

});

Template.m3a6_4.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a6_4");
	}

});



Template.m3a6_5.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m3a6_5";
	var options = {
		multiAns: true
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m3a6_5.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "m3a6_5");
	}
});
Template.m3a6_5.events({

	"click .pagination": function (evt) {
		// $.k2l.m3a6_5.draggedElement = {};	 
		$.k2l.m3a6_5.counter = 0;
	}

});

Template.m3a6_5.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a6_5");
	}

});
