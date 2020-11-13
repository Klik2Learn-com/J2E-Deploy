Template.m5a22.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m5a22_end') {
			return false;
		} return true;
	}
});

Template.m5a22.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(5, 22);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(5, 22, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m5a22.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 5, 22, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m5a22.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m5a22_1.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m5a22_1");
	}
})

Template.m5a22_1.events({

	'click .pagination': function (evt) {
		$.k2l.mod5_idioms_IJ.sound.src = {};
	}

});

Template.m5a22_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m5a22_1 == 'undefined') {
		$.k2l.m5a22_1 = {};
	};

	$.k2l.m5a22_1.sound = new Audio();
}

Template.m5a22_2.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m5a22_2");
	}
})

Template.m5a22_2.events({

	'click .pagination': function (evt) {
		$.k2l.mod5_idioms.sound.src = {};
	}

});

Template.m5a22_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m5a22_2 == 'undefined') {
		$.k2l.m5a22_2 = {};
	};

	$.k2l.m5a22_2.sound = new Audio();
}

Template.m5a22_3.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m5a22_3";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a22_3.helpers({
	
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a22_3");
	}

});

Template.m5a22_4.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m5a22_4";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a22_4.helpers({
	
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a22_4");
	}

});