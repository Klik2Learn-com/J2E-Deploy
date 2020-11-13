Template.m6a20.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m6a20_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m6a20.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(6, 20);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(6, 20, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m6a20.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 6, 20, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m6a20.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m6a20_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m6a20_1"); 
	} 
}); 
 
Template.m6a20_1.events({ 
 
}); 
 
Template.m6a20_1.rendered = function() {
}

Template.m6a20_2.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m6a20_2");
	}
})

Template.m6a20_2.events({

});

Template.m6a20_2.rendered = function() {

}

Template.m6a20_3.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m6a20_3");
	}
})

Template.m6a20_3.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m6a20_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m6a20_3.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m6a20_3.sound.src = {};
	}

});

Template.m6a20_3.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m6a20_3 == 'undefined') {
		$.k2l.m6a20_3 = {};
	};
	
	$.k2l.m6a20_3.sound = new Audio();
}

Template.m6a20_4.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m6a20_4");
	}
})

Template.m6a20_4.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m6a20_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m6a20_4.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m6a20_4.sound.src = {};
	}

});

Template.m6a20_4.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m6a20_4 == 'undefined') {
		$.k2l.m6a20_4 = {};
	};
	
	$.k2l.m6a20_4.sound = new Audio();
}

Template.m6a20_5.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m6a20_5");
	}
})

Template.m6a20_5.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m6a20_5.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m6a20_5.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m6a20_5.sound.src = {};
	}

});

Template.m6a20_5.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m6a20_5 == 'undefined') {
		$.k2l.m6a20_5 = {};
	};
	
	$.k2l.m6a20_5.sound = new Audio();
}
