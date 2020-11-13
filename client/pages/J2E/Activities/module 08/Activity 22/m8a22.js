Template.m8a22.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m8a22_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m8a22.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(8,22);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 22, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m8a22.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 22, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a22.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m8a22_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a22_1"); 
	} 
}); 
 
Template.m8a22_1.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a22_1 == 'undefined') {
		$.k2l.m8a22_1 = {};
	};
	
	$.k2l.m8a22_1.draggedElement = {};
	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m8a22_1";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a22_1",
		nextPage: "#m8a22_2",
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m8a22_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a22_3"); 
	} 
}); 
 
Template.m8a22_3.events({ 
 
}); 
 
Template.m8a22_3.rendered = function() {
}

Template.m8a22_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a22_2"); 
	} 
}); 

Template.m8a22_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a22_2 == 'undefined') {
		$.k2l.m8a22_2 = {};
	};
	
	var dragDropAmount = 4;
	var selector = "#m8a22_2";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a22_2",
		nextPage: "#m8a22_3",
	};
	initDragDrop(selector, dragDropAmount, options);
}

