Template.bugReporting.rendered = function() {	
	document.title = "Report an Issue - Journey 2 English";
}

Template.bugReporting.events({

	'click .browser.dropdown-menu li a' : function(evt){
		$("#form-browser").html(evt.currentTarget.innerHTML);
		$("#form-browser").removeClass('faded');
	},


	'click .device.dropdown-menu li a' : function(evt){
		$("#form-device").html(evt.currentTarget.innerHTML);
		$("#form-device").removeClass('faded');
	},

	'click #submitReportButton' : function(evt){

		var device = $('#form-device').html(),
		    browser = $('#form-browser').html(),
		    location = $('#form-location').val(),
		    description = $('#form-description').val();

		if (description == ""){
			Bert.alert( "Please describe your problem" , 'warning', 'growl-top-right' );
			return;
		}

		Meteor.call('submitBugReport', device, browser, location, description, Meteor.userId(), function (error, result) {
			if (!error) {
				Bert.alert( 'Bug report submitted', 'success', 'growl-top-right' );
			     $("#form-browser").addClass('faded');
				 $("#form-device").addClass('faded');
				 $('#form-device').html("Choose from the menu");
				 $('#form-browser').html("Choose from the menu"),
				 $('#form-location').val("");
				 $('#form-description').val("");

			} else {
				Bert.alert( error.toString() , 'danger', 'growl-top-right' );
			}
		});
	}
})