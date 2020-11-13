/** Supported (and expected) Request Template
 *  message = {
        request:
        user: {
            firstName: 
            lastName: 
            email:
            scormId: 
        },
        date:
        app_key: 
    };
 */


Template.BscormAPI.rendered = function () {
    //Session.set("isScormAPIActive", "yes");
    localStorage.setItem("isScormAPIActive", "yes");
    var query = Template.currentData();
    //probably better to move this to DB to avoid people looking through the code getting those.
    //the only issue might be that it takes time to load the keys in and this might slow down the initial loading.
    var keys = ["frwsmdhe62920wksjsw77", "r4652hsnd735dgbcjd83u", "Secret Scorm Key"];

    //check if valid request
    if (query == null || query == 'undefined' || query.app_key == null || query.app_key == 'undefined' || keys.indexOf(query.app_key) < 0) return false;

    var orgKey = query.app_key;
    var scormId = query.scormId || query.email;
    var userEmail = query.email;
    var username = userEmail;
    var fname = query.fname;
    var lname = query.lname;
    var pass = "DefaultScormPassword";


    Meteor.call("getUserBySCORMId", scormId, function (err, result) {
        //See if there is a user already with this scormID
        if (err) {
            //If there isn't one, then we have to create a new account and associate this ID to it.
            //Expected error message is that there was not user associated with this scormID
            console.log(err);

            Meteor.call("getOrgIdByName", getOrgNameByKey(orgKey), function (_err, _result) {
                if (_err) {
                    Bert.alert(_err.toString(), 'danger', 'growl-top-right');
                } else {

                    var organisation = _result;

                    //Get the expiry / course allowed details for the given organisation
                    //access = { expiry: 12 (months, can be 1 || 3 || 6 || 12), course: Course (can be Assessment || Course || Both) }
                    var access = getAccessDetails(orgKey);

                    //Set up the authorised courses
                    var authorisedCourses = access.course == "Assessment" ? [] : ["journey2English"];
                    var newUserObj = {
                        fName: fname,
                        lName: lname,
                        userName: username,
                        email: userEmail,
                        pass: pass,
                        org: [organisation],
                        group: null,
                        authorised: authorisedCourses,
                        role: "student",
                        expiry: (access.expiry * 30),
                        registration: true,
                    };
                    //Create a new account
                    Meteor.call("createNewPasswordAccount", newUserObj, function (_err_, _result_) {

                            if (_err_) {
                                Bert.alert(_err_.toString(), 'danger', 'growl-top-right');
                            } else {
                                //If the account creation as successful then we associate the scormID with this account (to allow future logins)
                                //and login the user so they can start learning!
                                Meteor.call("addScormIdToUser", _result_, scormId);
                                if(access.course == "Both" || "Assessment")
                                    Meteor.call('assignNewAssessment', _result_, voucher = true);
                                Meteor.loginWithPassword(username, pass, function (error) {
                                    if (error) {
                                        Bert.alert(error.toString(), 'danger', 'growl-top-right');
                                    } else {
                                        Router.go("/");
                                    }
                                });
                            }
                    });
                }

            });

        } else {
            //There is a user with the scormID that was sent over, so just log them in.
            Meteor.loginWithPassword(username, pass, function (error) {
                if (error) {
                    Bert.alert(error.toString(), 'danger', 'growl-top-right');
                } else {
                    Router.go("/");
                }
            });
        }
    });
}

var getOrgNameByKey = function (appKey) {
    if (appKey === "frwsmdhe62920wksjsw77")
        return "Tata";

    if (appKey === "r4652hsnd735dgbcjd83u")
        return "City and Guilds"

}

var getAccessDetails = function (scormWrapperId) {
    //{ expiry: 12 (months, can be 1 || 3 || 6 || 12), course: "Course" (can be "Assessment" || "Course" || "Both") }
    var accessDetails = {
        expiry: null,
        course: null
    };

    if (scormWrapperId === "frwsmdhe62920wksjsw77") {
        //TATA
        accessDetails.expiry = 12;
        accessDetails.course = "Course";
    } else if (scormWrapperId === "r4652hsnd735dgbcjd83u") {
        //City & Guilds
        accessDetails.expiry = null;
        accessDetails.course = "Both";
    }
    return accessDetails;
}
