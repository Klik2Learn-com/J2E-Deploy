Template.AssessmentReview.rendered = function () {

	document.title = "English Skills Test Review - Journey 2 English";

}

Template.AssessmentReview.helpers({

	authorised: function () {
		if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
			return true;
		} else if (Roles.userIsInRole(Meteor.userId(), 'moderator')) {
			return false;
			//Moderators should have nothing to do with student assessments
			// var studentId = this.userId;
			// userOrg = Meteor.users.findOne({ _id : studentId }).organisation;
			// if (userOrg == Meteor.user().organisation) {
			// 	return true;
			// } else {
			// 	return false;
			// }
		} else if (Roles.userIsInRole(Meteor.userId(), 'tutor')) {
			var studentId = this.userId;
			var userGroups = groups.findOne({ students: studentId, tutors: Meteor.userId() });
			if (groups.findOne({ students: studentId, tutors: Meteor.userId() }) || groups.findOne({ tutors: Meteor.userId() })) {
				return true;
			} else {
				return false;
			}
		} else if (Roles.userIsInRole(Meteor.userId(), 'student')) {
			return false;
		}
	},

	assessmentDoc: function () {
		return studentAssessments.findOne({ _id: Router.current().params.assessmentid });
	},

	assessmentUsername: function () {
		var assessment = studentAssessments.findOne({ _id: Router.current().params.assessmentid });
		var user = Meteor.users.findOne({ _id: assessment.userId });
		return user.username;
	},

	assessmentTitle: function () {
		var assessment = studentAssessments.findOne({ _id: Router.current().params.assessmentid });
		return assessment.name;
	},

	totalNumberOfQuestions: function (section) {
		if (section != null) {
			if (section == "Reading") {
				return this.answer.A1r.length - 1 +
					this.answer.A2r.length - 1 +
					this.answer.B1r.length - 1 +
					this.answer.B2r.length - 1 +
					this.answer.C1r.length - 1;
			} else {
				return this.answer.A2l.length - 1 +
					this.answer.B1l.length - 1 +
					this.answer.B2l.length - 1 +
					this.answer.C1l.length - 1;
			}
		}
		return this.answer.length;
	},

	addOneToIndex: function (index) {
		return index + 1;
	},

	notMarked: function () {
		return (this.pass == null || this.pass == "Not Marked")
	},

	scoreNeeded: function () {
		if (this.name == "Writing" || this.name == "Speaking") {
			return false;
		}
		return true;
	},
	sectionUnmarked: function () {
		for (var i = 0; i < this.sections.length; i++) {
			if (this.sections[i].pass == null || this.sections[i].pass == "Not Marked") {
				return true;
			}
		}
		return false;
	},

	passOrFail: function () {
		if (this.pass == "Not Attempted") {
			return '<b>Not Attempted</b>';
		} else if (this.pass == "Not Achieved") {
			return '<b>Not Achieved</b>';
		} else if (this.pass == "A1") {
			return '<b>A1</b>';
		} else if (this.pass == "A2") {
			return '<b>A2</b>';
		} else if (this.pass == "B1") {
			return '<b>B1</b>';
		} else if (this.pass == "B2") {
			return '<b>B2</b>';
		} else if (this.pass == "C1") {
			return '<b>C1</b>';
		} else if (this.pass == "C1+") {
			return '<b>C1+</b>';
		} else if (this.pass == "Not Marked") {
			return '<b>Not Marked</b>';
		}
	},

	passValue: function () {
		var assessment = studentAssessments.findOne({ _id: Router.current().params.assessmentid }).pass;
		if (assessment === "A2" || assessment === "B1" || assessment === "B2" || assessment === "C1" || assessment === "C1+") {
			return true;
		} else {
			return false;
		}
	},

	writingQnum: function () {
		return this.answerNumber;
	},

	writingQuestion: function () {
		var qnum = this.answerNumber;
		if (qnum == 1)
			return "You would like to organise a day trip for your friends at work. Write an email to your boss asking him/her for permission to do this. You may include the following but you can add your own ideas.";
		if (qnum == 2)
			return "Write an email to your new class mate to tell them about yourself.";
		if (qnum == 3)
			return "You need to write a personal statement for your university course. You should include the following: The course you would like to study, Why you have chosen this course, Why you want to study at this university, Personal qualities you would bring to the course, Any experience you have of the subject.";
		if (qnum == 4)
			return "You have just returned from your summer holidays. Write an email telling your friends about this.";
	},

	recordedAnswer: function () {
		if (this.answerId != undefined) {
			return true;
		} else {
			return false;
		}
	},

	recordingDoc: function () {
		return assessmentRecordings.findOne({ _id: this.answerId });
	},

	readingSection: function () {
		return this.name == 'Reading';
	},

	readingGrade: function (reading) {
		var answer = reading.answer
		var pass = reading.pass;

		var showGrades = [];
		var gradesNames = [];

		if (pass == null || pass == "Not Completed") {
			return showGrades;
		}


		var grades = ["A2r", "B1r", "B2r","C1r",];

		// A1r should always be shown no matter what. It's the first page and even if all wrong, it should be seen.
		showGrades.push(answer.A1r);

		var showGrade = null;

		for(var counter = 0; counter < grades.length; counter++){
			showGrade = false;
			for (var i = 1; i < answer[grades[counter]].length; i++) {
				if (answer[grades[counter]][i].correct != null) {
					showGrade = true;
					break;
				}
			}
			if (showGrade)
				showGrades.push(answer[grades[counter]]);
		}

		setSuggestedLevel(showGrades, "Reading");
		return showGrades;
	},



	readingGradeName: function (readingGrade) {
		return readingGrade[0].name;
	},

	readingGradeSection: function (readingGrade) {

		var suggestedLevel = "";



		if (Session.get("suggestedReadingLevel") == "C1+" && readingGrade[0].name == "C1") {
			suggestedLevel = "<i class=\"correctword\"> (Suggested Level* - C1+)</i>";
		}

		if (Session.get("suggestedReadingLevel") == readingGrade[0].name) {
			suggestedLevel = "<i class=\"correctword\"> (Suggested Level)</i>";
		}



		var header = "<h2 class=\"readingLevelHeading\" >Level " + readingGrade[0].name + " questions" + suggestedLevel + "</h2>";
		var questions = "";
		var correct = 0;
		for (var i = 1; i < readingGrade.length; i++) {
			if (readingGrade[i].correct == true) {
				correct++;
			}

			questions += "<span class='est-review-q'>Q" + i + ") " + readingGrade[i].question + "</span>";
			questions += "<div style=\"background-color: #fff; padding: 6px 12px ; margin: 5px 0 2em 0; border-radius: 6px;\">" + printReadingAnswer(i - 1, readingGrade[i], readingGrade[0].name) + "</div>"
		}



		var mark = "<div class='est-review-section-mark'>Score: " + correct + " out of " + (i - 1) + ". Cut-off: " + getCutOff(readingGrade[0].name + "r") + "</div>";
		var body = header + mark + questions + "<br>";
		var readingAppendInterval = setInterval(function () {
			if ($("." + readingGrade[0].name + "r")[0] != null && $("." + readingGrade[0].name)[0] != 'undefined') {
				$("." + readingGrade[0].name + "r").empty();
				$("." + readingGrade[0].name + "r").append(body);
				clearInterval(readingAppendInterval);
			}
		}, 200);

		return "";
	},


	currQuestionIndex: function () {
		if (Session.get("levelIndex") == null || Session.get("levelIndex") == 'undefined') {
			Session.set("levelIndex", 0);
			Session.set("currentLevelIndex", 0);
		}
		var currIndex = Session.get("currentLevelIndex");

		return currIndex;
	},


	listeningGrade: function (listening) {
		var answer = listening.answer
		var pass = listening.pass;

		var showGrades = [];
		var gradesNames = [];

		if (pass == null || pass == "Not Completed") {
			return showGrades;
		}


		var grades = ["B1l", "B2l","C1l",];

		// A2l should always be shown no matter what. It's the first page and even if all wrong, it should be seen.
		showGrades.push(answer.A2l);

		var showGrade = null;

		for(var counter = 0; counter < grades.length; counter++){
			showGrade = false;
			for (var i = 1; i < answer[grades[counter]].length; i++) {
				if (answer[grades[counter]][i].correct != null) {
					showGrade = true;
					break;
				}
			}
			if (showGrade)
				showGrades.push(answer[grades[counter]]);
		}

		setSuggestedLevel(showGrades, "Listening");
		return showGrades;
	},

	listeningSection: function () {
		return this.name == 'Listening';
	},

	listeningGradeName: function (listeningGrade) {
		return listeningGrade[0].name;
	},

	listeningGradeSection: function (listeningGrade) {

		var suggestedLevel = "";

		if (Session.get("suggestedListeningLevel") == "C1+" && listeningGrade[0].name == "C1") {
			suggestedLevel = "<i class=\"correctword\"> (Suggested Level* - C1+)</i>";
		}

		if (Session.get("suggestedListeningLevel") == listeningGrade[0].name) {
			suggestedLevel = "<i class=\"correctword\"> (Suggested Level)</i>";
		}

		if (Session.get("suggestedListeningLevel") == "A1") {
			suggestedLevel = "<i class=\"correctword\"> (Suggested Level* - A1)</i>";
		}

		var header = "<h2 class=\"listeningLevelHeading\" >Level " + listeningGrade[0].name + " questions" + suggestedLevel + "</h2>";
		var questions = "";
		var correct = 0;
		for (var i = 1; i < listeningGrade.length; i++) {
			if (listeningGrade[i].correct == true) {
				correct++;
			}

			var studentAnswers = "<br>";

			if ((correctOptions[listeningGrade[0].name][(i - 1)] != 'undefined') && (listeningGrade[i].answerValue != 'undefined')) {
				var missedAnswers = (correctOptions[listeningGrade[0].name][(i - 1)].length) - (listeningGrade[i].answerValue.length);
				if (missedAnswers > 0) {
					for (var k = 0; k < missedAnswers; k++) {
						studentAnswers += '<span class="incorrectword">No Answer Given</span><br>';
					}
				}
			}

			
			for (var answerIndex in listeningGrade[i].answerValue) {
				var answer = listeningGrade[i].answerValue[answerIndex];
				if (answer == null || answer == 'undenifed') {
					studentAnswers += '<span class="incorrectword">No Answer Given</span><br>';
				} else {
					var right = correctAnswer(answer, listeningGrade[0].name, (i - 1));
					studentAnswers += '<span class="' + (right ? "correctword" : "incorrectword") + '">' + answer + '</span><br>';
				}
			}
			questions += "<span class='est-review-q'>Q" + i + ") " + listeningGrade[i].question + "</span>";
			questions += '<br><br><span class="est-review-indent">Student Answers:' + studentAnswers + '</span><br>';
			questions += "<div class=\"est-review-indent est-review-listening-answers\">" + printAnswersListening((i - 1), listeningGrade[i], listeningGrade[0].name) + "</div>"
		}



		var mark = "<div class='est-review-section-mark'>Score: " + correct + " out of " + (i - 1) + ". Cut-off: " + getCutOff(listeningGrade[0].name + "l") + "</div>";
		var body = header + mark + questions + "<br>";
		var listeningAppendInterval = setInterval(function () {
			if ($("." + listeningGrade[0].name + "l")[0] != null && $("." + listeningGrade[0].name)[0] != 'undefined') {
				$("." + listeningGrade[0].name + "l").empty();
				$("." + listeningGrade[0].name + "l").append(body);
				clearInterval(listeningAppendInterval);
			}
		}, 200);

		return "";
	},


	printAnswer: function () {
		if (this.answerValue == null || this.answerValue == 'undefined') {
			return '<span class="incorrectword">No Answer Given</span>';
		}

		if (typeof this.answerValue == "string") {
			var answerDisplay;
			if (this.correct) {
				answerDisplay = '<span class="correctword">' + this.answerValue + '</span>';
			} else if (this.correct == null) {
				var formattedAnswer = this.answerValue.replace(/\n/g, "<br />");
				answerDisplay = '<span>' + formattedAnswer + '</span>';
			} else if (!this.correct) {
				answerDisplay = '<span class="incorrectword">' + this.answerValue + '</span>';
			}
			return answerDisplay;
		} else if (this.answerValue.constructor === Array) {
			//var tempArray = [];
			var temp = "<pre>";
			for (var i = 0; i < this.answerValue.length; i++) {
				//tempArray.push(this.answerValue[i]);
				temp = temp + this.answerValue[i] + "<br>"
			}
			return temp + "</pre>";
		}
	}

})

