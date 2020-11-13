Template.m1a16.rendered = function() {

	document.title = "Journey 2 English";
	
	setStartActivity(1, 16);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(1, 16, subpage);
			oldLocation = location.href;
		}
	}, 500);
};


Template.m1a16.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m1a16_end') { 
			return false; 
		}		return true;	 
  	}
});


Template.m1a16.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 1, 16, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m1a16.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


Template.m1a16_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m1a16_2"); 
	} 
}); 
 
Template.m1a16_2.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m1a16_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m1a16_2.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m1a16_2.sound.src = {};
	}

});

Template.m1a16_2.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m1a16_2 == 'undefined') {
		$.k2l.m1a16_2 = {};
	};
	
	$.k2l.m1a16_2.sound = new Audio();
}

Template.m1a16_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m1a16_3"); 
	} 
}); 
 
Template.m1a16_3.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m1a16_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m1a16_3.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m1a16_3.sound.src = {};
	}

});

Template.m1a16_3.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m1a16_3 == 'undefined') {
		$.k2l.m1a16_3 = {};
	};
	
	$.k2l.m1a16_3.sound = new Audio();
}

Template.m1a16_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m1a16_4"); 
	} 
}); 
 
Template.m1a16_4.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m1a16_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m1a16_4.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m1a16_4.sound.src = {};
	}

});

Template.m1a16_4.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m1a16_4 == 'undefined') {
		$.k2l.m1a16_4 = {};
	};
	
	$.k2l.m1a16_4.sound = new Audio();
}

Template.m1a16_5.helpers({
})

Template.m1a16_5.events({
	
	"click .numbutt": function (evt) {
		$.k2l.m1a16_5.index = evt.currentTarget.id;
		$("#textDisplay").html($.k2l.m1a16_5.audio_phrases[$.k2l.m1a16_5.index].phrase);
		$("#m1a16Sen").html($(evt.currentTarget).html());
		if($.k2l.m1a16_5.sound != undefined){
			$.k2l.m1a16_5.sound.src = {};
			resetAllAudioButtons();
		}
	},
	
	"click .buttonaudio": function (evt){
		$(evt.currentTarget).attr('data-audiosrc', "audio/module1/a16/" + $.k2l.m1a16_5.audio_phrases[$.k2l.m1a16_5.index].audioFile);
		audioButtonClickSetup($.k2l.m1a16_5.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m1a16_5.sound, $(evt.currentTarget));
	},

	"click .pagination": function (evt){
		if($.k2l.m1a16_5.sound != undefined){
			$.k2l.m1a16_5.sound.src = {};
			resetAllAudioButtons();
		}
	}
})

Template.m1a16_5.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	}
	if (typeof $.k2l.m1a16_5 == 'undefined') {
		$.k2l.m1a16_5 = {};
	};

	$.k2l.m1a16_5.index = 0;
	
	
	var audio_phrases = [
			{audioFile:"licence.m4a", phrase: "<span class='grammar'>li</span>cence"},
			{audioFile:"guitar.m4a", phrase:"gui<span class='grammar'>tar</span>"},
			{audioFile:"laptop.m4a", phrase:"<span class='grammar'>lap</span>top"},
			{audioFile:"appear.m4a", phrase:"app<span class='grammar'>ear</span>"},
			{audioFile:"jacket.m4a", phrase:"<span class='grammar'>ja</span>cket"},
			{audioFile:"enjoy.m4a", phrase:"en<span class='grammar'>joy</span>"},
			{audioFile:"driving.m4a", phrase:"<span class='grammar'>dri</span>ving"},
			{audioFile:"perhaps.m4a", phrase:"per<span class='grammar'>haps</span>"},
			{audioFile:"mobile.m4a", phrase:"<span class='grammar'>mo</span>bile"},
			{audioFile:"sincere.m4a", phrase:"sin<span class='grammar'>cere</span>"}
		]
		
	$.k2l.m1a16_5.audio_phrases = audio_phrases;
	$.k2l.m1a16_5.sound = new Audio();
}

Template.m1a16_6.helpers({
})

Template.m1a16_6.events({
	
	"click .numbutt": function (evt) {
		$.k2l.m1a16_6.index = evt.currentTarget.id;
		$("#textDisplay2").html($.k2l.m1a16_6.audio_phrases[$.k2l.m1a16_6.index].phrase);
		$("#m1a16Sen2").html($(evt.currentTarget).html());
		if($.k2l.m1a16_5.sound != undefined){
			$.k2l.m1a16_5.sound.src = {};
			resetAllAudioButtons();
		}
	},
	
	"click .buttonaudio": function (evt){
		$(evt.currentTarget).attr('data-audiosrc', "audio/module1/a16/" + $.k2l.m1a16_6.audio_phrases[$.k2l.m1a16_6.index].audioFile);
		audioButtonClickSetup($.k2l.m1a16_6.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m1a16_6.sound, $(evt.currentTarget));
	},

	"click .pagination": function (evt){
		if($.k2l.m1a16_6.sound != undefined){
			$.k2l.m1a16_6.sound.src = {};
			resetAllAudioButtons();
		}
	}
})

