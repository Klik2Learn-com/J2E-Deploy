
Router.configure({
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	layoutTemplate: 'layout',
	progressTick: false,
	progressDelay: 100,
	trackPageView: true
});

// Router.route('/ieBlock');
Router.route('/newsletter-form');

//social media quiz

Router.route('/welcome', {
	name: 'Info',
	template: 'welcome',
	progress: false
});

// Router.route('/holiday-correct', {
// 	name: 'holiday_correct',
// 	template: 'holiday_correct'
// });

// Router.route('/holiday-wrong', {
// 	name: 'holiday_wrong',
// 	template: 'holiday_wrong'
// });

// Router.route('/boat-correct', {
// 	name: 'boat_correct',
// 	template: 'boat_correct'
// });

// Router.route('/boat-wrong', {
// 	name: 'boat_wrong',
// 	template: 'boat_wrong'
// });

// Router.route('/cake-correct', {
// 	name: 'cake_correct',
// 	template: 'cake_correct'
// });

// Router.route('/cake-wrong', {
// 	name: 'cake_wrong',
// 	template: 'cake_wrong'
// });

// Router.route('/tower-correct', {
// 	name: 'tower_correct',
// 	template: 'tower_correct'
// });

// Router.route('/tower-wrong', {
// 	name: 'tower_wrong',
// 	template: 'tower_wrong'
// });

// Router.route('/UKquiz', {
// 	name: 'UKquiz',
// 	template: 'UKquiz'
// });

Router.route('/admin/ddtest', {
	name: 'ddtest',
	template: 'ddtest'
});

Router.route('/', {
	name: 'home',
	template: 'Courses'
});

// Router.route('/expired', {
// 	name: 'expired',
// 	template: 'expired'
// });

Router.route('/BscormAPI', {
	name: 'BscormAPI',
	template: 'BscormAPI',
	data: function () {
		var query = this.params.query;
		return query
	}
});

Router.route('/scormAPI', {
	name: 'scormAPI',
	template: 'scormAPI'
});

Router.route('/scormFrame', {
	name: 'scormFrame',
	template: 'scormFrame'
});

Router.route('/hub', {
	name: 'hubLogin',
	template: 'hubLogin',
	data: function () {
		let query = this.params.query;
		token = query['t'];
		console.log('received token from hub:');
		console.log(token);
		if(token){
			hub_login(token);
		}else{
			console.log('hub error redirect');
			Router.go("/hubError");
		}
	}
});

Router.route('/hubError', {
	name: 'hubError',
	template: 'hubError'
});

//Router.route('/contactForm');

var go = Router.go; // cache the original Router.go method
Router.go = function () {
	if (Session.get('dirty')) {
		if (confirm("Are you sure you want to navigate away?")) {
			Session.set('dirty', false);
			go.apply(this, arguments);
		}
	} else {
		go.apply(this, arguments);
	}
};

// Before Hooks

var preCheck = function () {
	//var currentUser = Meteor.users.findOne({ _id: Meteor.userId() });
	var currentUser = Meteor.users.find({_id: Meteor.userId()}, {_id: 1, limit: 1});
	var currUserId = Meteor.userId();
	var scormActive = localStorage.getItem("isScormAPIActive");

	if ((BrowserDetect.browser == "Explorer") && ((BrowserDetect.version == "9") || (BrowserDetect.version == "8") || (BrowserDetect.version == "7"))) {
		this.render('ieBlock');
	} else if (scormActive != null && scormActive != 'undefined' && scormActive == 'yes'){
		this.next();
	} else if (currUserId == null || currUserId == undefined) {
		this.render('welcome');
		progress: false
	} else if (currentUser.expiredSubscription == true) {
		this.render('expired');
	} else {
		this.next();
	}
};

// Router.onBeforeAction(preCheck ,{except: ['Register', 'login_b2c', 'login_b2b', 'commercial', 'holiday_correct', 'holiday_wrong', 'boat_correct', 'boat_wrong', 'cake_correct', 'cake_wrong', 'tower_correct', 'tower_wrong'] });
Router.onBeforeAction(preCheck, { except: [/*'Register',*/ 'welcome', 'commercial', 'SignIn', 'findOutMore', 'signup', 'partnersJ2e', 'partnersEst', 'partnersJ2eEst', 'aspire', 'spt', 'scormAPI', 'scormFrame', 'BscormAPI', 'hubLogin', 'hubError'] });

