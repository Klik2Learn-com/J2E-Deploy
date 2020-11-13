Template.m5a19.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m5a19_end') {
			return false;
		} return true;
	}
});

Template.m5a19.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(5, 19);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(5, 19, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m5a19.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 5, 19, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m5a19.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m5a19_4.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 6;
	var selector = "#m5a19_4";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a19_4.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a19_4");
	}
});

Template.m5a19_5.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m5a19_5");
	}
})

Template.m5a19_5.events({

	'click .buttonaudioc': function (evt) {
		audioButtonClickSetup($.k2l.m5a19_5.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m5a19_5.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m5a19_5.sound.src = {};
	}

});

Template.m5a19_5.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m5a19_5 == 'undefined') {
		$.k2l.m5a19_5 = {};
	};

	$.k2l.m5a19_5.sound = new Audio();
}

Template.m5a19_6.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a19_6");
	}
});

Template.m5a19_6.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m5a19_6";
	var options = {
		multiAns: true
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a19_7.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m5a19_7");
	}
})

Template.m5a19_7.events({

	'click .buttonaudioc': function (evt) {
		audioButtonClickSetup($.k2l.m5a19_7.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m5a19_7.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m5a19_7.sound.src = {};
	}

});

Template.m5a19_7.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m5a19_7 == 'undefined') {
		$.k2l.m5a19_7 = {};
	};

	$.k2l.m5a19_7.sound = new Audio();
}

Template.m5a19_8.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m5a19_8";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a19_8.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a19_8");
	}
});

Template.m5a19_9.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m5a19_9");
	}
})

Template.m5a19_9.events({

	'click .buttonaudioc': function (evt) {
		audioButtonClickSetup($.k2l.m5a19_9.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m5a19_9.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m5a19_9.sound.src = {};
	}

});

Template.m5a19_9.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m5a19_9 == 'undefined') {
		$.k2l.m5a19_9 = {};
	};

	$.k2l.m5a19_9.sound = new Audio();
}

Template.m5a19_10.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m5a19_10";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a19_10.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a19_10");
	}
});

Template.m5a19_11.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m5a19_11");
	}
})

Template.m5a19_11.events({

	'click .buttonaudioc': function (evt) {
		audioButtonClickSetup($.k2l.m5a19_11.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m5a19_11.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m5a19_11.sound.src = {};
	}

});

Template.m5a19_11.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m5a19_11 == 'undefined') {
		$.k2l.m5a19_11 = {};
	};

	$.k2l.m5a19_11.sound = new Audio();
}

Template.m5a19_12.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 7;
	var selector = "#m5a19_12";
	var options = {
		multiAns: true
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a19_12.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a19_12");
	}
});

Template.m5a19_13.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m5a19_13");
	}
})

Template.m5a19_13.events({

	'click .buttonaudioc': function (evt) {
		audioButtonClickSetup($.k2l.m5a19_13.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m5a19_13.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m5a19_13.sound.src = {};
	}

});

Template.m5a19_13.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m5a19_13 == 'undefined') {
		$.k2l.m5a19_13 = {};
	};

	$.k2l.m5a19_13.sound = new Audio();
}

Template.m5a19_14.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m5a19_14";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m5a19_14.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a19_14");
	}
});

Template.m5a19_15.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m5a19_15");
	}
})

Template.m5a19_15.events({

	'click .buttonaudioc': function (evt) {
		audioButtonClickSetup($.k2l.m5a19_15.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m5a19_15.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m5a19_15.sound.src = {};
	}

});

Template.m5a19_15.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m5a19_15 == 'undefined') {
		$.k2l.m5a19_15 = {};
	};

	$.k2l.m5a19_15.sound = new Audio();
}