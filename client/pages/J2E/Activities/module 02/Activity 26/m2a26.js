

Template.m2a26.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m2a26_end') {
			return false;
		} return true;
	}
});

Template.m2a26.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(2, 26);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 26, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m2a26.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 26, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m2a26.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m2a26_1.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a26_1");
	}
})

Template.m2a26_1.events({

	'click .pagination': function (evt) {
		$.k2l.mod2_idioms_CD.sound.src = {};
	}

});

Template.m2a26_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a26_1 == 'undefined') {
		$.k2l.m2a26_1 = {};
	};

	$.k2l.m2a26_1.sound = new Audio();
}

Template.m2a26_2.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a26_2");
	}
});

Template.m2a26_2.events({
	'click .pagination': function (evt) {
		$.k2l.mod2_idioms.sound.src = {};
	}
});

Template.m2a26_3.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m2a26_3";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);

}

Template.m2a26_3.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a26_3");
	}

});

