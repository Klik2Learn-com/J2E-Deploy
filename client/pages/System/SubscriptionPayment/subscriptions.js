/**
*   @Template : Subscription
*   @summary: - This processes subscriptiuon info from settings.json 
*				processes voucher info from settings.json 
*				Initalises the stripe payment gateway
* 
* 	For help contact Boundary Creative
**/

Template.subscriptionOptions.rendered = function () {
	activeVoucher = '';
	Session.set("appliedVoucher", '');
	getAllPackages();

}

Template.subscriptionOptions.created = function () {
	this.subscribe('User');
}


Template.subscriptionOptions.helpers({

	'registered': function () {

		if (!Meteor.userId()) {
			return 'hidden';
		}
	}

});





// PACKAGES
// Loops through packages returning html for template	
function getAllPackages() {

	Meteor.call('methodPackagesCollection', function (err, data) {

		if (err) {

		} else {

			var packageList = data;
			var packageCount = packageList.length;
			var subscriptionData = "<ul id='subscriptionList'>";

			for (var i = 0; i < packageCount; i++) {
				var packageData = returnPackageDetails(packageList[i]);

				console.log("PACKAGE DATA:");
				console.log(packageData);

				if (packageData.planType == "monthly") {
					if (packageData.discountedCost !== false && packageData.discountedCost.length > 0) {
						//DISCOUNT APPLIED WITH VOUCHER
						var packageCost = (packageData.cost / 100).toFixed(2);
						var discountedCost = packageData.discountedCost / 100;
						packagefeatureText = '';
						if (packageData.planFeatureClass.length > 1) {
							packagefeatureText = '<span class="">' + packageData.planFeatureText + '</span>';
						}
						subscriptionData += '<li class="packageSub ' + packageData.planType + ' ' + packageData.planFeatureClass + '"  >';
						subscriptionData += '<div class="packageFeature">' + packagefeatureText + '</div>';
						subscriptionData += '<div class="packageWrapper discounted ' + packageData.planFeatureClass + '"><span class="packageName">' + packageData.name + '</span> <span class="original">Was <del> &pound;' + packageCost + '</del></span><br/><span class="cost-per-month"><span class="pound">&pound;</span>' + discountedCost + '</span><span class="purchasePackage" data-plan="' + packageData.planId + '">Buy</span></div>';
						subscriptionData += '</li>';
					} else {
						//REGULAR PAYMENT PLAN
						var packageCost = (packageData.cost / 100).toFixed(2);
						var packageCostMonthly = (packageData.costMonthly / 100).toFixed(2);

						packagefeatureText = '';

						if (packageData.planFeatureClass.length > 1) {
							packagefeatureText = '<span class="">' + packageData.planFeatureText + '</span>';
						}

						subscriptionData += '<li class="packageSub ' + packageData.planType + ' ' + packageData.planFeatureClass + '"  >';
						subscriptionData += '<div class="packageFeature">' + packagefeatureText + '</div>';
						subscriptionData += '<div class="packageWrapper ' + packageData.planFeatureClass + '"><span class="packageName">' + packageData.name + '</span> <span class="cost-per-month"><span class="pound">&pound;</span>' + packageCostMonthly + '<span class="per-month">/month</span></span><span class="packageCost"><b>&pound;' + packageCost + '</b> ' + packageData.monthlyDesc + '</span><span class="purchasePackage" data-plan="' + packageData.planId + '">Buy</span></div>';
						subscriptionData += '</li>';
					}
				} else if (packageData.planType == "daily") {
					if (packageData.discountedCost !== false && packageData.discountedCost.length > 0) {
						//DISCOUNT APPLIED WITH VOUCHER
						var packageCost = (packageData.cost / 100).toFixed(2);
						var discountedCost = packageData.discountedCost / 100;
						packagefeatureText = '';
						if (packageData.planFeatureClass.length > 1) {
							packagefeatureText = '<span class="">' + packageData.planFeatureText + '</span>';
						}
						subscriptionData += '<li class="packageSub ' + packageData.planType + ' ' + packageData.planFeatureClass + '"  >';
						subscriptionData += '<div class="packageFeature">' + packagefeatureText + '</div>';
						subscriptionData += '<div class="packageWrapper discounted ' + packageData.planFeatureClass + '"><span class="packageName">' + packageData.name + '</span> <span class="original">Was <del> &pound;' + packageCost + '</del></span><br/><span class="cost-per-month"><span class="pound">&pound;</span>' + discountedCost + '</span><span class="purchasePackage" data-plan="' + packageData.planId + '">Buy</span></div>';
						subscriptionData += '</li>';
					} else {
						//REGULAR PAYMENT PLAN
						var packageCost = (packageData.cost / 100).toFixed(2);
						var packageCostMonthly = (packageData.costMonthly / 100).toFixed(2);

						packagefeatureText = '';

						if (packageData.planFeatureClass.length > 1) {
							packagefeatureText = '<span class="">' + packageData.planFeatureText + '</span>';
						}

						subscriptionData += '<li class="packageSub ' + packageData.planType + ' ' + packageData.planFeatureClass + '"  >';
						subscriptionData += '<div class="packageFeature">' + packagefeatureText + '</div>';
						subscriptionData += '<div class="packageWrapper ' + packageData.planFeatureClass + '"><span class="packageName">' + packageData.name + '</span> <span class="cost-per-month"><span class="pound">&pound;</span>' + packageCostMonthly + '<span class="per-month">/day</span></span><span class="packageCost"><b>&pound;' + packageCost + '</b> ' + packageData.monthlyDesc + '</span><span class="purchasePackage" data-plan="' + packageData.planId + '">Buy</span></div>';
						subscriptionData += '</li>';
					}
				} else if (packageData.planType == "trial") {
					//TRIAL PAYMENT PLAN
					packageCount = 1;
					//DISCOUNT APPLIED WITH VOUCHER
					var packageCost = packageData.cost;
					var discountedCost = packageData.discountedCost / 100;
					packagefeatureText = '';
					// if (packageData.planFeatureClass.length > 1){
					// 	packagefeatureText = '<span class="">'+packageData.planFeatureText+'</span>';
					// }
					subscriptionData += '<li class="packageSub monthly ' + packageData.planFeatureClass + '"  >';
					subscriptionData += '<div class="packageFeature">' + packagefeatureText + '</div>';
					subscriptionData += '<div class="packageWrapper discounted ' + packageData.planFeatureClass + '"><span class="packageName">' + packageData.name + '</span> </span><span class="purchasePackage purchaseEST" data-plan="' + packageData.planId + '">Start Trial</span></div>';
					subscriptionData += '</li>';
				} else if (packageData.planType == "Assessment") {
					//TRIAL PAYMENT PLAN
					packageCount = 1;
					//DISCOUNT APPLIED WITH VOUCHER
					var packageCost = packageData.cost;
					var discountedCost = packageData.discountedCost / 100;
					packagefeatureText = '';
					// if (packageData.planFeatureClass.length > 1){
					// 	packagefeatureText = '<span class="">'+packageData.planFeatureText+'</span>';
					// }
					subscriptionData += '<li class="packageSub monthly ' + packageData.planFeatureClass + '"  >';
					subscriptionData += '<div class="packageFeature">' + packagefeatureText + '</div>';
					subscriptionData += '<div class="packageWrapper discounted ' + packageData.planFeatureClass + '"><span class="packageName">' + packageData.name + '</span> </span><span class="purchasePackage purchaseEST" data-plan="' + packageData.planId + '">Sign up for <i>Engish Skills Test</i></span></div>';
					subscriptionData += '</li>';
				}
			}
			subscriptionData += "</ul>";

			$('#subscriptionBlocksOptions').html(subscriptionData);
			$('#subscriptionList .daily').hide();
		}

	});
}



