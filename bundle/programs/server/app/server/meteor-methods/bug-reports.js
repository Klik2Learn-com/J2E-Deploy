(function(){Meteor.methods({

	'submitBugReport': function(device, browser, location, description, uID) {
		var d = new Date();
		var formattedDate = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

		try {
			return bug_reports.insert({userId: uID, status: "New", date: formattedDate, device: device, browser: browser, location: location, description: description });
		} catch (err) {
			throw new Meteor.Error(err.message);
		}
	},

	'changeBugReportStatus': function(status, bugId){
		if (Roles.userIsInRole( Meteor.userId(), 'admin' )) {
			try {
				return bug_reports.update({_id : bugId}, {$set : {status : status}});
			} catch (err) {
				throw new Meteor.Error(err.message);
			}
		} else {
			throw new Meteor.Error(500, 'You\'re not an admin - no permission to change bug report status.');
		}
	}
});
}).call(this);
