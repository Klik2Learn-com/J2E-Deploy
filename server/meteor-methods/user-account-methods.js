Meteor.methods({

    /**************************************
    *
    *   User Account methods
    *
    ***************************************/

    'addTrailtoAccount': function (uId, expiry) {

        var Trial = organisations.findOne({ name: "Trial" })._id;
        var Demo = groups.findOne({ name: "Demo" })._id;
        Meteor.users.update({ _id: uId }, { $set: { 'roles': ["tutor"], 'expiry': expiry, 'organisation': Trial, groups: [Demo] } });
        groups.update({ name: 'Demo' }, { $push: { tutors: uId } });

    },

    /**
    *   @method:    createNewEnrollmentAccount
    *   @summary:   This method creates a new user and add the user to the system. An enrollment email is automatically
    *               sent to the provided email address. The user must follow the instructions in the enrollment email
    *               in order to verify their account and set their password.
    *   @requires:  Currently logged in user is admin
    *               Valid email address
    *
    */
    'createNewEnrollmentAccount': function (aFirstname, aSurname, aUsername, aEmail, organisation, aAuthorised, aRole, aExpiry) {

        // Permission checks
        if (Roles.userIsInRole(this.userId, 'admin')) {
            // ok
        } else if (Roles.userIsInRole(this.userId, 'moderator')) {
            if (aRole == "admin" || aRole == "moderator") {
                throw new Meteor.Error('No permission to make such a user.');
            }
        } else if (Roles.userIsInRole(this.userId, 'tutor')) {
            if (aRole == "admin" || aRole == "moderator" || aRole == "tutor") {
                throw new Meteor.Error('No permission to make such a user.');
            }
        } else if (Roles.userIsInRole(this.userId, 'student')) {
            throw new Meteor.Error('No permission to make a new user as a student.');
        } else {
            throw new Meteor.Error('No permission to make a new user.');
        }

        if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
            var email = aEmail;
            var profile = {
                firstname: aFirstname,
                surname: aSurname
            };
            var org = organisation;
            var role = aRole; // "admin", "tutor" or "student"
            var username = aUsername;
            var orgId;
            var authorisedCourses = {};
            var userId;
            var messages = [];
            var certificateEnabled = true;
            console.log(certificateEnabled);

            if (aExpiry == undefined || aExpiry == "") {
                var expiry = undefined;
            } else {
                var currentDate = new Date();
                var expiry = new Date(currentDate.setTime(currentDate.getTime() + aExpiry * 86400000));
            }

            for (var i = 0; i < aAuthorised.length; i++) {
                authorisedCourses[aAuthorised[i]] = true;
            }

            if (!organisations.findOne({ _id: org })) {
                if (!organisations.findOne({ name: org })) {
                    throw new Meteor.Error('Organisation ' + org + ' does not exist.')
                } else {
                    var orgDoc = organisations.findOne({ name: org })
                    orgId = orgDoc._id;
                }
            } else {
                orgId = org;
            }

            console.log(certificateEnabled);

            if (isValidEmailAddress(email)) {
                // Uses the Accounts package to create the user and add the document to the 'user'
                userId = Accounts.createUser({
                    email: email,
                    username: username,
                    profile: profile,
                    organisation: [orgId],
                    authorisedCourses: authorisedCourses,
                    expiry: expiry,
                    messages: messages,
                    certificateEnabled: certificateEnabled
                });
                if (role === 'admin') {
                    Roles.addUsersToRoles(userId, role);
                } else {
                    Roles.addUsersToRoles(userId, role);
                }
                Accounts.sendEnrollmentEmail(userId);
                // insert new document userProgress collection
                createUserProgress(userId);


                if (aExpiry != undefined && aExpiry != "") {
                    Meteor.call("durationLogEntry", userId, Meteor.userId(), "Account creation.", 0, aExpiry);
                }

            } else {
                return new Meteor.Error('Error: Invalid Email Address. Please provide an email with the format "joe@company.com"');
            }
            return userId;
        }

    },

    /**
    *   @method:    createNewPasswordAccount
    *   @summary:   - This method creates a new user and add the user to the system. The password is passed
    *               as an argument to this method and that password is set as the account password.
    *               - If an email address is supplied the email is added to the user.
    *
    *   @requires:  - Currently logged in user is admin
    *               - Valid Organisation
    *
    *   @returns:   True if user successfully added. False if an error occurs.
    *
    *   @notes:   	Edited by Boundary Creative to add publicSignup option
    */

    // This executes when using the /register form.

    'createNewPasswordAccount': function (newUserObj) {
        // var newUserObj = {
        //     newUserObj.fName: firstName,
        //     newUserObj.lName: lastName,
        //     newUserObj.userName: userEmail,
        //     newUserObj.email: userEmail,
        //     newUserObj.pass: userPassword,
        //     newUserObj.org: organisation,
        //     newUserObj.group: group,
        //     newUserObj.authorised: authorisedCourses,
        //     newUserObj.role: role,
        //     newUserObj.expiry: expiry,
        //     newUserObj.registration: registration,
        // };
        //aFirstname, aSurname, aUsername, aEmail, aPassword, organisation, aGroup, aAuthorised, aRole, aExpiry, registration

        // Permission checks
        if (Roles.userIsInRole(this.userId, 'admin') || newUserObj.role === "publicSignup" || newUserObj.registration === true) {
            // ok
        } else if (Roles.userIsInRole(this.userId, 'moderator')) {
            if (newUserObj.role == "admin" || newUserObj.role == "moderator") {
                throw new Meteor.Error('No permission to make such a user.');
            }
        } else if (Roles.userIsInRole(this.userId, 'tutor')) {
            if (newUserObj.role == "admin" || newUserObj.role == "moderator" || newUserObj.role == "tutor") {
                throw new Meteor.Error('No permission to make such a user.');
            }
        } else if (Roles.userIsInRole(this.userId, 'student')) {
            throw new Meteor.Error('No permission to make a new user as a student.');
        } else {
            throw new Meteor.Error('No permission to make a new user.');
        }

        if (Roles.userIsInRole(Meteor.userId(), 'admin') || newUserObj.role === "publicSignup" || newUserObj.registration === true) {
            var email = newUserObj.email;
            var profile = {
                firstname: newUserObj.fName,
                surname: newUserObj.lName
            };
            var username = newUserObj.userName;
            var org = newUserObj.org[0];
            var groupId = newUserObj.group;
            var role = newUserObj.role; // "admin", "moderator", "tutor" or "student"
            if (role === "publicSignup") { role = "student" }
            var userId = {};
            var password = newUserObj.pass;
            var orgId;
            var authorisedCourses = {};
            var messages = [];
            if (newUserObj.cert == 1) {
                var certificateEnabled = true;
            } else {
                var certificateEnabled = false;
            }
            
            //var confirmedEmail = false;

            if (newUserObj.expiry == undefined || newUserObj.expiry == "") {
                var expiry = undefined;
            } else {
                var currentDate = new Date();
                var expiry = new Date(currentDate.setTime(currentDate.getTime() + newUserObj.expiry * 86400000)); // newUserObj.expiry * 1 day (newUserObj.expiry is the number of days)
            }

            for (var i = 0; i < newUserObj.authorised.length; i++) {
                authorisedCourses[newUserObj.authorised[i]] = true;
            }

            if (!organisations.findOne({ _id: org })) {
                if (!organisations.findOne({ name: org })) {
                    throw new Meteor.Error('Organisation ' + org + ' does not exist.')
                } else {
                    var orgDoc = organisations.findOne({ name: org })
                    orgId = orgDoc._id;
                }
            } else {
                orgId = org;
            }

            if (isValidEmailAddress(email) || email.length == 0) {
                userId = Accounts.createUser({
                    email: email,
                    username: username,
                    profile: profile,
                    organisation: [orgId],
                    authorisedCourses: authorisedCourses,
                    password: password,
                    expiry: expiry,
                    messages: messages,
                    certificateEnabled: certificateEnabled
                });

                Roles.addUsersToRoles(userId, role);
                if (isValidEmailAddress(email)) {
                    Accounts.sendVerificationEmail(userId);
                }
                createUserProgress(userId);

                if (groupId != null && groupId != 'undefined') {
                    if (role == "tutor" || role == "admin" || role == "moderator") {
                        groups.update({ _id: groupId }, { $push: { tutors: userId } });
                    } else {
                        groups.update({ _id: groupId }, { $push: { students: userId } });
                    }

                    Meteor.users.update({ _id: userId }, { $push: { groups: groupId } });
                }

            }

            if (newUserObj.expiry != undefined && newUserObj.expiry != "") {
                Meteor.call("durationLogEntry", userId, Meteor.userId(), "Account creation.", 0, newUserObj.expiry);
            }

            return userId;
        }

    },

    'setStartActivity': function (module, activity) {
        /* Checks copied from client-side (needed in both places) */
        var currentActivityDB = userProgress.findOne({ userId: Meteor.userId() }).modules[module - 1].activities[activity - 1];
        var dateEndedField = currentActivityDB.dateEnded;
        if (dateEndedField != null) { return; }
        /* Check end */

        console.log("setStartActivity");

        var obj = {};
        var dateSta = 'modules.' + (module - 1) + '.activities.' + (activity - 1) + '.dateStarted';
        var compl = 'modules.' + (module - 1) + '.activities.' + (activity - 1) + '.completed';
        var key_compl = currentActivityDB.completed;

        if (key_compl == false) {
            obj[dateSta] = new Date();
            userProgress.update({ userId: Meteor.userId() }, { $set: obj });
            var obj2 = {};
            obj2[compl] = "Started";
            userProgress.update({ userId: Meteor.userId() }, { $set: obj2 });
        }
        else if (key_compl == "Paused") {
            // Resume button change
            Meteor.call('setResumeActivity', module, activity);
        }
    },

    'setResumeActivity': function (module, activity) {
        /* Checks copied from client-side (needed in both places) */
        var currentActivityDB = userProgress.findOne({ userId: Meteor.userId() }).modules[module - 1].activities[activity - 1];
        var dateStartedField = currentActivityDB.dateStarted;
        var completedField = currentActivityDB.completed;
        if (completedField != "Paused" || dateStartedField == null) { 
            //console.log('returning');
            return; }
        /* Check end */

        console.log("setResumeActivity");

        var now = new Date();
        var currActivityDB = userProgress.findOne({ userId: Meteor.userId() }).modules[module - 1].activities[activity - 1];
       // var paused = currActivityDB.datePaused;
       // var started = currActivityDB.dateStarted;

        var obj = {};
        var key = 'modules.' + (module - 1) + '.activities.' + (activity - 1) + '.dateResumed';
        obj[key] = now;
        userProgress.update({ userId: Meteor.userId() }, { $set: obj });

       /* var obj = {};
        var key = 'modules.' + (module - 1) + '.activities.' + (activity - 1) + '.datePaused';
        obj[key] = now;
        userProgress.update({ userId: Meteor.userId() }, { $set: obj }); */

        var obj = {};
        var key = 'modules.' + (module - 1) + '.activities.' + (activity - 1) + '.dateStarted';
        //started = new Date(now - (paused - started));
        obj[key] = now;
        userProgress.update({ userId: Meteor.userId() }, { $set: obj });

        var obj = {};
        var key = 'modules.' + (module - 1) + '.activities.' + (activity - 1) + '.completed';
        obj[key] = "Resumed";
        userProgress.update({ userId: Meteor.userId() }, { $set: obj });
    },

    'setPauseActivity': function (module, activity, user) {
        console.log("setPauseActivity");
        //console.log('PAUSING');
        //Meteor.call("setLastActivity", user, module, activity);

        if (user == null || user == undefined) {
            user = Meteor.userId();
        }

        /* Checks copied from client-side (needed in both places) */
        var currentActivityDB = userProgress.findOne({ userId: user }).modules[module - 1].activities[activity - 1];
        var dateStartedField = currentActivityDB.dateStarted;
        var dateEndedField = currentActivityDB.dateEnded;
        if (dateStartedField == null || dateEndedField != null) { return; }

        /* Check end */

        var obj = {};
        var key = 'modules.' + (module - 1) + '.activities.' + (activity - 1) + '.datePaused';
        if (obj[key] == null) { obj[key] = new Date(); }
        userProgress.update({ userId: user }, { $set: obj });

        var obj = {};
        var key = 'modules.' + (module - 1) + '.activities.' + (activity - 1) + '.completed';
        obj[key] = "Paused";
        userProgress.update({ userId: user }, { $set: obj });

        var currentActivityDB = userProgress.findOne({ userId: user }).modules[module - 1].activities[activity - 1];
        var dateSta = moment(currentActivityDB.dateStarted);
        var datePau = moment(currentActivityDB.datePaused);
        var dateRes = moment(currentActivityDB.dateResumed);
        var timeTaken = currentActivityDB.timeTaken;

        var obj = {};
        var key = 'modules.' + (module - 1) + '.activities.' + (activity - 1) + '.timeTaken';

        /*if (timeTaken == null || timeTaken == undefined || timeTaken == NaN) {
            var time = 0;
            time = datePau - dateSta;
        } else {
            time = timeTaken;
            time += datePau - dateRes;
        }*/

        var time = 0;
        time = datePau - dateSta;

        obj[key] = parseInt(time);
        userProgress.update({ userId: user }, { $set: obj });
    },

    'setEndActivity': function (module, activity) {
        /* Checks copied from client-side (needed in both places) */
        var currentActivityDB = userProgress.findOne({ userId: Meteor.userId() }).modules[module - 1].activities[activity - 1];
        var dateEndedField = currentActivityDB.dateEnded;
        if (dateEndedField != null) { return; }
        /* Check end */

        console.log("setEndActivity");

        var obj = {};
        var key = 'modules.' + (module - 1) + '.activities.' + (activity - 1) + '.dateEnded';
        if (obj[key] == null) { obj[key] = new Date(); }
        userProgress.update({ userId: Meteor.userId() }, { $set: obj });

        var currentActivityDB = userProgress.findOne({ userId: Meteor.userId() }).modules[module - 1].activities[activity - 1];

        var dateRes_bare = currentActivityDB.dateResumed;
        var dateSta = moment(currentActivityDB.dateStarted);
        var dateEnd = moment(currentActivityDB.dateEnded);

        var time = dateEnd - dateSta;

        /*if (dateRes_bare == null) {
            time = dateEnd - dateSta;
        } else {
            time = dateEnd - dateSta;
        }*/

        var obj = {};
        var key = 'modules.' + (module - 1) + '.activities.' + (activity - 1) + '.timeTaken';
        obj[key] = parseInt(time);
        userProgress.update({ userId: Meteor.userId() }, { $set: obj });

        var obj = {};
        var key = 'modules.' + (module - 1) + '.activities.' + (activity - 1) + '.latestSubpage';
        obj[key] = null;
        userProgress.update({ userId: Meteor.userId() }, { $set: obj });

        //Meteor.call("setLastActivity", Meteor.userId(), module, activity);

        Meteor.call('setCompletedActivity', module, activity);
    },

    'setLastActivity': function (uId, mod, activity) {
        var lastActivityStr = "m" + mod + "a" + activity;
        userProgress.update({ userId: uId }, { $set: { lastActivity: lastActivityStr } });
    },

    'getLastActivity': function (uId) {
        var lastActivity = userProgress.findOne({ userId: uId }).lastActivity;
        if (lastActivity == null || lastActivity == 'undefined' || lastActivity == "m10a29") {
            return null;
        } else {
            if (activityCompleted(lastActivity, uId)) {
                return  lastActivity = getNextActivity(lastActivity, uId);
                //return lastActivity = getNextActivity(lastActivity, uId);
             }else{
                 return lastActivity;
            }
        }
        return null;
    },

    'setLatestSubpage': function (module, activity, subpage) {
        var activityObj = userProgress.findOne({ userId: Meteor.userId() }).modules[module - 1].activities[activity - 1];
        if ("latestSubpage" in activityObj) {
            var obj = {};
            var subpageField = 'modules.' + (module - 1) + '.activities.' + (activity - 1) + '.latestSubpage';
            obj[subpageField] = subpage;
            userProgress.update({ userId: Meteor.userId() }, { $set: obj });
        }
    },   

    'setCompletedActivity': function (module, activity) {
        console.log("setCompletedActivity");

        var obj = {};
        var key = 'modules.' + (module - 1) + '.activities.' + (activity - 1) + '.completed';
        obj[key] = "Completed";
        userProgress.update({ userId: Meteor.userId() }, { $set: obj });


        var notificationModule = Meteor.users.findOne({ _id: Meteor.userId() }).moduleFinishedNotification;
        if(notificationModule != null && notificationModule != undefined) {
            notificationModule = notificationModule[module];
        }
               
        if(checkCompletedGame(module) && checkModuleFinishedActivities(module) && notificationModule != 'Read' && notificationModule != 'ModalSeen'){
            setModuleCompletionField(module);
        }

        if (module <= 5) {
            var unit = 1;
        } else if (module > 5) {
            var unit = 2;
        }

        var feedbackForms = Meteor.users.findOne({ _id: Meteor.userId() }).unitFeedbackForms;
        if (feedbackForms != null && feedbackForms != undefined) {
            feedbackForms = feedbackForms[unit];
        }
        if (checkUnitCompleted(module) && feedbackForms != 'Ignored' && feedbackForms != 'Completed') {
            setUnitFeedbackFormStatus(unit);
        } 
        checkTrophyCompletion();
        

        //Check if the user progress matches a custom set percentage by an organisation, and if so, update the user's document to
        //set a flag which will then be used to show a custom message to congratulate them for the completion.
        var orgArray = Meteor.users.findOne({_id: Meteor.userId()}).organisation;
        //By default the "main" organisation of users will be the 1st one, even though moderators should not access the course.
        //For other users, there is only 1 organisation anyway.
        var org = orgArray[0];
        var orgName = null;
        if (org != null && org != 'undefined') {
            orgName = organisations.findOne({_id: org}).name;
        } else {
            return null;
        }

        //Need to calculate those 2 variables
        var progress = getPercentageComplete(Meteor.userId());
        var timeSpent = getTimeTaken(Meteor.userId());        
        var hoursSpent = ((timeSpent / 1000) / 60) / 60;
        var allGamesCompleted = checkAllCompletedGames();
        var progressCompletion = checkProgressCompletion(progress, hoursSpent, orgName, allGamesCompleted);
        if (progressCompletion == "Full-Completion") {
            setUserProgressCompletionNotification();
        } else if (progressCompletion == "Half-Way-Completion"){
            setUserProgressHalfCompletionNotification();
        } else {
            //not achieved or other options
        }


        for (var i = 0; i < userProgress.findOne({ userId: Meteor.userId() }).modules[module - 1].activities.length; i++) {
            if (userProgress.findOne({ userId: Meteor.userId() }).modules[module - 1].activities[i].completed != "Completed") {
                return;
            }
        }

        Meteor.call('setFinishedModule', module);
    },

    'setFinishedModule': function (module) {
        var obj = {};
        var key = 'modules.' + (module - 1) + '.finished';
        obj[key] = true;
        userProgress.update({ userId: Meteor.userId() }, { $set: obj });
    },

    'setGameAccess': function (uId, module_, score_, pass) {
        var dateCompleted = new Date();
        return gameAccess.insert({ user: uId, module: module_, score: score_, date: dateCompleted, passedTest: pass });
    },

    'editUserFirstname': function (aUser, aFirstname) {

        // console.log("UPDATING user first name");
        // console.log(aUser);
        // console.log(aFirstname);
        if (Roles.userIsInRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), 'moderator') || Meteor.userId() == aUser) {
            Meteor.users.update({ _id: aUser }, { $set: { 'profile.firstname': aFirstname } });
        }

    },

    'editUserSurname': function (aUser, aSurname) {

        if (Roles.userIsInRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), 'moderator') || Meteor.userId() == aUser) {
            Meteor.users.update({ _id: aUser }, { $set: { 'profile.surname': aSurname } });
        }

    },

    'editUserEmail': function (aUser, aEmail) {

        if (Roles.userIsInRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), 'moderator') || Meteor.userId() == aUser) {
            Meteor.users.update({ _id: aUser }, { $set: { 'emails.0.address': aEmail } });
        }

    },

    'setRoleOnUser': function (options) {
        check(options, {
            user: String,
            role: String
        });
        if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
            try {
                Roles.setUserRoles(options.user, [options.role]);
            } catch (exception) {
                return exception;
            }
        }
    },

    // Send User an Email to reset their password
    'sendResetPasswordEmail': function (userId) {
        if (Roles.userIsInRole(Meteor.userId(), 'admin') || Meteor.userId == userId) {
            return Accounts.sendResetPasswordEmail(userId);
        } else {
            throw new Meteor.Error('Error! You are not an admin or this is not your account.');
        }
    },

    'addJ2ECourse': function(userId) {
        if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
            console.log('updating'+userId);
            Meteor.users.update({ _id: userId }, { $set: { 'authorisedCourses.journey2English': true } });
        } else {
            throw new Meteor.Error('Error! You are not an admin or this is not your account.');
        }
    },

    'changePasswordAcc': function (oldPass, newPass) {
        //if (Roles.userIsInRole( Meteor.userId(), 'admin' )) {
        Accounts.changePassword(oldPass, newPass);
        //} else {
        //    throw new Meteor.Error('Error! You are not an admin or this is not your account.');
        //}
    },

    'changeToDefaultPassword': function (userId) {
        if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
            return Accounts.setPassword(userId, 'journey001');
        } else {
            throw new Meteor.Error('Error! You are not an admin or this is not your account.');
        }
    },

    'parseUpload': function (data) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var email = {};
            var courses = [];
            var userId;
            var messages = [];

            if (item.autoPassAssessment == true || item.role == 'admin' || item.role == 'moderator' || item.role == 'tutor') {
                courses.push('journey2English');
            }

            if (item.email) {
                email = item.email;
                if (item.password) {
                    userId = Meteor.call('createNewPasswordAccount', item.firstname, item.surname, item.username, email, item.password, item.organisation, courses, item.role, item.expiry, false);

                } else {
                    userId = Meteor.call('createNewEnrollmentAccount', item.firstname, item.surname, item.username, email, item.organisation, courses, item.role, item.expiry);
                }
            } else {
                userId = Meteor.call('createNewPasswordAccount', item.firstname, item.surname, item.username, email, item.password, item.organisation, courses, item.role, item.expiry, false);
            }

            // Assign the Assessment.
            if (item.role != 'admin' && item.role != 'moderator' && item.role != 'tutor') {
                if (item.autoPassAssessment == false || item.autoPassAssessment == undefined) {
                    Meteor.call('assignNewAssessment', userId);
                }
            }
        }
    },

    'removeUser': function (userId) {
        if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
            if (Meteor.userId() == userId) {
                throw new Meteor.Error('You cannot delete yourself.');
            }
            Meteor.users.remove({ _id: userId });
            studentAssessments.remove({ userId: userId });
        }
    },

    /**
     * Used for a % course completion for a certificate - uncomment if needed
     */
    // 'setProgCompNotification': function(state){
    //     if(state != null && state != 'undefined'){
    //         var result = Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'progCompNotification': state } });
    //         return result;
    //     } else {
    //         throw new Meteor.Error('Error! Invalid state for progress completion notification variable');
    //     }
    // },

    'setFeedbackFormStatus': function(unit, status) {
        if(status != null && status != 'undefined' && unit != null && unit != undefined){
            var obj = {};

            var feedbackForms = Meteor.users.findOne({ _id: Meteor.userId() }).unitFeedbackForms;
            if(feedbackForms != null && feedbackForms != undefined)
                obj = feedbackForms;

            obj[unit] = status;
            var result = Meteor.users.update({ _id: Meteor.userId() }, { $set: {'unitFeedbackForms': obj }});
            return result;
        } else {
            throw new Meteor.Error('Error! Invalid status for unit completion notification variable');
        }
    },

    'setModuleProgress': function(module, state){
        if(state != null && state != 'undefined' && module != null && module != undefined){
            var obj = {};

            var modulesFinishedNotification = Meteor.users.findOne({ _id: Meteor.userId() }).moduleFinishedNotification;
            if(modulesFinishedNotification != null && modulesFinishedNotification != undefined)
                obj = modulesFinishedNotification;

            obj[module] = state;
            var result = Meteor.users.update({ _id: Meteor.userId() }, { $set: {'moduleFinishedNotification': obj }});
            return result;
        } else {
            throw new Meteor.Error('Error! Invalid state for module completion notification variable');
        }
    },

    'setTrophyProgress': function(trophyIndex, state){
        if(state != null && state != 'undefined' && trophyIndex != null && trophyIndex != undefined){
            var obj = {};

            var trophyAchieved = Meteor.users.findOne({ _id: Meteor.userId() }).trophyAchieved;
            if(trophyAchieved != null && trophyAchieved != undefined)
                obj = trophyAchieved;

            obj[trophyIndex] = state;
            var result = Meteor.users.update({ _id: Meteor.userId() }, { $set: {'trophyAchieved': obj }});
            return result;
        } else {
            throw new Meteor.Error('Error! Invalid state for trophy achievement variable');
        }
    },

    'setCertificateNotification': function(state) {
        if (state != null && state != undefined) {
            var result = Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'certificateNotification': state } });
            return result;
        } else {
            throw new Meteor.Error('Error! Invalid parameter for changing the certificate field for this account');
        }
    },

    'setCertificateStatus': function (aUser, status) {
        if (aUser != null && aUser != undefined && status != null && status != undefined) {
            if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
                var result = Meteor.users.update({_id: aUser}, { $set: { 'certificateEnabled': status } });
                return result;
            }
        } else {
            throw new Meteor.Error('Error! Invalid parameters for setting the certificate status for this account')
        }
    },

    'setCertificateDetails': function(details) {
        if (details != null && details != undefined) {
            var result = Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'certificateDetails': details } });
            return result;
        } else {
            throw new Meteor.Error('Error! Invalid parameter for changing the certificate field for this account');
        }
    },


    /**
	 * Used for a certificate/non-certificate version of the course
	 * Uncomment if needed - not implemented fully yet
     * _id needs to be the id of the selected user, not the one currently logged-in - needs to be fixed if 
     * the code is going to be used
	 */
    // 'addCertificate': function(flag) {
    //     if(flag != null && flat != 'undefined') {
    //         var result = Meteor.users.update({ _id: Meteor.userId() }, { $set: { 'addedCertificate': flag } });
    //         return result;
    //     } else {
    //         throw new Meteor.Error('Error! Invalid flag for adding a certificate for this account');
    //     }
    // },

    /*
        creates and inserts a login token for the user with @param user_id
    */
    'create_token': function(user_id){
        const stampedLoginToken = Accounts._generateStampedLoginToken();
        Accounts._insertLoginToken(user_id, stampedLoginToken);
        return stampedLoginToken;
    },

    /*
        returns a user whose email is the same as @param email
     */
    'getUserByEmail': function(email){
        user = Accounts.findUserByEmail(email);
        return user;
    },

    'authoriseCourse': function (userId, course) {
        var userDoc = Meteor.users.findOne({ _id: userId });
        var authorisedCourses = userDoc.authorisedCourses;
        authorisedCourses[course] = true;
        Meteor.users.update({ _id: userId }, { $set: { 'authorisedCourses': authorisedCourses } });
    },
    /**
   *   @method insertNewUserProgress
   *   @summary This method create a new 'userProgress' document and inserts it into the database.
   *           Each user has a reference to one userProgress entry. The entry references its user with the
   *           userId field.
   *
   *
   */
    'insertNewUserProgress': function (aUser) {
        return userProgress.insert({
            userId: aUser,
            modules: [
                {
                    finished: false,
                    activities: [
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null }
                    ],
                    timeCompleted: {},
                    timeStarted: {}
                },

                {
                    finished: false,
                    activities: [
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null }
                    ],

                    timeCompleted: {},
                    timeStarted: {}
                },

                {
                    finished: false,
                    activities: [
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null }
                    ],
                    timeCompleted: {},
                    timeStarted: {}
                },

                {
                    finished: false,
                    activities: [
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null }
                    ],
                    timeCompleted: {},
                    timeStarted: {}
                },

                {
                    finished: false,
                    activities: [
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null }
                    ],
                    timeCompleted: {},
                    timeStarted: {}
                },

                {
                    finished: false,
                    activities: [
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null }
                    ],
                    timeCompleted: {},
                    timeStarted: {}
                },

                {
                    finished: false,
                    activities: [
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null }
                    ],
                    timeCompleted: {},
                    timeStarted: {}
                },

                {
                    finished: false,
                    activities: [
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null }
                    ],
                    timeCompleted: {},
                    timeStarted: {}
                },

                {
                    finished: false,
                    activities: [
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null }
                    ],
                    timeCompleted: {},
                    timeStarted: {}
                },

                {
                    finished: false,
                    activities: [
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null },
                        { completed: false, dateStarted: null, dateEnded: null, datePaused: null, dateResumed: null, timeTaken: null, latestSubpage: null }
                    ],
                    timeCompleted: {},
                    timeStarted: {}
                }
            ]
        })

    }

})

