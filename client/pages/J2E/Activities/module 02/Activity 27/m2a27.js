

Template.m2a27.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m2a27_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m2a27.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(2, 27);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 27, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m2a27.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 27, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m2a27.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m2a27_1.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a27_1");
	}
})

Template.m2a27_1.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m2a27_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a27_1.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m2a27_1.sound.src = {};
	}

});

Template.m2a27_1.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m2a27_1 == 'undefined') {
		$.k2l.m2a27_1 = {};
	};
	
	$.k2l.m2a27_1.sound = new Audio();
}

Template.m2a27_2.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a27_2");
	}
})

Template.m2a27_2.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m2a27_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a27_2.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m2a27_2.sound.src = {};
	}

});

Template.m2a27_2.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m2a27_2 == 'undefined') {
		$.k2l.m2a27_2 = {};
	};
	
	$.k2l.m2a27_2.sound = new Audio();
}
