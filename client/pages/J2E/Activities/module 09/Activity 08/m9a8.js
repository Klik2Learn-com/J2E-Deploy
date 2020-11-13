Template.m9a8.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m9a8_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m9a8.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(9,8);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(9, 8, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m9a8.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 9, 8, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m9a8.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m9a8_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a8_2"); 
	} 
}); 
 
Template.m9a8_2.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m9a8_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m9a8_2.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m9a8_2.sound.src = {};
	}

});

Template.m9a8_2.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m9a8_2 == 'undefined') {
		$.k2l.m9a8_2 = {};
	};
	
	$.k2l.m9a8_2.sound = new Audio();
}

Template.m9a8_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a8_3"); 
	} 
}); 
 
Template.m9a8_3.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m9a8_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m9a8_3.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m9a8_3.sound.src = {};
	}

});

Template.m9a8_3.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m9a8_3 == 'undefined') {
		$.k2l.m9a8_3 = {};
	};
	
	$.k2l.m9a8_3.sound = new Audio();
}
