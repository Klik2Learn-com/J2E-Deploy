Template.mod7_idioms_MN.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#mod7_idioms_MN");
	}
})

Template.mod7_idioms_MN.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.mod7_idioms_MN.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.mod7_idioms_MN.sound, $(evt.currentTarget));
		var video = $('video').get(0);
		if(video.currentTime != 0 && !video.paused)
		  video.pause();   
	},

	'click .pagination': function (evt) {
		$.k2l.mod7_idioms_MN.sound.src = {};
	},

	'play .videoplayer, playing .videoplayer': function (evt) {
		$.k2l.mod7_idioms_MN.sound.src = {};
		$('.buttonaudio').removeClass('is-playing');
	 
	}
	

});

Template.mod7_idioms_MN.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.mod7_idioms_MN == 'undefined') {
		$.k2l.mod7_idioms_MN = {};
	};

	$.k2l.mod7_idioms_MN.sound = new Audio();

}