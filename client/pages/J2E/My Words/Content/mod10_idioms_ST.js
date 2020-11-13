Template.mod10_idioms_ST.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#mod10_idioms_ST");
	}
})

Template.mod10_idioms_ST.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.mod10_idioms_ST.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.mod10_idioms_ST.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.mod10_idioms_ST.sound.src = {};
	}

});

Template.mod10_idioms_ST.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.mod10_idioms_ST == 'undefined') {
		$.k2l.mod10_idioms_ST = {};
	};

	$.k2l.mod10_idioms_ST.sound = new Audio();
}