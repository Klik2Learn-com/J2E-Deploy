Template.adminVoucherList.rendered = function() {

	document.title = "Vouchers List - Journey 2 English";

}

Template.adminVoucherList.created = function() {
	this.subscribe('appliedVouchers');
	this.subscribe('vouchers');
}

Template.adminVoucherList.helpers({

	voucherList: function() {
		return vouchers.find({});
	},

	totalUse: function(codeUse){
		return appliedVouchers.find({code: codeUse}).count();
	}

});



Template.adminVoucherList.events({

	// 'click .mod-name': function(evt) {
	// 	Router.go('/user/' + this._id)
	// },
	//
	// 'click tbody > tr > td > .org-name': function(evt) {
	// 	Router.go('/admin/viewGroups#' + this._id)
	// },

	'click .delete': function(e) {
		e.preventDefault();

		if(!confirm('Are you sure you want to delete this voucher?'))return;

		var vId = $(e.target).parents('div').attr('data-id');

		Meteor.call('deleteVoucher', vId, function(error){
			if(!error){
				Bert.alert( 'Voucher deleted', 'success', 'growl-top-right' );
			}else {
				Bert.alert( error.toString() , 'danger', 'growl-top-right' );
			}
		});
	}
	//
	// 'click .edit_title_button' : function(e){
	// 	if($(e.target).siblings(".edit_title_form").hasClass('hidden')){
	// 		$(e.target).siblings(".edit_title_form").removeClass('hidden');
	// 	}else{
	// 		$(e.target).siblings(".edit_title_form").addClass('hidden');
	// 	}
	// },
	//
	// 'click .edit_title_ok' : function(e){
	// 	e.preventDefault();
	// 	var orgId = $(e.target).siblings(".edit_title_input").attr('data-id');
	//
	// 	var newTitle = $(e.target).siblings(".edit_title_input").val();
	// 	if (newTitle == "")return;
	//
	// 	$(e.target).parents('.edit_title_form').addClass('hidden');
	//
	// 	Meteor.call('editOrganisationName', orgId, newTitle, Meteor.userId(), function(error){
	// 		if(!error){
	// 			Bert.alert( 'Organisation name changed.', 'success', 'growl-top-right' );
	// 		}else {
	// 			Bert.alert( error.toString() , 'danger', 'growl-top-right' );
	// 		}
	// 	});
	// }

});
