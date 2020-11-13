Template.m5a4.helpers({
endPageSect: function() {
var session = Session.get('activeSection');
if (session == '#m5a4_end') {
 	return false;
	}
return true;
},

	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m5a4");
	}
})

Template.m5a4.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m5a4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m5a4.sound, $(evt.currentTarget));
	},
	
	'click .button-icon': function(evt) {
		;
		audioButtonClickSetup($.k2l.m5a4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m5a4.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m5a4.sound.src = {};
	}

});

Template.m5a4.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(5, 4);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(5, 4, subpage);
			oldLocation = location.href;
		}
	}, 500);


	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m5a4 == 'undefined') {
		$.k2l.m5a4 = {};
	};
	
	$.k2l.m5a4.sound = new Audio();
}

Template.m5a4.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 5, 4, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m5a4.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m5a4_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a4_1");
	}
});

Template.m5a4_2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a4_2");
	}
});

Template.m5a4_3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a4_3");
	}
});

Template.m5a4_4.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a4_4");
	}
});

Template.m5a4_5.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a4_5");
	}
});

Template.m5a4_6.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a4_6");
	}
});

Template.m5a4_7.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a4_7");
	}
});

Template.m5a4_8.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a4_8");
	}
});

Template.m5a4_9.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a4_9");
	}
});

Template.m5a4_10.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a4_10");
	}
});

Template.m5a4_11.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a4_11");
	}
});

Template.m5a4_12.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a4_12");
	}
});

Template.m5a4_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a4_1");
	}
});

Template.m5a4_13.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a4_13");
	}
});

Template.m5a4_14.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a4_14");
	}
});


