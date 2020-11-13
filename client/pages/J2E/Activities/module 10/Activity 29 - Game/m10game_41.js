Template.m10Game_41.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10Game_41");
	}
});

Template.m10Game_41.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m10Game_41.allowClick == true) {
			$.k2l.m10Game_41.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m10Game_41.answer_index[$.k2l.m10Game_41.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				var r13Correct = Session.get('R13_Correct');
				$.k2l.m10Game_41.index++
				scoreCorrect++
				r13Correct++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						Session.set('Easy_Correct', scoreCorrect);
						Session.set('R13_Correct', r13Correct);
						if ($.k2l.m10Game_41.index > $.k2l.m10Game_41.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m10Game_41.sound.src = {};
							$.k2l.m10Game_41.index = 0;
							$.k2l.m10Game_41.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m10Game_41.allowClick = true;
				$('#a').html($.k2l.m10Game_41.answers[$.k2l.m10Game_41.index][0]);
				$('#b').html($.k2l.m10Game_41.answers[$.k2l.m10Game_41.index][1]);
				$('#c').html($.k2l.m10Game_41.answers[$.k2l.m10Game_41.index][2]);	
				}
					}, 1000);	

				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m10Game_41.index++
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
						if ($.k2l.m10Game_41.index > $.k2l.m10Game_41.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m10Game_41.sound.src = {};
							$.k2l.m10Game_41.index = 0;
							$.k2l.m10Game_41.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m10Game_41.allowClick = true;
				// $('.instruction').html($.k2l.m10Game_41.questions[$.k2l.m10Game_41.index]);
				$('#a').html($.k2l.m10Game_41.answers[$.k2l.m10Game_41.index][0]);
				$('#b').html($.k2l.m10Game_41.answers[$.k2l.m10Game_41.index][1]);
				$('#c').html($.k2l.m10Game_41.answers[$.k2l.m10Game_41.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.m10Game_41.sound.src = {};
		$.k2l.m10Game_41.index = 0;
		$.k2l.m10Game_41.allowClick = true;
	}

});

Template.m10Game_41.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10Game_41 == 'undefined') {
		$.k2l.m10Game_41 = {};
	};

	var answers = [ ["In the medieval palace, life carried on as normal for the King.","In the medieval palace, life carried out as normal for the King."],
					["They came across some toys in the medieval palace.","They came round some toys in the medieval palace."],
					// ["The kitchen","Upstairs","The garden"]
					]
	

	var answer_index = ["a","a"];
	
	$.k2l.m10Game_41.answers = answers;
	$.k2l.m10Game_41.answer_index = answer_index;
	$.k2l.m10Game_41.index = 0;

	$.k2l.m10Game_41.allowClick = true;
}