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


Template.scormAPI.rendered = function () {
	
    localStorage.setItem("isScormAPIActive", "yes");
    //probably better to move this to DB to avoid people looking through the code getting those.
    //the only issue might be that it takes time to load the keys in and this might slow down the initial loading.
    var keys = ["frwsmdhe62920wksjsw77", "r4652hsnd735dgbcjd83u", "Secret Scorm Key", "hskw6679vsu46g02bdi59"];
    var certCourse = null;
	
	

    //This array can be used as a log for the reqeusts received. Currently it only works if only 1 connection is communicating with the API
    //So this will have to be changed in order to save full history for all connections.
    var msgHistory = [];


    //This is the response template object
    var response = {
        request: null,
        success: "ERROR",
        data: null,
        app_key: null
    };

    
    var handshakeRequired = "Handshake required before performing any other requests.";

    //Here we handle incoming messages
    window.addEventListener('message', function (evt) {
 
        //Check if the sender has a valid app_key. if not - ingore.
        if(evt.data.app_key == null || evt.data.app_key == 'undefined' || keys.indexOf(evt.data.app_key) < 0) return;
        
        //initial set up for handling the request.
        var received = evt.data;
        response.app_key = received.app_key;
        received.request = received.request.toLowerCase();
        response.request = received.request;

        console.log("EVT DATA: " + received);
        console.log("USER: " + received.user);
        //Display the received request.
        console.log("Message Received: [" + evt.data.request + "]");
        if (msgHistory.length < 1) {
            //New connection, which means this is a handshake request.
            //If no errors occur respond with OK.
           
            if (received.request == "handshake") {
                response.success = "OK";
                //Save the message to history so next time we don't ask for handshake again.
                msgHistory.push(evt.data);
            } else {
                //If the first received request is not a handshake, then return error and ask for handshake first. (manners!)
                response.success = "ERROR";
                response.data = handshakeRequired;
            }
        
        
        } else {
	        
	        
            if (received.request == "handshake") {
                //Data sent out before confirmation message was delivered.
                //Ignore and wait for next request
                return false;
            
            } else if (received.request == "login") {
                //Request for user login.
                console.log("Login Request...");
                //Initial setup for user login
                var scormId = received.user.scormId || received.user.email;
                var user = null;
                var pass = "DefaultScormPassword"; //Might want to change this for security reasons
                Meteor.call("getUserBySCORMId", scormId, function (err, result) {
                    //See if there is a user already with this scormID
                    if (err) {
                        //If there isn't one, then we have to create a new account and associate this ID to it.
                        //Expected error message is that there was not user associated with this scormID
                       // console.log(err);
                        //Setup for new account creation.
                        user = received.user;
                        console.log("Received User:");
                        //console.log(user);
                        var username = user.email;
                        var email = user.email;
                        console.log("USER CERT: " + user.cert);
                        certCourse = user.cert;
                        console.log("certCourse: " + certCourse);
                         
                        //Get the expiry / course allowed details for the given organisation
                        //access = { expiry: 12 (months, can be 1 || 3 || 6 || 12), course: Course (can be Assessment || Course || Both) }
                        var access = getAccessDetails(received.app_key);
                        console.log("Access details based on app_key:");
                        //console.log(access);
                        console.log("Access details ORG:");
                        //console.log(access.organisation);
                        console.log("Access details COURSE:");
                        //console.log(access.course);

                        //Wait fo the access details to come back before continuing - interval loops until details are here.
                        
                        var waitInterval = setInterval(function () {
							
                            if (access.organisation != null && access.organisation != "undefined") {
                                //Details are here so clear the interval
                                clearInterval(waitInterval);

                                //Set up the authorised courses
                                console.log("access.course before setting authorisedCourse:");
                                //console.log(access.course);
                                var authorisedCourses = access.course == "Assessment" ? [] : ["journey2English"];
                                console.log("authorisedCourses:");
                                //console.log(authorisedCourses);
								var newUserObj = {
                                    fName: user.firstName,
                                    lName: user.lastName,
                                    userName: username,
                                    email: email,
                                    pass: pass,
                                    org: [access.organisation],
                                    group: null,
                                    authorised: authorisedCourses,
                                    role: "student",
                                    expiry: (access.expiry * 30),
                                    registration: true,
                                    cert: certCourse
                                };
                                console.log("newUserObj: ");
                                //console.log(newUserObj);
                                //Create a new account
                                Meteor.call("createNewPasswordAccount", newUserObj, function (err, result) {

                                        if (err) {
                                            //If there was some error with the account creation, then respond with error and forward the error message.
                                            Bert.alert(err.toString(), 'danger', 'growl-top-right');
                                            response.success = "ERROR";
                                            response.data = err;
                                        } else {
                                            //If the account creation as successful then we associate the scormID with this account (to allow future logins)
                                            //and login the user so they can start learning!
                                            Meteor.call("addScormIdToUser", result, scormId);
                                            if((access.course == "Both") || (access.course == "Assessment")) {
                                                console.log("==============");
                                                console.log("Testing Access details COURSE again: ");
                                                //console.log(access.course);
                                                console.log("Assigning new Skills Test....");
                                                Meteor.call('assignNewAssessment', result, voucher = true);
                                                console.log("==============");
                                            }
                                            Meteor.loginWithPassword(username, pass, function (error) {
                                                if (error) {
                                                    Bert.alert(error.toString(), 'danger', 'growl-top-right');
                                                } else {
                                                    Router.go("/");
                                                }
                                            });
                                            response.success = "OK";
                                        }
                                    });
                            }
                        }, 300);
                    } else {
                        //There is a user with the scormID that was sent over, so just log them in.
                        user = result;
                        Meteor.loginWithPassword(user.username, pass, function (error) {
                            if (error) {
                                Bert.alert(error.toString(), 'danger', 'growl-top-right');
                            } else {
                                Router.go("/");
                            }
                        });
                        response.success = "OK";
                    }
                });

                msgHistory.push(evt.data);
            } else if (received.request == "logout") {
                //Request for user logout.
                response.success = "OK";
                msgHistory.push(evt.data);

                Meteor.logout(function(){
                    evt.source.postMessage(response, evt.origin);
                    Router.go("/scormAPI");
                });
            
            } else if (received.request == "courseprogress") {
                //Request for courseProgress
                response.success = "OK";
                response.progressValue = showPercentageComplete();
                msgHistory.push(evt.data);     
                
            }
            
            
            
        }



        console.log("Sending a response back...");
       
        evt.source.postMessage(response, evt.origin);

    }, false);

}

