Template.m7a15.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m7a15_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m7a15.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(7, 15);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(7, 15, subpage);
			oldLocation = location.href;
		}
	}, 500);

}
Template.m7a15_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a15_1"); 
	} 
}); 
 
Template.m7a15_1.events({

	'click .buttonaudio': function(evt) { 
		audioButtonClickSetup($.k2l.m7a15_1.sound, $(evt.currentTarget));	 
		playPauseAudio($.k2l.m7a15_1.sound, $(evt.currentTarget));	 
	},	 

	"click .pagination": function(evt){
		$.k2l.m7a15_1.draggedElement = {};
		$.k2l.m7a15_1.counter = 0;
	}
});

Template.m7a15_1.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a15_1 == 'undefined') {
		$.k2l.m7a15_1 = {};
	};
	
	$.k2l.m7a15_1.sound = new Audio();
	$.k2l.m7a15_1.draggedElement = {};
	$.k2l.m7a15_1.counter = 0;

	// $.k2l.m7a15_1.max = 3; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m7a15_1";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a15_1",
		nextPage: "#m7a15_2",
		currAudio: $.k2l.m7a15_1.sound
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m7a15_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a15_2"); 
	} 
}); 
 
Template.m7a15_2.events({

	'click .buttonaudio': function(evt) { 
		audioButtonClickSetup($.k2l.m7a15_2.sound, $(evt.currentTarget));	 
		playPauseAudio($.k2l.m7a15_2.sound, $(evt.currentTarget));	 
	},
	 

	"click .pagination": function(evt){
		$.k2l.m7a15_2.draggedElement = {};
		$.k2l.m7a15_2.counter = 0;
	}
});

Template.m7a15_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a15_2 == 'undefined') {
		$.k2l.m7a15_2 = {};
	};
	
	$.k2l.m7a15_2.sound = new Audio();
	$.k2l.m7a15_2.draggedElement = {};
	$.k2l.m7a15_2.counter = 0;

	// $.k2l.m7a15_2.max = 5; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m7a15_2";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a15_2",
		nextPage: "#m7a15_3",
		currAudio: $.k2l.m7a15_2.sound
	};
	initDragDrop(selector, dragDropAmount, options);
}



Template.m7a15.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 7, 15, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m7a15.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