function createUserProgress(userId) {
    // Once the user has been created, a new userProgress document must be created for the user
    Meteor.call('insertNewUserProgress', userId, function (error, result) {
        if (!error) {
            Meteor.users.update({ _id: userId }, { $set: { progress: result } });
        }
    });
}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
};


function activityCompleted(activity, uId) {
    console.log(activity);
    var actObj = extractModActNum(activity);
    var completed = userProgress.findOne({ userId: uId }).modules[actObj.modNum].activities[actObj.actNum].completed;
    return completed == "Completed";
}

function getNextActivity(activity, uId) {
    var actObj = extractModActNum(activity);
    var userProg = userProgress.findOne({ userId: uId });
    var nextAct = userProg.modules[actObj.modNum].activities[actObj.actNum + 1];
    var nextActStr = "m" + (actObj.modNum + 1) + "a" + (actObj.actNum + 2);
    var passed = gameAccess.find({ "user": uId, "module": (actObj.modNum + 1).toString(), "passedTest": true }).count();
    if (activityIsGame(nextActStr)) {
        nextActStr = getGameStr(nextActStr);
        console.log("if game: " + nextActStr);
        if (passed == 0) {
            //if "test" is failed, "continue" gets you to the next module, activity 1
            return "m" + (actObj.modNum + 2) + "a" + 1;
        };
        return nextActStr;
    }
    if (nextAct == null || nextAct == 'undefined') {
        nextActStr = "m" + (actObj.modNum + 2) + "a1";
    }
    console.log("if not game: " + nextActStr);
    return nextActStr;
}

