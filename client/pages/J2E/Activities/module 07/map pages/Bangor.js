Template.Bangor.helpers({
    isLocked: function () {
        Meteor.subscribe('gameAccess');
        var userid = Meteor.userId();
        var passed = gameAccess.find({ "user": userid, "module": "7", "passedTest": true }).count();
        if (passed == 0) {
            return "locked"
        };
    }
});

