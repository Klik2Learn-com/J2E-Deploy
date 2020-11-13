

Template.m4a18.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m4a18_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m4a18.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(4, 18);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 18, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m4a18.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 18, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a18.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m4a18_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a18_1");
	}
});


Template.m4a18_1.events({

	"click .pagination": function(evt){
		$.k2l.m4a18_1.draggedElement = {};
		$.k2l.m4a18_1.counter = 0;
	}
});

Template.m4a18_1.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m4a18_1 == 'undefined') {
		$.k2l.m4a18_1 = {};
	};
	
	$.k2l.m4a18_1.draggedElement = {};
	$.k2l.m4a18_1.counter = 0;

	// $.k2l.m4a18_1.max = 4; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m4a18_1";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m4a18_1",
		nextPage: "#m4a18_2"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m4a18_2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a18_2");
	}
});


Template.m4a18_2.events({

	"click .pagination": function(evt){
		$.k2l.m4a18_2.draggedElement = {};
		$.k2l.m4a18_2.counter = 0;
	}
});

Template.m4a18_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m4a18_2 == 'undefined') {
		$.k2l.m4a18_2 = {};
	};
	
	$.k2l.m4a18_2.draggedElement = {};
	$.k2l.m4a18_2.counter = 0;

	// $.k2l.m4a18_2.max = 4; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m4a18_2";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m4a18_2",
		nextPage: "#m4a18_3"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m4a18_3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a18_3");
	}
});


Template.m4a18_3.events({
	
	"click .pagination": function(evt){
		$.k2l.m4a18_3.draggedElement = {};
		$.k2l.m4a18_3.counter = 0;
	}
});

Template.m4a18_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m4a18_3 == 'undefined') {
		$.k2l.m4a18_3 = {};
	};
	
	$.k2l.m4a18_3.draggedElement = {};
	$.k2l.m4a18_3.counter = 0;

	// $.k2l.m4a18_3.max = 4; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m4a18_3";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m4a18_3",
		nextPage: "#m4a18_end"
	};
	initDragDrop(selector, dragDropAmount, options);
}
