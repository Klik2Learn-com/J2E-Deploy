Template.m8a3.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m8a3_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m8a3.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(8,3);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 3, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m8a3.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 3, Meteor.userId());
 	 Session.set('dirty', true);
  	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a3.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m8a3_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a3_2 == 'undefined') {
		$.k2l.m8a3_2 = {};
	};
	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m8a3_2";
	var options = {
		multiAns: true,
		autoNav : true,
		currPage: "#m8a3_2",
		nextPage: "#m8a3_3",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m8a3_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a3_2"); 
	} 
});


Template.m8a3_3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a3_3");
	}
});

Template.m8a3_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a3_3 == 'undefined') {
		$.k2l.m8a3_3 = {};
	};
	
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m8a3_3";
	var options = {
		multiAns: true,
		autoNav : true,
		currPage: "#m8a3_3",
		nextPage: "#m8a3_4",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m8a3_4.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a3_4 == 'undefined') {
		$.k2l.m8a3_4 = {};
	};
	
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m8a3_4";
	var options = {
		multiAns: true,
		autoNav : true,
		currPage: "#m8a3_4",
		nextPage: "#m8a3_5",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m8a3_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a3_4"); 
	} 
});

Template.m8a3_5.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a3_5 == 'undefined') {
		$.k2l.m8a3_5 = {};
	};
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m8a3_5";
	var options = {
		multiAns: true,
		autoNav : true,
		currPage: "#m8a3_5",
		nextPage: "#m8a3_6",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m8a3_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a3_5"); 
	} 
});

Template.m8a3_6.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a3_6 == 'undefined') {
		$.k2l.m8a3_6 = {};
	};
	
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m8a3_6";
	var options = {
		multiAns: true,
		autoNav : true,
		currPage: "#m8a3_6",
		nextPage: "#m8a3_7",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m8a3_6.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a3_6"); 
	} 
});

Template.m8a3_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a3_1"); 
	} 
});

