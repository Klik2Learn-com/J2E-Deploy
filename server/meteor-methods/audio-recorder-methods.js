Meteor.methods({

	'deleteAudioRecording': function(fileId) {
		if (Meteor.userId()) {
			var recording = audioRecordings.findOne({ _id : fileId });
			if (recording.ownerId == Meteor.userId()) {
				audioRecordings.remove({ _id : fileId });
			}		
		}
	},

	'addAudioComment': function(fileId, commentId) {
		if (Meteor.userId() && Roles.userIsInRole(Meteor.userId(), "student")) {
			audioRecordings.update({ _id : fileId },
			{
				$addToSet : { 
					comments : { 
						_id : commentId, 
						type : "audio",
						commenter: Meteor.userId(),
						userType: "student"
					} 
				}
			})
		} else if(Meteor.userId() && Roles.userIsInRole(Meteor.userId(), "tutor")) {
			audioRecordings.update({ _id : fileId },
			{
				$addToSet : { 
					comments : { 
						_id : commentId, 
						type : "audio",
						commenter: Meteor.userId(),
						userType: "tutor"
					} 
				}
			})
		}else if(Meteor.userId() && Roles.userIsInRole(Meteor.userId(), "moderator")) {
			audioRecordings.update({ _id : fileId },
			{
				$addToSet : { 
					comments : { 
						_id : commentId, 
						type : "audio",
						commenter: Meteor.userId(),
						userType: "tutor"
					} 
				}
			})
		}else if(Meteor.userId() && Roles.userIsInRole(Meteor.userId(), "admin")) {
			audioRecordings.update({ _id : fileId },
			{
				$addToSet : { 
					comments : { 
						_id : commentId, 
						type : "audio",
						commenter: Meteor.userId(),
						userType: "admin"
					} 
				}
			})
		}
	},

	'insertAudioTextComment': function(noteId, commentText) {
		if (Meteor.userId() && Roles.userIsInRole(Meteor.user(), "student")) {
			audioRecordings.update({ _id : noteId }, 
				{	
					$addToSet: { 
						comments : { 
							comment : commentText,
							type : "text",
							commenter: Meteor.userId(),
							userType: "student"
						} 
					}
				}
			);
		} else if(Meteor.userId() && Roles.userIsInRole(Meteor.user(), "tutor")) {
			audioRecordings.update({ _id : noteId }, 
				{	
					$addToSet: { 
						comments : { 
							comment : commentText,
							type : "text",
							commenter: Meteor.userId(),
							userType: "tutor"
						} 
					}
				}
			);
		} else if(Meteor.userId() && Roles.userIsInRole(Meteor.user(), "moderator")) {
			audioRecordings.update({ _id : noteId }, 
				{	
					$addToSet: { 
						comments : { 
							comment : commentText,
							type : "text",
							commenter: Meteor.userId(),
							userType: "tutor"
						} 
					}
				}
			);
		} else if(Meteor.userId() && Roles.userIsInRole(Meteor.user(), "admin")) {
			audioRecordings.update({ _id : noteId }, 
				{	
					$addToSet: { 
						comments : { 
							comment : commentText,
							type : "text",
							commenter: Meteor.userId(),
							userType: "Admin"
						} 
					}
				}
			);
		}
	}

})