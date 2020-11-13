Template.m10a14.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m10a14_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m10a14.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(10,14);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(10, 14, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m10a14.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 10, 14, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m10a14.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m10a14_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a14_3"); 
	} 
}); 

Template.m10a14_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a14_3 == 'undefined') {
		$.k2l.m10a14_3 = {};
	};
	
	var dragDropAmount = 5;
	var selector = "#m10a14_3";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m10a14_3",
		nextPage: "#m10a14_4",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a14_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a14_4"); 
	} 
}); 

Template.m10a14_4.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a14_4 == 'undefined') {
		$.k2l.m10a14_4 = {};
	};
	
	var dragDropAmount = 5;
	var selector = "#m10a14_4";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m10a14_4",
		nextPage: "#m10a14_end",
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m10a14_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a14_2"); 
	} 
}); 
