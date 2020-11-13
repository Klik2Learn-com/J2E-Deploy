Template.m3Game_14.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3Game_14");
	}
});

Template.m3Game_14.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m3Game_14.allowClick == true) {
			$.k2l.m3Game_14.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m3Game_14.answer_index[$.k2l.m3Game_14.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				$.k2l.m3Game_14.index++
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
						if ($.k2l.m3Game_14.index > $.k2l.m3Game_14.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m3Game_14.sound.src = {};
							$.k2l.m3Game_14.index = 0;
							$.k2l.m3Game_14.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m3Game_14.allowClick = true;
				// $('.instruction').html($.k2l.m3Game_14.questions[$.k2l.m3Game_14.index]);
				$('#a').html($.k2l.m3Game_14.answers[$.k2l.m3Game_14.index][0]);
				$('#b').html($.k2l.m3Game_14.answers[$.k2l.m3Game_14.index][1]);
				$('#c').html($.k2l.m3Game_14.answers[$.k2l.m3Game_14.index][2]);	
				}
					}, 1000);	
				// if ($.k2l.m3Game_14.index > $.k2l.m3Game_14.answer_index.length -1) {
				// 			setTimeout(function() {
				// 			$.k2l.m3Game_14.index = 0;
				// 			$.k2l.m3Game_14.allowClick = true;
				// 			$(parentSection).addClass('hidden'); // hide this page
				// 		$(parentSection).next('section').removeClass('hidden');// reveal next page.
				// 		document.location.hash = $(parentSection).next('section').attr('id');
				// 		Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
				// 	}, 1000);
				// 		} else {
				// 			$.k2l.m3Game_14.allowClick = true;
				// $('.instruction').html($.k2l.m3Game_14.questions[$.k2l.m3Game_14.index]);
				// $('#a').html($.k2l.m3Game_14.answers[$.k2l.m3Game_14.index][0]);
				// $('#b').html($.k2l.m3Game_14.answers[$.k2l.m3Game_14.index][1]);
				// $('#c').html($.k2l.m3Game_14.answers[$.k2l.m3Game_14.index][2]);	
				// }
					
						

						// $.k2l.m3Game_14.allowClick = true; // Make the buttons clickable again
						
					// $('.pagination').removeClass('hidden');
				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m3Game_14.index++
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
						if ($.k2l.m3Game_14.index > $.k2l.m3Game_14.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m3Game_14.sound.src = {};
							$.k2l.m3Game_14.index = 0;
							$.k2l.m3Game_14.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m3Game_14.allowClick = true;
				// $('.instruction').html($.k2l.m3Game_14.questions[$.k2l.m3Game_14.index]);
				$('#a').html($.k2l.m3Game_14.answers[$.k2l.m3Game_14.index][0]);
				$('#b').html($.k2l.m3Game_14.answers[$.k2l.m3Game_14.index][1]);
				$('#c').html($.k2l.m3Game_14.answers[$.k2l.m3Game_14.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},

	// 'click .buttonaudio': function(evt) {
	// 	$.k2l.m3Game_14.sound.src = $(evt.currentTarget).attr('data-audiosrc');
	// 	$.k2l.m3Game_14.sound.play();
	// },
	
	'click .pagination': function(evt) {
		// $.k2l.m3Game_14.sound.src = {};
		$.k2l.m3Game_14.index = 0;
		$.k2l.m3Game_14.allowClick = true;
	}

});

Template.m3Game_14.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m3Game_14 == 'undefined') {
		$.k2l.m3Game_14 = {};
	};

	// $.k2l.m3Game_14.sound = new Audio();

	// var questions = ["Q1) Where is Elle going?",
	// 				 "Q2) Where is Tu going?",
	// 				 "Q3) Where is K going?"];

	var answers = [ ["“I’m more interested on the Engine Room,” said Tu.","“I’m more interested about the Engine Room,” said Tu.","“I’m more interested in the Engine Room,” said Tu."],
					// ["“I want to see the Queen’s bedroom,” said Elle.","“I want to see Queen’s bedroom,” said Elle."],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["c"];
	
	// $.k2l.m3Game_14.questions = questions;
	$.k2l.m3Game_14.answers = answers;
	$.k2l.m3Game_14.answer_index = answer_index;
	$.k2l.m3Game_14.index = 0;

	$.k2l.m3Game_14.allowClick = true;
}