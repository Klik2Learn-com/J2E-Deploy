Template.mod9_idioms.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#mod9_idioms");
	}
})

Template.mod9_idioms.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.mod9_idioms.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.mod9_idioms.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.mod9_idioms.sound.src = {};
	}

});

Template.mod9_idioms.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.mod9_idioms == 'undefined') {
		$.k2l.mod9_idioms = {};
	};

	$.k2l.mod9_idioms.sound = new Audio();
}