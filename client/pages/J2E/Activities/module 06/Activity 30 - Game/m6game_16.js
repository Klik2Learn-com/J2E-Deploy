Template.m6Game_16.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6Game_16");
	}
});

Template.m6Game_16.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m6Game_16.allowClick == true) {
			$.k2l.m6Game_16.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m6Game_16.answer_index[$.k2l.m6Game_16.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				$.k2l.m6Game_16.index++
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
						if ($.k2l.m6Game_16.index > $.k2l.m6Game_16.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m6Game_16.sound.src = {};
							$.k2l.m6Game_16.index = 0;
							$.k2l.m6Game_16.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m6Game_16.allowClick = true;
				$('#a').html($.k2l.m6Game_16.answers[$.k2l.m6Game_16.index][0]);
				$('#b').html($.k2l.m6Game_16.answers[$.k2l.m6Game_16.index][1]);
				$('#c').html($.k2l.m6Game_16.answers[$.k2l.m6Game_16.index][2]);	
				}
					}, 1000);	

				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m6Game_16.index++
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
						if ($.k2l.m6Game_16.index > $.k2l.m6Game_16.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m6Game_16.sound.src = {};
							$.k2l.m6Game_16.index = 0;
							$.k2l.m6Game_16.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m6Game_16.allowClick = true;
				// $('.instruction').html($.k2l.m6Game_16.questions[$.k2l.m6Game_16.index]);
				$('#a').html($.k2l.m6Game_16.answers[$.k2l.m6Game_16.index][0]);
				$('#b').html($.k2l.m6Game_16.answers[$.k2l.m6Game_16.index][1]);
				$('#c').html($.k2l.m6Game_16.answers[$.k2l.m6Game_16.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.m6Game_16.sound.src = {};
		$.k2l.m6Game_16.index = 0;
		$.k2l.m6Game_16.allowClick = true;
	}

});

Template.m6Game_16.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m6Game_16 == 'undefined') {
		$.k2l.m6Game_16 = {};
	};

	var answers = [ ["The Romans had ruled York for decades before the Vikings arrived.","The Romans ruled York for decades before the Vikings had arrived."],
					["By the time Elizabeth I died, many of the treasures had been destroyed.","By the time Elizabeth I died, many of the treasures have been destroyed."],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["a","a"];
	
	$.k2l.m6Game_16.answers = answers;
	$.k2l.m6Game_16.answer_index = answer_index;
	$.k2l.m6Game_16.index = 0;

	$.k2l.m6Game_16.allowClick = true;
}