Template.m1Game_e_20.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1Game_e_20");
	}
});


Template.m1Game_e_20.events({

	"click .button2": function (evt) {
		evt.preventDefault();

		if ($.k2l.m1Game_e_20.allowClick == true) {
			$.k2l.m1Game_e_20.allowClick = false;

			var answer = $.k2l.m1Game_e_20.answer_index[0];
			if ($('#' + answer).is(":checked")) {
				// 	 assessment = true;
				// }
				// 	if ($(evt.currentTarget).attr('id') == $.k2l.m1Game_e_20.answer_index[$.k2l.m1Game_e_20.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m1Game_e_20.index++
				var scoreCorrect = Session.get('Easy_Correct');
				scoreCorrect++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout(function () {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
					$('.correctscreen').addClass('hidden');
				}, 1000);
				setTimeout(function () {
					$('#welldonecap').removeClass('hidden');
				}, 1000);

				setTimeout(function () {
					if ($.k2l.m1Game_e_20.index > $.k2l.m1Game_e_20.answer_index.length) {
						$.k2l.m1Game_e_20.index = 0;
					}
					Session.set('Easy_Correct', scoreCorrect);
					$('#welldonecap').addClass('hidden');
					$.k2l.m1Game_e_20.sound.src = {};
					$.k2l.m1Game_e_20.allowClick = true; // Make the buttons clickable again
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
				}, 2000);
				// $('.pagination').removeClass('hidden');
			} else {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m1Game_e_20.index++
				var scoreIncorrect = Session.get('Easy_Incorrect');
				scoreIncorrect++
				// Correct
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
					$('.correctscreen').addClass('hidden');
				}, 1000);


				setTimeout(function () {
					if ($.k2l.m1Game_e_20.index > $.k2l.m1Game_e_20.answer_index.length) {
						$.k2l.m1Game_e_20.index = 0;
					}
					Session.set('Easy_Incorrect', scoreIncorrect);
					$.k2l.m1Game_e_20.sound.src = {};
					$.k2l.m1Game_e_20.allowClick = true; // Make the buttons clickable again
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
				}, 2000);
			}
		}

	},

	'click .buttonaudio': function (evt) {
		$.k2l.m1Game_e_20.sound.src = $(evt.currentTarget).attr('data-audiosrc');
		addSpinner($.k2l.m1Game_e_20.sound, $(evt.currentTarget));
		$.k2l.m1Game_e_20.sound.play();
	},

	'click .pagination': function (evt) {
		$.k2l.m1Game_e_20.index = 0;
		$.k2l.m1Game_e_20.allowClick = true;
	}

});

Template.m1Game_e_20.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1Game_e_20 == 'undefined') {
		$.k2l.m1Game_e_20 = {};
	};

	var answer_index = ["msg1"];

	$.k2l.m1Game_e_20.answer_index = answer_index;
	$.k2l.m1Game_e_20.index = 0;
	$.k2l.m1Game_e_20.sound = new Audio();

	$.k2l.m1Game_e_20.allowClick = true;
}