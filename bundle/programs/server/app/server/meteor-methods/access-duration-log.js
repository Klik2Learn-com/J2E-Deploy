(function(){Meteor.methods({
    'addSubscriptionUserExpiry' : function(uId, oldExpiry){
      	try {
    		var currentDate = Meteor.users.findOne({_id: uId}).expiry;
   		    var expiry = new Date(currentDate.setTime( currentDate.getTime() + oldExpiry * 86400000 ));
			Meteor.users.update({ _id : uId}, {$set : {expiry: expiry}});
		} catch (err) {
			throw new Meteor.Error(err.message);
		}
    },

    'removeSubscriptionUserExpiry' : function(uId, oldExpiry){
      	try {
   		    var expiry = new Date();
			Meteor.users.update({ _id : uId}, {$set : {expiry: expiry}});
		} catch (err) {
			throw new Meteor.Error(err.message);
		}
    },

    'customUserExpiry' : function(uId, oldExpiry){
      	try {
    		var currentDate = new Date();
   		    var expiry = new Date(currentDate.setTime( currentDate.getTime() + oldExpiry * 86400000 ));
			Meteor.users.update({ _id : uId}, {$set : {expiry: expiry}});
		} catch (err) {
			throw new Meteor.Error(err.message);
		}
    },

	'durationLogEntry': function(subscriberId, adminId, event, daysBefore, daysAfter) {
		try {
			duration_log.insert({subscriberId: subscriberId, adminId: adminId, event: event, daysBefore: daysBefore, daysAfter: daysAfter});
		} catch (err) {
			throw new Meteor.Error(err.message);
		}
		//(userId, Meteor.userId(), "Account creation.", 0, aExpiry)
	}

});


}).call(this);
