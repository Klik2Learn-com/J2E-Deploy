(function(){
userNotes = new Mongo.Collection('userNotes');
userProgress = new Mongo.Collection('userProgress');
gameAccess = new Mongo.Collection('gameAccess');
groups = new Mongo.Collection('groups');
subgroups = new Mongo.Collection('subgroups');
organisations = new Mongo.Collection('organisations');
organisations._ensureIndex({ name: 1 }, { unique: 1 });
studentAssessments = new Mongo.Collection('studentAssessments');
assessmentTypes = new Mongo.Collection('assessmentTypes');
f_forums = new Mongo.Collection('f_forums');

bug_reports = new Mongo.Collection('bug_reports');
feedback_forms = new Mongo.Collection('feedback_forms');
contact_form = new Mongo.Collection('contact_form');

duration_log = new Mongo.Collection('duration_log');
messages = new Mongo.Collection('messages');

ContactMails = new Mongo.Collection('contact_mail');
stripeLog = new Mongo.Collection('stripe_log');
payment_plans = new Mongo.Collection('payment_plans');
vouchers = new Mongo.Collection('vouchers');
appliedVouchers = new Mongo.Collection('appliedVouchers');
Announcements = new Mongo.Collection('Announcements');
customEmails = new Mongo.Collection('customEmails');

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
var audioStore = new FS.Store.GridFS("audioRecordings", {
    maxTries: 5, // optional, default 5
    chunkSize: 1024 * 1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
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
* - commentAudioRecordings collection is used to hold audio replies to userAudioRecordings.
*
*/
var commentStore = new FS.Store.GridFS("commentRecordings", {
    maxTries: 5, // optional, default 5
    chunkSize: 1024 * 1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
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
*                    assessmentAudioRecordings
*
*****************************************************************
*****************************************************************/
/*
* - assessmentAudioRecordings collection is used to hold recordings used in assessments.
*
*/
var assessmentStore = new FS.Store.GridFS("assessmentRecordings", {
    maxTries: 5, // optional, default 5
    chunkSize: 1024 * 1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
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
// Orglogos = new FS.Collection("orglogos", {
//     stores: [
//         new FS.Store.GridFS("original", { path: "/public/images/logos" }),
//         new FS.Store.GridFS("thumb", { path: "/public/images/logos" })
//     ],
//     filter: {
//         maxSize: 32000000, //32Mb
//         allow: { contentTypes: ['image/*'] }
//     },
//     onInvalid: function (message) {
//         //throw new Meteor.Error(403, message);
//     }
// });

Orglogos = new FS.Collection("Orglogos", {
    stores: [
        new FS.Store.GridFS("OrgLogosOriginals"),
        new FS.Store.GridFS("OrgLogosThumbs")
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
}).call(this);
