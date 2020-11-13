Template.m6a16.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m6a16_end') {
			return false;
		}
		return true;
	}
});

Template.m6a16.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(6, 16);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(6, 16, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m6a16.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 6, 16, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m6a16.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m6a16_2.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 6;
	var selector = "#m6a16_2";
	var options = {
		multiAns: true
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m6a16_3.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 6;
	var selector = "#m6a16_3";
	var options = {
		multiAns: true
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m6a16_4.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m6a16_4";
	var options = {
		multiAns: true
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m6a16_2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a16_2");
	}
});

Template.m6a16_3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a16_3");
	}
});

Template.m6a16_4.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a16_4");
	}
});