Template.AssessmentReview.events({

	'click .buttonaudio': function (evt) {
		var player = new Audio();
		player.setAttribute("src", this.url());
		player.play();
	},

	'click *[data-function="buttonSectionChange"]': function (evt) {
		var assessment = studentAssessments.findOne({ _id: Router.current().params.assessmentid });
		var sectionNo = $(evt.target).attr("data-sectionNo");
		var newMark = $(evt.target).attr("value");
		var currentMark = assessment.sections[sectionNo].pass;


		Meteor.call('changeAssessmentSectionMark', assessment._id, sectionNo, newMark, function (error, result) {
			if (!error) {
				Bert.alert('Section mark changed', 'success', 'growl-top-right');
			} else {
				Bert.alert(error.toString(), 'danger', 'growl-top-right');
			}
		});

	},

	'click *[data-function="buttonOverallChange"]': function (evt) {
		var assessment = studentAssessments.findOne({ _id: Router.current().params.assessmentid });
		var currentMark = assessment.pass;
		var newMark = $(evt.target).attr("value");
		Meteor.call('changeAssessmentOverallMark', assessment._id, newMark, function (error, result) {
			if (!error) {
				Bert.alert('Assessment mark changed', 'success', 'growl-top-right');
			} else {
				Bert.alert(error.toString(), 'danger', 'growl-top-right');
			}
		});
	},

	'click *[data-function="mark-section"]': function (evt) {
		var assessmentId = Router.current().params.assessmentid;
		var sectionName = this.name;
		if ($(evt.currentTarget).attr('value') == "Not Attempted") {
			Meteor.call('markAssessmentSection', assessmentId, sectionName, "Not Attempted");
		} else if ($(evt.currentTarget).attr('value') == "Not Achieved") {
			Meteor.call('markAssessmentSection', assessmentId, sectionName, "Not Achieved");
		} else if ($(evt.currentTarget).attr('value') == "A1") {
			Meteor.call('markAssessmentSection', assessmentId, sectionName, "A1");
		} else if ($(evt.currentTarget).attr('value') == "A2") {
			Meteor.call('markAssessmentSection', assessmentId, sectionName, "A2");
		} else if ($(evt.currentTarget).attr('value') == "B1") {
			Meteor.call('markAssessmentSection', assessmentId, sectionName, "B1");
		} else if ($(evt.currentTarget).attr('value') == "B2") {
			Meteor.call('markAssessmentSection', assessmentId, sectionName, "B2");
		} else if ($(evt.currentTarget).attr('value') == "C1") {
			Meteor.call('markAssessmentSection', assessmentId, sectionName, "C1");
		} else if ($(evt.currentTarget).attr('value') == "C1+") {
			Meteor.call('markAssessmentSection', assessmentId, sectionName, "C1+");
		}

		Bert.alert('Section marked', 'success', 'growl-top-right');

	},

	'click *[data-function="mark-assessment"]': function (evt) {
		var assessmentId = Router.current().params.assessmentid;
		var assessmentDoc = studentAssessments.findOne({ _id: assessmentId });
		var sectionName = this.name;
		var value = $(evt.currentTarget).attr('value');
		// if ($(evt.currentTarget).attr('data-value') == "pass") {
		Meteor.call('markAssessment', assessmentId, value, function (error, result) {
			Meteor.call('authoriseCourse', assessmentDoc.userId, 'journey2English', function (error, result) {
				Meteor.call('sendPassedAssessmentEmail', assessmentDoc.userId, Meteor.userId());
				if (!error) {
					Bert.alert('Mark changed', 'success', 'growl-top-right');
				} else {
					Bert.alert(error.toString(), 'danger', 'growl-top-right');
				}
			});
		});
		// } else if ($(evt.currentTarget).attr('data-value') == "fail") {
		// Meteor.call('markAssessment', assessmentId, "fail", function(error, result) {
		// 	Meteor.call('sendFailAssessmentEmail', assessmentDoc.userId, Meteor.userId());
		// })
		// }		
	}

})

