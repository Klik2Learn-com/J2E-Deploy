Template.m1Game_bad.events({
	// "click #m1game_end": function(evt){
	// 	evt.preventDefault();
	// 	var scoreCorrect = Session.get('Hard_Correct');
	// 	var scoreIncorrect = Session.get('Hard_Incorrect');

	// 	var parentSection = $(evt.currentTarget).parents('section');
	// 	var nextSection;

	// 	if(scoreCorrect > 27){
	// 		nextSection = "m1Game_outcome4";
	// 	} else if(scoreCorrect > 15) {
	// 		nextSection = "m1Game_outcome3";
	// 	} else if(scoreCorrect >3) {
	// 		nextSection = "m1Game_outcome2";
	// 	} else {
	// 		nextSection = "m1Game_outcome1";
	// 	}

	// 	$(parentSection).addClass('hidden'); // hide this page
	// 	$('#'+nextSection).removeClass('hidden');// reveal next page.		
	// 	document.location.hash = '#'+nextSection;
	// 	// Session.set("activeSection", '#'+nextSection);
	// }
});

Template.m1Game_bad.events({
	'click .start-again': function (evt) {
		Session.set('Easy_Correct', 0);
		Session.set('Easy_Incorrect', 0);
		Session.set('Hard_Correct', 0);
		Session.set('Hard_Incorrect', 0);
		Session.set('hardpath', false);
		forceReload();
	}
});

Template.m1Game_good2.events({
	'click .start-again': function (evt) {
		Session.set('Easy_Correct', 0);
		Session.set('Easy_Incorrect', 0);
		Session.set('Hard_Correct', 0);
		Session.set('Hard_Incorrect', 0);
		Session.set('hardpath', false);
		forceReload();
	}
});



Template.m1Game_outcomeD.helpers({


	percentage: function () {
		var path = Session.get('hardpath');
		if (path == true) {
			var correctScore = Session.get('Hard_Correct');

			var percentage = Math.round(correctScore / 30 * 100);

			return percentage;
		} else {
			var correctScore = Session.get('Easy_Correct');

			var percentage = Math.round(correctScore / 30 * 100);

			return percentage;
		}


	},
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1Game_outcomeD")
	},

	excellentScore: function () {

		var Hard_Correct = Session.get('Hard_Correct');
		if (Hard_Correct > 27) {
			return true;
		} else {
			return false;
		}


	},

	goodScore: function () {
		var path = Session.get('hardpath');
		if (path == true) {
			var Hard_Correct = Session.get('Hard_Correct');
			if (Hard_Correct > 15 && Hard_Correct < 27 || Hard_Correct == 15) {
				return true;
			} else {
				return false;
			}
		} else {
			var Easy_Correct = Session.get('Easy_Correct');
			if (Easy_Correct >= 20) {
				return true;
			} else {
				return false;
			}
		}

	},

	okayScore: function () {
		var path = Session.get('hardpath');
		if (path == true) {
			var Hard_Correct = Session.get('Hard_Correct');
			if (Hard_Correct > 3 && Hard_Correct < 15) {
				return true;
			} else {
				return false;
			}
		} else {
			var Easy_Correct = Session.get('Easy_Correct');
			if (Easy_Correct > 5 && Easy_Correct < 20) {
				return true;
			} else {
				return false;
			}
		}


	},

	badScore: function () {
		var path = Session.get('hardpath');
		if (path == true) {
			var Hard_Correct = Session.get('Hard_Correct');
			if (Hard_Correct < 3) {
				return true;
			} else {
				return false;
			}
		} else {
			var Easy_Correct = Session.get('Easy_Correct');
			if (Easy_Correct < 5) {
				return true;
			} else {
				return false;
			}
		}

	}

});

Template.m1Game_bad2.helpers({
	percentage: function () {
		var path = Session.get('hardpath');
		if (path == true) {
			var correctScore = Session.get('Hard_Correct');
		} else {
			var correctScore = Session.get('Easy_Correct');
		}

		var percentage = Math.round(correctScore / 30 * 100);

		return percentage;

	},
	medal: function () {
		var path = Session.get('hardpath');
		if (path == true) {
			var correctScore = Session.get('Hard_Correct');
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
Template.m1Game_okay2.helpers({
	percentage: function () {
		var path = Session.get('hardpath');
		if (path == true) {
			var correctScore = Session.get('Hard_Correct');
		} else {
			var correctScore = Session.get('Easy_Correct');
		}

		var percentage = Math.round(correctScore / 30 * 100);

		return percentage;

	},
	medal: function () {
		var path = Session.get('hardpath');
		if (path == true) {
			var correctScore = Session.get('Hard_Correct');
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
Template.m1Game_good2.helpers({
	hardpath: function () {
		var path = Session.get('hardpath');
		if (path != true) {
			return true;
		}
	},
	percentage: function () {
		var path = Session.get('hardpath');
		if (path == true) {
			var correctScore = Session.get('Hard_Correct');
		} else {
			var correctScore = Session.get('Easy_Correct');
		}

		var percentage = Math.round(correctScore / 30 * 100);

		return percentage;

	},
	medal: function () {
		var path = Session.get('hardpath');
		if (path == true) {
			var correctScore = Session.get('Hard_Correct');
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
Template.m1Game_excellent2.helpers({
	percentage: function () {
		var correctScore = Session.get('Hard_Correct');

		var percentage = Math.round(correctScore / 30 * 100);

		return percentage;

	},
	medal: function () {
		var correctScore = Session.get('Hard_Correct');

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