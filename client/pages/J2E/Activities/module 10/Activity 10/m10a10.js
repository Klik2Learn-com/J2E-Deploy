Template.m10a10.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m10a10_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m10a10.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(10,10);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(10, 10, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m10a10.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 10, 10, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m10a10.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m10a10_7.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a10_7");
	}
});

Template.m10a10_7.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a10_7 == 'undefined') {
		$.k2l.m10a10_7 = {};
	};
	
	var dragDropAmount = 5;
	var selector = "#m10a10_7";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m10a10_7",
		nextPage: "#m10a10_8",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a10_5.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a10_5");
	}
});

Template.m10a10_5.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a10_5 == 'undefined') {
		$.k2l.m10a10_5 = {};
	};
	
	var dragDropAmount = 5;
	var selector = "#m10a10_5";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m10a10_5",
		nextPage: "#m10a10_6",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a10_3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a10_3");
	}
});

Template.m10a10_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a10_3 == 'undefined') {
		$.k2l.m10a10_3 = {};
	};

	var dragDropAmount = 8;
	var selector = "#m10a10_3";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m10a10_3",
		nextPage: "#m10a10_4",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a10_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a10_1");
	}
});


Template.m10a10_1.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a10_1 == 'undefined') {
		$.k2l.m10a10_1 = {};
	};
	
	var dragDropAmount = 5;
	var selector = "#m10a10_1";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m10a10_1",
		nextPage: "#m10a10_2",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a10_9.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a10_9");
	}
});

Template.m10a10_9.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a10_9 == 'undefined') {
		$.k2l.m10a10_9 = {};
	};
	
	var dragDropAmount = 4;
	var selector = "#m10a10_9";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m10a10_9",
		nextPage: "#m10a10_10",
	};
	initDragDrop(selector, dragDropAmount, options);
}
