Meteor.methods({

	// PACKAGES
	// Loops through packages returning html for template	
	'methodPackagesCollection': function () {
		return payment_plans.find().fetch();
	},

	'methodSinglePackage': function (packageId) {
		return payment_plans.find({ planId: packageId }).fetch();
	},

	"redeemVoucher": function (submittedCode) {
		var selectedVouchers = vouchers.find({ code: submittedCode }).fetch();
		var usedVouchers = appliedVouchers.find({ code: submittedCode }).fetch();

		if (selectedVouchers.length < 1) {
			throw new Meteor.Error(500, 'Voucher not found or expired.');
		} else {
			if (selectedVouchers[0].active === true) {

				if (selectedVouchers[0].uId != null && selectedVouchers[0].uId != Meteor.userId()) {
					throw new Meteor.Error(500, 'Voucher not found or expired.');
				} else {
					if (selectedVouchers.length === 1) {

						if (selectedVouchers[0].limitedUsage === true) {

							if (usedVouchers.length < selectedVouchers[0].usageAmount) {
								return selectedVouchers;
							} else {
								throw new Meteor.Error(500, 'Voucher not found or expired.');
							}
						} else {
							return selectedVouchers;
						}
					} else {
						throw new Meteor.Error(500, 'Voucher not found or expired.');
					}
				}
			} else {
				throw new Meteor.Error(500, 'Voucher not found or expired.');
			}
		}
	}

});



