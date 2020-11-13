Template.m6a5.helpers({
endPageSect: function() {
var session = Session.get('activeSection');
if (session == '#m6a5_end') {
 	return false;
	}
return true;
},

	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m6a5");
	}
})

Template.m6a5.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m6a5.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m6a5.sound, $(evt.currentTarget));
	},

	'click .pagination': function(evt) {

		$.k2l.m6a5.sound.src = {};
	}

});

Template.m6a5.rendered = function() {
		document.title = "Journey 2 English";
	
	setStartActivity(6, 5);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(6, 5, subpage);
			oldLocation = location.href;
		}
	}, 500);

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m6a5 == 'undefined') {
		$.k2l.m6a5 = {};
	};

	$.k2l.m6a5.sound = new Audio();
}



Template.m6a5.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 6, 5, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m6a5.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m6a5_3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a5_3");
	}
});

Template.m6a5_3.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m6a5_3 == 'undefined') {
		$.k2l.m6a5_3 = {};
	};

	$.k2l.m6a5_3.draggedElement = {};
}


Template.m6a5_4.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a5_4");
	}
});

Template.m6a5_4.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m6a5_4 == 'undefined') {
		$.k2l.m6a5_4 = {};
	};

	$.k2l.m6a5_4.draggedElement = {};
}


Template.m6a5_5.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a5_5");
	}
});

Template.m6a5_5.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m6a5_5 == 'undefined') {
		$.k2l.m6a5_5 = {};
	};

	$.k2l.m6a5_5.draggedElement = {};
}

