Template.m6a10.helpers({
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m6a10_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m6a10.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(6, 10);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(6, 10, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m6a10.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 6, 10, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m6a10.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m6a10_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m6a10_1"); 
	} 
}); 
 
Template.m6a10_1.events({ 
 
}); 
 
Template.m6a10_1.rendered = function() {
}

Template.m6a10_4.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m6a10_4");
	}
})

Template.m6a10_4.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m6a10_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m6a10_4.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m6a10_4.sound.src = {};
	}

});

Template.m6a10_4.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m6a10_4 == 'undefined') {
		$.k2l.m6a10_4 = {};
	};
	
	$.k2l.m6a10_4.sound = new Audio();
}