var authCheck = function () {
	if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
		this.next();
	} else if (Roles.userIsInRole(Meteor.userId(), ['moderator', 'tutor'])) {
		this.next();
	} else if (Roles.userIsInRole(Meteor.userId(), 'student')) {
		if (Meteor.users.findOne({_id: Meteor.userId()}).authorisedCourses.journey2English == true) {
			this.next();
		} else {
			this.render('notFound');
		}
	} else {
		this.render('notFound');
	}
};

// Must be equal to the route names of the Iron Router route map

// Students can't access pages other than the listed below
Meteor.subscribe('User', function () {
	Router.before(authCheck, {
		except: [
			'UKquiz',
			'Yeti',
			//'Register',
			'SignIn',
			'signup',
			'aspire',
			'spt',
			'findOutMore',
			'home',
			'welcome',
			'commercial',
			'partnersJ2e',
			'partnersEst',
			'partnersJ2eEst',
			// 'holiday_correct',
			// 'holiday_wrong',,
			// 'boat_correct',
			// 'boat_wrong',,
			// 'cake_correct',
			// 'cake_wrong',,
			// 'tower_correct',
			// 'tower_wrong',
			'courses',
			'InitialAssessment',
			'InitialReading',
			'InitialWriting',
			'InitialSpeaking',
			'InitialListening',
			'userPage',
			'Overview',
			// User guide access
			'UserGuide',
			'ugroles',
			'ugtest',
			'ugcourse',
			'uglearningtools',
			'ugtools',
			'ugprogress',
			'scormFrame',
			'scormAPI',
			'BscormAPI'
			//'reportingDashboard'
		]
	});
})


// not sure if this works at all
Router.route('notFound', {
	path: '/(.*)',
	where: 'server',
	action: function () {
		this.response.writeHead(404);
		this.response.end(html);
	}
});

// Router.route('/logout', function () {
// 	Meteor.logout(function (err) {
// 		if (err) console.log('Error logging out!');

// 		Router.go("/");
// 	});
// 	this.render("logout");
// });

Router.route('/Courses', {
	name: 'courses'
});

/* This code checks the user is an admin before allowing them access to
* the admin page.
*/
Router.route('/admin', {
	onBeforeAction: function () {
		var adminRole = Roles.userIsInRole(Meteor.userId(), 'admin');
		var moderatorRole = Roles.userIsInRole(Meteor.userId(), 'moderator');
		var tutorRole = Roles.userIsInRole(Meteor.userId(), 'tutor');
		var studentRole = Roles.userIsInRole(Meteor.userId(), 'student');
		if (adminRole || moderatorRole || tutorRole || studentRole) {
			console.log('IM in /admin');
			this.next();
		} else {
			if (this.ready()) {
				this.render('ModuleSelect');
			}
		}
	},

	waitOn: function () {
		return Meteor.subscribe('Users');
	}
});

Router.route('/admin/userlist', {
	name: 'adminHome',
	template: 'adminUserList',
	data: function () {
		return Meteor.users.find({});
	},

	waitOn: function () {
		return Meteor.subscribe('Users');
	}

});

Router.route('/admin/viewGroups', {
	name: 'adminViewGroups',
	template: 'viewGroups',
	data: function () {
		return groups.find({});
	},

	waitOn: function () {
		return Meteor.subscribe('groups');
	}
})

Router.route('/admin/viewOrg', {
	template: 'viewOrg'
})

Router.route('/admin/groupeditor/:groupId', {
	name: 'adminEditGroups',
	template: 'adminGroupEditor',
	data: function () {
		var groupId = this.params.groupId;
		return groups.findOne({ _id: groupId });
	},

	waitOn: function () {
		var groupId = this.params.groupId;
		return Meteor.subscribe('group', groupId)

	},

	onBeforeAction: function () {
		/* This function is causing build errors. Needs to be fixed */
		var renderCourses = true;
		var me = this.next;
		if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
			//this.next();
			me();
			renderCourses = false;
		} else if (Roles.userIsInRole(Meteor.userId(), 'moderator') || Roles.userIsInRole(Meteor.userId(), 'tutor')) {
			var userId = Meteor.userId();
			//console.log("uID: " + userId);
			var userOrgId = Meteor.users.findOne({ _id: userId }).organisation;
			//console.log("userOrgID: " + userOrgId);
			var groupId = this.params.groupId;
			var orgId = groups.findOne({_id: groupId}).organisation;
			//console.log("orgId: " + orgId);

			for(var i=0; i < userOrgId.length; i++){
				if(orgId === userOrgId[i]){
					renderCourses = false;
					me();
				}
			}
		} 
		if(renderCourses){
			this.render('Courses');
		}
	},

})

