Template.m7a22.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m7a22_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m7a22.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(7, 22);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(7, 22, subpage);
			oldLocation = location.href;
		}
	}, 500);

}
Template.m7a22_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a22_3"); 
	} 
}); 
 
Template.m7a22_3.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a22_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a22_3.sound, $(evt.currentTarget));
	}
});

Template.m7a22_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a22_3 == 'undefined') {
		$.k2l.m7a22_3 = {};
	};
	
	$.k2l.m7a22_3.sound = new Audio();
	$.k2l.m7a22_3.draggedElement = {};
	$.k2l.m7a22_3.counter = 0;

	// $.k2l.m7a22_3.max = 5; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m7a22_3";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a22_3",
		nextPage: "#m7a22_4",
		currAudio: $.k2l.m7a22_3.sound
	};
	initDragDrop(selector, dragDropAmount, options);
}



Template.m7a22.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 7, 22, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m7a22.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
