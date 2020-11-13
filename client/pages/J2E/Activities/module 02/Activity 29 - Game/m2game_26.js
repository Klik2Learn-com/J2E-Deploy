Template.m2Game_26.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2Game_26");
	}
});

Template.m2Game_26.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m2Game_26.allowClick == true) {
			$.k2l.m2Game_26.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m2Game_26.answer_index[$.k2l.m2Game_26.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				$.k2l.m2Game_26.index++
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
						if ($.k2l.m2Game_26.index > $.k2l.m2Game_26.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m2Game_26.sound.src = {};
							$.k2l.m2Game_26.index = 0;
							$.k2l.m2Game_26.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m2Game_26.allowClick = true;
				// $('.instruction').html($.k2l.m2Game_26.questions[$.k2l.m2Game_26.index]);
				$('#a').html($.k2l.m2Game_26.answers[$.k2l.m2Game_26.index][0]);
				$('#b').html($.k2l.m2Game_26.answers[$.k2l.m2Game_26.index][1]);
				$('#c').html($.k2l.m2Game_26.answers[$.k2l.m2Game_26.index][2]);	
				}
					}, 1000);	
				// if ($.k2l.m2Game_26.index > $.k2l.m2Game_26.answer_index.length -1) {
				// 			setTimeout(function() {
				// 			$.k2l.m2Game_26.index = 0;
				// 			$.k2l.m2Game_26.allowClick = true;
				// 			$(parentSection).addClass('hidden'); // hide this page
				// 		$(parentSection).next('section').removeClass('hidden');// reveal next page.
				// 		document.location.hash = $(parentSection).next('section').attr('id');
				// 		Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
				// 	}, 1000);
				// 		} else {
				// 			$.k2l.m2Game_26.allowClick = true;
				// $('.instruction').html($.k2l.m2Game_26.questions[$.k2l.m2Game_26.index]);
				// $('#a').html($.k2l.m2Game_26.answers[$.k2l.m2Game_26.index][0]);
				// $('#b').html($.k2l.m2Game_26.answers[$.k2l.m2Game_26.index][1]);
				// $('#c').html($.k2l.m2Game_26.answers[$.k2l.m2Game_26.index][2]);	
				// }
					
						

						// $.k2l.m2Game_26.allowClick = true; // Make the buttons clickable again
						
					// $('.pagination').removeClass('hidden');
				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m2Game_26.index++
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
						if ($.k2l.m2Game_26.index > $.k2l.m2Game_26.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m2Game_26.sound.src = {};
							$.k2l.m2Game_26.index = 0;
							$.k2l.m2Game_26.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m2Game_26.allowClick = true;
				// $('.instruction').html($.k2l.m2Game_26.questions[$.k2l.m2Game_26.index]);
				$('#a').html($.k2l.m2Game_26.answers[$.k2l.m2Game_26.index][0]);
				$('#b').html($.k2l.m2Game_26.answers[$.k2l.m2Game_26.index][1]);
				$('#c').html($.k2l.m2Game_26.answers[$.k2l.m2Game_26.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},

	// 'click .buttonaudio': function(evt) {
	// 	$.k2l.m2Game_26.sound.src = $(evt.currentTarget).attr('data-audiosrc');
	// 	$.k2l.m2Game_26.sound.play();
	// },
	
	'click .pagination': function(evt) {
		// $.k2l.m2Game_26.sound.src = {};
		$.k2l.m2Game_26.index = 0;
		$.k2l.m2Game_26.allowClick = true;
	}

});

Template.m2Game_26.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m2Game_26 == 'undefined') {
		$.k2l.m2Game_26 = {};
	};

	// $.k2l.m2Game_26.sound = new Audio();

	// var questions = ["Q1) Where is Elle going?",
	// 				 "Q2) Where is Tu going?",
	// 				 "Q3) Where is K going?"];

	var answers = [ ["What’s going along here? ","What’s going on here?"],
					// ["Turn the submarine about for a closer look!","Turn the submarine around for a closer look!"],
					// ["‘Time is running out,’ said K.","‘We’re running out of the time,’ said K."]
					]
	
	
	var answer_index = ["b"];
	
	// $.k2l.m2Game_26.questions = questions;
	$.k2l.m2Game_26.answers = answers;
	$.k2l.m2Game_26.answer_index = answer_index;
	$.k2l.m2Game_26.index = 0;

	$.k2l.m2Game_26.allowClick = true;
}