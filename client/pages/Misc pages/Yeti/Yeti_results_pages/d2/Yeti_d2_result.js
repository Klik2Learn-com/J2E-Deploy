Template.Yeti_d2_result.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		if (activeSection == "#Yeti_d2_result"){
			setTimeout(function(){
				document.location.hash = "Yeti_map3";
				Session.set("activeSection", "#Yeti_map3");
				$('#Yeti_d2_result').addClass('hidden');
				$('#Yeti_map3').removeClass('hidden');
			}, 5000);
			return true;
		}
	},
	
	highScore: function() {
		// Get the user Score and return true if it is above threshold.
		if (Session.get('d2_hardpath')){
			var correctCount = 0;
			// Loop through hard results and record corrects.
			for (var i=1; i < 4; i++) {
				if (Session.get('d2_h'+i+'_result') == 'correct'){
					correctCount++;
				}
			}
			if (correctCount == 3){
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	},
	
	mediumScore: function() {
		// Get the user Score and return true if it is above threshold.
		if (Session.get('d2_hardpath')){
			var correctCount = 0;
			// Loop through hard results and record corrects.
			for (var i=1; i < 4; i++) {
				if (Session.get('d2_h'+i+'_result') == 'correct'){
					correctCount++;
				}
			}
			if (correctCount == 2){
				return true;
			} else {
				return false;
			}
		} else {
			var correctCount = 0;
			// Loop through easy results and record corrects.
			for (var i=1; i < 6; i++) {
				if (Session.get('d2_e'+i+'_result') == 'correct'){
					correctCount++;
				}
			}
			if (correctCount >= 4){
				return true;
			} else {
				return false;
			}
		}
	},
	
	
	badScore: function() {
		if (Session.get('d2_hardpath')){
			var correctCount = 0;
			// Loop through hard results and record corrects.
			for (var i=1; i < 4; i++) {
				if (Session.get('d2_h'+i+'_result') == 'correct'){
					correctCount++;
				}
			}
			if (correctCount < 2){
				return true;
			} else {
				return false;
			}
		} else {
			var correctCount = 0;
			// Loop through easy results and record corrects.
			for (var i=1; i < 6; i++) {
				if (Session.get('d2_e'+i+'_result') == 'correct'){
					correctCount++;
				}
			}
			if (correctCount < 4){
				return true;
			} else {
				return false;
			}
		}
	},
});