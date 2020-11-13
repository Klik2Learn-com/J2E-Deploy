    /**
    *   @method:    chargeCard
    *   @summary:   - This method process the stripe payment. On success updates account to include newly purchased time. 
    *               
    *               
    *   @requires:  - stripeToken,cost,planType& planAmount - sent accross from client/system/subscriptionPayment/subscriptions.js              
    *
    *   @returns:   True if user successfully added. False if an error occurs.
    *  
    *   @notes:   	For help contact Boundary Creative
    */
    

Meteor.methods({
  /*
	'chargeCard': function(stripeToken,cost,planType,planAmount,voucherArray) {

	var testSecretKey =  Meteor.settings.private.testSecretKey;
	var liveSecretKey =  Meteor.settings.private.liveSecretKey;	  
	
	if (cost > 0){
		var Stripe = StripeAPI(liveSecretKey);
	    Stripe.charges.create({
	      amount: cost,
	      currency: 'gbp',
	      source: stripeToken
	    },Meteor.bindEnvironment(function(err, charge) {

	      if (err === null){  
			  stripeLog.insert({ status : 'succeeded', data: charge });
			  
			  Meteor.call('addTimeToAccount', planType,planAmount);
			  
			  	if (voucherArray !== null){
			  		Meteor.call('registerVoucher', voucherArray);
				}
			 return 'succeeded';	
			  		
	      }else{
		    	stripeLog.insert({ status : 'errors', data: err });
		    	var stripeOutput = $('.stripeOutput').html('<span class="error">Sorry there has been an error processing your card details. You have not been charged.</span>');	
		    	return 'error';
	      }
	    }));
	    
	    
		}
	
	},
	
	'processVoucher': function(cost,planType,planAmount,voucherArray) {

		Meteor.call('addTimeToAccount', planType,planAmount, voucherArray);
	
		if (voucherArray !== null){
			Meteor.call('registerVoucher', voucherArray);
		}
		return true;
	},

	'addTimeToAccount': function(planType,planAmount){
		var uId = Meteor.userId();	
		 
		// if (planType ==="monthly"){
			// console.log('user'+ uId +'months: '+planAmount);
			
			 if (planType === 'monthly'){
				
				// var dayWrapper = moment().add(planAmount,'months').calendar(); 
				// var expireDateNew = moment(dayWrapper).format("DD/MM/YYYY H:mm");
				var currentDate = new Date();
                var expireDateNew = new Date(currentDate.setTime( currentDate.getTime() + planAmount * 2629746000 ));
				

				
					
				Meteor.users.update({_id : uId}, {$set: { 'expiredSubscription': false,'expiry': expireDateNew,'authorisedCourses.journey2English' : true  } });
	
			 }
			 	
			 if (planType === 'daily' || planType === 'trial'){
				
				// var dayWrapper = moment().add(planAmount,'days').calendar(); 
				// var expireDateNew = moment(dayWrapper).format("DD/MM/YYYY H:mm");
				var currentDate = new Date();
                var expireDateNew = new Date(currentDate.setTime( currentDate.getTime() + planAmount * 86400000 ));
				
				
				Meteor.users.update({_id : uId}, {$set: { 'expiredSubscription': false,'expiry': expireDateNew,'authorisedCourses.journey2English' : true  } });
			
	
			 }	

			 if (planType === 'Assessment'){
				
				// var dayWrapper = moment().add(planAmount,'days').calendar(); 
				// var expireDateNew = moment(dayWrapper).format("DD/MM/YYYY H:mm");
				var currentDate = new Date();
                var expireDateNew = new Date(currentDate.setTime( currentDate.getTime() +  86400000 ));
				
				
				Meteor.users.update({_id : uId}, {$set: { 'expiredSubscription': false,'expiry': expireDateNew  } });
			
	
			 }	
		 // }	 
		 return true;

	},

	'registerVoucher': function(voucherArray){
		var datetime = moment().format("DD/MM/YYYY H:mm");
		var uId = Meteor.userId();	
		
		// Register voucher as used
		appliedVouchers.insert({ code : voucherArray[0].code, userId: uId, date: datetime  });
		
		//Upgrade account if applicable 
		if (voucherArray[0].applyGroup != null && voucherArray[0].applyGroup.length > 1){
			Meteor.users.update({_id : uId}, {$set: { 'roles': [voucherArray[0].applyGroup] } });
		}

		if (voucherArray[0].applyOrgID != null && voucherArray[0].applyOrgID.length > 1){
			Meteor.users.update({_id : uId}, {$set: { 'organisation': voucherArray[0].applyOrgID } });
		}

		if (voucherArray[0].applyGroupID != null && voucherArray[0].applyGroupID.length > 1){
			Meteor.users.update({ _id : uId }, {$push : {groups : voucherArray[0].applyGroupID}});
			 // Meteor.users.update({_id : uId}, {$set: { 'groups': [voucherArray[0].applyGroupID] } });
			 var role = Meteor.users.findOne({_id : uId}).roles[0];
			 if(role == "tutor"){
			 	 groups.update({ _id : voucherArray[0].applyGroupID }, {$push : {tutors : uId}});
			 } else {
			 groups.update({ _id : voucherArray[0].applyGroupID }, {$push : {students : uId}});
			}
		}
		

		if (voucherArray[0].initialAssess === true ){
			Meteor.call('assignNewAssessment', uId, voucher = true, function(err, result){
				if(err){
					console.log(err);
				}
			});
		} 

		if (voucherArray[0].discountType === "trial"){
			Meteor.users.update({_id : uId}, {$set: { 'authorisedCourses.journey2English': true  } });
		}
		return true;
	}*/
});




	