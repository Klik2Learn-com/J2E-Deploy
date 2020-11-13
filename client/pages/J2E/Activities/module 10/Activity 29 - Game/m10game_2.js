Template.m10Game_2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10Game_2");
	}
});

Template.m10Game_2.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m10Game_2.allowClick == true) {
			$.k2l.m10Game_2.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m10Game_2.answer_index[$.k2l.m10Game_2.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				var r1Correct = Session.get('R1_Correct');
				$.k2l.m10Game_2.index++
				scoreCorrect++
				r1Correct++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						Session.set('Easy_Correct', scoreCorrect);
						Session.set('R1_Correct', r1Correct);
						if ($.k2l.m10Game_2.index > $.k2l.m10Game_2.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m10Game_2.sound.src = {};
							$.k2l.m10Game_2.index = 0;
							$.k2l.m10Game_2.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m10Game_2.allowClick = true;
				$('#a').html($.k2l.m10Game_2.answers[$.k2l.m10Game_2.index][0]);
				$('#b').html($.k2l.m10Game_2.answers[$.k2l.m10Game_2.index][1]);
				$('#c').html($.k2l.m10Game_2.answers[$.k2l.m10Game_2.index][2]);	
				}
					}, 1000);	

				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m10Game_2.index++
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
						if ($.k2l.m10Game_2.index > $.k2l.m10Game_2.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m10Game_2.sound.src = {};
							$.k2l.m10Game_2.index = 0;
							$.k2l.m10Game_2.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m10Game_2.allowClick = true;
				// $('.instruction').html($.k2l.m10Game_2.questions[$.k2l.m10Game_2.index]);
				$('#a').html($.k2l.m10Game_2.answers[$.k2l.m10Game_2.index][0]);
				$('#b').html($.k2l.m10Game_2.answers[$.k2l.m10Game_2.index][1]);
				$('#c').html($.k2l.m10Game_2.answers[$.k2l.m10Game_2.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.m10Game_2.sound.src = {};
		$.k2l.m10Game_2.index = 0;
		$.k2l.m10Game_2.allowClick = true;
	}

});

Template.m10Game_2.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10Game_2 == 'undefined') {
		$.k2l.m10Game_2 = {};
	};

	var answers = [ ["There are many famous places where you might see a ghost.","There are many famous places where you would see a ghost.","There are many famous places where you ought to see a ghost."],
					// ["I don’t mind going – where is it?","I don’t mind to go – where is it?"],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["a"];
	
	$.k2l.m10Game_2.answers = answers;
	$.k2l.m10Game_2.answer_index = answer_index;
	$.k2l.m10Game_2.index = 0;

	$.k2l.m10Game_2.allowClick = true;
}