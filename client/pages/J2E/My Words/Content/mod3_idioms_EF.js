Template.mod3_idioms_EF.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#mod3_idioms_EF");
	}
})

Template.mod3_idioms_EF.events({


	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.mod3_idioms_EF.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.mod3_idioms_EF.sound, $(evt.currentTarget));
		var video = $('video').get(0);
		if(video.currentTime != 0 && !video.paused)
		  video.pause();	 
	},

	'click .pagination': function (evt) {

		$.k2l.mod3_idioms_EF.sound.src = {};
	},

	'play .videoplayer, playing .videoplayer': function (evt) {
		$.k2l.mod3_idioms_EF.sound.pause();
		$('.buttonaudio').removeClass('is-playing');
	}

});

Template.mod3_idioms_EF.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.mod3_idioms_EF == 'undefined') {
		$.k2l.mod3_idioms_EF = {};
	};

	$.k2l.mod3_idioms_EF.sound = new Audio();
}