var getAccessDetails = function (scormWrapperId) {
    //{ expiry: 12 (months, can be 1 || 3 || 6 || 12), course: "Course" (can be "Assessment" || "Course" || "Both") }
    var accessDetails = {
        organisation: null,
        expiry: null,
        course: null
    };

    if (scormWrapperId === "frwsmdhe62920wksjsw77") {
        console.log("SCORM Wrapper Id - TATA");
        //TATA
        Meteor.call("getOrgIdByName", "Tata", function (err, result) {
	        //console.log(result);
            if (err) {
                Bert.alert(err.toString(), 'danger', 'growl-top-right');
            } else {
                accessDetails.organisation = result;
                accessDetails.expiry = null;
                accessDetails.course = "Course";
            }
        });

    } else if (scormWrapperId === "r4652hsnd735dgbcjd83u") {
        console.log("SCORM Wrapper Id - C&G");
        //City & Guilds
        Meteor.call("getOrgIdByName", "City and Guilds", function(err, result) {
            //console.log(result);
            if (err) {
                Bert.alert(err.toString(), 'danger', 'growl-top-right');
            } else {
                accessDetails.organisation = result;
                accessDetails.expiry = null;
                accessDetails.course = "Course";
            }
        });

    } else if (scormWrapperId === "hskw6679vsu46g02bdi59") {
        console.log("SCORM Wrapper id - TATA UK");
        Meteor.call("getOrgIdByName", "TATA UK", function(err, result) {
            if (err) {
                Bert.alert(err.toString(), 'danger', 'growl-top-right');
            } else {
                accessDetails.organisation = result;
                accessDetails.expiry = null;
                accessDetails.course = "Course";
            }
        });
    }
    console.log("ACCESS DETAILS:");
    //console.log(accessDetails);
    console.log("==============");
    return accessDetails;
}





/*
Template.scormPushProgress.helpers({
	'progressData': function(){		
		percentageComplete = showPercentageComplete();
	//	var percentageComplete = showPercentageComplete();
		return percentageComplete;
	}
});
*/
