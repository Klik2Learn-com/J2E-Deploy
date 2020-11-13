Template.Yeti_d1_h1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#Yeti_d1_h1");
	}
});

Template.Yeti_d1_h1.events({
	
	"submit form" : function(evt) {
		
		if (evt.preventDefault){
			evt.preventDefault();
		}
		
		// Tidy the user input
		var userText = evt.target.userText.value;
		if (userText.charAt(userText.length - 1) == '.') {
			userText = userText.substr(0, userText.length - 1);
		}
		userText = $.trim(userText);
		userText = userText.toLowerCase();
		
		
		// Check the user's answer
		if (userText == $.k2l.yeti_d1_h1.correctAnswers[$.k2l.yeti_d1_h1.index]){
			
			// Incremement the user's score:
			var tempScore = Session.get('yetiScore');
			tempScore += 2;
			Session.set('yetiScore', tempScore);
			
			$.k2l.yeti_d1_h1.correctCount++;
			
			// User answer is CORRECT
			var parentSection = $(evt.currentTarget).parents('section');
			$(evt.currentTarget).parent().html('&nbsp;' + $.k2l.yeti_d1_h1.correctAnswers[$.k2l.yeti_d1_h1.index] + '&nbsp;'); // Place the correct answer in
			$('#entryanswer'+$.k2l.yeti_d1_h1.index).addClass('correctword'); // Highlight the correct answer in green
			
			// If not reached the end of the text entry game
			if ($.k2l.yeti_d1_h1.index < $.k2l.yeti_d1_h1.correctAnswers.length - 1) {
				$.k2l.yeti_d1_h1.index++; 
				$('#entryanswer'+$.k2l.yeti_d1_h1.index).removeClass('blank'); // set inputbox to next blank space
				$('#entryanswer'+$.k2l.yeti_d1_h1.index).html('<form class="textentry"><input type="text" name="userText" size="2"><input type="submit" value="OK"></form>');
			} else {
				revealNextPage(parentSection);
			}
		} else {
			// User answer is INCORRECT
			$('.incorrectbig').removeClass('hidden'); // show the X
			setTimeout(function() {
				$('.incorrectbig').addClass('hidden')
			}, 2000);
	
			evt.target.userText.value = ""; // Set entrybox to empty
		}
	},
	
	"click #skip": function(evt) {
		var parentSection = $(evt.currentTarget).parents('section');
		
		$('#entryanswer'+$.k2l.yeti_d1_h1.index).html($.k2l.yeti_d1_h1.correctAnswers[$.k2l.yeti_d1_h1.index]);
		$('#entryanswer'+$.k2l.yeti_d1_h1.index).addClass('correctword');
		
		if ($.k2l.yeti_d1_h1.index < $.k2l.yeti_d1_h1.correctAnswers.length - 1) {
			$.k2l.yeti_d1_h1.index++;
			$('#entryanswer'+$.k2l.yeti_d1_h1.index).removeClass('blank');
			$('#entryanswer'+$.k2l.yeti_d1_h1.index).html('<form class="textentry"><input type="text" name="userText" size="7"><input type="submit" value="OK"></form>');
		} else {
			revealNextPage(parentSection);
		}
	},
	
	"click .pagination": function(evt){
		$.k2l.yeti_d1_h1.index = 0;
		$.k2l.yeti_d1_h1.correctCount = 0;
	}
	
});

Template.Yeti_d1_h1.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.yeti_d1_h1 == 'undefined') {
		$.k2l.yeti_d1_h1 = {};
	};

	$.k2l.yeti_d1_h1.index = 0;
	$.k2l.yeti_d1_h1.correctCount = 0;
	
	var correctAnswers = [
			["at"],
			["of"],
			["about"],
			["by"],			// Possible answers for Q1.
			["since"],   // Possible answers for Q2.
			["weather"] // etc.
		];
		
	$.k2l.yeti_d1_h1.correctAnswers = correctAnswers;
}

function revealNextPage(parentSection){
	if ($.k2l.yeti_d1_h1.correctCount >=5) {
		Session.set('d1_h1_result', 'correct');
	} else {
		Session.set('d1_h1_result', 'incorrect');	
	}
	
	setTimeout(function() {
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
	}, 1500);
	$('#skip').addClass('hidden');				// reveal the next button
	
	// Reset variables..
	$.k2l.yeti_d1_h1.index = 0;
	$.k2l.yeti_d1_h1.correctCount = 0;
}