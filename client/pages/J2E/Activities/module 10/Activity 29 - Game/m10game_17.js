Template.m10Game_17.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10Game_17");
	}
});

Template.m10Game_17.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m10Game_17.allowClick == true) {
			$.k2l.m10Game_17.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m10Game_17.answer_index[$.k2l.m10Game_17.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				var r6Correct = Session.get('R6_Correct');
				$.k2l.m10Game_17.index++
				scoreCorrect++
				r6Correct++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						Session.set('Easy_Correct', scoreCorrect);
						Session.set('R6_Correct', r6Correct);
						if ($.k2l.m10Game_17.index > $.k2l.m10Game_17.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m10Game_17.sound.src = {};
							$.k2l.m10Game_17.index = 0;
							$.k2l.m10Game_17.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m10Game_17.allowClick = true;
				$('#a').html($.k2l.m10Game_17.answers[$.k2l.m10Game_17.index][0]);
				$('#b').html($.k2l.m10Game_17.answers[$.k2l.m10Game_17.index][1]);
				$('#c').html($.k2l.m10Game_17.answers[$.k2l.m10Game_17.index][2]);	
				}
					}, 1000);	

				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m10Game_17.index++
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
						if ($.k2l.m10Game_17.index > $.k2l.m10Game_17.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m10Game_17.sound.src = {};
							$.k2l.m10Game_17.index = 0;
							$.k2l.m10Game_17.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m10Game_17.allowClick = true;
				// $('.instruction').html($.k2l.m10Game_17.questions[$.k2l.m10Game_17.index]);
				$('#a').html($.k2l.m10Game_17.answers[$.k2l.m10Game_17.index][0]);
				$('#b').html($.k2l.m10Game_17.answers[$.k2l.m10Game_17.index][1]);
				$('#c').html($.k2l.m10Game_17.answers[$.k2l.m10Game_17.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.m10Game_17.sound.src = {};
		$.k2l.m10Game_17.index = 0;
		$.k2l.m10Game_17.allowClick = true;
	}

});

Template.m10Game_17.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10Game_17 == 'undefined') {
		$.k2l.m10Game_17 = {};
	};

	var answers = [ ["I’d rather get a photo of the ravens.","I’d rather to get a photo of the ravens."],
					// ["He might tell them a ghost story.","He might be telling them a ghost story."],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["a"];
	
	$.k2l.m10Game_17.answers = answers;
	$.k2l.m10Game_17.answer_index = answer_index;
	$.k2l.m10Game_17.index = 0;

	$.k2l.m10Game_17.allowClick = true;
}