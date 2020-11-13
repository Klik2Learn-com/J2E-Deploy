Template.noteViewer.rendered = function() {
	
	document.title = "View Note - Journey 2 English";
	
}

Template.noteViewer.helpers({

	addComment: function() {
		return Template.instance().addComment.get();
	}	

});

Template.noteViewer.events({

	'click *[data-function="add-comment"]': function(evt) {
		Template.instance().addComment.set(true)
		var lastCommentId;

		if (this.comments == undefined) {
			var note = $('p[data-identifier="'+this._id+'"]');
			Template.instance().highlightComment.set(false);
			Template.instance().noteId = this._id;
		} else {
			for (var i = 0; i < this.comments.length; i++) {
				if (this.comments[i].userType == "student") {
					lastCommentId = this.comments[i]._id;
				}
			}

			if (lastCommentId != null) {
				var note = $('p[data-identifier="'+lastCommentId+'"]');
				Template.instance().highlightComment.set(true);
				Template.instance().noteId = lastCommentId;
			} else {
				var note = $('p[data-identifier="'+this._id+'"]');
				Template.instance().highlightComment.set(false);
				Template.instance().noteId = this._id;
			}			
		}

		note = note[0];
		Template.instance().highlighter.binder(note);
		this.preHighlight = $(note).html();
	},

	'click *[data-function="cancel-comment"]': function(evt) {
		if (Template.instance().addComment.get() == true) {
			Template.instance().addComment.set(false);
		}
		Template.instance().highlighter.destroy();
		$('p[data-identifier="'+Template.instance().noteId+'"]').html(this.preHighlight);
	},

	'click *[data-function="confirm-highlight-comment"]': function(evt, template) {
		var comment = $('#comment-body').val();
		var updatedNote = $('p[data-identifier="'+Template.instance().noteId+'"]').html();
		var noteId = this._id;
		var commentId = Template.instance().noteId

		if (comment != "") {
			if (Template.instance().highlightComment.get() == true) {
				$('p[data-identifier="'+Template.instance().noteId+'"]').html('');
				Meteor.call('insertCommentComment', noteId, updatedNote, commentId, comment, function(error, result) {
					if (!error) {
						template.addComment.set(false);
					}
				});					
			} else {
				$('p[data-identifier="'+Template.instance().noteId+'"]').html('');
				Meteor.call('insertNoteComment', noteId, updatedNote, comment, function(error, result) {
					if (!error) {
						template.addComment.set(false);
					}
				});				
			}
			Template.instance().highlighter.destroy();
		} else {
			alert('Please write a comment or click cancel');
		}
	},

	'click .color-picker > div': function(evt) {
		var color = $(evt.currentTarget).attr('data-color');
		Template.instance().highlighter.setColor(color);

		$('.color-picker > div').removeClass('selected');
		$(evt.currentTarget).addClass('selected');
	},

	'click #btnReturn': function(evt) {
		Router.go('/user/' + Router.current().params.userId)
	}
	
});

Template.noteViewer.created = function() {

	Template.instance().addComment = new ReactiveVar(false);

	Template.instance().highlighter = new TextHighlighter();
	Template.instance().preHighlight = {};

	Template.instance().highlightComment = new ReactiveVar(false);
	Template.instance().noteId = {};
};