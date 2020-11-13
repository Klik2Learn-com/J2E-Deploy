Template.adminNewUserPanel.rendered = function() {
	
	document.title = "Add User - Journey 2 English";
	
}

Template.adminNewUserPanel.helpers({

	organisation: function() {
		return organisations.find({});
	},

	setPasswordManually: function() {
		return Template.instance().setPassword.get();
	}

});

Template.adminNewUserPanel.events({

	'click *[data-function="clear-form"]': function(evt) {
		if(!confirm('Are you sure you want to clear this form?'))return;
		$(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
    	$(':checkbox, :radio').prop('checked', false);
    	Bert.alert( 'Form cleared', 'success', 'growl-top-right' );
	},

	'click [name="setPassword"]': function(event) {
		if ($(event.currentTarget).val() == "manualSet") {
			Template.instance().setPassword.set(true);
		} else if ($(event.currentTarget).val() == "userSet") {
			Template.instance().setPassword.set(false);
		}
	},

	// 'change input[name="setInitialAssessment"]': function(event) {
	// 	console.log($(event.currentTarget).val());
	// 	Session.set('selectedAssessment', $(event.currentTarget).val());
	// },

	'click button[data-function="add-user"]': function(evt) {
		evt.preventDefault();
		var firstname = $("#firstname").val();
		var surname = $("#surname").val();
		var username = $("#username").val();
		var email = $("#email").val();
		var organisation = $('#organisationSelector').val();
		var expiry = $('#expiry').val();

		var role = $("#roles option:selected").val();
		var password = {};

		var authorisedCourses = [];
		var assignInitAssessment = false;
		//var selectedAssessment = Session.get('selectedAssessment');

		if (role == '') {
			alert("Please select a Role for this user from the 'Roles' dropdown menu.");
			return;
		}

		// if (selectedAssessment == undefined || selectedAssessment == null) {
		// 	alert("Please select a Product from the Products section.");
		// 	return;
		// }

		console.log($('input[name="setInitialAssessment"]:checked').val());		
		if ($('input[name="setInitialAssessment"]:checked').val() == 'setInitAssessment') {
			console.log("test only");
			assignInitAssessment = true;
		} else if ($('input[name="setInitialAssessment"]:checked').val() == 'setCourse') {
			console.log("course only");
			authorisedCourses.push('journey2English');
		} else {
			console.log("set both");
			assignInitAssessment = true;
			authorisedCourses.push('journey2English');
		}


		if (Template.instance().setPassword.get()) {
			// Get the password value and call the createNewPasswordAccount Method.
			password = $('#password').val();
			var newUserObj = {
				fName: firstname,
				lName: surname,
				userName: username,
				email: email,
				pass: password,
				org: [organisation],
				group: null,
				authorised: authorisedCourses,
				role: role,
				expiry: expiry,
				registration: false,
				cert: 1
			};
			Meteor.call('createNewPasswordAccount', newUserObj, function(error, result) {
				if (error) {
					alert("Registration Error: " + error);
				} else {
					if (assignInitAssessment) {
						Meteor.call('assignNewAssessment', result);
					}
					Bert.alert( 'User Successfully Created!', 'success', 'growl-top-right' );
					$("input[type='text']").val('');
					$("input[type='email']").val('');
				}
			})
		} else {
			// Call the 'createNewEnrollmentAccount' method to automatically email the user and ask them to set a password.
			if (validator.isValidEmailAddress(email)) {
				Meteor.call('createNewEnrollmentAccount', firstname, surname, username, email, organisation, authorisedCourses, role, expiry, function(err, result) {
					if (err) {
						alert("Registration Error: " + err);
					} else {
						Bert.alert( 'User Successfully Created!', 'success', 'growl-top-right' );
						if (assignInitAssessment) {
							Meteor.call('assignNewAssessment', result);
						}
					}
				})
			} else {
				alert('Registration Error: Email Address is not in the valid format. Please use the format "joe@company.com"');
			}
		}

	}

});

Template.adminNewUserPanel.created = function() {
	Template.instance().setPassword = new ReactiveVar(true);

	this.subscribe('duration_log');
}