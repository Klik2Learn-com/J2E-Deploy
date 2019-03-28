(function(){/**
* Code to run on server deployment.
*/
Meteor.startup(function (callback) {

	// smtp = {
	// 	username: 'contact@klik2learn.com',   // eg: server@gentlenode.com
	// 	password: 'k2ladmin001',   // eg: 3eeP1gtizk5eziohfervU
	// 	server: 'smtp.gmail.com',  // eg: mail.gandi.net
	// 	port: 587	// Changed from '25' to remove ECONNREFUSED error (9th Feb 2016)
	// };

	smtp = {
		username: "noreply@journey2english.com",
		password: "K2Ln0r3ply",
		server: 'mail.hostedemail.com',
		port: 587
	};
	process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
	process.env.METEOR_WATCH_PRIORITIZE_CHANGED = false;

	Accounts.emailTemplates.siteName = "Journey2English";
	Accounts.emailTemplates.from = 'Journey2English <noreply@journey2english.com>';
	Accounts.emailTemplates.enrollAccount.subject = function (user) {
		return "Welcome to Journey 2 English, " + user.profile.firstname;
	};

	Accounts.emailTemplates.enrollAccount.html = function (user, url) {
		var email = null;

		if (user.organisation == null || user.organisation == 'undefined') {
			throw new Meteor.Error('500', "Failed to create account. No Organisation provided.");
		} else {
			var customEmail = customEmails.findOne({ orgId: user.organisation[0] });
			if (customEmail != null && customEmail != 'undefined') {
				email = customEmail.enrollmentEmail;
			}
		}

		var displayUsername;
		if (user.username == undefined) {
			displayUsername = '';
		} else {
			displayUsername = user.username;
		}
		//[VERIFICATION_URL] - url
		//[USERNAME] - username
		if (email != null) {
			email = email.split('[VERIFICATION_URL]').join(url);
			email = email.split('[USERNAME]').join(displayUsername);
			return email;
		}

		return '<table border=0 cellpadding=0 cellspacing=0 style=background-color:#edf4ff;border-width:0;max-width:640px;margin-left:auto;margin-right:auto;font-family:sans-serif;font-size:16px><tr><td style=margin:0;padding:0><img alt="Journey 2 English"src=http://www.klik2learn.com/wp-content/uploads/2016/07/email_jte_logo.jpg style=max-width:100%><tr><td style=margin:0;padding:1em><h1 style=color:#1e72ca;font-family:sans-serif;text-align:center;margin-bottom:1em>Welcome to <span style=display:inline-block>Journey 2 English</span></h1><p style=font-family:sans-serif;font-weight:700>Follow these steps to create your account:<ol style=font-weight:800;font-size:24px><li style=margin-bottom:40px><p style=font-weight:400;font-size:16px>Go to this link:<br><br><a href="' + url + '">' + url + '</a><br><br><i>(The course works in <img alt=Chrome src=http://www.klik2learn.com/wp-content/uploads/2016/10/chrome.png style=padding-left:3px;padding-right:1px height=15 width=15>Chrome, <img alt=Firefox src=http://www.klik2learn.com/wp-content/uploads/2016/10/firefox.png style=padding-left:3px;padding-right:1px height=15 width=15>Firefox, <img alt=Safari src=http://www.klik2learn.com/wp-content/uploads/2016/10/safari.png style=padding-left:3px;padding-right:1px height=15 width=15>Safari and <img alt=Edge src=http://www.klik2learn.com/wp-content/uploads/2016/10/edge.png style=padding-left:3px;padding-right:1px height=15 width=15>Edge on all devices)</i><li style=margin-bottom:40px><p style=font-weight:400;font-size:16px>Choose a password<p style=text-align:center><img alt="Choose a password"src=http://www.klik2learn.com/wp-content/uploads/2016/10/set-password.png style=max-width:100%;height:auto><li style=margin-bottom:40px><p style=font-weight:400;font-size:16px>Congratulations! You can now access the course.<li style=margin-bottom:40px><p style=font-weight:400;font-size:16px>You can sign in again at any time at <a href=https://journey2english.com>journey2english.com</a> using your email or username. Your username is <span style=font-family:monospace;background-color:#fff;display:inline-block;margin:2px;padding:3px>' + user.username + '</span></ol><p style=text-align:center>Good luck with your studies.<p style=text-align:center>The Klik2learn team<p style=text-align:center><a href=http://www.klik2learn.com><img alt=Klik2learn src=http://www.klik2learn.com/wp-content/uploads/2016/10/header-logo.png height=100 width=100></a></table>'
	};

	Accounts.emailTemplates.verifyEmail.subject = function (user) {
		return "Welcome to Journey 2 English, " + user.profile.firstname;
	};

	Accounts.emailTemplates.verifyEmail.html = function (user, url) {
		var email = null;

		if (user.organisation == null || user.organisation == 'undefined') {
			throw new Meteor.Error('500', "Failed to create account. No Organisation provided.");
		} else {
			var customEmail = customEmails.findOne({ orgId: user.organisation[0] });
			if (customEmail != null && customEmail != 'undefined') {
				email = customEmail.verificationEmail;
			}
		}

		var displayUsername;
		if (user.username == undefined) {
			displayUsername = '';
		} else {
			displayUsername = user.username;
		}

		//[VERIFICATION_URL] - url
		//[USERNAME] - username
		if (email != null) {
			email = email.split('[VERIFICATION_URL]').join(url);
			email = email.split('[USERNAME]').join(displayUsername);
			return email;
		}

		return '<!DOCTYPE html> <html> <head> <title></title> </head> <body> <table border="0" cellpadding="0" cellspacing="0" style="background-color:#edf4ff;border-width:0;max-width:640px;margin-left:auto;margin-right:auto;font-family:sans-serif;font-size:16px"> <tr> <td style="margin:0;padding:0"><img alt="Journey 2 English" src="http://www.klik2learn.com/wp-content/uploads/2016/07/email_jte_logo.jpg" style="max-width:100%"></td> </tr> <tr> <td style="margin:0;padding:1em"> <h1 style="color:#1e72ca;font-family:sans-serif;text-align:center;margin-bottom:1em">Welcome to <span style="display:inline-block">Journey 2 English</span></h1> <p style="font-family:sans-serif;font-weight:700">You are almost there!</p> <ol style="font-weight:800;font-size:24px"> <li style="margin-bottom:40px"> <p style="font-weight:400;font-size:16px">Click this link to activate your account:<br> <br> <a href="' + url + '">' + url + '</a><br> <br> <i>(The course works in <img alt="Chrome" height="15" src="http://www.klik2learn.com/wp-content/uploads/2016/10/chrome.png" style="padding-left:3px;padding-right:1px" width="15">Chrome, <img alt="Firefox" height="15" src="http://www.klik2learn.com/wp-content/uploads/2016/10/firefox.png" style="padding-left:3px;padding-right:1px" width="15">Firefox, <img alt=Safari src=http://www.klik2learn.com/wp-content/uploads/2016/10/safari.png style=padding-left:3px;padding-right:1px height=15 width=15>Safari and <img alt="Edge" height="15" src="http://www.klik2learn.com/wp-content/uploads/2016/10/edge.png" style="padding-left:3px;padding-right:1px" width="15">Edge on all devices)</i></p> </li> <li style="margin-bottom:40px"> <p style="font-weight:400;font-size:16px">You can sign in again at any time at <a href="https://journey2english.com">journey2english.com</a> using your email or username. Your username is <span style="font-family:monospace;background-color:#fff;display:inline-block;margin:2px;padding:3px">' + user.username + '</span></p> </li> </ol> <p style="text-align:center">Good luck with your studies.</p> <p style="text-align:center">The Klik2learn team</p> <p style="text-align:center"><a href="http://www.klik2learn.com"><img alt="Klik2learn" height="100" src="http://www.klik2learn.com/wp-content/uploads/2016/10/header-logo.png" width="100"></a></p> </td> </tr> </table> </body> </html>'
	};

	Accounts.config({
		// use 0.0000001, and not 0, to test immediate expiration
		"passwordResetTokenExpirationInDays": 30
	});
});

}).call(this);
