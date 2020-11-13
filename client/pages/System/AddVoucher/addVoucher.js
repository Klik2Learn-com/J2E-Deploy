Template.addVoucher.created = function () {
	this.subscribe('organisations');
	this.subscribe('groups');
	this.subscribe('users');
	this.subscribe('payment_plans');
	this.subscribe('studentAssessments');
}

Template.addVoucher.rendered = function () {
	document.title = "Add voucher - Journey 2 English";
	Session.set('orgSelection', $('#form-field-org option:selected').val());
	//doesnt work
	setTimeout(function(){ 
		$($(".payment-button")[0]).attr("checked", true);
	 }, 1000);
}

Template.addVoucher.helpers({
	/* Not Used
		users: function (userList, role) {
			return Meteor.users.find({ $and: [{ organisation: this.organisation }, { roles: { $in: [role] } }, { groups: { $in: [this._id] } }] });
		},
	*/
	userList: function () {
		var uId = Meteor.userId();
		return Meteor.users.find({ _id: { $ne: uId } }, { sort: { "username": 1 } });
	},

	orgName: function (orgId) {
		return organisations.findOne({ _id: orgId }).name;
	},

	publicOrgId: function () {
		return organisations.findOne({ name: "Public" })._id;
	},

	groupName: function (groupId) {
		return groups.findOne({ _id: groupId }).name;
	},

	orgSelected: function () {
		if (Session.get('orgSelection') != "") {
			return true;
		}
	},

	organisation: function () {
		return organisations.find({ name: { $not: "Public" } });
	},

	groupsList: function () {
		return groups.find({ organisation: Session.get('orgSelection') });
	},

	paymentPlansList: function () {
		return payment_plans.find({});
	},

	newStudent: function () {
		return $("input[name='new-existing']:checked").val() == "new";
	}

});

