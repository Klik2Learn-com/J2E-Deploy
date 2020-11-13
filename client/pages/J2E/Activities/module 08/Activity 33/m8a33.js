Template.m8a33.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m8a33_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m8a33.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(8,33);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 33, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m8a33.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 33, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a33.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m8a33_2.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m8a33_2");
	}
})

Template.m8a33_2.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m8a33_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a33_2.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m8a33_2.sound.src = {};
	}

});

Template.m8a33_2.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a33_2 == 'undefined') {
		$.k2l.m8a33_2 = {};
	};
	
	$.k2l.m8a33_2.sound = new Audio();
}

Template.m8a33_1.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m8a33_1");
	}
})

Template.m8a33_1.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m8a33_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a33_1.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m8a33_1.sound.src = {};
	}

});

Template.m8a33_1.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a33_1 == 'undefined') {
		$.k2l.m8a33_1 = {};
	};
	
	$.k2l.m8a33_1.sound = new Audio();
}
