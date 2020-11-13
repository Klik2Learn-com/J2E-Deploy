Template.m7a17.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m7a17_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m7a17.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(7, 17);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(7, 17, subpage);
			oldLocation = location.href;
		}
	}, 500);

}
Template.m7a17_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a17_2"); 
	} 
}); 
 
Template.m7a17_2.events({ 
 
}); 
 
Template.m7a17_2.rendered = function() {
}

Template.m7a17_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a17_3"); 
	} 
}); 
 
Template.m7a17_3.events({

	"click .pagination": function(evt){
		$.k2l.m7a17_3.draggedElement = {};
		$.k2l.m7a17_3.counter = 0;
	}
});

Template.m7a17_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a17_3 == 'undefined') {
		$.k2l.m7a17_3 = {};
	};
	
	$.k2l.m7a17_3.draggedElement = {};
	$.k2l.m7a17_3.counter = 0;

	// $.k2l.m7a17_3.max = 6; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 6;
	var selector = "#m7a17_3";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a17_3",
		nextPage: "#m7a17_4"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m7a17_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a17_4"); 
	} 
}); 
 
Template.m7a17_4.events({

	"click .pagination": function(evt){
		$.k2l.m7a17_4.draggedElement = {};
		$.k2l.m7a17_4.counter = 0;
	}
});

Template.m7a17_4.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a17_4 == 'undefined') {
		$.k2l.m7a17_4 = {};
	};
	
	$.k2l.m7a17_4.draggedElement = {};
	$.k2l.m7a17_4.counter = 0;

	// $.k2l.m7a17_4.max = 6; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 6;
	var selector = "#m7a17_4";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a17_4",
		nextPage: "#m7a17_end"
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m7a17.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 7, 17, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m7a17.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
