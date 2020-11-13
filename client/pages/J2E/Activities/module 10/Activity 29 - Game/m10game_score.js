Template.m10Game_Score.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10Game_Score")
	},

	perfectScore: function () {

		var Easy_Correct = Session.get('Easy_Correct');
		if (Easy_Correct == 39) {
			return true;
		} else {
			return false;
		}


	},
	excellentScore: function () {

		var Easy_Correct = Session.get('Easy_Correct');
		if (Easy_Correct > 30 && Easy_Correct < 39 || Easy_Correct == 30) {
			return true;
		} else {
			return false;
		}


	},

	goodScore: function () {
		var path = Session.get('hardpath');
		if (path == true) {
			var Easy_Correct = Session.get('Easy_Correct');
			if (Easy_Correct > 20 && Easy_Correct < 30 || Easy_Correct == 20) {
				return true;
			} else {
				return false;
			}
		} else {
			var Easy_Correct = Session.get('Easy_Correct');
			if (Easy_Correct > 20 && Easy_Correct < 30 || Easy_Correct == 20) {
				return true;
			} else {
				return false;
			}
			//   var Easy_Correct = Session.get('Easy_Correct');
			// if (Easy_Correct >= 30){
			//   return true;  
			// } else {
			//   return false;
			// }
		}

	},

	okayScore: function () {
		var path = Session.get('hardpath');
		if (path == true) {
			var Easy_Correct = Session.get('Easy_Correct');
			if (Easy_Correct > 10 && Easy_Correct < 20) {
				return true;
			} else {
				return false;
			}
		} else {
			var Easy_Correct = Session.get('Easy_Correct');
			if (Easy_Correct > 10 && Easy_Correct < 20) {
				return true;
			} else {
				return false;
			}
		}


	},

	badScore: function () {
		var path = Session.get('hardpath');
		if (path == true) {
			var Easy_Correct = Session.get('Easy_Correct');
			if (Easy_Correct <= 10) {
				return true;
			} else {
				return false;
			}
		} else {
			var Easy_Correct = Session.get('Easy_Correct');
			if (Easy_Correct <= 10) {
				return true;
			} else {
				return false;
			}
		}

	},

	hardpath: function () {
		var path = Session.get('hardpath');
		if (path != true) {
			return true;
		}
	},
	percentage: function () {
		var path = Session.get('hardpath');
		if (path == true) {
			var correctScore = Session.get('Easy_Correct');
		} else {
			var correctScore = Session.get('Easy_Correct');
		}

		var percentage = Math.round(correctScore / 39 * 100);

		return percentage;

	},
	medal: function () {
		var path = Session.get('hardpath');
		if (path == true) {
			var correctScore = Session.get('Easy_Correct');
		} else {
			var correctScore = Session.get('Easy_Correct');
		}

		var percentage = Math.round(correctScore / 39 * 100);

		if (percentage == 100) {
			return "score1";
		}
		else if (percentage >= 75) {
			return "score2";
		}
		else if (percentage >= 50) {
			return "score3";
		}
		else if (percentage >= 25) {
			return "score4";
		}
		else if (percentage <= 24) {
			return "score5";
		}
	}

});

Template.m10Game_Score.events({
	'click .start-again': function (evt) {
		Session.set('Easy_Correct', 0);
		Session.set('R1_Correct', 0);
		Session.set('R2_Correct', 0);
		Session.set('R3_Correct', 0);
		Session.set('R4_Correct', 0);
		Session.set('R5_Correct', 0);
		Session.set('R6_Correct', 0);
		Session.set('R7_Correct', 0);
		Session.set('R8_Correct', 0);
		Session.set('R9_Correct', 0);
		Session.set('R10_Correct', 0);
		Session.set('R11_Correct', 0);
		Session.set('R12_Correct', 0);
		Session.set('R13_Correct', 0);
		Session.set('Easy_Incorrect', 0);
		Session.set('Hard_Correct', 0);
		Session.set('Hard_Incorrect', 0);
		Session.set('hardpath', false);
		forceReload();
	}
});