function extractModActNum(activityStr) {
    var obj = {
        modNum: null,
        actNum: null
    };

    obj.modNum = activityStr.substring((activityStr.indexOf("m") + 1), activityStr.indexOf("a")) - 1;
    obj.actNum = activityStr.substring((activityStr.indexOf("a") + 1), activityStr.length) - 1;
    return obj;
}

function activityIsGame(actStr) {
    var gameActs = ["m1a28", "m2a29", "m3a30", "m4a31", "m5a25", "m6a30", "m7a27", "m8a35", "m9a31", "m10a29"];
    return gameActs.indexOf(actStr) >= 0;
}

function getGameStr(actStr) {
    return actStr.substring(0, actStr.indexOf("a")) + "Game";
}

function checkProgressCompletion(progress, timeSpent, orgName, allGamesCompleted) {
    var result = "";
    if(allGamesCompleted){
        if(orgName == "City and Guilds"){

        } else { //default for other orgs
            //Leaving this the same as with c&g for testing only. This should be changed
            //Once the whole thing is implemented
            if(progress >= 40 && timeSpent >= 20)
                result = "Half-Way-Completion";
        
            if(progress >= 80 && timeSpent >= 40)
                result = "Full-Completion";
        }
    }   
    //Currently checking overall course completion only, however it should be possible to switch to checking units instead
    return result;
}

