Template.Yeti_d3_result.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		if (activeSection == "#Yeti_d3_result"){
			setTimeout(function(){
				document.location.hash = "Yeti_map3";
				Session.set("activeSection", "#Yeti_map3");
				$('#Yeti_d3_result').addClass('hidden');
				$('#Yeti_map4').removeClass('hidden');
			}, 5000);
			return true;
		}
	},
	
	highScore: function() {
		// Get the user Score and return true if it is above threshold.
		if (Session.get('d3_hardpath')){
			var correctCount = 0;
			// Loop through hard results and record corrects.
			for (var i=1; i < 4; i++) {
				if (Session.get('d3_h'+i+'_result') == 'correct'){
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
		if (Session.get('d3_hardpath')){
			var correctCount = 0;
			// Loop through hard results and record corrects.
			for (var i=1; i < 4; i++) {
				if (Session.get('d3_h'+i+'_result') == 'correct'){
					correctCount++;
				}
			}
			if (correctCount == 2){
				return true;
			} else {
				return false;
			}
		} else {
			// EASY PATH CHOSEN. RESULT DEPENDS ON PREVIOUS PATH
			if (Session.get('d2_hardpath')) { 
				////// PREVIOUS DAY WAS HARDPATH /////
				var correctCount = 0;
				// Loop through hard results and record corrects.
				for (var i=1; i < 6; i++) {
					if (Session.get('d3_e'+i+'_result') == 'correct'){
						correctCount++;
					}
				}
				if (correctCount >= 4){
					return true;
				} else {
					return false;
				}
			} else {
				////// PREVIOUS DAY WAS EASYPATH /////
				var correctCount = 0;
				// Loop through hard results and record corrects.
				for (var i=1; i < 6; i++) {
					if (Session.get('d3_e'+i+'_result') == 'correct'){
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
	},
	
	
	badScore: function() {
		if (Session.get('d3_hardpath')){
			var correctCount = 0;
			// Loop through hard results and record corrects.
			for (var i=1; i < 4; i++) {
				if (Session.get('d3_h'+i+'_result') == 'correct'){
					correctCount++;
				}
			}
			if (correctCount == 1){
				return true;
			} else {
				return false;
			}
		} else {
			// EASY PATH CHOSEN. RESULT DEPENDS ON PREVIOUS PATH
			if (Session.get('d2_hardpath')) { 
				////// PREVIOUS DAY WAS HARDPATH /////
				var correctCount = 0;
				// Loop through hard results and record corrects.
				for (var i=1; i < 6; i++) {
					if (Session.get('d3_e'+i+'_result') == 'correct'){
						correctCount++;
					}
				}
				if (correctCount > 0 && correctCount < 4){
					return true;
				} else {
					return false;
				}
			} else {
				////// PREVIOUS DAY WAS EASYPATH /////
				var correctCount = 0;
				// Loop through hard results and record corrects.
				for (var i=1; i < 6; i++) {
					if (Session.get('d3_e'+i+'_result') == 'correct'){
						correctCount++;
					}
				}
				if (correctCount == 3){
					return true;
				} else {
					return false;
				}
			}
		}
	},
	
	terribleScore: function() {
		if (Session.get('d3_hardpath')){
			var correctCount = 0;
			// Loop through hard results and record corrects.
			for (var i=1; i < 4; i++) {
				if (Session.get('d3_h'+i+'_result') == 'correct'){
					correctCount++;
				}
			}
			if (correctCount < 3){
				return true;
			} else {
				return false;
			}
		} else {
			// EASY PATH CHOSEN. RESULT DEPENDS ON PREVIOUS PATH
			if (Session.get('d2_hardpath')) { 
				var correctCount = 0;
				// Loop through hard results and record corrects.
				for (var i=1; i < 6; i++) {
					if (Session.get('d3_e'+i+'_result') == 'correct'){
						correctCount++;
					}
				}
				if (correctCount == 0){
					return true;
				} else {
					return false;
				}
			} else {
				////// PREVIOUS DAY WAS EASYPATH /////
				var correctCount = 0;
				// Loop through hard results and record corrects.
				for (var i=1; i < 6; i++) {
					if (Session.get('d3_e'+i+'_result') == 'correct'){
						correctCount++;
					}
				}
				if (correctCount < 3){
					return true;
				} else {
					return false;
				}
			}
		}
	},
});