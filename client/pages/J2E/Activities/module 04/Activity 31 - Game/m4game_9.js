Template.m4Game_9.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4Game_9");
	}
});

Template.m4Game_9.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m4Game_9.allowClick == true) {
			$.k2l.m4Game_9.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m4Game_9.answer_index[$.k2l.m4Game_9.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				$.k2l.m4Game_9.index++
				scoreCorrect++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						Session.set('Easy_Correct', scoreCorrect);
						if ($.k2l.m4Game_9.index > $.k2l.m4Game_9.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m4Game_9.sound.src = {};
							$.k2l.m4Game_9.index = 0;
							$.k2l.m4Game_9.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m4Game_9.allowClick = true;
				// $('.instruction').html($.k2l.m4Game_9.questions[$.k2l.m4Game_9.index]);
				$('#a').html($.k2l.m4Game_9.answers[$.k2l.m4Game_9.index][0]);
				$('#b').html($.k2l.m4Game_9.answers[$.k2l.m4Game_9.index][1]);
				$('#c').html($.k2l.m4Game_9.answers[$.k2l.m4Game_9.index][2]);	
				}
					}, 1000);	
				// if ($.k2l.m4Game_9.index > $.k2l.m4Game_9.answer_index.length -1) {
				// 			setTimeout(function() {
				// 			$.k2l.m4Game_9.index = 0;
				// 			$.k2l.m4Game_9.allowClick = true;
				// 			$(parentSection).addClass('hidden'); // hide this page
				// 		$(parentSection).next('section').removeClass('hidden');// reveal next page.
				// 		document.location.hash = $(parentSection).next('section').attr('id');
				// 		Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
				// 	}, 1000);
				// 		} else {
				// 			$.k2l.m4Game_9.allowClick = true;
				// $('.instruction').html($.k2l.m4Game_9.questions[$.k2l.m4Game_9.index]);
				// $('#a').html($.k2l.m4Game_9.answers[$.k2l.m4Game_9.index][0]);
				// $('#b').html($.k2l.m4Game_9.answers[$.k2l.m4Game_9.index][1]);
				// $('#c').html($.k2l.m4Game_9.answers[$.k2l.m4Game_9.index][2]);	
				// }
					
						

						// $.k2l.m4Game_9.allowClick = true; // Make the buttons clickable again
						
					// $('.pagination').removeClass('hidden');
				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m4Game_9.index++
				var scoreIncorrect = Session.get('Easy_Incorrect');
				scoreIncorrect++
					// Wrong
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						Session.set('Easy_Incorrect', scoreIncorrect);
						if ($.k2l.m4Game_9.index > $.k2l.m4Game_9.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m4Game_9.sound.src = {};
							$.k2l.m4Game_9.index = 0;
							$.k2l.m4Game_9.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m4Game_9.allowClick = true;
				// $('.instruction').html($.k2l.m4Game_9.questions[$.k2l.m4Game_9.index]);
				$('#a').html($.k2l.m4Game_9.answers[$.k2l.m4Game_9.index][0]);
				$('#b').html($.k2l.m4Game_9.answers[$.k2l.m4Game_9.index][1]);
				$('#c').html($.k2l.m4Game_9.answers[$.k2l.m4Game_9.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},

	// 'click .buttonaudio': function(evt) {
	// 	$.k2l.m4Game_9.sound.src = $(evt.currentTarget).attr('data-audiosrc');
	// 	$.k2l.m4Game_9.sound.play();
	// },
	
	'click .pagination': function(evt) {
		// $.k2l.m4Game_9.sound.src = {};
		$.k2l.m4Game_9.index = 0;
		$.k2l.m4Game_9.allowClick = true;
	}

});

Template.m4Game_9.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m4Game_9 == 'undefined') {
		$.k2l.m4Game_9 = {};
	};

	// $.k2l.m4Game_9.sound = new Audio();

	// var questions = ["Q1) Where is Elle going?",
	// 				 "Q2) Where is Tu going?",
	// 				 "Q3) Where is K going?"];

	var answers = [ ["“You need to enjoy it,” said K.","“You should enjoy it,” said K.","“You must enjoy it,” said K."],
					// ["Cities are more tiring in hot weather.","Cities are more tired in hot weather."],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["b"];
	
	// $.k2l.m4Game_9.questions = questions;
	$.k2l.m4Game_9.answers = answers;
	$.k2l.m4Game_9.answer_index = answer_index;
	$.k2l.m4Game_9.index = 0;

	$.k2l.m4Game_9.allowClick = true;
}