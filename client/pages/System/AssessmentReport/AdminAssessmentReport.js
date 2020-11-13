Template.adminAssessmentReport.rendered = function() {
	
	document.title = "Assessments - Journey 2 English";



}

Template.adminAssessmentReport.created = function(){
	this.subscribe("organisations");
};

Template.adminAssessmentReport.helpers({

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
	'reading': function(){
		var st = studentAssessments.findOne({userId: this._id}).sections[0];
		if (st.pass) {
			return st.pass;
		} else if (st.pass == null) {
			return "Not Completed"
		}
	},

	'listening': function(){
		var st = studentAssessments.findOne({userId: this._id}).sections[1];
		if (st.pass) {
			return st.pass;
		} else if (st.pass == null) {
			return "Not Completed"
		}
	},

	'writing': function(){
		var st = studentAssessments.findOne({userId: this._id}).sections[2];
		if (st.pass) {
			return st.pass;
		} else if (st.pass == null) {
			return "Not Completed"
		}
	},

	'speaking': function(){
		var st = studentAssessments.findOne({userId: this._id}).sections[3];
		if (st.pass) {
			return st.pass;
		} else if (st.pass == null) {
			return "Not Completed"
		}
	},

	passOrFail: function() {
		var st = studentAssessments.findOne({userId: this._id});
		if (st.pass) {
			return st.pass;
		} else if (st.pass == null) {
			return "Not Completed"
		}
	},

	completed:function(){
		var completed = studentAssessments.findOne({userId: this._id});
		if (completed.completeDate != null){
			return true;
		}
	},

	dateStart: function(){
		var start = studentAssessments.findOne({userId: this._id});
		if (start.startDate){
			// var date = formatDate(completed.completeDate);
			return start.startDate;
		} else if (start.startDate == null){
			return "Not started";
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
		if(typeof organisations.findOne({_id: orgId}) == "undefined")
			return "";
		else
			return organisations.findOne({_id: orgId}).name;
	},

});

Template.adminAssessmentReport.events({
	
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
	},

	'click .download-multi': function(evt){
		evt.preventDefault();
		
		//var zip = new JSZip();
		var downloads = {};
		var index = 0;
		var reports = {};
		Session.set("reports-index", 0);

		$("input:checkbox[name=assessmentlistCheckbox]:checked").each(function(){
			reports[index] = this;
			index++;
			
			downloads[index] = setTimeout(function(){
				var userId = $(reports[Session.get("reports-index")]).val();
				Session.set("reports-index", (Session.get("reports-index") + 1));
				assessmentReport = {};
				var user = Meteor.users.findOne({_id: userId});
				var orgs = user.organisation;
				var organisationId = null;
				if(user != null && user != 'undefined' && orgs != null && orgs != 'undefined')
					organisationId = orgs[0];
				var assessment = studentAssessments.findOne({userId: userId});
				var userProfile = Meteor.users.findOne({_id: userId}).profile;
				assessmentReport.organisation = organisations.findOne({_id: organisationId}).name;
				assessmentReport.user = userProfile.firstname + " " + userProfile.surname;
				assessmentReport.reading = assessment.sections[0];
				assessmentReport.writing = assessment.sections[1];
				assessmentReport.listening = assessment.sections[2];
				assessmentReport.speaking = assessment.sections[3];
				assessmentReport.completeDate = assessment.completeDate;
				assessmentReport.pass = assessment.pass;
	
				//zip.file(assessmentReport.user+" Assessment Report.pdf", createPDF(uaReportHtml(assessmentReport)).output());
				uaReportHtml(assessmentReport);
	
				setTimeout(function(){
					var report = $(".assessment-report")[0];
					createPDF(report, (assessmentReport.user + " Assessment Report.pdf"));

					// options = {
					// 	render: 'download',
					// 	pageWidth:'216mm', 
					// 	pageHeight:'279mm',
					// 	filename: 'Assessment Report',
					// };
					// return xepOnline.Formatter.Format(report,options);
				},400);
			}, (1000 * index));
		});
		
		// var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
		// saveAs(blob, "hello world.txt");
		
		// zip.generateAsync({ type: "blob" }).then(function (content) {
		// 	saveAs(content, "AssessmentReports.zip");
		// });
	}

});

Template.adminAssessmentReport.created = function() {
	this.subscribe('Users');
	this.subscribe('studentAssessments');
	this.subscribe('assessmentTypes');
	this.subscribe('organisations');
	this.subscribe('groups');
	Template.instance().assessmentTypeSearch = new ReactiveVar('initial-assessment');
	Template.instance().filterOrgs = new ReactiveVar();
	Template.instance().filterGroups = new ReactiveVar();
}

