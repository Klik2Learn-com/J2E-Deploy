Template.m7Game_2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7Game_2");
	}
});

Template.m7Game_2.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m7Game_2.allowClick == true) {
			$.k2l.m7Game_2.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m7Game_2.answer_index[$.k2l.m7Game_2.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				$.k2l.m7Game_2.index++
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
						if ($.k2l.m7Game_2.index > $.k2l.m7Game_2.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m7Game_2.sound.src = {};
							$.k2l.m7Game_2.index = 0;
							$.k2l.m7Game_2.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m7Game_2.allowClick = true;
				$('#a').html($.k2l.m7Game_2.answers[$.k2l.m7Game_2.index][0]);
				$('#b').html($.k2l.m7Game_2.answers[$.k2l.m7Game_2.index][1]);
				$('#c').html($.k2l.m7Game_2.answers[$.k2l.m7Game_2.index][2]);	
				}
					}, 1000);	

				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m7Game_2.index++
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
						if ($.k2l.m7Game_2.index > $.k2l.m7Game_2.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m7Game_2.sound.src = {};
							$.k2l.m7Game_2.index = 0;
							$.k2l.m7Game_2.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m7Game_2.allowClick = true;
				// $('.instruction').html($.k2l.m7Game_2.questions[$.k2l.m7Game_2.index]);
				$('#a').html($.k2l.m7Game_2.answers[$.k2l.m7Game_2.index][0]);
				$('#b').html($.k2l.m7Game_2.answers[$.k2l.m7Game_2.index][1]);
				$('#c').html($.k2l.m7Game_2.answers[$.k2l.m7Game_2.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.m7Game_2.sound.src = {};
		$.k2l.m7Game_2.index = 0;
		$.k2l.m7Game_2.allowClick = true;
	}

});

Template.m7Game_2.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7Game_2 == 'undefined') {
		$.k2l.m7Game_2 = {};
	};

	var answers = [ ["Elle: ”I came across a sad story while I was reading about what to see in Wales.”","Elle: “I came across a sad story while I read about what to see in Wales.”"],
					// ["Cities are more tiring in hot weather.","Cities are more tired in hot weather."],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["a"];
	
	$.k2l.m7Game_2.answers = answers;
	$.k2l.m7Game_2.answer_index = answer_index;
	$.k2l.m7Game_2.index = 0;

	$.k2l.m7Game_2.allowClick = true;
}