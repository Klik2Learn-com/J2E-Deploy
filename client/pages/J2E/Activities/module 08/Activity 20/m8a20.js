Template.m8a20.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m8a20_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m8a20.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(8,20);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 20, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m8a20.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 20, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a20.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m8a20_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a20_3"); 
	} 
}); 
 
Template.m8a20_3.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m8a20_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a20_3.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m8a20_3.sound.src = {};
	}

});

Template.m8a20_3.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a20_3 == 'undefined') {
		$.k2l.m8a20_3 = {};
	};
	
	$.k2l.m8a20_3.sound = new Audio();
}

Template.m8a20_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a20_2"); 
	} 
}); 
 
Template.m8a20_2.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m8a20_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a20_2.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m8a20_2.sound.src = {};
	}

});

Template.m8a20_2.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a20_2 == 'undefined') {
		$.k2l.m8a20_2 = {};
	};
	
	$.k2l.m8a20_2.sound = new Audio();
}

Template.m8a20_6.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a20_6"); 
	} 
}); 
 
Template.m8a20_6.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m8a20_6.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a20_6.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m8a20_6.sound.src = {};
	}

});

Template.m8a20_6.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a20_6 == 'undefined') {
		$.k2l.m8a20_6 = {};
	};
	
	$.k2l.m8a20_6.sound = new Audio();
}

Template.m8a20_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a20_4"); 
	} 
}); 
 
Template.m8a20_4.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m8a20_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a20_4.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m8a20_4.sound.src = {};
	}

});

Template.m8a20_4.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a20_4 == 'undefined') {
		$.k2l.m8a20_4 = {};
	};
	
	$.k2l.m8a20_4.sound = new Audio();
}

Template.m8a20_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a20_1"); 
	} 
}); 
 
Template.m8a20_1.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m8a20_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a20_1.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m8a20_1.sound.src = {};
	}

});

Template.m8a20_1.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a20_1 == 'undefined') {
		$.k2l.m8a20_1 = {};
	};
	
	$.k2l.m8a20_1.sound = new Audio();
}

Template.m8a20_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a20_5"); 
	} 
}); 
 
Template.m8a20_5.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m8a20_5.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a20_5.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m8a20_5.sound.src = {};
	}

});

Template.m8a20_5.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a20_5 == 'undefined') {
		$.k2l.m8a20_5 = {};
	};
	
	$.k2l.m8a20_5.sound = new Audio();
}
