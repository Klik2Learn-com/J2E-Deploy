Template.m2Game_Score.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2Game_Score")
	},

	perfectScore: function () {
		return Session.get('Easy_Correct') == 34;

	},

	excellentScore: function () {
		var Easy_Correct = Session.get('Easy_Correct');
		return Easy_Correct >= 26 && Easy_Correct < 34;
	},

	goodScore: function () {
		var Easy_Correct = Session.get('Easy_Correct');
		return Easy_Correct >= 17 && Easy_Correct < 26;

	},

	okayScore: function () {
		var Easy_Correct = Session.get('Easy_Correct');
		return Easy_Correct > 9 && Easy_Correct < 19;
	},

	badScore: function () {
		var Easy_Correct = Session.get('Easy_Correct');
		return Easy_Correct  <= 9;
	},

	//The 27 should be changed with the number of questions for the given game, taken from the DB (via server method call)
	percentage: function () {
		var correctScore = Session.get('Easy_Correct');
		var percentage = Math.round(correctScore / 34 * 100);
		return percentage;
	},

	medal: function () {
		var correctScore = Session.get('Easy_Correct');
		var percentage = Math.round(correctScore / 34 * 100);

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

Template.m2Game_Score.events({
	'click .start-again': function () {
		Session.set('Easy_Correct', 0);
		Session.set('Easy_Incorrect', 0);
		forceReload();
	}
});