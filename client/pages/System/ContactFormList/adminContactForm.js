Template.adminContactForm.created = function(){
	this.subscribe('contact_form');
};

Template.adminContactForm.helpers({

	userIdToName : function(uId){
		var user = Meteor.users.findOne({_id : uId});
		if(user === undefined){
			return 'User non-existing';
		}
		return user.profile.firstname + " " + user.profile.surname;
	}

});

Template.adminContactForm.events({

	'click .status.dropdown-menu li a' : function(evt){
		$("#form-status").html(evt.currentTarget.innerHTML);
		$("#form-status").removeClass('faded');
	},

	'click #saveStatusButton' : function(evt){

		var status = $('#form-status').html();
		
		if (status == "Select from the list"){
			Bert.alert( "Please choose a status from the list" , 'warning', 'growl-top-right' );
			return;
		}

		Meteor.call('changeContactFormStatus', status, Router.current().params.contactFormId, function (error, result) {
			if (!error) {
				Bert.alert( 'Contact form report status changed', 'success', 'growl-top-right' );
				 $("#form-status").addClass('faded');
				 $('#form-status').html("Select from the list");

			} else {
				Bert.alert( error.toString() , 'danger', 'growl-top-right' );
			}
		});
	}
});

Template.adminContactForm.rendered = function(){
	document.title = "Contact form report - Journey 2 English";
};