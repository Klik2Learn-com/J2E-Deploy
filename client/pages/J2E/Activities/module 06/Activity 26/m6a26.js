Template.m6a26.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m6a26_end') {
			return false;
		}
		return true;
	}
});

Template.m6a26.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(6, 26);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(6, 26, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m6a26.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 6, 26, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m6a26.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m6a26_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a26_1");
	}
});

Template.m6a26_1.events({
	'click .pagination': function (evt) {
		$.k2l.mod6_idioms_KL.sound.src = {};
	}

});

Template.m6a26_2.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m6a26_2");
	}
})

Template.m6a26_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a26_2");
	}
});

Template.m6a26_2.events({

	'click .pagination': function (evt) {
		$.k2l.mod6_idioms.sound.src = {};
	}

});

Template.m6a26_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m6a26_2 == 'undefined') {
		$.k2l.m6a26_2 = {};
	};

	$.k2l.m6a26_2.sound = new Audio();
}

Template.m6a26_2.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m6a26_2");
	}
})

Template.m6a26_3.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m6a26_3";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}