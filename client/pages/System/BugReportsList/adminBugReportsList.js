Template.adminBugReportsList.created = function(){
	this.subscribe('bug_reports');
};

Template.adminBugReportsList.helpers({

	bug_reports: function() {
		return bug_reports.find({});
	},

	userIdToName : function(uId){
		var user = Meteor.users.findOne({_id : uId});
		if(user === undefined){
			return 'User non-existing';
		}
		return user.profile.firstname + " " + user.profile.surname;
	}
});

Template.adminBugReportsList.events({
	'click .tablesorter-headerRow' : function(evt){
		$("#adminBugReportsListTable").trigger("update");
		$("#adminBugReportsListTable").trigger("appendCache");
	}
});

Template.adminBugReportsList.rendered = function(){
	
	document.title = "Bug reports list - Journey 2 English";

	$("#adminBugReportsListTable").tablesorter();
};