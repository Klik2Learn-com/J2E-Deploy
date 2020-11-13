Template.moreAnnouncementsModal.helpers({
	
	'Announcements':function(){
		return Announcements.find({}, {sort: {date: -1}});
	},

	'AnnouncementsCount':function(){
		return Announcements.find({}).count();
	},

	'display':function(){
		var display = this.expiry;
		var date = new Date();
		if(display >= date){
			return true;
		}
	},

	'read': function(){
		var announcement = Announcements.findOne({_id: this._id});
		var read = announcement.readBy.includes(Meteor.userId());
		return read;
	}

});

Template.moreAnnouncementsModal.events({
	"click .readMsg": function(evt){
		evt.preventDefault();
		var announcementId = $(evt.currentTarget).data("target");
		markReadAnnouncement(announcementId, Meteor.userId());
	}
})