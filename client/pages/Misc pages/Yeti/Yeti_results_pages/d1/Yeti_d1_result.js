Template.Yeti_d1_result.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		
		// If this section is on screen start the timer to load the next page.
		if (activeSection == "#Yeti_d1_result") {
			setTimeout(function(){
				document.location.hash = "Yeti_map2";
				Session.set("activeSection", "#Yeti_map2");
				$('#Yeti_d1_result').addClass('hidden');
				$('#Yeti_map2').removeClass('hidden');
			}, 5000);
			return true;
		}
	},
	
	highScore: function() {
		
		// Get the user Score and return true if it is above threshold.
		if (Session.get('d1_hardpath')){
			var correctCount = 0;
			// Loop through hard results and record corrects.
			for (var i=1; i < 4; i++) {
				if (Session.get('d1_h'+i+'_result') == 'correct'){
					correctCount++;
				}
			}
			if (correctCount >= 3){
				return true;
			} else {
				return false;
			}
		} else {
			var correctCount = 0;
			// Loop through easy results and record corrects.
			for (var i=1; i < 6; i++) {
				if (Session.get('d1_e'+i+'_result') == 'correct'){
					correctCount++;
				}
			}
			if (correctCount >= 4){
				return true;
			} else {
				return false;
			}
		}
	}
});
