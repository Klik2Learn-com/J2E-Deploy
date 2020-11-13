Template.mod5_idioms.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#mod5_idioms");
	}
})

Template.mod5_idioms.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.mod5_idioms.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.mod5_idioms.sound, $(evt.currentTarget));
	}

});

Template.mod5_idioms.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.mod5_idioms == 'undefined') {
		$.k2l.mod5_idioms = {};
	};

	$.k2l.mod5_idioms.sound = new Audio();
}