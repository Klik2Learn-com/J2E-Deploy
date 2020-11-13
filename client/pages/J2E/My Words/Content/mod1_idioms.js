Template.mod1_idioms.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#mod1_idioms");
	}
})

Template.mod1_idioms.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.mod1_idioms.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.mod1_idioms.sound, $(evt.currentTarget));
		var video = $('video').get(0);
		if(video.currentTime != 0 && !video.paused)
			video.pause();

	},

	'click .pagination': function (evt) {
		$.k2l.mod1_idioms.sound.src = {};
		var video = $('video').get(0);
		video.pause();
		video.currentTime = 0;
	},

	'play video': function (evt) {
		var audio = $.k2l.mod1_idioms.sound;
		if(audio.currentTime != 0 && !audio.paused)
			playPauseAudio(audio, $('.buttonaudio'));
	}

});

Template.mod1_idioms.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.mod1_idioms == 'undefined') {
		$.k2l.mod1_idioms = {};
	};

	$.k2l.mod1_idioms.sound = new Audio();
}