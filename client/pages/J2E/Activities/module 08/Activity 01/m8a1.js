Template.m8a1.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(8, 1);
	var oldLocation = location.href;
  	$.locationInterval = setInterval( function() {
    if(location.href != oldLocation) {
      subpage = location.href.split("#")[1];
      setLatestSubPage(8, 1, subpage);
      oldLocation = location.href;
    }
  }, 500);
}

Template.m8a1.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m8a1_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m8a1.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 1, Meteor.userId());
  	Session.set('dirty', true);
  	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a1.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


Template.m8a1_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a1_3"); 
	} 
}); 
 
Template.m8a1_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a1_3 == 'undefined') {
		$.k2l.m8a1_3 = {};
	};

	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m8a1_3";
	var options = {
		multiAns: true,
		autoNav : false,
		currPage: "#m8a1_3",
		nextPage: "#m8a1_4",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m8a1_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a1_5"); 
	} 
}); 

Template.m8a1_5.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a1_5 == 'undefined') {
		$.k2l.m8a1_5 = {};
	};

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m8a1_5";
	var options = {
		multiAns: true,
		autoNav : false,
		currPage: "#m8a1_5",
		nextPage: "#m8a1_6",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m8a1_7.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a1_7"); 
	} 
}); 

Template.m8a1_7.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a1_7 == 'undefined') {
		$.k2l.m8a1_7 = {};
	};
	
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m8a1_7";
	var options = {
		multiAns: true,
		autoNav : false,
		currPage: "#m8a1_7",
		nextPage: "#m8a1_8",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m8a1_9.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a1_9"); 
	} 
}); 

Template.m8a1_9.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a1_9 == 'undefined') {
		$.k2l.m8a1_9 = {};
	};
	
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m8a1_9";
	var options = {
		multiAns: true,
		autoNav : false,
		currPage: "#m8a1_9",
		nextPage: "#m8a1_10",
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m8a1_11.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a1_11"); 
	} 
}); 


Template.m8a1_11.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a1_11 == 'undefined') {
		$.k2l.m8a1_11 = {};
	};
	
	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m8a1_11";
	var options = {
		multiAns: true,
		autoNav : false,
		currPage: "#m8a1_11",
		nextPage: "#m8a1_12",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m8a1_14.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a1_14"); 
	} 
}); 

Template.m8a1_14.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a1_14 == 'undefined') {
		$.k2l.m8a1_14 = {};
	};
	
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m8a1_14";
	var options = {
		multiAns: true,
		autoNav : false,
		currPage: "#m8a1_14",
		nextPage: "#m8a1_15",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m8a1_17.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a1_17"); 
	} 
}); 

Template.m8a1_17.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a1_17 == 'undefined') {
		$.k2l.m8a1_17 = {};
	};
	
	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m8a1_17";
	var options = {
		multiAns: true,
		autoNav : false,
		currPage: "#m8a1_17",
		nextPage: "#m8a1_18",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m8a1_18.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a1_18"); 
	} 
}); 
 
Template.m8a1_18.events({

	'click .button1': function(evt) {
		audioButtonClickSetup($.k2l.m8a1_18.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a1_18.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m8a1_18.sound.src = {};
	}

});

Template.m8a1_18.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a1_18 == 'undefined') {
		$.k2l.m8a1_18 = {};
	};
	
	$.k2l.m8a1_18.sound = new Audio();
}


