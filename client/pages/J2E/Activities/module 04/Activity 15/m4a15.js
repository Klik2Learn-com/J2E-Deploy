

Template.m4a15.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m4a15_end') {
			return false;
		} return true;
	}
});

Template.m4a15.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(4, 15);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 15, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m4a15.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 15, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a15.events({
	"click #m4a15Next": function (evt) {
		$('figure').each(function (i, e) {
			$(this).delay(i * 1500).fadeIn();
		});

	},
});

Template.m4a15.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


Template.m4a15_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a15_1");
	}
});

// Template.m4a15_1.events({
// 	"click #m4a15_1Next": function(evt){
// 	 $('figure').fadeOut();
// 	}
// });

Template.m4a15_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a15_2");
	}
});


Template.m4a15_2.events({

	"click .pagination": function (evt) {
		$.k2l.m4a15_2.draggedElement = {};
		$.k2l.m4a15_2.counter = 0;
	}

});

Template.m4a15_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a15_2 == 'undefined') {
		$.k2l.m4a15_2 = {};
	};


	$.k2l.m4a15_2.draggedElement = {};
	$.k2l.m4a15_2.counter = 0;

	// $.k2l.m4a15_2.max = 4; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m4a15_2";
	initDragDrop(selector, dragDropAmount);
}