Router.route('/admin/subgroupeditor/:subgroupId', {
	name: 'adminEditSubGroups',
	template: 'adminSubGroupEditor',
	data: function () {
		var subgroupId = this.params.subgroupId;
		return subgroups.findOne({ _id: subgroupId });
	},

	waitOn: function () {
		var subgroupId = this.params.subgroupId;
		return Meteor.subscribe('subgroups', subgroupId);
	},

	onBeforeAction: function () {
		if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
			this.next();
		} else if (Roles.userIsInRole(Meteor.userId(), 'moderator') || Roles.userIsInRole(Meteor.userId(), 'tutor')) {
			var userId = Meteor.userId();
			var user = Meteor.users.findOne({ _id: userId });
			var userOrg = user.organisation;
			var subgroupId = this.params.subgroupId;
			var subGroupOrg = subgroups.findOne({_id: subgroupId}).organisation;
			var tutorInChargeId = subgroups.findOne({_id: subgroupId}).tutor;
			
			var sameOrg = false;
			for(var i = 0; i < userOrg.length; i++){
				if(userOrg[i] == subGroupOrg){
					sameOrg = true;
					this.next();
				}
			}	
			if (sameOrg && (Roles.userIsInRole(Meteor.userId(), 'moderator') || userId == tutorInChargeId)) {
				this.next();
			} else {
				this.render('Courses');
			}
		} else {
			this.render('Courses');
		}
	},
})


Router.route('/admin/groupcreator', {
	name: 'adminCreateGroups',
	template: 'adminGroupCreator',
	data: function () {
		return groups.find({});
	},

	waitOn: function () {
		return [
			Meteor.subscribe('groups'),
			Meteor.subscribe('Users'),
			Meteor.subscribe('organisations')
		]
	}

})


Router.route('/admin/subgroupcreator', {
	name: 'adminCreateSubgroups',
	template: 'adminSubgroupCreator',
	data: function () {
		return subgroups.find({});
	},

	waitOn: function () {
		return [
			Meteor.subscribe('groups'),
			Meteor.subscribe('Users'),
			Meteor.subscribe('organisations'),
			Meteor.subscribe('subgroups')
		]
	}

})


Router.route('/admin/orgcreator', {
	name: 'adminCreateOrganisation',
	template: 'adminOrgCreator'
})

Router.route('/admin/user/:userId', {
	name: 'adminUserControls',
	template: 'adminUserControls',
	data: function () {
		console.log('IM in /admin/user');
		var userId = this.params.userId;
		return Meteor.users.findOne({ _id: userId });
	},

	onBeforeAction: function () {
		var renderModule = true;
		if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
			this.next();
			renderModule = false;
		} else if (Roles.userIsInRole(Meteor.userId(), 'moderator')) {
			var userId = this.params.userId;
			var userOrg = Meteor.users.findOne({ _id: userId }).organisation;
			var modOrg = Meteor.users.findOne({ _id: Meteor.userId() }).organisation;

			for(var i = 0; i < userOrg.length; i++){
				for(var j = 0; j < modOrg.length; j++){
					if(userOrg[i] === modOrg[j]){
						renderModule = false;
						this.next();
					}
				}
			}
		}
		if(renderModule) {
			if (this.ready()) { this.render('ModuleSelect'); }
		}
	},

	waitOn: function () {
		return [
			Meteor.subscribe('nbnotes'),
			Meteor.subscribe('Users'),
			Meteor.subscribe('userProgress'),
			Meteor.subscribe('organisations')
		]
	}

})

Router.route('/user/:userId', {
	name: 'userPage',
	template: 'userPage',
	data: function () {
		var userId = this.params.userId;
		return Meteor.users.findOne({ _id: userId });
	},

	waitOn: function () {
		return [
			Meteor.subscribe('Users'),
			Meteor.subscribe('userProgress'),
			Meteor.subscribe('nbnotes'),
			Meteor.subscribe('studentAssessments')
		]
	}
})

Router.route('/admin/bugReportsList', {
	name: 'adminBugReportsList',
	template: 'adminBugReportsList'
})

Router.route('/admin/feedbackList', {
	name: 'adminFeedbackList',
	template: 'adminFeedbackList'
})

Router.route('/bugReport/:bugId', {
	name: 'adminBugReport',
	template: 'adminBugReport',

	data: function () {
		var bugId = this.params.bugId;
		return bug_reports.findOne({ _id: bugId });
	}
})

Router.route('/admin/contactFormList', {
	name: 'adminContactFormList',
	template: 'adminContactFormList'
})

Router.route('/contactForm/:contactFormId', {
	name: 'adminContactForm',
	template: 'adminContactForm',

	data: function () {
		var contactFormId = this.params.contactFormId;
		return contact_form.findOne({ _id: contactFormId });
	}
})

