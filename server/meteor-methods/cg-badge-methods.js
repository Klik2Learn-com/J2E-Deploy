Meteor.methods({

    'addBagdeRecord': function (org, progTitle, progId, firstName, lastName, gender, email, dateofbirth) {
        var currentDate = new Date();
        var date = currentDate.toDateString();

        try {
			return CGBadgeData.insert({
                "Organisation Name": org,
                "Programme Title": progTitle,
                "Programme ID": progId,
                "First Name": firstName,
                "Last Name": lastName,
                "Gender": gender,
                "Email Address": email,
                "Date of Birth": dateofbirth,
                "Date of details submission": currentDate
            });
		} catch (err) {
			throw new Meteor.Error(err.message);
		}
    },

    'sendCertificateDetailsEmail': function (orgName, fName, lName, gender, email, dateofbirth) {
		// Send the email
		var recipient = "svetlozar@klik2learn.com";
		var emailSubject = "Certificate Details Submitted";
        var emailContent = "A user with the following details has just added their certificate details for requesting their Assured Customer Credential: \nFirst Name: " + fName + "\nLast Name: " + lName + "\nGender: " + gender + "\nDate of Birth: " + dateofbirth + "\nEmail: " + email + "\nOrganisation: " + orgName;
		Email.send({
            to: recipient,
            from: "noreply@journey2english.com",
            subject: emailSubject,
            text: emailContent
        });
    },
    
    'sendNotificationMessage': function(fName, lName, email) {

        var receiver = Meteor.users.findOne({username:"cgbadge"})._id;
        var msgsubject = "New certificate details submitted";
        var msgbody = "A user has completed the course and submitted the details for their certificate. \nThe details they've used on the certificate are:\nFull name: " + fName + " " + lName + "\nEmail: " + email;
        var uID = Meteor.userId();
        
		if(msgbody == ''){
			throw new Meteor.Error(500, 'You can\'t send an empty message.');
		} else if(msgsubject == '') {
			throw new Meteor.Error(500, 'You can\'t send a message without a subject.');
		} else {
			var d = new Date();
			// var formattedDate = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
			var dayNames = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
			var monthNames = [  "Jan", "Feb", "Mar",  "Apr", "May", "June", "July",  "Aug", "Sept", "Oct",  "Nov", "Dec"];
			var date = new Date();
			var dayIndex = date.getDay();
			var dateNo = date.getDate();
			var monthIndex = date.getMonth();
			var year = date.getFullYear();
			var hours = date.getHours();
			var minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();
			var formattedDate = dayNames[dayIndex] + ' ' + monthNames[monthIndex] + ' ' + dateNo + ' ' + year + ' ' + hours + ':' + minutes;

            //Sending a message to admin "cgbadge" to let him know that a user has submitted their certificate details
			messages.insert(                    
                {"p1": receiver, "p2": receiver, "p1_unread": false, "p2_unread": true, "p1_visible":true, "p2_visible": true, "title": msgsubject, "messages": [{"sender": receiver, "date": formattedDate,  "message": msgbody}] }
            );
            //Seding a message to user that has just submitted their certificate details to let them know that the details have been passed on to an admin
            messages.insert(
                {"p1": uID, "p2": uID, "p1_unread": false, "p2_unread": true, "p1_visible":true, "p2_visible": true, "title": "Course completed!", "messages": [{"sender": uID, "date": formattedDate,  "message": "Congratulations on completing 'Journey 2 English!'  We've received your details and are forwarding them to City & Guilds. They will send you your Digital Credentials badge. You can share this on social media and on your CV."}]}
            )
		}
	},
})