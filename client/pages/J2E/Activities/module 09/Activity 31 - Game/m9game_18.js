Template.m9Game_18.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9Game_18");
	}
});

Template.m9Game_18.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m9Game_18.allowClick == true) {
			$.k2l.m9Game_18.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m9Game_18.answer_index[$.k2l.m9Game_18.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				var kCorrect = Session.get('K_Correct');
				$.k2l.m9Game_18.index++
				scoreCorrect++
				kCorrect++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						Session.set('Easy_Correct', scoreCorrect);
						Session.set('K_Correct', kCorrect);
						if ($.k2l.m9Game_18.index > $.k2l.m9Game_18.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m9Game_18.sound.src = {};
							$.k2l.m9Game_18.index = 0;
							$.k2l.m9Game_18.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m9Game_18.allowClick = true;
				$('#a').html($.k2l.m9Game_18.answers[$.k2l.m9Game_18.index][0]);
				$('#b').html($.k2l.m9Game_18.answers[$.k2l.m9Game_18.index][1]);
				$('#c').html($.k2l.m9Game_18.answers[$.k2l.m9Game_18.index][2]);	
				}
					}, 1000);	

				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m9Game_18.index++
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
						if ($.k2l.m9Game_18.index > $.k2l.m9Game_18.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m9Game_18.sound.src = {};
							$.k2l.m9Game_18.index = 0;
							$.k2l.m9Game_18.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m9Game_18.allowClick = true;
				// $('.instruction').html($.k2l.m9Game_18.questions[$.k2l.m9Game_18.index]);
				$('#a').html($.k2l.m9Game_18.answers[$.k2l.m9Game_18.index][0]);
				$('#b').html($.k2l.m9Game_18.answers[$.k2l.m9Game_18.index][1]);
				$('#c').html($.k2l.m9Game_18.answers[$.k2l.m9Game_18.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.m9Game_18.sound.src = {};
		$.k2l.m9Game_18.index = 0;
		$.k2l.m9Game_18.allowClick = true;
	}

});

Template.m9Game_18.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m9Game_18 == 'undefined') {
		$.k2l.m9Game_18 = {};
	};

	var answers = [ ["Right we’re here, let’s start, shan’t we?","Right we’re here, let’s start, shall we?"],
					// ["I’d like to take the eco challenge to save energy at home.","I’d like taking the eco challenge to save energy at home."],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["b"];
	
	$.k2l.m9Game_18.answers = answers;
	$.k2l.m9Game_18.answer_index = answer_index;
	$.k2l.m9Game_18.index = 0;

	$.k2l.m9Game_18.allowClick = true;
}