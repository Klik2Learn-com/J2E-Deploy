Template.ukQuiz_6.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#ukQuiz_6"); 
	}
}); 

Template.ukQuiz_6.events({
	
	"click .button2": function(evt){
		
		if ($.k2l.ukQuiz_6.allowClick == true) {
			$.k2l.ukQuiz_6.allowClick = false;
			var scoreCorrect = Session.get('quiz_Correct');
			var scoreIncorrect = Session.get('quiz_Incorrect');
			if ($(evt.currentTarget).attr('id') == $.k2l.ukQuiz_6.answer_index[$.k2l.ukQuiz_6.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.ukQuiz_6.index++
				scoreCorrect++
				Session.set('quiz_Correct', scoreCorrect);
				// Correct
				// $('.correctscreen').removeClass('hidden');
				// setTimeout( function() {
				// 	$('.correctscreen').addClass('hidden');
				// }, 1000);
				// 	setTimeout(function() {
				// 		$('.incorrectscreen').addClass('hidden');
				// 		$('.correctscreen').addClass('hidden');
				// 	}, 1000);				
				// 	setTimeout (function() {
				// 		$('#welldonecap').removeClass('hidden');
				// 	}, 1000);
					
					setTimeout(function() {
						if ($.k2l.ukQuiz_6.index > $.k2l.ukQuiz_6.answer_index.length) {
							$.k2l.ukQuiz_6.index = 0;
						}
						// $('#welldonecap').addClass('hidden');
						$.k2l.ukQuiz_6.allowClick = true; // Make the buttons clickable again
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
						
					}, 1000);
					// $('.pagination').removeClass('hidden');
				} else {				
				// $('.incorrectscreen').removeClass('hidden');
				// setTimeout( function() {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.ukQuiz_6.index++
				scoreIncorrect++
				Session.set('quiz_Incorrect', scoreIncorrect);
				// Correct
				// $('.correctscreen').removeClass('hidden');
				// setTimeout( function() {
				// 	$('.correctscreen').addClass('hidden');
				// }, 1000);
				// 	setTimeout(function() {
				// 		$('.incorrectscreen').addClass('hidden');
				// 		$('.correctscreen').addClass('hidden');
				// 	}, 1000);				
				// 	setTimeout (function() {
				// 		$('#welldonecap').removeClass('hidden');
				// 	}, 1000);
					
					setTimeout(function() {
						if ($.k2l.ukQuiz_6.index > $.k2l.ukQuiz_6.answer_index.length) {
							$.k2l.ukQuiz_6.index = 0;
						}
						// $('#welldonecap').addClass('hidden');
						$.k2l.ukQuiz_6.allowClick = true; // Make the buttons clickable again
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
						
					}, 1000);
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		$.k2l.ukQuiz_6.index = 0;
		$.k2l.ukQuiz_6.allowClick = true;
	}

});

Template.ukQuiz_6.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.ukQuiz_6 == 'undefined') {
		$.k2l.ukQuiz_6 = {};
	};
	
	var answer_index = ["3"];
	
	$.k2l.ukQuiz_6.answer_index = answer_index;
	$.k2l.ukQuiz_6.index = 0;

	$.k2l.ukQuiz_6.allowClick = true;
}