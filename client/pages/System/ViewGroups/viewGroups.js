Template.viewGroups.rendered = function() {

	document.title = "Groups - Journey 2 English";

}
Template.viewGroups.created = function(){
	this.subscribe('organisations');
	this.subscribe('groups');
}

Template.viewGroups.helpers({

	organisations: function(){
		if(Roles.userIsInRole( Meteor.userId(), 'admin') || Roles.userIsInRole( Meteor.userId(), 'moderator')){
			return organisations.find();
		} else {
			var orgId = Meteor.users.findOne({_id: Meteor.userId()}).organisation;
			var arr = [];
			orgId.forEach(function(org) {
				arr.push(organisations.findOne({ _id: org}));
			})
			return arr;
		}
	},

	groups: function(org){
		//If admin or mod, return all groups otherwise return groups only for this tutor
		if(Roles.userIsInRole( Meteor.userId(), 'admin') || Roles.userIsInRole( Meteor.userId(), 'moderator')){
			return groups.find({organisation: org});
		} else {
			return groups.find({ $and: [{organisation: org}, {tutors: {$in: [Meteor.userId()]}}]});
		}
	},

	groupsWithNoOrg: function(org){
		return groups.find({organisation: ""});
	},

	numberTutors: function() {
		return this.tutors.length;
	},

	numberStudents: function() {
		return this.students.length;
	},

	numberSubgroups: function(){
		if(this.subgroups == null || this.subgroups == 'undefined')
			return 0;
		return this.subgroups.length;
	}

});

Template.viewGroups.events({

	'change [name="changeOrg"]': function(evt) {
		var orgId = $( evt.target ).find( 'option:selected' ).val();
		var groupId = $( evt.target ).find( 'option:selected' ).attr('data-groupId');

		Meteor.call( "changeOrganisationOfAGroup", orgId, groupId, function( error ) {
			if(!error){
				Bert.alert( 'Organisation changed', 'success', 'growl-top-right' );
			}else {
				Bert.alert( error.toString() , 'danger', 'growl-top-right' );
			}
		});
	},

	'click tbody > tr > td > .group-name': function(evt) {
		Router.go('/admin/groupeditor/' + this._id)
	},

	'click .delete': function(evt) {
		if(!confirm('Are you sure you want to delete this group?'))return;

		groupId = this._id;

		Meteor.call('deleteGroup', groupId, function(error){
			if(!error){
				Bert.alert( 'Group deleted', 'success', 'growl-top-right' );
			}else {
				Bert.alert( error.toString() , 'danger', 'growl-top-right' );
			}
		});
	},

	'click .edit_title_button' : function(e){
		if($(e.target).siblings(".edit_title_form").hasClass('hidden')){
			$(e.target).siblings(".edit_title_form").removeClass('hidden');
		}else{
			$(e.target).siblings(".edit_title_form").addClass('hidden');
		}
	},

	'click .edit_title_ok' : function(e){
		e.preventDefault();
		var groupId = $(e.target).siblings(".edit_title_input").attr('data-id');

		var newTitle = $(e.target).siblings(".edit_title_input").val();
		if (newTitle == "")return;

		$(e.target).parents('.edit_title_form').addClass('hidden');

		Meteor.call('editGroupName', groupId, newTitle, Meteor.userId(), function(error){
			if(!error){
				Bert.alert( 'Group name changed.', 'success', 'growl-top-right' );
			}else {
				Bert.alert( error.toString() , 'danger', 'growl-top-right' );
			}
		});
	}


});
