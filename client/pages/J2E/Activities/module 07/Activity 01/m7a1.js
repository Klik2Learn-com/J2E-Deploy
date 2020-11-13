Template.m7a1.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m7a1_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m7a1.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(7, 1);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(7, 1, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m7a1.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 7, 1, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m7a1.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m7a1_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a1_1"); 
	} 
}); 
 
Template.m7a1_1.events({ 
 'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a1_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a1_1.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m7a1_1.sound.src = {};
	}
}); 
 
Template.m7a1_1.rendered = function() {
if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a1_1 == 'undefined') {
		$.k2l.m7a1_1 = {};
	};
	
	$.k2l.m7a1_1.sound = new Audio();
}


Template.m7a1_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a1_4"); 
	} 
}); 
 
Template.m7a1_4.events({ 
 'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a1_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a1_4.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m7a1_4.sound.src = {};
	}
}); 
 
Template.m7a1_4.rendered = function() {
if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a1_4 == 'undefined') {
		$.k2l.m7a1_4 = {};
	};
	
	$.k2l.m7a1_4.sound = new Audio();
}


Template.m7a1_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a1_3"); 
	} 
}); 
 
Template.m7a1_3.events({ 
 'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a1_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a1_3.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m7a1_3.sound.src = {};
	}
}); 
 
Template.m7a1_3.rendered = function() {
if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a1_3 == 'undefined') {
		$.k2l.m7a1_3 = {};
	};
	
	$.k2l.m7a1_3.sound = new Audio();
}


Template.m7a1_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a1_5"); 
	} 
}); 
 
Template.m7a1_5.events({ 
 'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a1_5.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a1_5.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m7a1_5.sound.src = {};
	}
}); 
 
Template.m7a1_5.rendered = function() {
if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a1_5 == 'undefined') {
		$.k2l.m7a1_5 = {};
	};
	
	$.k2l.m7a1_5.sound = new Audio();
}


Template.m7a1_6.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a1_6"); 
	} 
}); 
 
Template.m7a1_6.events({ 
 'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a1_6.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a1_6.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m7a1_6.sound.src = {};
	}
}); 
 
Template.m7a1_6.rendered = function() {
if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a1_6 == 'undefined') {
		$.k2l.m7a1_6 = {};
	};
	
	$.k2l.m7a1_6.sound = new Audio();
}


Template.m7a1_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a1_2"); 
	} 
}); 
 
Template.m7a1_2.events({ 
 'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a1_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a1_2.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m7a1_2.sound.src = {};
	}
}); 
 
Template.m7a1_2.rendered = function() {
if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a1_2 == 'undefined') {
		$.k2l.m7a1_2 = {};
	};
	
	$.k2l.m7a1_2.sound = new Audio();
}

