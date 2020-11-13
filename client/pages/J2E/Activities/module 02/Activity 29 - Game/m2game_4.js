Template.m2Game_4.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2Game_4");
	}
});

Template.m2Game_4.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m2Game_4.allowClick == true) {
			$.k2l.m2Game_4.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m2Game_4.answer_index[$.k2l.m2Game_4.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				$.k2l.m2Game_4.index++
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
						if ($.k2l.m2Game_4.index > $.k2l.m2Game_4.answer_index.length -1) {
							setTimeout(function() {
							// $.k2l.m2Game_4.sound.src = {};
							$.k2l.m2Game_4.index = 0;
							$.k2l.m2Game_4.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 1000);
						} else {
							$.k2l.m2Game_4.allowClick = true;
				// $('.instruction').html($.k2l.m2Game_4.questions[$.k2l.m2Game_4.index]);
				$('#a').html($.k2l.m2Game_4.answers[$.k2l.m2Game_4.index][0]);
				$('#b').html($.k2l.m2Game_4.answers[$.k2l.m2Game_4.index][1]);
				$('#c').html($.k2l.m2Game_4.answers[$.k2l.m2Game_4.index][2]);	
				}
					}, 1000);	
				// if ($.k2l.m2Game_4.index > $.k2l.m2Game_4.answer_index.length -1) {
				// 			setTimeout(function() {
				// 			$.k2l.m2Game_4.index = 0;
				// 			$.k2l.m2Game_4.allowClick = true;
				// 			$(parentSection).addClass('hidden'); // hide this page
				// 		$(parentSection).next('section').removeClass('hidden');// reveal next page.
				// 		document.location.hash = $(parentSection).next('section').attr('id');
				// 		Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
				// 	}, 1000);
				// 		} else {
				// 			$.k2l.m2Game_4.allowClick = true;
				// $('.instruction').html($.k2l.m2Game_4.questions[$.k2l.m2Game_4.index]);
				// $('#a').html($.k2l.m2Game_4.answers[$.k2l.m2Game_4.index][0]);
				// $('#b').html($.k2l.m2Game_4.answers[$.k2l.m2Game_4.index][1]);
				// $('#c').html($.k2l.m2Game_4.answers[$.k2l.m2Game_4.index][2]);	
				// }
					
						

						// $.k2l.m2Game_4.allowClick = true; // Make the buttons clickable again
						
					// $('.pagination').removeClass('hidden');
				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m2Game_4.index++
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
						if ($.k2l.m2Game_4.index > $.k2l.m2Game_4.answer_index.length -1) {
							setTimeout(function() {
							// $.k2l.m2Game_4.sound.src = {};
							$.k2l.m2Game_4.index = 0;
							$.k2l.m2Game_4.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 1000);
						} else {
							$.k2l.m2Game_4.allowClick = true;
				// $('.instruction').html($.k2l.m2Game_4.questions[$.k2l.m2Game_4.index]);
				$('#a').html($.k2l.m2Game_4.answers[$.k2l.m2Game_4.index][0]);
				$('#b').html($.k2l.m2Game_4.answers[$.k2l.m2Game_4.index][1]);
				$('#c').html($.k2l.m2Game_4.answers[$.k2l.m2Game_4.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},

	// 'click .buttonaudio': function(evt) {
	// 	$.k2l.m2Game_4.sound.src = $(evt.currentTarget).attr('data-audiosrc');
	// 	$.k2l.m2Game_4.sound.play();
	// },
	
	'click .pagination': function(evt) {
		// $.k2l.m2Game_4.sound.src = {};
		$.k2l.m2Game_4.index = 0;
		$.k2l.m2Game_4.allowClick = true;
	}

});

Template.m2Game_4.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m2Game_4 == 'undefined') {
		$.k2l.m2Game_4 = {};
	};

	// $.k2l.m2Game_4.sound = new Audio();

	// var questions = ["Q1) Where is Elle going?",
	// 				 "Q2) Where is Tu going?",
	// 				 "Q3) Where is K going?"];

	var answers = [ ["K is watching the submarine on the computer screen.","Unmanned submarine are going to depths of 11,000 meters.","Submarines travels through seaweed."],
					// ["The gas cloud over the rig gets bigger.","The gas cloud over the rig is getting bigger."],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["a"];
	
	// $.k2l.m2Game_4.questions = questions;
	$.k2l.m2Game_4.answers = answers;
	$.k2l.m2Game_4.answer_index = answer_index;
	$.k2l.m2Game_4.index = 0;

	$.k2l.m2Game_4.allowClick = true;
}