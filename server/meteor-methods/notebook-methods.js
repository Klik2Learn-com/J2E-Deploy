Meteor.methods({

	'saveNote': function(userId, title, body, formattedDate){
		// Do some checks on the data before writing to DB.
		
		if (title.length > 50) {
			throw new Meteor.Error("Invalid Note Title", "The note title must be less than 50 characters (including spaces).");
		} else if (title.length == 0) {
			throw new Meteor.Error("Invalid Note Title", "You must enter a title for the note.");
		} else if (body.length > 5000) { 
			throw new Meteor.Error("Invalid Note", "Your Note must not exceed 5000 characters. Your current character count is " + body.length + ".");
		} else if (body.length == 0) {
			throw new Meteor.Error("Invalid Note", "You must enter a Note.");
		} else {
			
			
			userNotes.insert({
				noteAuthor: userId,
				noteDate: formattedDate,
				noteTitle: title,
				noteBody: body
			});	
			return true
		}
	},
	
	'deleteNote': function(noteId){
		note = userNotes.findOne({_id: noteId});
		if (note.noteAuthor == Meteor.userId() || Roles.userIsInRole( Meteor.userId(), 'admin' )) {
			userNotes.remove({_id: noteId});
		}
				
	},
	
	'editNote': function(noteId, body){
		if (body.length == 0) {
			throw new Meteor.Error("Invalid Note", "You must enter a Note.");
		} else if (body.length > 5000) {
			throw new Meteor.Error("Invalid Note", "Your Note must not exceed 5000 characters. Your current character count is " + body.length + ".");
		} else {
			userNotes.update(
				{ _id: noteId },
				{
					$set: { noteBody: body }
				}
			)
		}
	},

	/****************************************
	*
	*			COMMENT METHODS
	*
	*****************************************/
	'insertNoteComment': function(noteId, body, comment) {
		// Check if Tutor/valid commentor
		if (Roles.userIsInRole(Meteor.user(), "tutor") || Roles.userIsInRole(Meteor.user(), "admin")) {
			userNotes.update({ _id : noteId }, 
			{
				$addToSet: { comments : {
						_id : Random.id(),
						title : "na",
						comment: comment,
						author: Meteor.userId(),
						userType: "tutor"
					}
				},
				$set: { noteBody: body }
			})
		} 
	},

	'insertCommentComment': function( noteId, updatedComment, commentId, comment) {
		if (Roles.userIsInRole(Meteor.user(), "tutor") || Roles.userIsInRole(Meteor.user(), "admin")) {
			userNotes.update({ _id : noteId }, 
			{
				$addToSet: { comments : {
						_id : Random.id(),
						title : "na",
						comment: comment,
						author: Meteor.userId(),
						userType: "tutor"
					}
				}
			});

			userNotes.update({ _id : noteId, "comments._id" : commentId }, 
			{
				$set: { "comments.$.comment" : updatedComment } 
			})
		} 
	},

	'insertStudentNoteComment': function(noteId, comment) {
		// Check if Student
		if (Roles.userIsInRole(Meteor.user(), "student") || Roles.userIsInRole(Meteor.user(), "admin")) {
			userNotes.update({ _id : noteId },
			{
				$addToSet: { comments : {
						_id : Random.id(),
						title : "na",
						comment: comment,
						author: Meteor.userId(),
						userType: "student"
					}
				}
			})
		} else if (Roles.userIsInRole(Meteor.user(), "tutor") || Roles.userIsInRole(Meteor.user(), "admin")) {
			userNotes.update({ _id : noteId },
			{
				$addToSet: { comments : {
						_id : Random.id(),
						title : "na",
						comment: comment,
						author: Meteor.userId(),
						userType: "tutor"
					}
				}
			})		
		}
	}
	
})







