Template.mod5_idioms_IJ.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#mod5_idioms_IJ");
	}
})

Template.mod5_idioms_IJ.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.mod5_idioms_IJ.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.mod5_idioms_IJ.sound, $(evt.currentTarget));
	}

});

Template.mod5_idioms_IJ.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.mod5_idioms_IJ == 'undefined') {
		$.k2l.mod5_idioms_IJ = {};
	};

	$.k2l.mod5_idioms_IJ.sound = new Audio();
}