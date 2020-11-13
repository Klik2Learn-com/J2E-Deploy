Template.mod8_idioms.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#mod8_idioms");
	}
})

Template.mod8_idioms.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.mod8_idioms.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.mod8_idioms.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {
		$.k2l.mod8_idioms.sound.src = {};
	}

});

Template.mod8_idioms.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.mod8_idioms == 'undefined') {
		$.k2l.mod8_idioms = {};
	};

	$.k2l.mod8_idioms.sound = new Audio();
}