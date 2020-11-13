Template.m10Game_31.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10Game_31");
	}
});

Template.m10Game_31.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m10Game_31.allowClick == true) {
			$.k2l.m10Game_31.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m10Game_31.answer_index[$.k2l.m10Game_31.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				var r10Correct = Session.get('R10_Correct');
				$.k2l.m10Game_31.index++
				scoreCorrect++
				r10Correct++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						Session.set('Easy_Correct', scoreCorrect);
						Session.set('R10_Correct', r10Correct);
						if ($.k2l.m10Game_31.index > $.k2l.m10Game_31.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m10Game_31.sound.src = {};
							$.k2l.m10Game_31.index = 0;
							$.k2l.m10Game_31.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m10Game_31.allowClick = true;
				$('#a').html($.k2l.m10Game_31.answers[$.k2l.m10Game_31.index][0]);
				$('#b').html($.k2l.m10Game_31.answers[$.k2l.m10Game_31.index][1]);
				$('#c').html($.k2l.m10Game_31.answers[$.k2l.m10Game_31.index][2]);	
				}
					}, 1000);	

				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m10Game_31.index++
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
						if ($.k2l.m10Game_31.index > $.k2l.m10Game_31.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m10Game_31.sound.src = {};
							$.k2l.m10Game_31.index = 0;
							$.k2l.m10Game_31.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m10Game_31.allowClick = true;
				// $('.instruction').html($.k2l.m10Game_31.questions[$.k2l.m10Game_31.index]);
				$('#a').html($.k2l.m10Game_31.answers[$.k2l.m10Game_31.index][0]);
				$('#b').html($.k2l.m10Game_31.answers[$.k2l.m10Game_31.index][1]);
				$('#c').html($.k2l.m10Game_31.answers[$.k2l.m10Game_31.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.m10Game_31.sound.src = {};
		$.k2l.m10Game_31.index = 0;
		$.k2l.m10Game_31.allowClick = true;
	}

});

Template.m10Game_31.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10Game_31 == 'undefined') {
		$.k2l.m10Game_31 = {};
	};

	var answers = [ ["Wealthy prisoners might have enjoyed their stay.","Wealthy prisoners would have enjoyed their stay."],
					// ["He might tell them a ghost story.","He might be telling them a ghost story."],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["a"];
	
	$.k2l.m10Game_31.answers = answers;
	$.k2l.m10Game_31.answer_index = answer_index;
	$.k2l.m10Game_31.index = 0;

	$.k2l.m10Game_31.allowClick = true;
}