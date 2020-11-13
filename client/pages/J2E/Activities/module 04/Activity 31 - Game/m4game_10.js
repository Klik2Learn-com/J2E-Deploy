Template.m4Game_10.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4Game_10");
	}
});

Template.m4Game_10.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m4Game_10.allowClick == true) {
			$.k2l.m4Game_10.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m4Game_10.answer_index[$.k2l.m4Game_10.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				$.k2l.m4Game_10.index++
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
						if ($.k2l.m4Game_10.index > $.k2l.m4Game_10.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m4Game_10.sound.src = {};
							$.k2l.m4Game_10.index = 0;
							$.k2l.m4Game_10.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m4Game_10.allowClick = true;
				// $('.instruction').html($.k2l.m4Game_10.questions[$.k2l.m4Game_10.index]);
				$('#a').html($.k2l.m4Game_10.answers[$.k2l.m4Game_10.index][0]);
				$('#b').html($.k2l.m4Game_10.answers[$.k2l.m4Game_10.index][1]);
				$('#c').html($.k2l.m4Game_10.answers[$.k2l.m4Game_10.index][2]);	
				}
					}, 1000);	
				// if ($.k2l.m4Game_10.index > $.k2l.m4Game_10.answer_index.length -1) {
				// 			setTimeout(function() {
				// 			$.k2l.m4Game_10.index = 0;
				// 			$.k2l.m4Game_10.allowClick = true;
				// 			$(parentSection).addClass('hidden'); // hide this page
				// 		$(parentSection).next('section').removeClass('hidden');// reveal next page.
				// 		document.location.hash = $(parentSection).next('section').attr('id');
				// 		Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
				// 	}, 1000);
				// 		} else {
				// 			$.k2l.m4Game_10.allowClick = true;
				// $('.instruction').html($.k2l.m4Game_10.questions[$.k2l.m4Game_10.index]);
				// $('#a').html($.k2l.m4Game_10.answers[$.k2l.m4Game_10.index][0]);
				// $('#b').html($.k2l.m4Game_10.answers[$.k2l.m4Game_10.index][1]);
				// $('#c').html($.k2l.m4Game_10.answers[$.k2l.m4Game_10.index][2]);	
				// }
					
						

						// $.k2l.m4Game_10.allowClick = true; // Make the buttons clickable again
						
					// $('.pagination').removeClass('hidden');
				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m4Game_10.index++
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
						if ($.k2l.m4Game_10.index > $.k2l.m4Game_10.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m4Game_10.sound.src = {};
							$.k2l.m4Game_10.index = 0;
							$.k2l.m4Game_10.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m4Game_10.allowClick = true;
				// $('.instruction').html($.k2l.m4Game_10.questions[$.k2l.m4Game_10.index]);
				$('#a').html($.k2l.m4Game_10.answers[$.k2l.m4Game_10.index][0]);
				$('#b').html($.k2l.m4Game_10.answers[$.k2l.m4Game_10.index][1]);
				$('#c').html($.k2l.m4Game_10.answers[$.k2l.m4Game_10.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},

	// 'click .buttonaudio': function(evt) {
	// 	$.k2l.m4Game_10.sound.src = $(evt.currentTarget).attr('data-audiosrc');
	// 	$.k2l.m4Game_10.sound.play();
	// },
	
	'click .pagination': function(evt) {
		// $.k2l.m4Game_10.sound.src = {};
		$.k2l.m4Game_10.index = 0;
		$.k2l.m4Game_10.allowClick = true;
	}

});

Template.m4Game_10.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m4Game_10 == 'undefined') {
		$.k2l.m4Game_10 = {};
	};

	// $.k2l.m4Game_10.sound = new Audio();

	// var questions = ["Q1) Where is Elle going?",
	// 				 "Q2) Where is Tu going?",
	// 				 "Q3) Where is K going?"];

	var answers = [ ["“We must take a camera,” said Elle.","“We must to take a camera,” said Elle."],
					["“We’d ought to hurry up,” said Tu “the bus is leaving.”","“We’d better hurry up,” said Tu “the bus is leaving.”"],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["a","b"];
	
	// $.k2l.m4Game_10.questions = questions;
	$.k2l.m4Game_10.answers = answers;
	$.k2l.m4Game_10.answer_index = answer_index;
	$.k2l.m4Game_10.index = 0;

	$.k2l.m4Game_10.allowClick = true;
}