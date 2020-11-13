Template.adminUserControls.created = function() {
    this.subscribe('organisations');
    this.subscribe('groups');

    Session.set("multiUserList", ((window.location.href).substring(((window.location.href).indexOf("user/") + "user/".length), (window.location.href).length)).split(","));
};


Template.adminUserControls.helpers({
    editMulti: function() {
        return (Session.get("multiUserList").length > 1);
    },

    editMod: function() {
        return Roles.userIsInRole(this._id, 'moderator')
    },

    modOrgs: function() {
        if (!Roles.userIsInRole(this._id, 'moderator')) return [];

        var orgs = [];
        for (var i = 0; i < this.organisation.length; i++) {
            orgs.push(organisations.findOne({ _id: this.organisation[i] }));
        }
        return orgs;
    },

    groups: function() {
        return getOrganisationGroups(Session.get("selectedOrganisation"));
    },

    organisations: function() {
        var currOrgs = this.organisation;
        return organisations.find({ _id: { $nin: [currOrgs] } });
    },

    orgIsSelected: function() {
        return (Session.get("selectedOrganisation") != undefined || organisations.find({}).count() == 1)
    },

    getUserOrg: function() {
        var orgs = Meteor.users.findOne({ _id: this._id }).organisation;
        var orgNames = "";
        orgs.forEach(function(orgId) {
            orgNames += (organisations.findOne({ _id: orgId }).name);
            orgNames += ", ";
        })
        orgNames = orgNames.substring(0, orgNames.length - 2);
        return orgNames;
    },

    activeSubscription: function(uId) {
        var expiryDate = Meteor.users.findOne({ _id: uId }).expiry;

        if (expiryDate == undefined) {
            return "No expiry date";
        }

        var date = new Date(expiryDate);
        var currentTime = new Date();


        var day = (date.getUTCDate() < 10 ? '0' : '') + date.getUTCDate();
        var month = ((date.getUTCMonth() + 1) < 10 ? '0' : '') + (date.getUTCMonth() + 1); //months from 1-12
        var year = date.getUTCFullYear();
        var hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
        var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

        var formattedDate = day + "/" + month + "/" + year + " " + hours + ":" + minutes;

        if (currentTime < date) {
            return "<span style='color:green'>" + formattedDate + "</span>";
        } else {
            return "<span style='color:red'>" + formattedDate + "</span>";
        }
        //return formattedDate;
    },

    daysRemaining: function(uId) {
        var expiryDate = Meteor.users.findOne({ _id: uId }).expiry;

        if (expiryDate == undefined) {
            return "-";
        }

        var date = new Date(expiryDate);
        var currentDate = new Date();

        return Math.floor(((date - currentDate) / (24 * 60 * 60 * 1000)) * 100) / 100;
    },

    getCertificateStatus: function(uId) {
        var certificateStatus = Meteor.users.findOne({ _id: uId }).certificateEnabled;
        if (certificateStatus != null && certificateStatus != undefined) {
            if (certificateStatus) {
                return "Enabled";
            } else {
                return "Disabled";
            }
        }

    }

});

Template.adminUserControls.rendered = function() {
    document.title = "Edit User - Journey 2 English";
}

