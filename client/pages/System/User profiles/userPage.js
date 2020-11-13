Template.userPage.created = function() {
    this.subscribe("organisations");
    this.subscribe("userProgress");
    this.subscribe("nbnotes");
    this.subscribe("audioRecordings");
    this.subscribe("studentAssessments");
};

Template.userPage.rendered = function() {
    document.title = "User Page - Journey 2 English";
}

Template.userPage.helpers({
    orgName: function() {
        var orgId = Meteor.users.findOne({ _id: this._id }).organisation[0];
        org = organisations.findOne({ _id: orgId });
        return org.name;
    },

    isMe: function() {
        return Meteor.userId() == this._id;
    },

    expiryDate: function() {
        if (this.expiry == undefined) {
            return "No expiry date";
        }

        var date = new Date(this.expiry);

        var day = (date.getUTCDate() < 10 ? '0' : '') + date.getUTCDate();
        var month = ((date.getUTCMonth() + 1) < 10 ? '0' : '') + (date.getUTCMonth() + 1); //months from 1-12
        var year = date.getUTCFullYear();
        var hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
        var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

        var formattedDate = day + "/" + month + "/" + year + " " + hours + ":" + minutes;
        return formattedDate;
    },

    'daysRemaining': function() {
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var firstDate = this.expiry;
        var secondDate = new Date();

        if (firstDate == null) {
            return "Unlimited";
        } else {
            var diffDays = Math.round((firstDate.getTime() - secondDate.getTime()) / (oneDay));

            if (diffDays <= 0) {
                return 'Expired';
            } else {
                return diffDays;
            }
        }
    },

    'tutorView': function() {
        if (Roles.userIsInRole(Meteor.userId(), 'tutor') || Roles.userIsInRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), 'moderator')) {
            return true;
        } else {
            return false;
        }
    },
    progressBarPercentage: function() {
        var progress = userProgress.findOne({ userId: this._id });
        var activityCount = 0;
        var completedCount = 0;
        for (var i = 0; i < progress.modules.length; i++) {
            for (var j = 0; j < progress.modules[i].activities.length; j++) {
                activityCount++;
                if (progress.modules[i].activities[j].completed == "Completed") {
                    completedCount++;
                }
            }
        }
        return parseFloat((completedCount / activityCount) * 100).toFixed(1);
    },

    arrayIndexNumberFix: function(a) {
        return parseInt(a) + 1;
    },

    progressTest: function() {
        var progress = userProgress.findOne({ userId: this._id });
        return progress;
    },


    completedCount: function(thisObj) {
        var counter = 0;
        for (var i = 0; i < thisObj.length; i++) {
            if (thisObj[i].completed == "Completed") { counter++; }
        }
        return counter + " out of " + thisObj.length;
    },

    timeCount: function(thisObj) {
        console.log(thisObj);
        var m = 0;
        for (var i = 0; i < thisObj.length; i++) {

            var time = thisObj[i].timeTaken;
            time = time || 0
            if (time == NaN || time == null) {
                m = m + 0;
            } else {
                m = m + time;
            }

        }

        function msToTime(duration) {
            var milliseconds = parseInt((duration % 1000) / 100),
                seconds = parseInt((duration / 1000) % 60),
                minutes = parseInt((duration / (1000 * 60)) % 60),
                hours = parseInt((duration / (1000 * 60 * 60)));

            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
            var time = hours + " hrs " + minutes + " mins";
            return time;
        }
        return msToTime(m);
    },

    totalTimeCount: function() {
        var s = 0;
        var modules = userProgress.findOne({ userId: this._id }).modules;
        for (var i = 0; i < modules.length; i++) {
            for (var j = 0; j < modules[i].activities.length; j++) {
                var time = modules[i].activities[j].timeTaken;
                time = time || 0
                if (time == NaN || time == null) {
                    s = s + 0;
                } else {
                    s = s + time;
                }
            }
        }

        function msToTime(duration) {
            var milliseconds = parseInt((duration % 1000) / 100),
                seconds = parseInt((duration / 1000) % 60),
                minutes = parseInt((duration / (1000 * 60)) % 60),
                hours = parseInt((duration / (1000 * 60 * 60)));

            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
            var time = hours + " hrs " + minutes + " mins";
            return time;
        }
        return msToTime(s);

    },

    userNote: function() {
        return userNotes.find({ noteAuthor: this._id });
    },

    isActivityCompleted: function() {
        if (this.completed == "Started") {
            return "Started";
        } else if (this.completed == "Paused") {
            return "Paused";
        } else if (this.completed == "Resumed") {
            return "Resumed";
        } else if (this.completed) {
            return "Completed";
        } else {
            return "Not Completed";
        }
    },

    isActivityStarted: function() {
        if (this.dateStarted == null) {
            return false;
        } else {
            return true;
        }
    },

    isModuleFinished: function() {
        return this.finished ? "Finished" : "Not Finished";
    },

    isActivityEnded: function() {
        if (this.dateEnded == null) {
            return false;
        } else {
            return true;
        }
    },

    // timeTaken: function() {
    //	if (this.dateEnded != null && this.dateStarted != null) {
    //		var duration = moment.duration(this.dateEnded - this.dateStarted, 'milliseconds');
    //		var hours = duration.hours();
    //		var minutes = duration.minutes();
    //		var seconds = duration.seconds();
    //		return (hours<10 ? '0'+hours : hours) + ":" + (minutes<10 ? '0'+minutes : minutes) + ":" + (seconds<10 ? '0'+seconds : seconds);
    //	}
    //},

    timeTaken: function(thisObj) {
        var date = thisObj.timeTaken;

        function msToTime(duration) {
            var milliseconds = parseInt((duration % 1000) / 100),
                seconds = parseInt((duration / 1000) % 60),
                minutes = parseInt((duration / (1000 * 60)) % 60),
                hours = parseInt((duration / (1000 * 60 * 60)));

            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
            var time = hours + ":" + minutes + ":" + seconds;
            return time;
        }
        if (isNaN(date) || date == null) {
            return " ";
        } else {
            return msToTime(date);
        }
    },

    userRecordings: function() {
        return audioRecordings.find({ audioAuthor: this._id });
    },

    formatuploadDate: function() {
        var date = new Date(this.uploadedAt);
        var day = (date.getUTCDate() < 10 ? '0' : '') + date.getUTCDate();
        var month = ((date.getUTCMonth() + 1) < 10 ? '0' : '') + (date.getUTCMonth() + 1); //months from 1-12
        var year = date.getUTCFullYear();
        var hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
        var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

        var formattedDate = day + "/" + month + "/" + year + " " + hours + ":" + minutes;
        return formattedDate;
    },

    noOfSections: function() {
        return this.sections.length;
    },

    isAssessmentStarted: function() {
        if (this.startDate == undefined) {
            return 'Not Started';
        } else {
            date = this.startDate;
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        }
    },

    isAssessmentCompleted: function() {
        if (this.completeDate == undefined) {
            return 'Not Completed';
        } else {
            date = this.completeDate;
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        }
    },

    assessmentDoc: function() {
        var assessmentId = String(this);
        return studentAssessments.findOne({ _id: assessmentId });
    },

    notMarked: function() {
        return (this.pass == null)
    },

    sectionUnmarked: function() {
        for (var i = 0; i < this.sections.length; i++) {
            if (this.sections[i].pass == null) {
                return true;
            }
        }
        return false;
    },

    passOrFail: function() {
        if (this.pass) {
            return this.pass;
        } else if (this.pass == null) {
            return 'Not Marked'
        }
    },

    audioName: function(name) {
        if (name == undefined || name == null) {
            return true;
        }
    },

    mod1Trophy: function() {
        return checkModuleTrophy(this._id, 1);
    },

    mod2Trophy: function() {
        return checkModuleTrophy(this._id, 2);
    },

    mod3Trophy: function() {
        return checkModuleTrophy(this._id, 3);
    },

    mod4Trophy: function() {
        return checkModuleTrophy(this._id, 4);
    },

    mod5Trophy: function() {
        return checkModuleTrophy(this._id, 5);
    },

    mod6Trophy: function() {
        return checkModuleTrophy(this._id, 6);
    },

    mod7Trophy: function() {
        return checkModuleTrophy(this._id, 7);
    },

    mod8Trophy: function() {
        return checkModuleTrophy(this._id, 8);
    },

    mod9Trophy: function() {
        return checkModuleTrophy(this._id, 9);
    },

    mod10Trophy: function() {
        return checkModuleTrophy(this._id, 10);
    },

    trophy1: function() {
        return checkLargerTrophies(this._id, 1);
    },

    trophy2: function() {
        return checkLargerTrophies(this._id, 2);
    },

    trophy3: function() {
        return checkLargerTrophies(this._id, 3);
    },

    'isScormSession': function() {
        var scormActive = localStorage.getItem("isScormAPIActive");
        console.log(scormActive);
        if (scormActive != null && scormActive != 'undefined' && scormActive == 'yes') {
            return false;

        } else {
            return true;
        }
    },

    getScormID: function() {
        var username = Meteor.users.findOne({ _id: this._id }).username;
        console.log(username);
        var atSign = username.indexOf('@');
        var scormID = username.substring(0, atSign != -1 ? atSign : username.length);
        return scormID;
    }

});

