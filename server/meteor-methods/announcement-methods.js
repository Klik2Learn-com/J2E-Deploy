Meteor.methods({

	'addAnnouncements': function (title, msg, aExpiry, userId) {
		var org = Meteor.users.findOne({ _id: userId }).organisation;
		var formattedDate = new Date();
		var currentDate = new Date();
		var expiry = new Date(currentDate.setTime(currentDate.getTime() + aExpiry * 86400000));

		try {
			return Announcements.insert({ author: userId, date: formattedDate, organisation: org[0], expiry: expiry, title: title, message: msg, readBy: [] });
		} catch (err) {
			throw new Meteor.Error(err.message);
		}
	},

	'editAnnouncements': function (id, title, msg, aExpiry, userId) {
		// var org = Meteor.users.findOne({_id: userId}).organisation;
		var currentDate = new Date();
		var expiry = new Date(currentDate.setTime(currentDate.getTime() + aExpiry * 86400000));

		try {
			return Announcements.update(
				{ _id: id },
				{
					$set: {
						title: title,
						message: msg,
						expiry: expiry,
						editedBy: userId
					}
				},
				{ upsert: true }
			);
		} catch (err) {
			throw new Meteor.Error(err.message);
		}
	},

	'deleteAnnouncements': function (id) {
		Announcements.remove({ _id: id });
	},

	'markReadAnnouncement': function(id, userId){
		Announcements.update({_id: id}, {$push : { "readBy" : userId}});
	}
});