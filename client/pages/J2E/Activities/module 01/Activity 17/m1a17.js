Template.m1a17.rendered = function () {

	document.title = "Journey 2 English";
	
	setStartActivity(1, 17);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(1, 17, subpage);
			oldLocation = location.href;
		}
	}, 500);


}

Template.m1a17.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m1a17_end') {
			return false;
		} return true;
	}
});


Template.m1a17.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 1, 17, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m1a17.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


Template.m1a17_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a17_2");
	}
});

Template.m1a17_2.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m1a17_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m1a17_2.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m1a17_2.sound.src = {};
	}

});

Template.m1a17_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a17_2 == 'undefined') {
		$.k2l.m1a17_2 = {};
	};

	$.k2l.m1a17_2.sound = new Audio();
}

Template.m1a17_3.helpers({

	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m1a17_3");
	}

});

Template.m1a17_3.events({

	"click .pagination": function (evt) {
		$.k2l.m1a17_3.draggedElement = {};
		$.k2l.m1a17_3.counter = 0;
	}

});

Template.m1a17_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a17_3 == 'undefined') {
		$.k2l.m1a17_3 = {};
	};

	$.k2l.m1a17_3.draggedElement = {};
	$.k2l.m1a17_3.counter = 0;
	//$.k2l.m1a17_3.max = 5;


	$.k2l.m1a17_3.dragWords = [];
	$("#m1a17_3").find(".ddsourceseated").each(function () {
		$.k2l.m1a17_3.dragWords.push($(this).html());
	});

	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m1a17_3";
	initDragDrop(selector, dragDropAmount);


	$.k2l.m1a17_3.timer = {};
	$.k2l.m1a17_3.isScrolling = false;
	$.k2l.m1a17_3.element = {};

}


Template.m1a17_4.helpers({

	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m1a17_4");
	}

});

Template.m1a17_4.events({

	"click .pagination": function (evt) {
		$.k2l.m1a17_4.draggedElement = {};
		$.k2l.m1a17_4.counter = 0;
	}

});

Template.m1a17_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a17_4 == 'undefined') {
		$.k2l.m1a17_4 = {};
	};

	$.k2l.m1a17_4.draggedElement = {};
	$.k2l.m1a17_4.counter = 0;
	//$.k2l.m1a17_4.max = 5;


	$.k2l.m1a17_4.dragWords = [];
	$("#m1a17_4").find(".ddsourceseated").each(function () {
		$.k2l.m1a17_4.dragWords.push($(this).html());
	});

	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m1a17_4";
	initDragDrop(selector, dragDropAmount);

	/************* ADD THESE ***************/
	$.k2l.m1a17_4.isScrolling = false;
	$.k2l.m1a17_4.element = {};
	/***************************************/


	// ADD THESE TOO FOR TOUCH
	$.k2l.m1a17_4.timer = {};
	$.k2l.m1a17_4.isScrolling = false;
	$.k2l.m1a17_4.element = {};

}

Template.m1a17_5.helpers({

	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m1a17_5");
	}

});

Template.m1a17_5.events({

	"click .pagination": function (evt) {
		$.k2l.m1a17_5.draggedElement = {};
		$.k2l.m1a17_5.counter = 0;
	}


});

Template.m1a17_5.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a17_5 == 'undefined') {
		$.k2l.m1a17_5 = {};
	};

	$.k2l.m1a17_5.draggedElement = {};
	$.k2l.m1a17_5.counter = 0;
	// $.k2l.m1a17_5.max = 5;

	$.k2l.m1a17_5.dragWords = [];
	$("#m1a17_5").find(".ddsourceseated").each(function () {
		$.k2l.m1a17_5.dragWords.push($(this).html());
	});

	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m1a17_5";
	initDragDrop(selector, dragDropAmount);

}

Template.m1a17_6.helpers({

	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m1a17_6");
	}

});

Template.m1a17_6.events({

	"click .pagination": function (evt) {
		$.k2l.m1a17_6.draggedElement = {};
		$.k2l.m1a17_6.counter = 0;
	}


});

Template.m1a17_6.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a17_6 == 'undefined') {
		$.k2l.m1a17_6 = {};
	};

	$.k2l.m1a17_6.draggedElement = {};
	$.k2l.m1a17_6.counter = 0;
	//$.k2l.m1a17_6.max = 5;



	$.k2l.m1a17_6.dragWords = [];
	$("#m1a17_6").find(".ddsourceseated").each(function () {
		$.k2l.m1a17_6.dragWords.push($(this).html());
	});

	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m1a17_6";
	initDragDrop(selector, dragDropAmount);

}

