

Template.m3a11.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m3a11_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m3a11.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(3, 11);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(3, 11, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m3a11.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 3, 11, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m3a11.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m3a11_3.helpers({
						activeSection: function(){
							var activeSection = Session.get('activeSection');
							return (activeSection == "#m3a11_3");
						}
					})

					Template.m3a11_3.events({

						'click .buttonaudio': function(evt) {
							audioButtonClickSetup($.k2l.m3a11_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a11_3.sound, $(evt.currentTarget));
						},
						
						'click .pagination': function(evt) {
							
							$.k2l.m3a11_3.sound.src = {};
						}

					});

					Template.m3a11_3.rendered = function() {

						if(typeof $.k2l == 'undefined'){
							$.k2l = {};
						};
						
						if (typeof $.k2l.m3a11_3 == 'undefined') {
							$.k2l.m3a11_3 = {};
						};
						
						$.k2l.m3a11_3.sound = new Audio();
					}

Template.m3a11_4.helpers({
						activeSection: function(){
							var activeSection = Session.get('activeSection');
							return (activeSection == "#m3a11_4");
						}
					})

					Template.m3a11_4.events({

						'click .buttonaudio': function(evt) {
							audioButtonClickSetup($.k2l.m3a11_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a11_4.sound, $(evt.currentTarget));
						},
						
						'click .pagination': function(evt) {
							
							$.k2l.m3a11_4.sound.src = {};
						}

					});

					Template.m3a11_4.rendered = function() {

						if(typeof $.k2l == 'undefined'){
							$.k2l = {};
						};
						
						if (typeof $.k2l.m3a11_4 == 'undefined') {
							$.k2l.m3a11_4 = {};
						};
						
						$.k2l.m3a11_4.sound = new Audio();
					}

Template.m3a11_5.helpers({
						activeSection: function(){
							var activeSection = Session.get('activeSection');
							return (activeSection == "#m3a11_5");
						}
					})

					Template.m3a11_5.events({

						'click .buttonaudio': function(evt) {
							audioButtonClickSetup($.k2l.m3a11_5.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a11_5.sound, $(evt.currentTarget));
						},
						
						'click .pagination': function(evt) {
							
							$.k2l.m3a11_5.sound.src = {};
						}

					});

					Template.m3a11_5.rendered = function() {

						if(typeof $.k2l == 'undefined'){
							$.k2l = {};
						};
						
						if (typeof $.k2l.m3a11_5 == 'undefined') {
							$.k2l.m3a11_5 = {};
						};
						
						$.k2l.m3a11_5.sound = new Audio();
					}

Template.m3a11_6.helpers({
						activeSection: function(){
							var activeSection = Session.get('activeSection');
							return (activeSection == "#m3a11_6");
						}
					})

					Template.m3a11_6.events({

						'click .buttonaudio': function(evt) {
							audioButtonClickSetup($.k2l.m3a11_6.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a11_6.sound, $(evt.currentTarget));
						},
						
						'click .pagination': function(evt) {
							
							$.k2l.m3a11_6.sound.src = {};
						}

					});

					Template.m3a11_6.rendered = function() {

						if(typeof $.k2l == 'undefined'){
							$.k2l = {};
						};
						
						if (typeof $.k2l.m3a11_6 == 'undefined') {
							$.k2l.m3a11_6 = {};
						};
						
						$.k2l.m3a11_6.sound = new Audio();
					}

Template.m3a11_7.helpers({
						activeSection: function(){
							var activeSection = Session.get('activeSection');
							return (activeSection == "#m3a11_7");
						}
					})

					Template.m3a11_7.events({

						'click .buttonaudio': function(evt) {
							audioButtonClickSetup($.k2l.m3a11_7.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a11_7.sound, $(evt.currentTarget));
						},
						
						'click .pagination': function(evt) {
							
							$.k2l.m3a11_7.sound.src = {};
						}

					});

					Template.m3a11_7.rendered = function() {

						if(typeof $.k2l == 'undefined'){
							$.k2l = {};
						};
						
						if (typeof $.k2l.m3a11_7 == 'undefined') {
							$.k2l.m3a11_7 = {};
						};
						
						$.k2l.m3a11_7.sound = new Audio();
					}

Template.m3a11_8.helpers({
						activeSection: function(){
							var activeSection = Session.get('activeSection');
							return (activeSection == "#m3a11_8");
						}
					})

					Template.m3a11_8.events({

						'click .buttonaudio': function(evt) {
							audioButtonClickSetup($.k2l.m3a11_8.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a11_8.sound, $(evt.currentTarget));
						},
						
						'click .pagination': function(evt) {
							
							$.k2l.m3a11_8.sound.src = {};
						}

					});

					Template.m3a11_8.rendered = function() {

						if(typeof $.k2l == 'undefined'){
							$.k2l = {};
						};
						
						if (typeof $.k2l.m3a11_8 == 'undefined') {
							$.k2l.m3a11_8 = {};
						};
						
						$.k2l.m3a11_8.sound = new Audio();
					}

Template.m3a11_9.helpers({
						activeSection: function(){
							var activeSection = Session.get('activeSection');
							return (activeSection == "#m3a11_9");
						}
					})

					Template.m3a11_9.events({

						'click .buttonaudio': function(evt) {
							audioButtonClickSetup($.k2l.m3a11_9.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a11_9.sound, $(evt.currentTarget));
						},
						
						'click .pagination': function(evt) {
							
							$.k2l.m3a11_9.sound.src = {};
						}

					});

					Template.m3a11_9.rendered = function() {

						if(typeof $.k2l == 'undefined'){
							$.k2l = {};
						};
						
						if (typeof $.k2l.m3a11_9 == 'undefined') {
							$.k2l.m3a11_9 = {};
						};
						
						$.k2l.m3a11_9.sound = new Audio();
					}
