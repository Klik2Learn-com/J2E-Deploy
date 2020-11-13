

Template.m4a29.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m4a29_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m4a29.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(4, 29);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 29, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m4a29.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 29, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a29.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m4a29_1.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m4a29_1");
	}
})

Template.m4a29_1.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m4a29_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m4a29_1.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m4a29_1.sound.src = {};
	}

});

Template.m4a29_1.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m4a29_1 == 'undefined') {
		$.k2l.m4a29_1 = {};
	};
	
	$.k2l.m4a29_1.sound = new Audio();
}

Template.m4a29_2.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m4a29_2");
	}
})

Template.m4a29_2.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m4a29_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m4a29_2.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m4a29_2.sound.src = {};
	}

});

Template.m4a29_2.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m4a29_2 == 'undefined') {
		$.k2l.m4a29_2 = {};
	};
	
	$.k2l.m4a29_2.sound = new Audio();
}
