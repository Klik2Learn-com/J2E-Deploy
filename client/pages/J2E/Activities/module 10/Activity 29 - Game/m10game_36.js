Template.m10Game_36.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10Game_36");
	}
});

Template.m10Game_36.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m10Game_36.allowClick == true) {
			$.k2l.m10Game_36.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m10Game_36.answer_index[$.k2l.m10Game_36.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				var r11Correct = Session.get('R11_Correct');
				$.k2l.m10Game_36.index++
				scoreCorrect++
				r11Correct++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						Session.set('Easy_Correct', scoreCorrect);
						Session.set('R11_Correct', r11Correct);
						if ($.k2l.m10Game_36.index > $.k2l.m10Game_36.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m10Game_36.sound.src = {};
							$.k2l.m10Game_36.index = 0;
							$.k2l.m10Game_36.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
							$(parentSection).next('section').removeClass('hidden');// reveal next page.
							document.location.hash = $(parentSection).next('section').attr('id');
							Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m10Game_36.allowClick = true;
				$('#a').html($.k2l.m10Game_36.answers[$.k2l.m10Game_36.index][0]);
				$('#b').html($.k2l.m10Game_36.answers[$.k2l.m10Game_36.index][1]);
				$('#c').html($.k2l.m10Game_36.answers[$.k2l.m10Game_36.index][2]);	
				}
					}, 1000);	

				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				var r11Correct = Session.get('R11_Correct');
				$.k2l.m10Game_36.index++
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
						if ($.k2l.m10Game_36.index > $.k2l.m10Game_36.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m10Game_36.sound.src = {};
							$.k2l.m10Game_36.index = 0;
							$.k2l.m10Game_36.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
							$(parentSection).next('section').removeClass('hidden');// reveal next page.
							document.location.hash = $(parentSection).next('section').attr('id');
							Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m10Game_36.allowClick = true;
				// $('.instruction').html($.k2l.m10Game_36.questions[$.k2l.m10Game_36.index]);
				$('#a').html($.k2l.m10Game_36.answers[$.k2l.m10Game_36.index][0]);
				$('#b').html($.k2l.m10Game_36.answers[$.k2l.m10Game_36.index][1]);
				$('#c').html($.k2l.m10Game_36.answers[$.k2l.m10Game_36.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.m10Game_36.sound.src = {};
		$.k2l.m10Game_36.index = 0;
		$.k2l.m10Game_36.allowClick = true;
	}

});

Template.m10Game_36.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10Game_36 == 'undefined') {
		$.k2l.m10Game_36 = {};
	};

	var answers = [ ["Until 1663, coins were made by hand.","Until 1663, coins made by hand.","Until 1663, coins were made to hand."],
					// ["Some prisoners might afford to pay for good food.","Some prisoners could afford to pay for good food."],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["a"];
	
	$.k2l.m10Game_36.answers = answers;
	$.k2l.m10Game_36.answer_index = answer_index;
	$.k2l.m10Game_36.index = 0;

	$.k2l.m10Game_36.allowClick = true;
}