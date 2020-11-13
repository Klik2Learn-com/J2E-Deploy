Template.m3Game_17.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3Game_17");
	}
});

Template.m3Game_17.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m3Game_17.allowClick == true) {
			$.k2l.m3Game_17.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m3Game_17.answer_index[$.k2l.m3Game_17.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				$.k2l.m3Game_17.index++
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
						if ($.k2l.m3Game_17.index > $.k2l.m3Game_17.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m3Game_17.sound.src = {};
							$.k2l.m3Game_17.index = 0;
							$.k2l.m3Game_17.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m3Game_17.allowClick = true;
				// $('.instruction').html($.k2l.m3Game_17.questions[$.k2l.m3Game_17.index]);
				$('#a').html($.k2l.m3Game_17.answers[$.k2l.m3Game_17.index][0]);
				$('#b').html($.k2l.m3Game_17.answers[$.k2l.m3Game_17.index][1]);
				$('#c').html($.k2l.m3Game_17.answers[$.k2l.m3Game_17.index][2]);	
				}
					}, 1000);	
				// if ($.k2l.m3Game_17.index > $.k2l.m3Game_17.answer_index.length -1) {
				// 			setTimeout(function() {
				// 			$.k2l.m3Game_17.index = 0;
				// 			$.k2l.m3Game_17.allowClick = true;
				// 			$(parentSection).addClass('hidden'); // hide this page
				// 		$(parentSection).next('section').removeClass('hidden');// reveal next page.
				// 		document.location.hash = $(parentSection).next('section').attr('id');
				// 		Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
				// 	}, 1000);
				// 		} else {
				// 			$.k2l.m3Game_17.allowClick = true;
				// $('.instruction').html($.k2l.m3Game_17.questions[$.k2l.m3Game_17.index]);
				// $('#a').html($.k2l.m3Game_17.answers[$.k2l.m3Game_17.index][0]);
				// $('#b').html($.k2l.m3Game_17.answers[$.k2l.m3Game_17.index][1]);
				// $('#c').html($.k2l.m3Game_17.answers[$.k2l.m3Game_17.index][2]);	
				// }
					
						

						// $.k2l.m3Game_17.allowClick = true; // Make the buttons clickable again
						
					// $('.pagination').removeClass('hidden');
				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m3Game_17.index++
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
						if ($.k2l.m3Game_17.index > $.k2l.m3Game_17.answer_index.length -1) {
							setTimeout(function() {
							// $.k2l.m3Game_17.sound.src = {};
							$.k2l.m3Game_17.index = 0;
							$.k2l.m3Game_17.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 1000);
						} else {
							$.k2l.m3Game_17.allowClick = true;
				// $('.instruction').html($.k2l.m3Game_17.questions[$.k2l.m3Game_17.index]);
				$('#a').html($.k2l.m3Game_17.answers[$.k2l.m3Game_17.index][0]);
				$('#b').html($.k2l.m3Game_17.answers[$.k2l.m3Game_17.index][1]);
				$('#c').html($.k2l.m3Game_17.answers[$.k2l.m3Game_17.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},

	// 'click .buttonaudio': function(evt) {
	// 	$.k2l.m3Game_17.sound.src = $(evt.currentTarget).attr('data-audiosrc');
	// 	$.k2l.m3Game_17.sound.play();
	// },
	
	'click .pagination': function(evt) {
		// $.k2l.m3Game_17.sound.src = {};
		$.k2l.m3Game_17.index = 0;
		$.k2l.m3Game_17.allowClick = true;
	}

});

Template.m3Game_17.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m3Game_17 == 'undefined') {
		$.k2l.m3Game_17 = {};
	};

	// $.k2l.m3Game_17.sound = new Audio();

	// var questions = ["Q1) Where is Elle going?",
	// 				 "Q2) Where is Tu going?",
	// 				 "Q3) Where is K going?"];

	var answers = [ ["Britannia was launched in 1953 with no name on her bow.","Britannia was launched on 1953 with no name on her bow.","Britannia was launched at 1953 with no name on her bow."],
					["You may not see the name on the bow.","You might not see the name on the bow.","You won’t see the name on the bow."],
					["She was a most famous ship in the world.","She was the most famous ship in the world.","She was the most famous ship on the world."]
					]
	
	
	var answer_index = ["a","c","b"];
	
	// $.k2l.m3Game_17.questions = questions;
	$.k2l.m3Game_17.answers = answers;
	$.k2l.m3Game_17.answer_index = answer_index;
	$.k2l.m3Game_17.index = 0;

	$.k2l.m3Game_17.allowClick = true;
}