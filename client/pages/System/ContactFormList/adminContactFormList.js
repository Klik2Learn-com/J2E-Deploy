Template.adminContactFormList.created = function(){
	this.subscribe('contact_form');
};

Template.adminContactFormList.helpers({

	contact_form: function() {
		return contact_form.find({});
	},

	userIdToName : function(uId){
		var user = Meteor.users.findOne({_id : uId});
		if(user === undefined){
			return 'User non-existing';
		}
		return user.profile.firstname + " " + user.profile.surname;
	}
});

Template.adminContactFormList.events({
	'click .tablesorter-headerRow' : function(evt){
		$("#adminContactFormListTable").trigger("update");
		$("#adminContactFormListTable").trigger("appendCache");
	}
});

Template.adminContactFormList.rendered = function(){
	
	document.title = "Contact Form List - Journey 2 English";

	$("#adminContactFormListTable").tablesorter();
};