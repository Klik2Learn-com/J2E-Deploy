Template.m4a25.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m4a25_end') {
			return false;
		}
		return true;
	},

	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m4a25");
	}
})

Template.m4a25.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m4a25.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m4a25.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m4a25.sound.src = {};
	}

});

Template.m4a25.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(4, 25);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 25, subpage);
			oldLocation = location.href;
		}
	}, 500);


	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a25 == 'undefined') {
		$.k2l.m4a25 = {};
	};

	$.k2l.m4a25.sound = new Audio();
}

Template.m4a25.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 25, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a25.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m4a25_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a25_2");
	}
});


Template.m4a25_2.events({

	"click .pagination": function (evt) {
		$.k2l.m4a25_2.draggedElement = {};
		$.k2l.m4a25_2.counter = 0;
	}

});

Template.m4a25_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a25_2 == 'undefined') {
		$.k2l.m4a25_2 = {};
	};

	$.k2l.m4a25_2.draggedElement = {};
	$.k2l.m4a25_2.counter = 0;

	//$.k2l.m4a25_2.max = 1; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m4a25_2";
	initDragDrop(selector, dragDropAmount);


}


Template.m4a25_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a25_3");
	}
});


Template.m4a25_3.events({

	"click .pagination": function (evt) {
		$.k2l.m4a25_3.draggedElement = {};
		$.k2l.m4a25_3.counter = 0;
	}

});

Template.m4a25_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a25_3 == 'undefined') {
		$.k2l.m4a25_3 = {};
	};

	$.k2l.m4a25_3.draggedElement = {};
	$.k2l.m4a25_3.counter = 0;

	// $.k2l.m4a25_3.max = 1; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m4a25_3";
	initDragDrop(selector, dragDropAmount);


}


Template.m4a25_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a25_4");
	}
});


Template.m4a25_4.events({

	"click .pagination": function (evt) {
		$.k2l.m4a25_4.draggedElement = {};
		$.k2l.m4a25_4.counter = 0;
	}

});

Template.m4a25_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a25_4 == 'undefined') {
		$.k2l.m4a25_4 = {};
	};

	$.k2l.m4a25_4.draggedElement = {};
	$.k2l.m4a25_4.counter = 0;

	// $.k2l.m4a25_4.max = 1; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m4a25_4";
	initDragDrop(selector, dragDropAmount);


}


Template.m4a25_5.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a25_5");
	}
});


Template.m4a25_5.events({

	"click .pagination": function (evt) {
		$.k2l.m4a25_5.draggedElement = {};
		$.k2l.m4a25_5.counter = 0;
	}

});

Template.m4a25_5.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a25_5 == 'undefined') {
		$.k2l.m4a25_5 = {};
	};

	$.k2l.m4a25_5.draggedElement = {};
	$.k2l.m4a25_5.counter = 0;

	// $.k2l.m4a25_5.max = 1; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m4a25_5";
	initDragDrop(selector, dragDropAmount);
}


Template.m4a25_6.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a25_6");
	}
});


Template.m4a25_6.events({

	"click .pagination": function (evt) {
		$.k2l.m4a25_6.draggedElement = {};
		$.k2l.m4a25_6.counter = 0;
	}

});

Template.m4a25_6.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a25_6 == 'undefined') {
		$.k2l.m4a25_6 = {};
	};

	$.k2l.m4a25_6.draggedElement = {};
	$.k2l.m4a25_6.counter = 0;

	// $.k2l.m4a25_6.max = 1; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m4a25_6";
	initDragDrop(selector, dragDropAmount);

}


Template.m4a25_7.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a25_7");
	}
});


Template.m4a25_7.events({

	"click .pagination": function (evt) {
		$.k2l.m4a25_7.draggedElement = {};
		$.k2l.m4a25_7.counter = 0;
	}

});

Template.m4a25_7.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a25_7 == 'undefined') {
		$.k2l.m4a25_7 = {};
	};

	$.k2l.m4a25_7.draggedElement = {};
	$.k2l.m4a25_7.counter = 0;

	// $.k2l.m4a25_7.max = 1; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m4a25_7";
	initDragDrop(selector, dragDropAmount);


}


Template.m4a25_8.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a25_8");
	}
});


Template.m4a25_8.events({

	"click .pagination": function (evt) {
		$.k2l.m4a25_8.draggedElement = {};
		$.k2l.m4a25_8.counter = 0;
	}

});

Template.m4a25_8.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a25_8 == 'undefined') {
		$.k2l.m4a25_8 = {};
	};

	$.k2l.m4a25_8.draggedElement = {};
	$.k2l.m4a25_8.counter = 0;

	// $.k2l.m4a25_8.max = 1; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m4a25_8";
	initDragDrop(selector, dragDropAmount);

}


Template.m4a25_9.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a25_9");
	}
});


Template.m4a25_9.events({

	"click .pagination": function (evt) {
		$.k2l.m4a25_9.draggedElement = {};
		$.k2l.m4a25_9.counter = 0;
	}

});

Template.m4a25_9.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a25_9 == 'undefined') {
		$.k2l.m4a25_9 = {};
	};

	$.k2l.m4a25_9.draggedElement = {};
	$.k2l.m4a25_9.counter = 0;

	$.k2l.m4a25_9.max = 1; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m4a25_9";
	initDragDrop(selector, dragDropAmount);

}

