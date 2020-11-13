Template.voiceRecorderViewer.rendered = function() {
	
	document.title = "Listen to Recording - Journey 2 English";
	
}

Template.voiceRecorderViewer.helpers({

	commentRecording: function() {
		var commentId = String(this._id);
		return commentRecordings.findOne({ _id : commentId })
	},

	isTutorComment: function() {
		if (this.userType == "tutor") {
			return true;
		} else {
			return false;
		}
	},

	typeAudio: function() {
		if (this.type === "audio") {
			return true;
		} else {
			return false;
		}
	},
	
	  comments: function() {
    if (this.comments == undefined || this.comments == 0) {
      return false;
    } else {
      return true;
    }
  }

});

Template.voiceRecorderViewer.events({

	'click *[data-function="playAudio"]': function(evt) {
		var audio = new Audio();
		audio.src = $(evt.currentTarget).attr('data-audiosrc');
		audio.play();
	}

});

Template.voiceRecorderViewer.created = function() {
	//this.subscribe('Users');
}