Template.addVoucher.events({
	'change select#form-field-org': function (e) {
		Session.set('orgSelection', $('#form-field-org option:selected').val());
	},

	'change input[name="new-existing"]': function (e) {

		if ($("input[name='new-existing']:checked").val() == "new") {
			$("#newStudentForm").removeClass("hidden");
			$("#existingStudentForm").addClass("hidden");
			$(".existingStudentFormItem").addClass("hidden");
		} else {
			$("#existingStudentForm").removeClass("hidden");
			$(".existingStudentFormItem").removeClass("hidden");
			$("#newStudentForm").addClass("hidden");
			$("#selectedStudent").change(function () {
				var uId = $("#selectedStudent option:selected").data("uid");
				var student = Meteor.users.findOne({ _id: uId });
				var assessment = studentAssessments.findOne({ userId: uId });
				var hasCourse = Object.size(student.authorisedCourses) > 0;
				$("#selectedName").text(student.profile.firstname + " " + student.profile.surname);
				if (assessment != null && assessment != 'undefined') {
					$("#selectedAssessment").text("Student has assessment. Assessment passed: " + assessment.pass + " (null indicates test not taken or marked yet)");
				} else {
					$("#selectedAssessment").text("No assessment");
				}

				if (hasCourse) {
					$("#selectedHasCourse").text("Yes");
				} else {
					$("#selectedHasCourse").text("No");
				}
			});
		}

	},

	'click #form-field-course': function(e){
		if(!$('#groups-container').hasClass('hidden'))
			$('#groups-container').addClass('hidden');
		$('#form-field-group').val('');
	},

	'click #form-field-both, click #form-field-assessment':function(e){
		if($('#groups-container').hasClass('hidden'))
			$('#groups-container').removeClass('hidden');
	},

	'change input[name="single-multiple"]': function (e) {

		if ($("input[name='single-multiple']:checked").val() == "single") {
			$("#voucherDetails").removeClass("hidden");
			$("#singleCode").removeClass("hidden");
			$('#form-field-usage-amt').prop('required',true);
			$("#multipleCodes").addClass("hidden");
			$('#form-field-usage').prop('required',false);
			$("#form-field-name").val('');
			$("#form-field-description").val('');
			$("#form-field-usage").val('');
			$("#form-field-usage-amt").val('');
		} else {
			$("#voucherDetails").removeClass("hidden");
			$("#singleCode").addClass("hidden");
			$('#form-field-usage-amt').prop('required',false);
			$("#multipleCodes").removeClass("hidden");
			$('#form-field-usage').prop('required',true);
			$("#form-field-name").val('');
			$("#form-field-description").val('');
			$("#form-field-usage").val('');
			$("#form-field-usage-amt").val('');
		}
	},

	'submit #voucher-form': function (e) {
		e.preventDefault();

		var existingStudent = ($("input[name='new-existing']:checked").val() == "new") ? null : $("#selectedStudent").find(":selected").attr("data-uId");

		var name = $('#form-field-name').val();
		var description = $('#form-field-description').val();
		//var code = $('#form-field-code').val();
		var discount = $('#form-field-discount').val();
		var multipleUsage = $('#form-field-usage').val();
		var singleUsage = $('#form-field-usage-amt').val();
		var active = true;
		var assessment = false;
		var limitedUsage = (singleUsage != "") || (multipleUsage != "");
		var discountType = "";
		var userId = null;
		var group = null;
		var groupVal = null;
		var org = null;
		var roles = null;
		var emailSelected = $('#form-field-email-to').val();
		// if($('#form-field-active').is(":checked")){
		// 	 active = true;
		// }
		if (existingStudent == null) {

			if ($('#form-field-trial').is(":checked")) {
				discountType = "trial";
				$('#form-field-roles option:selected').val("tutor");
				// $('#form-field-org option:selected').val();
				// $('#form-field-group option:selected').val();
			} else if ($('#form-field-assessment').is(":checked")) {
				discountType = "Assessment"
				assessment = true;
				// $('#form-field-roles option:selected').val("student");
				// $('#form-field-org option:selected').val();
				// $('#form-field-group option:selected').val();
			} else if ($('#form-field-course').is(":checked")) {
				discountType = "percent"
				assessment = false;
				// $('#form-field-roles option:selected').val("student");
				// $('#form-field-org option:selected').val();
				// $('#form-field-group option:selected').val();
			} else if ($('#form-field-both').is(":checked")) {
				discountType = "percent";
				assessment = true;
				// $('#form-field-roles option:selected').val("student");
				// $('#form-field-org option:selected').val();
				// $('#form-field-group option:selected').val();
			} else {
				discountType = "percent";
				assessment = false;
				// $('#form-field-roles option:selected').val();
				// $('#form-field-org option:selected').val();
				// $('#form-field-group option:selected').val();
			}

			roles = $('#form-field-roles').val();
			org = $('#form-field-org').val();
			groupVal = $('#form-field-group').val();
			group = groupVal != "" ? groupVal : null;

		} else {

			var student = Meteor.users.findOne({ _id: existingStudent });
			roles = student.roles[0];
			//Consider if the user is moderator, then just add the new organisation to the list
			org = student.organisation[0];
			group = (student.groups.length > 0) ? null : student.groups[0];
			userId = student._id;

			var assessment = studentAssessments.findOne({ userId: existingStudent });
			var hasCourse = (student.authorisedCourses.journey2English != null && student.authorisedCourses.journey2English != 'undefined');
			assessment = (assessment != null && assessment != 'undefined');
			discountType = hasCourse ? "percent" : "Assessment";
		}
		var paymentPlans = [];

		$(".form-field-payment").each(function (index) {
			if ($(this).find("input").is(":checked")) {
				paymentPlans.push(parseInt($(this).find("input").val()));
			}
		});

		var voucher = {
			name: name,
			description: description,
			discount: discount,
			multipleUsage: multipleUsage,
			singleUsage: singleUsage,
			active: active,
			limitedUsage: limitedUsage,
			assessment: assessment,
			uId: userId,
			roles: roles,
			org: org,
			group: group,
			paymentPlans: paymentPlans,
			discountType: discountType
		};

		Meteor.call('addVoucher', voucher, function (error, result) {
			if (!error) {
				Bert.alert('Voucher added', 'success', 'growl-top-right');
				//if multipleUsage > 1 then add element on page to print the
				//voucher codes for each voucher produced for this request
				if (multipleUsage >= 1) {


					$("#voucherResultsModal").modal();
					var codes = "";
					result.forEach(function(code) {
						codes = codes + "<li>" + code + "</li>";
					}); 

					codes = codes.substring(0, codes.length - 2);

					$("#resultsContainer").html("<h4>The following voucher codes have been generated:</h4>" + "<ul class='ulblank'>" + codes + "</ul>");

					//Uncomment this if you want to work on automated email voucher delivery
					// if (emailSelected != null && emailSelected != undefined) {
					// 	Session.set("voucher-codes", result);
					// 	Session.set("voucher-info", voucher);
					// 	Session.set("voucher-email-to", emailSelected);
					// 	$("#resultsContainer").html($("#resultsContainer").html() + "<br>Send them to the provided email?");
					// 	//Unhide the button to email the voucher codes to the provided email.
					// 	//$("#email-to-button").removeClass("hidden");
					// }
				} else if (singleUsage >= 1) {
					$("#voucherResultsModal").modal();
					$("#resultsContainer").html("<h4>The following voucher code has been generated:</h4>" + "<ul class='ulblank'>" + result + "</ul>");

				}
			} else {
				Bert.alert(error.toString(), 'danger', 'growl-top-right');
			}
		});

		// Old code for calling the server to create a voucher
		// Meteor.call('addVoucher', name, description, code, discount, usage, active, limitedUsage, assessment, roles, org, group, paymentPlans, discountType, function (error, result) {
		// 	if (!error) {
		// 		Bert.alert('Voucher added', 'success', 'growl-top-right');
		// 	} else {
		// 		Bert.alert(error.toString(), 'danger', 'growl-top-right');
		// 	}
		// });
	}
});