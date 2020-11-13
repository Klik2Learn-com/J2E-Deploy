Template.layout.rendered = function () {
	var classNames = [];
	// if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i)) classNames.push('device-ios');
	if (navigator.userAgent.match(/android/i)) classNames.push('device-android');

	var html = document.getElementsByTagName('html')[0];

	if (classNames.length) classNames.push('on-device');
	if (html.classList) html.classList.add.apply(html.classList, classNames);
};

function toTitleCase(str) {
	return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}

Template.layout.helpers({
	header: function(){
		var header = "bodyHeader";
		var userOrganisations = Meteor.users.findOne({ _id: Meteor.userId()}).organisation;
		if(userOrganisations != undefined && userOrganisations != null){
			if(Array.isArray(userOrganisations)){
				userOrganisations.forEach(function(orgId){
					var org = organisations.findOne({_id: orgId});
					if(org != null && org != undefined){
						if(org.name == 'English Master')
							header = "EnglishMasterHeader";
					}
				});
			}else{
				if(userOrganisations.name == 'English Master')
					header = "EnglishMasterHeader";
			}
		}
		return header;
	}
})

Template.layout.events({

	'submit #login-form': function (evt) {
		evt.preventDefault();
		var username = $('#login-email').val();
		var password = $('#login-password').val();
		$("#sign-in-spinner").removeClass('hidden');
		$("#login-button").addClass('hidden');
		Meteor.loginWithPassword(username, password, function (error) {
			if (error) {
				Bert.alert(error.toString(), 'danger', 'growl-top-right');
				$("#sign-in-spinner").addClass('hidden');
				$("#login-button").removeClass('hidden');
			} else {
				Router.go("/");
			}
		});
	},

	'click #reset-form-show-button': function (evt) {
		$("#forgot-password-container").removeClass('hidden');
		$("#login-form").addClass('hidden');
	},

	'click #reset-cancel': function (evt) {
		$("#forgot-password-container").addClass('hidden');
		$("#login-form").removeClass('hidden');
	},

	'click .call-login-box': function (evt) {
		$('#login-box').addClass('animated');
		$('#login-box').removeClass('hidden');
		$("#forgot-password-container").addClass('hidden');
		$("#login-form").removeClass('hidden');
	},

	'click #login-box a[data-target="close"]': function (evt) {
		$('#login-box').addClass('hidden');
		$('#login-box').removeClass('animated');
	},
	
	'click a.gototop': function(evt) {
		evt.preventDefault();
		$("html, body").animate({ scrollTop: 0 }, "fast");
	}
})



/**
*   @Template.event: NewRegistration ()
*   @summary: - This event validates the register user form on (system/login.html)
*				and sends user details to createNewEnrollmentAccount.
*
*   @requires: Data sending to createNewPasswordAccount() server/meteor-methods/user-account-methods.js
*
*   @returns:  
* 
* 	For help contact Boundary Creative
**/

