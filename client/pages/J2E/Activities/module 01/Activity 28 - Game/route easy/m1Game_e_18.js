Template.m1Game_e_18.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1Game_e_18");
	}
});

Template.m1Game_e_18.events({

	'click .buttonaudio': function (evt) {
		$.k2l.m1Game_e_18.sound.src = $(evt.currentTarget).attr('data-audiosrc');
		addSpinner($.k2l.m1Game_e_18.sound, $(evt.currentTarget));
		$.k2l.m1Game_e_18.sound.play();
	},

	'click .pagination': function (evt) {

		$.k2l.m1Game_e_18.sound.src = {};
	}

});

Template.m1Game_e_18.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1Game_e_18 == 'undefined') {
		$.k2l.m1Game_e_18 = {};
	};

	$.k2l.m1Game_e_18.sound = new Audio();
}