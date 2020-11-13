Template.m9Game_17.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9Game_17");
	}
});

Template.m9Game_17.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m9Game_17.allowClick == true) {
			$.k2l.m9Game_17.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m9Game_17.answer_index[$.k2l.m9Game_17.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				var kCorrect = Session.get('K_Correct');
				$.k2l.m9Game_17.index++
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
						if ($.k2l.m9Game_17.index > $.k2l.m9Game_17.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m9Game_17.sound.src = {};
							$.k2l.m9Game_17.index = 0;
							$.k2l.m9Game_17.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m9Game_17.allowClick = true;
				$('#a').html($.k2l.m9Game_17.answers[$.k2l.m9Game_17.index][0]);
				$('#b').html($.k2l.m9Game_17.answers[$.k2l.m9Game_17.index][1]);
				$('#c').html($.k2l.m9Game_17.answers[$.k2l.m9Game_17.index][2]);	
				}
					}, 1000);	

				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m9Game_17.index++
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
						if ($.k2l.m9Game_17.index > $.k2l.m9Game_17.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m9Game_17.sound.src = {};
							$.k2l.m9Game_17.index = 0;
							$.k2l.m9Game_17.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m9Game_17.allowClick = true;
				// $('.instruction').html($.k2l.m9Game_17.questions[$.k2l.m9Game_17.index]);
				$('#a').html($.k2l.m9Game_17.answers[$.k2l.m9Game_17.index][0]);
				$('#b').html($.k2l.m9Game_17.answers[$.k2l.m9Game_17.index][1]);
				$('#c').html($.k2l.m9Game_17.answers[$.k2l.m9Game_17.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.m9Game_17.sound.src = {};
		$.k2l.m9Game_17.index = 0;
		$.k2l.m9Game_17.allowClick = true;
	}

});

Template.m9Game_17.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m9Game_17 == 'undefined') {
		$.k2l.m9Game_17 = {};
	};

	var answers = [ ["If we’d gone in winter, we could go ice skating.","If we go in winter, we could go ice skating.","If we went in winter, we could have gone ice skating."],
					// ["I’d like to take the eco challenge to save energy at home.","I’d like taking the eco challenge to save energy at home."],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["b"];
	
	$.k2l.m9Game_17.answers = answers;
	$.k2l.m9Game_17.answer_index = answer_index;
	$.k2l.m9Game_17.index = 0;

	$.k2l.m9Game_17.allowClick = true;
}