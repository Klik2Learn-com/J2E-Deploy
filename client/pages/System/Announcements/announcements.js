Template.adminAnnouncements.created = function() {
	this.subscribe('Announcements');
	Session.set('editedAnnouncements',false);
}

Template.adminAnnouncements.rendered = function() {	
	document.title = "Announcements - Journey 2 English";
}

Template.adminAnnouncements.helpers({
	
	'Announcements':function(){
		return Announcements.find({});
	},

	'edited':function(){
		return Announcements.findOne({_id: this._id}).editedBy;
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

	'editAnnouncements': function(){
		if(Session.get('editAnnouncements')){
			return "";
		}else {
			return "hidden";
		}
	}
	
})

Template.adminAnnouncements.onRendered(function(){
	
	$( ".announcement-title-input" ).on('input', function() {
    if ($(this).val().length>=70) {
		$(this).parent().children('.announce-limit-msg').css('display', 'block');	
	}
	else {
		$(this).parent().children('.announce-limit-msg').css('display', 'none');

    }
});
	
})

Template.adminAnnouncements.events({

	'click *[data-function="clear-form"]': function(evt) {
		if(!confirm('Are you sure you want to clear this form?'))return;
		$(':input').not(':button, :submit, :reset, :hidden, [type="number"], :checkbox, :radio').val('');
		$(':input[type="number"]').val('7');
    	$(':checkbox, :radio').prop('checked', false);
    	Bert.alert( 'Form cleared', 'success', 'growl-top-right' );
	},
	
	'click *[data-function="delete-Announcements"]': function(evt) {
		if(!confirm('Are you sure you want to delete this Announcement?'))return;
		id = this._id;
		Meteor.call('deleteAnnouncements', id);
    	Bert.alert( 'Announcement deleted', 'success', 'growl-top-right' );
	},

	'click *[data-function="edit-Announcements"]': function(evt) {
		evt.preventDefault();
		Session.set('editAnnouncements', true);
		var Announcements = Announcements.findOne({_id: this._id});
		$("#editTitle").val(Announcements.title);
		$("#editMsg").val(Announcements.message);
		Session.set("id", Announcements._id);

		var expiryDate = Announcements.expiry;

		var date = new Date(expiryDate);
		var currentDate = new Date();

		var expiry= Math.floor(((date - currentDate) / (24 * 60 * 60 * 1000)) * 100) / 100;

		$("#editExpiry").val(expiry);



	},

	'click *[data-function="Announcements-edit"]': function(evt) {
		evt.preventDefault();

		var title = $("#editTitle").val();
		var msg = $("#editMsg").val();
		var expiry = $("#editExpiry").val();
		var userId = Meteor.userId();
		var id = Session.get('id');
		if(expiry>30){
			alert("Announcements cannot be longer than 30 days");
		} else{
			Meteor.call('editAnnouncement', id, title, msg, expiry, userId, function(error, result) {
				if (error) {
					alert("Announcement Error: " + error);
				} else {
					
					Bert.alert( 'Announcement Successfully edited!', 'success', 'growl-top-right' );
					$('input').not('[type="number"]').val('');
					$('input[type="number"]').val('7');
					$('textarea').val('');
					Session.set('editAnnouncements', false);

				}
			})
		}


	},


	'click button[data-function="add-Announcements"]': function(evt) {
		evt.preventDefault();
		var title = $("#Title").val();
		var msg = $("#Msg").val();
		// msg = msg.replace(/\r?\n/g, '\n');
		var expiry = $("#Expiry").val();
		
		if(title.length < 1 || msg.length < 1 || expiry.length < 1){
			alert("Please fill in all fields before creating a new announcement!");
			return false;
		}

		var userId = Meteor.userId();
		if(expiry>30){
			alert("Announcements cannot be longer than 30 days");
		} else{
			Meteor.call('addAnnouncements', title, msg, expiry, userId, function(error, result) {
				if (error) {
					alert("Announcement Error: " + error);
				} else {
					
					Bert.alert( 'Announcement Successfully Created!', 'success', 'growl-top-right' );
					$('input').not('[type="number"]').val('');
					$('input[type="number"]').val('7');
					$('textarea').val('');
				}
			})
		}

	}

});