Router.route('/admin/addNewUser', {
	name: 'adminAddNewUser',
	template: 'adminNewUserPanel',
	waitOn: function () {
		return [
			Meteor.subscribe('organisations')
		]
	}
})

Router.route('/admin/ShowContactMails', {
	name: 'ShowContactMails',
	template: 'ShowContactMails'

})

Router.route('/noteviewer/:noteId', {
	name: 'adminViewNote',
	template: 'noteViewer',
	data: function () {
		var noteId = this.params.noteId;
		return userNotes.findOne({ _id: noteId })
	},

	waitOn: function () {
		return [
			Meteor.subscribe('Users'),
			Meteor.subscribe('nbnotes')
		]
	}
})

Router.route('/audioentry/:audioId', {
	name: 'adminAudioViewer',
	template: 'voiceRecorderViewer',
	data: function () {
		var audioId = this.params.audioId;
		return audioRecordings.findOne({ _id: audioId });
	},

	waitOn: function () {
		return [
			Meteor.subscribe('audioRecordings'),
			Meteor.subscribe('commentAudioRecordings')
		]
	}
});

Router.route('/admin/assessmentlist', {
	name: 'adminAssessmentList',
	template: 'adminAssessmentList'
});

Router.route('/admin/assessmentReport', {
	name: 'adminAssessmentReport',
	template: 'adminAssessmentReport'
});

Router.route('/login', {
	progress: false
});

Router.route('/partners/j2ecourse', {
	name: 'partnersJ2e',
	template: 'partnersJ2e',
	progress: false,
});

Router.route('/partners/j2eskillstest', {
	name: 'partnersEst',
	template: 'partnersEst',
	progress: false,
});

Router.route('/partners/j2efull', {
	name: 'partnersJ2eEst',
	template: 'partnersJ2eEst',
	progress: false,
});


Router.route('/SignIn', {
	name: 'SignIn',
	template: 'SignIn',
	progress: false,

	onBeforeAction: function () {
		var currentUser = Meteor.users.findOne({ _id: Meteor.userId() })
		if (currentUser == null || currentUser == undefined) {
			this.render('SignIn');
		}
		else if (currentUser != null && currentUser != undefined) {
			if(currentUser.expiredSubscription == true)
				this.render('expired');
			else
				this.render('Courses');
		}
		else {
			this.next();
		}
	}
});
Router.route('/find-out-more', {
	name: 'findOutMore',
	template: 'findOutMore',
	progress: false,

	onBeforeAction: function () {
		var currentUser = Meteor.users.findOne({ _id: Meteor.userId() })
		if (currentUser == null || currentUser == undefined) {
			this.render('find-out-more');
		}
		else if (currentUser != null && currentUser != undefined) {
			if(currentUser.expiredSubscription == true)
				this.render('expired');
			else
				this.render('Courses');
		}
		else {
			this.next();
		}
	}
	
});
Router.route('/signup', {
	name: 'signup',
	template: 'signup',
	progress: false,

	onBeforeAction: function () {
		var currentUser = Meteor.users.findOne({ _id: Meteor.userId() })
		if (currentUser == null || currentUser == undefined) {
			this.render('signup');
		}
		else if (currentUser != null && currentUser != undefined) {
			if(currentUser.expiredSubscription == true)
				this.render('expired');
			else
				this.render('Courses');
		}
		else {
			this.next();
		}
	}
	
});
Router.route('/aspire', {
	name: 'aspire',
	template: 'aspire',
	progress: false,

	onBeforeAction: function () {
		var currentUser = Meteor.users.findOne({ _id: Meteor.userId() })
		if (currentUser == null || currentUser == undefined) {
			this.render('aspire');
		}
		else if (currentUser != null && currentUser != undefined) {
			if(currentUser.expiredSubscription == true)
				this.render('expired');
			else
				this.render('Courses');
		}
		else {
			this.next();
		}
	}
});

Router.route('/spt', {
	name: 'spt',
	template: 'spt',
	progress: false,

	onBeforeAction: function () {
		var currentUser = Meteor.users.findOne({ _id: Meteor.userId() })
		if (currentUser == null || currentUser == undefined) {
			this.render('spt');
		}
		else if (currentUser != null && currentUser != undefined) {
			if(currentUser.expiredSubscription == true)
				this.render('expired');
			else
				this.render('Courses');
		}
		else {
			this.next();
		}
	}
});

Router.route('/bugReporting');
// Router.route('/contactForm');

Router.route('/admin/addVoucher', {
	name: 'addVoucher',
	template: 'addVoucher'
});

