Template.m1Game_e_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1Game_e_1");
	}
});

Template.m1Game_e_1.events({

	"click .button1": function (evt) {
		evt.preventDefault();

		if ($.k2l.m1Game_e_1.allowClick == true) {
			$.k2l.m1Game_e_1.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m1Game_e_1.answer_index[$.k2l.m1Game_e_1.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				$.k2l.m1Game_e_1.index++
				scoreCorrect++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout(function () {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
					$('.correctscreen').addClass('hidden');
					Session.set('Easy_Correct', scoreCorrect);
					if ($.k2l.m1Game_e_1.index > $.k2l.m1Game_e_1.answer_index.length - 1) {
						setTimeout(function () {
							$.k2l.m1Game_e_1.sound.src = {};
							$.k2l.m1Game_e_1.index = 0;
							$.k2l.m1Game_e_1.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
							$(parentSection).next('section').removeClass('hidden');// reveal next page.
							document.location.hash = $(parentSection).next('section').attr('id');
							Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
						}, 1000);
					} else {
						$.k2l.m1Game_e_1.allowClick = true;
						$('.instruction:not(.lastQ)').html($.k2l.m1Game_e_1.questions[$.k2l.m1Game_e_1.index]);
						$('#a').html($.k2l.m1Game_e_1.answers[$.k2l.m1Game_e_1.index][0]);
						$('#b').html($.k2l.m1Game_e_1.answers[$.k2l.m1Game_e_1.index][1]);
						$('#c').html($.k2l.m1Game_e_1.answers[$.k2l.m1Game_e_1.index][2]);
					}
				}, 1000);
				// if ($.k2l.m1Game_e_1.index > $.k2l.m1Game_e_1.answer_index.length -1) {
				// 			setTimeout(function() {
				// 			$.k2l.m1Game_e_1.index = 0;
				// 			$.k2l.m1Game_e_1.allowClick = true;
				// 			$(parentSection).addClass('hidden'); // hide this page
				// 		$(parentSection).next('section').removeClass('hidden');// reveal next page.
				// 		document.location.hash = $(parentSection).next('section').attr('id');
				// 		Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
				// 	}, 1000);
				// 		} else {
				// 			$.k2l.m1Game_e_1.allowClick = true;
				// $('.instruction').html($.k2l.m1Game_e_1.questions[$.k2l.m1Game_e_1.index]);
				// $('#a').html($.k2l.m1Game_e_1.answers[$.k2l.m1Game_e_1.index][0]);
				// $('#b').html($.k2l.m1Game_e_1.answers[$.k2l.m1Game_e_1.index][1]);
				// $('#c').html($.k2l.m1Game_e_1.answers[$.k2l.m1Game_e_1.index][2]);	
				// }



				// $.k2l.m1Game_e_1.allowClick = true; // Make the buttons clickable again

				// $('.pagination').removeClass('hidden');
			} else {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m1Game_e_1.index++
				var scoreIncorrect = Session.get('Easy_Incorrect');
				scoreIncorrect++
				// Wrong
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
					$('.correctscreen').addClass('hidden');
					Session.set('Easy_Incorrect', scoreIncorrect);
					if ($.k2l.m1Game_e_1.index > $.k2l.m1Game_e_1.answer_index.length - 1) {
						setTimeout(function () {
							$.k2l.m1Game_e_1.sound.src = {};
							$.k2l.m1Game_e_1.index = 0;
							$.k2l.m1Game_e_1.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
							$(parentSection).next('section').removeClass('hidden');// reveal next page.
							document.location.hash = $(parentSection).next('section').attr('id');
							Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
						}, 1000);
					} else {
						$.k2l.m1Game_e_1.allowClick = true;
						$('.instruction:not(.lastQ)').html($.k2l.m1Game_e_1.questions[$.k2l.m1Game_e_1.index]);
						$('#a').html($.k2l.m1Game_e_1.answers[$.k2l.m1Game_e_1.index][0]);
						$('#b').html($.k2l.m1Game_e_1.answers[$.k2l.m1Game_e_1.index][1]);
						$('#c').html($.k2l.m1Game_e_1.answers[$.k2l.m1Game_e_1.index][2]);
					}
				}, 1000);
			}
		}

	},

	'click .buttonaudio': function (evt) {
		$.k2l.m1Game_e_1.sound.src = $(evt.currentTarget).attr('data-audiosrc');
		addSpinner($.k2l.m1Game_e_1.sound, $(evt.currentTarget));
		$.k2l.m1Game_e_1.sound.play();
	},

	'click .pagination': function (evt) {
		$.k2l.m1Game_e_1.sound.src = {};
		$.k2l.m1Game_e_1.index = 0;
		$.k2l.m1Game_e_1.allowClick = true;
	}

});

Template.m1Game_e_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1Game_e_1 == 'undefined') {
		$.k2l.m1Game_e_1 = {};
	};

	$.k2l.m1Game_e_1.sound = new Audio();

	var questions = ["Q1) Where is Elle going?",
		"Q2) Where is Tu going?",
		"Q3) Where is K going?"];

	var answers = [["The garden", "Upstairs", "The kitchen"],
	["The music room", "Outside", "The kitchen"],
	["The kitchen", "Upstairs", "The garden"]
	]


	var answer_index = ["c", "a", "c"];

	$.k2l.m1Game_e_1.questions = questions;
	$.k2l.m1Game_e_1.answers = answers;
	$.k2l.m1Game_e_1.answer_index = answer_index;
	$.k2l.m1Game_e_1.index = 0;

	$.k2l.m1Game_e_1.allowClick = true;
}