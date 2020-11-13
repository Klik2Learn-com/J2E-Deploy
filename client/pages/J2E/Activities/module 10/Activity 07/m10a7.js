Template.m10a7.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m10a7_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m10a7.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(10,7);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(10, 7, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m10a7.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 10, 7, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m10a7.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


Template.m10a7_2.rendered = function() {
	var dragDropAmount = 5;
	var selector = "#m10a7_2";
	var options = {
		multiAns: true,
		autoNav : true,
		currPage: "#m10a7_2",
		nextPage: "#m10a7_3",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a7_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a7_2");
	}
});

Template.m10a7_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a7_3");
	}
});

Template.m10a7_3.rendered = function() {
	
	var dragDropAmount = 5;
	var selector = "#m10a7_3";
	var options = {
		multiAns: true,
		autoNav : true,
		currPage: "#m10a7_3",
		nextPage: "#m10a7_4",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a7_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a7_4");
	}
});

Template.m10a7_5.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a7_5");
	}
});

Template.m10a7_6.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a7_6");
	}
});

Template.m10a7_6.rendered = function() {
	var dragDropAmount = 5;
	var selector = "#m10a7_6";
	var options = {
		multiAns: true,
		autoNav : true,
		currPage: "#m10a7_6",
		nextPage: "#m10a7_7",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a7_7.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a7_7");
	}
});

Template.m10a7_7.rendered = function() {
	var dragDropAmount = 5;
	var selector = "#m10a7_7";
	var options = {
		multiAns: true,
		autoNav : true,
		currPage: "#m10a7_7",
		nextPage: "#m10a7_8",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a7_8.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a7_8");
	}
});