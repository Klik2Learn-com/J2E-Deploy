Template.m6Game_26.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6Game_26");
	}
});

Template.m6Game_26.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m6Game_26.allowClick == true) {
			$.k2l.m6Game_26.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m6Game_26.answer_index[$.k2l.m6Game_26.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				$.k2l.m6Game_26.index++
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
						if ($.k2l.m6Game_26.index > $.k2l.m6Game_26.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m6Game_26.sound.src = {};
							$.k2l.m6Game_26.index = 0;
							$.k2l.m6Game_26.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m6Game_26.allowClick = true;
				$('#a').html($.k2l.m6Game_26.answers[$.k2l.m6Game_26.index][0]);
				$('#b').html($.k2l.m6Game_26.answers[$.k2l.m6Game_26.index][1]);
				$('#c').html($.k2l.m6Game_26.answers[$.k2l.m6Game_26.index][2]);	
				}
					}, 1000);	

				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m6Game_26.index++
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
						if ($.k2l.m6Game_26.index > $.k2l.m6Game_26.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m6Game_26.sound.src = {};
							$.k2l.m6Game_26.index = 0;
							$.k2l.m6Game_26.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m6Game_26.allowClick = true;
				// $('.instruction').html($.k2l.m6Game_26.questions[$.k2l.m6Game_26.index]);
				$('#a').html($.k2l.m6Game_26.answers[$.k2l.m6Game_26.index][0]);
				$('#b').html($.k2l.m6Game_26.answers[$.k2l.m6Game_26.index][1]);
				$('#c').html($.k2l.m6Game_26.answers[$.k2l.m6Game_26.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.m6Game_26.sound.src = {};
		$.k2l.m6Game_26.index = 0;
		$.k2l.m6Game_26.allowClick = true;
	}

});

Template.m6Game_26.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m6Game_26 == 'undefined') {
		$.k2l.m6Game_26 = {};
	};

	var answers = [ ["She shone her mobile phone torch around the walls.","She was shining her mobile phone torch around the walls.","She shone her mobile phone torch among the walls."],
					// ["If you find anything, call the cathedral police on your mobile.","If you would find anything, call the cathedral police on your mobile."],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["a"];
	
	$.k2l.m6Game_26.answers = answers;
	$.k2l.m6Game_26.answer_index = answer_index;
	$.k2l.m6Game_26.index = 0;

	$.k2l.m6Game_26.allowClick = true;
}