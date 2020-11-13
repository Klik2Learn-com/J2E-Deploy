Template.m5Game_21.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5Game_21");
	}
});

Template.m5Game_21.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m5Game_21.allowClick == true) {
			$.k2l.m5Game_21.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m5Game_21.answer_index[$.k2l.m5Game_21.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				$.k2l.m5Game_21.index++
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
						if ($.k2l.m5Game_21.index > $.k2l.m5Game_21.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m5Game_21.sound.src = {};
							$.k2l.m5Game_21.index = 0;
							$.k2l.m5Game_21.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m5Game_21.allowClick = true;
				$('#a').html($.k2l.m5Game_21.answers[$.k2l.m5Game_21.index][0]);
				$('#b').html($.k2l.m5Game_21.answers[$.k2l.m5Game_21.index][1]);
				$('#c').html($.k2l.m5Game_21.answers[$.k2l.m5Game_21.index][2]);	
				}
					}, 1000);	

				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m5Game_21.index++
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
						if ($.k2l.m5Game_21.index > $.k2l.m5Game_21.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m5Game_21.sound.src = {};
							$.k2l.m5Game_21.index = 0;
							$.k2l.m5Game_21.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m5Game_21.allowClick = true;
				// $('.instruction').html($.k2l.m5Game_21.questions[$.k2l.m5Game_21.index]);
				$('#a').html($.k2l.m5Game_21.answers[$.k2l.m5Game_21.index][0]);
				$('#b').html($.k2l.m5Game_21.answers[$.k2l.m5Game_21.index][1]);
				$('#c').html($.k2l.m5Game_21.answers[$.k2l.m5Game_21.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.m5Game_21.sound.src = {};
		$.k2l.m5Game_21.index = 0;
		$.k2l.m5Game_21.allowClick = true;
	}

});

Template.m5Game_21.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m5Game_21 == 'undefined') {
		$.k2l.m5Game_21 = {};
	};

	var answers = [ ["They turned briefly at an Indian holy man for inspiration.","They briefly turned to an Indian holy man for inspiration."],
					["Paul said later, ‘We thought there was more to him than there was.’","Paul said later, ‘We thought there was more of him than there was.’"],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["b","a"];
	
	$.k2l.m5Game_21.answers = answers;
	$.k2l.m5Game_21.answer_index = answer_index;
	$.k2l.m5Game_21.index = 0;

	$.k2l.m5Game_21.allowClick = true;
}