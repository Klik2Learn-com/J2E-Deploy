Template.m10a25.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m10a25_end') {
			return false;
		}
		return true;
	}
});

Template.m10a25.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(10, 25);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(10, 25, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m10a25.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 10, 25, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m10a25.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m10a25_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a25_2");
	}
});

Template.m10a25_2.events({

	'click .pagination': function (evt) {
		$.k2l.mod10_idioms.sound.src = {};
	}

});


Template.m10a25_2.rendered = function () {
}

Template.m10a25_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a25_1");
	}
});

Template.m10a25_1.events({

	'click .pagination': function (evt) {
		$.k2l.mod10_idioms_ST.sound.src = {};
	}

});

Template.m10a25_1.rendered = function () {
}
