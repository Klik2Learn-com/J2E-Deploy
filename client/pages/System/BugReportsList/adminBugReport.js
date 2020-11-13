Template.adminBugReport.created = function(){
	this.subscribe('bug_reports');
};

Template.adminBugReport.helpers({

	userIdToName : function(uId){
		var user = Meteor.users.findOne({_id : uId});
		if(user === undefined){
			return 'User non-existing';
		}
		return user.profile.firstname + " " + user.profile.surname;
	}

});

Template.adminBugReport.events({

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

		Meteor.call('changeBugReportStatus', status, Router.current().params.bugId, function (error, result) {
			if (!error) {
				Bert.alert( 'Bug report status changed', 'success', 'growl-top-right' );
				 $("#form-status").addClass('faded');
				 $('#form-status').html("Select from the list");

			} else {
				Bert.alert( error.toString() , 'danger', 'growl-top-right' );
			}
		});
	}
});

Template.adminBugReport.rendered = function(){
	document.title = "Bug report - Journey 2 English";
};