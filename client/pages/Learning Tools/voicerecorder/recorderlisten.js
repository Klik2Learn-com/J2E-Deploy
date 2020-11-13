Template.recorderlisten.helpers({

  'dateFormat':function(date){
		var date = new Date(date);
		var day = (date.getUTCDate()<10?'0':'') + date.getUTCDate();
		var month = ((date.getUTCMonth() + 1)<10?'0':'') + (date.getUTCMonth() + 1); //months from 1-12
		var year = date.getUTCFullYear();
		var hours = (date.getHours()<10?'0':'') + date.getHours();
		var minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();

		var formattedDate = day + "/" + month + "/" + year + " " + hours + ":" + minutes;
    return formattedDate;
  },

  recordComment: function() {
    return Template.instance().recordComment.get();
  },

  recording: function() {
    return Template.instance().recording.get();
  },
  userRecordings: function(){
    return audioRecordings.find({});
  },

  recorded: function() {
    return Template.instance().recorded.get();
  },

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

  lastCommentIsTutor: function() {
    if (this.comments == undefined || this.comments == 0) {
      return false;
    }
    var length = this.comments.length;
    if (this.comments[length-1].userType == "tutor") {
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
  },

  noComments: function() {
    if (this.comments == undefined || this.comments == 0) {
      return true;
    } else {
      return false;
    }
  },

  typeAudio: function() {
    if (this.type == "audio") {
      return true;
    } else {
      return false;
    }
  }

})

Template.recorderlisten.events({
  'click .buttonplay': function(evt){
    Template.instance().player.setAttribute("src",this.url());
    Template.instance().player.play();
  },

  'click .fa-trash-alt': function(evt){
    Meteor.call("deleteAudioRecording", this._id, function(error, data){});
  }
});

Template.recorderlisten.created = function() {
  Template.instance().recorded = new ReactiveVar( false );
  Template.instance().recording = new ReactiveVar( false );
  Template.instance().player = new Audio();
	this.subscribe('audioRecordings');
  this.subscribe('commentAudioRecordings');
  this.subscribe('Users');
};
