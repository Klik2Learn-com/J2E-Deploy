

Template.m5a23.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m5a23_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m5a23.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(5, 23);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(5, 23, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m5a23.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 5, 23, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m5a23.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m5a23_1.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m5a23_1");
	}
})

Template.m5a23_1.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m5a23_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m5a23_1.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m5a23_1.sound.src = {};
	}

});

Template.m5a23_1.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m5a23_1 == 'undefined') {
		$.k2l.m5a23_1 = {};
	};
	
	$.k2l.m5a23_1.sound = new Audio();
}

Template.m5a23_2.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m5a23_2");
	}
})

Template.m5a23_2.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m5a23_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m5a23_2.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m5a23_2.sound.src = {};
	}

});

Template.m5a23_2.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m5a23_2 == 'undefined') {
		$.k2l.m5a23_2 = {};
	};
	
	$.k2l.m5a23_2.sound = new Audio();
}
	
