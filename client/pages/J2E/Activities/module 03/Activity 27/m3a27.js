

Template.m3a27.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m3a27_end') {
			return false;
		} return true;
	}
});

Template.m3a27.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(3, 27);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(3, 27, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m3a27.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 3, 27, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m3a27.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


Template.m3a27_3.rendered = function () {

	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m3a27_3";
	var options = {
		multiAns: false,
		autoNav: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m3a27_3.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a27_3");
	}

});



Template.m3a27_1.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a27_1");
	}
})

Template.m3a27_1.events({

	'click .pagination': function (evt) {

		$.k2l.mod3_idioms_EF.sound.src = {};
	}

});

Template.m3a27_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a27_1 == 'undefined') {
		$.k2l.m3a27_1 = {};
	};

	$.k2l.m3a27_1.sound = new Audio();
}

Template.m3a27_1.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a27_1");
	}
})

Template.m3a27_2.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a27_2");
	}
})

Template.m3a27_2.events({
	'click .pagination': function (evt) {
		$.k2l.mod3_idioms.sound.src = {};
	}
})