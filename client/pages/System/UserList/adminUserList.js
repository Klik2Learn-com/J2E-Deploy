Template.adminUserList.created = function () {
	this.subscribe("organisations");
};

Template.adminUserList.helpers({
	// orgName: function (organisation) {
	// 	console.log('organisation ' + organisation);
	// 	var orgNames = "";
	// 	var showAll = Session.get('showAllUsers');
	// 	if (!showAll) {
	// 		organisation.forEach(function (orgId) {
	// 			conole.log(organisations.findOne({ _id: orgId }));
	// 			orgNames += (organisations.findOne({ _id: orgId }).name);
	// 			orgNames += ", ";
	// 		});

	// 		orgNames = orgNames.substring(0, orgNames.length - 2);
	// 	}
	// 	return orgNames;
	// },

	orgName: function (organisation) {
		var orgNames = "";
		//for (let orgId of organisation) {
		organisation.forEach(function(orgId){
			orgNames += (organisations.findOne({ _id: orgId }).name);
			orgNames += ", ";
		});
		// 	orgNames += (organisations.findOne({ _id: orgId }).name);
		// 	orgNames += ", ";
		// }

		orgNames = orgNames.substring(0, orgNames.length - 2);

		return orgNames;
	},


	/**
	 * Used for the "Streamline User List" task
	 */
	organisationsDrop: function () {
		var orgs = organisations.find({});
		return orgs;
	},

	/* Not Used
		trial: function(){
			var UId = Meteor.userId();
			var userOrg = Meteor.users.findOne({_id: UId}).organisation;
			var trialOrg = organisations.findOne({name: "Trial"})._id;
	
			if (userOrg == trialOrg){
				return false;
			} else {
				return true;
			}
	
		},
	*/


	// Returns all the users this user is authorised to see.
	users: function () {
		var selectedOrg = Session.get('selectedOrgValue');
		var showAll = Session.get('showAllUsers');
		var tFV = Session.get('textFieldValue');
		var loggedUserId = Meteor.userId();
		//var results = [];
		var start = Session.get("results-start") || 0;
		var end = Session.get("results-end") || Session.get("page-limit") || 10;
		var limit = end - start;
		//var usersLength = 0;

		// var trialOrg = organisations.findOne({name: "Trial"})._id;
		if (tFV === undefined || tFV == "") {
			if (Roles.userIsInRole(loggedUserId, 'tutor') || showAll) {
				results = Meteor.users.find({}, { skip: start, limit: limit });
				usersLength = Meteor.users.find({}).count();
			} else {
				results = Meteor.users.find({organisation: {$in: [selectedOrg]}}, {skip: start, limit: limit});
				usersLength = Meteor.users.find({organisation: {$in: [selectedOrg]}}).count();
				Session.set('usersInOrg', usersLength);
			}
		} else {
			var org = organisations.find({ name: { $regex: tFV, $options: "i" } }).map(function (u) { return u._id; });
			tFV.trim();
			var tFVName = tFV.split(" ");
			if (org == null || org == undefined) {
				if (tFVName.length < 2) {
					results = Meteor.users.find({ $or: [{ "username": { $regex: tFV, $options: "i" } }, {"emails": { $elemMatch: { address: { $regex: tFV, $options: "i" } } }},
					{ "profile.firstname": { $regex: tFV, $options: "i" } }, { "profile.surname": { $regex: tFV, $options: "i" } }] }, { skip: start, limit: limit});
					usersLength = Meteor.users.find({ $or: [{ "username": { $regex: tFV, $options: "i" } },{ "profile.firstname": { $regex: tFV, $options: "i" } }, { "profile.surname": { $regex: tFV, $options: "i" } }] }).count();
				} else {
					results = Meteor.users.find({ $or: [{ "username": { $regex: tFV, $options: "i" } }, { "profile.firstname": { $regex: tFV, $options: "i" } }, { "profile.surname": { $regex: tFV, $options: "i" } }, 
					{"emails": { $elemMatch: { address: { $regex: tFV, $options: "i" } } }},
					{ $and: [{ "username": { $regex: tFVName[0], $options: "i" } },{"emails": { $elemMatch: { address: { $regex: tFVName[0], $options: "i" } } }}, { "profile.firstname": { $regex: tFVName[0], $options: "i" } }, { "profile.surname": { $regex: tFVName[1], $options: "i" } }] }] }, { skip: start, limit: limit });
					usersLength = Meteor.users.find({ $or: [{ "username": { $regex: tFV, $options: "i" } }, {"emails": { $elemMatch: { address: { $regex: tFV, $options: "i" } } }},{ "profile.firstname": { $regex: tFV, $options: "i" } }, { "profile.surname": { $regex: tFV, $options: "i" } }, 
					{ $and: [{ "username": { $regex: tFVName[0], $options: "i" } }, {"emails": { $elemMatch: { address: { $regex: tFVName[0], $options: "i" } } }},{ "profile.firstname": { $regex: tFVName[0], $options: "i" } }, { "profile.surname": { $regex: tFVName[1], $options: "i" } }] }] }).count();
				}
			} else {
				if (tFVName.length < 2) {
					results = Meteor.users.find({ $or: [{ "username": { $regex: tFV, $options: "i" } }, {"emails": { $elemMatch: { address: { $regex: tFV, $options: "i" } } }}, { "profile.firstname": { $regex: tFV, $options: "i" } }, { "profile.surname": { $regex: tFV, $options: "i" } }, { organisation: { $in: org } }] } , {skip: start, limit: limit});
					usersLength = Meteor.users.find({ $or: [{ "username": { $regex: tFV, $options: "i" } }, {"emails": { $elemMatch: { address: { $regex: tFV, $options: "i" } } }}, { "profile.firstname": { $regex: tFV, $options: "i" } }, { "profile.surname": { $regex: tFV, $options: "i" } }, { organisation: { $in: org } }] }).count();
				} else {
					results = Meteor.users.find({ $or: [{ "username": { $regex: tFV, $options: "i" } }, {"emails": { $elemMatch: { address: { $regex: tFV, $options: "i" } } }}, { "profile.firstname": { $regex: tFV, $options: "i" } }, { "profile.surname": { $regex: tFV, $options: "i" } }, { organisation: { $in: org } }, { $and: [{ "profile.firstname": { $regex: tFVName[0], $options: "i" } }, { "profile.surname": { $regex: tFVName[1], $options: "i" } }] }] }, {skip: start, limit: limit});
					usersLength = Meteor.users.find({ $or: [{ "username": { $regex: tFV, $options: "i" } }, {"emails": { $elemMatch: { address: { $regex: tFV, $options: "i" } } }}, { "profile.firstname": { $regex: tFV, $options: "i" } }, { "profile.surname": { $regex: tFV, $options: "i" } }, { organisation: { $in: org } }, { $and: [{ "profile.firstname": { $regex: tFVName[0], $options: "i" } }, { "profile.surname": { $regex: tFVName[1], $options: "i" } }] }] }).count();

				}
			}
		}

		Session.set("num", usersLength);
		if(Session.get("finishedInitialLoad") != "true"){
			setUpPageLimit();
		}
		Session.set("finishedInitialLoad", "true");
		return results;

	},

	//Returns all users who are currently online.
	online: function (id) {
		if (Meteor.users.findOne({ _id: id, "status.online": true })) {
			return "online fas fa-circle";
		} else {
			return "offline far fa-circle";
		}
	},

	//Returns the count of all users who are currently online.
	onlineCount: function () {
		return Meteor.users.find({ "status.online": true }).count();
	},
	//Returns a labelclass for online users status
	labelClass: function () {
		if (this.status.idle)
			return "label-warning"
		else if (this.status.online)
			return "label-success"
		else
			return "label-default"
	},
	// Returns all the users this user in Trial is authorised to see.
	usersTrial: function () {
		var tFV = Session.get('textFieldValue');
		var trialOrg = organisations.findOne({ name: "Trial" })._id;
		if (tFV === undefined || tFV == "") {
			return Meteor.users.find({ organisation: { $in: trialOrg } });
		}
		objFirstName = {};
		// objFirstName["profile.firstname"] =  tFV;
		objSurname = {};
		// objSurname["profile.surname"] =  tFV;

		return Meteor.users.find({ $or: [{ "profile.firstname": { $regex: tFV, $options: "i" } }, { "profile.surname": { $regex: tFV, $options: "i" } }] });

	},
	userCount: function () {
		return Meteor.users.find({}).count();
	},

	ifCurrentUser: function (checkId) {
		return checkId === Meteor.userId();
	},

	disableIfAdmin: function (userId) {
		if (Meteor.userId() === userId) {
			return Roles.userIsInRole(userId, 'admin') ? "disabled" : "";
		}
	},

	selected: function (v1, v2) {
		return v1 === v2 ? true : false;
	},

	expiryDate: function () {
		if (this.expiry == undefined) {
			return "No expiry date";
		}

		var date = new Date(this.expiry);

		var day = (date.getUTCDate() < 10 ? '0' : '') + date.getUTCDate();
		var month = ((date.getUTCMonth() + 1) < 10 ? '0' : '') + (date.getUTCMonth() + 1); //months from 1-12
		var year = date.getUTCFullYear();
		var hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
		var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

		var formattedDate = year + "/" + month + "/" + day + " " + hours + ":" + minutes;
		return formattedDate;
	},

	expiredStyle: function () {
		var expiry = this.expiry;
		var expiryDate = new Date(this.expiry);
		var today = new Date();

		if (expiryDate < today && expiry != null) {
			return 'color:red; font-weight: bold;';
		}
	},

	showOrgUsers: function(){
		var selectedOrg = Session.get('selectedOrgValue');
		if(selectedOrg != null && selectedOrg != undefined && selectedOrg != '')
			return true;
		else
			return false;
	},

	selectedOrg: function(){
		return getOrgNameById(Session.get('selectedOrgValue'));
	},

	numUsers: function(){
		return Session.get('usersInOrg');
	}

});

