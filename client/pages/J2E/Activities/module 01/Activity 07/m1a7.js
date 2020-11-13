// This module requires drag and drop elements


Template.m1a7.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 1, 7, Meteor.userId());
	//Session.set("activeSection", "m1a7");
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m1a7.rendered = function () {
	setStartActivity(1, 7);
	$.k2l = {};
	$.k2l.sound = null;

    document.title = "Journey 2 English";
}

Template.m1a7.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == 'm1a7_end') {
			return false;
		}
		return true;
	},
	activeSection: function () {
		return Session.get("activeSection");
	}
});

Template.m1a7.events({
	"click a.next": function (evt) {
		evt.preventDefault();
		var activeSection = Session.get("activeSection");
		if (activeSection == "m1a7") {
			$("#m1a7").addClass("hidden");
			Session.set("activeSection", "m1a7_1");
		} else {
			activeSection = "m1a7_" + (parseInt(activeSection.substring(activeSection.indexOf("_") + 1, activeSection.length)));
			Session.set("activeSection", activeSection);
		}
	},

	"click a.previous": function (evt) {
		var activeSection = Session.get("activeSection");
		if (activeSection == "m1a7" || activeSection == "m1a7_1") {
			return false;
		} else {
			activeSection = "m1a7_" + (parseInt(activeSection.substring(activeSection.indexOf("_") + 1, activeSection.length)));
			Session.set("activeSection", activeSection);
		}
	}
});

Template.m1a7.destroyed = function () {
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


Template.m1a7_2.rendered = function () {
	$.k2l.sound = new Audio();
}

Template.m1a7_2.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {
		$.k2l.sound.src = {};
	}

});

Template.m1a7_4.rendered = function () {

	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m1a7_4";
	initDragDrop(selector, dragDropAmount);
}



Template.m1a7_5.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m1a7_5";
	initDragDrop(selector, dragDropAmount);
}


Template.m1a7_6.rendered = function () {
	$.k2l.m1a7_6 = {};
	$.k2l.m1a7_6.counter = 0;

	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m1a7_6";
	initDragDrop(selector, dragDropAmount);
}

Template.m1a7_6.events({

	"click .pagination": function (evt) {
		$.k2l.m1a7_6.draggedElement = {};
		$.k2l.m1a7_6.counter = 0;
	}
});

Template.m1a7_7.rendered = function () {
	$.k2l.m1a7_7 = {};
	$.k2l.m1a7_7.counter = 0;

	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m1a7_7";
	initDragDrop(selector, dragDropAmount);
}

Template.m1a7_7.events({

	"click .pagination": function (evt) {
		$.k2l.m1a7_7.draggedElement = {};
		$.k2l.m1a7_7.counter = 0;
	}
});

Template.m1a7_8.rendered = function () {
	$.k2l.m1a7_8 = {};
	$.k2l.m1a7_8.counter = 0;

	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m1a7_8";
	initDragDrop(selector, dragDropAmount);
}

Template.m1a7_8.events({

	"click .pagination": function (evt) {
		$.k2l.m1a7_8.draggedElement = {};
		$.k2l.m1a7_8.counter = 0;
	}
});



Template.m1a7_9.rendered = function () {
	$.k2l.m1a7_9 = {};
	$.k2l.m1a7_9.counter = 0;

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m1a7_9";
	initDragDrop(selector, dragDropAmount);
}

Template.m1a7_9.events({

	"click .pagination": function (evt) {
		$.k2l.m1a7_9.draggedElement = {};
		$.k2l.m1a7_9.counter = 0;
	}
});

Template.m1a7_10.rendered = function () {
	$.k2l.m1a7_10 = {};
	$.k2l.m1a7_10.counter = 0;

	// Add drag and drop
	var dragDropAmount = 7;
	var selector = "#m1a7_10";
	initDragDrop(selector, dragDropAmount);
}

Template.m1a7_10.events({
	
	"click .pagination": function (evt) {
		$.k2l.m1a7_10.draggedElement = {};
		$.k2l.m1a7_10.counter = 0;
	}
});

Template.m1a7_11.rendered = function () {
	$.k2l.sound = new Audio();
}

Template.m1a7_11.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.sound.src = {};
	}

});

Template.m1a7_12.rendered = function () {
	$.k2l.sound = new Audio();
}

Template.m1a7_12.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {
		$.k2l.sound.src = {};
	}

});