Template.m6a7.helpers({
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m6a7_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m6a7.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(6, 7);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(6, 7, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m6a7.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 6, 7, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m6a7.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m6a7_1.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m6a7_1");
	}
})

Template.m6a7_1.events({

	'click .buttonaudioc': function(evt) {
		audioButtonClickSetup($.k2l.m6a7_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m6a7_1.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		$.k2l.m6a7_1.sound.src = {};
	}

});


Template.m6a7_1.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m6a7_1 == 'undefined') {
		$.k2l.m6a7_1 = {};
	};
	
	$.k2l.m6a7_1.sound = new Audio();
}

Template.m6a7_2.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m6a7_2");
	}
})

Template.m6a7_2.events({

	'click .buttonaudioc': function(evt) {
		audioButtonClickSetup($.k2l.m6a7_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m6a7_2.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {		
		$.k2l.m6a7_2.sound.src = {};
	}
	
});

Template.m6a7_2.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m6a7_2 == 'undefined') {
		$.k2l.m6a7_2 = {};
	};
	
	$.k2l.m6a7_2.sound = new Audio();
}

Template.m6a7_3.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m6a7_3");
	}
})

Template.m6a7_3.events({

	'click .buttonaudioc': function(evt) {
		audioButtonClickSetup($.k2l.m6a7_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m6a7_3.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m6a7_3.sound.src = {};
	}

});

Template.m6a7_3.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m6a7_3 == 'undefined') {
		$.k2l.m6a7_3 = {};
	};
	
	$.k2l.m6a7_3.sound = new Audio();
}

Template.m6a7_4.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m6a7_4");
	}
})

Template.m6a7_4.events({

	'click .buttonaudioc': function(evt) {
		audioButtonClickSetup($.k2l.m6a7_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m6a7_4.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m6a7_4.sound.src = {};
	}

});

Template.m6a7_4.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m6a7_4 == 'undefined') {
		$.k2l.m6a7_4 = {};
	};
	
	$.k2l.m6a7_4.sound = new Audio();
}

Template.m6a7_5.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m6a7_5");
	}
})

Template.m6a7_5.events({

	'click .buttonaudioc': function(evt) {
		;
		audioButtonClickSetup($.k2l.m6a7_5.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m6a7_5.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m6a7_5.sound.src = {};
	}

});

Template.m6a7_5.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m6a7_5 == 'undefined') {
		$.k2l.m6a7_5 = {};
	};
	
	$.k2l.m6a7_5.sound = new Audio();
}

Template.m6a7_6.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m6a7_6");
	}
})

Template.m6a7_6.events({

	'click .buttonaudioc': function(evt) {
		;
		audioButtonClickSetup($.k2l.m6a7_6.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m6a7_6.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m6a7_6.sound.src = {};
	}

});

Template.m6a7_6.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m6a7_6 == 'undefined') {
		$.k2l.m6a7_6 = {};
	};
	
	$.k2l.m6a7_6.sound = new Audio();
}

Template.m6a7_7.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m6a7_7");
	}
})

Template.m6a7_7.events({

	'click .buttonaudioc': function(evt) {
		;
		audioButtonClickSetup($.k2l.m6a7_7.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m6a7_7.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m6a7_7.sound.src = {};
	}

});

Template.m6a7_7.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m6a7_7 == 'undefined') {
		$.k2l.m6a7_7 = {};
	};
	
	$.k2l.m6a7_7.sound = new Audio();
}

Template.flappers_modal.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.flappers_modal.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.flappers_modal.sound, $(evt.currentTarget));
		$.k2l.m6a7_1.sound.src = {};
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.flappers_modal.sound.src = {};
	},

	'hide.bs.modal #flappers_modal': function(evt){
		$.k2l.flappers_modal.sound.src = {};
	}

});

Template.flappers_modal.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.flappers_modal == 'undefined') {
		$.k2l.flappers_modal = {};
	};
	
	$.k2l.flappers_modal.sound = new Audio();
}

Template.teddyboys_modal.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.teddyboys_modal.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.teddyboys_modal.sound, $(evt.currentTarget));
		$.k2l.m6a7_2.sound.src = {};
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.teddyboys_modal.sound.src = {};
	},

	'hide.bs.modal #teddyboys_modal': function(evt){
		$.k2l.teddyboys_modal.sound.src = {};
	}

});

Template.teddyboys_modal.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.teddyboys_modal == 'undefined') {
		$.k2l.teddyboys_modal = {};
	};
	
	$.k2l.teddyboys_modal.sound = new Audio();
}

Template.mods_modal.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.mods_modal.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.mods_modal.sound, $(evt.currentTarget));
		$.k2l.m6a7_3.sound.src = {};
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.mods_modal.sound.src = {};
	},

	'hide.bs.modal #mods_modal': function(evt){
		$.k2l.mods_modal.sound.src = {};
	}

});

Template.mods_modal.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.mods_modal == 'undefined') {
		$.k2l.mods_modal = {};
	};
	
	$.k2l.mods_modal.sound = new Audio();
}

Template.skinheads_modal.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.skinheads_modal.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.skinheads_modal.sound, $(evt.currentTarget));
		$.k2l.m6a7_4.sound.src = {};
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.skinheads_modal.sound.src = {};
	},

	'hide.bs.modal #skinheads_modal': function(evt){
		$.k2l.skinheads_modal.sound.src = {};
	}

});

Template.skinheads_modal.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.skinheads_modal == 'undefined') {
		$.k2l.skinheads_modal = {};
	};
	
	$.k2l.skinheads_modal.sound = new Audio();
}

Template.hippies_modal.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.hippies_modal.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.hippies_modal.sound, $(evt.currentTarget));
		$.k2l.m6a7_5.sound.src = {};
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.hippies_modal.sound.src = {};
	},

	'hide.bs.modal #hippies_modal': function(evt){
		$.k2l.hippies_modal.sound.src = {};
	}

});

Template.hippies_modal.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.hippies_modal == 'undefined') {
		$.k2l.hippies_modal = {};
	};
	
	$.k2l.hippies_modal.sound = new Audio();
}


Template.punk_modal.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.punk_modal.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.punk_modal.sound, $(evt.currentTarget));
		$.k2l.m6a7_6.sound.src = {};
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.punk_modal.sound.src = {};
	},

	'hide.bs.modal #punk_modal': function(evt){
		$.k2l.punk_modal.sound.src = {};
	}

});

Template.punk_modal.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.punk_modal == 'undefined') {
		$.k2l.punk_modal = {};
	};
	
	$.k2l.punk_modal.sound = new Audio();
}

Template.goth_modal.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.goth_modal.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.goth_modal.sound, $(evt.currentTarget));
		$.k2l.m6a7_7.sound.src = {};
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.goth_modal.sound.src = {};
	},

	'hide.bs.modal #goth_modal': function(evt){
		$.k2l.goth_modal.sound.src = {};
	}

});

Template.goth_modal.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.goth_modal == 'undefined') {
		$.k2l.goth_modal = {};
	};
	
	$.k2l.goth_modal.sound = new Audio();
}


