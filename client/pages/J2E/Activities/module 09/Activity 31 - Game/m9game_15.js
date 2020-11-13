Template.m9Game_15.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9Game_15");
	}
});

Template.m9Game_15.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m9Game_15.allowClick == true) {
			$.k2l.m9Game_15.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m9Game_15.answer_index[$.k2l.m9Game_15.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				var tuCorrect = Session.get('Tu_Correct');
				$.k2l.m9Game_15.index++
				scoreCorrect++
				tuCorrect++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						Session.set('Easy_Correct', scoreCorrect);
						Session.set('Tu_Correct', tuCorrect);
						if ($.k2l.m9Game_15.index > $.k2l.m9Game_15.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m9Game_15.sound.src = {};
							$.k2l.m9Game_15.index = 0;
							$.k2l.m9Game_15.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m9Game_15.allowClick = true;
				$('#a').html($.k2l.m9Game_15.answers[$.k2l.m9Game_15.index][0]);
				$('#b').html($.k2l.m9Game_15.answers[$.k2l.m9Game_15.index][1]);
				$('#c').html($.k2l.m9Game_15.answers[$.k2l.m9Game_15.index][2]);	
				}
					}, 1000);	

				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m9Game_15.index++
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
						if ($.k2l.m9Game_15.index > $.k2l.m9Game_15.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m9Game_15.sound.src = {};
							$.k2l.m9Game_15.index = 0;
							$.k2l.m9Game_15.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m9Game_15.allowClick = true;
				// $('.instruction').html($.k2l.m9Game_15.questions[$.k2l.m9Game_15.index]);
				$('#a').html($.k2l.m9Game_15.answers[$.k2l.m9Game_15.index][0]);
				$('#b').html($.k2l.m9Game_15.answers[$.k2l.m9Game_15.index][1]);
				$('#c').html($.k2l.m9Game_15.answers[$.k2l.m9Game_15.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.m9Game_15.sound.src = {};
		$.k2l.m9Game_15.index = 0;
		$.k2l.m9Game_15.allowClick = true;
	}

});

Template.m9Game_15.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m9Game_15 == 'undefined') {
		$.k2l.m9Game_15 = {};
	};

	var answers = [ ["Well, there are lots of things to do there, isn’t it?","Well, there are lots of things to do there, aren’t there?","Well, there’s lots of things to do there, aren’t there?"],
					// ["There’s no such thing as a world seed bank isn’t there?","There’s no such thing as a world seed bank is there?"],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["b"];
	
	$.k2l.m9Game_15.answers = answers;
	$.k2l.m9Game_15.answer_index = answer_index;
	$.k2l.m9Game_15.index = 0;

	$.k2l.m9Game_15.allowClick = true;
}