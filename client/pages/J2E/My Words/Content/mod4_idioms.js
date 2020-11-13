Template.mod4_idioms.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#mod4_idioms");
	}
})

Template.mod4_idioms.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.mod4_idioms.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.mod4_idioms.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.mod4_idioms.sound.src = {};
	}

});

Template.mod4_idioms.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.mod4_idioms == 'undefined') {
		$.k2l.mod4_idioms = {};
	};

	$.k2l.mod4_idioms.sound = new Audio();
}