Template.mod8_idioms_OP.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#mod8_idioms_OP");
	}
})

Template.mod8_idioms_OP.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.mod8_idioms_OP.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.mod8_idioms_OP.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.mod8_idioms_OP.sound.src = {};
	}

});

Template.mod8_idioms_OP.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.mod8_idioms_OP == 'undefined') {
		$.k2l.mod8_idioms_OP = {};
	};

	$.k2l.mod8_idioms_OP.sound = new Audio();
}