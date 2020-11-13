Meteor.methods({
    "getUserBySCORMId": function (scorm_Id) {
        var user = Meteor.users.findOne({ scormId: scorm_Id });
        if (user == null || user == "undefined") {
            throw new Meteor.Error("500", "No user associated with this ID");
        } else {
            return user;
        }
    },

    "addScormIdToUser": function(userId, scorm_Id){
        Meteor.users.update({_id: userId}, {$set: { scormId: scorm_Id}});
    }
})