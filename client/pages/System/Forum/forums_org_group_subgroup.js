Template.forums_org_group_subgroup.created = function(){
	this.subscribe('organisations');
    this.subscribe('groups');
    this.subscribe('subgroups');
	this.subscribe('f_forums');
	Session.set('stickyLock', false);
};

Template.forums_org_group_subgroup.rendered = function(){
	// dom manipulation 
	// var sticky_threads = $(".stickyThread");
	// $(".stickyThread").remove();
	// sticky_threads.insertBefore(".nonStickyThread:first");
	refreshPageOnce("forums_org_group_subgroup");

    document.title = "Forums - Journey 2 English";
};

Template.forums_org_group_subgroup.helpers({
	forumDoc: function() {
		var organisationId = Router.current().params.organisation;
        var groupId = Router.current().params.group;
        var forumdoc = f_forums.findOne({organisation: organisationId, "groups.id" : groupId});
		return forumdoc;
	},

	orgName : function(){
		return organisations.findOne({_id: Router.current().params.organisation}).name;
    },
    
    subgroupName: function(){
        return subgroups.findOne({_id: Router.current().params.subgroup}).name;
    },

    subgroupThread: function(){
        var organisationId = Router.current().params.organisation;
        var groupId = Router.current().params.group;
        var subgroupId = Router.current().params.subgroup;
		var groups = f_forums.findOne({organisation: organisationId, "groups.id" : groupId}).groups;
		var currG = null;
		groups.forEach(function(item){
			if (item["id"] == groupId){
				currG = item;
			}
        });
        
        var threads = [];

        currG.subgroups.forEach(function(item){
            if(item["id"] == subgroupId){
                threads = item.threads;
            }
        });

		return threads;
    },

    currGroup: function(){
		return Router.current().params.group;
	},

	postCount : function(){
		var postsCount = this.posts.length - 1;
		if(postsCount == 0){return "No replies";}
		else if(postsCount == 1){return "1 reply";}
		return postsCount + " replies";
	},

	latestPostBy: function(){
		var postsCount = this.posts.length - 1;
		if(postsCount == 0)return "";

		var latestPostAuthorId = this.posts[this.posts.length - 1].poster;
		var profile = Meteor.users.findOne({ _id : latestPostAuthorId }).profile;
		// var username = Meteor.users.findOne({ _id : latestPostAuthorId }).username;
		return ", latest post by: " + profile.firstname + " " + profile.surname ; 
	},

	userStatus : function(){
		return Meteor.users.findOne({ _id : Meteor.userId() }).roles.__global_roles__;
	},

	posterNameStarted : function(){
		var poster =  this.posts[0].poster;
		var profile = Meteor.users.findOne({ _id : poster }).profile;
		return profile.firstname + " " + profile.surname; 
	},

	posterName : function(){
		var profile = Meteor.users.findOne({ _id : this.poster }).profile;		
		var username = Meteor.users.findOne({ _id : this.poster }).username;
		return profile.firstname + " " + profile.surname; 
	},

	deletedCheck: function(status){
		return status;
	},

	stickyCheck: function(){
		if (this.sticky){
			return "stickyThread";
		}
		return "nonStickyThread";
	},
	stickyButtonCheck: function(organisation){
		/* This function is causing build errors. Needs to be fixed */
		var userOrg = Meteor.users.findOne({ _id : Meteor.userId() }).organisation;
		var areOrgsEqual = false;
		userOrg.forEach(function(org){
			if(org == organisation){
				areOrgsEqual = true;
			}
		})
		return (Roles.userIsInRole(Meteor.userId(), 'admin')) ||  (Roles.userIsInRole(Meteor.userId(), 'moderator') && areOrgsEqual);
	},

	postbuttonsCheck: function(organisation, poster){
		var userType = Meteor.users.findOne({ _id : Meteor.userId() }).roles.__global_roles__;
		if (userType == "admin"){
			return true;
		}
		else if (userType == "moderator"){
			var organisationDB = Meteor.users.findOne({ _id : Meteor.userId() }).organisation;
			organisationDB.forEach(function(org){
				if(org == organisation){
					return true;
				}
			});
		}

		if(Meteor.userId() == poster){
			return true;
		}

	},

	threadbuttonsCheck: function(organisation, poster){
		var poster = this.posts[0].poster;

		var userType = Meteor.users.findOne({ _id : Meteor.userId() }).roles.__global_roles__;
		if (userType == "admin"){
			return true;
		}
		else if (userType == "moderator"){
			var organisationDB = Meteor.users.findOne({ _id : Meteor.userId() }).organisation;
			organisationDB.forEach(function(org){
				if(org == organisation){
					return true;
				}
			});
		}

		if(Meteor.userId() == poster){
			return true;
		}

	},

	// stickyThread: function(){
	// 	result = [];

	// 	for (var i =0; i<this.threads.length; i++){
	// 		if(this.threads[i].sticky == true){
	// 			result.push(this.threads[i]);
	// 		}
	// 	}
	// 	return result;
	// },


	// nonStickyThread: function(){
	// 	result = [];

	// 	for (var i =0; i<this.threads.length; i++){
	// 		if(this.threads[i].sticky == false){
	// 			result.push(this.threads[i]);
	// 		}
	// 	}
	// 	return result;
	// }
});
Template.forums_org_group_subgroup.events({
	"submit form": function(e){
  		e.preventDefault();
  		e.target.reset();
    },
    
	'click .forum_thread': function(e){
		if($(e.target).parent().siblings(".forum_posts").hasClass('hidden')){
			$(e.target).parent().siblings(".forum_posts").removeClass('hidden');
			$(e.target).parent().siblings(".reply_in_thread").removeClass('hidden');

		}else{
			$(e.target).parent().siblings(".forum_posts").addClass('hidden');
			$(e.target).parent().siblings(".reply_in_thread").addClass('hidden');
		}
		
	},
	'click .create_thread_button':function(e){
		var organisation = Router.current().params.organisation;
        var group = Router.current().params.group;
        var subgroup = Router.current().params.subgroup;
		var title = $(e.target).siblings(".create_thread_input_title").val();
		var post = $(e.target).siblings(".create_thread_input_post").val();

		if(title == "" || post == "")return;
		Meteor.call('createNewThread', organisation, group, subgroup, title, post, Meteor.userId(), function (error, result) {
			if (!error) {
				Bert.alert( 'Thread created', 'success', 'growl-top-right' );
			} else {
				Bert.alert( error.toString() , 'danger', 'growl-top-right' );
			}
		});
	},
	'click .reply_in_thread_button':function(e){
		var organisation = Router.current().params.organisation;
        var group = Router.current().params.group;
        var subgroup = Router.current().params.subgroup;

		var threadNo = $(e.target).parents('.forum-thread-container').attr('data-threadNo');

		var post = $(e.target).siblings(".reply_in_thread_post").val();
		if(post=="")return;
		Meteor.call('replyInThread', organisation, group, subgroup, threadNo, post, Meteor.userId(), function (error, result) {
			if (!error) {
				Bert.alert( 'Post successful', 'success', 'growl-top-right' );
			} else {
				Bert.alert( error.toString() , 'danger', 'growl-top-right' );
			}
		});
	},

	'click .delete_thread_button':function(e){
		var organisation = Router.current().params.organisation;
        var group = Router.current().params.group;
        var subgroup = Router.current().params.subgroup;

		var threadNo = $(e.target).parents('.forum-thread-container').attr('data-threadNo');

		if(!confirm('Are you sure you want to delete this topic?'))return;

		Meteor.call('deleteThread', organisation, group, subgroup, threadNo, Meteor.userId(), function (error, result) {
			if (!error) {
				Bert.alert( 'Thread deleted', 'success', 'growl-top-right' );
			} else {
				Bert.alert( error.toString() , 'danger', 'growl-top-right' );
			}
		});
	},

	'click .edit_title_button' : function(e){
		if($(e.target).parents("ul.details").siblings(".edit_title_form").hasClass('hidden')){
			$(e.target).parents("ul.details").siblings(".edit_title_form").removeClass('hidden');
		}else{
			$(e.target).parents("ul.details").siblings(".edit_title_form").addClass('hidden');
		}
	},

	'click .sticky_button' : function(e){
		var organisation = Router.current().params.organisation;
        var group = Router.current().params.group;
        var subgroup = Router.current().params.subgroup;

		var parent = $(e.target).parents('.forum-thread-container');

		var threadNo = parent.attr('data-threadNo');
		var lock = Session.get('stickyLock');

		// if(parent.hasClass('stickyThread')){
		// 	parent.removeClass('stickyThread');
		// }else{
		// 	parent.addClass('stickyThread');
		// }

		if(lock){
			Bert.alert( 'Previous toggle still executing. Please wait.' , 'warning', 'growl-top-right' );
			return;
		}

		Meteor.call('toggleSticky', organisation, group, subgroup, threadNo, Meteor.userId(), lock, function(error){
			if(!error){
				Bert.alert( 'Sticky status changed', 'success', 'growl-top-right' );

				// var sticky_threads = $(".stickyThread");
				// $(".stickyThread").remove();
				// sticky_threads.insertAfter("#logged-status").first();
			}else {
				Bert.alert( error.toString() , 'danger', 'growl-top-right' );
			}
			Session.set('stickyLock', false);
		});

	
	},

	'click .change_post_button' : function(e){
		var post = $(e.target).attr("data-post");
		var form = $("form[data-post='"+ post + "']");
		if(form.hasClass('hidden')){
			form.removeClass('hidden');
		}else{
			form.addClass('hidden');
		}
	},

	'click .change_post_ok' : function(e){
		var organisation = Router.current().params.organisation;
        var group = Router.current().params.group;
        var subgroup = Router.current().params.subgroup;

		var threadNo = $(e.target).parents('.forum-thread-container').attr('data-threadNo');
		var postNo = $(e.target).parents('.forum-post-container').attr('data-postNo');

		var newContent = $(e.target).siblings(".change_post_input").val();
		if (newContent == "")return;

		$(e.target).parents('.change_post_form').addClass('hidden');
		
		Meteor.call('editPost', organisation, group, subgroup, threadNo, postNo, Meteor.userId(), newContent, function(error){
			if(!error){
				Bert.alert( 'Post edited', 'success', 'growl-top-right' );
			}else {
				Bert.alert( error.toString() , 'danger', 'growl-top-right' );
			}
		});
		//$(e.target).siblings(".change_post_input").addClass('hidden');
	},

	'click .edit_title_ok' : function(e){

		var organisation = Router.current().params.organisation;
        var group = Router.current().params.group;
        var subgroup = Router.current().params.subgroup;

		var threadNo = $(e.target).parents('.forum-thread-container').attr('data-threadNo');

		var newTitle = $(e.target).siblings(".edit_title_input").val();
		if (newTitle == "")return;

		$(e.target).parents('.edit_title_form').addClass('hidden');

		Meteor.call('editThreadTitle', organisation, group, subgroup, threadNo, Meteor.userId(), newTitle, function(error){
			if(!error){
				Bert.alert( 'Title updated', 'success', 'growl-top-right' );
			}else {
				Bert.alert( error.toString() , 'danger', 'growl-top-right' );
			}
		});
	},
	'click .delete_post_button':function(e){
		var organisation = Router.current().params.organisation;
        var group = Router.current().params.group;
        var subgroup = Router.current().params.subgroup;
		if(!confirm('Are you sure you want to delete this post?'))return;

		var threadNo = $(e.target).parents('.forum-thread-container').attr('data-threadNo');
		var postNo = $(e.target).parents('.forum-post-container').attr('data-postNo');
		Meteor.call('deletePost', organisation, group, subgroup, threadNo, postNo, Meteor.userId(), function(error){
			if(!error){
				Bert.alert( 'Post deleted', 'success', 'growl-top-right' );
			}else {
				Bert.alert( error.toString() , 'danger', 'growl-top-right' );
			}
		});
	},

	'click .forum-new-post':function(e){
		document.location = "#newTopic";
	}

});