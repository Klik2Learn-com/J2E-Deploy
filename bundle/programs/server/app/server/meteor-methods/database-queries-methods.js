(function(){Meteor.methods({
    'getUsernameFromId': function(userId){
        var user = checkUser(userId);

        return user.username;
    },

    'getUserProfileFromId': function(userId){
        var user = checkUser(userId);

        return user.profile;
    }
});

var checkUser = function(userId){
    if(userId == null || userId == 'undefined'){
        throwError("UserId undefined");
    }
    var user = Meteor.users.findOne({_id: userId});

    if(user == null || user == 'undefined'){
        throwError("No such user: " + userId);
    }

    return user;
}

var throwError = function(msg){
    throw new Meteor.Error(msg);
}
}).call(this);
