Meteor.methods({
	'createNewOrg': function (orgName) {
		if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
			try {
				var doc = organisations.insert({ name: orgName });
				var orgId = organisations.findOne({ name: orgName })._id;
				Meteor.call("UpdateForum", "organisation", { organisation: orgId }, function (err) {
					if (err) {
						throw new Meteor.Error(err);
						//Do something
					}
				});
				return doc;
			} catch (err) {
				if (err.code == 11000) {
					throw new Meteor.Error('An organisation with the name  ' + orgName + ' already exists. Please enter a different value.');
				} else {
					throw new Meteor.Error(err.message);
				}
			}
		}
		else {
			throw new Meteor.Error(500, 'You\'re not authorised.');
		}
	},

	'editOrganisationName': function (orgId, newTitle, uID) {
		if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
			organisations.update({ _id: orgId }, { $set: { name: newTitle } });
		}
		else {
			throw new Meteor.Error(500, 'You\'re not authorised.');
		}
	},

	'deleteOrganisation': function (orgId, uID) {
		if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
			organisations.remove({ _id: orgId });
			groups.update({ organisation: orgId }, { $set: { organisation: "" } });
			Meteor.call("UpdateForum", "organisationDelete", { organisation: orgId }, function (err) {
				if (err) throw new Meteor.Error(err);
			})
		}
		else {
			throw new Meteor.Error(500, 'You\'re not authorised.');
		}
	},

	'changeOrganisationOfAUser': function (orgId, userId) {
		if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
			if (Roles.userIsInRole(Meteor.userId(), 'moderator')) {
				Meteor.users.update({ _id: userId }, { $addToSet: { organisation: [orgId] } });
			} else {
				Meteor.users.update({ _id: userId }, { $set: { organisation: [orgId] } });
			}
		}
		else {
			throw new Meteor.Error(500, 'You\'re not authorised.');
		}
	},

	'removeOrganisationFromUser': function(orgId, userId){
		return Meteor.users.update({ _id: userId}, { $pull: { organisation: orgId}});
	},

	'addOrganisationToUser': function(orgId, userId){
		return Meteor.users.update({ _id: userId }, { $addToSet: { organisation: orgId } });
	},

	'changeOrganisationLogoAlt': function (orgId, orgLogoAlt) {
		return organisations.update({ _id: orgId }, { $set: { logoAlt: orgLogoAlt } });
	},

	'getOrgIdByName': function(orgName){
		return organisations.findOne({"name": orgName})._id;
	}
});
