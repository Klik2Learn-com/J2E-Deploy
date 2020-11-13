Template.m4Game_Score.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4Game_Score")
	},

	perfectScore: function () {

		var Easy_Correct = Session.get('Easy_Correct');
		if (Easy_Correct == 30) {
			return true;
		} else {
			return false;
		}


	},
	excellentScore: function () {

		var Easy_Correct = Session.get('Easy_Correct');
		if (Easy_Correct > 23 && Easy_Correct < 30 || Easy_Correct == 23) {
			return true;
		} else {
			return false;
		}


	},

	goodScore: function () {
		var path = Session.get('hardpath');
		if (path == true) {
			var Easy_Correct = Session.get('Easy_Correct');
			if (Easy_Correct > 15 && Easy_Correct < 23 || Easy_Correct == 15) {
				return true;
			} else {
				return false;
			}
		} else {
			var Easy_Correct = Session.get('Easy_Correct');
			if (Easy_Correct > 15 && Easy_Correct < 23 || Easy_Correct == 15) {
				return true;
			} else {
				return false;
			}
			//   var Easy_Correct = Session.get('Easy_Correct');
			// if (Easy_Correct >= 23){
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
			if (Easy_Correct > 8 && Easy_Correct < 15) {
				return true;
			} else {
				return false;
			}
		} else {
			var Easy_Correct = Session.get('Easy_Correct');
			if (Easy_Correct > 8 && Easy_Correct < 15) {
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
			if (Easy_Correct <= 8) {
				return true;
			} else {
				return false;
			}
		} else {
			var Easy_Correct = Session.get('Easy_Correct');
			if (Easy_Correct <= 8) {
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

		var percentage = Math.round(correctScore / 30 * 100);

		return percentage;

	},
	medal: function () {
		var path = Session.get('hardpath');
		if (path == true) {
			var correctScore = Session.get('Easy_Correct');
		} else {
			var correctScore = Session.get('Easy_Correct');
		}

		var percentage = Math.round(correctScore / 30 * 100);

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

Template.m4Game_Score.events({
	'click .start-again': function (evt) {
		Session.set('Easy_Correct', 0);
		Session.set('Easy_Incorrect', 0);
		Session.set('Hard_Correct', 0);
		Session.set('Hard_Incorrect', 0);
		Session.set('hardpath', false);
		forceReload();
	}
});