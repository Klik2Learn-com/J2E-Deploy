Template.ukQuiz_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#ukQuiz_3"); 
	}
}); 

Template.ukQuiz_3.events({
	
	"click .pointer": function(evt){
		
		if ($.k2l.ukQuiz_3.allowClick == true) {
			$.k2l.ukQuiz_3.allowClick = false;
			var scoreCorrect = Session.get('quiz_Correct');
			var scoreIncorrect = Session.get('quiz_Incorrect');
			if ($(evt.currentTarget).attr('id') == $.k2l.ukQuiz_3.answer_index[$.k2l.ukQuiz_3.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.ukQuiz_3.index++
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
						if ($.k2l.ukQuiz_3.index > $.k2l.ukQuiz_3.answer_index.length) {
							$.k2l.ukQuiz_3.index = 0;
						}
						// $('#welldonecap').addClass('hidden');
						$.k2l.ukQuiz_3.allowClick = true; // Make the buttons clickable again
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
				$.k2l.ukQuiz_3.index++
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
						if ($.k2l.ukQuiz_3.index > $.k2l.ukQuiz_3.answer_index.length) {
							$.k2l.ukQuiz_3.index = 0;
						}
						// $('#welldonecap').addClass('hidden');
						$.k2l.ukQuiz_3.allowClick = true; // Make the buttons clickable again
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
						
					}, 1000);
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		$.k2l.ukQuiz_3.index = 0;
		$.k2l.ukQuiz_3.allowClick = true;
	}

});

Template.ukQuiz_3.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.ukQuiz_3 == 'undefined') {
		$.k2l.ukQuiz_3 = {};
	};
	
	var answer_index = ["2"];
	
	$.k2l.ukQuiz_3.answer_index = answer_index;
	$.k2l.ukQuiz_3.index = 0;

	$.k2l.ukQuiz_3.allowClick = true;
}