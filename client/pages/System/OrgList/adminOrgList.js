Template.viewOrg.rendered = function () {

	document.title = "Organisations - Journey 2 English";

}

Template.viewOrg.helpers({

	organisationList: function () {
		return organisations.find({});
	},

	moderatorsList: function (orgId) {
		return Meteor.users.find({ organisation: { $elemMatch: {id: selectedOrganisation}}, roles: "moderator" });
	}

});

Template.viewOrg.created = function () {
	this.subscribe('organisations');
	//	this.subscribe('users');
}


Template.viewOrg.events({

	'click .mod-name': function (evt) {
		Router.go('/user/' + this._id)
	},

	'click tbody > tr > td > .org-name': function (evt) {
		Router.go('/admin/viewGroups#' + this._id)
	},

	'click .delete': function (e) {
		e.preventDefault();

		if (!confirm('Are you sure you want to delete this organisation? All groups will be unassigned from it.')) return;

		var orgId = $(e.target).parents('div').attr('data-id');

		Meteor.call('deleteOrganisation', orgId, Meteor.userId(), function (error) {
			if (!error) {
				Bert.alert('Organisation deleted', 'success', 'growl-top-right');
			} else {
				Bert.alert(error.toString(), 'danger', 'growl-top-right');
			}
		});
	},

	'click .edit_title_button': function (e) {
		if ($(e.target).siblings(".edit_title_form").hasClass('hidden')) {
			$(e.target).siblings(".edit_title_form").removeClass('hidden');
		} else {
			$(e.target).siblings(".edit_title_form").addClass('hidden');
		}
	},

	'click .edit_title_ok': function (e) {
		e.preventDefault();
		var orgId = $(e.target).siblings(".edit_title_input").attr('data-id');

		var newTitle = $(e.target).siblings(".edit_title_input").val();
		if (newTitle == "") return;

		$(e.target).parents('.edit_title_form').addClass('hidden');

		Meteor.call('editOrganisationName', orgId, newTitle, Meteor.userId(), function (error) {
			if (!error) {
				Bert.alert('Organisation name changed.', 'success', 'growl-top-right');
			} else {
				Bert.alert(error.toString(), 'danger', 'growl-top-right');
			}
		});
	},

	'change .add_logo_input': function (evt) {
		evt.preventDefault();
		var org_Id = this._id;
		$(".add_logo_input[data-id='" + org_Id + "']").addClass("hidden");
		$(".add_logo_status[data-id='" + org_Id + "']").removeClass("hidden");
		$(".add_logo_status[data-id='" + org_Id + "']").text($(".add_logo_input[data-id='" + org_Id + "']")[0].files[0].name);
	},

	'click .add_logo_ok': function (evt) {
		evt.preventDefault();
		var org_Id = this._id;
		var orgLogoAlt = $(".add_logo_alt_input[data-id='" + org_Id + "']")[0].value;
		var orgLogoFile = new FS.File($(".add_logo_input[data-id='" + org_Id + "']")[0].files[0]);
		var today = new Date();

		if (orgLogoAlt.length >= 1) {
			Meteor.call("changeOrganisationLogoAlt", org_Id, orgLogoAlt);
		}
		
		if (orgLogoFile == null || orgLogoFile == 'undefined') {
			return false;
		} else {
			Orglogos.insert(orgLogoFile, function (err, fileObj) {
				if (err) {
					console.log(err);
				} else {
					var imageLoc = "/cfs/files/Orglogos/" + fileObj._id;
					LogoURLs.insert({
						orgId: org_Id,
						logoSrc: imageLoc,
						date: today,
					});
					Bert.alert("Logo Update Successful", "success", "growl-top-right");
				}
			});
		}

		return false;
	},

	'click .add_logo_button': function (evt) {
		if ($(evt.target).siblings(".add_logo_form").hasClass('hidden')) {
			$(evt.target).siblings(".add_logo_form").removeClass('hidden');
		} else {
			$(evt.target).siblings(".add_logo_form").addClass('hidden');
		}
	}
});