Template.AssessmentReview.created = function () {
	this.subscribe('studentAssessments');
	this.subscribe('assessmentRecordings');
	this.subscribe('groups');
}


printReadingAnswer = function (i, answer, grade) {
	var answerDisplay;
	var beforeAnswer = {
		A1: [
			"",
			"They ",
			"They ",
			"They ",
			""
		],

		A2: [
			"During ",
			"The ",
			"",
			"In ",
			"To ",
			"",
			"In ",
			""
		],

		B1: [
			"",
			"They arrived in ",
			"In the ",
			"The ",
			"",
			"",
			"",
			"",
			""
		],

		B2: [
			"They are only ",
			"They arrived in ",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			""
		],

		C1: [
			"They ",
			"The ",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			""
		]
	};

	var afterAnswer = {
		A1: [
			"",
			"",
			"",
			"",
			""
		],

		A2: [
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			""
		],

		B1: [
			"",
			"",
			"",
			" century",
			"",
			"",
			"",
			"",
			""
		],

		B2: [
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			""
		],

		C1: [
			"",
			" century",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			""
		]
	};

	if (answer.correct != null && answer.correct != 'undefined') {
		if (answer.correct == true) {
			answerDisplay = '<span class="correctword">' + answer.answerValue + '</span>';
		} else {
			if (answer.answerValue == null || answer.answerValue == 'undefined' || answer.answerValue.length < 1)
				answerDisplay = '<span class="incorrectword">No answer given</span>';
			else
				answerDisplay = '<span class="incorrectword">' + answer.answerValue + '</span>';
		}
	}

	return beforeAnswer[grade][i] + answerDisplay + afterAnswer[grade][i];
}


