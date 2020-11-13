Template.m7a23.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m7a23_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m7a23.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(7, 23);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(7, 23, subpage);
			oldLocation = location.href;
		}
	}, 500);

}
Template.m7a23_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a23_1"); 
	} 
}); 
 
Template.m7a23_1.events({

	"click .pagination": function(evt){
		$.k2l.m7a23_1.draggedElement = {};
		$.k2l.m7a23_1.counter = 0;
	}
});

Template.m7a23_1.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a23_1 == 'undefined') {
		$.k2l.m7a23_1 = {};
	};
	
	$.k2l.m7a23_1.draggedElement = {};
	$.k2l.m7a23_1.counter = 0;

	// $.k2l.m7a23_1.max = 3; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m7a23_1";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a23_1",
		nextPage: "#m7a23_2"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m7a23_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a23_2"); 
	} 
}); 
 
Template.m7a23_2.events({

	"click .pagination": function(evt){
		$.k2l.m7a23_2.draggedElement = {};
		$.k2l.m7a23_2.counter = 0;
	}
});

Template.m7a23_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a23_2 == 'undefined') {
		$.k2l.m7a23_2 = {};
	};
	
	$.k2l.m7a23_2.draggedElement = {};
	$.k2l.m7a23_2.counter = 0;

	// $.k2l.m7a23_2.max = 2; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m7a23_2";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a23_2",
		nextPage: "#m7a23_3"
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m7a23.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 7, 23, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m7a23.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
