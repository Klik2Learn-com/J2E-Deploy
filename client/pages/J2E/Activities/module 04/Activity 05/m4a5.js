

Template.m4a5.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m4a5_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m4a5.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(4, 5);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 5, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m4a5.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 5, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a5.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m4a5_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a5_1");
	}
});


Template.m4a5_1.events({

	"click .pagination": function(evt){
		$.k2l.m4a5_1.draggedElement = {};
		$.k2l.m4a5_1.counter = 0;
	}
});

Template.m4a5_1.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m4a5_1 == 'undefined') {
		$.k2l.m4a5_1 = {};
	};
	
	$.k2l.m4a5_1.draggedElement = {};
	$.k2l.m4a5_1.counter = 0;

	// $.k2l.m4a5_1.max = 3; // number of drag spaces on this page.
	
	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m4a5_1";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m4a5_1",
		nextPage: "#m4a5_2"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m4a5_2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a5_2");
	}
});


Template.m4a5_2.events({

	"click .pagination": function(evt){
		$.k2l.m4a5_2.draggedElement = {};
		$.k2l.m4a5_2.counter = 0;
	}
});

Template.m4a5_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m4a5_2 == 'undefined') {
		$.k2l.m4a5_2 = {};
	};
	
	$.k2l.m4a5_2.draggedElement = {};
	$.k2l.m4a5_2.counter = 0;

	// $.k2l.m4a5_2.max = 4; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m4a5_2";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m4a5_2",
		nextPage: "#m4a5_3"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m4a5_4.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a5_4");
	}
});


Template.m4a5_4.events({
	
	"click .pagination": function(evt){
		$.k2l.m4a5_4.draggedElement = {};
		$.k2l.m4a5_4.counter = 0;
	}
});

Template.m4a5_4.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m4a5_4 == 'undefined') {
		$.k2l.m4a5_4 = {};
	};
	
	$.k2l.m4a5_4.draggedElement = {};
	$.k2l.m4a5_4.counter = 0;

	// $.k2l.m4a5_4.max = 3; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m4a5_4";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m4a5_4",
		nextPage: "#m4a5_5"
	};
	initDragDrop(selector, dragDropAmount, options);

	
}

Template.m4a5_5.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a5_5");
	}
});


Template.m4a5_5.events({

	"click .pagination": function(evt){
		$.k2l.m4a5_5.draggedElement = {};
		$.k2l.m4a5_5.counter = 0;
	}
});

Template.m4a5_5.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m4a5_5 == 'undefined') {
		$.k2l.m4a5_5 = {};
	};
	
	$.k2l.m4a5_5.draggedElement = {};
	$.k2l.m4a5_5.counter = 0;

	// $.k2l.m4a5_5.max = 4; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m4a5_5";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m4a5_5",
		nextPage: "#m4a5_end"
	};
	initDragDrop(selector, dragDropAmount, options);
}
