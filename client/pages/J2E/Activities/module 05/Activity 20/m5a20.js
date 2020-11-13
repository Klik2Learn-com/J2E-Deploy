Template.m5a20.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m5a20_end') {
			return false;
		} return true;
	}
});

Template.m5a20.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(5, 20);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(5, 20, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m5a20.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 5, 20, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m5a20.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m5a20_2.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m5a20_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m5a20_2.sound, $(evt.currentTarget));
	},

	"click .pagination": function (evt) {
		$.k2l.m5a20_2.sound.src = {};
	}
});

Template.m5a20_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m5a20_2 == 'undefined') {
		$.k2l.m5a20_2 = {};
	};

	$.k2l.m5a20_2.sound = new Audio();

	// Add drag and drop
	var dragDropAmount = 8;
	var selector = "#m5a20_2";
	var options = {
		multiAns: true
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a20_2.helpers({
	
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a20_2");
	}

});


Template.m5a20_3.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m5a20_3");
	}
})

Template.m5a20_3.events({

	'click .button1': function (evt) {
		;
		audioButtonClickSetup($.k2l.m5a20_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m5a20_3.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m5a20_3.sound.src = {};
	}

});

Template.m5a20_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m5a20_3 == 'undefined') {
		$.k2l.m5a20_3 = {};
	};

	$.k2l.m5a20_3.sound = new Audio();
}
