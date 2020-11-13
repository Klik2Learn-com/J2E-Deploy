Template.m7a2.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m7a2_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m7a2.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(7, 2);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(7, 2, subpage);
			oldLocation = location.href;
		}
	}, 500);

}
Template.m7a2_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a2_1"); 
	} 
}); 
 
Template.m7a2_1.events({ 
 
}); 
 
Template.m7a2_1.rendered = function() {
}

Template.m7a2_2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a2_2");
	}
});

Template.m7a2_2.events({

	"click .pagination": function(evt){
		$.k2l.m7a2_2.draggedElement = {};
		$.k2l.m7a2_2.counter = 0;
	}
});

Template.m7a2_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a2_2 == 'undefined') {
		$.k2l.m7a2_2 = {};
	};
	
	$.k2l.m7a2_2.draggedElement = {};
	$.k2l.m7a2_2.counter = 0;

	// $.k2l.m7a2_2.max = 3; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m7a2_2";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a2_2",
		nextPage: "#m7a2_3"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m7a2_3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a2_3");
	}
});

Template.m7a2_3.events({

	"click .pagination": function(evt){
		$.k2l.m7a2_3.draggedElement = {};
		$.k2l.m7a2_3.counter = 0;
	}
});

Template.m7a2_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a2_3 == 'undefined') {
		$.k2l.m7a2_3 = {};
	};
	
	$.k2l.m7a2_3.draggedElement = {};
	$.k2l.m7a2_3.counter = 0;

	// $.k2l.m7a2_3.max = 4; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m7a2_3";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a2_3",
		nextPage: "#m7a2_4"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m7a2_4.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a2_4");
	}
});

Template.m7a2_4.events({

	"click .pagination": function(evt){
		$.k2l.m7a2_4.draggedElement = {};
		$.k2l.m7a2_4.counter = 0;
	}
});

Template.m7a2_4.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a2_4 == 'undefined') {
		$.k2l.m7a2_4 = {};
	};
	
	$.k2l.m7a2_4.draggedElement = {};
	$.k2l.m7a2_4.counter = 0;

	// $.k2l.m7a2_4.max = 3; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m7a2_4";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a2_4",
		nextPage: "#m7a2_5"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m7a2_5.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a2_5");
	}
});

Template.m7a2_5.events({

	"click .pagination": function(evt){
		$.k2l.m7a2_5.draggedElement = {};
		$.k2l.m7a2_5.counter = 0;
	}
});

Template.m7a2_5.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a2_5 == 'undefined') {
		$.k2l.m7a2_5 = {};
	};
	
	$.k2l.m7a2_5.draggedElement = {};
	$.k2l.m7a2_5.counter = 0;

	// $.k2l.m7a2_5.max = 4; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m7a2_5";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a2_5",
		nextPage: "#m7a2_end"
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m7a2.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 7, 2, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m7a2.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
