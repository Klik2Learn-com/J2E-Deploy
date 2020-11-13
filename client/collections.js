
userNotes = new Mongo.Collection('userNotes');
userProgress = new Mongo.Collection('userProgress');
groups = new Mongo.Collection('groups');
subgroups = new Mongo.Collection('subgroups');
gameAccess = new Mongo.Collection('gameAccess');
organisations = new Mongo.Collection('organisations');
studentAssessments = new Mongo.Collection('studentAssessments');
assessmentTypes = new Mongo.Collection('assessmentTypes');
f_forums = new Mongo.Collection('f_forums');
bug_reports = new Mongo.Collection('bug_reports');
feedback_forms = new Mongo.Collection('feedback_forms');
contact_form = new Mongo.Collection('contact_form');
messages = new Mongo.Collection('messages');
payment_plans = new Mongo.Collection('payment_plans');
vouchers = new Mongo.Collection('vouchers');
appliedVouchers = new Mongo.Collection('appliedVouchers');
Announcements = new Mongo.Collection('Announcements');
customEmails = new Mongo.Collection('customEmails');

CGBadgeData = new Mongo.Collection('CGBadgeData');

toolRecs = new Mongo.Collection('toolRecs');

/****************************************************************
*****************************************************************
*
*                    audioRecordings
*
*****************************************************************
*****************************************************************/
/*
* - audioRecordings collection is used to hold each student's Voice Recorder
*   entry.
*
*/
var audioStore = new FS.Store.FileSystem("audio-recordings", {
    maxTries: 5 // optional, default 5
    //chunkSize: 1024 * 1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
    // Default: 2MB. Reasonable range: 512KB - 4MB
});

audioRecordings = new FS.Collection("audioRecordings", {
    stores: [audioStore]
});

audioRecordings.allow({
    insert: function (userId, doc) {
        if (userId) {
            return true;
        }
    },
    update: function () {
        return true;
    },
    remove: function () {
        return true;
    },
    download: function () {
        return true;
    }
})

/*********************************************************************
**********************************************************************
**********************************************************************
**********************************************************************/

/****************************************************************
*****************************************************************
*
*                    commentAudioRecordings
*
*****************************************************************
*****************************************************************/
/*
* - commentAudioRecordings collection is used to hold audio replies to audioRecordings.
*
*/
var commentStore = new FS.Store.FileSystem("comment-recordings", {
    maxTries: 5 // optional, default 5
    // chunkSize: 1024 * 1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
    // Default: 2MB. Reasonable range: 512KB - 4MB
});

commentRecordings = new FS.Collection("commentRecordings", {
    stores: [commentStore]
});

commentRecordings.allow({
    insert: function (userId, doc) {
        if (userId) {
            return true;
        }
    },
    update: function () {
        return true;
    },
    remove: function () {
        return true;
    },
    download: function () {
        return true;
    }
})

/*********************************************************************
**********************************************************************
**********************************************************************
**********************************************************************/


/****************************************************************
*****************************************************************
*
*                    assessmentRecordings
*
*****************************************************************
*****************************************************************/
/*
* - assessmentRecordings collection is used to hold recordings used in assessments.
*
*/
var assessmentStore = new FS.Store.FileSystem("assessment-recordings", {
    maxTries: 5 // optional, default 5
    // chunkSize: 1024 * 1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
    // Default: 2MB. Reasonable range: 512KB - 4MB
});

assessmentRecordings = new FS.Collection("assessmentRecordings", {
    stores: [assessmentStore]
});

assessmentRecordings.allow({
    insert: function (userId, doc) {
        if (userId) {
            return true;
        }
    },
    update: function () {
        return true;
    },
    remove: function () {
        return true;
    },
    download: function () {
        return true;
    }
})


/****************************************************************
*****************************************************************
*
*                custom organisations logos
*
*****************************************************************
*****************************************************************/
Orglogos = new FS.Collection("Orglogos", {
    stores: [
        new FS.Store.FileSystem("OrgLogosOriginals"),
        new FS.Store.FileSystem("OrgLogosThumbs")
    ],
    filter: {
        allow: { contentTypes: ['image/*'] }
    },
    onInvalid: function (message) {
        alert(message);
    }
});

Orglogos.allow({
    insert: function (userId, doc) {
        if (userId) {
            return true;
        }
    },
    update: function (userId, doc, fields, modifiers) {
        return true;
    },
    download: function () {
        return true;
    }
})

LogoURLs = new Mongo.Collection("LogoURLs");

LogoURLs.allow({
    insert: function () {
        return true;
    },
    update: function (userId, doc, fields, modifiers) {
        return true;
    }
})