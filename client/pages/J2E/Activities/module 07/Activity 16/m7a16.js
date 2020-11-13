Template.m7a16.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m7a16_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m7a16.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(7, 16);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(7, 16, subpage);
			oldLocation = location.href;
		}
	}, 500);

}
Template.m7a16_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a16_1"); 
	} 
}); 
 
Template.m7a16_1.events({

	"click .pagination": function(evt){
		$.k2l.m7a16_1.draggedElement = {};
		$.k2l.m7a16_1.counter = 0;
	}
});

Template.m7a16_1.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a16_1 == 'undefined') {
		$.k2l.m7a16_1 = {};
	};
	
	$.k2l.m7a16_1.draggedElement = {};
	$.k2l.m7a16_1.counter = 0;

	// $.k2l.m7a16_1.max = 4; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m7a16_1";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a16_1",
		nextPage: "#m7a16_2"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m7a16_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a16_2"); 
	} 
}); 
 
Template.m7a16_2.events({

	"click .pagination": function(evt){
		$.k2l.m7a16_2.draggedElement = {};
		$.k2l.m7a16_2.counter = 0;
	}
});

Template.m7a16_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a16_2 == 'undefined') {
		$.k2l.m7a16_2 = {};
	};
	
	$.k2l.m7a16_2.draggedElement = {};
	$.k2l.m7a16_2.counter = 0;

	// $.k2l.m7a16_2.max = 4; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m7a16_2";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a16_2",
		nextPage: "#m7a16_3"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m7a16_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a16_3"); 
	} 
}); 
 
Template.m7a16_3.events({

	"click .pagination": function(evt){
		$.k2l.m7a16_3.draggedElement = {};
		$.k2l.m7a16_3.counter = 0;
	}
});

Template.m7a16_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a16_3 == 'undefined') {
		$.k2l.m7a16_3 = {};
	};
	
	$.k2l.m7a16_3.draggedElement = {};
	$.k2l.m7a16_3.counter = 0;

	// $.k2l.m7a16_3.max = 3; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m7a16_3";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a16_3",
		nextPage: "#m7a16_4"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m7a16_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a16_4"); 
	} 
}); 
 
Template.m7a16_4.events({

	"click .pagination": function(evt){
		$.k2l.m7a16_4.draggedElement = {};
		$.k2l.m7a16_4.counter = 0;
	}
});

Template.m7a16_4.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a16_4 == 'undefined') {
		$.k2l.m7a16_4 = {};
	};
	
	$.k2l.m7a16_4.draggedElement = {};
	$.k2l.m7a16_4.counter = 0;

	// $.k2l.m7a16_4.max = 2; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m7a16_4";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a16_4",
		nextPage: "#m7a16_5"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m7a16_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a16_5"); 
	} 
}); 
 
Template.m7a16_5.events({

	"click .pagination": function(evt){
		$.k2l.m7a16_5.draggedElement = {};
		$.k2l.m7a16_5.counter = 0;
	}
});

Template.m7a16_5.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a16_5 == 'undefined') {
		$.k2l.m7a16_5 = {};
	};
	
	$.k2l.m7a16_5.draggedElement = {};
	$.k2l.m7a16_5.counter = 0;

	// $.k2l.m7a16_5.max = 2; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m7a16_5";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a16_5",
		nextPage: "#m7a16_6"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m7a16_6.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a16_6"); 
	} 
}); 
 
Template.m7a16_6.events({

	"click .pagination": function(evt){
		$.k2l.m7a16_6.draggedElement = {};
		$.k2l.m7a16_6.counter = 0;
	}
});

Template.m7a16_6.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a16_6 == 'undefined') {
		$.k2l.m7a16_6 = {};
	};
	
	$.k2l.m7a16_6.draggedElement = {};
	$.k2l.m7a16_6.counter = 0;

	// $.k2l.m7a16_6.max = 3; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m7a16_6";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a16_6",
		nextPage: "#m7a16_end"
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m7a16.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 7, 16, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m7a16.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