Router.route('/admin/voucherList', {
	name: 'adminVoucherList',
	template: 'adminVoucherList'
});

Router.route('/admin/announcements', {
	name: 'adminAnnouncements',
	template: 'adminAnnouncements'
});

Router.route('/certificate', function(){
	var currentUser =  Meteor.users.findOne({ _id: Meteor.userId() });
	if(currentUser.certificateNotification != null || currentUser.certificateNotification != undefined)
		this.render('certificate');
	else
		this.render('Courses'); 
}
);

//Router.route('/reportingDashboard');
Router.route('/UserGuide');
Router.route('/ugroles');
Router.route('/ugtest');
Router.route('/ugcourse');
Router.route('/uglearningtools');
Router.route('/ugtools');
Router.route('/ugprogress');
Router.route('/MarkingGuidelines');

//  routes (pages to be removed later)
Router.route('/modal');
Router.route('/w3');
Router.route('activity2');
Router.route('/dd');
Router.route('/start');
Router.route('/end');
Router.route('/dd3');
Router.route('/k2l');
Router.route('/phone');
Router.route('/styleguide');
Router.route('/tooltip');
Router.route('/notebook');
Router.route('/m4a33');
Router.route('/CategoryTest');

Router.route('/Shimlademo');

Router.route('/ModuleSelect');
Router.route('/ModuleSelectUnit2');

// Grammar Guide
Router.route('/GrammarGuide');

//Module info
Router.route('/Overview');
Router.route('/InfoModule1');
Router.route('/InfoModule2');
Router.route('/InfoModule3');
Router.route('/InfoModule4');
Router.route('/InfoModule5');
Router.route('/InfoModule6');
Router.route('/InfoModule7');
Router.route('/InfoModule8');
Router.route('/InfoModule9');
Router.route('/InfoModule10');

// Module 1
Router.route('/m1a1');
Router.route('/m1a2');
Router.route('/m1a3');
Router.route('/m1a4');
Router.route('/m1a5');
Router.route('/m1a6');
Router.route('/m1a7');
Router.route('/m1a8');
Router.route('/m1a9');
Router.route('/m1a10');
Router.route('/m1a11');
Router.route('/m1a12');
Router.route('/m1a13');
Router.route('/m1a14');
Router.route('/m1a15');
Router.route('/m1a16');
Router.route('/m1a17');
Router.route('/m1a18');
Router.route('/m1a19');
Router.route('/m1a20');
Router.route('/m1a21');
Router.route('/m1a22');
Router.route('/m1a23');
Router.route('/m1a24');
Router.route('/m1a25');
Router.route('/m1a26');
Router.route('/m1a27');
Router.route('/m1Game');
Router.route('/Inverness');
Router.route('/LochNess');
Router.route('/FortAugustus');
Router.route('/KyleofLochalsh');
Router.route('/Portree');
Router.route('/DunveganCastle');
Router.route('/MyWordsM1');
Router.route('/MyWordsM1idioms');
Router.route('/MyWordsM1phrasal');
Router.route('/MyWordsM1vocab');
Router.route('/MoreAboutInverness');
Router.route('/MoreAboutLochNess');
Router.route('/MoreAboutFortAugustus');
Router.route('/MoreAboutKyleofLochalsh');
Router.route('/MoreAboutPortree');
Router.route('/MoreAboutDunveganCastle');

//Module 2
Router.route('/m2a1');
Router.route('/m2a2');
Router.route('/m2a3');
Router.route('/m2a4');
Router.route('/m2a5');
Router.route('/m2a6');
Router.route('/m2a7');
Router.route('/m2a8');
Router.route('/m2a9');
Router.route('/m2a10');
Router.route('/m2a11');
Router.route('/m2a12');
Router.route('/m2a13');
Router.route('/m2a14');
Router.route('/m2a15');
Router.route('/m2a16');
Router.route('/m2a17');
Router.route('/m2a18');
Router.route('/m2a19');
Router.route('/m2a20');
Router.route('/m2a21');
Router.route('/m2a22');
Router.route('/m2a23');
Router.route('/m2a24');
Router.route('/m2a25');
Router.route('/m2a26');
Router.route('/m2a27');
Router.route('/m2a28');
Router.route('/m2Game');
Router.route('/Braemar');
Router.route('/Dundee');
Router.route('/Arbroath');
Router.route('/Kirriemuir');
Router.route('/Stonehaven');
Router.route('/Aberdeen');
Router.route('/MyWordsM2');
Router.route('/MyWordsM2idioms');
Router.route('/MyWordsM2phrasal');
Router.route('/MyWordsM2vocab');
Router.route('/MoreAboutBraemar');
Router.route('/MoreAboutDundee');
Router.route('/MoreAboutArbroath');
Router.route('/MoreAboutKirriemuir');
Router.route('/MoreAboutStonehaven');
Router.route('/MoreAboutAberdeen');

