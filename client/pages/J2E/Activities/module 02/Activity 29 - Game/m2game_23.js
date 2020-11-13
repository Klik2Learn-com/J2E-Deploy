Template.m2Game_23.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2Game_23");
	}
});

Template.m2Game_23.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m2Game_23.allowClick == true) {
			$.k2l.m2Game_23.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m2Game_23.answer_index[$.k2l.m2Game_23.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				$.k2l.m2Game_23.index++
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
						if ($.k2l.m2Game_23.index > $.k2l.m2Game_23.answer_index.length -1) {
							setTimeout(function() {
							// $.k2l.m2Game_23.sound.src = {};
							$.k2l.m2Game_23.index = 0;
							$.k2l.m2Game_23.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 1000);
						} else {
							$.k2l.m2Game_23.allowClick = true;
				// $('.instruction').html($.k2l.m2Game_23.questions[$.k2l.m2Game_23.index]);
				$('#a').html($.k2l.m2Game_23.answers[$.k2l.m2Game_23.index][0]);
				$('#b').html($.k2l.m2Game_23.answers[$.k2l.m2Game_23.index][1]);
				$('#c').html($.k2l.m2Game_23.answers[$.k2l.m2Game_23.index][2]);	
				}
					}, 1000);	
				// if ($.k2l.m2Game_23.index > $.k2l.m2Game_23.answer_index.length -1) {
				// 			setTimeout(function() {
				// 			$.k2l.m2Game_23.index = 0;
				// 			$.k2l.m2Game_23.allowClick = true;
				// 			$(parentSection).addClass('hidden'); // hide this page
				// 		$(parentSection).next('section').removeClass('hidden');// reveal next page.
				// 		document.location.hash = $(parentSection).next('section').attr('id');
				// 		Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
				// 	}, 1000);
				// 		} else {
				// 			$.k2l.m2Game_23.allowClick = true;
				// $('.instruction').html($.k2l.m2Game_23.questions[$.k2l.m2Game_23.index]);
				// $('#a').html($.k2l.m2Game_23.answers[$.k2l.m2Game_23.index][0]);
				// $('#b').html($.k2l.m2Game_23.answers[$.k2l.m2Game_23.index][1]);
				// $('#c').html($.k2l.m2Game_23.answers[$.k2l.m2Game_23.index][2]);	
				// }
					
						

						// $.k2l.m2Game_23.allowClick = true; // Make the buttons clickable again
						
					// $('.pagination').removeClass('hidden');
				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m2Game_23.index++
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
						if ($.k2l.m2Game_23.index > $.k2l.m2Game_23.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m2Game_23.sound.src = {};
							$.k2l.m2Game_23.index = 0;
							$.k2l.m2Game_23.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m2Game_23.allowClick = true;
				// $('.instruction').html($.k2l.m2Game_23.questions[$.k2l.m2Game_23.index]);
				$('#a').html($.k2l.m2Game_23.answers[$.k2l.m2Game_23.index][0]);
				$('#b').html($.k2l.m2Game_23.answers[$.k2l.m2Game_23.index][1]);
				$('#c').html($.k2l.m2Game_23.answers[$.k2l.m2Game_23.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},

	// 'click .buttonaudio': function(evt) {
	// 	$.k2l.m2Game_23.sound.src = $(evt.currentTarget).attr('data-audiosrc');
	// 	$.k2l.m2Game_23.sound.play();
	// },
	
	'click .pagination': function(evt) {
		// $.k2l.m2Game_23.sound.src = {};
		$.k2l.m2Game_23.index = 0;
		$.k2l.m2Game_23.allowClick = true;
	}

});

Template.m2Game_23.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m2Game_23 == 'undefined') {
		$.k2l.m2Game_23 = {};
	};

	// $.k2l.m2Game_23.sound = new Audio();

	// var questions = ["Q1) Where is Elle going?",
	// 				 "Q2) Where is Tu going?",
	// 				 "Q3) Where is K going?"];

	var answers = [ ["The rig doctor is worried about safety.","The rig doctor is worried about the safeties of the crew.","Safety is the doctor's main worry."],
					// ["It’s obviously been there for a long time.","It’s obviously been there since a long time. "],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["c"];
	
	// $.k2l.m2Game_23.questions = questions;
	$.k2l.m2Game_23.answers = answers;
	$.k2l.m2Game_23.answer_index = answer_index;
	$.k2l.m2Game_23.index = 0;

	$.k2l.m2Game_23.allowClick = true;
}