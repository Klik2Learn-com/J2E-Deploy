Template.m10a24.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m10a24_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m10a24.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(10,24);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(10, 24, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m10a24.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 10, 24, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m10a24.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m10a24_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a24_1"); 
	} 
}); 

Template.m10a24_1.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a24_1 == 'undefined') {
		$.k2l.m10a24_1 = {};
	};
	
	var dragDropAmount = 3;
	var selector = "#m10a24_1";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m10a24_1",
		nextPage: "#m10a24_2",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a24_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a24_2"); 
	} 
}); 

Template.m10a24_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a24_2 == 'undefined') {
		$.k2l.m10a24_2 = {};
	};
	
	var dragDropAmount = 2;
	var selector = "#m10a24_2";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m10a24_2",
		nextPage: "#m10a24_3",
	};
	initDragDrop(selector, dragDropAmount, options);
}
