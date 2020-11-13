Template.mod4_idioms_GH.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#mod4_idioms_GH");
	}
})

Template.mod4_idioms_GH.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.mod4_idioms_GH.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.mod4_idioms_GH.sound, $(evt.currentTarget));
		$("video").each(function(){
			$(this).get(0).pause();
		});
	},

	'click .pagination': function (evt) {

		$.k2l.mod4_idioms_GH.sound.src = {};
	},

	'playing .mod4_idioms_vid1': function (evt) {
		$.k2l.mod4_idioms_GH.sound.pause();
	   	$('.buttonaudio').removeClass('is-playing');
	   	$(".mod4_idioms_vid2").get(0).pause();
	},

	'playing .mod4_idioms_vid2': function (evt) {
		$.k2l.mod4_idioms_GH.sound.pause();
		$('.buttonaudio').resmoveClass('is-playing');
		$(".mod4_idioms_vid1").get(0).pause();
   	},

});

Template.mod4_idioms_GH.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.mod4_idioms_GH == 'undefined') {
		$.k2l.mod4_idioms_GH = {};
	};

	$.k2l.mod4_idioms_GH.sound = new Audio();
}