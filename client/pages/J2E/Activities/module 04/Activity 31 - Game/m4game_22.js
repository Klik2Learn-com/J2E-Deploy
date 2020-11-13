Template.m4Game_22.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4Game_22");
	}
});

Template.m4Game_22.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m4Game_22.allowClick == true) {
			$.k2l.m4Game_22.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m4Game_22.answer_index[$.k2l.m4Game_22.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				$.k2l.m4Game_22.index++
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
						if ($.k2l.m4Game_22.index > $.k2l.m4Game_22.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m4Game_22.sound.src = {};
							$.k2l.m4Game_22.index = 0;
							$.k2l.m4Game_22.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m4Game_22.allowClick = true;
				// $('.instruction').html($.k2l.m4Game_22.questions[$.k2l.m4Game_22.index]);
				$('#a').html($.k2l.m4Game_22.answers[$.k2l.m4Game_22.index][0]);
				$('#b').html($.k2l.m4Game_22.answers[$.k2l.m4Game_22.index][1]);
				$('#c').html($.k2l.m4Game_22.answers[$.k2l.m4Game_22.index][2]);	
				}
					}, 1000);	
				// if ($.k2l.m4Game_22.index > $.k2l.m4Game_22.answer_index.length -1) {
				// 			setTimeout(function() {
				// 			$.k2l.m4Game_22.index = 0;
				// 			$.k2l.m4Game_22.allowClick = true;
				// 			$(parentSection).addClass('hidden'); // hide this page
				// 		$(parentSection).next('section').removeClass('hidden');// reveal next page.
				// 		document.location.hash = $(parentSection).next('section').attr('id');
				// 		Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
				// 	}, 1000);
				// 		} else {
				// 			$.k2l.m4Game_22.allowClick = true;
				// $('.instruction').html($.k2l.m4Game_22.questions[$.k2l.m4Game_22.index]);
				// $('#a').html($.k2l.m4Game_22.answers[$.k2l.m4Game_22.index][0]);
				// $('#b').html($.k2l.m4Game_22.answers[$.k2l.m4Game_22.index][1]);
				// $('#c').html($.k2l.m4Game_22.answers[$.k2l.m4Game_22.index][2]);	
				// }
					
						

						// $.k2l.m4Game_22.allowClick = true; // Make the buttons clickable again
						
					// $('.pagination').removeClass('hidden');
				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m4Game_22.index++
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
						if ($.k2l.m4Game_22.index > $.k2l.m4Game_22.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m4Game_22.sound.src = {};
							$.k2l.m4Game_22.index = 0;
							$.k2l.m4Game_22.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m4Game_22.allowClick = true;
				// $('.instruction').html($.k2l.m4Game_22.questions[$.k2l.m4Game_22.index]);
				$('#a').html($.k2l.m4Game_22.answers[$.k2l.m4Game_22.index][0]);
				$('#b').html($.k2l.m4Game_22.answers[$.k2l.m4Game_22.index][1]);
				$('#c').html($.k2l.m4Game_22.answers[$.k2l.m4Game_22.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},

	// 'click .buttonaudio': function(evt) {
	// 	$.k2l.m4Game_22.sound.src = $(evt.currentTarget).attr('data-audiosrc');
	// 	$.k2l.m4Game_22.sound.play();
	// },
	
	'click .pagination': function(evt) {
		// $.k2l.m4Game_22.sound.src = {};
		$.k2l.m4Game_22.index = 0;
		$.k2l.m4Game_22.allowClick = true;
	}

});

Template.m4Game_22.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m4Game_22 == 'undefined') {
		$.k2l.m4Game_22 = {};
	};

	// $.k2l.m4Game_22.sound = new Audio();

	// var questions = ["Q1) Where is Elle going?",
	// 				 "Q2) Where is Tu going?",
	// 				 "Q3) Where is K going?"];

	var answers = [ ["These shops still exist at Scotland today.","These shops still exist in Scotland today."],
					// ["They had to spend the tokens in the factory owner’s shop.","The should spend the tokens in the factory owner’s shop."],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["b"];
	
	// $.k2l.m4Game_22.questions = questions;
	$.k2l.m4Game_22.answers = answers;
	$.k2l.m4Game_22.answer_index = answer_index;
	$.k2l.m4Game_22.index = 0;

	$.k2l.m4Game_22.allowClick = true;
}