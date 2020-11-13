Template.m5Game_20.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5Game_20");
	}
});

Template.m5Game_20.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m5Game_20.allowClick == true) {
			$.k2l.m5Game_20.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m5Game_20.answer_index[$.k2l.m5Game_20.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				$.k2l.m5Game_20.index++
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
						if ($.k2l.m5Game_20.index > $.k2l.m5Game_20.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m5Game_20.sound.src = {};
							$.k2l.m5Game_20.index = 0;
							$.k2l.m5Game_20.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m5Game_20.allowClick = true;
				$('#a').html($.k2l.m5Game_20.answers[$.k2l.m5Game_20.index][0]);
				$('#b').html($.k2l.m5Game_20.answers[$.k2l.m5Game_20.index][1]);
				$('#c').html($.k2l.m5Game_20.answers[$.k2l.m5Game_20.index][2]);	
				}
					}, 1000);	

				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m5Game_20.index++
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
						if ($.k2l.m5Game_20.index > $.k2l.m5Game_20.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m5Game_20.sound.src = {};
							$.k2l.m5Game_20.index = 0;
							$.k2l.m5Game_20.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m5Game_20.allowClick = true;
				// $('.instruction').html($.k2l.m5Game_20.questions[$.k2l.m5Game_20.index]);
				$('#a').html($.k2l.m5Game_20.answers[$.k2l.m5Game_20.index][0]);
				$('#b').html($.k2l.m5Game_20.answers[$.k2l.m5Game_20.index][1]);
				$('#c').html($.k2l.m5Game_20.answers[$.k2l.m5Game_20.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.m5Game_20.sound.src = {};
		$.k2l.m5Game_20.index = 0;
		$.k2l.m5Game_20.allowClick = true;
	}

});

Template.m5Game_20.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m5Game_20 == 'undefined') {
		$.k2l.m5Game_20 = {};
	};

	var answers = [ ["Almost they gave up when their manager died.","They almost gave in when their manager died.","They almost gave up when their manager died."]
					// ["Cities are more tiring in hot weather.","Cities are more tired in hot weather."],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["c"];
	
	$.k2l.m5Game_20.answers = answers;
	$.k2l.m5Game_20.answer_index = answer_index;
	$.k2l.m5Game_20.index = 0;

	$.k2l.m5Game_20.allowClick = true;
}