Template.adminUserList.events({
	'click .user-pagination': function (evt) {
		evt.preventDefault();
		//Change between pages...
		var page = $(evt.currentTarget).data("page");
		var pageLimit = $("#user-per-page-select").val(); 
		//Set session variables for start and end of array indexes and current page number
		//So that the correct array of documents can be returned
		Session.set("curr-page", page);
		Session.set("results-start", (page - 1) * pageLimit);
		Session.set("results-end", page * pageLimit);

	},

	'change #user-per-page-select': function (evt) {
		evt.preventDefault();
		Session.set("curr-page", 1);
		Session.set("finishedInitialLoad", "false");
	},

	'click tr > td[data-function="goUserPage"]': function (evt) {
		Router.go('/user/' + this._id);
	},

	'change [name="userRole"]': function (evt) {
		var role = $(event.target).find('option:selected').val();

		Meteor.call("setRoleOnUser", {
			user: this._id,
			role: role
		}, function (error, response) {
			if (error) {
				Bert.alert(error.reason, "warning");
			}
		});
	},

	'click .deleteMulti': function (evt) {
		if (!confirm('Are you sure you want to delete the selected users?')) return;
		var counter = 0;
		var setUpDeletion = new Promise(function(resolve, reject){
			var i = $("input:checkbox[name=userlistCheckbox]:checked").size();
			$("input:checkbox[name=userlistCheckbox]:checked").each(function () {
				userId = $(this).val();
				Meteor.call('removeUser', userId, function (error, response) {
					if (error) {
						Bert.alert(error.toString(), "danger", 'growl-top-right');
					}else{
						counter++;
						if(counter >= i){
							resolve();
						}
					}
				});
			});
		});
		//this is the code that sets the currentPage to one lower if all users have been removed from the current page
		setUpDeletion.then(function(){
			if(counter > 0){
				var pageLimit = $("#user-per-page-select").val(); 
				var currentPage = Session.get("curr-page");
				var usersNum = Session.get("num") - counter;
				if((pageLimit * currentPage - pageLimit) >= usersNum){
					if(currentPage != 1)
						Session.set("curr-page", currentPage - 1);
				}
				Session.set("finishedInitialLoad", "false");
			}
		});
	},

	'click .editMulti': function (evt) {
		var userList = new Array();
		$("input:checkbox[name=userlistCheckbox]:checked").each(function () {
			userId = $(this).val();
			userList.push(userId);
		});
		window.location.href = "/admin/user/" + userList;
	},

	'click .delete': function (evt) {
		if (!confirm('Are you sure you want to delete this user?')) return;
		userId = this._id;
		Meteor.call('removeUser', userId, function (error, response) {
			if (error) {
				Bert.alert(error.toString(), "danger", 'growl-top-right');
			} else {
				Bert.alert('User deleted', 'success', 'growl-top-right');
				//this is the code that sets the currentPage to one lower if all users have been removed from the current page
				var pageLimit = $("#user-per-page-select").val(); 
				var currentPage = Session.get("curr-page");
				var usersNum = Session.get("num") -1;
				if((pageLimit * currentPage - pageLimit) >= usersNum){
					if(currentPage != 1)
						Session.set("curr-page", currentPage - 1);
				}
				Session.set("finishedInitialLoad", "false");
			}
		});
	},

	'keypress #userSearch': function (evt) {
		if (evt.which === 13) {
			Session.set("curr-page", 1);
			Session.set("finishedInitialLoad", "false");
			Session.set('selectedOrgValue', '');
			Session.set('textFieldValue', $("#userSearch").val());
			$('#adminUserListTable').removeClass('hidden');
			$('.hidden-with-user-table').removeClass('hidden');
			$("#organisation-select").val("defaultVal");
			Session.set('showAllUsers', false);
		}
	},

	'click .userSearchButton': function (evt) {
		Session.set("finishedInitialLoad", "false");
		Session.set('selectedOrgValue', '');
		Session.set("curr-page", 1);
		Session.set('textFieldValue', $("#userSearch").val());
		$('#adminUserListTable').removeClass('hidden');
		$('.hidden-with-user-table').removeClass('hidden');
		$("#organisation-select").val("defaultVal");
		Session.set('showAllUsers', false);
	},

	'click .tablesorter-headerRow': function (evt) {
		$("#adminUserListTable").trigger("update");
		$("#adminUserListTable").trigger("appendCache");
	},


	'change #organisation-select': function (evt) {
		Session.set("curr-page", 1);
		$("#userSearch").val("");
		Session.set('textFieldValue', "");
		$('#doc_title').val("");
		$('#adminUserListTable').removeClass('hidden');
		$('.hidden-with-user-table').removeClass('hidden');
		Session.set("finishedInitialLoad", "false");
		Session.set('selectedOrgValue', $(evt.currentTarget).val());
		Session.set('showAllUsers', false);
	},

	'click #showAllUsers': function (evt) {
		Session.set("curr-page", 1);
		$("#userSearch").val(""); 
		Session.set('textFieldValue', ""); 
		$('#doc_title').val("");
		$("#organisation-select").val("defaultVal");
		$('#adminUserListTable').removeClass('hidden');
		$('.hidden-with-user-table').removeClass('hidden');
		Session.set("finishedInitialLoad", "false");
		Session.set('showAllUsers', true);
		Session.set('selectedOrgValue', "");
	}
});

