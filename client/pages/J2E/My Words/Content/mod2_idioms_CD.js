Template.mod2_idioms_CD.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#mod2_idioms_CD");
	}
})

Template.mod2_idioms_CD.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.mod2_idioms_CD.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.mod2_idioms_CD.sound, $(evt.currentTarget));
		var video = $('video').get(0);
		if(video.currentTime != 0 && !video.paused)
		  video.pause();
	 
	},

	'click .pagination': function (evt) {
		$.k2l.mod2_idioms_CD.sound.src = {};
		var video = $('video').get(0);
		video.pause();
		video.currentTime = 0;
	  },
	 
	  'play .videoplayer, playing .videoplayer': function (evt) {
		$.k2l.mod2_idioms_CD.sound.pause();
		$('.buttonaudio').removeClass('is-playing');
	  }

});

Template.mod2_idioms_CD.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.mod2_idioms_CD == 'undefined') {
		$.k2l.mod2_idioms_CD = {};
	};

	$.k2l.mod2_idioms_CD.sound = new Audio();
}