Template.userPage.events({

    'click *[data-function="viewNote"]': function(evt) {
        var noteId = $(evt.currentTarget).attr('data-id');
        //Router.go('/admin/noteviewer/' + Router.current().params.userId + '/' + noteId);
        Router.go('/noteviewer/' + noteId);
    },

    'click #recordings-table > tbody > tr > td > a': function(evt) {
        Router.go('/audioentry/' + this._id);
    },

    'click #assignAssessment': function(evt) {
        Meteor.call('assignNewAssessment', this._id);
    },

    'click *[data-function="goToAssessment"]': function(evt) {
        Router.go('/assessment/' + this._id);
    },

    'click *[data-function="reviewAssessment"]': function(evt) {
        Router.go('/assessmentreview/' + this._id);
    },

    'click *[data-function="deleteAudio"]': function(evt) {
        if (!confirm('Are you sure you want to delete this recording?')) return;
        audioRecordings.remove({ _id: this._id });
        Bert.alert('Recording deleted', 'success', 'growl-top-right');
    },

    /**
     * Used for a certificate/non-certificate version of the course
     * Uncomment if needed - not implemented fully yet
     */

    // 'change .addCertificate': function(evt) {
    // 	if(evt.currentTarget.checked) {
    // 		console.log("CHECKED");
    // 		Meteor.call('addCertificate', true);
    // 	} else {
    // 		console.log("Un-CHECKED");
    // 		Meteor.call('addCertificate', false);
    // 	}		
    // },

});

var checkModuleTrophy = function(id, index) {
    var modulesFinishedNotification = Meteor.users.findOne({ _id: id }).moduleFinishedNotification;
    if (modulesFinishedNotification != null && modulesFinishedNotification != undefined) {
        if (modulesFinishedNotification[index] != null && modulesFinishedNotification[index] != undefined) {
            return true;
        }
    }
    return false;
}

var checkLargerTrophies = function(id, index) {
    var trophies = Meteor.users.findOne({ _id: id }).trophyAchieved;
    if (trophies != null && trophies != undefined) {
        if (trophies[index] != null && trophies[index] != undefined)
            return true;
    }
    return false;
}