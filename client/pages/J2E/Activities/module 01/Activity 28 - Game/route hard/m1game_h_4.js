Template.m1Game_h_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1Game_h_4");
	}
});


Template.m1Game_h_4.events({

	"click .button2": function (evt) {
		evt.preventDefault();

		if ($.k2l.m1Game_h_4.allowClick == true) {
			$.k2l.m1Game_h_4.allowClick = false;

			var answer = $.k2l.m1Game_h_4.answer_index[0];
			if ($('#' + answer).is(":checked")) {
				// 	 assessment = true;
				// }
				// 	if ($(evt.currentTarget).attr('id') == $.k2l.m1Game_h_4.answer_index[$.k2l.m1Game_h_4.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Hard_Correct');
				scoreCorrect++
				$.k2l.m1Game_h_4.index++
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
					if ($.k2l.m1Game_h_4.index > $.k2l.m1Game_h_4.answer_index.length) {
						$.k2l.m1Game_h_4.index = 0;
					}
					Session.set('Hard_Correct', scoreCorrect);
					$('#welldonecap').addClass('hidden');
					$.k2l.m1Game_h_4.sound.src = {};
					$.k2l.m1Game_h_4.allowClick = true; // Make the buttons clickable again
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
				}, 2000);
				// $('.pagination').removeClass('hidden');
			} else {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m1Game_h_4.index++
				var scoreIncorrect = Session.get('Hard_Incorrect');
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
					if ($.k2l.m1Game_h_4.index > $.k2l.m1Game_h_4.answer_index.length) {
						$.k2l.m1Game_h_4.index = 0;
					}
					$.k2l.m1Game_h_4.sound.src = {};
					Session.set('Hard_Incorrect', scoreIncorrect);
					$.k2l.m1Game_h_4.allowClick = true; // Make the buttons clickable again
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
				}, 2000);
			}
		}

	},

	'click .buttonaudio': function (evt) {
		$.k2l.m1Game_h_4.sound.src = $(evt.currentTarget).attr('data-audiosrc');
		addSpinner($.k2l.m1Game_h_4.sound, $(evt.currentTarget));
		$.k2l.m1Game_h_4.sound.play();
	},

	'click .pagination': function (evt) {
		$.k2l.m1Game_h_4.sound.src = {};
		$.k2l.m1Game_h_4.index = 0;
		$.k2l.m1Game_h_4.allowClick = true;
	}

});

Template.m1Game_h_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1Game_h_4 == 'undefined') {
		$.k2l.m1Game_h_4 = {};
	};

	var answer_index = ["msg3"];

	$.k2l.m1Game_h_4.answer_index = answer_index;
	$.k2l.m1Game_h_4.index = 0;
	$.k2l.m1Game_h_4.sound = new Audio();

	$.k2l.m1Game_h_4.allowClick = true;
}