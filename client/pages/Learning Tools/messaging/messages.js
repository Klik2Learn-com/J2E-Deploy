Template.messages.events({
	'click .close': function(evt){
		$('.msg-reply-form').children('textarea').val('');
		$("#msgbody").val('');
	}
});

Template.messages_holder.events({
		
	'click .nbTab': function(evt) {
		$(evt.currentTarget).parents('section').addClass('hidden');
		$($(evt.currentTarget).attr('data-target')).removeClass('hidden');
	}

});

Template.messagesread.events({
	'click .msg-delete': function(evt){
		if(!confirm('Are you sure you want to delete this conversation?')){
			return;
		}
		else{
			var mID = $(evt.currentTarget).parents('.msg-row').attr('data-conversationId');
			
			Meteor.call('deleteMessage', mID, Meteor.userId(), function (error, result) {
				if (!error) {
					Bert.alert('Conversation deleted', 'success', 'growl-top-right' );
				} else {
					Bert.alert( error.toString() , 'danger', 'growl-top-right' );
				}
			});
		}
	},

	'click .msg-row': function(evt){
		evt.preventDefault();
		if ($(evt.currentTarget).hasClass('unread')){
			$(evt.currentTarget).removeClass('unread'); 
			
			// Opening behaviour for unread messages missing

			// $(evt.currentTarget).addClass('open');
			// $(evt.currentTarget).children('.msg-details').addClass('open');
			// $(evt.currentTarget).children('.msg-reply').css('display', 'block');
			
			
			var mID = $(evt.currentTarget).attr("data-conversationId");

			Meteor.call('readMessage', mID, Meteor.userId(), function (error, result) {
				if (!error) {
					// Bert.alert( 'Message read', 'success', 'growl-top-right' );
				} else {
					Bert.alert( error.toString() , 'danger', 'growl-top-right' );
				}
			});
		}
	},

	'click .msg-reply-form .button2': function(evt){
		evt.preventDefault();
		var mID = $(evt.currentTarget).parents('.msg-row').attr("data-conversationId");
		var sender = Meteor.userId();
		var msgbody = $(evt.currentTarget).parents('.msg-reply-form').children('textarea').val();

		Meteor.call('sendReply', mID, sender, msgbody, function (error, result) {
			if (!error) {
				Bert.alert( 'Message sent', 'success', 'growl-top-right' );

				$(evt.currentTarget).find('.msg-reply-form').addClass('hidden');
				$(evt.currentTarget).find('.actions').removeClass('hidden');
				$(evt.currentTarget).find('textarea').val('');
			} else {
				Bert.alert( error.toString() , 'warning', 'growl-top-right' );
			}
		});

	},

	'click .msg-row.closed:not(.msg-row.unread)': function(evt){
		evt.preventDefault();
		$(evt.currentTarget).removeClass('closed');
		$(evt.currentTarget).addClass('open');
		$(evt.currentTarget).children('.msg-details').addClass('open');
	},
	
	'click .msg-details.open:not(.msg-row.unread)': function(evt){
		evt.preventDefault();
		$(evt.currentTarget).removeClass('open');
		$(evt.currentTarget).parent('.msg-row').removeClass('open');
		$(evt.currentTarget).parent('.msg-row').addClass('closed');
	},
	
	'click .msg-reply:not(.msg-row.unread)': function(evt){
		evt.preventDefault();
		$(evt.currentTarget).parent().addClass('hidden');
		$(evt.currentTarget).parent().parent('.reply').children('.msg-reply-form').removeClass('hidden');
	},
	
	'click .msg-reply-cancel:not(.msg-row.unread)': function(evt){
		evt.preventDefault();
		$(evt.currentTarget).parent().parent('.options').removeClass('hidden');
		$(evt.currentTarget).parent().parent('.msg-reply-form').addClass('hidden');
		$(evt.currentTarget).parents(".msg-reply-form").siblings('.actions').removeClass('hidden');
	}
	
});

Template.messagesread.helpers({
	otherVisible: function(){
		var uID = Meteor.userId();
		if(this.p1 == uID && this.p2_visible == false){
			return false;
		}
		if(this.p2 == uID && this.p1_visible == false){
			return false;
		}
		return true;
	},
	messagesFetch: function(){
		var res = [];

		// Checking for items that the user is not supposed to see

		var m = messages.find({}).map( function(u) { 
			if (u.p1 == Meteor.userId()){
				if(u.p1_visible == true){
					return u;
				}else{
					return null;
				}
			}
			else if (u.p2 == Meteor.userId()){
				if(u.p2_visible == true){
					return u;
				}else{
					return null;
				}
			}
		});
		

		// Not visualising messages that are null i.e. hidden

		for(var i = m.length -1; i>=0; i--){
			if(m[i] != null){

				var uId = Meteor.userId();

				if(m[i].p1 == uId){
					if(m[i].p1_unread){
						res.unshift(m[i]);
					}
					else{
						res.push(m[i]);
					}
				}
				else if (m[i].p2 == uId){
					if(m[i].p2_unread){
						res.unshift(m[i]);
					}
					else{
						res.push(m[i]);
					}
				}			
			}
		}

		return res;
	},
	userIdToName: function(uId){
		var user = Meteor.users.findOne({"_id": uId});
		return user.profile.firstname + " " + user.profile.surname + " (" + user.username + ")"
	},
	isUnread: function(){
		var uId = Meteor.userId();
		if(this.p1 == uId){
			return this.p1_unread;
		}
		else if (this.p2 == uId){
			return this.p2_unread;
		}
	}
});


Template.messageswrite.helpers({
	/* This function is causing build errors. Needs to be fixed */
	trial: function(){
		var UId = Meteor.userId();
		var userOrg = Meteor.users.findOne({_id: UId}).organisation;
		var trialOrg = organisations.findOne({name: "Trial"})._id;

		userOrg.forEach(function(element) {
			if(element == trialOrg){
				return true;			
			}
		});
		
		return false;
	},
	userList: function(){
		var uId = Meteor.userId();
		return  Meteor.users.find({_id: {$ne: uId}}, {sort: {"username": 1}});
	},
	userListTrial: function(){
		var uId = Meteor.userId();
		return Meteor.users.find({roles: {$nin: ["tutor"]}});
	},
	isTutor: function(){
		if(this.roles[0] == "tutor"){
			return "(Tutor)";
		}
		return "";
	}
});

Template.messageswrite.events({
	'click .button2':function(e){
		e.preventDefault();

		var receiver = $("#message-to").find(":selected").attr("data-uId");
		var msgsubject = $("#msgsubject").val();
		var msgbody = $("#msgbody").val();

		Meteor.call('sendMessage', receiver, msgsubject, msgbody, Meteor.userId(), function (error, result) {
			if (!error) {
				Bert.alert( 'Message sent', 'success', 'growl-top-right' );
				$("#msgsubject").val("");
				$("#msgbody").val("");
			} else {
				Bert.alert( error.toString() , 'warning', 'growl-top-right' );
			}
		});
	}
});

Template.messageswrite.created = function (){
	this.subscribe('messages');	
	this.subscribe('users');
	this.subscribe('organisations');
};
Template.messagesread.created = function (){
	this.subscribe('messages');
};