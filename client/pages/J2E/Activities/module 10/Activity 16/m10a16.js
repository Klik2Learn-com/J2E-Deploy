Template.m10a16.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m10a16_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m10a16.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(10,16);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(10, 16, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m10a16.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 10, 16, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m10a16.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m10a16_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a16_1"); 
	} 
}); 
 
Template.m10a16_1.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m10a16_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m10a16_1.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m10a16_1.sound.src = {};
	}

});

Template.m10a16_1.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a16_1 == 'undefined') {
		$.k2l.m10a16_1 = {};
	};
	
	$.k2l.m10a16_1.sound = new Audio();
}
