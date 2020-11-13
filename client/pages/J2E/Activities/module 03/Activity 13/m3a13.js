

Template.m3a13.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m3a13_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m3a13.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(3, 13);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(3, 13, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m3a13.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 3, 13, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m3a13.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m3a13_1.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a13_1");
	}
})

Template.m3a13_1.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m3a13_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a13_1.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m3a13_1.sound.src = {};
	}

});

Template.m3a13_1.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m3a13_1 == 'undefined') {
		$.k2l.m3a13_1 = {};
	};
	
	$.k2l.m3a13_1.sound = new Audio();
}

Template.m3a13_2.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a13_2");
	}
})

Template.m3a13_2.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m3a13_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a13_2.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m3a13_2.sound.src = {};
	}

});

Template.m3a13_2.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m3a13_2 == 'undefined') {
		$.k2l.m3a13_2 = {};
	};
	
	$.k2l.m3a13_2.sound = new Audio();
}

Template.m3a13_3.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a13_3");
	}
})

Template.m3a13_3.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m3a13_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a13_3.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m3a13_3.sound.src = {};
	}

});

Template.m3a13_3.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m3a13_3 == 'undefined') {
		$.k2l.m3a13_3 = {};
	};
	
	$.k2l.m3a13_3.sound = new Audio();
}

Template.m3a13_4.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a13_4");
	}
})

Template.m3a13_4.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m3a13_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a13_4.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m3a13_4.sound.src = {};
	}

});

Template.m3a13_4.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m3a13_4 == 'undefined') {
		$.k2l.m3a13_4 = {};
	};
	
	$.k2l.m3a13_4.sound = new Audio();
}

Template.m3a13_5.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a13_5");
	}
})

Template.m3a13_5.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m3a13_5.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a13_5.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m3a13_5.sound.src = {};
	}

});

Template.m3a13_5.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m3a13_5 == 'undefined') {
		$.k2l.m3a13_5 = {};
	};
	
	$.k2l.m3a13_5.sound = new Audio();
}

Template.m3a13_6.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a13_6");
	}
})

Template.m3a13_6.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m3a13_6.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a13_6.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m3a13_6.sound.src = {};
	}

});

Template.m3a13_6.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m3a13_6 == 'undefined') {
		$.k2l.m3a13_6 = {};
	};
	
	$.k2l.m3a13_6.sound = new Audio();
}

Template.m3a13_7.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a13_7");
	}
})

Template.m3a13_7.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m3a13_7.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a13_7.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m3a13_7.sound.src = {};
	}

});

Template.m3a13_7.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m3a13_7 == 'undefined') {
		$.k2l.m3a13_7 = {};
	};
	
	$.k2l.m3a13_7.sound = new Audio();
}

Template.m3a13_8.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a13_8");
	}
})

Template.m3a13_8.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m3a13_8.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a13_8.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m3a13_8.sound.src = {};
	}

});

Template.m3a13_8.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m3a13_8 == 'undefined') {
		$.k2l.m3a13_8 = {};
	};
	
	$.k2l.m3a13_8.sound = new Audio();
}

Template.m3a13_9.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a13_9");
	}
})

Template.m3a13_9.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m3a13_9.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a13_9.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m3a13_9.sound.src = {};
	}

});

Template.m3a13_9.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m3a13_9 == 'undefined') {
		$.k2l.m3a13_9 = {};
	};
	
	$.k2l.m3a13_9.sound = new Audio();
}
