Template.m4a13.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m4a13_end') {
			return false;
		}
		return true;
	},

	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m4a13");
	}
})

Template.m4a13.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m4a13.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m4a13.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m4a13.sound.src = {};
	}

});

Template.m4a13.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(4, 13);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 13, subpage);
			oldLocation = location.href;
		}
	}, 500);


	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a13 == 'undefined') {
		$.k2l.m4a13 = {};
	};

	$.k2l.m4a13.sound = new Audio();
}

Template.m4a13_2.events({

	"click .pagination": function (evt) {
		$('#m4a13_vid1').get(0).pause();
		$('#m4a13_vid1').get(0).currentTime = 0;
	}
});

Template.m4a13_11.events({

	"click .pagination": function (evt) {
		$('#m4a13_vid2').get(0).pause();
		$('#m4a13_vid2').get(0).currentTime = 0;
	}
});

Template.m4a13_22.events({

	"click .pagination": function (evt) {
		$('#m4a13_vid3').get(0).pause();
		$('#m4a13_vid3').get(0).currentTime = 0;
	}
});

Template.m4a13.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 13, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a13.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m4a13_31.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a13_31");
	}
});


Template.m4a13_31.events({

	"click .pagination": function (evt) {
		$.k2l.m4a13_31.draggedElement = {};
		$.k2l.m4a13_31.counter = 0;
	}

});

Template.m4a13_31.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a13_31 == 'undefined') {
		$.k2l.m4a13_31 = {};
	};

	$.k2l.m4a13_31.draggedElement = {};
	$.k2l.m4a13_31.counter = 0;

	// $.k2l.m4a13_31.max = 1; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m4a13_31";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m4a13_31",
		nextPage: "#m4a13_32"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m4a13_8.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a13_8");
	}
});


Template.m4a13_8.events({

	"click .pagination": function (evt) {
		$.k2l.m4a13_8.draggedElement = {};
		$.k2l.m4a13_8.counter = 0;
	}
});

Template.m4a13_8.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a13_8 == 'undefined') {
		$.k2l.m4a13_8 = {};
	};

	$.k2l.m4a13_8.draggedElement = {};
	$.k2l.m4a13_8.counter = 0;

	// $.k2l.m4a13_8.max = 1; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m4a13_8";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m4a13_8",
		nextPage: "#m4a13_9"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m4a13_21.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a13_21");
	}
});


Template.m4a13_21.events({

	"click .pagination": function (evt) {
		$.k2l.m4a13_21.draggedElement = {};
		$.k2l.m4a13_21.counter = 0;
	}
});

Template.m4a13_21.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a13_21 == 'undefined') {
		$.k2l.m4a13_21 = {};
	};

	$.k2l.m4a13_21.draggedElement = {};
	$.k2l.m4a13_21.counter = 0;

	// $.k2l.m4a13_21.max = 1; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m4a13_21";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m4a13_21",
		nextPage: "#m4a13_22"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m4a13_19.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a13_19");
	}
});


Template.m4a13_19.events({

	"click .pagination": function (evt) {
		$.k2l.m4a13_19.draggedElement = {};
		$.k2l.m4a13_19.counter = 0;
	}
});

Template.m4a13_19.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a13_19 == 'undefined') {
		$.k2l.m4a13_19 = {};
	};

	$.k2l.m4a13_19.draggedElement = {};
	$.k2l.m4a13_19.counter = 0;

	// $.k2l.m4a13_19.max = 1; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m4a13_19";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m4a13_19",
		nextPage: "#m4a13_20"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m4a13_18.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a13_18");
	}
});


Template.m4a13_18.events({

	"click .pagination": function (evt) {
		$.k2l.m4a13_18.draggedElement = {};
		$.k2l.m4a13_18.counter = 0;
	}
});

Template.m4a13_18.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a13_18 == 'undefined') {
		$.k2l.m4a13_18 = {};
	};

	$.k2l.m4a13_18.draggedElement = {};
	$.k2l.m4a13_18.counter = 0;

	// $.k2l.m4a13_18.max = 1; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m4a13_18";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m4a13_18",
		nextPage: "#m4a13_19"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m4a13_9.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a13_9");
	}
});


