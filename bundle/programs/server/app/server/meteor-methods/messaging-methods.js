(function(){Meteor.methods({
	'sendMessage': function(receiver, msgsubject, msgbody, uID){
		if(msgbody == ''){
			throw new Meteor.Error(500, 'You can\'t send an empty message.');
		} else if(msgsubject == '') {
			throw new Meteor.Error(500, 'You can\'t send a message without a subject.');
		} else {
			var d = new Date();
			// var formattedDate = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
			var dayNames = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
			var monthNames = [  "Jan", "Feb", "Mar",  "Apr", "May", "June", "July",  "Aug", "Sept", "Oct",  "Nov", "Dec"];
			var date = new Date();
			var dayIndex = date.getDay();
			var dateNo = date.getDate();
			var monthIndex = date.getMonth();
			var year = date.getFullYear();
			var hours = date.getHours();
			var minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();
			var formattedDate = dayNames[dayIndex] + ' ' + monthNames[monthIndex] + ' ' + dateNo + ' ' + year + ' ' + hours + ':' + minutes;

			messages.insert({"p1": uID, "p2": receiver, "p1_unread": false, "p2_unread": true, "p1_visible":true, "p2_visible": true, "title": msgsubject, "messages": [{"sender": uID, "date": formattedDate,  "message": msgbody}] });
		}
	},

	'sendReply': function( mID, sender, msgbody){
		if(msgbody == ''){
			throw new Meteor.Error(500, 'You can\'t send an empty message.');
		} else {
			var d = new Date();
			// var formattedDate = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
			var dayNames = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
			var monthNames = [  "Jan", "Feb", "Mar",  "Apr", "May", "June", "July",  "Aug", "Sept", "Oct",  "Nov", "Dec"];
			var date = new Date();
			var dayIndex = date.getDay();
			var dateNo = date.getDate();
			var monthIndex = date.getMonth();
			var year = date.getFullYear();
			var hours = date.getHours();
			var minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();
			var formattedDate = dayNames[dayIndex] + ' ' + monthNames[monthIndex] + ' ' + dateNo + ' ' + year + ' ' + hours + ':' + minutes;

			obj = {};
			obj["messages"] = {"sender": sender, "date": formattedDate,  "message": msgbody}; 
		
			messages.update({$and:[{ _id : mID }]}, {$addToSet: obj});

			var currentConv = messages.findOne({"_id": mID});

			if (currentConv.p1 == sender){
				messages.update({$and:[{ _id : mID }]}, { $set : {p2_unread: true}});
			}else{
				messages.update({$and:[{ _id : mID }]}, { $set : {p1_unread: true}});
			}
		}
	},

	'deleteMessage': function(mID, uID){
		var currentConv = messages.findOne({"_id": mID});

		if (currentConv.p1 == uID){
			messages.update({$and:[{ _id : mID }]}, { $set : {p1_visible: false}});
		}else{
			messages.update({$and:[{ _id : mID }]}, { $set : {p2_visible: false}});
		}
	},

	'readMessage': function(mID, uID){
		var currentConv = messages.findOne({"_id": mID});

		if (currentConv.p1 == uID){
			messages.update({$and:[{ _id : mID }]}, { $set : {p1_unread: false}});
		}else{
			messages.update({$and:[{ _id : mID }]}, { $set : {p2_unread: false}});
		}
	}


});
}).call(this);
