Template.m7Game_46.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7Game_46");
	}
});

Template.m7Game_46.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m7Game_46.allowClick == true) {
			$.k2l.m7Game_46.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m7Game_46.answer_index[$.k2l.m7Game_46.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				$.k2l.m7Game_46.index++
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
						if ($.k2l.m7Game_46.index > $.k2l.m7Game_46.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m7Game_46.sound.src = {};
							$.k2l.m7Game_46.index = 0;
							$.k2l.m7Game_46.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m7Game_46.allowClick = true;
				$('#a').html($.k2l.m7Game_46.answers[$.k2l.m7Game_46.index][0]);
				$('#b').html($.k2l.m7Game_46.answers[$.k2l.m7Game_46.index][1]);
				$('#c').html($.k2l.m7Game_46.answers[$.k2l.m7Game_46.index][2]);	
				}
					}, 1000);	

				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m7Game_46.index++
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
						if ($.k2l.m7Game_46.index > $.k2l.m7Game_46.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m7Game_46.sound.src = {};
							$.k2l.m7Game_46.index = 0;
							$.k2l.m7Game_46.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m7Game_46.allowClick = true;
				// $('.instruction').html($.k2l.m7Game_46.questions[$.k2l.m7Game_46.index]);
				$('#a').html($.k2l.m7Game_46.answers[$.k2l.m7Game_46.index][0]);
				$('#b').html($.k2l.m7Game_46.answers[$.k2l.m7Game_46.index][1]);
				$('#c').html($.k2l.m7Game_46.answers[$.k2l.m7Game_46.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.m7Game_46.sound.src = {};
		$.k2l.m7Game_46.index = 0;
		$.k2l.m7Game_46.allowClick = true;
	}

});

Template.m7Game_46.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7Game_46 == 'undefined') {
		$.k2l.m7Game_46 = {};
	};

	var answers = [ ["Elle: “Look, there are the three words on the window.”","Elle: “Look there are the three words at the window.”"],
					// ["Cities are more tiring in hot weather.","Cities are more tired in hot weather."],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["a"];
	
	$.k2l.m7Game_46.answers = answers;
	$.k2l.m7Game_46.answer_index = answer_index;
	$.k2l.m7Game_46.index = 0;

	$.k2l.m7Game_46.allowClick = true;
}