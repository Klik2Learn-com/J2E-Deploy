Template.adminNav.events({

	'click .back-link': function(evt) {
		evt.preventDefault();
		history.back();
	}
})

Template.adminNavItems.events({

	'click .admin-nav': function(evt) {
		evt.preventDefault();
		var target = $(evt.currentTarget).attr('href');
		Router.go(target)
	}
})

Template.adminNavItems.created = function(){
	this.subscribe('studentAssessments');
	this.subscribe('bug_reports');
	this.subscribe('contact_form');
}

Template.adminNavItems.helpers({
	'unmarkedCount':function(){
		var count = studentAssessments.find({"pass" : null, "completeDate" : {$ne : null}, "userRole" : {$ne : "tutor"}}).count();
		if(count == 0) {return false};
		return count;
	},
	'unmarkedCountContactForm':function(){
		var count = contact_form.find({"status" : "New"}).count();
		if(count == 0) {return false};
		return count;
	},
	'unmarkedCountBug':function(){
		var count = bug_reports.find({"status" : "New"}).count();
		if(count == 0) {return false};
		return count;
	},
})