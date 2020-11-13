Template.m8a23.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m8a23_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m8a23.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(8,23);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 23, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m8a23.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 23, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a23.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m8a23_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a23_2"); 
	} 
}); 

Template.m8a23_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a23_2 == 'undefined') {
		$.k2l.m8a23_2 = {};
	};
	
	$.k2l.m8a23_2.draggedElement = {};
	var dragDropAmount = 4;
	var selector = "#m8a23_2";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a23_2",
		nextPage: "#m8a23_3",
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m8a23_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a23_1"); 
	} 
}); 

Template.m8a23_1.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a23_1 == 'undefined') {
		$.k2l.m8a23_1 = {};
	};
	
	$.k2l.m8a23_1.draggedElement = {};
	var dragDropAmount = 5;
	var selector = "#m8a23_1";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a23_1",
		nextPage: "#m8a23_2",
	};
	initDragDrop(selector, dragDropAmount, options);
}

