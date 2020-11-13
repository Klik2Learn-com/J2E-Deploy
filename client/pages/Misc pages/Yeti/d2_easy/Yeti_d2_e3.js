Template.Yeti_d2_e3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#Yeti_d2_e3");
	}
});

Template.Yeti_d2_e3.events({
	
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
		if (userText == $.k2l.Yeti_d2_e3.correctAnswers[$.k2l.Yeti_d2_e3.index]){
			
			// Incremement the user's score:
			var tempScore = Session.get('yetiScore');
			tempScore += 1;
			Session.set('yetiScore', tempScore);
			
			$.k2l.Yeti_d2_e3.correctCount++;
			
			// User answer is CORRECT
			var parentSection = $(evt.currentTarget).parents('section');
			$(evt.currentTarget).parent().html($.k2l.Yeti_d2_e3.correctAnswers[$.k2l.Yeti_d2_e3.index]); // Place the correct answer in
			$('#entryanswer'+$.k2l.Yeti_d2_e3.index).addClass('correctword'); // Highlight the correct answer in green
			
			// If not reached the end of the text entry game
			if ($.k2l.Yeti_d2_e3.index < $.k2l.Yeti_d2_e3.correctAnswers.length - 1) {
				$.k2l.Yeti_d2_e3.index++; 
				$('#entryanswer'+$.k2l.Yeti_d2_e3.index).removeClass('blank'); // set inputbox to next blank space
				$('#entryanswer'+$.k2l.Yeti_d2_e3.index).html('<form class="textentry"><input type="text" name="userText" size="4"><input type="submit" value="OK"></form>');
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
		
		$('#entryanswer'+$.k2l.Yeti_d2_e3.index).html($.k2l.Yeti_d2_e3.correctAnswers[$.k2l.Yeti_d2_e3.index]);
		$('#entryanswer'+$.k2l.Yeti_d2_e3.index).addClass('correctword');
		
		if ($.k2l.Yeti_d2_e3.index < $.k2l.Yeti_d2_e3.correctAnswers.length - 1) {
			$.k2l.Yeti_d2_e3.index++;
			$('#entryanswer'+$.k2l.Yeti_d2_e3.index).removeClass('blank');
			$('#entryanswer'+$.k2l.Yeti_d2_e3.index).html('<form class="textentry"><input type="text" name="userText" size="7"><input type="submit" value="OK"></form>');
		} else {
			revealNextPage(parentSection);
		}
	},
	
	"click .pagination": function(evt){
		
		$.k2l.Yeti_d2_e3.index = 0;
		$.k2l.Yeti_d2_e3.correctCount = 0;
	}
	
});

Template.Yeti_d2_e3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.Yeti_d2_e3 == 'undefined') {
		$.k2l.Yeti_d2_e3 = {};
	};

	$.k2l.Yeti_d2_e3.index = 0;
	$.k2l.Yeti_d2_e3.correctCount = 0;
	var correctAnswers = [
			["on"], // Possible answers for Q1.
			["with"],   // Possible answers for Q2.
			["across"] // etc.
		];
		
	$.k2l.Yeti_d2_e3.correctAnswers = correctAnswers;
	
}

// Function sets the interaction as CORRECT or INCORRECT and reveals the 
// next page
function revealNextPage (parentSection) {
	if ($.k2l.Yeti_d2_e3.correctCount == 3) {
		Session.set('d1_e1_result', 'correct');
	} else {
		Session.set('d1_e1_result', 'incorrect');	
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
	$.k2l.Yeti_d2_e3.index = 0;
	$.k2l.Yeti_d2_e3.correctCount = 0;
}