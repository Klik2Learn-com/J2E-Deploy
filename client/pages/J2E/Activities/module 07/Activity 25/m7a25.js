Template.m7a25.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m7a25_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m7a25.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(7, 25);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(7, 25, subpage);
			oldLocation = location.href;
		}
	}, 500);

}
Template.m7a25_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a25_1"); 
	} 
}); 
 
Template.m7a25_1.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a25_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a25_1.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m7a25_1.sound.src = {};
	}

});

Template.m7a25_1.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a25_1 == 'undefined') {
		$.k2l.m7a25_1 = {};
	};
	
	$.k2l.m7a25_1.sound = new Audio();
}


Template.m7a25_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a25_2"); 
	} 
}); 
 
Template.m7a25_2.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a25_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a25_2.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m7a25_2.sound.src = {};
	}

});

Template.m7a25_2.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a25_2 == 'undefined') {
		$.k2l.m7a25_2 = {};
	};
	
	$.k2l.m7a25_2.sound = new Audio();
}



Template.m7a25.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 7, 25, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m7a25.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