// Package - Applying Discount
// Returning the package with the discount added.
function returnPackageDetails(packageArray) {
	packageArray.discountedCost = false;

	if (typeof Session.get("appliedVoucher") !== 'undefined' && Session.get("appliedVoucher").length === 1) {

		activeVoucher = Session.get("appliedVoucher");
		var applyVoucher = true;

		if (activeVoucher[0].applyPlans.length > 0) {
			applyVoucher = false;

			activeVoucher[0].applyPlans.forEach(function (planID) {
				if (planID === packageArray.planId) {
					applyVoucher = true;
				}
			});

		}

		if (applyVoucher === true) {
			// Voucher Rules Start
			if (activeVoucher[0].discountType === "percent") {
				displayPackageDiscount = 0.01 * activeVoucher[0].discount * packageArray.cost;
				packageArray.discountedCost = (packageArray.cost - displayPackageDiscount).toFixed(0);
			}

			if (activeVoucher[0].discountType === "trial") {
				packageArray.planTimeAmount = 14;
				packageArray.planType = "trial";
				packageArray.cost = 0;
				packageArray.name = "14 day Trial";

			}

			//Assessment Only
			if (activeVoucher[0].discountType === "Assessment") {
				packageArray.planTimeAmount = 30;
				packageArray.planType = "Assessment";
				packageArray.cost = 0;
				packageArray.name = "English Skills Test";

			}

		}

	}

	return packageArray;
}





