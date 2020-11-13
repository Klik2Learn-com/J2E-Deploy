Template.m6Game_19.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6Game_19");
	}
});

Template.m6Game_19.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m6Game_19.allowClick == true) {
			$.k2l.m6Game_19.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m6Game_19.answer_index[$.k2l.m6Game_19.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				$.k2l.m6Game_19.index++
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
						if ($.k2l.m6Game_19.index > $.k2l.m6Game_19.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m6Game_19.sound.src = {};
							$.k2l.m6Game_19.index = 0;
							$.k2l.m6Game_19.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m6Game_19.allowClick = true;
				$('#a').html($.k2l.m6Game_19.answers[$.k2l.m6Game_19.index][0]);
				$('#b').html($.k2l.m6Game_19.answers[$.k2l.m6Game_19.index][1]);
				$('#c').html($.k2l.m6Game_19.answers[$.k2l.m6Game_19.index][2]);	
				}
					}, 1000);	

				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m6Game_19.index++
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
						if ($.k2l.m6Game_19.index > $.k2l.m6Game_19.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m6Game_19.sound.src = {};
							$.k2l.m6Game_19.index = 0;
							$.k2l.m6Game_19.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m6Game_19.allowClick = true;
				// $('.instruction').html($.k2l.m6Game_19.questions[$.k2l.m6Game_19.index]);
				$('#a').html($.k2l.m6Game_19.answers[$.k2l.m6Game_19.index][0]);
				$('#b').html($.k2l.m6Game_19.answers[$.k2l.m6Game_19.index][1]);
				$('#c').html($.k2l.m6Game_19.answers[$.k2l.m6Game_19.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.m6Game_19.sound.src = {};
		$.k2l.m6Game_19.index = 0;
		$.k2l.m6Game_19.allowClick = true;
	}

});

Template.m6Game_19.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m6Game_19 == 'undefined') {
		$.k2l.m6Game_19 = {};
	};

	var answers = [ ["The first York minster stood in the middle of a Roman fort.","The first York minster was standing in the middle of a Roman fort."],
					["Archaeologists were finding human bones under the minster in 2012.","Archaeologists found human bones under the minster in 2012."],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["a","b"];
	
	$.k2l.m6Game_19.answers = answers;
	$.k2l.m6Game_19.answer_index = answer_index;
	$.k2l.m6Game_19.index = 0;

	$.k2l.m6Game_19.allowClick = true;
}