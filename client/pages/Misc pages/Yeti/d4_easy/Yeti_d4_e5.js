Template.Yeti_d4_e5.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#Yeti_d4_e5");
	}
});

Template.Yeti_d4_e5.events({
	
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
		if (userText == $.k2l.Yeti_d4_e5.correctAnswers[$.k2l.Yeti_d4_e5.index]){
			
			// Incremement the user's score:
			var tempScore = Session.get('yetiScore');
			tempScore += 1;
			Session.set('yetiScore', tempScore);
			
			$.k2l.Yeti_d4_e5.correctCount++;
			
			// User answer is CORRECT
			var parentSection = $(evt.currentTarget).parents('section');
			$(evt.currentTarget).parent().html($.k2l.Yeti_d4_e5.correctAnswers[$.k2l.Yeti_d4_e5.index]); // Place the correct answer in
			$('#entryanswer'+$.k2l.Yeti_d4_e5.index).addClass('correctword'); // Highlight the correct answer in green
			
			// If not reached the end of the text entry game
			if ($.k2l.Yeti_d4_e5.index < $.k2l.Yeti_d4_e5.correctAnswers.length - 1) {
				$.k2l.Yeti_d4_e5.index++; 
				$('#entryanswer'+$.k2l.Yeti_d4_e5.index).removeClass('blank'); // set inputbox to next blank space
				$('#entryanswer'+$.k2l.Yeti_d4_e5.index).html('<form class="textentry"><input type="text" name="userText" size="4"><input type="submit" value="OK"></form>');
			} else {
				// END OF GAME, MOVING ON TO NEXT
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
		
		$('#entryanswer'+$.k2l.Yeti_d4_e5.index).html($.k2l.Yeti_d4_e5.correctAnswers[$.k2l.Yeti_d4_e5.index]);
		$('#entryanswer'+$.k2l.Yeti_d4_e5.index).addClass('correctword');
		
		if ($.k2l.Yeti_d4_e5.index < $.k2l.Yeti_d4_e5.correctAnswers.length - 1) {
			$.k2l.Yeti_d4_e5.index++;
			$('#entryanswer'+$.k2l.Yeti_d4_e5.index).removeClass('blank');
			$('#entryanswer'+$.k2l.Yeti_d4_e5.index).html('<form class="textentry"><input type="text" name="userText" size="7"><input type="submit" value="OK"></form>');
		} else {
			revealNextPage(parentSection);
		}
	},
	
	"click .pagination": function(evt){
		
		$.k2l.Yeti_d4_e5.index = 0;
		$.k2l.Yeti_d4_e5.correctCount = 0;
	}
	
});

Template.Yeti_d4_e5.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.Yeti_d4_e5 == 'undefined') {
		$.k2l.Yeti_d4_e5 = {};
	};

	$.k2l.Yeti_d4_e5.index = 0;
	$.k2l.Yeti_d4_e5.correctCount = 0;
	var correctAnswers = [
			["about"], // Possible answers for Q1.
			["got"],   // Possible answers for Q2.
			["get"] // etc.
		];
		
	$.k2l.Yeti_d4_e5.correctAnswers = correctAnswers;
}

// Function sets the interaction as CORRECT or INCORRECT and reveals the 
// next page
function revealNextPage (parentSection) {
	if ($.k2l.Yeti_d4_e5.correctCount == 3) {
		Session.set('d4_e5_result', 'correct');
	} else {
		Session.set('d4_e5_result', 'incorrect');	
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
	$.k2l.Yeti_d4_e5.index = 0;
	$.k2l.Yeti_d4_e5.correctCount = 0;
}