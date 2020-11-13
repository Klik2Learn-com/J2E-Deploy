Template.m1a18.events({
	
	"click .buttonaudioc": function(evt) {
		var eventId = $(evt.currentTarget).attr('id');
		
		for (var i = 0; i < $.k2l.m1a18.id_audio_map.length; i++) {
			if ($.k2l.m1a18.id_audio_map[i].id == eventId){
				$(evt.currentTarget).attr('data-audiosrc', "/audio/module1/a18/" + $.k2l.m1a18.id_audio_map[i].audioFile);
				audioButtonClickSetup($.k2l.m1a18.sound, $(evt.currentTarget));
				playPauseAudio($.k2l.m1a18.sound, $(evt.currentTarget));
				
				break;
			}
		}
	},

	"click .buttonaudio": function(evt) {
		var eventId = $(evt.currentTarget).attr('id');
		
		for (var i = 0; i < $.k2l.m1a18.id_audio_map.length; i++) {
			if ($.k2l.m1a18.id_audio_map[i].id == eventId){
				$(evt.currentTarget).attr('data-audiosrc', "/audio/module1/a18/" + $.k2l.m1a18.id_audio_map[i].audioFile);
				audioButtonClickSetup($.k2l.m1a18.sound, $(evt.currentTarget));
				playPauseAudio($.k2l.m1a18.sound, $(evt.currentTarget));
				
				break;
			}
		}
	},
	
	"click .pagination": function(evt) {
		$.k2l.m1a18.sound.pause();
		$.k2l.m1a18.sound.currentTime = 0;
	}
});

Template.m1a18.rendered = function() {

	document.title = "Journey 2 English";
	
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m1a18 == 'undefined') {
		$.k2l.m1a18 = {};
	};
	
	$.k2l.m1a18.sound = new Audio();
	
	var id_audio_map = [
				{id:"stereo1", audioFile:"stereotype1.m4a"},
				{id:"stereo2", audioFile:"stereotype2.m4a"},
				{id:"stereo3", audioFile:"stereotype3.m4a"},
				{id:"stereo4", audioFile:"stereotype_article.m4a"}
			];
			
	$.k2l.m1a18.id_audio_map = id_audio_map;
	setStartActivity(1, 18);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(1, 18, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m1a18.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m1a18_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m1a18.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 1, 18, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m1a18.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
