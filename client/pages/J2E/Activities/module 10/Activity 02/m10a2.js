Template.m10a2.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m10a2_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m10a2.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(10,2);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(10, 2, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m10a2.events({
	"click .pagination": function(evt){
		$('#welldonecap').addClass('hidden');
	}
});

Template.m10a2.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 10, 2, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m10a2.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m10a2_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a2_1"); 
	} 
}); 

Template.m10a2_1.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a2_1 == 'undefined') {
		$.k2l.m10a2_1 = {};
	};
	
	var dragDropAmount = 1;
	var selector = "#m10a2_1";
	var options = {
		multiAns: false,
		autoNav : false,
		currPage: "#m10a2_1",
		nextPage: "#m10a2_2",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a2_13.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a2_13"); 
	} 
}); 


Template.m10a2_13.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a2_13 == 'undefined') {
		$.k2l.m10a2_13 = {};
	};
	
	var dragDropAmount = 1;
	var selector = "#m10a2_13";
	var options = {
		multiAns: false,
		autoNav : false,
		currPage: "#m10a2_13",
		nextPage: "#m10a2_14",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a2_14.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a2_14"); 
	} 
}); 

Template.m10a2_14.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a2_14 == 'undefined') {
		$.k2l.m10a2_14 = {};
	};
	
	var dragDropAmount = 1;
	var selector = "#m10a2_14";
	var options = {
		multiAns: false,
		autoNav : false,
		currPage: "#m10a2_14",
		nextPage: "#m10a2_15",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a2_15.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a2_15"); 
	} 
}); 

Template.m10a2_15.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a2_15 == 'undefined') {
		$.k2l.m10a2_15 = {};
	};
	
	var dragDropAmount = 1;
	var selector = "#m10a2_15";
	var options = {
		multiAns: false,
		autoNav : false,
		currPage: "#m10a2_15",
		nextPage: "#m10a2_16",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a2_16.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a2_16"); 
	} 
}); 

Template.m10a2_16.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a2_16 == 'undefined') {
		$.k2l.m10a2_16 = {};
	};
	
	var dragDropAmount = 1;
	var selector = "#m10a2_16";
	var options = {
		multiAns: false,
		autoNav : false,
		currPage: "#m10a2_16",
		nextPage: "#m10a2_17",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a2_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a2_2"); 
	} 
}); 

Template.m10a2_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a2_2 == 'undefined') {
		$.k2l.m10a2_2 = {};
	};
	
	var dragDropAmount = 1;
	var selector = "#m10a2_2";
	var options = {
		multiAns: false,
		autoNav : false,
		currPage: "#m10a2_2",
		nextPage: "#m10a2_3",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a2_9.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a2_9"); 
	} 
}); 

Template.m10a2_9.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a2_9 == 'undefined') {
		$.k2l.m10a2_9 = {};
	};
	
	var dragDropAmount = 1;
	var selector = "#m10a2_9";
	var options = {
		multiAns: false,
		autoNav : false,
		currPage: "#m10a2_9",
		nextPage: "#m10a2_10",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a2_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a2_5"); 
	} 
}); 

Template.m10a2_5.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a2_5 == 'undefined') {
		$.k2l.m10a2_5 = {};
	};
	
	var dragDropAmount = 1;
	var selector = "#m10a2_5";
	var options = {
		multiAns: false,
		autoNav : false,
		currPage: "#m10a2_5",
		nextPage: "#m10a2_6",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a2_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a2_4"); 
	} 
}); 

Template.m10a2_4.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a2_4 == 'undefined') {
		$.k2l.m10a2_4 = {};
	};
	
	var dragDropAmount = 1;
	var selector = "#m10a2_4";
	var options = {
		multiAns: false,
		autoNav : false,
		currPage: "#m10a2_4",
		nextPage: "#m10a2_5",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a2_10.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a2_10"); 
	} 
}); 

Template.m10a2_10.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a2_10 == 'undefined') {
		$.k2l.m10a2_10 = {};
	};
	
	var dragDropAmount = 1;
	var selector = "#m10a2_10";
	var options = {
		multiAns: false,
		autoNav : false,
		currPage: "#m10a2_10",
		nextPage: "#m10a2_11",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a2_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a2_3"); 
	} 
}); 

Template.m10a2_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a2_3 == 'undefined') {
		$.k2l.m10a2_3 = {};
	};
	
	var dragDropAmount = 1;
	var selector = "#m10a2_3";
	var options = {
		multiAns: false,
		autoNav : false,
		currPage: "#m10a2_3",
		nextPage: "#m10a2_4",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a2_8.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a2_8"); 
	} 
}); 

Template.m10a2_8.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a2_8 == 'undefined') {
		$.k2l.m10a2_8 = {};
	};
	
	var dragDropAmount = 1;
	var selector = "#m10a2_8";
	var options = {
		multiAns: false,
		autoNav : false,
		currPage: "#m10a2_8",
		nextPage: "#m10a2_9",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a2_6.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a2_6"); 
	} 
}); 

Template.m10a2_6.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a2_6 == 'undefined') {
		$.k2l.m10a2_6 = {};
	};
	
	var dragDropAmount = 1;
	var selector = "#m10a2_6";
	var options = {
		multiAns: false,
		autoNav : false,
		currPage: "#m10a2_6",
		nextPage: "#m10a2_7",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a2_11.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a2_11"); 
	} 
}); 

Template.m10a2_11.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a2_11 == 'undefined') {
		$.k2l.m10a2_11 = {};
	};
	
	var dragDropAmount = 1;
	var selector = "#m10a2_11";
	var options = {
		multiAns: false,
		autoNav : false,
		currPage: "#m10a2_11",
		nextPage: "#m10a2_12",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a2_12.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a2_12"); 
	} 
}); 

Template.m10a2_12.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a2_12 == 'undefined') {
		$.k2l.m10a2_12 = {};
	};
	
	var dragDropAmount = 1;
	var selector = "#m10a2_12";
	var options = {
		multiAns: false,
		autoNav : false,
		currPage: "#m10a2_12",
		nextPage: "#m10a2_13",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a2_7.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a2_7"); 
	} 
}); 

Template.m10a2_7.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a2_7 == 'undefined') {
		$.k2l.m10a2_7 = {};
	};
	
	var dragDropAmount = 1;
	var selector = "#m10a2_7";
	var options = {
		multiAns: false,
		autoNav : false,
		currPage: "#m10a2_7",
		nextPage: "#m10a2_8",
	};
	initDragDrop(selector, dragDropAmount, options);
}
