Template.adminAssessmentList.rendered = function() {
	
	document.title = "Assessments - Journey 2 English";
	
}

Template.adminAssessmentList.created = function(){
	this.subscribe("organisations");
};

Template.adminAssessmentList.helpers({

	'assessmentType': function() {
		return assessmentTypes.find({});
	},

	'assessment': function() {
		var assessmentTypeSearch = Template.instance().assessmentTypeSearch.get('assessmentTypeSearch');
		return studentAssessments.find({ type : assessmentTypeSearch }) 
	},
/* Not Used
	'criteriaCheck': function() {
		var user = Meteor.users.findOne({ _id : this.userId });
		if (Template.instance().filterOrgs.get() != undefined) {
			var filterOrgs = Template.instance().filterOrgs.get();
			if (Template.instance().filterGroups.get() != undefined) {
				var filterGroups = Template.instance().filterGroups.get();
				var returnValue = false;
				user.organisation.forEach(org => {
					if (filterOrgs.indexOf(org) > -1) {
						for (var i = 0; i < user.groups.length; i++) {
							if (filterGroups.indexOf(user.groups[i]) > -1) {
								returnValue = true;
								break;
							}
						}
					} 
				});
				return returnValue;
				
			} else {
				// Check this user is part of the checked organisation.
				var returnValue = false;
				user.organisation.forEach(org => {
					if (filterOrgs.indexOf(org) > -1){
						returnValue = true;
						break;
					}
				});
				return returnValue;
			}
		}
	},
*/
	'user': function() {
		return Meteor.users.findOne({ _id : this.userId})
		//return Meteor.users.findOne({ _id : this.userId, roles: {$ne: "tutor"}})
	},

	'groupDoc': function() {
		var docId = String(this);
		return groups.findOne({ _id : docId });
	},
/* Not Used
	'organisationDoc': function() {
		return organisations.findOne({ _id : this.organisation })
	},
*/
	passOrFail: function() {
		var st = studentAssessments.findOne({userId: this._id});
		if (st.pass) {
			return st.pass;
		} else if (st.pass == null) {
			return "Not Marked"
		}
	},

	completed:function(){
		var completed = studentAssessments.findOne({userId: this._id});
		if (completed.completeDate != null){
			return true;
		}
	},

	dateCompleted: function(){
		var completed = studentAssessments.findOne({userId: this._id});
		if (completed.completeDate){
			// var date = formatDate(completed.completeDate);
			return completed.completeDate;
		} else if (completed.completeDate == null){
			return "Not completed";
		}
	},


	organisations: function() {
		// Due to formatting this helper must return a list of rows
		var formattedArray = []; // The formatted array that will be returned
		var orgs = organisations.find({}).fetch();
		size = 4; // How many items in the row
		while (orgs.length > size) {
			formattedArray.push({ row: orgs.slice(0, size)});
			orgs = orgs.slice(size);
		}
        formattedArray.push({row: orgs});
	    return formattedArray;
	},

	groups: function() {
		// Due to formatting this helper must return a list of rows
		var filterOrgs = [];
		filterOrgs = Template.instance().filterOrgs.get();

		var formattedArray = []; // The formatted array that will be returned
		var findGroups = groups.find({ organisation: {$in : filterOrgs } }).fetch();
		size = 4; // How many items in the row
		while (findGroups.length > size) {
			formattedArray.push({ row: findGroups.slice(0, size)});
			findGroups = findGroups.slice(size);
		}
        formattedArray.push({row: findGroups});
	    return formattedArray;		
	},

	isOrgSelected: function() {
		if (Template.instance().filterOrgs.get() && Template.instance().filterOrgs.get().length > 0){
			return true;
		}
	},

	isCompleted: function() {
		if (this.completeDate == null) {
			return false;
		} else {
			return true;
		}
	},

	orgName: function(orgId) {
		return organisations.findOne({_id: orgId}).name;
	},

});

Template.adminAssessmentList.events({
	
	'change #assessmentSelector': function(evt) {
		Template.instance().assessmentTypeSearch.set($('#assessmentSelector').val());
	},

	'change #organisationSelector': function(evt) {
		Template.instance().selectedOrganisation.set($('#organisationSelector').val());
	},

	'click *[name="organisationCheckbox"]': function(evt) {
		var orgs = [];
		$('*[name="organisationCheckbox"]:checked').each(function() {
			orgs.push($(this).val());
		})
		Template.instance().filterOrgs.set(orgs);
	},

	'click *[name="groupCheckbox"]': function(evt) {
		var groups = [];
		$('*[name="groupCheckbox"]:checked').each(function() {
			groups.push($(this).val());
		})
		Template.instance().filterGroups.set(groups);
	},

	'click *[data-function="goUserPage"]': function(evt) {
		var assessmentId = $(evt.currentTarget).attr('data-target');
		var doc = studentAssessments.findOne({ _id : assessmentId })
		if (doc.completeDate != null) {
			Router.go('/assessmentreview/' + assessmentId);
		}
	}

});

Template.adminAssessmentList.created = function() {
	this.subscribe('Users');
	this.subscribe('studentAssessments');
	this.subscribe('assessmentTypes');
	this.subscribe('organisations');
	this.subscribe('groups');
	Template.instance().assessmentTypeSearch = new ReactiveVar('initial-assessment');
	Template.instance().filterOrgs = new ReactiveVar();
	Template.instance().filterGroups = new ReactiveVar();
}

