Template.m9Game_3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9Game_3");
	}
});

Template.m9Game_3.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m9Game_3.allowClick == true) {
			$.k2l.m9Game_3.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m9Game_3.answer_index[$.k2l.m9Game_3.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				var elleCorrect = Session.get('Elle_Correct');
				$.k2l.m9Game_3.index++
				scoreCorrect++
				elleCorrect++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						Session.set('Easy_Correct', scoreCorrect);
						Session.set('Elle_Correct', elleCorrect);
						if ($.k2l.m9Game_3.index > $.k2l.m9Game_3.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m9Game_3.sound.src = {};
							$.k2l.m9Game_3.index = 0;
							$.k2l.m9Game_3.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m9Game_3.allowClick = true;
				$('#a').html($.k2l.m9Game_3.answers[$.k2l.m9Game_3.index][0]);
				$('#b').html($.k2l.m9Game_3.answers[$.k2l.m9Game_3.index][1]);
				$('#c').html($.k2l.m9Game_3.answers[$.k2l.m9Game_3.index][2]);	
				}
					}, 1000);	

				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m9Game_3.index++
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
						if ($.k2l.m9Game_3.index > $.k2l.m9Game_3.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m9Game_3.sound.src = {};
							$.k2l.m9Game_3.index = 0;
							$.k2l.m9Game_3.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m9Game_3.allowClick = true;
				// $('.instruction').html($.k2l.m9Game_3.questions[$.k2l.m9Game_3.index]);
				$('#a').html($.k2l.m9Game_3.answers[$.k2l.m9Game_3.index][0]);
				$('#b').html($.k2l.m9Game_3.answers[$.k2l.m9Game_3.index][1]);
				$('#c').html($.k2l.m9Game_3.answers[$.k2l.m9Game_3.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.m9Game_3.sound.src = {};
		$.k2l.m9Game_3.index = 0;
		$.k2l.m9Game_3.allowClick = true;
	}

});

Template.m9Game_3.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m9Game_3 == 'undefined') {
		$.k2l.m9Game_3 = {};
	};

	var answers = [ ["Elle, do you fancy to visit a giant dome?","Elle, do you fancy visiting a giant dome?"],
					["I don’t mind going – where is it?","I don’t mind to go – where is it?"],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["b","a"];
	
	$.k2l.m9Game_3.answers = answers;
	$.k2l.m9Game_3.answer_index = answer_index;
	$.k2l.m9Game_3.index = 0;

	$.k2l.m9Game_3.allowClick = true;
}