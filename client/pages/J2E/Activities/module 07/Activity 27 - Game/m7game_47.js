Template.m7Game_47.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7Game_47");
	}
});

Template.m7Game_47.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m7Game_47.allowClick == true) {
			$.k2l.m7Game_47.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m7Game_47.answer_index[$.k2l.m7Game_47.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				$.k2l.m7Game_47.index++
				scoreCorrect++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						Session.set('Easy_Correct', scoreCorrect);
						if ($.k2l.m7Game_47.index > $.k2l.m7Game_47.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m7Game_47.sound.src = {};
							$.k2l.m7Game_47.index = 0;
							$.k2l.m7Game_47.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m7Game_47.allowClick = true;
				$('#a').html($.k2l.m7Game_47.answers[$.k2l.m7Game_47.index][0]);
				$('#b').html($.k2l.m7Game_47.answers[$.k2l.m7Game_47.index][1]);
				$('#c').html($.k2l.m7Game_47.answers[$.k2l.m7Game_47.index][2]);	
				}
					}, 1000);	

				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m7Game_47.index++
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
						if ($.k2l.m7Game_47.index > $.k2l.m7Game_47.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m7Game_47.sound.src = {};
							$.k2l.m7Game_47.index = 0;
							$.k2l.m7Game_47.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m7Game_47.allowClick = true;
				// $('.instruction').html($.k2l.m7Game_47.questions[$.k2l.m7Game_47.index]);
				$('#a').html($.k2l.m7Game_47.answers[$.k2l.m7Game_47.index][0]);
				$('#b').html($.k2l.m7Game_47.answers[$.k2l.m7Game_47.index][1]);
				$('#c').html($.k2l.m7Game_47.answers[$.k2l.m7Game_47.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.m7Game_47.sound.src = {};
		$.k2l.m7Game_47.index = 0;
		$.k2l.m7Game_47.allowClick = true;
	}

});

Template.m7Game_47.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7Game_47 == 'undefined') {
		$.k2l.m7Game_47 = {};
	};

	var answers = [ ["Elle: “Have you made out all the letters Tu?”","Elle: “Had you made out all the letters Tu?”","Elle: “Can you made out all the letters Tu?”"],
					// ["Cities are more tiring in hot weather.","Cities are more tired in hot weather."],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["a"];
	
	$.k2l.m7Game_47.answers = answers;
	$.k2l.m7Game_47.answer_index = answer_index;
	$.k2l.m7Game_47.index = 0;

	$.k2l.m7Game_47.allowClick = true;
}