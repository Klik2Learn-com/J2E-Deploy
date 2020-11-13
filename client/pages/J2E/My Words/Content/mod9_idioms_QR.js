Template.mod9_idioms_QR.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#mod9_idioms_QR");
	}
})

Template.mod9_idioms_QR.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.mod9_idioms_QR.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.mod9_idioms_QR.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.mod9_idioms_QR.sound.src = {};
	}

});

Template.mod9_idioms_QR.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.mod9_idioms_QR == 'undefined') {
		$.k2l.mod9_idioms_QR = {};
	};

	$.k2l.mod9_idioms_QR.sound = new Audio();
}