function checkCompletedUnit(moduleNum) {
	var progress = userProgress.findOne({ userId : Meteor.userId() });
	var modules = progress.modules;
	if (modules[moduleNum-1].finished == true) {
		return true;
	}
	return false;
}

function checkUnitCompleted(currModule) {
    if (currModule <= 5) {
        var startModule = 1;
        var endModule = 5;
    } else if (currModule > 5) {
        var startModule = 6;
        var endModule = 10;
    }
	for (var i = startModule; i <= endModule; i++) {
		if (!checkCompletedUnit(i)) {
			return false;
		}
	}
	return true;
};

function checkTrophyCompletion() {

    var percent = showPercentageComplete();
    //('PERCENT ' + percent);
    if(checkTrophyStatus(1) == null || checkTrophyStatus(1) == undefined){
        var firstTrophyPercentage = 30;
        if(percent >= firstTrophyPercentage)
            setTrophyCompletionField(1);
    }

    if(checkTrophyStatus(2) == null || checkTrophyStatus(2) == undefined){
        var secondTrophyPercentage = 60;
        if(percent >= secondTrophyPercentage)
            setTrophyCompletionField(2);
    }

    if(checkTrophyStatus(3) == null || checkTrophyStatus(3) == undefined){
        var moduleNum = 10;
        var modulesCompleted = getNumberOfModuleBadges();
        if(modulesCompleted  == moduleNum)
            setTrophyCompletionField(3);
    }
 
}

