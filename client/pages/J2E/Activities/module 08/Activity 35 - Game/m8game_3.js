Template.m8Game_3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8Game_3");
	}
});

Template.m8Game_3.events({
	
	"click .button1": function(evt){
		
		if ($.k2l.m8Game_3.allowClick == true) {
			$.k2l.m8Game_3.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m8Game_3.answer_index[$.k2l.m8Game_3.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				var scoreCorrect = Session.get('Easy_Correct');
				$.k2l.m8Game_3.index++
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
						if ($.k2l.m8Game_3.index > $.k2l.m8Game_3.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m8Game_3.sound.src = {};
							$.k2l.m8Game_3.index = 0;
							$.k2l.m8Game_3.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m8Game_3.allowClick = true;
				$('#a').html($.k2l.m8Game_3.answers[$.k2l.m8Game_3.index][0]);
				$('#b').html($.k2l.m8Game_3.answers[$.k2l.m8Game_3.index][1]);
				$('#c').html($.k2l.m8Game_3.answers[$.k2l.m8Game_3.index][2]);	
				}
					}, 1000);	

				} else {	
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m8Game_3.index++
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
						if ($.k2l.m8Game_3.index > $.k2l.m8Game_3.answer_index.length -1) {
							// setTimeout(function() {
							// $.k2l.m8Game_3.sound.src = {};
							$.k2l.m8Game_3.index = 0;
							$.k2l.m8Game_3.allowClick = true;
							$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// }, 1000);
						} else {
							$.k2l.m8Game_3.allowClick = true;
				// $('.instruction').html($.k2l.m8Game_3.questions[$.k2l.m8Game_3.index]);
				$('#a').html($.k2l.m8Game_3.answers[$.k2l.m8Game_3.index][0]);
				$('#b').html($.k2l.m8Game_3.answers[$.k2l.m8Game_3.index][1]);
				$('#c').html($.k2l.m8Game_3.answers[$.k2l.m8Game_3.index][2]);	
				}
					}, 1000);	
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		// $.k2l.m8Game_3.sound.src = {};
		$.k2l.m8Game_3.index = 0;
		$.k2l.m8Game_3.allowClick = true;
	}

});

Template.m8Game_3.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8Game_3 == 'undefined') {
		$.k2l.m8Game_3 = {};
	};

	var answers = [ ["Tu says he will rather go to a theme park like Alton Towers.","Tu says he’d rather go to a theme park like Alton Towers."],
					["Don’t worry – I would get him to change his mind.","Don’t worry – I’ll get him to change his mind."],
					// ["The kitchen","Upstairs","The garden"]
					]
	
	
	var answer_index = ["b","b"];
	
	$.k2l.m8Game_3.answers = answers;
	$.k2l.m8Game_3.answer_index = answer_index;
	$.k2l.m8Game_3.index = 0;

	$.k2l.m8Game_3.allowClick = true;
}