(function(){Meteor.methods({

    //'addVoucher': function (name, description, code, discount, usage, active, limitedUsage, assessment, roles, org, group, paymentPlans, discountType) {
    'addVoucher': function (voucher) {
        if (Roles.userIsInRole(Meteor.userId(), 'admin')) {

            //returns true if the voucher of a given code exists in the system
            //parameter: voucher code
            var checkDuplicate = function(voucherCode){
                var duplicate = vouchers.findOne({ code: voucherCode });
                var duplicateApplied = appliedVouchers.findOne({ code: voucherCode });
                if (((duplicate != null) && (duplicate != 'undefined')) || ((duplicateApplied != null) && (duplicateApplied != 'undefined'))) {
                    return true;
                } else {
                    return false;
                }
            }

            try {
                //Check if the voucher is to be used for multiple users - usageAmount > 1
                //if so, generate different voucher for each user and return an array of
                //voucher codes back to the client
                //Nowhere in the mongo/meteor docs can I find how to insert multiple docs when
                //the array is already pre-defined like below... none of the documents help, so
                //have to do it the "dumb" way 1 by 1 and hope we don't have vouchers
                //for more than 50 users ....

                var voucherCodes = [];              
                if (voucher.multipleUsage >= 1) {
                    var currCode = "";
                    var done = voucher.multipleUsage;
                    var i = 0;
                    while(done > 0){
                        //currCode = voucher.code + "_j2e_" + i;
                        currCode = makeVoucherCode();
                        currCode = "J2E" + currCode;
                        //currCode = voucher.code + suffix;
                        if(!checkDuplicate(currCode)){
                            voucherCodes.push(currCode);
                            done--;
                        }
                        i++;
                    }

                } else if (voucher.singleUsage >= 1) {
                    var currCode = "";
                    var done = voucher.singleUsage;
                    while (done > 0) {
                        currCode = makeVoucherCode();
                        currCode = "J2E" + currCode;
                        if (!checkDuplicate(currCode)) {
                            vouchers.insert({
                                "name": voucher.name,
                                "description": voucher.description,
                                "code": currCode,
                                "discount": voucher.discount,
                                "discountType": voucher.discountType,
                                "applyPlans": voucher.paymentPlans,
                                "active": voucher.active,
                                "limitedUsage": voucher.limitedUsage,
                                "usageAmount": voucher.singleUsage,
                                "initialAssess": voucher.assessment,
                                "uId": voucher.uId,
                                "applyGroup": voucher.roles,
                                "applyOrgID": voucher.org,
                                "applyGroupID": voucher.group,
                            });
                            done = 0;
                        }
                    }
                    return currCode;
                    
                    
                    

                } else {
                    if(checkDuplicate(voucher.code)){
                        throw new Meteor.Error("This voucher code already exists. Please try again.");
                    }
                    voucherCodes.push(voucher.code);
                }
                
                voucherCodes.forEach(function(code){
                    vouchers.insert({
                        "name": voucher.name,
                        "description": voucher.description,
                        "code": code,
                        "discount": voucher.discount,
                        "discountType": voucher.discountType,
                        "applyPlans": voucher.paymentPlans,
                        "active": voucher.active,
                        "limitedUsage": voucher.limitedUsage,
                        "usageAmount": 1,
                        "initialAssess": voucher.assessment,
                        "uId": voucher.uId,
                        "applyGroup": voucher.roles,
                        "applyOrgID": voucher.org,
                        "applyGroupID": voucher.group,
                    });
                });

                return voucherCodes;

            } catch (err) {
                throw new Meteor.Error(err.message);
            }
        } else {
            throw new Meteor.Error(500, 'You\'re not an admin - no permission to add voucher.');
        }
    },

    'deleteVoucher': function (vId) {
        if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
            vouchers.remove({ _id: vId });
        }
        else {
            throw new Meteor.Error(500, 'You\'re not authorised.');
        }
    },

    //Code not used anywhere
    'getVoucherByCode': function (vCode) {
        var voucher = vouchers.findOne({ code: vCode });
        if (voucher == null || voucher == 'undefined') {
            throw new Meteor.Error(500, 'No such voucher code');
        } else {
            return voucher;
        }
    },

    'voucherUsed': function (vCode, uId) {
        var dateTime = new Date();
        appliedVouchers.insert({ code: vCode, userId: uId, date: dateTime });
    }
});

var makeVoucherCode = function() {
    var code = "";
    var possibleChars = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
    /**
     * Below can be used if the randomisation is implemented with regular expressions
     */
    // var lowerChar = new RegExp(/[a-z]/);
    // var upperChar = new RegExp(/[A-Z]/);
    // var digit = new RegExp(/\d/);
    // var notDigit = new RegExp(/\D/);
    // var finalRegEx = new RegExp("(" + lowerChar.source + ")|(" + upperChar.source + ")|(" + digit.source + ")|(" + notDigit.source + ")");

    for (var i = 0; i < 11; i++) {
        code += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }

    return code;
}

}).call(this);