// Click listeners 
// For apply voucher code and for selecting of packages
Template.subscriptionOptions.events({
//THIS CODE IS NOT USED
/*
	'click .purchasePackage': function (evt) {

		if (!Meteor.userId() && (Session.get("appliedVoucher")[0] == null || Session.get("appliedVoucher")[0].uId == null || Session.get("appliedVoucher")[0].uId == 'undefined')) {
			
			var selectedPlanId = $(evt.currentTarget).data('plan');
			Session.set("selectedPlanId", selectedPlanId);
			Router.go("/Register");

		} else {

			var selectedPlanId = $(evt.currentTarget).data('plan');

			Meteor.call('methodSinglePackage', selectedPlanId, function (error, response) {

				// HANDLE ERROR!!!
				selectedPackage = returnPackageDetails(response[0])
				voucherArray = Session.get("appliedVoucher");
				//console.log(voucherArray);
				var cost = selectedPackage.cost;

				var planType = selectedPackage.planType;
				var planTimeAmount = selectedPackage.planTimeAmount;

				if (typeof selectedPackage.discountedCost !== 'undefined' && selectedPackage.discountedCost.length > 0) {
					cost = selectedPackage.discountedCost;
				}

				if (typeof planType !== 'undefined') {

					var testPublishableKey = Meteor.settings.public.testPublishableKey;
					var livePublishableKey = Meteor.settings.public.livePublishableKey;

					if (cost > 0) {
						StripeCheckout.open({
							key: livePublishableKey,
							amount: cost,
							name: 'Journey 2 English Course',
							currency: "gbp",
							description: selectedPackage.name,
							panelLabel: 'Buy Now',
							token: function (res) {
								stripeToken = res.id;
								Session.set("appliedVoucher", '');
								Meteor.call('chargeCard', stripeToken, cost, planType, planTimeAmount, voucherArray, function (error, response) {
									if (response === 'error') {
										$('.stripeOutput').text('<div class="error">Sorry, there has been an error processing your card. You have not been charged.</div>');
									} else {

										Bert.alert('<h4 class="center">Well done you are ready to start.</h4>', 'success', 'fixed-top', 'fa-check');
									}
								});
							}
						});
					} else {
						if(voucherArray[0].uId != null){
							if(Meteor.userId() != null && Meteor.userId() != 'undefined' && Meteor.userId() == voucherArray[0].uId){
								//The voucher is for the user that is logged in so continue proccessing it.
								Meteor.call('processVoucher', cost, planType, planTimeAmount, voucherArray, function (error, response) {});
							}else{
								//There is no logged in user or the user is different, so ask for correct login before using this voucher
								alert("Please log in to the account that this voucher is intended for before using it");
							}
						}else{
							Meteor.call('processVoucher', cost, planType, planTimeAmount, voucherArray, function (error, response) {});
							Bert.alert('<h4 class="center">Well done you are ready to start.</h4>', 'success', 'fixed-top', 'fa-check');
						}
						

					}


				}
			});
		}
	},
*/
	'click #applyVoucher': function (evt) {
		var submittedCode = $('#voucher').val();

		if (submittedCode.length > 0) {

			Meteor.call('redeemVoucher', submittedCode, function (error, response) {

				//var applyVoucherResponse = redeemVoucher(submittedCode,'');

				if (error) {
					Session.set("appliedVoucher", '');
					var voucherOutput = $('.voucherOutput').html('<span class="error">Sorry, no voucher found for that code.</span>');
				} else {
					Session.set("appliedVoucher", response);
					var voucherOutput = $('.voucherOutput').html('<span class="applied">Your voucher has been accepted, please choose a plan above.</span>');
				}
				getAllPackages();
			});
		}// @ if
	},

	'keypress input#voucher': function (evt, template) {
		if (evt.which === 13) {
			$('#applyVoucher').click();
			// add to database
		}
	},

	'click #checkboxMonths': function (evt) {
		$('#subscriptionList .daily').hide();
		$('#subscriptionList .monthly').show();
	},
	'click #checkboxDaily': function (evt) {
		$('#subscriptionList .daily').show();
		$('#subscriptionList .monthly').hide();
	}


});

