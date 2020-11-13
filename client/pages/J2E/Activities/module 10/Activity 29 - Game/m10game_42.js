Template.m10Game_42.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10Game_42");
	}
});

Template.m10Game_42.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m10Game_42.allowClick == true) {
			$.k2l.m10Game_42.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m10Game_42.answer_index[$.k2l.m10Game_42.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				var r13Correct = Session.get('R13_Correct');
				$.k2l.m10Game_42.index++
				scoreCorrect++
				r13Correct++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						Session.set('Easy_Correct', scoreCorrect);
						Session.set('R13_Correct', r13Correct);
						if ($.k2l.m10Game_42.index > $.k2l.m10Game_42.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m10Game_42.sound.src = {};
							$.k2l.m10Game_42.index = 0;
							$.k2l.m10Game_42.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
							$(parentSection).next('section').removeClass('hidden');// reveal next page.
							document.location.hash = $(parentSection).next('section').attr('id');
							Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m10Game_42.allowClick = true;
				$('#a').html($.k2l.m10Game_42.answers[$.k2l.m10Game_42.index][0]);
				$('#b').html($.k2l.m10Game_42.answers[$.k2l.m10Game_42.index][1]);
				$('#c').html($.k2l.m10Game_42.answers[$.k2l.m10Game_42.index][2]);	
				}
					}, 1000);	

				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				var r13Correct = Session.get('R13_Correct');
				$.k2l.m10Game_42.index++
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
						if ($.k2l.m10Game_42.index > $.k2l.m10Game_42.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m10Game_42.sound.src = {};
							$.k2l.m10Game_42.index = 0;
							$.k2l.m10Game_42.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
							$(parentSection).next('section').removeClass('hidden');// reveal next page.
							document.location.hash = $(parentSection).next('section').attr('id');
							Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m10Game_42.allowClick = true;
				// $('.instruction').html($.k2l.m10Game_42.questions[$.k2l.m10Game_42.index]);
				$('#a').html($.k2l.m10Game_42.answers[$.k2l.m10Game_42.index][0]);
				$('#b').html($.k2l.m10Game_42.answers[$.k2l.m10Game_42.index][1]);
				$('#c').html($.k2l.m10Game_42.answers[$.k2l.m10Game_42.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.m10Game_42.sound.src = {};
		$.k2l.m10Game_42.index = 0;
		$.k2l.m10Game_42.allowClick = true;
	}

});

Template.m10Game_42.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10Game_42 == 'undefined') {
		$.k2l.m10Game_42 = {};
	};

	var answers = [ ["Well I’m hungry, I don’t think we should put off to go to the café any longer.","Well, I’m hungry, I don’t think we should put of going to the café any longer.","Well, I’m hungry, I don’t think we should put off going to the café any longer."],
					// ["Isaac Newton was asked to look after theft from the Royal Mint.","Isaac Newton was asked to look into theft from the Royal Mint."],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["c"];
	
	$.k2l.m10Game_42.answers = answers;
	$.k2l.m10Game_42.answer_index = answer_index;
	$.k2l.m10Game_42.index = 0;

	$.k2l.m10Game_42.allowClick = true;
}