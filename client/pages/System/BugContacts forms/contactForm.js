Template.contactForm.events({

	'click .browser.dropdown-menu li a' : function(evt){
		$("#form-browser").html(evt.currentTarget.innerHTML);
		$("#form-browser").removeClass('faded');
	},


	'click .device.dropdown-menu li a' : function(evt){
		$("#form-device").html(evt.currentTarget.innerHTML);
		$("#form-device").removeClass('faded');
	},

	'click #submitReportButton' : function(evt){
		evt.preventDefault();
		if (Honeypot.isHuman("#contactFormB2B")) {
 		 Honeypot.removeHoneypotFields("#contactFormB2B");
		var name = $('#form-name').val(),
		    email = $('#form-email').val(),
		    organisation = $('#form-organisation').val();

		if (name == "" || email == ""){
			Bert.alert( "Name and email are required" , 'warning', 'growl-top-right' );
			return;
		}

		Meteor.call('submitContactForm',"B2B trial request", name, email, organisation, Meteor.userId(), function (error, result) {
			if (!error) {
				Bert.alert( 'Contact form submitted', 'success', 'growl-top-right' );
				 $('#form-name').val("");
				 $('#form-email').val("");
				 $('#form-organisation').val("");

			} else {
				Bert.alert( error.toString() , 'danger', 'growl-top-right' );
			}
		});
	} else {
		return false;
	}
}
})

Template.contactForm2.events({

	'click .browser.dropdown-menu li a' : function(evt){
		$("#form-browser").html(evt.currentTarget.innerHTML);
		$("#form-browser").removeClass('faded');
	},


	'click .device.dropdown-menu li a' : function(evt){
		$("#form-device").html(evt.currentTarget.innerHTML);
		$("#form-device").removeClass('faded');
	},

	'click #submitReportButton2' : function(evt){
		evt.preventDefault();
		if (Honeypot.isHuman("#contactFormB2B2")) {
 		 Honeypot.removeHoneypotFields("#contactFormB2B2");
		var name = $('#form-name2').val(),
		    email = $('#form-email2').val(),
		    organisation = $('#form-organisation2').val();

		if (name == "" || email == ""){
			Bert.alert( "Name and email are required" , 'warning', 'growl-top-right' );
			return;
		}

		Meteor.call('submitContactForm',"B2B trial request", name, email, organisation, Meteor.userId(), function (error, result) {
			if (!error) {
				Bert.alert( 'Contact form submitted', 'success', 'growl-top-right' );
				 $('#form-name2').val("");
				 $('#form-email2').val("");
				 $('#form-organisation2').val("");

			} else {
				Bert.alert( error.toString() , 'danger', 'growl-top-right' );
			}
		});
	} else {
		return false;
	}
}
})

Template.contactForm3.events({

	'click .browser.dropdown-menu li a' : function(evt){
		$("#form-browser").html(evt.currentTarget.innerHTML);
		$("#form-browser").removeClass('faded');
	},


	'click .device.dropdown-menu li a' : function(evt){
		$("#form-device").html(evt.currentTarget.innerHTML);
		$("#form-device").removeClass('faded');
	},

	'click #submitReportButton3' : function(evt){
		evt.preventDefault();
		if (Honeypot.isHuman("#contactFormB2B3")) {
 		 Honeypot.removeHoneypotFields("#contactFormB2B3");
		var name = $('#form-name3').val(),
		    email = $('#form-email3').val(),
		    organisation = $('#form-organisation3').val();

		if (name == "" || email == ""){
			Bert.alert( "Name and email are required" , 'warning', 'growl-top-right' );
			return;
		}

		Meteor.call('submitContactForm',"B2B trial request", name, email, organisation, Meteor.userId(), function (error, result) {
			if (!error) {
				Bert.alert( 'Contact form submitted', 'success', 'growl-top-right' );
				 $('#form-name3').val("");
				 $('#form-email3').val("");
				 $('#form-organisation3').val("");

			} else {
				Bert.alert( error.toString() , 'danger', 'growl-top-right' );
			}
		});
	} else {
		return false;
	}
}
})

Template.contactFormB2C.events({

	'click .browser.dropdown-menu li a' : function(evt){
		$("#form-browser").html(evt.currentTarget.innerHTML);
		$("#form-browser").removeClass('faded');
	},


	'click .device.dropdown-menu li a' : function(evt){
		$("#form-device").html(evt.currentTarget.innerHTML);
		$("#form-device").removeClass('faded');
	},

	'click #submitReportButton' : function(evt){
		evt.preventDefault();
		if (Honeypot.isHuman("#contactFormB2C")) {
 		 Honeypot.removeHoneypotFields("#contactFormB2C");

		var name = $('#form-name').val(),
		    email = $('#form-email').val(),
		    message = $('#form-message').val();

		if (name == "" || email == ""){
			Bert.alert( "Name and email are required" , 'warning', 'growl-top-right' );
			return;
		}

		Meteor.call('submitContactForm',"B2C contact form", name, email, message, Meteor.userId(), function (error, result) {
			if (!error) {
				Bert.alert( 'Contact form submitted', 'success', 'growl-top-right' );
				 $('#form-name').val("");
				 $('#form-email').val("");
				 $('#form-message').val("");

			} else {
				Bert.alert( error.toString() , 'danger', 'growl-top-right' );
			}
		});
	} else {
		return false;
		
}
}
})


// Template.contactForm.rendered = function() {
	
// 	//document.title = "Journey 2 English";
// 	$('#iron-router-progress').addClass('done');

// 	$(window).scroll(function() {    
//     var scroll = $(window).scrollTop();

//     if (scroll >= 300) {
//         $(".login-page header").addClass("smaller");
//     } else {
//         $(".login-page header").removeClass("smaller");
//     }
// });
	
// }
