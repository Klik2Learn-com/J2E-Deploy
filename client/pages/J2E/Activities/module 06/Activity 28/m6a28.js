

Template.m6a28.helpers({
	endPageSect: function() {
		var session = Session.get('activeSection');
		if (session == '#m6a28_end') {
			return false;
		}		return true;
  }
});


Template.m6a28.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(6, 28);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(6, 28, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m6a28.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 6, 28, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m6a28.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m6a28_1.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m6a28_1");
	}
})

Template.m6a28_1.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m6a28_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m6a28_1.sound, $(evt.currentTarget));
	},

	'click .pagination': function(evt) {

		$.k2l.m6a28_1.sound.src = {};
	}

});

Template.m6a28_1.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m6a28_1 == 'undefined') {
		$.k2l.m6a28_1 = {};
	};

	$.k2l.m6a28_1.sound = new Audio();
}

Template.m6a28_2.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m6a28_2");
	}
})

Template.m6a28_2.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m6a28_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m6a28_2.sound, $(evt.currentTarget));
	},

	'click .pagination': function(evt) {

		$.k2l.m6a28_2.sound.src = {};
	}

});

Template.m6a28_2.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m6a28_2 == 'undefined') {
		$.k2l.m6a28_2 = {};
	};

	$.k2l.m6a28_2.sound = new Audio();
}

