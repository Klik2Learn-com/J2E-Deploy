Template.m7a11.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m7a11_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m7a11.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(7, 11);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(7, 11, subpage);
			oldLocation = location.href;
		}
	}, 500);

}
Template.m7a11_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a11_2"); 
	} 
}); 
 

Template.m7a11_2.events({

	"click .pagination": function(evt){
		$.k2l.m7a11_2.draggedElement = {};
		$.k2l.m7a11_2.counter = 0;
	}
});

Template.m7a11_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a11_2 == 'undefined') {
		$.k2l.m7a11_2 = {};
	};
	
	$.k2l.m7a11_2.draggedElement = {};
	$.k2l.m7a11_2.counter = 0;

	// $.k2l.m7a11_2.max = 2; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m7a11_2";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a11_2",
		nextPage: "#m7a11_3"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m7a11_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a11_3"); 
	} 
}); 
 

Template.m7a11_3.events({

	"click .pagination": function(evt){
		$.k2l.m7a11_3.draggedElement = {};
		$.k2l.m7a11_3.counter = 0;
	}
});

Template.m7a11_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a11_3 == 'undefined') {
		$.k2l.m7a11_3 = {};
	};
	
	$.k2l.m7a11_3.draggedElement = {};
	$.k2l.m7a11_3.counter = 0;

	// $.k2l.m7a11_3.max = 2; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m7a11_3";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a11_3",
		nextPage: "#m7a11_4"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m7a11_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a11_4"); 
	} 
}); 
 

Template.m7a11_4.events({

	"click .pagination": function(evt){
		$.k2l.m7a11_4.draggedElement = {};
		$.k2l.m7a11_4.counter = 0;
	}
});

Template.m7a11_4.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a11_4 == 'undefined') {
		$.k2l.m7a11_4 = {};
	};
	
	$.k2l.m7a11_4.draggedElement = {};
	$.k2l.m7a11_4.counter = 0;

	// $.k2l.m7a11_4.max = 2; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m7a11_4";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a11_4",
		nextPage: "#m7a11_5"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m7a11_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a11_5"); 
	} 
}); 
 

Template.m7a11_5.events({

	"click .pagination": function(evt){
		$.k2l.m7a11_5.draggedElement = {};
		$.k2l.m7a11_5.counter = 0;
	}
});

Template.m7a11_5.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a11_5 == 'undefined') {
		$.k2l.m7a11_5 = {};
	};
	
	$.k2l.m7a11_5.draggedElement = {};
	$.k2l.m7a11_5.counter = 0;

	// $.k2l.m7a11_5.max = 2; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m7a11_5";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a11_5",
		nextPage: "#m7a11_6"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m7a11_6.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a11_6"); 
	} 
}); 
 

Template.m7a11_6.events({

	"click .pagination": function(evt){
		$.k2l.m7a11_6.draggedElement = {};
		$.k2l.m7a11_6.counter = 0;
	}
});

Template.m7a11_6.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a11_6 == 'undefined') {
		$.k2l.m7a11_6 = {};
	};
	
	$.k2l.m7a11_6.draggedElement = {};
	$.k2l.m7a11_6.counter = 0;

	// $.k2l.m7a11_6.max = 2; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m7a11_6";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a11_6",
		nextPage: "#m7a11_7"
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m7a11.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 7, 11, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m7a11.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