//Module 3
Router.route('/m3a1');
Router.route('/m3a2');
Router.route('/m3a3');
Router.route('/m3a4');
Router.route('/m3a5');
Router.route('/m3a6');
Router.route('/m3a7');
Router.route('/m3a8');
Router.route('/m3a9');
Router.route('/m3a10');
Router.route('/m3a11');
Router.route('/m3a12');
Router.route('/m3a13');
Router.route('/m3a14');
Router.route('/m3a15');
Router.route('/m3a16');
Router.route('/m3a17');
Router.route('/m3a18');
Router.route('/m3a19');
Router.route('/m3a20');
Router.route('/m3a21');
Router.route('/m3a22');
Router.route('/m3a23');
Router.route('/m3a24');
Router.route('/m3a25');
Router.route('/m3a26');
Router.route('/m3a27');
Router.route('/m3a28');
Router.route('/m3a29');
Router.route('/m3Game');
Router.route('/Stirling');
Router.route('/Dunfermline');
Router.route('/Linlithgow');
Router.route('/Peebles');
Router.route('/NorthBerwick');
Router.route('/Edinburgh');
Router.route('/MyWordsM3');
Router.route('/MyWordsM3idioms');
Router.route('/MyWordsM3phrasal');
Router.route('/MyWordsM3vocab');
Router.route('/MoreAboutStirling');
Router.route('/MoreAboutDunfermline');
Router.route('/MoreAboutLinlithgow');
Router.route('/MoreAboutPeebles');
Router.route('/MoreAboutNorthBerwick');
Router.route('/MoreAboutEdinburgh');

//Module4
Router.route('/m4a1');
Router.route('/m4a2');
Router.route('/m4a3');
Router.route('/m4a4');
Router.route('/m4a5');
Router.route('/m4a6');
Router.route('/m4a7');
Router.route('/m4a8');
Router.route('/m4a9');
Router.route('/m4a10');
Router.route('/m4a11');
Router.route('/m4a12');
Router.route('/m4a13');
Router.route('/m4a14');
Router.route('/m4a15');
Router.route('/m4a16');
Router.route('/m4a17');
Router.route('/m4a18');
Router.route('/m4a19');
Router.route('/m4a20');
Router.route('/m4a21');
Router.route('/m4a22');
Router.route('/m4a23');
Router.route('/m4a24');
Router.route('/m4a25');
Router.route('/m4a26');
Router.route('/m4a27');
Router.route('/m4a28');
Router.route('/m4a29');
Router.route('/m4a30');
Router.route('/m4Game');
Router.route('/FortWilliam');
Router.route('/GlenCoe');
Router.route('/Crianlarich');
Router.route('/Helensburgh');
Router.route('/LochLomond');
Router.route('/Glasgow');
Router.route('/MyWordsM4');
Router.route('/MyWordsM4idioms');
Router.route('/MyWordsM4phrasal');
Router.route('/MyWordsM4vocab');
Router.route('/MoreAboutFortWilliam');
Router.route('/MoreAboutGlenCoe');
Router.route('/MoreAboutCrianlarich');
Router.route('/MoreAboutHelensburgh');
Router.route('/MoreAboutLochLomond');
Router.route('/MoreAboutGlasgow');

//Module 5
Router.route('/m5a1');
Router.route('/m5a2');
Router.route('/m5a3');
Router.route('/m5a4');
Router.route('/m5a5');
Router.route('/m5a6');
Router.route('/m5a7');
Router.route('/m5a8');
Router.route('/m5a9');
Router.route('/m5a10');
Router.route('/m5a11');
Router.route('/m5a12');
Router.route('/m5a13');
Router.route('/m5a14');
Router.route('/m5a15');
Router.route('/m5a16');
Router.route('/m5a17');
Router.route('/m5a18');
Router.route('/m5a19');
Router.route('/m5a20');
Router.route('/m5a21');
Router.route('/m5a22');
Router.route('/m5a23');
Router.route('/m5a24');
Router.route('/m5Game');
Router.route('/Belfast');
Router.route('/Blackpool');
Router.route('/Bolton');
Router.route('/Manchester');
Router.route('/StHelens');
Router.route('/Liverpool');
Router.route('/MyWordsM5');
Router.route('/MyWordsM5idioms');
Router.route('/MyWordsM5phrasal');
Router.route('/MyWordsM5vocab');
Router.route('/MoreAboutBelfast');
Router.route('/MoreAboutBlackpool');
Router.route('/MoreAboutBolton');
Router.route('/MoreAboutManchester');
Router.route('/MoreAboutStHelens');
Router.route('/MoreAboutLiverpool');

