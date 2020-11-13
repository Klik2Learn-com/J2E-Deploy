Template.m10Game_29.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10Game_29");
	}
});

Template.m10Game_29.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m10Game_29.allowClick == true) {
			$.k2l.m10Game_29.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m10Game_29.answer_index[$.k2l.m10Game_29.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				var r9Correct = Session.get('R9_Correct');
				$.k2l.m10Game_29.index++
				scoreCorrect++
				r9Correct++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						Session.set('Easy_Correct', scoreCorrect);
						Session.set('R9_Correct', r9Correct);
						if ($.k2l.m10Game_29.index > $.k2l.m10Game_29.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m10Game_29.sound.src = {};
							$.k2l.m10Game_29.index = 0;
							$.k2l.m10Game_29.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page

							$(parentSection).next('section').removeClass('hidden');// reveal next page.
							document.location.hash = $(parentSection).next('section').attr('id');
							Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));

					// }, 1000);
						} else {
							$.k2l.m10Game_29.allowClick = true;
				$('#a').html($.k2l.m10Game_29.answers[$.k2l.m10Game_29.index][0]);
				$('#b').html($.k2l.m10Game_29.answers[$.k2l.m10Game_29.index][1]);
				$('#c').html($.k2l.m10Game_29.answers[$.k2l.m10Game_29.index][2]);	
				}
					}, 1000);	

				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				var r9Correct = Session.get('R9_Correct');
				$.k2l.m10Game_29.index++
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
						if ($.k2l.m10Game_29.index > $.k2l.m10Game_29.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m10Game_29.sound.src = {};
							$.k2l.m10Game_29.index = 0;
							$.k2l.m10Game_29.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page

							$(parentSection).next('section').removeClass('hidden');// reveal next page.
							document.location.hash = $(parentSection).next('section').attr('id');
							Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));

					// }, 1000);
						} else {
							$.k2l.m10Game_29.allowClick = true;
				// $('.instruction').html($.k2l.m10Game_29.questions[$.k2l.m10Game_29.index]);
				$('#a').html($.k2l.m10Game_29.answers[$.k2l.m10Game_29.index][0]);
				$('#b').html($.k2l.m10Game_29.answers[$.k2l.m10Game_29.index][1]);
				$('#c').html($.k2l.m10Game_29.answers[$.k2l.m10Game_29.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.m10Game_29.sound.src = {};
		$.k2l.m10Game_29.index = 0;
		$.k2l.m10Game_29.allowClick = true;
	}

});

Template.m10Game_29.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10Game_29 == 'undefined') {
		$.k2l.m10Game_29 = {};
	};

	var answers = [ ["Prisoners had to pay for their accommodation in the Tower.","Prisoners ought to pay for their accommodation in the Tower."],
					["Some prisoners might afford to pay for good food.","Some prisoners could afford to pay for good food."],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["a","b"];
	
	$.k2l.m10Game_29.answers = answers;
	$.k2l.m10Game_29.answer_index = answer_index;
	$.k2l.m10Game_29.index = 0;

	$.k2l.m10Game_29.allowClick = true;
}