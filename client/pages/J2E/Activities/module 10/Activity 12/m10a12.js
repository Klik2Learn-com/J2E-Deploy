Template.m10a12.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m10a12_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m10a12.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(10,12);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(10, 12, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m10a12.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 10, 12, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m10a12.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m10a12_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a12_2"); 
	} 
}); 

Template.m10a12_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a12_2 == 'undefined') {
		$.k2l.m10a12_2 = {};
	};
	
	var dragDropAmount = 3;
	var selector = "#m10a12_2";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m10a12_2",
		nextPage: "#m10a12_3",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a12_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a12_3 == 'undefined') {
		$.k2l.m10a12_3 = {};
	};
	
	var dragDropAmount = 3;
	var selector = "#m10a12_3";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m10a12_3",
		nextPage: "#m10a12_4",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a12_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a12_3"); 
	} 
}); 

Template.m10a12_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a12_3 == 'undefined') {
		$.k2l.m10a12_3 = {};
	};
	
	var dragDropAmount = 3;
	var selector = "#m10a12_3";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m10a12_3",
		nextPage: "#m10a12_end",
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m10a12_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a12_1"); 
	} 
}); 
