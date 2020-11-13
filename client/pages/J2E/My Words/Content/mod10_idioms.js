Template.mod10_idioms.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#mod10_idioms");
	}
})

Template.mod10_idioms.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.mod10_idioms.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.mod10_idioms.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.mod10_idioms.sound.src = {};
	}

});

Template.mod10_idioms.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.mod10_idioms == 'undefined') {
		$.k2l.mod10_idioms = {};
	};

	$.k2l.mod10_idioms.sound = new Audio();
}