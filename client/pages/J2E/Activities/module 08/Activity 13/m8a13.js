Template.m8a13.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m8a13_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m8a13.rendered = function() { 
		document.title = "Journey 2 English";
	
	setStartActivity(8,13);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 13, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}
Template.m8a13_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a13_1"); 
	} 
}); 
 

Template.m8a13_1.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m8a13_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a13_1.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {		
		$.k2l.m8a13_1.sound.src = {};
	}

});

Template.m8a13_1.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a13_1 == 'undefined') {
		$.k2l.m8a13_1 = {};
	};
	
	$.k2l.m8a13_1.sound = new Audio();
};

Template.m8a13_2.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a13_2 == 'undefined') {
		$.k2l.m8a13_2 = {};
	};
	
	$.k2l.m8a13_2.sound = new Audio();
};

Template.m8a13_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a13_2"); 
	} 
});  

Template.m8a13_2.events({

	'click .buttonaudio': function(evt) {
	    // $.k2l.m8a13_2.sound = new Audio();
		audioButtonClickSetup($.k2l.m8a13_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a13_2.sound, $(evt.currentTarget));
	},

	'click .pagination': function(evt) {	
		$.k2l.m8a13_2.sound.src = {};
	}
});


Template.m8a13_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a13_3"); 
	} 
}); 
 
Template.m8a13_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a13_3 == 'undefined') {
		$.k2l.m8a13_3 = {};
	};
	
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m8a13_3";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a13_3",
		nextPage: "#m8a13_4",
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m8a13_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a13_4"); 
	} 
}); 

Template.m8a13_4.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a13_4 == 'undefined') {
		$.k2l.m8a13_4 = {};
	};
		// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m8a13_4";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a13_4",
		nextPage: "#m8a13_5",	
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m8a13_5.helpers({
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a13_5"); 
	} 
}); 

Template.m8a13_5.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a13_5 == 'undefined') {
		$.k2l.m8a13_5 = {};
	};
	
	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m8a13_5";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a13_5",
		nextPage: "#m8a13_end",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m8a13.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 13, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a13.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
