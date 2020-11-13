Template.m10Game_35.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10Game_35");
	}
});

Template.m10Game_35.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m10Game_35.allowClick == true) {
			$.k2l.m10Game_35.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m10Game_35.answer_index[$.k2l.m10Game_35.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				var r11Correct = Session.get('R11_Correct');
				$.k2l.m10Game_35.index++
				scoreCorrect++
				r11Correct++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						Session.set('Easy_Correct', scoreCorrect);
						Session.set('R11_Correct', r11Correct);
						if ($.k2l.m10Game_35.index > $.k2l.m10Game_35.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m10Game_35.sound.src = {};
							$.k2l.m10Game_35.index = 0;
							$.k2l.m10Game_35.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m10Game_35.allowClick = true;
				$('#a').html($.k2l.m10Game_35.answers[$.k2l.m10Game_35.index][0]);
				$('#b').html($.k2l.m10Game_35.answers[$.k2l.m10Game_35.index][1]);
				$('#c').html($.k2l.m10Game_35.answers[$.k2l.m10Game_35.index][2]);	
				}
					}, 1000);	

				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m10Game_35.index++
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
						if ($.k2l.m10Game_35.index > $.k2l.m10Game_35.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m10Game_35.sound.src = {};
							$.k2l.m10Game_35.index = 0;
							$.k2l.m10Game_35.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m10Game_35.allowClick = true;
				// $('.instruction').html($.k2l.m10Game_35.questions[$.k2l.m10Game_35.index]);
				$('#a').html($.k2l.m10Game_35.answers[$.k2l.m10Game_35.index][0]);
				$('#b').html($.k2l.m10Game_35.answers[$.k2l.m10Game_35.index][1]);
				$('#c').html($.k2l.m10Game_35.answers[$.k2l.m10Game_35.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.m10Game_35.sound.src = {};
		$.k2l.m10Game_35.index = 0;
		$.k2l.m10Game_35.allowClick = true;
	}

});

Template.m10Game_35.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10Game_35 == 'undefined') {
		$.k2l.m10Game_35 = {};
	};

	var answers = [ ["The place where money is made call The Royal Mint.","The place where money is made is called The Royal Mint."],
					["Edward I was moved The Royal Mint into the Tower.","Edward I moved The Royal Mint into the Tower."],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["b","b"];
	
	$.k2l.m10Game_35.answers = answers;
	$.k2l.m10Game_35.answer_index = answer_index;
	$.k2l.m10Game_35.index = 0;

	$.k2l.m10Game_35.allowClick = true;
}