Template.adminSubgroupCreator.rendered = function () {

    document.title = "Create Subgroup - Journey 2 English";

}

Template.adminSubgroupCreator.helpers({
    group: function () {
        var groupsAvailable = [];
        var groupNames = [];
        var org = Meteor.users.findOne({ _id: Meteor.userId() }).organisation;
        org = org.toString().trim();
        if(Roles.userIsInRole( Meteor.userId(), 'admin') || Roles.userIsInRole( Meteor.userId(), 'moderator')){
            groupsAvailable = groups.find({ organisation: org });            
        }else{
            groupsAvailable = groups.find({ $and: [{organisation: org}, {tutors: {$in: [Meteor.userId()]}}]});
        }

        // Object.keys(groupsAvailable).forEach(function(entry, i){
        //     groupNames[i] = groupsAvailable[entry].name;
        // });

        return groupsAvailable;

    },

    groupIsSelected: function () {
        return (Template.instance().selectedGroup.get() != undefined || groups.find({}).count() == 1)
    }

});


Template.adminSubgroupCreator.events({

    'click button[data-function="createsubgroup"]': function (evt) {
        var subgroupName = $('#subgroupname').val();

        if (groups.find({}).count() == 1) {
            var selectedGroup = groups.findOne({})._id;
        } else {
            var selectedGroupName = $('#groupselector').val();
            var selectedGroup = groups.findOne({name: selectedGroupName})._id;
        }

        var org = groups.findOne({_id: selectedGroup}).organisation;

        Meteor.call('createSubgroup', subgroupName, Meteor.userId(), selectedGroup, org, function(err){
            if(err)
                alert('Error: ' + err.reason);
            else
                Bert.alert( 'Subgroup Created!', 'success', 'growl-top-right' );
        });
    },

    'change #groupselector': function (evt) {
        console.log($('#groupselector').val());
        Template.instance().selectedGroup.set($('#groupselector').val());
    }

});

Template.adminSubgroupCreator.created = function () {
    this.subscribe('groups');
    this.subscribe('organisations');
    Template.instance().selectedGroup = new ReactiveVar();
}

