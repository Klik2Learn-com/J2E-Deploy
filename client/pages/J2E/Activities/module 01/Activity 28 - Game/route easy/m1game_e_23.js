Template.m1Game_e_23.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1Game_e_23");
	}
});


Template.m1Game_e_23.events({

	"click .pagination": function (evt) {
		$.k2l.m1Game_e_23.draggedElement = {};
		$.k2l.m1Game_e_23.counter = 0;
	},

	"click #submitButton": function (evt) {
		var scoreCorrect = Session.get('Easy_Correct');
		// var scoreIncorrect = Session.get('m1Game_e_23_Incorrect');

		if ($('#target1').children().html() == '10.30 am') {
			scoreCorrect++;
		}

		if ($('#target2').children().html() == '2 pm') {
			scoreCorrect++;
		}

		if ($('#target3').children().html() == '12 pm') {
			scoreCorrect++;
		}

		if ($('#target4').children().html() == '£5') {
			scoreCorrect++;
		}

		if ($('#target5').children().html() == '£2.50') {
			scoreCorrect++;
		}
		if ($('#target6').children().html() == '£12') {
			scoreCorrect++;
		}
		if ($('#target7').children().html() == '£3.50') {
			scoreCorrect++;
		}

		Session.set('Easy_Correct', scoreCorrect);

		$.k2l.m1Game_e_23.draggedElement = {};
		$.k2l.m1Game_e_23.sound.src = {};
		var parentSection = $(evt.currentTarget).parents('section');
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));

	},

	'click .buttonaudio': function (evt) {
		$.k2l.m1Game_e_23.sound.src = $(evt.currentTarget).attr('data-audiosrc');
		addSpinner($.k2l.m1Game_e_23.sound, $(evt.currentTarget));
		$.k2l.m1Game_e_23.sound.play();
	},

	"click .pagination": function (evt) {
		$.k2l.m1Game_e_23.sound.src = {};
		$.k2l.m1Game_e_23.index = 0;
		$.k2l.m1Game_e_23.wrongcount = 0;
	}

});

Template.m1Game_e_23.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1Game_e_23 == 'undefined') {
		$.k2l.m1Game_e_23 = {};
	};

	$.k2l.m1Game_e_23.draggedElement = {};
	$.k2l.m1Game_e_23.sound = new Audio();

	initDragDropTest("#m1Game_e_23");

}
