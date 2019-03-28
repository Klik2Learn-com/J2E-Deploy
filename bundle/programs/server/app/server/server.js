(function(){// (server-side)
Accounts.onCreateUser(function (options, user) {

    var email = options.email;
    if(email.indexOf("@") < 0 || email.indexOf(".") < 0){
        //Invalid email address. Do not allow account creation.
        throw new Meteor.Error('500', 'Error: Invalid Email Address. Please provide an email with the format "joe@company.com"');
    }

    user.profile = options.profile;
    user.groups = [];
    user.organisation = options.organisation;
    user.authorisedCourses = options.authorisedCourses;
    user.expiry = options.expiry;
    user.messages = options.messages;
    if(options.scormId != null && options.scormId != "undefined"){
        user.scormId = options.scormId;
    }
    user.certificateEnabled = options.certificateEnabled;
    //user.confirmedEmail = options.confirmedEmail;

    // we wait for Meteor to create the user before sending an email
    //Meteor.setTimeout(function() {
    //  Accounts.sendVerificationEmail(user._id);
    //}, 2 * 1000);

    return user;

});

Accounts.onLogin(function () {
    var uId = Meteor.userId();
    var expiryDate = Meteor.users.findOne({ _id: uId }).expiry;

    if (expiryDate == undefined || expiryDate == "") {
        Meteor.users.update({ _id: uId }, { $set: { 'expiredSubscription': false } });
        return;
    }

    var expiryDate = moment(Meteor.user().expiry, "DD/MM/YYYY H:mm");
    var nowDate = moment();

    if (expiryDate > nowDate) {
        // Not expired yet
        Meteor.users.update({ _id: uId }, { $set: { 'expiredSubscription': false } });

    } else {
        // Update field used by routes.js
        Meteor.users.update({ _id: uId }, { $set: { 'expiredSubscription': true } });
        // Log out user if expired
        /*
            Meteor.setTimeout(function(){
              Meteor.users.update({_id : uId}, {$set: { "services.resume.loginTokens" : [] }});
            },2000);
        */
    }
})

Accounts.onLoginFailure(function () {
    // to implement counts
    // console.log('login failure');
});

}).call(this);
