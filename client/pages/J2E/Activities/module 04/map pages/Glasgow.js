Template.Glasgow.helpers({
    isLocked: function () {
        Meteor.subscribe('gameAccess');
        var userid = Meteor.userId();
        var passed = gameAccess.find({ "user": userid, "module": "4", "passedTest": true }).count();
        if (passed == 0) {
            return "locked"
        };
    }
});

