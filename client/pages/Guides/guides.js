// Template.Courses.created = function() {
// 	this.subscribe('User');
// }

// Template.Courses.helpers({

// 	'hasCourse': function() {
// 		if (Meteor.users.findOne({ _id : Meteor.userId(), authorisedCourses : {"journey2English" : true}})) {
// 			return true;
// 		} else {
// 			return false;
// 		}
// 	}
// })

Template.UserGuide.helpers({

	'hasGroup': function() {
		var group = Meteor.users.find({ _id : Meteor.userId(), groups : {$exists: true, $not: {$size: 0}} }).count();
		if (group == 0){
			return false;
		} else {
			return true;
		}
	},
});

Template.ugcourse.helpers({

	'hasGroup': function() {
		var group = Meteor.users.find({ _id : Meteor.userId(), groups : {$exists: true, $not: {$size: 0}} }).count();
		if (group == 0){
			return false;
		} else {
			return true;
		}
	},
});

Template.uglearningtools.helpers({

	'hasGroup': function() {
		var group = Meteor.users.find({ _id : Meteor.userId(), groups : {$exists: true, $not: {$size: 0}} }).count();
		if (group == 0){
			return false;
		} else {
			return true;
		}
	},
});

Template.ugtest.helpers({

	'hasGroup': function() {
		var group = Meteor.users.find({ _id : Meteor.userId(), groups : {$exists: true, $not: {$size: 0}} }).count();
		if (group == 0){
			return false;
		} else {
			return true;
		}
	},
});

Template.ugprogress.helpers({

	'hasGroup': function() {
		var group = Meteor.users.find({ _id : Meteor.userId(), groups : {$exists: true, $not: {$size: 0}} }).count();
		if (group == 0){
			return false;
		} else {
			return true;
		}
	},
});

Template.ugtools.helpers({

	'hasGroup': function() {
		var group = Meteor.users.find({ _id : Meteor.userId(), groups : {$exists: true, $not: {$size: 0}} }).count();
		if (group == 0){
			return false;
		} else {
			return true;
		}
	},
});

Template.ugnav.helpers({

	'hasGroup': function() {
		var group = Meteor.users.find({ _id : Meteor.userId(), groups : {$exists: true, $not: {$size: 0}} }).count();
		if (group == 0){
			return false;
		} else {
			return true;
		}
	},
});

Template.UserGuide.rendered = function() {	
	document.title = "User Guide - Journey 2 English";
}

Template.ugtest.rendered = function() {	
	document.title = "User Guide - Journey 2 English";
}

Template.ugcourse.rendered = function() {	
	document.title = "User Guide - Journey 2 English";
}

Template.uglearningtools.rendered = function() {	
	document.title = "User Guide - Journey 2 English";
}

Template.ugprogress.rendered = function() {	
	document.title = "User Guide - Journey 2 English";
}

Template.ugtools.rendered = function() {	
	document.title = "User Guide - Journey 2 English";
}

Template.MarkingGuidelines.rendered = function() {	
	document.title = "Marking Guidelines - Journey 2 English";
}

Template.styleguide.rendered = function() {	
	document.title = "Style Guide - Journey 2 English";
}