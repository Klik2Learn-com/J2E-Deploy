Template.m3a22.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 3, 22, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m3a22.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(3, 22);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(3, 22, subpage);
			oldLocation = location.href;
		}
	}, 500);


	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a22 == 'undefined') {
		$.k2l.m3a22 = {};
	};

	$.k2l.m3a22.sound = new Audio();
}

Template.m3a22.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m3a22_end') {
			return false;
		}
		return true;
	},

	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a22");
	}
})

Template.m3a22.events({

	'click .buttonaudioc': function (evt) {
		audioButtonClickSetup($.k2l.m3a22.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a22.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {
		$.k2l.m3a22.sound.src = {};
	}
});

Template.m3a22.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m3a22_1.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a22_1");
	}
})

Template.m3a22_2.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a22_2");
	}
})

Template.m3a22_3.rendered = function () {

	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m3a22_3";
	var options = {
		multiAns: false,
		autoNav: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m3a22_3.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a22_3");
	}

});


Template.m3a22_4.rendered = function () {

	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m3a22_4";
	var options = {
		multiAns: false,
		autoNav: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m3a22_4.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a22_4");
	}

});


Template.m3a22_5.rendered = function () {

	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m3a22_5";
	var options = {
		multiAns: false,
		autoNav: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m3a22_5.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a22_5");
	}

});

Template.m3a22_6.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m3a22_6";
	var options = {
		multiAns: false,
		autoNav: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m3a22_6.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a22_6");
	}

});

Template.m3a22_7.rendered = function () {

	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m3a22_7";
	var options = {
		multiAns: false,
		autoNav: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m3a22_7.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a22_7");
	}

});


Template.m3a22_8.rendered = function () {

	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m3a22_8";
	var options = {
		multiAns: false,
		autoNav: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m3a22_8.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a22_8");
	}

});