//Module 6
Router.route('/m6a1');
Router.route('/m6a2');
Router.route('/m6a3');
Router.route('/m6a4');
Router.route('/m6a5');
Router.route('/m6a6');
Router.route('/m6a7');
Router.route('/m6a8');
Router.route('/m6a9');
Router.route('/m6a10');
Router.route('/m6a11');
Router.route('/m6a12');
Router.route('/m6a13');
Router.route('/m6a14');
Router.route('/m6a15');
Router.route('/m6a16');
Router.route('/m6a17');
Router.route('/m6a18');
Router.route('/m6a19');
Router.route('/m6a20');
Router.route('/m6a21');
Router.route('/m6a22');
Router.route('/m6a23');
Router.route('/m6a24');
Router.route('/m6a25');
Router.route('/m6a26');
Router.route('/m6a27');
Router.route('/m6a28');
Router.route('/m6a29');
Router.route('/m6Game');
Router.route('/Newcastle');
Router.route('/Durham');
Router.route('/Whitby');
Router.route('/Scarborough');
Router.route('/Harrogate');
Router.route('/York');
Router.route('/MyWordsM6');
Router.route('/MyWordsM6idioms');
Router.route('/MyWordsM6phrasal');
Router.route('/MyWordsM6vocab');
Router.route('/MoreAboutNewcastle');
Router.route('/MoreAboutDurham');
Router.route('/MoreAboutWhitby');
Router.route('/MoreAboutScarborough');
Router.route('/MoreAboutHarrogate');
Router.route('/MoreAboutYork');

//Module 7
Router.route('/m7a1');
Router.route('/m7a2');
Router.route('/m7a3');
Router.route('/m7a4');
Router.route('/m7a5');
Router.route('/m7a6');
Router.route('/m7a7');
Router.route('/m7a8');
Router.route('/m7a9');
Router.route('/m7a10');
Router.route('/m7a11');
Router.route('/m7a12');
Router.route('/m7a13');
Router.route('/m7a14');
Router.route('/m7a15');
Router.route('/m7a16');
Router.route('/m7a17');
Router.route('/m7a18');
Router.route('/m7a19');
Router.route('/m7a20');
Router.route('/m7a21');
Router.route('/m7a22');
Router.route('/m7a23');
Router.route('/m7a24');
Router.route('/m7a25');
Router.route('/m7a26');
Router.route('/m7Game');
Router.route('/Sheffield');
Router.route('/PeakDistrict');
Router.route('/StokeonTrent');
Router.route('/Chester');
Router.route('/ColwynBay');
Router.route('/Bangor');
Router.route('/MyWordsM7');
Router.route('/MyWordsM7idioms');
Router.route('/MyWordsM7phrasal');
Router.route('/MyWordsM7vocab');
Router.route('/MoreAboutSheffield');
Router.route('/MoreAboutPeakDistrict');
Router.route('/MoreAboutStokeonTrent');
Router.route('/MoreAboutChester');
Router.route('/MoreAboutColwynBay');
Router.route('/MoreAboutBangor');

//Module 8
Router.route('/m8a1');
Router.route('/m8a2');
Router.route('/m8a3');
Router.route('/m8a4');
Router.route('/m8a5');
Router.route('/m8a6');
Router.route('/m8a7');
Router.route('/m8a8');
Router.route('/m8a9');
Router.route('/m8a10');
Router.route('/m8a11');
Router.route('/m8a12');
Router.route('/m8a13');
Router.route('/m8a14');
Router.route('/m8a15');
Router.route('/m8a16');
Router.route('/m8a17');
Router.route('/m8a18');
Router.route('/m8a19');
Router.route('/m8a20');
Router.route('/m8a21');
Router.route('/m8a22');
Router.route('/m8a23');
Router.route('/m8a24');
Router.route('/m8a25');
Router.route('/m8a26');
Router.route('/m8a27');
Router.route('/m8a28');
Router.route('/m8a29');
Router.route('/m8a30');
Router.route('/m8a31');
Router.route('/m8a32');
Router.route('/m8a33');
Router.route('/m8a34');
Router.route('/m8Game');
Router.route('/Oxford');
Router.route('/Gloucester');
Router.route('/Cardiff');
Router.route('/Bristol');
Router.route('/Bath');
Router.route('/Stonehenge');
Router.route('/MyWordsM8');
Router.route('/MyWordsM8idioms');
Router.route('/MyWordsM8phrasal');
Router.route('/MyWordsM8vocab');
Router.route('/MoreAboutOxford');
Router.route('/MoreAboutGloucester');
Router.route('/MoreAboutCardiff');
Router.route('/MoreAboutBristol');
Router.route('/MoreAboutBath');
Router.route('/MoreAboutStonehenge');

