Template.adminSubGroupEditor.rendered = function() {
    
        document.title = "Subgroup Editor - Journey 2 English";

        refreshPageOnce("adminSubGroupEditor");
}

Template.adminSubGroupEditor.helpers({
    
    subgroupid: function(){
        return window.location.href.substring((window.location.href.lastIndexOf('/') + 1), window.location.href.length);
    },

    possibleStuddents: function(){
        var subgroupId = this._id;
        //for each student in this group that is not in this subgroup or any other subgroup, return this user to the array of possible users
        var groupId = this.group;
        var possible = Meteor.users.find({$and: [ { $or:[ {subgroups: {$exists: false} }, { subgroups: {$eq: []} } ]} , { groups: { $in: [groupId]} }, { roles: { $in: ["student"]} }]});
        return possible;
    },
    

    userInCharge: function(subgroupid){
        var subgroup = subgroups.findOne({_id: subgroupid});
        return (Roles.userIsInRole( Meteor.userId(), 'admin') || Roles.userIsInRole( Meteor.userId(), 'moderator') || subgroup.tutor == Meteor.userId());
    },

    expiryDate: function() {
		if(this.expiry == undefined){
			return "No expiry date";
		}

		var date = new Date(this.expiry);

		var day = (date.getUTCDate()<10?'0':'') + date.getUTCDate();
		var month = ((date.getUTCMonth() + 1)<10?'0':'') + (date.getUTCMonth() + 1); //months from 1-12
		var year = date.getUTCFullYear();
		var hours = (date.getHours()<10?'0':'') + date.getHours();
		var minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();

		var formattedDate = year + "/" + month + "/" + day + " " + hours + ":" + minutes;
		return formattedDate;
	},

	expiredStyle: function() {
		var expiry = this.expiry;
		var expiryDate = new Date(this.expiry);
		var today = new Date();

		if (expiryDate < today && expiry != null){
			return 'color:red; font-weight: bold;';
		}

    },

    tutor: function(){
        var subgroupId = this._id;
        var tutorId = subgroups.findOne({_id: subgroupId}).tutor;
        var tutorName = Meteor.users.findOne({_id: tutorId}).username;
        return tutorName;
    },

    //Returns all users who are currently online.
	online: function(id) {
        if(Meteor.users.findOne({_id: id, "status.online": true})){
            return "online fas fa-circle";
        } else{
            return "offline far fa-circle";
        }
    },

    user: function(studentsInGroup){
        var students = [];
        studentsInGroup.forEach(function(studentId){
            students.push(Meteor.users.findOne({_id: studentId}));
        });

        return students;
    }
});

Template.adminSubGroupEditor.created = function(){
    this.subscribe('organisations');
    this.subscribe('groups');
    this.subscribe('subgroups');
    this.subscribe('users');
}

Template.adminSubGroupEditor.events({

    'click .student-remove': function(evt){
        evt.preventDefault();
        var studentId = $(evt.currentTarget).data("studentid");
        var subgroupId = window.location.href.substring((window.location.href.lastIndexOf('/') + 1), window.location.href.length);
        if(confirm("Are you sure that you want to remove this student from the subgroup?") === true){
            Meteor.call("removeStudentFromSubgroup", subgroupId, studentId);
        }else{
            return false;
        }
    },

    'click .student-add': function(evt){
        evt.preventDefault();
        var studentId = $(evt.currentTarget).data("studentid");
        var subgroupId = window.location.href.substring((window.location.href.lastIndexOf('/') + 1), window.location.href.length);
        Meteor.call("addStudentToSubgroup", subgroupId, studentId);
    },

    'click #students-add-reveal': function(){
        $("#possible-students").removeClass("hidden");
        $("#possible-students").addClass("fadeIn");
    },

    'click .studentlist-close': function(evt){
		evt.preventDefault();
		$("#possible-students").addClass("hidden");
	}

});
