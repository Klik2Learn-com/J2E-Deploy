Template.forums_org.created = function(){
	this.subscribe('organisations');
	this.subscribe('groups');
	this.subscribe('f_forums');
};

Template.forums_org.helpers({
	
	forumDoc: function() {
		var organisationId = Router.current().params.organisation;
		var forumDoc = f_forums.findOne({organisation: organisationId});
		return forumDoc;
	},
	
	orgName:function(){
		return organisations.findOne({_id: this.organisation}).name;
	},

	group: function(){
		var groups = this.groups;

		if(Roles.userIsInRole( Meteor.userId(), 'admin' ) || Roles.userIsInRole( Meteor.userId(), 'moderator' )){
			return groups;
		}

		var userGroups = Meteor.users.findOne({_id: Meteor.userId()}).groups;
		var showGroups = [];

		groups.forEach(function(group){
			if(userGroups.indexOf(group.id) >= 0){
				showGroups.push(group);
			}
		});
		
		return showGroups;
	},

	groupName: function(){
		return groups.findOne({_id: this.id}).name;
	}

});