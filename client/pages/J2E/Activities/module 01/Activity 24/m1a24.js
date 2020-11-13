Template.m1a24.rendered = function() {

	document.title = "Journey 2 English";
	
	setStartActivity(1, 24);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(1, 24, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m1a24.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m1a24_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m1a24.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 1, 24, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m1a24.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m1a24_1.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m1a24_1");
	}
})

Template.m1a24_1.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m1a24_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m1a24_1.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m1a24_1.sound.src = {};
	}

});

Template.m1a24_1.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m1a24_1 == 'undefined') {
		$.k2l.m1a24_1 = {};
	};
	
	$.k2l.m1a24_1.sound = new Audio();
}

Template.m1a24_2.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m1a24_2");
	}
})

Template.m1a24_2.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m1a24_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m1a24_2.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m1a24_2.sound.src = {};
	}

});

Template.m1a24_2.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m1a24_2 == 'undefined') {
		$.k2l.m1a24_2 = {};
	};
	
	$.k2l.m1a24_2.sound = new Audio();
}