function getNumberOfModuleBadges(){
    var modulesFinishedNotification = Meteor.users.findOne({ _id: Meteor.userId() }).moduleFinishedNotification;
    var completedCount = 0;
    var moduleNum = 10;
    if(modulesFinishedNotification != null && modulesFinishedNotification != undefined){
        for(var i = 1; i <= moduleNum; i++){
            if(modulesFinishedNotification[i] != null && modulesFinishedNotification[i] != undefined){
                completedCount++;
            }
        }
        return completedCount;
    }
}

function checkTrophyStatus(trophyIndex){
    var trophyAchievement = Meteor.users.findOne({ _id: Meteor.userId() }).trophyAchieved;
    if(trophyAchievement != null && trophyAchievement != undefined) {
        return trophyAchievement[trophyIndex];
    }
}

function setTrophyReadField(trophyIndex) {
    Meteor.call('setTrophyProgress', trophyIndex, 'Read');
}

function setTrophyCompletionField(trophyIndex) {
    Meteor.call('setTrophyProgress', trophyIndex, 'Finished');
}

function setModuleCompletionField(moduleNumber) {
    //set flag in DB user doc
    // flag should be either of these 2 values - null/undefined, "Finished", "Read"
    // this will allow for the pop-up to be shown only after the current module is completed
    // and to not show again for the current module once it has been read already
    Meteor.call('setModuleProgress', moduleNumber, 'Finished');
}