Template.adminUserList.rendered = function () {

	Session.set('selectedOrgValue', "");
	Session.set('textFieldValue', "");
	Session.set('showAllUsers', false);
	Session.set("finishedInitialLoad", "false");

	document.title = "Users - Journey 2 English";

	if (Roles.userIsInRole(Meteor.userId(), 'tutor')) {
		$('#adminUserListTable').removeClass('hidden');
		$('.hidden-with-user-table').removeClass('hidden');
		Session.set('showAllUsers', true);
	}

	$("#adminUserListTable").tablesorter(
		{
			headers: { 8: { sorter: false }, 9: { sorter: false }, 10: { sorter: false } }
		}
	);

	//$("#user-per-page-select").trigger('change');
	//setUpPageLimit();

};

var setUpPageLimit = function () {

	var pageLimit = $("#user-per-page-select").val();

	Session.set("page-limit", pageLimit);

	var page = Session.get("curr-page");

	Session.set("results-start", (page - 1) * pageLimit);
	Session.set("results-end", page * pageLimit);

	//Calculate the number of pages needed for the current users per page limit
	var pages = parseInt(Session.get("num")) / pageLimit;
	if (pages - Math.floor(pages) > 0) {
		pages = Math.floor(pages) + 1;
	}

	var pagesHTML = "";
	var pagesContainer = $("#pages-buttons-container");

	//Add buttons for each page needed
	for (var i = 1; i <= pages; i++) {
		pagesHTML += '<button class="user-pagination" data-page="' + i + '">' + i + '</button>';
	}
	$(pagesContainer).html(pagesHTML);

}