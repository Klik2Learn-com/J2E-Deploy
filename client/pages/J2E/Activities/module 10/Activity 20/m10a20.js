Template.m10a20.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m10a20_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m10a20.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(10,20);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(10, 20, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m10a20.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 10, 20, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m10a20.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m10a20_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a20_1"); 
	} 
}); 

Template.m10a20_1.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a20_1 == 'undefined') {
		$.k2l.m10a20_1 = {};
	};
	
	var dragDropAmount = 5;
	var selector = "#m10a20_1";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m10a20_1",
		nextPage: "#m10a20_2",
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m10a20_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a20_4"); 
	} 
}); 

Template.m10a20_4.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a20_4 == 'undefined') {
		$.k2l.m10a20_4 = {};
	};
	
	var dragDropAmount = 5;
	var selector = "#m10a20_4";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m10a20_4",
		nextPage: "#m10a20_5",
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m10a20_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a20_5"); 
	} 
}); 

Template.m10a20_5.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a20_5 == 'undefined') {
		$.k2l.m10a20_5 = {};
	};
	
	var dragDropAmount = 6;
	var selector = "#m10a20_5";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m10a20_5",
		nextPage: "#m10a20_end",
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m10a20_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a20_2"); 
	} 
}); 

Template.m10a20_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a20_2 == 'undefined') {
		$.k2l.m10a20_2 = {};
	};
	
	var dragDropAmount = 3;
	var selector = "#m10a20_2";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m10a20_2",
		nextPage: "#m10a20_3",
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m10a20_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a20_3"); 
	} 
}); 

Template.m10a20_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a20_3 == 'undefined') {
		$.k2l.m10a20_3 = {};
	};
	
	var dragDropAmount = 9;
	var selector = "#m10a20_3";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m10a20_3",
		nextPage: "#m10a20_4",
	};
	initDragDrop(selector, dragDropAmount, options);
}

