Template.m9a5.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m9a5_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m9a5.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(9,5);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(9, 5, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m9a5.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 9, 5, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m9a5.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m9a5_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a5_3"); 
	} 
}); 

Template.m9a5_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m9a5_3 == 'undefined') {
		$.k2l.m9a5_3 = {};
	};
	
	var dragDropAmount = 6;
	var selector = "#m9a5_3";
	var options = {
		multiAns: true,
		autoNav : true,
		currPage: "#m9a5_3",
		nextPage: "#m9a5_4",
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m9a5_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a5_5"); 
	} 
}); 


Template.m9a5_5.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m9a5_5 == 'undefined') {
		$.k2l.m9a5_5 = {};
	};
	
	var dragDropAmount = 6;
	var selector = "#m9a5_5";
	var options = {
		multiAns: true,
		autoNav : true,
		currPage: "#m9a5_5",
		nextPage: "#m9a5_end",
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m9a5_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a5_4"); 
	} 
}); 
 

Template.m9a5_4.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m9a5_4 == 'undefined') {
		$.k2l.m9a5_4 = {};
	};
	
	var dragDropAmount = 6;
	var selector = "#m9a5_4";
	var options = {
		multiAns: true,
		autoNav : true,
		currPage: "#m9a5_4",
		nextPage: "#m9a5_5",
	};
	initDragDrop(selector, dragDropAmount, options);
}

