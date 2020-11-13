Template.accountsButtons.events({
	'click #accB-logout': function(evt){
		Meteor.logout();
	},

	'click #accB-login-buttons-do-change-password': function(evt){
	     evt.preventDefault();

	     var oldPass = $('#accB-login-old-password').val();
	     var newPass = $('#accB-login-password').val();

	     //if(oldPass === newPass){
	     	Meteor.call('changePasswordAcc', oldPass, newPass, function (error, result) {
				if (!error) {
					Bert.alert( 'Password change successful', 'success', 'growl-top-right' );
				} else {
					Bert.alert( error.toString() , 'danger', 'growl-top-right' );
				}
			});
	     //}
		 //else {
		 //	Bert.alert( "Your password is wrong", 'warning', 'growl-top-right' );
		 //}
 	}
});