/* THIS IS AN OLD TEMPLATE THAT WE DO NOT USE ANYMORE
Template.RegisterOld.events({
	'submit #user-register-form': function (e) {
		e.preventDefault();
		if (Honeypot.isHuman("#user-register-form")) {
			Honeypot.removeHoneypotFields("#user-register-form");

			var newRegistrationForm = $(e.currentTarget);
			$('.registrationErrors').html('');
			var firstName = toTitleCase(newRegistrationForm.find('#registerFName').val());
			firstName = firstName.trim();
			var lastName = toTitleCase(newRegistrationForm.find('#registerLName').val());
			lastName = lastName.trim();
			var userEmail = toTitleCase(newRegistrationForm.find('#registerEmail').val());
			userEmail = userEmail.trim();
			var userEmailConfirm = toTitleCase(newRegistrationForm.find('#registerEmailConfirm').val());
			userEmailConfirm = userEmailConfirm.trim();
			var userPassword = newRegistrationForm.find('#registerPassword').val();
			var userPasswordConfirm = newRegistrationForm.find('#registerPasswordConfirm').val();
			var tcInput = newRegistrationForm.find('#tcCheck').is(':checked');

			var organisation = 'Public';
			var authorisedCourses = '';
			var role = 'publicSignup';
			var expiry = '';

			var errorMessage = false;

			if (tcInput == false) {
				var errorMessage = "Please agree with the Terms & Conditions";
			}



			if (lastName.length < 3) {
				var errorMessage = '<strong>Registration Error:</strong> Please enter a Lastname.';
			}

			if (firstName.length < 3) {
				var errorMessage = '<strong>Registration Error:</strong> Please enter a Firstname.';
			}
			if (userPassword.length < 7) {
				var errorMessage = '<strong>Registration Error:</strong> Please enter a password longer than 6 characters.';
			}
			if (validator.isValidEmailAddress(userEmail) == false) {
				var errorMessage = '<strong>Registration Error:</strong> Email Address is not in the valid format. Please use the format "joe@company.com"';
			}
			if (userEmail != userEmailConfirm) {
				var errorMessage = "<strong>Registration Error:</strong> Emails do not match, Please check emails provided."
			}
			if (userPassword != userPasswordConfirm) {
				var errorMessage = "<strong>Registration Error:</strong> Passwords do not match, Please check passwords provided."
			}
			if (errorMessage === false) {
				var newUserObj = {
					fName: firstname,
					lName: lastName,
					userName: userEmail,
					email: userEmail,
					pass: userPassword,
					org: organisation,
					group: null,
					authorised: authorisedCourses,
					role: role,
					expiry: expiry,
					registration: true,
				};
				Meteor.call('createNewPasswordAccount', newUserObj, function (err, result) {
					if (err) {
						$('.registrationErrors').show().html("<strong>Registration Error:</strong> " + err);

					} else {
						//Bert.alert( 'User Successfully Created!'+result, 'success', 'growl-top-right' );
						if (result) {
							Meteor.call('assignNewAssessment', result);

							Meteor.loginWithPassword(userEmail, userPassword);
							Router.go('/Courses');
							//PAYMENT STUFF
							var selectedPlanId = Session.get("selectedPlanId");
							var appliedVoucher = Session.get("appliedVoucher");

							Meteor.call('methodSinglePackage', selectedPlanId, function (error, response) {

								// HANDLE ERROR!!!
								selectedPackage = returnPackageDetails(response[0], appliedVoucher)
								voucherArray = appliedVoucher;
								var cost = selectedPackage.cost;

								var planType = selectedPackage.planType;
								var planTimeAmount = selectedPackage.planTimeAmount;

								if (typeof selectedPackage.discountedCost !== 'undefined' && selectedPackage.discountedCost.length > 0) {
									cost = selectedPackage.discountedCost;
								}

								if (typeof planType !== 'undefined') {

									var testPublishableKey = Meteor.settings.public.testPublishableKey;
									var livePublishableKey = Meteor.settings.public.livePublishableKey;

									if (cost > 0) {
										StripeCheckout.open({
											key: livePublishableKey,
											amount: cost,
											name: 'Journey 2 English Course',
											currency: "gbp",
											description: selectedPackage.name,
											panelLabel: 'Buy Now',
											token: function (res) {
												stripeToken = res.id;
												Session.set("appliedVoucher", '');
												Meteor.call('chargeCard', stripeToken, cost, planType, planTimeAmount, voucherArray, function (error, response) {
													if (response === 'error') {
														$('.stripeOutput').text('<div class="error">Sorry, there has been an error processing your card. You have not been charged.</div>');
													} else {

														Bert.alert('<h4 class="center">Well done you are ready to start.</h4>', 'success', 'fixed-top', 'fa-check');
													}
												});
											}
										});
									} else {

										Meteor.call('processVoucher', cost, planType, planTimeAmount, voucherArray, function (error, response) { });
										Bert.alert('<h4 class="center">Well done you are ready to start.</h4>', 'success', 'fixed-top', 'fa-check');

									}


								}
							});




							//Bert.alert( 'Thank You. Your account has been created. Please log-in to continue.', 'success', 'growl-top-right' );
							
															$('#login-box').addClass('animated');
															$('#login-box').removeClass('hidden');
															$("#forgot-password-container").addClass('hidden');
															$("#register-container").addClass('hidden');
															$("#login-form").removeClass('hidden');
							
						} else {
							Bert.alert('Sorry there has been an error', 'error', 'growl-top-right');
						}
					}
				})
			} else {
				$('.registrationErrors').show().html(errorMessage);
			};
		} else {
			return false;
		}
	}
});
*/

// Package - Applying Discount
// Returning the package with the discount added.
/*
function returnPackageDetails(packageArray, appliedVoucher) {
	packageArray.discountedCost = false;

	if (typeof appliedVoucher !== 'undefined' && appliedVoucher.length === 1) {

		activeVoucher = appliedVoucher;
		var applyVoucher = true;

		if (activeVoucher[0].applyPlans.length > 0) {
			applyVoucher = false;

			activeVoucher[0].applyPlans.forEach(function (planID) {
				if (planID === packageArray.planId) {
					applyVoucher = true;
				}
			});

		}

		if (applyVoucher === true) {
			// Voucher Rules Start
			if (activeVoucher[0].discountType === "percent") {
				displayPackageDiscount = 0.01 * activeVoucher[0].discount * packageArray.cost;
				packageArray.discountedCost = (packageArray.cost - displayPackageDiscount).toFixed(0);
			}


			if (activeVoucher[0].discountType === "trial") {
				packageArray.planTimeAmount = 14;
				packageArray.planType = "trial";
				packageArray.cost = 0;
				packageArray.name = "14 day Trial";

			}

			if (activeVoucher[0].discountType === "Assessment") {
				packageArray.planTimeAmount = 365;
				packageArray.planType = "Assessment";
				packageArray.cost = 0;
				packageArray.name = "English Skills Test";

			}

		}

	}

	return packageArray;
}
*/