function setUnitFeedbackFormStatus(unit) {
    Meteor.call('setFeedbackFormStatus', unit, 'Not completed');
}

/**
 * Used for a % course completion for a certificate - uncomment if needed
 */
// function setUserProgressCompletionNotification(){
//     //set flag in DB user doc to display message
//     //flag should be either of these 3 values - null / undefined,  "Completed", HalfWay , "Read"
//     //this will allow for the pop-up to be shown only after course is completed
//     //and to be hidden once it has been already seen.
//     Meteor.call('setProgCompNotification', "Completed");
// }

/**
 * Used for a % course completion for a certificate - uncomment if needed
 */
// function setUserProgressHalfCompletionNotification(){
//     //set flag in DB user doc to display message
//     //flag should be either of these 3 values - null / undefined,  "Completed", HalfWay , "Read"
//     //this will allow for the pop-up to be shown only after course is completed
//     //and to be hidden once it has been already seen.
//     Meteor.call('setProgCompNotification', "Half-Way");
// }


function getPercentageComplete(_userId) {

	var progress = userProgress.findOne({ userId: _userId });
	var activityCount = 0;
	var completedCount = 0;

	if (progress == null || progress == "undefined") { return; }

	for (var i = 0; i < progress.modules.length; i++) {
		for (var j = 0; j < progress.modules[i].activities.length; j++) {
			activityCount++;
			if (progress.modules[i].activities[j].completed == "Completed") {
				completedCount++;
			}
		}
	}

	//This is the current completion percent for the user
	var endPercent = parseFloat((completedCount / activityCount) * 100).toFixed(1);
	return endPercent;

}

