Template.m1Game_h_16.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1Game_h_16");
	}
});

Template.m1Game_h_16.events({

	"click .speech1": function (evt) {
		evt.preventDefault();

		if ($.k2l.m1Game_h_16.allowClick == true) {
			$.k2l.m1Game_h_16.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m1Game_h_16.answer_index[$.k2l.m1Game_h_16.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m1Game_h_16.index++
				var scoreCorrect = Session.get('Hard_Correct');
				scoreCorrect++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout(function () {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
					$('.correctscreen').addClass('hidden');
					Session.set('Hard_Correct', scoreCorrect);
					if ($.k2l.m1Game_h_16.index > $.k2l.m1Game_h_16.answer_index.length - 1) {
						setTimeout(function () {
							$.k2l.m1Game_h_16.index = 0;
							$.k2l.m1Game_h_16.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
							$(parentSection).next('section').removeClass('hidden');// reveal next page.
							document.location.hash = $(parentSection).next('section').attr('id');
							Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
						}, 1000);
					} else {
						$.k2l.m1Game_h_16.allowClick = true;
						// $('.instruction').html($.k2l.m1Game_h_16.questions[$.k2l.m1Game_h_16.index]);
						// $('#a').html($.k2l.m1Game_h_16.answers[$.k2l.m1Game_h_16.index][0]);
						// $('#b').html($.k2l.m1Game_h_16.answers[$.k2l.m1Game_h_16.index][1]);
						// $('#c').html($.k2l.m1Game_h_16.answers[$.k2l.m1Game_h_16.index][2]);	
					}
				}, 1000);
				// if ($.k2l.m1Game_h_16.index > $.k2l.m1Game_h_16.answer_index.length -1) {
				// 			setTimeout(function() {
				// 			$.k2l.m1Game_h_16.index = 0;
				// 			$.k2l.m1Game_h_16.allowClick = true;
				// 			$(parentSection).addClass('hidden'); // hide this page
				// 		$(parentSection).next('section').removeClass('hidden');// reveal next page.
				// 		document.location.hash = $(parentSection).next('section').attr('id');
				// 		Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
				// 	}, 1000);
				// 		} else {
				// 			$.k2l.m1Game_h_16.allowClick = true;
				// $('.instruction').html($.k2l.m1Game_h_16.questions[$.k2l.m1Game_h_16.index]);
				// $('#a').html($.k2l.m1Game_h_16.answers[$.k2l.m1Game_h_16.index][0]);
				// $('#b').html($.k2l.m1Game_h_16.answers[$.k2l.m1Game_h_16.index][1]);
				// $('#c').html($.k2l.m1Game_h_16.answers[$.k2l.m1Game_h_16.index][2]);	
				// }



				// $.k2l.m1Game_h_16.allowClick = true; // Make the buttons clickable again

				// $('.pagination').removeClass('hidden');
			} else {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m1Game_h_16.index++
				var scoreIncorrect = Session.get('Hard_Incorrect');
				scoreIncorrect++
				// Wrong
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
					$('.correctscreen').addClass('hidden');
					Session.set('Hard_Incorrect', scoreIncorrect);
					if ($.k2l.m1Game_h_16.index > $.k2l.m1Game_h_16.answer_index.length - 1) {
						setTimeout(function () {
							$.k2l.m1Game_h_16.index = 0;
							$.k2l.m1Game_h_16.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
							$(parentSection).next('section').removeClass('hidden');// reveal next page.
							document.location.hash = $(parentSection).next('section').attr('id');
							Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
						}, 1000);
					} else {
						$.k2l.m1Game_h_16.allowClick = true;
						// $('.instruction').html($.k2l.m1Game_h_16.questions[$.k2l.m1Game_h_16.index]);
						// $('#a').html($.k2l.m1Game_h_16.answers[$.k2l.m1Game_h_16.index][0]);
						// $('#b').html($.k2l.m1Game_h_16.answers[$.k2l.m1Game_h_16.index][1]);
						// $('#c').html($.k2l.m1Game_h_16.answers[$.k2l.m1Game_h_16.index][2]);	
					}
				}, 1000);
			}
		}

	},

	// 'click .buttonaudio': function(evt) {
	// 	$.k2l.m1Game_h_16.sound.src = $(evt.currentTarget).attr('data-audiosrc');
	// 	$.k2l.m1Game_h_16.sound.play();
	// },

	'click .pagination': function (evt) {
		$.k2l.m1Game_h_16.index = 0;
		$.k2l.m1Game_h_16.allowClick = true;
	}

});

Template.m1Game_h_16.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1Game_h_16 == 'undefined') {
		$.k2l.m1Game_h_16 = {};
	};

	$.k2l.m1Game_h_16.sound = new Audio();

	// var questions = ["Q1) Where is Elle going?",
	// 				 "Q2) Where is Tu going?",
	// 				 "Q3) Where is K going?"];

	// var answers = [ ["Downstairs","Upstairs","The garden"],
	// 				["The kitchen","The music room","Outside"],
	// 				["The garden","The kitchen","Upstairs"]
	// 				]


	var answer_index = ["b"];

	// $.k2l.m1Game_h_16.questions = questions;
	// $.k2l.m1Game_h_16.answers = answers;
	$.k2l.m1Game_h_16.answer_index = answer_index;
	$.k2l.m1Game_h_16.index = 0;

	$.k2l.m1Game_h_16.allowClick = true;
}