Template.m4a13_9.events({

	"click .pagination": function (evt) {
		$.k2l.m4a13_9.draggedElement = {};
		$.k2l.m4a13_9.counter = 0;
	}
});

Template.m4a13_9.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a13_9 == 'undefined') {
		$.k2l.m4a13_9 = {};
	};

	$.k2l.m4a13_9.draggedElement = {};
	$.k2l.m4a13_9.counter = 0;

	// $.k2l.m4a13_9.max = 1; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m4a13_9";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m4a13_9",
		nextPage: "#m4a13_10"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m4a13_30.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a13_30");
	}
});


Template.m4a13_30.events({

	"click .pagination": function (evt) {
		$.k2l.m4a13_30.draggedElement = {};
		$.k2l.m4a13_30.counter = 0;
	}
});

Template.m4a13_30.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a13_30 == 'undefined') {
		$.k2l.m4a13_30 = {};
	};

	$.k2l.m4a13_30.draggedElement = {};
	$.k2l.m4a13_30.counter = 0;

	// $.k2l.m4a13_30.max = 1; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m4a13_30";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m4a13_30",
		nextPage: "#m4a13_31"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m4a13_dept.events({

	'click .flippable': function (evt) {
		$(evt.currentTarget).flip();
	}

});

Template.m4a13_dept.rendered = function () {

	$('.flippable').flip();
}

Template.m4a13_20.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a13_20");
	}
});


Template.m4a13_20.events({

	"click .pagination": function (evt) {
		$.k2l.m4a13_20.draggedElement = {};
		$.k2l.m4a13_20.counter = 0;
	}
});

Template.m4a13_20.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a13_20 == 'undefined') {
		$.k2l.m4a13_20 = {};
	};

	$.k2l.m4a13_20.draggedElement = {};
	$.k2l.m4a13_20.counter = 0;

	// $.k2l.m4a13_20.max = 1; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m4a13_20";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m4a13_20",
		nextPage: "#m4a13_21"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m4a13_10.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a13_10");
	}
});


Template.m4a13_10.events({

	"click .pagination": function (evt) {
		$.k2l.m4a13_10.draggedElement = {};
		$.k2l.m4a13_10.counter = 0;
	}
});

Template.m4a13_10.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a13_10 == 'undefined') {
		$.k2l.m4a13_10 = {};
	};

	$.k2l.m4a13_10.draggedElement = {};
	$.k2l.m4a13_10.counter = 0;

	// $.k2l.m4a13_10.max = 1; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m4a13_10";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m4a13_10",
		nextPage: "#m4a13_11"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m4a13_29.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a13_29");
	}
});


Template.m4a13_29.events({

	"click .pagination": function (evt) {
		$.k2l.m4a13_29.draggedElement = {};
		$.k2l.m4a13_29.counter = 0;
	}
});

Template.m4a13_29.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a13_29 == 'undefined') {
		$.k2l.m4a13_29 = {};
	};

	$.k2l.m4a13_29.draggedElement = {};
	$.k2l.m4a13_29.counter = 0;

	// $.k2l.m4a13_29.max = 1; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m4a13_29";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m4a13_29",
		nextPage: "#m4a13_30"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m4a13_32.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a13_32");
	}
});


Template.m4a13_32.events({

	"click .pagination": function (evt) {
		$.k2l.m4a13_32.draggedElement = {};
		$.k2l.m4a13_32.counter = 0;
	}
});

Template.m4a13_32.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a13_32 == 'undefined') {
		$.k2l.m4a13_32 = {};
	};

	$.k2l.m4a13_32.draggedElement = {};
	$.k2l.m4a13_32.counter = 0;

	// $.k2l.m4a13_32.max = 1; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m4a13_32";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m4a13_32",
		nextPage: "#m4a13_end"
	};
	initDragDrop(selector, dragDropAmount, options);
}
