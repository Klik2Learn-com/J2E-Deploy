Template.dynamicTemplate.helpers({
    active: function() {
        return Meteor.users.findOne({_id: Meteor.userId()}).roles[0] + "TEST";
    }
});