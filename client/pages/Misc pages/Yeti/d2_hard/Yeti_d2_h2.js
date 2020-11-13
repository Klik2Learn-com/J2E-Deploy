Template.Yeti_d2_h2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#Yeti_d2_h2");
	}
});

Template.Yeti_d2_h2.events({
	
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
		if (userText == $.k2l.Yeti_d2_h2.correctAnswers[$.k2l.Yeti_d2_h2.index]){
			
			// Incremement the user's score:
			var tempScore = Session.get('yetiScore');
			tempScore += 2;
			Session.set('yetiScore', tempScore);
			
			$.k2l.Yeti_d2_h2.correctCount = 0;
			
			// User answer is CORRECT
			var parentSection = $(evt.currentTarget).parents('section');
			$(evt.currentTarget).parent().html($.k2l.Yeti_d2_h2.correctAnswers[$.k2l.Yeti_d2_h2.index]); // Place the correct answer in
			$('#entryanswer'+$.k2l.Yeti_d2_h2.index).addClass('correctword'); // Highlight the correct answer in green
			
			// If not reached the end of the text entry game
			if ($.k2l.Yeti_d2_h2.index < $.k2l.Yeti_d2_h2.correctAnswers.length - 1) {
				$.k2l.Yeti_d2_h2.index++; 
				$('#entryanswer'+$.k2l.Yeti_d2_h2.index).removeClass('blank'); // set inputbox to next blank space
				$('#entryanswer'+$.k2l.Yeti_d2_h2.index).html('<form class="textentry"><input type="text" name="userText" size="4"><input type="submit" value="OK"></form>');
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
		
		$('#entryanswer'+$.k2l.Yeti_d2_h2.index).html($.k2l.Yeti_d2_h2.correctAnswers[$.k2l.Yeti_d2_h2.index]);
		$('#entryanswer'+$.k2l.Yeti_d2_h2.index).addClass('correctword');
		
		if ($.k2l.Yeti_d2_h2.index < $.k2l.Yeti_d2_h2.correctAnswers.length - 1) {
			$.k2l.Yeti_d2_h2.index++;
			$('#entryanswer'+$.k2l.Yeti_d2_h2.index).removeClass('blank');
			$('#entryanswer'+$.k2l.Yeti_d2_h2.index).html('<form class="textentry"><input type="text" name="userText" size="7"><input type="submit" value="OK"></form>');
		} else {
			revealNextPage(parentSection);
		}
	},
	
	"click .pagination": function(evt){
		
		$.k2l.Yeti_d2_h2.index = 0;
		$.k2l.Yeti_d2_h2.correctCount = 0;
	}
	
});

Template.Yeti_d2_h2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.Yeti_d2_h2 == 'undefined') {
		$.k2l.Yeti_d2_h2 = {};
	};

	$.k2l.Yeti_d2_h2.index = 0;
	$.k2l.Yeti_d2_h2.correctCount = 0;
	var correctAnswers = [
			["down"],
			["on"],
			["with"],
			["up"],			// Possible answers for Q1.
			["across"],   // Possible answers for Q2.
			["there"] // etc.
		];
		
	$.k2l.Yeti_d2_h2.correctAnswers = correctAnswers;
}

// Function sets the interaction as CORRECT or INCORRECT and reveals the 
// next page
function revealNextPage(parentSection) {
	if ($.k2l.Yeti_d2_h2.correctCount == 3) {
		Session.set('d2_h2_result', 'correct');
	} else {
		Session.set('d2_h2_result', 'incorrect');	
	}

	// Reveal the next page after timeout
	setTimeout(function() {
		$(parentSection).addClass('hidden'); // hide this page
		$(parentSection).next('section').removeClass('hidden');// reveal next page.
		document.location.hash = $(parentSection).next('section').attr('id');
		Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
	}, 1500);
	$('#skip').addClass('hidden');	// Hide skip button
	
	// Reset variables..
	$.k2l.Yeti_d2_h2.index = 0;
	$.k2l.Yeti_d2_h2.correctCount = 0;
}