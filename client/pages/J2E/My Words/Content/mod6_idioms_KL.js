Template.mod6_idioms_KL.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#mod6_idioms_KL");
	}
})

Template.mod6_idioms_KL.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.mod6_idioms_KL.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.mod6_idioms_KL.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.mod6_idioms_KL.sound.src = {};
	}

});

Template.mod6_idioms_KL.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.mod6_idioms_KL == 'undefined') {
		$.k2l.mod6_idioms_KL = {};
	};

	$.k2l.mod6_idioms_KL.sound = new Audio();
}