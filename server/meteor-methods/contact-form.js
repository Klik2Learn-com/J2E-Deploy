Meteor.methods({

	'submitContactForm': function(formType, name, email, organisation, uID) {
		var d = new Date();
		var formattedDate = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

		try {
			return contact_form.insert({userId: uID, formType: formType, status: "New", date: formattedDate, name: name, email: email, organisation: organisation[0]});
		} catch (err) {
			throw new Meteor.Error(err.message);
		}
	},

	'changeContactFormStatus': function(status, messageId){
		if (Roles.userIsInRole( Meteor.userId(), 'admin' )) {
			try {
				return contact_form.update({_id : messageId}, {$set : {status : status}});
			} catch (err) {
				throw new Meteor.Error(err.message);
			}
		} else {
			throw new Meteor.Error(500, 'You\'re not an admin - no permission to change contact form status.');
		}
	}
});