Template.m10Game_26.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10Game_26");
	}
});

Template.m10Game_26.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m10Game_26.allowClick == true) {
			$.k2l.m10Game_26.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m10Game_26.answer_index[$.k2l.m10Game_26.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				var r8Correct = Session.get('R8_Correct');
				$.k2l.m10Game_26.index++
				scoreCorrect++
				r8Correct++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						Session.set('Easy_Correct', scoreCorrect);
						Session.set('R8_Correct', r8Correct);
						if ($.k2l.m10Game_26.index > $.k2l.m10Game_26.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m10Game_26.sound.src = {};
							$.k2l.m10Game_26.index = 0;
							$.k2l.m10Game_26.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page

							$(parentSection).next('section').removeClass('hidden');// reveal next page.
							document.location.hash = $(parentSection).next('section').attr('id');
							Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m10Game_26.allowClick = true;
				$('#a').html($.k2l.m10Game_26.answers[$.k2l.m10Game_26.index][0]);
				$('#b').html($.k2l.m10Game_26.answers[$.k2l.m10Game_26.index][1]);
				$('#c').html($.k2l.m10Game_26.answers[$.k2l.m10Game_26.index][2]);	
				}
					}, 1000);	

				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				var r8Correct = Session.get('R8_Correct');
				$.k2l.m10Game_26.index++
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
						if ($.k2l.m10Game_26.index > $.k2l.m10Game_26.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m10Game_26.sound.src = {};
							$.k2l.m10Game_26.index = 0;
							$.k2l.m10Game_26.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page

							$(parentSection).next('section').removeClass('hidden');// reveal next page.
							document.location.hash = $(parentSection).next('section').attr('id');
							Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m10Game_26.allowClick = true;
				// $('.instruction').html($.k2l.m10Game_26.questions[$.k2l.m10Game_26.index]);
				$('#a').html($.k2l.m10Game_26.answers[$.k2l.m10Game_26.index][0]);
				$('#b').html($.k2l.m10Game_26.answers[$.k2l.m10Game_26.index][1]);
				$('#c').html($.k2l.m10Game_26.answers[$.k2l.m10Game_26.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.m10Game_26.sound.src = {};
		$.k2l.m10Game_26.index = 0;
		$.k2l.m10Game_26.allowClick = true;
	}

});

Template.m10Game_26.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10Game_26 == 'undefined') {
		$.k2l.m10Game_26 = {};
	};

	var answers = [ ["Most of the animals were kept in cages.","Most of the animals were keeping in cages."],
					// ["Yes, kings gave each other animals as presents.","Yes kings gave each other animals like presents."],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["a"];
	
	$.k2l.m10Game_26.answers = answers;
	$.k2l.m10Game_26.answer_index = answer_index;
	$.k2l.m10Game_26.index = 0;

	$.k2l.m10Game_26.allowClick = true;
}