Template.adminUserControls.events({

    'click .remove-org': function(evt) {
        evt.preventDefault();
        var userId = location.href.substring(location.href.lastIndexOf("/") + 1, location.length);
        var user = Meteor.users._collection._docs._map[userId];
        if (user.organisation.length <= 1) {
            Bert.alert('Users must be in at least one organisation', 'danger', 'growl-top-right');
            return false;
        }

        Meteor.call('removeOrganisationFromUser', this._id, userId, function(err, result) {
            if (!err) {
                Bert.alert('Organisation Removed', 'success', 'growl-top-right');
            } else {
                Bert.alert(err.toString(), 'danger', 'growl-top-right');
            }
        });
    },

    'click .open-add-org-box': function(evt) {
        $(".add-org-box").toggleClass('hidden');
    },

    'click .add-org': function(evt) {
        evt.preventDefault();
        var orgId = $("#selectOrg").find('option:selected').val();

        if (orgId == "" || orgId == undefined) return false;

        Meteor.call('addOrganisationToUser', orgId, this._id, function(err, result) {
            if (!err) {
                Bert.alert('Organisation Added', 'success', 'growl-top-right');
            } else {
                Bert.alert(err.toString(), 'danger', 'growl-top-right');
            }
        });

        $(".add-org-box").toggleClass('hidden');
    },

    'change [name="changeOrg"]': function(evt) {
        var orgId = $(evt.target).find('option:selected').val();

        for (var i = 0; i < Session.get("multiUserList").length; i++) {
            userId = Session.get("multiUserList")[i];
            Meteor.call("changeOrganisationOfAUser", orgId, userId, getUserRole(userId), function(error) {
                if (!error) {
                    Bert.alert('Organisation Changed', 'success', 'growl-top-right');
                } else {
                    Bert.alert(error.toString(), 'danger', 'growl-top-right');
                }
            });
        }


        Session.set("selectedOrganisation", orgId);
    },


    'change [name="changeGroup"]': function(evt) {
        var groupId = $(evt.target).find('option:selected').val();

        for (var i = 0; i < Session.get("multiUserList").length; i++) {
            userId = Session.get("multiUserList")[i];
            Meteor.call("removeUserFromGroupUsingGroupEditor", userId, getUserGroup(userId), getUserRole(userId), function(error) {
                if (error) {
                    Bert.alert(error.toString(), 'danger', 'growl-top-right');
                }
            });
            var role = getUserRole(userId);
            setTimeout(function() {
                Meteor.call("addUserToGroupUsingGroupEditor", userId, groupId, role, function(error) {
                    if (error) {
                        Bert.alert(error.toString(), 'danger', 'growl-top-right');
                    }
                });
            }, 300)
        }
        Bert.alert('Group changed', 'success', 'growl-top-right');

    },


    'click button[data-function="sendResetPassword"]': function() {

        Meteor.call('sendResetPasswordEmail', this._id, function(error, result) {
            if (!error) {
                Bert.alert('Password Reset Email Complete!', 'success', 'growl-top-right');
            }
        })
    },

    'click button[data-function="defaultPassword"]': function() {

        Meteor.call('changeToDefaultPassword', this._id, function(error, result) {
            if (!error) {
                Bert.alert('Password changed to default', 'success', 'growl-top-right');
            }
        })
    },

    'click button[data-function="cancel"]': function() {
        Router.go('/admin/userlist');
    },

    'click #add-J2E button': function(evt) {
        for (var i = 0; i < Session.get("multiUserList").length; i++) {
            var uId = Session.get("multiUserList")[i];
            Meteor.call('addJ2ECourse', uId, function(error) {
                if (error) {
                    Bert.alert(error.toString(), 'danger', 'growl-top-right');
                    successFlag = false;
                } else {
                    Bert.alert('J2E course was added.', 'success', 'growl-top-right');
                }
            });
        }
    },

    'click #add-subscription button': function(evt) {

        var successFlag = true;

        for (var i = 0; i < Session.get("multiUserList").length; i++) {
            var uId = Session.get("multiUserList")[i];
            var packageDays = $(evt.currentTarget).val();

            var expiryDate = Meteor.users.findOne({ _id: uId }).expiry;
            var currentDate = new Date();
            if (expiryDate == undefined) {
                expiryDate = 0;
            }

            var currentDays = Math.floor(((expiryDate - currentDate) / (24 * 60 * 60 * 1000)) * 100) / 100;

            var newDays = parseFloat(currentDays) + parseFloat(packageDays);

            Meteor.call("durationLogEntry", uId, Meteor.userId(), "Subscription package: " + packageDays + " days", currentDays, newDays, function(error) {
                if (error) {
                    Bert.alert(error.toString(), 'danger', 'growl-top-right');
                    successFlag = false;
                }
            });

            Meteor.call("addSubscriptionUserExpiry", uId, parseFloat(packageDays), function(error) {
                if (error) {
                    Bert.alert(error.toString(), 'danger', 'growl-top-right');
                    successFlag = false;
                }
            });

            if (successFlag) {
                Bert.alert('Subscription package: ' + packageDays + ' days added.', 'success', 'growl-top-right');
            }
        }

    },

    'click #remove-subscription button': function(evt) {

        var successFlag = true;

        for (var i = 0; i < Session.get("multiUserList").length; i++) {
            var uId = Session.get("multiUserList")[i];
            var packageDays = $(evt.currentTarget).val();

            var expiryDate = Meteor.users.findOne({ _id: uId }).expiry;
            var currentDate = new Date();
            if (expiryDate == undefined) {
                expiryDate = 0;
            }

            var currentDays = Math.floor(((expiryDate - currentDate) / (24 * 60 * 60 * 1000)) * 100) / 100;

            var newDays = parseFloat(currentDays) + parseFloat(packageDays);

            Meteor.call("durationLogEntry", uId, Meteor.userId(), "Subscription package removed", currentDays, 0, function(error) {
                if (error) {
                    Bert.alert(error.toString(), 'danger', 'growl-top-right');
                    successFlag = false;
                }
            });

            Meteor.call("removeSubscriptionUserExpiry", uId, parseFloat(packageDays), function(error) {
                if (error) {
                    Bert.alert(error.toString(), 'danger', 'growl-top-right');
                    successFlag = false;
                }
            });

            if (successFlag) {
                Bert.alert('Subscription package removed. Days set to 0.', 'success', 'growl-top-right');
            }
        }

    },

    'click #unlimited-subscription button': function(evt) {

        var successFlag = true;

        for (var i = 0; i < Session.get("multiUserList").length; i++) {
            var uId = Session.get("multiUserList")[i];
            var packageDays = 3650000; //Add 1000 years to the user so it never expires

            var expiryDate = Meteor.users.findOne({ _id: uId }).expiry;
            var currentDate = new Date();
            if (expiryDate == undefined) {
                expiryDate = 0;
            }

            var currentDays = Math.floor(((expiryDate - currentDate) / (24 * 60 * 60 * 1000)) * 100) / 100;

            var newDays = parseFloat(currentDays) + parseFloat(packageDays);

            Meteor.call("durationLogEntry", uId, Meteor.userId(), "Subscription package: " + packageDays + " days", currentDays, newDays, function(error) {
                if (error) {
                    Bert.alert(error.toString(), 'danger', 'growl-top-right');
                    successFlag = false;
                }
            });

            Meteor.call("addSubscriptionUserExpiry", uId, parseFloat(packageDays), function(error) {
                if (error) {
                    Bert.alert(error.toString(), 'danger', 'growl-top-right');
                    successFlag = false;
                }
            });

            if (successFlag) {
                Bert.alert('Subscription package: ' + (packageDays / 365) + ' years added ;-)', 'success', 'growl-top-right');
            }
        }

    },

    'submit form': function(evt) {
        evt.preventDefault();

        for (var i = 0; i < Session.get("multiUserList").length; i++) {
            var user = Session.get("multiUserList")[i];

            // Check if the firstname has changed.
            var firstname = $("[name='editFirstname']").val();
            if ($("[name='editFirstname']").data('original') != firstname) {
                Meteor.call('editUserFirstname', user, firstname, function(error) {
                    if (error) {
                        Bert.alert(error.toString(), 'danger', 'growl-top-right');
                    } else {
                        Bert.alert('Changes saved', 'success', 'growl-top-right');
                    }
                });
            }

            // Check if the surname has changed.
            var surname = $("[name='editSurname']").val();
            if ($("[name='editSurname']").data('original') != surname) {
                Meteor.call('editUserSurname', user, surname, function(error, result) {
                    if (error) {
                        BBert.alert(error.toString(), 'danger', 'growl-top-right');
                    } else {
                        Bert.alert('Changes saved', 'success', 'growl-top-right');
                    }
                });
            }

            // Check if the email address has changed.
            var email = $("[name='editEmailAddress']").val();
            if ($("[name='editEmailAddress']").data('original') != email) {
                Meteor.call('editUserEmail', user, email, function(error) {
                    if (error) {
                        Bert.alert('Changes saved', 'success', 'growl-top-right');
                    } else {
                        Bert.alert('Changes saved', 'success', 'growl-top-right');
                    }
                });
            }

            if (Roles.userIsInRole(this._id, 'admin')) {
                var daysRemaining = $("[name='daysRemaining']").val();
                var daysOriginal = $("[name='daysRemaining']").data('original');
                if (daysOriginal != daysRemaining) {
                    Meteor.call("durationLogEntry", user, Meteor.userId(), "Custom Change", daysOriginal, daysRemaining, function(error) {
                        if (error) {
                            Bert.alert('Changes saved', 'success', 'growl-top-right');
                        }
                    });
                    Meteor.call("customUserExpiry", user, daysRemaining, function(error) {
                        if (error) {
                            Bert.alert('Changes saved', 'success', 'growl-top-right');
                        }
                    });

                    $("[name='daysRemaining']").data('original', daysRemaining);
                } else {
                    Bert.alert("Change value of days remaining.", 'warning', 'growl-top-right');
                }
            }

        }


    },

    'click button[data-function="setTrial"]': function() {
        for (var i = 0; i < Session.get("multiUserList").length; i++) {
            var uId = Session.get("multiUserList")[i];
            //var uId = this._id;
            var currentDate = new Date();
            var expiry = new Date(currentDate.setTime(currentDate.getTime() + 14 * 86400000));

            // Meteor.call('addTimeToAccount', "daily",14,null);
            Meteor.call('assignNewAssessment', uId, true);
            Meteor.call('addTrailtoAccount', uId, expiry, function(error, result) {
                if (!error) {
                    Bert.alert('Account set up for trial', 'success', 'growl-top-right');
                } else {
                    Bert.alert(error.toString(), 'danger', 'growl-top-right');
                }

            });
        }
    },

    'click #setCertificateTrue': function() {
        for (var i = 0; i < Session.get("multiUserList").length; i++) {
            userId = Session.get("multiUserList")[i];
            Meteor.call('setCertificateStatus', userId, true);
        }
    },

    'click #setCertificateFalse': function() {
        for (var i = 0; i < Session.get("multiUserList").length; i++) {
            userId = Session.get("multiUserList")[i];
            Meteor.call('setCertificateStatus', userId, false);
        }
    },

});

// Template.orgDropDown.created = function () {
// 	this.subscribe("organisations");
// }

// Template.orgDropDown.helpers({
// 	organisations: function () {
// 		return organisations.find({});
// 	}
// })