Template.m1a16_6.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	}
	if (typeof $.k2l.m1a16_6 == 'undefined') {
		$.k2l.m1a16_6 = {};
	};
	
	if (typeof $.k2l.m1a16_6 == 'undefined') {
		$.k2l.m1a16_6 = {};
	};
	
	$.k2l.m1a16_6.index = 0;
	
	
	var audio_phrases = [
			{audioFile:"festival.m4a", phrase: "<span class='grammar'>fes</span>tival"},
			{audioFile:"develop.m4a", phrase:"de<span class='grammar'>ve</span>lop"},
			{audioFile:"paragraph.m4a", phrase:"<span class='grammar'>par</span>agraph"},
			{audioFile:"tomato.m4a", phrase:"to<span class='grammar'>ma</span>to"},
			{audioFile:"corridor.m4a", phrase:"<span class='grammar'>co</span>rridor"},
			{audioFile:"advantage.m4a", phrase:"ad<span class='grammar'>van</span>tage"},
			{audioFile:"fortunate.m4a", phrase:"<span class='grammar'>for</span>tunate"},
			{audioFile:"important.m4a", phrase:"im<span class='grammar'>por</span>tant"},
			{audioFile:"camera.m4a", phrase:"<span class='grammar'>ca</span>mera"},
			{audioFile:"entertain.m4a", phrase:"enter<span class='grammar'>tain</span>"}
		]
		
	$.k2l.m1a16_6.audio_phrases = audio_phrases;
	$.k2l.m1a16_6.sound = new Audio();
}

Template.m1a16_7.helpers({
})

Template.m1a16_7.events({
	
	"click .numbutt": function (evt) {
		$.k2l.m1a16_7.index =evt.currentTarget.id;
		$("#textDisplay3").html($.k2l.m1a16_7.audio_phrases[$.k2l.m1a16_7.index].phrase);
		$("#m1a16Sen3").html($(evt.currentTarget).html());
		if($.k2l.m1a16_5.sound != undefined){
			$.k2l.m1a16_5.sound.src = {};
			resetAllAudioButtons();
		}
	},
	
	"click .buttonaudio": function (evt){
		$(evt.currentTarget).attr('data-audiosrc', "audio/module1/a16/" + $.k2l.m1a16_7.audio_phrases[$.k2l.m1a16_7.index].audioFile);
		audioButtonClickSetup($.k2l.m1a16_7.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m1a16_7.sound, $(evt.currentTarget));
	},

	"click .pagination": function (evt){
		if($.k2l.m1a16_7.sound != undefined){
			$.k2l.m1a16_7.sound.src = {};
			resetAllAudioButtons();
		}
	}

})

Template.m1a16_7.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	}
	if (typeof $.k2l.m1a16_7 == 'undefined') {
		$.k2l.m1a16_7 = {};
	};
	
	if (typeof $.k2l.m1a16_7 == 'undefined') {
		$.k2l.m1a16_7 = {};
	};
	
	$.k2l.m1a16_7.index = 0;
	
	
	var audio_phrases = [
			{audioFile:"escalator.m4a", phrase: "<span class='grammar'>esc</span>alator"},
			{audioFile:"celebration.m4a", phrase:"cele<span class='grammar'>bra</span>tion"},
			{audioFile:"fertilizer.m4a", phrase:"<span class='grammar'>fer</span>tilizer"},
			{audioFile:"occupation.m4a", phrase:"occu<span class='grammar'>pa</span>tion"},
			{audioFile:"centimetre.m4a", phrase:"<span class='grammar'>cen</span>timetre"},
			{audioFile:"american.m4a", phrase:"A<span class='grammar'>mer</span>ican"},
			{audioFile:"dictionary.m4a", phrase:"<span class='grammar'>dic</span>tionary"},
			{audioFile:"discovery.m4a", phrase:"dis<span class='grammar'>cov</span>ery"},
			{audioFile:"organiser.m4a", phrase:"<span class='grammar'>or</span>ganiser"},
			{audioFile:"information.m4a", phrase:"infor<span class='grammar'>ma</span>tion"}
		]
		
	$.k2l.m1a16_7.audio_phrases = audio_phrases;
	$.k2l.m1a16_7.sound = new Audio();
}
