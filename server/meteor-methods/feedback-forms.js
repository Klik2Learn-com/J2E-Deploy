Meteor.methods({

    'submitFeedbackForm': function(name, scores, comments, uID) {
		var d = new Date();
		var formattedDate = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

		try {
			return feedback_forms.insert({userId: uID, name: name, date: formattedDate, scores: scores, comments: comments });
		} catch (err) {
			throw new Meteor.Error(err.message);
		}
	},

});