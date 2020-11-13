Template.bespokeLoginBody.events({
    "click #login-button": function (evt) {
        evt.preventDefault();
        var username = $('#login-email').val();
        var password = $('#login-password').val();
        Meteor.loginWithPassword(username, password, function (error) {
            if (error){
                Bert.alert(error.toString(), 'danger', 'growl-top-right');
            } else {
                Router.go("/");
            }
        });

    },

    "click .open-register-float": function(evt){
        evt.preventDefault();

        $("#register-float").removeClass("hidden");
        $("body").addClass("noscroll");
    },

    // "click #sign-up-button": function (evt) {
        // evt.preventDefault();
        // var orgId = $(".signup-from").attr("data-orgId");
        // var accessCode = ($("#sign-up-code").val()).trim();
        // Meteor.call("redeemVoucher", accessCode, function (err, result) {
            // if (err) {
                // Bert.alert(err.toString(), 'danger', 'growl-top-right');
            // } else {
                // if (orgId === result[0].applyOrgID) {
                    // Session.set("access-code", accessCode);
                    // Session.set("custom-logo", "/images/logos/ae-logo2.png");
                    // Session.set("custom-logo-alt", "Aspire English");
                    // Router.go("/signup");
                // } else {
                    // Bert.alert("Invalid Voucher Code.", 'danger', 'growl-top-right');
                // }
            // }
        // })
    // }
})


Template.registerFormFloat.events({
	
    "click .close-register-float": function(evt){
        evt.preventDefault();
        $("#register-float").addClass("hidden");
        $("body").removeClass("noscroll");
    }
})


Template.registerForm.events({
    // Show Terms & Conditions
    'click .terms_activate': function (evt) {
        $('#terms_conditions_content').removeClass('hidden');
    },

    'click #register-button': function (evt) {

        evt.preventDefault();

        var isFormValid = true;
        $("#user-register-form2 input").each(function () {
            if ($.trim($(this).val()).length == 0 && $(this).attr("id") != "tcCheck") {
                // $(this).addClass("highlight"); - Use this instead of JS css
                $(this).css('border', '2px solid #f00');
                $(this).focus();
                isFormValid = false;
            } else {
                $(this).css('border', '');
                // $(this).removeClass("highlight");
            }
        });

        if (!isFormValid) {
            alert("Please fill in all fields");
            return false;
        }

        var userEmail = $('#registerEmail').val();
        userEmail = userEmail.trim();
        var userEmailConfirm = $('#registerEmailConfirm').val();
        userEmailConfirm = userEmailConfirm.trim();

        if (userEmail.indexOf("@") < 0 || userEmail.indexOf(".") < 0) {
            Bert.alert("Please provide a valid email", 'danger', 'growl-top-right');
            return false;
        }

        if (userEmail !== userEmailConfirm) {
            Bert.alert("Emails do not match", 'danger', 'growl-top-right');
            return false;
        }

        var userPassword = $('#registerPassword').val();
        var userPasswordConfirm = $('#registerPasswordConfirm').val();

        if (userPassword.length < 6) {
            Bert.alert("Password has to be at least 6 characters long", 'danger', 'growl-top-right');
            return false;
        }

        if (userPassword !== userPasswordConfirm) {
            Bert.alert("Passwords do not match", 'danger', 'growl-top-right');
            return false;
        }

        var tcInput = $('#tcCheck:checked');

        if (tcInput.length < 1) {
            Bert.alert("You have to agree with the terms and conditions", 'danger', 'growl-top-right');
            return false;
        }

        var accessCode = $("#registerAccessCode").val().trim();

        var voucher = null;

        Meteor.call("redeemVoucher", accessCode, function (err, voucherResult) {
            if (err) {
                //No such voucher or some other error
                Bert.alert(err.toString(), 'danger', 'growl-top-right');
            } else {
                voucher = voucherResult[0];
                var firstName = toTitleCase($('#registerFName').val());
                firstName = firstName.trim();
                var lastName = toTitleCase($('#registerLName').val());
                lastName = lastName.trim();

                var user = voucher.uId;

                if (user != null && user != 'undefined') {
                    //Existing user. Just extend their subscription
                    Meteor.call('methodSinglePackage', voucher.applyPlans[0], function (err, planResult) {
                        Meteor.call("addSubscriptionUserExpiry", user, planResult[0].planTimeAmount * 30);
                    });

                } else {
                    //New user. Create a new account for them.
                    var organisation = voucher.applyOrgID;
                    var group = voucher.applyGroupID;
                    var role = voucher.applyGroup;
                    var authorisedCourses = (voucher.discountType == "percent" ? ['journey2English'] : '');

                    var expiry = null;
                    //Need to get the plan from the DB to know how much time to add to this account.
                    //Make sure that applyPlans has only 1 item in the array by having radio buttons on the add voucher page for plan selection.
                    Meteor.call('methodSinglePackage', voucher.applyPlans[0], function (err, plan_Result) {
                        if (err) {
                            Bert.alert(err.toString(), 'danger', 'growl-top-right');
                        } else {
                            expiry = plan_Result[0].planTimeAmount * 30;

                            //Create a new user account with the details provided
                            var registration = true;
                            var newUserObj = {
                                fName: firstName,
                                lName: lastName,
                                userName: userEmail,
                                email: userEmail,
                                pass: userPassword,
                                org: [organisation],
                                group: group,
                                authorised: authorisedCourses,
                                role: role,
                                expiry: expiry,
                                registration: registration,
                                cert: 1
                            };
                            Meteor.call('createNewPasswordAccount', newUserObj, function (err, user_result) {
                                if (err) {
                                    Bert.alert(err.toString(), 'danger', 'growl-top-right');
                                } else {

                                    //Add the voucher to applied vouchers collection.
                                    Meteor.call('voucherUsed', accessCode, user_result);

                                    //Add Initial Assessment if needed.
                                    if (voucher.initialAssess) {
                                        Meteor.call('assignNewAssessment', user_result, true, function (err) {
                                            if (err) {
                                                alert(err)
                                            } else {
                                                //Login the new user.
                                                Meteor.loginWithPassword(userEmail, userPassword, function (err) {
                                                    if (err) {
                                                        Bert.alert(err.toString(), 'danger', 'growl-top-right');
                                                    } else {
                                                        $("body").removeClass("noscroll");
                                                        Router.go("/");
                                                    }
                                                });
                                            }
                                        });
                                    } else {
                                        //Login the new user.
                                        Meteor.loginWithPassword(userEmail, userPassword, function (err) {
                                            if (err) {
                                                Bert.alert(err.toString(), 'danger', 'growl-top-right');
                                            } else {
                                                $("body").removeClass("noscroll");
                                                Router.go("/");
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });

                }


            }
        });
    },

    "input #user-register-form2 input": function (evt) {
        if ($(evt.currentTarget).val().length > 0 && $(evt.currentTarget).attr("id") != "tcCheck") {
            // $(this).removeClass("highlight");
            $(evt.currentTarget).css('border', '');
        }
    }
});

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}