function getTimeTaken(_userId){
    var progress = userProgress.findOne({ userId: _userId });
    if (progress == null || progress == "undefined") { return null; }
    var timeTaken = 0;
    for (var i = 0; i < progress.modules.length; i++) {
		for (var j = 0; j < progress.modules[i].activities.length; j++) {
			if (typeof progress.modules[i].activities[j].timeTaken == "number") {
                timeTaken = timeTaken + progress.modules[i].activities[j].timeTaken;
			}
		}
    }
    
    return timeTaken;
}

/**
 * This method returns true if for a given module
 * the user has completed at least all-2 activities.
 * Otherwise, returns false.
 */
function checkModuleFinishedActivities(mod) {
	var currentModule = mod - 1;
	var loggedUser = Meteor.userId();
	var uProgress = userProgress.findOne({userId: loggedUser});
	var allModuleActivities = uProgress.modules[currentModule].activities;
	var allModuleActivitiesCount = allModuleActivities.length;
	var completedModuleActivities = 0;

	allModuleActivities.forEach(function(x) {
		if(x.completed == "Completed") {
			completedModuleActivities++;
		}
	});
	
	if ((allModuleActivitiesCount - completedModuleActivities) <= 4) {
		return true;
	} else {
		return false;
	}
}

function checkCompletedGame(moduleNum){
    var progress = userProgress.findOne({ userId : Meteor.userId() });
    var moduleAcitvities = progress.modules[moduleNum - 1].activities;
    var gameActivity = moduleAcitvities[moduleAcitvities.length -1];
    if(gameActivity.completed == "Completed")
        return true;

    return false;
}

function checkAllCompletedGames(){
    var moduleNum = 10;
    for(var i = 1; i <= moduleNum; i++){
        if(!checkCompletedGame(i))
            return false;
    }
    return true;
}

 function showPercentageComplete() {

	var progress = userProgress.findOne({ userId: Meteor.userId() });
	var activityCount = 0;
	var completedCount = 0;

	if (progress == null || progress == "undefined") { return; }

	for (var i = 0; i < progress.modules.length; i++) {
		for (var j = 0; j < progress.modules[i].activities.length; j++) {
			activityCount++;
			if (progress.modules[i].activities[j].completed == "Completed") {
				completedCount++;
			}
		}
	}

	//This is the current completion percent for the user
	var endPercent = (parseFloat((completedCount / activityCount) * 100).toFixed(1) / 100);
	return endPercent * 100;

}