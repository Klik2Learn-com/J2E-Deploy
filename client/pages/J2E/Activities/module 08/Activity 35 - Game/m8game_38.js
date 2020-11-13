Template.m8Game_38.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8Game_38");
	}
});

Template.m8Game_38.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m8Game_38.allowClick == true) {
			$.k2l.m8Game_38.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m8Game_38.answer_index[$.k2l.m8Game_38.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				$.k2l.m8Game_38.index++
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
						if ($.k2l.m8Game_38.index > $.k2l.m8Game_38.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m8Game_38.sound.src = {};
							$.k2l.m8Game_38.index = 0;
							$.k2l.m8Game_38.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m8Game_38.allowClick = true;
				$('#a').html($.k2l.m8Game_38.answers[$.k2l.m8Game_38.index][0]);
				$('#b').html($.k2l.m8Game_38.answers[$.k2l.m8Game_38.index][1]);
				$('#c').html($.k2l.m8Game_38.answers[$.k2l.m8Game_38.index][2]);	
				}
					}, 1000);	

				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m8Game_38.index++
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
						if ($.k2l.m8Game_38.index > $.k2l.m8Game_38.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m8Game_38.sound.src = {};
							$.k2l.m8Game_38.index = 0;
							$.k2l.m8Game_38.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m8Game_38.allowClick = true;
				// $('.instruction').html($.k2l.m8Game_38.questions[$.k2l.m8Game_38.index]);
				$('#a').html($.k2l.m8Game_38.answers[$.k2l.m8Game_38.index][0]);
				$('#b').html($.k2l.m8Game_38.answers[$.k2l.m8Game_38.index][1]);
				$('#c').html($.k2l.m8Game_38.answers[$.k2l.m8Game_38.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.m8Game_38.sound.src = {};
		$.k2l.m8Game_38.index = 0;
		$.k2l.m8Game_38.allowClick = true;
	}

});

Template.m8Game_38.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8Game_38 == 'undefined') {
		$.k2l.m8Game_38 = {};
	};

	var answers = [ ["If I can carry on wearing my hat, I’m happy.","If I can carry out wearing my hat, I’ll be happy.","If I’ll be able to carry on wearing my hat, I’ll be happy."],
					// ["Evidence of Neolithic buildings was found recently.","Evidence of Neolithic buildings recently was found."],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["a"];
	
	$.k2l.m8Game_38.answers = answers;
	$.k2l.m8Game_38.answer_index = answer_index;
	$.k2l.m8Game_38.index = 0;

	$.k2l.m8Game_38.allowClick = true;
}