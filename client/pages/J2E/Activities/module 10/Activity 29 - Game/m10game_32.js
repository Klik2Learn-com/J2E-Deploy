Template.m10Game_32.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10Game_32");
	}
});

Template.m10Game_32.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m10Game_32.allowClick == true) {
			$.k2l.m10Game_32.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m10Game_32.answer_index[$.k2l.m10Game_32.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				var r10Correct = Session.get('R10_Correct');
				$.k2l.m10Game_32.index++
				scoreCorrect++
				r10Correct++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						Session.set('Easy_Correct', scoreCorrect);
						Session.set('R10_Correct', r10Correct);
						if ($.k2l.m10Game_32.index > $.k2l.m10Game_32.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m10Game_32.sound.src = {};
							$.k2l.m10Game_32.index = 0;
							$.k2l.m10Game_32.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m10Game_32.allowClick = true;
				$('#a').html($.k2l.m10Game_32.answers[$.k2l.m10Game_32.index][0]);
				$('#b').html($.k2l.m10Game_32.answers[$.k2l.m10Game_32.index][1]);
				$('#c').html($.k2l.m10Game_32.answers[$.k2l.m10Game_32.index][2]);	
				}
					}, 1000);	

				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m10Game_32.index++
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
						if ($.k2l.m10Game_32.index > $.k2l.m10Game_32.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m10Game_32.sound.src = {};
							$.k2l.m10Game_32.index = 0;
							$.k2l.m10Game_32.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m10Game_32.allowClick = true;
				// $('.instruction').html($.k2l.m10Game_32.questions[$.k2l.m10Game_32.index]);
				$('#a').html($.k2l.m10Game_32.answers[$.k2l.m10Game_32.index][0]);
				$('#b').html($.k2l.m10Game_32.answers[$.k2l.m10Game_32.index][1]);
				$('#c').html($.k2l.m10Game_32.answers[$.k2l.m10Game_32.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.m10Game_32.sound.src = {};
		$.k2l.m10Game_32.index = 0;
		$.k2l.m10Game_32.allowClick = true;
	}

});

Template.m10Game_32.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10Game_32 == 'undefined') {
		$.k2l.m10Game_32 = {};
	};

	var answers = [ ["Even some prisoners stayed with their families.","Some prisoners stayed even with their families.","Some prisoners even stayed with their families."],
					// ["He might tell them a ghost story.","He might be telling them a ghost story."],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["c"];
	
	$.k2l.m10Game_32.answers = answers;
	$.k2l.m10Game_32.answer_index = answer_index;
	$.k2l.m10Game_32.index = 0;

	$.k2l.m10Game_32.allowClick = true;
}