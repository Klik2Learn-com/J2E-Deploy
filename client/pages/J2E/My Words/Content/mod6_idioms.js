Template.mod6_idioms.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#mod6_idioms");
	}
})

Template.mod6_idioms.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.mod6_idioms.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.mod6_idioms.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.mod6_idioms.sound.src = {};
	}

});

Template.mod6_idioms.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.mod6_idioms == 'undefined') {
		$.k2l.mod6_idioms = {};
	};

	$.k2l.mod6_idioms.sound = new Audio();
}