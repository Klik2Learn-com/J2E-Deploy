Template.mod3_idioms.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#mod3_idioms");
	}
})

Template.mod3_idioms.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.mod3_idioms.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.mod3_idioms.sound, $(evt.currentTarget));
		$("video").each(function(){
			$(this).get(0).pause();
		});
	},
	   
	'click .pagination': function (evt) {
		$.k2l.mod3_idioms.sound.src = {};   
	},
	   
	'playing .mod3_idioms_vid1': function (evt) {
		$.k2l.mod3_idioms.sound.pause();
	   	$('.buttonaudio').removeClass('is-playing');
	   	$(".mod3_idioms_vid2").get(0).pause();
	},

	'playing .mod3_idioms_vid2': function (evt) {
		$.k2l.mod3_idioms.sound.pause();
		$('.buttonaudio').removeClass('is-playing');
		$(".mod3_idioms_vid1").get(0).pause();
   	},
	   
});

Template.mod3_idioms.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.mod3_idioms == 'undefined') {
		$.k2l.mod3_idioms = {};
	};

	$.k2l.mod3_idioms.sound = new Audio();
}