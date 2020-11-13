Template.mod7_idioms.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#mod7_idioms");
	}
})

Template.mod7_idioms.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.mod7_idioms.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.mod7_idioms.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {
		$.k2l.mod7_idioms.sound.src = {};
		alert('Hello');
	}

});

Template.mod7_idioms.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.mod7_idioms == 'undefined') {
		$.k2l.mod7_idioms = {};
	};

	$.k2l.mod7_idioms.sound = new Audio();

}