correctAnswer = function (answer, grade, questionIndex) {

	var question = correctOptions[grade][questionIndex];
	var correct = false;
	for (var x = 0; x < question.length; x++) {
		if (question[x].toLowerCase() == answer.toLowerCase()) {
			correct = true;
			x = question.length + 1;
		}
	}
	return correct;
}

printAnswersListening = function (questionIndex, grade, gradeName) {

	var accepted = correctOptions;

	var alloptions = {
		A2: [
			["True", "False"],
			["True", "False"],
			["True", "False"],
			["True", "False"],
			["True", "False"],
			["True", "False"]
		],
		B1: [
			["Kasia was born in Dundee", "Kasia has been in Scotland for five years", "Kasia's father couldn't find a job in Poland", "Kasia came to Scotland to study", "Kasia was born in Poland"],
			["Polish and Scottish", "Polish", "Scottish"],
			["He came in 1906", "He was born in scotland", "He came in the 1960s"],
			["She was born in Scotland", "She came to find work", "She came to marry Farhana's father"],
			["This is his first time away from Lewis", "He doesn't have any brothers or sisters", "He has lived in several different places", "He speaks two languages", "He lived in Stornoway with his mother and father"],
			["He doesn't understand all the words people use", "He doesn't understand the Glasgow dialect", "He doesn't understand English"],
			["Mostly happy", "Mostly unhappy"]
		],
		B2: [
			["Tomorrow", "Tonight"],
			["Mark Thorne film", "French film"],
			["Yes", "No"],
			["She doesn't like car chases", "She doesn't like Mark Thorne", "It has bad reviews"],
			["The new Mark Thorme film", "The new French film", "Neither of the above"],
			["It has car chases", "It sounds a bit heavy", "He doesn't like French films"]
		],
		C1: [
			["True", "False"],
			["True", "False"],
			["Effects of living in space", "Space tourism", "Reasons for space exploration", "Funding for the space programme"],
			["An academic lecture", "A conversation", "A medical programme", "A radio interview"],
			["Positive", "Negative", "Neutral"],
			["Positive", "Negative", "Neutral"]
		]
	};

	var options = "<ul>";

	var ans = grade.answerValue; //grade = listeningGrade[gradeName];
	var acc = accepted[gradeName][questionIndex];

	//For each question - e.g. B2 q1 -   B2:[ ["tomorrow", "tonight"] ]
	for (var currOptionIndex in alloptions[gradeName][questionIndex]) {


		var className = ""; //correctword or incorrectword
		var tick = ""; // Correct - "<i class='far fa-check-square' aria-hidden='true' style='font-size: 1.5em;'></i>"; or Wrong - "<i class='fa fa-times' aria-hidden='true'  style='color: red; font-size: 1.5em;' ></i>";

		var currOption = alloptions[gradeName][questionIndex][currOptionIndex];

		for (var acIndex in acc) {
			var ac = acc[acIndex];
			if (ac.toLowerCase() == currOption.toLowerCase()) {
				className = "correctword";
				break;
			}
		}

		if (typeof ans == Array) {
			ans = { ans };
		}

		if (acc.length != ans.length && className == "correctword") {
			tick = "<i class='far fa-square' aria-hidden='true' style='color: red; font-size: 1.5em;'></i>";
		}

		for (var currAnswerIndex in ans) {

			var currAnswer = ans[currAnswerIndex];
			if (currAnswer.toLowerCase() == currOption.toLowerCase()) {
				var match = false;
				for (var acIndex in acc) {
					var ac = acc[acIndex];
					if (ac.toLowerCase() == currAnswer.toLowerCase()) {
						className = "correctword";
						tick = "<i class='far fa-check-square' aria-hidden='true' style='font-size: 1.5em;'></i>";
						match = true;
						break;
					}
				}
				if (!match) {
					className = "incorrectword";
					tick = "<i class='fa fa-times' aria-hidden='true'  style='color: red; font-size: 1.5em;' ></i>";
				}
			}
		}


		options += "<li><p class='" + className + "'> " + currOption + "  " + tick + "</p></li>";

	}

	return options + "</ul>";
}

