Template.m8a17.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m8a17_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m8a17.rendered = function() { 
		document.title = "Journey 2 English";
	
	setStartActivity(8,17);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 17, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m8a17.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 17, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a17.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m8a17.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m8a17_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m8a17_8.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a17_8"); 
	} 
}); 
 
Template.m8a17_8.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a17_8 == 'undefined') {
		$.k2l.m8a17_8 = {};
	};
	
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m8a17_3";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a17_8",
		nextPage: "#m8a17_9",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m8a17_10.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a17_10"); 
	} 
}); 

Template.m8a17_10.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a17_10 == 'undefined') {
		$.k2l.m8a17_10 = {};
	};
	
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m8a17_10";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a17_10",
		nextPage: "#m8a17_end",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m8a17_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a17_3"); 
	} 
}); 

Template.m8a17_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a17_3 == 'undefined') {
		$.k2l.m8a17_3 = {};
	};
	
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m8a17_3";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a17_3",
		nextPage: "#m8a17_4",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m8a17_9.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a17_9"); 
	} 
}); 

Template.m8a17_9.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a17_9 == 'undefined') {
		$.k2l.m8a17_9 = {};
	};
	
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m8a17_9";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a17_9",
		nextPage: "#m8a17_10",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m8a17_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a17_5"); 
	} 
}); 

Template.m8a17_5.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a17_5 == 'undefined') {
		$.k2l.m8a17_5 = {};
	};
	
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m8a17_5";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a17_5",
		nextPage: "#m8a17_6",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m8a17_7.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a17_7"); 
	} 
}); 

Template.m8a17_7.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a17_7 == 'undefined') {
		$.k2l.m8a17_7 = {};
	};
	
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m8a17_7";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a17_7",
		nextPage: "#m8a17_8",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m8a17_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a17_4"); 
	} 
}); 

Template.m8a17_4.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a17_4 == 'undefined') {
		$.k2l.m8a17_4 = {};
	};
	
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m8a17_4";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a17_4",
		nextPage: "#m8a17_5",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m8a17_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a17_2"); 
	} 
}); 

Template.m8a17_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a17_2 == 'undefined') {
		$.k2l.m8a17_2 = {};
	};
	
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m8a17_2";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a17_2",
		nextPage: "#m8a17_3",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m8a17_6.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a17_6"); 
	} 
}); 
 
Template.m8a17_6.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a17_6 == 'undefined') {
		$.k2l.m8a17_6 = {};
	};
	
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m8a17_6";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a17_6",
		nextPage: "#m8a17_7",
	};
	initDragDrop(selector, dragDropAmount, options);
}
