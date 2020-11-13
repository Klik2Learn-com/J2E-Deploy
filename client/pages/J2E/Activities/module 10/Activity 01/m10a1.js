Template.m10a1.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m10a1_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m10a1.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(10,1);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(10, 1, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m10a1.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 10, 1, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m10a1.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m10a1_3.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m10a1_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m10a1_3.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m10a1_4.sound.src = {};
	}

});

Template.m10a1_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a1_3"); 
	} 
}); 

Template.m10a1_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a1_3 == 'undefined') {
		$.k2l.m10a1_3 = {};
	};
	$.k2l.m10a1_3.sound = new Audio();
	var dragDropAmount = 3;
	var selector = "#m10a1_3";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m10a1_3",
		nextPage: "#m10a1_4",
		currAudio: $.k2l.m10a1_3.sound
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m10a1_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a1_4"); 
	} 
}); 
 
Template.m10a1_4.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m10a1_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m10a1_4.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m10a1_4.sound.src = {};
	}

});

Template.m10a1_4.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a1_4 == 'undefined') {
		$.k2l.m10a1_4 = {};
	};
	
	$.k2l.m10a1_4.sound = new Audio();
}
