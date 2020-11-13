Template.m2a20.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m2a20_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m2a20.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(2, 20);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 20, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m2a20.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 20, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m2a20.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


Template.m2a20_9.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m2a20_9"); 
	} 
}); 
 
Template.m2a20_9.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m2a20_9.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a20_9.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m2a20_9.sound.src = {};
	}

});

Template.m2a20_9.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m2a20_9 == 'undefined') {
		$.k2l.m2a20_9 = {};
	};
	
	$.k2l.m2a20_9.sound = new Audio();
}