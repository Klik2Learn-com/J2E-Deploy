Template.m5Game_9b.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5Game_9b");
	}
});

Template.m5Game_9b.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m5Game_9b.allowClick == true) {
			$.k2l.m5Game_9b.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m5Game_9b.answer_index[$.k2l.m5Game_9b.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				$.k2l.m5Game_9b.index++
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
						if ($.k2l.m5Game_9b.index > $.k2l.m5Game_9b.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m5Game_9b.sound.src = {};
							$.k2l.m5Game_9b.index = 0;
							$.k2l.m5Game_9b.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m5Game_9b.allowClick = true;
				$('#a').html($.k2l.m5Game_9b.answers[$.k2l.m5Game_9b.index][0]);
				$('#b').html($.k2l.m5Game_9b.answers[$.k2l.m5Game_9b.index][1]);
				$('#c').html($.k2l.m5Game_9b.answers[$.k2l.m5Game_9b.index][2]);	
				}
					}, 1000);	

				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m5Game_9b.index++
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
						if ($.k2l.m5Game_9b.index > $.k2l.m5Game_9b.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m5Game_9b.sound.src = {};
							$.k2l.m5Game_9b.index = 0;
							$.k2l.m5Game_9b.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m5Game_9b.allowClick = true;
				// $('.instruction').html($.k2l.m5Game_9b.questions[$.k2l.m5Game_9b.index]);
				$('#a').html($.k2l.m5Game_9b.answers[$.k2l.m5Game_9b.index][0]);
				$('#b').html($.k2l.m5Game_9b.answers[$.k2l.m5Game_9b.index][1]);
				$('#c').html($.k2l.m5Game_9b.answers[$.k2l.m5Game_9b.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.m5Game_9b.sound.src = {};
		$.k2l.m5Game_9b.index = 0;
		$.k2l.m5Game_9b.allowClick = true;
	}

});

Template.m5Game_9b.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m5Game_9b == 'undefined') {
		$.k2l.m5Game_9b = {};
	};

	var answers = [ ["‘What will you like to see first?’ asked K.","‘What would you like to see first?’ asked K."],
					// ["‘I’ve never heard of The Beatles,’ said Elle.","‘I didn’t hear of The Beatles,’ said Elle."],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["b"];
	
	$.k2l.m5Game_9b.answers = answers;
	$.k2l.m5Game_9b.answer_index = answer_index;
	$.k2l.m5Game_9b.index = 0;

	$.k2l.m5Game_9b.allowClick = true;
}