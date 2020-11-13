Template.m10Game_12.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10Game_12");
	}
});

Template.m10Game_12.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m10Game_12.allowClick == true) {
			$.k2l.m10Game_12.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m10Game_12.answer_index[$.k2l.m10Game_12.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				var r4Correct = Session.get('R4_Correct');
				$.k2l.m10Game_12.index++
				scoreCorrect++
				r4Correct++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						Session.set('Easy_Correct', scoreCorrect);
						Session.set('R4_Correct', r4Correct);
						if ($.k2l.m10Game_12.index > $.k2l.m10Game_12.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m10Game_12.sound.src = {};
							$.k2l.m10Game_12.index = 0;
							$.k2l.m10Game_12.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
							$(parentSection).next('section').removeClass('hidden');// reveal next page.
							document.location.hash = $(parentSection).next('section').attr('id');
							Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m10Game_12.allowClick = true;
				$('#a').html($.k2l.m10Game_12.answers[$.k2l.m10Game_12.index][0]);
				$('#b').html($.k2l.m10Game_12.answers[$.k2l.m10Game_12.index][1]);
				$('#c').html($.k2l.m10Game_12.answers[$.k2l.m10Game_12.index][2]);	
				}
					}, 1000);	

				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				var r4Correct = Session.get('R4_Correct');
				$.k2l.m10Game_12.index++
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
						if ($.k2l.m10Game_12.index > $.k2l.m10Game_12.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m10Game_12.sound.src = {};
							$.k2l.m10Game_12.index = 0;
							$.k2l.m10Game_12.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
							$(parentSection).next('section').removeClass('hidden');// reveal next page.
							document.location.hash = $(parentSection).next('section').attr('id');
							Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m10Game_12.allowClick = true;
				// $('.instruction').html($.k2l.m10Game_12.questions[$.k2l.m10Game_12.index]);
				$('#a').html($.k2l.m10Game_12.answers[$.k2l.m10Game_12.index][0]);
				$('#b').html($.k2l.m10Game_12.answers[$.k2l.m10Game_12.index][1]);
				$('#c').html($.k2l.m10Game_12.answers[$.k2l.m10Game_12.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.m10Game_12.sound.src = {};
		$.k2l.m10Game_12.index = 0;
		$.k2l.m10Game_12.allowClick = true;
	}

});

Template.m10Game_12.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10Game_12 == 'undefined') {
		$.k2l.m10Game_12 = {};
	};

	var answers = [ ["The Crown Jewels are containing the world’s most famous diamonds.","The Crown Jewels contain the world’s most famous diamonds."],
					["You don’t see the real ones though.","You’re not seeing the real ones though."],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["b","a"];
	
	$.k2l.m10Game_12.answers = answers;
	$.k2l.m10Game_12.answer_index = answer_index;
	$.k2l.m10Game_12.index = 0;

	$.k2l.m10Game_12.allowClick = true;
}