//Module 9
Router.route('/m9a1');
Router.route('/m9a2');
Router.route('/m9a3');
Router.route('/m9a4');
Router.route('/m9a5');
Router.route('/m9a6');
Router.route('/m9a7');
Router.route('/m9a8');
Router.route('/m9a9');
Router.route('/m9a10');
Router.route('/m9a11');
Router.route('/m9a12');
Router.route('/m9a13');
Router.route('/m9a14');
Router.route('/m9a15');
Router.route('/m9a16');
Router.route('/m9a17');
Router.route('/m9a18');
Router.route('/m9a19');
Router.route('/m9a20');
Router.route('/m9a21');
Router.route('/m9a22');
Router.route('/m9a23');
Router.route('/m9a24');
Router.route('/m9a25');
Router.route('/m9a26');
Router.route('/m9a27');
Router.route('/m9a28');
Router.route('/m9a29');
Router.route('/m9a30');
Router.route('/m9Game');
Router.route('/WestonsuperMare');
Router.route('/Taunton');
Router.route('/Exeter');
Router.route('/Torquay');
Router.route('/Plymouth');
Router.route('/StAustell');
Router.route('/MyWordsM9');
Router.route('/MyWordsM9idioms');
Router.route('/MyWordsM9phrasal');
Router.route('/MyWordsM9vocab');
Router.route('/MoreAboutWestonsuperMare');
Router.route('/MoreAboutTaunton');
Router.route('/MoreAboutExeter');
Router.route('/MoreAboutTorquay');
Router.route('/MoreAboutPlymouth');
Router.route('/MoreAboutStAustell');

//Module 10

Router.route('/m10a1');
Router.route('/m10a2');
Router.route('/m10a3');
Router.route('/m10a4');
Router.route('/m10a5');
Router.route('/m10a6');
Router.route('/m10a7');
Router.route('/m10a8');
Router.route('/m10a9');
Router.route('/m10a10');
Router.route('/m10a11');
Router.route('/m10a12');
Router.route('/m10a13');
Router.route('/m10a14');
Router.route('/m10a15');
Router.route('/m10a16');
Router.route('/m10a17');
Router.route('/m10a18');
Router.route('/m10a19');
Router.route('/m10a20');
Router.route('/m10a21');
Router.route('/m10a22');
Router.route('/m10a23');
Router.route('/m10a24');
Router.route('/m10a25');
Router.route('/m10a26');
Router.route('/m10a27');
Router.route('/m10a28');
Router.route('/m10Game');
Router.route('/Cambridge');
Router.route('/Newmarket');
Router.route('/Felixstowe');
Router.route('/Chelmsford');
Router.route('/SouthendonSea');
Router.route('/London');
Router.route('/MyWordsM10');
Router.route('/MyWordsM10idioms');
Router.route('/MyWordsM10phrasal');
Router.route('/MyWordsM10vocab');
Router.route('/MoreAboutCambridge');
Router.route('/MoreAboutNewmarket');
Router.route('/MoreAboutFelixstowe');
Router.route('/MoreAboutChelmsford');
Router.route('/MoreAboutSouthendonSea');
Router.route('/MoreAboutLondon');

//Completion page

Router.route('/complete');


// Module 1 India
// Router.route('/indM1A1');
// Router.route('/indM1A2');
// Router.route('/indM1A3');
// Router.route('/indM1A4');
// Router.route('/indM1A5');
// Router.route('/indM1A6');
// Router.route('/indM1A7');
// Router.route('/indM1A8');
// Router.route('/indM1A9');
// Router.route('/indM1A10');
// Router.route('/Shimla');
// Router.route('/Bilaspur');
// Router.route('/Dharamshala');
// Router.route('/Chamba');
// Router.route('/Keylong');
// Router.route('/Kullu');
Router.route('/Yeti');
// Router.route('/indMyWordsM1');
// Router.route('/indMyWordsM1idioms');
// Router.route('/indMyWordsM1phrasal');
// Router.route('/MoreAboutBilaspur');
// Router.route('/MoreAboutDharamshala');
// Router.route('/MoreAboutChamba');
// Router.route('/MoreAboutKeylong');
// Router.route('/MoreAboutKullu');
// Router.route('/MoreAboutYeti');