getCutOff = function (level) {
	var cutOff = 100;
	switch (level) {
		case "A2l":
			cutOff = 4;
			break;
		case "A1r":
			cutOff = 3;
			break;
		case "B1l":
			cutOff = 5;
			break;
		case "A2r":
		case "B2l":
		case "C1l":
			cutOff = 4;
			break;
		case "B1r":
		case "B2r":
		case "C1r":
			cutOff = 5;
			break;
		default:
			break;
	}

	return cutOff;
}

setSuggestedLevel = function (answers, section) {

	var passed = [];
	for (var i = 0; i < answers.length; i++) {
		var correct = 0;
		for (var j = 0; j < answers[i].length; j++) {
			if (answers[i][j].correct != null && answers[i][j].correct != 'undefined' && answers[i][j].correct == true) {
				correct++;
			}
		}

		if (section == "Reading") {
			if (answers[i][0].name == "A1") {
				if (correct >= 3) {
					passed.push("A1");
				}
			} else if (answers[i][0].name == "A2") {
				if (correct >= 4) {
					passed.push("A2");
				}
			} else if (correct >= 5) {
				passed.push(answers[i][0].name);
			}
		} else {
			if (answers[i][0].name == "A2") {
				if (correct >= 1) {
					passed.push("A1");
				}
				if (correct >= 4) {
					passed.push("A2");
				}
			} else if (correct >= 4) {
				passed.push(answers[i][0].name);
			}

		}
	}

	if (passed.length < 1) {
		passed.push("Not Attempted");
	}



	if (section == "Reading")
		Session.set("suggestedReadingLevel", passed.pop());
	else
		Session.set("suggestedListeningLevel", passed.pop());
	return;
}


var correctOptions = {
	A2: [
		["false"],
		["false"],
		["false"],
		["true"],
		["false"],
		["true"]
	],
	B1: [
		["kasia has been in scotland for five years", "kasia's father couldn't find a job in poland", "kasia was born in poland"],
		["polish and scottish"],
		["he came in the 1960s"],
		["she came to marry farhana's father"],
		["this is his first time away from lewis", "he doesn't have any brothers or sisters", "he speaks two languages"],
		["he doesn't understand the glasgow dialect"], ["mostly happy"]
	],
	B2: [
		["tonight"],
		["mark thorne film"],
		["no"],
		["she doesn't like car chases"],
		["the new french film"],
		["it sounds a bit heavy"]
	],
	C1: [
		["true"],
		["true"],
		["space tourism"],
		["a radio interview"],
		["positive"],
		["neutral"]
	]
};