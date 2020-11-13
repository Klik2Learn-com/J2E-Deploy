Router.route('/assessment/:assessmentid', {
	name: 'InitialAssessment',
	template: 'InitialAssessment',
});

Router.route('/assessment/:assessmentid/reading', {
	name: 'InitialReading',
	template: 'InitialReading',
	waitOn: function() {
		return [
			Meteor.subscribe('userProgress'),
			Meteor.subscribe('studentAssessments',  Meteor.userId())		]
	}
});

Router.route('/assessment/:assessmentid/writing', {
	name: 'InitialWriting',
	template: 'InitialWriting',
	waitOn: function() {
		return [
			Meteor.subscribe('userProgress'),
			Meteor.subscribe('studentAssessments')
		]
	}
});

Router.route('/assessment/:assessmentid/speaking', {
	name: 'InitialSpeaking',
	template: 'InitialSpeaking',
	waitOn: function() {
		return [
			Meteor.subscribe('userProgress'),
			Meteor.subscribe('studentAssessments')
		]
	}
})

Router.route('/assessment/:assessmentid/listening', {
	name: 'InitialListening',
	template: 'InitialListening',
	waitOn: function() {
		return [
			Meteor.subscribe('userProgress'),
			Meteor.subscribe('studentAssessments')
		]
	}
})

Router.route('/assessmentreview/:assessmentid', {
	template: 'AssessmentReview'
})

Router.route('/assessmentreport', {
	template: 'assessmentreport'
})