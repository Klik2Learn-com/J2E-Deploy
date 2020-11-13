Template.m10Game_39.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10Game_39");
	}
});

Template.m10Game_39.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m10Game_39.allowClick == true) {
			$.k2l.m10Game_39.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m10Game_39.answer_index[$.k2l.m10Game_39.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				var r12Correct = Session.get('R12_Correct');
				$.k2l.m10Game_39.index++
				scoreCorrect++
				r12Correct++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						Session.set('Easy_Correct', scoreCorrect);
						Session.set('R12_Correct', r12Correct);
						if ($.k2l.m10Game_39.index > $.k2l.m10Game_39.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m10Game_39.sound.src = {};
							$.k2l.m10Game_39.index = 0;
							$.k2l.m10Game_39.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
							$(parentSection).next('section').removeClass('hidden');// reveal next page.
							document.location.hash = $(parentSection).next('section').attr('id');
							Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m10Game_39.allowClick = true;
				$('#a').html($.k2l.m10Game_39.answers[$.k2l.m10Game_39.index][0]);
				$('#b').html($.k2l.m10Game_39.answers[$.k2l.m10Game_39.index][1]);
				$('#c').html($.k2l.m10Game_39.answers[$.k2l.m10Game_39.index][2]);	
				}
					}, 1000);	

				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				var r12Correct = Session.get('R12_Correct');
				$.k2l.m10Game_39.index++
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
						if ($.k2l.m10Game_39.index > $.k2l.m10Game_39.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m10Game_39.sound.src = {};
							$.k2l.m10Game_39.index = 0;
							$.k2l.m10Game_39.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
							$(parentSection).next('section').removeClass('hidden');// reveal next page.
							document.location.hash = $(parentSection).next('section').attr('id');
							Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m10Game_39.allowClick = true;
				// $('.instruction').html($.k2l.m10Game_39.questions[$.k2l.m10Game_39.index]);
				$('#a').html($.k2l.m10Game_39.answers[$.k2l.m10Game_39.index][0]);
				$('#b').html($.k2l.m10Game_39.answers[$.k2l.m10Game_39.index][1]);
				$('#c').html($.k2l.m10Game_39.answers[$.k2l.m10Game_39.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.m10Game_39.sound.src = {};
		$.k2l.m10Game_39.index = 0;
		$.k2l.m10Game_39.allowClick = true;
	}

});

Template.m10Game_39.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10Game_39 == 'undefined') {
		$.k2l.m10Game_39 = {};
	};

	var answers = [ ["One worker slept for 14 days as a result of lead poisoning.","One worker slept for 14 days with the result of lead poisoning."],
					["Isaac Newton was asked to look after theft from the Royal Mint.","Isaac Newton was asked to look into theft from the Royal Mint."],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["a","b"];
	
	$.k2l.m10Game_39.answers = answers;
	$.k2l.m10Game_39.answer_index = answer_index;
	$.k2l.m10Game_39.index = 0;

	$.k2l.m10Game_39.allowClick = true;
}