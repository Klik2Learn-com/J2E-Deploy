Meteor.methods({

	/**
	*	@method: 	assignNewAssessment
	*	@summary: 	This method is used to assign a new assessment to a student.
	*	@requires: 	Currently logged in user is Admin, Moderator or Tutor for the student.
	*
	*/
	'assignNewAssessment': function (studentId, voucher) {
		if (Roles.userIsInRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), 'moderator') || voucher) {
			var role = Meteor.users.findOne({ _id: studentId }).roles[0];
			studentAssessments.insert({
				userId: studentId,
				userRole: role,
				name: "Initial Assessment",
				type: "initial-assessment",
				startDate: null,
				completeDate: null,
				score: null,
				assignedBy: Meteor.userId(),
				pass: null,
				sections: [
					{
						name: "Reading",
						startDate: null,
						completeDate: null,
						score: 0,
						answer: {
							A1r: [
								{
									name: "A1"
								},
								{
									question: "When did the Italians begin to arrive in Scotland?",
									answerNumber: "answer1",
									answerValue: null
								},
								{
									question: "What work did most of them do?",
									answerNumber: "answer2",
									answerValue: null
								},
								{
									question: "What did some do when they made money?",
									answerNumber: "answer3",
									answerValue: null
								},
								{
									question: "What did their child and grandchildren do?",
									answerNumber: "answer4",
									answerValue: null
								},
								{
									question: "Do all Scottish Italians still work in the food and drink business?",
									answerNumber: "answer5",
									answerValue: null
								}
							],
							A2r: [
								{
									name: "A2"
								},
								{
									question: "When did thousand of Polish soldiers and airmen come to Britain?",
									answerNumber: "answer1",
									answerValue: null
								},
								{
									question: "Who controlled Poland after the war?",
									answerNumber: "answer2",
									answerValue: null
								},
								{
									question: "Who did most Polish soldiers and sailors in Britain marry?",
									answerNumber: "answer3",
									answerValue: null
								},
								{
									question: "When did Poland become a member of the European Union?",
									answerNumber: "answer4",
									answerValue: null
								},
								{
									question: "Why did thousands of young people come to Britain?",
									answerNumber: "answer5",
									answerValue: null
								},
								{
									question: "What work did many Poles do at first?",
									answerNumber: "answer6",
									answerValue: null
								},
								{
									question: "Where did they go on to work after this?",
									answerNumber: "answer7",
									answerValue: null
								},
								{
									question: "Have they all returned to Poland?",
									answerNumber: "answer8",
									answerValue: null
								}
							],
							B1r: [
								{
									name: "B1"
								},
								{
									question: "Which job did the first Chinese in Britain do?",
									answerNumber: "answer1",
									answerValue: null
								},
								{
									question: "Which cities did they arrive in?",
									answerNumber: "answer2",
									answerValue: null
								},
								{
									question: "When did this begin to happen?",
									answerNumber: "answer3",
									answerValue: null
								},
								{
									question: "In which century did the first Chinese restaurants open in London?",
									answerNumber: "answer4",
									answerValue: null
								},
								{
									question: "Are many new Chinese restaurants expected to open in the future?",
									answerNumber: "answer5",
									answerValue: null
								},
								{
									question: "Do Chinese families usually live close to each other?",
									answerNumber: "answer6",
									answerValue: null
								},
								{
									question: "What can you find in a Chinatown?",
									answerNumber: "answer7",
									answerValue: null
								},
								{
									question: "Do Chinese people often marry people who are not Chinese?",
									answerNumber: "answer8",
									answerValue: null
								},
								{
									question: "Do a lot of British Chinese work in the restaurant business today?",
									answerNumber: "answer9",
									answerValue: null
								}
							],
							B2r: [
								{
									name: "B2"
								},
								{
									question: "Why do Scotland and Ireland have a great deal of common history?",
									answerNumber: "answer1",
									"answerValue": null
								},
								{
									question: "When did the ‘Scots’ first arrive in Scotland?",
									answerNumber: "answer2",
									answerValue: null
								},
								{
									question: "Did the Highlands become Protestant in the 1560s?",
									answerNumber: "answer3",
									answerValue: null
								},
								{
									question: "Which word in paragraph 2 means ‘connections’?",
									answerNumber: "answer4",
									answerValue: null
								},
								{
									question: "What caused large scale Irish emigration in the 1840s?",
									answerNumber: "answer5",
									answerValue: null
								},
								{
									question: "How many people emigrated?",
									answerNumber: "answer6",
									answerValue: null
								},
								{
									question: "In which Scottish city did many Irish immigrants settle?",
									answerNumber: "answer7",
									answerValue: null
								},
								{
									question: "What issue caused difficulty between the Irish Catholics and the native Scots?",
									answerNumber: "answer8",
									answerValue: null
								},
								{
									question: "Have relation between Protestants and Catholics improved since the 19th century?",
									answerNumber: "answer9",
									answerValue: null
								},
								{
									question: "Which word in paragraph 3 means ‘peacefulness’?",
									answerNumber: "answer10",
									answerValue: null
								}
							],
							C1r: [
								{
									name: "C1"
								},
								{
									question: "What happened to some British sailors on the way to India?",
									answerNumber: "answer1",
									answerValue: null
								},
								{
									question: "What were Indian politicians preparing for before 1947?",
									answerNumber: "answer2",
									answerValue: null
								},
								{
									question: "Did all members of the Indian army return home after the wars?",
									answerNumber: "answer3",
									answerValue: null
								},
								{
									question: "Which exams could Indians only sit in London?",
									answerNumber: "answer4",
									answerValue: null
								},
								{
									question: "Which of these summarises the main reasons for South Asian settlement in Britain in the 19th and early 20th century?",
									answerNumber: "answer5",
									answerValue: null
								},
								{
									question: "When was Pakistan established as a country?",
									answerNumber: "answer6",
									answerValue: null
								},
								{
									question: "Which two of these groups of South Asians came to work in Scotland?",
									answerNumber: "answer7",
									answerValue: null
								},
								{
									question: "Is the whole of the Punjab in modern India?",
									answerNumber: "answer8",
									answerValue: null
								},
								{
									question: "Did the immigration laws stop family members coming to Britain?",
									answerNumber: "answer9",
									answerValue: null
								},
								{
									question: "What word shows that Ugandan Asians did not come to Britain by choice?",
									answerNumber: "answer10",
									answerValue: null
								}
							]
						},
						pass: null
					},
					{
						name: "Writing",
						startDate: null,
						completeDate: null,
						wordLimit: 150,
						score: null,
						answer: null,
						pass: null
					},
					{
						name: "Listening",
						startDate: null,
						completeDate: null,
						score: null,
						playsAllowed: 2,
						answer: {
							A2l: [
								{
									name: "A2"
								},
								{
									question: "Mark lives in a busy road.",
									answerNumber: "answer1",
									answerValue: null
								},
								{
									question: "Mark doesn't like his house.",
									answerNumber: "answer2",
									answerValue: null
								},
								{
									question: "John lives in a house",
									answerNumber: "answer3",
									answerValue: null
								},
								{
									question: "John lives near a school",
									answerNumber: "answer4",
									answerValue: null
								},
								{
									question: "There's a post office near Mark's house.",
									answerNumber: "answer5",
									answerValue: null
								},
								{
									question: "Mark lives near a park.",
									answerNumber: "answer6",
									answerValue: null
								}
							],
							B1l: [
								{
									name: "B1"
								},
								{
									question: "What does Kasia tell Claire?",
									answerNumber: "answer1",
									answerValue: null
								},
								{
									question: "Kasia feels",
									answerNumber: "answer2",
									answerValue: null
								},
								{
									question: "When did Farhana's grandfather come to Scotland?",
									answerNumber: "answer3",
									answerValue: null
								},
								{
									question: "Why did Farhana's mother come to Scotland?",
									answerNumber: "answer4",
									answerValue: null
								},
								{
									question: "What three things does Murdo tell Claire?",
									answerNumber: "answer5",
									answerValue: null
								},
								{
									question: "What does Murdo not understand?",
									answerNumber: "answer6",
									answerValue: null
								},
								{
									question: "How do Kasia, Fahrana and Murdo feel about living in Scotland?",
									answerNumber: "answer7",
									answerValue: null
								}
							],
							B2l: [
								{
									name: "B2"
								},
								{
									question: "When are they planning to go ?",
									answerNumber: "answer1",
									"answerValue": null
								},
								{
									question: "What does Ash wat to see?",
									answerNumber: "answer2",
									answerValue: null
								},
								{
									question: "Does Sal agree?",
									answerNumber: "answer3",
									answerValue: null
								},
								{
									question: "Why doesn't Sal want to see the same movie as Ash?",
									answerNumber: "answer4",
									answerValue: null
								},
								{
									question: "What does she want to see?",
									answerNumber: "answer5",
									answerValue: null
								},
								{
									question: "Why doesn't Ash want to see it?",
									answerNumber: "answer6",
									answerValue: null
								}
							],
							C1l: [
								{
									name: "C1"
								},
								{
									question: "The aviation industry is more positive about the future of space tourism than the space industry. True or False?",
									answerNumber: "answer1",
									answerValue: null
								},
								{
									question: "Space hotels circle the earth every one and half hours. True or False",
									answerNumber: "answer2",
									answerValue: null
								},
								{
									question: "The main topic in this recording is...",
									answerNumber: "answer3",
									answerValue: null
								},
								{
									question: "Where has this recording come from?",
									answerNumber: "answer4",
									answerValue: null
								},
								{
									question: "The man's attitude to space tourism is:",
									answerNumber: "answer5",
									answerValue: null
								},
								{
									question: "The woman's attitude to space tourism is:",
									answerNumber: "answer6",
									answerValue: null
								}
							]
						},
						pass: null
					},
					{
						name: "Speaking",
						startDate: null,
						completeDate: null,
						score: null,
						answer: [],
						pass: null
					}
				]
			}, function (error, result) {
				if (!error) {
					userProgress.update({ userId: studentId },
						{
							$addToSet: {
								assessments: result
							}
						})
				}
			})
		}
	},

	/**
	*	@method: 	assignNewExitTest
	*	@summary: 	This method is used to assign a new exit test to a student.
	*	@requires: 	Currently logged in user is Admin, Moderator or Tutor for the student.
	*
	*/
	'assignNewExitTest': function (studentId, voucher) {
		if (Roles.userIsInRole(Meteor.userId(), 'admin') || Roles.userIsInRole(Meteor.userId(), 'moderator') || voucher) {
			var role = Meteor.users.findOne({ _id: studentId }).roles[0];
			studentAssessments.insert({
				userId: studentId,
				userRole: role,
				name: "Exit Test",
				type: "exit-test",
				startDate: null,
				completeDate: null,
				score: null,
				assignedBy: Meteor.userId(),
				pass: null,
				sections: [
					{
						name: "Reading",
						startDate: null,
						completeDate: null,
						score: 0,
						answer: {
							A1r: [
								{
									name: "A1"
								},
								{
									question: "Who is the postcard from?",
									answerNumber: "answer1",
									answerValue: null
								},
								{
									question: "Why are they in Florida?",
									answerNumber: "answer2",
									answerValue: null
								},
								{
									question: "The hotel is quiet.",
									answerNumber: "answer3",
									answerValue: null
								},
								{
									question: "The food is good.",
									answerNumber: "answer4",
									answerValue: null
								},
								{
									question: "Shopping is cheap",
									answerNumber: "answer5",
									answerValue: null
								},
								{
									question: "The guests like the hotel",
									answerNumber: "answer6",
									answerValue: null
								},
								{
									question: "The weather is",
									answerNumber: "answer7",
									answerValue: null
								},
								{
									question: "The buildings are",
									answerNumber: "answer8",
									answerValue: null
								}
							]
						},
						pass: null
					},
					{
						name: "Writing",
						startDate: null,
						completeDate: null,
						wordLimit: 150,
						score: null,
						answer: null,
						pass: null
					},
					{
						name: "Listening",
						startDate: null,
						completeDate: null,
						score: null,
						playsAllowed: 2,
						answer: {
							A1l: [
								{
									name: "A1"
								},
								{
									question: "The bedroom is big.",
									answerNumber: "answer1",
									answerValue: null
								},
								{
									question: "The window is big.",
									answerNumber: "answer2",
									answerValue: null
								},
								{
									question: "There are two desks.",
									answerNumber: "answer3",
									answerValue: null
								},
								{
									question: "There is a chair.",
									answerNumber: "answer4",
									answerValue: null
								},
								{
									question: "I have a big TV.",
									answerNumber: "answer5",
									answerValue: null
								},
								{
									question: "I have lots of clothes.",
									answerNumber: "answer6",
									answerValue: null
								}
							]
						},
						pass: null
					},
					{
						name: "Speaking",
						startDate: null,
						completeDate: null,
						score: null,
						answer: [],
						pass: null
					}
				]
			}, function (error, result) {
				if (!error) {
					userProgress.update({ userId: studentId },
						{
							$addToSet: {
								assessments: result
							}
						})
				}
			})
		}
	},

	'changeAssessmentSectionMark': function (assessmentId, sectionNo, newMark) {
		obj = {};
		obj["sections." + sectionNo + ".pass"] = newMark;
		studentAssessments.update({ _id: assessmentId }, { $set: obj });
	},

	'changeAssessmentOverallMark': function (assessmentId, newMark) {
		var assessmentDoc = studentAssessments.findOne({ _id: assessmentId });
		var userId = assessmentDoc.userId;
		obj = {};
		obj["pass"] = newMark;
		studentAssessments.update({ _id: assessmentId }, { $set: obj });
		if (newMark == true) {
			Meteor.users.update({ _id: userId }, { $set: { 'authorisedCourses.journey2English': true } });
		} else if (newMark == false) {
			Meteor.users.update({ _id: userId }, { $set: { 'authorisedCourses.journey2English': false } });
		}
	},

	/**
	*	@method: 	setAssessmentStart
	*	@summary: 	This method is used to set a section (and assessment) to started by
	*				setting the startDate to the current date.
	*	@requires: 	Admin or Student who owns this assessment.
	*
	*/
	'setAssessmentStart': function (assessmentId, sectionName) {
		var assessment = studentAssessments.findOne({ _id: assessmentId });
		if (Roles.userIsInRole(Meteor.userId(), 'admin') || (assessment.userId == Meteor.userId())) {
			if (assessment.startDate == null) {
				studentAssessments.update({ _id: assessmentId }, { $set: { startDate: new Date() } })
			}
			for (var i = 0; i < assessment.sections.length; i++) {
				if (assessment.sections[i].name == sectionName) {
					if (assessment.sections[i].startDate == null) {
						studentAssessments.update({ _id: assessmentId, "sections.name": sectionName },
							{
								$set: {
									"sections.$.startDate": new Date()
								}
							})
					}
				}
			}
		} else {
			throw new Meteor.Error("Unauthorised attempt to edit studentAssessment doc.");
		}
	},

	/**
	*	@method: 	setScoredSectionComplete
	*	@summary: 	This method is used to set a section (and assessment) as completed by
	*				setting the dateComplete to the current date. In a Scored Section the answers
	*				should be auto-checked by the system, and a score automatically returned.
	*
	*	@requires: Admin or Student who owns this assessment.
	*
	*/
	'setScoredSectionComplete': function (assessmentId, sectionName, userAnswers, currentScore) {
		var assessment = studentAssessments.findOne({ _id: assessmentId });
		if (Roles.userIsInRole(Meteor.userId(), 'admin') || (assessment.userId == Meteor.userId())) {
			for (var i = 0; i < assessment.sections.length; i++) {
				var section = getSection(sectionName);
				if (assessment.sections[i].name == section) {
					if (assessment.sections[i].startDate != null && assessment.sections[i].completeDate == null && assessment.completeDate == null) {
						var score = checkAnswers(assessment.type, sectionName, userAnswers);
						var finalscore = (finalScore(score, sectionName)) ? (score + currentScore) : 0;
						updateAnswers(assessmentId, userAnswers, sectionName, section, finalScore(score, sectionName), finalscore);
						return score;

					}
					return (score) ? score : null;
				}
			}
		} else {
			throw new Meteor.Error("Unauthorised attempt to edit studentAssessment doc.");
		}
	},

	/**
	*	@method: 	setTextSectionComplete
	*	@summary: 	This method is used to set a section (and assessment) as completed by
	*				setting the dateComplete to the current date. A Text section is one in which
	*				the user submits a body of text which must be manually checked by a tutor.
	*
	*	@requires: Admin or Student who owns this assessment.
	*
	*/
	'setTextSectionComplete': function (assessmentId, sectionName, userAnswers) {
		var assessment = studentAssessments.findOne({ _id: assessmentId });
		if (Roles.userIsInRole(Meteor.userId(), 'admin') || (assessment.userId == Meteor.userId())) {
			for (var i = 0; i < assessment.sections.length; i++) {
				if (assessment.sections[i].name == sectionName) {
					var wordCount = wordCountParser(userAnswers[0].answerValue);
					if (wordCount.words > assessment.sections[i].wordLimit) {
						throw new Meteor.Error("Word Count Exceeded. Please ensure your submission is " + assessment.sections[i].wordLimit + " words or less.");
					}
					if (assessment.sections[i].startDate != null && assessment.sections[i].completeDate == null && assessment.completeDate == null) {
						var doc = studentAssessments.update({ _id: assessmentId, "sections.name": sectionName },
							{
								$set: {
									"sections.$.completeDate": new Date(),
									"sections.$.answer": userAnswers
								}
							})
						var doc = studentAssessments.findOne({ _id: assessmentId });
						if (checkAllSectionsFinished(doc)) {
							studentAssessments.update({ _id: assessmentId },
								{
									$set: {
										"completeDate": new Date()
									}
								})
						}
					} else {
						throw new Meteor.Error("Error: This section has already been completed.");
					}
					return
				}
			}
		} else {
			throw new Meteor.Error("Unauthorised attempt to edit studentAssessment doc.");
		}
	},

	/**
	*	@method: 	setSectionComplete
	*	@summary: 	This method is used to set a section (and assessment) as completed by
	*				setting the dateComplete to the current date. It does not set a score.
	*
	*	@requires: Admin or Student who owns this assessment.
	*
	*/
	'setSectionComplete': function (user, assessmentId, sectionName) {
		// Check the assessment section has started. If it has, set it to completed.
		var assessment = studentAssessments.findOne({ _id: assessmentId, userId: user });
		if (Roles.userIsInRole(Meteor.userId(), 'admin') || (assessment.userId == Meteor.userId())) {
			for (var i = 0; i < assessment.sections.length; i++) {
				if (assessment.sections[i].name == sectionName) {
					if (assessment.sections[i].startDate != null && assessment.sections[i].completeDate == null && assessment.completeDate == null) {
						studentAssessments.update({ _id: assessmentId, "sections.name": sectionName },
							{
								$set: { "sections.$.completeDate": new Date() }
							})
					} else {
						throw new Meteor.Error("Error: This section has already been completed.");
					}
					var doc = studentAssessments.findOne({ _id: assessmentId });
					if (checkAllSectionsFinished(doc)) {
						studentAssessments.update({ _id: assessmentId },
							{
								$set: {
									"completeDate": new Date()
								}
							})
					}
				}
			}
		} else {
			throw new Meteor.Error("Unauthorised attempt to edit studentAssessment doc.");
		}
	},

	'markAssessmentSection': function (assessmentId, sectionName, result) {
		var validResults = [
			"Not Attempted", "Not Marked", "Not Achieved", "A1", "A2", "B1", "B2", "C1", "C1+"
		];

		if (validResults.indexOf(result) >= 0) {
			studentAssessments.update({ _id: assessmentId, "sections.name": sectionName }, { $set: { "sections.$.pass": result } });
		} else {
			throw new Meteor.Error("Error: Invalid mark for Initial Assessment");
		}
		/*
				if (result == "Not Attempted") {
					studentAssessments.update({ _id: assessmentId, "sections.name": sectionName },
						{
							$set: { "sections.$.pass": "Not Attempted" }
						})
				} else if (result == "A1") {
					studentAssessments.update({ _id: assessmentId, "sections.name": sectionName },
						{
							$set: { "sections.$.pass": "A1" }
						})
				} else if (result == "A2") {
					studentAssessments.update({ _id: assessmentId, "sections.name": sectionName },
						{
							$set: { "sections.$.pass": "A2" }
						})
				} else if (result == "B1") {
					studentAssessments.update({ _id: assessmentId, "sections.name": sectionName },
						{
							$set: { "sections.$.pass": "B1" }
						})
				} else if (result == "B2") {
					studentAssessments.update({ _id: assessmentId, "sections.name": sectionName },
						{
							$set: { "sections.$.pass": "B2" }
						})
				} else if (result == "C1") {
					studentAssessments.update({ _id: assessmentId, "sections.name": sectionName },
						{
							$set: { "sections.$.pass": "C1" }
						})
				} else if (result == "Not Marked") {
					studentAssessments.update({ _id: assessmentId, "sections.name": sectionName },
						{
							$set: { "sections.$.pass": "Not Marked" }
						})
				} else if (result == "C1+") {
					studentAssessments.update({ _id: assessmentId, "sections.name": sectionName },
						{
							$set: { "sections.$.pass": "C1+" }
						})
				} else {
					throw new Meteor.Error("Error: Invalid mark for Initial Assessment");
				}
				*/
	},

	'markAssessment': function (assessmentId, result) {
		// Need to restrict this to authorised users (admins & appropriate tutors, mods)
		var assessmentDoc = studentAssessments.findOne({ _id: assessmentId });
		var validResults = [
			"Not Attempted", "Not Achieved", "A1", "A2", "B1", "B2", "C1", "C1+"
		];

		if (validResults.indexOf(result) >= 0) {
			studentAssessments.update({ _id: assessmentId }, { $set: { "pass": result } });
		} else {
			throw new Meteor.Error("Error: Invalid mark for Initial Assessment");
		}

		/*
		if (result == "Not Attempted") {
			studentAssessments.update({ _id: assessmentId },
				{
					$set: { "pass": "Not Attempted" }
				})
		} else if (result == "Not Achieved") {
			studentAssessments.update({ _id: assessmentId },
				{
					$set: { "pass": "Not Achieved" }
				})
		} else if (result == "A1") {
			studentAssessments.update({ _id: assessmentId },
				{
					$set: { "pass": "A1" }
				})
		} else if (result == "A2") {
			studentAssessments.update({ _id: assessmentId },
				{
					$set: { "pass": "A2" }
				})
		} else if (result == "B1") {
			studentAssessments.update({ _id: assessmentId },
				{
					$set: { "pass": "B1" }
				})
		} else if (result == "B2") {
			studentAssessments.update({ _id: assessmentId },
				{
					$set: { "pass": "B2" }
				})
		} else if (result == "C1") {
			studentAssessments.update({ _id: assessmentId },
				{
					$set: { "pass": "C1" }
				})
		} else if (result == "C1+") {
			studentAssessments.update({ _id: assessmentId },
				{
					$set: { "pass": "C1+" }
				})
		}*/

	},

	'sendPassedAssessmentEmail': function (userId, tutorId) {
		// Send the email
		var userDoc = Meteor.users.findOne({ _id: userId });
		if (userDoc.emails && userDoc.emails[0].address) {
			var userEmail = userDoc.emails[0].address;
			var emailSubject = "Your English Skills Test has been marked";
			var emailContent = '<table cellpadding="0" cellspacing="0" border="0" style="background-color: #edf4ff; border-width: 0; max-width: 640px; margin-left: auto; margin-right: auto;"><tr><td style="margin: 0; padding: 0;"><img src="http://www.klik2learn.com/wp-content/uploads/2016/07/email_jte_logo.jpg" style="max-width: 100%;" alt="Journey to English"></td></tr><tr><td style="margin: 0; padding: 1em;"><h1 style="color: #42b677; text-align: center; font-family: sans-serif;">Your English Skills Test has been marked</h1><p style="font-family: sans-serif;">To find out your results go to your account and select "Assessments"</p><p style="text-align: center;"><img src="http://www.klik2learn.com/wp-content/uploads/2018/04/account-assessment.png" alt="Account &gt; Assessments"></p><p style="font-family: sans-serif;">You can now continue with the Journey 2 English course. There is roughly 40 hours of learning, after which you may be invited to take the English Skills Test again to see how you have improved.</p><p style="font-family: sans-serif; text-align: center;">Good luck with your studies.</p><p style=text-align:center> Work hard and you will receive a certificate after completing 80% of the course. </p><p style="font-family: sans-serif; text-align: center;">The Journey 2 English team</p><p style="text-align: center;"><a href="http://www.klik2learn.com"><img src="http://www.klik2learn.com/wp-content/uploads/2016/10/header-logo.png" width="100" height="100" alt="Klik2learn"></a></p></td></tr></table>'
			Email.send({
				to: userEmail,
				from: "Journey 2 English",
				subject: emailSubject,
				html: emailContent
			});
		}
	},

	'sendFailAssessmentEmail': function (userId, tutorId) {
		// Send the email
		var userDoc = Meteor.users.findOne({ _id: userId });
		if (userDoc.emails && userDoc.emails[0].address) {
			var userEmail = userDoc.emails[0].address;
			var emailSubject = "Your English Skills Test has been marked";
			var emailContent = '<table cellpadding="0" cellspacing="0" border="0" style="background-color: #edf4ff; border-width: 0; max-width: 640px; margin-left: auto; margin-right: auto;"><tr><td style="margin: 0; padding: 0;"><img src="http://www.klik2learn.com/wp-content/uploads/2016/07/email_jte_logo.jpg" style="max-width: 100%;" alt="Journey to English"></td></tr><tr><td style="margin: 0; padding: 1em;"><h1 style="color: #42b677; text-align: center; font-family: sans-serif;">Your English Skills Test has been marked</h1><p style="font-family: sans-serif;">To find out your results go to your account and select "Assessments"</p><p style="text-align: center;"><img src="http://www.klik2learn.com/wp-content/uploads/2018/04/account-assessment.png" alt="Account &gt; Assessments"></p><p style="font-family: sans-serif;">You can now continue with the Journey 2 English course. There is roughly 40 hours of learning, after which you may be invited to take the English Skills Test again to see how you have improved.</p><p style="font-family: sans-serif; text-align: center;">Good luck with your studies.</p><p style=text-align:center> Work hard and you will receive a certificate after completing 80% of the course.</p><p style="font-family: sans-serif; text-align: center;">The Journey 2 English team</p><p style="text-align: center;"><a href="http://www.klik2learn.com"><img src="http://www.klik2learn.com/wp-content/uploads/2016/10/header-logo.png" width="100" height="100" alt="Klik2learn"></a></p></td></tr></table>';
			Email.send({
				to: userEmail,
				from: "Journey 2 English",
				subject: emailSubject,
				html: emailContent
			});
		}
	},

	/**
	*	@method: 	handleAssessmentDisconnect
	*	@summary: 	This method is used to set a section (and assessment) as completed by
	*				setting the dateComplete to the current date. It is called when the user disconnects
	*				when completed an assessment.
	*
	*	@requires: Admin or Student who owns this assessment.
	*
	*/
	'handleAssessmentDisconnect': function (user, assessmentId, sectionName) {
		// Check the assessment section has started. If it has, set it to completed.
		var doc = studentAssessments.findOne({ _id: assessmentId });
		for (var i = 0; i < doc.sections.length; i++) {
			if (doc.sections[i].name == sectionName) {
				if (doc.sections[i].startDate != null && doc.sections[i].completeDate == null) {
					studentAssessments.update({ _id: assessmentId, "sections.name": sectionName },
						{
							$set: { "sections.$.completeDate": new Date() }
						})
				}
			}
		}
		var updatedDoc = studentAssessments.findOne({ _id: assessmentId });
		if (checkAllSectionsFinished(updatedDoc)) {
			studentAssessments.update({ _id: assessmentId },
				{
					$set: {
						"completeDate": new Date()
					}
				})
		}
	},

	'addAssessmentAudio': function (fileId, assessmentId, sectionName, answerNumber, question) {
		var assessment = studentAssessments.findOne({ _id: assessmentId });
		if (Meteor.userId()) {
			for (var i = 0; i < assessment.sections.length; i++) {
				if (assessment.sections[i].name == sectionName) {
					if (assessment.sections[i].startDate != null && assessment.sections[i].completeDate == null) {
						var answerObj = {
							"question": question,
							"answerNumber": answerNumber,
							"answerId": fileId
						};
						studentAssessments.update({ _id: assessmentId, "sections.name": sectionName },
							{
								$addToSet: {
									"sections.$.answer": answerObj
								}
							})
					}
					return;
				}
			}
		}
	},

	'resetAssessment': function (uId) {
		studentAssessments.remove({ userId: uId });
		Meteor.call('assignNewAssessment', uId, false);
	}

})

function checkAllSectionsFinished(assessmentDoc) {
	var sections = assessmentDoc.sections;
	var finished = true;
	for (var i = 0; i < sections.length; i++) {
		if (sections[i].completeDate == null) {
			finished = false;
		}
	}
	return finished;
}

function getSection(sectionName) {
	if (sectionName.length < 4) {
		return (sectionName.indexOf("r") >= 0) ? "Reading" : "Listening";
	} else {
		return sectionName;
	}
}

function finalScore(score, sectionName) {
	var pass = 100;
	switch (sectionName) {
		case "A2l":
			pass = 4;
			break;
		case "A1r":
		case "B1l":
			pass = 3;
			break;
		case "A2r":
		case "B2l":
			pass = 4;
			break;
		case "B1r":
		case "B2r":
			pass = 5;
			break;
		case "C1r":
		case "C1l":
			return true;
		default:
			break;
	}

	return score < pass;
}

function checkAnswers(assessmentType, sectionName, userAnswers) {
	assessmentType = "initialAssessment"; // TEMP SOLN
	var assessmentAnswers = {
		initialAssessment: {
			A1r: {
				answer1: ["after 1870"],
				answer2: ["sold ice cream"],
				answer3: ["opened cafes"],
				answer4: ["opened italian restaurants"],
				answer5: ["no"]
			},

			A2r: {
				answer1: ["world war 2", "world war two", "world war II"],
				answer2: ["soviet union"],
				answer3: ["local women"],
				answer4: ["2004"],
				answer5: ["find work", "get jobs"],
				answer6: ["on farms", "picking crops", "in farms", "in farming", "on farms picking crops", "in farms picking crops"],
				answer7: ["bars and restaurants", "restaurants and bars"],
				answer8: ["no"]
			},

			B1r: {
				answer1: ["sailors"],
				answer2: ["london, cardiff and liverpool", "london, liverpool and cardiff", "cardiff, london and liverpool", "cardiff, liverpool and london", "liverpool, cardiff and london", "liverpool, london and cardiff", "london cardiff liverpool", "london liverpool cardiff", "cardiff london liverpool", "cardiff liverpool london", "liverpool cardiff london", "liverpool london cardiff"],
				answer3: ["early 1800s"],
				answer4: ["20th"],
				answer5: ["no"],
				answer6: ["no"],
				answer7: ["chinese shops and restaurants", "chinese foods and goods"],
				answer8: ["yes"],
				answer9: ["yes"]
			},

			B2r: {
				answer1: ["12 miles apart", "twelve miles apart", "12 miles away", "twelve miles away"],
				answer2: ["5th century", "the 5th century"],
				answer3: ["no"],
				answer4: ["links"],
				answer5: ["famine"],
				answer6: ["a million", "one million", "1 million"],
				answer7: ["glasgow"],
				answer8: ["jobs", "pay", "work", "low rates of pay", "lower rates of pay"],
				answer9: ["yes"],
				answer10: ["harmony"]
			},

			C1r: {
				answer1: ["died", "were killed"],
				answer2: ["independence"],
				answer3: ["no"],
				answer4: ["civil service", "indian civil service"],
				answer5: ["b"],
				answer6: ["1947"],
				answer7: ["a,c", "c,a"],
				answer8: ["no"],
				answer9: ["no"],
				answer10: ["expelled"]
			},


			A2l: {
				q1: ["false"],
				q2: ["false"],
				q3: ["false"],
				q4: ["true"],
				q5: ["false"],
				q6: ["true"]
			},

			B1l: {
				q1: ["kasia has been in scotland for five years",
					"kasia's father couldn't find a job in poland",
					"kasia was born in poland"],
				q2: ["polish and scottish"],
				q3: ["he came in the 1960s"],
				q4: ["she came to marry farhana's father"],
				q5: ["this is his first time away from lewis",
					"he doesn't have any brothers or sisters",
					"he speaks two languages"],
				q6: ["he doesn't understand the glasgow dialect"],
				q7: ["mostly happy"]
			},

			B2l: {
				q1: ["tonight"],
				q2: ["mark thorne film"],
				q3: ["no"],
				q4: ["she doesn't like car chases"],
				q5: ["the new french film"],
				q6: ["it sounds a bit heavy"]
			},

			C1l: {
				q1: ["true"],
				q2: ["true"],
				q3: ["space tourism"],
				q4: ["a radio interview"],
				q5: ["positive"],
				q6: ["neutral"]
			}
		}
	}
	if (userAnswers == null) {
		return null;
	} else {
		var assessment = assessmentAnswers[assessmentType]
		var assessmentTemp = assessment[sectionName];
		var score = 0;

		for (var i = 1; i < userAnswers.length; i++) {
			if (userAnswers[i].answerValue == null || userAnswers[i].answerValue == 'undefined' || userAnswers[i].answerValue.length < 1) {
				userAnswers[i].correct = false;
				continue;
			}

			if (typeof userAnswers[i].answerValue == "string") {

				var formatAnswer = userAnswers[i].answerValue.toLowerCase();
				formatAnswer = formatAnswer.trim();
				var acceptedAnswer = assessmentTemp[userAnswers[i].answerNumber];

				for (var k = 0; k < acceptedAnswer.length; k++) {
					if (allowedAnswer(acceptedAnswer[k], formatAnswer)) {
						score++;
						userAnswers[i].correct = true;
						break;
					} else {
						userAnswers[i].correct = false;
					}
				}

			} else if (userAnswers[i].answerValue.constructor === Array) {
				//The user answer is an array - Listening Section
				userAnswers[i].correct = false;

				if (userAnswers[i] == null || userAnswers[i] == 'undefined' || userAnswers[i].answerValue == null || userAnswers[i].answerValue == 'undefined') {
					continue;
				}

				for (var j = 0; j < userAnswers[i].answerValue.length; j++) {
					var Answer = userAnswers[i].answerValue[j];
					var question = assessmentTemp[userAnswers[i].answerNumber];

					var wrong = true;
					for (var x = 0; x < question.length; x++) {
						if (allowedAnswer(question[x], Answer)) {
							wrong = false;
							//The answer matches one of the acceppted answers so go to the next answer
							break;
						}
					}
					if (wrong) {
						userAnswers[i].correct = false;
						j = userAnswers[i].answerValue.length + 1;
						//i++;
					}
				}
				//The answer is correct so increase the score and go to the next question
				if (!wrong) {
					userAnswers[i].correct = true;
					score++;
				}
			}

		}
		return score;
	}
}

function wordCountParser(val) {
	var wom = val.match(/\S+/g);
	return {
		charactersNoSpaces: val.replace(/\s+/g, '').length,
		characters: val.length,
		words: wom ? wom.length : 0,
		lines: val.split(/\r*\n/).length
	};
}

allowedAnswer = function (correct, uans) {
	correct = correct.toLowerCase();
	uans = uans.toLowerCase();
	if (correct.length >= 3 && correct.length <= 5) {
		return hamming_distance(uans, correct) >= 0 && hamming_distance(uans, correct) <= 1;
	} else if (correct.length >= 6 && correct.length <= 10) {
		return hamming_distance(uans, correct) >= 0 && hamming_distance(uans, correct) <= 2;
	} else if (correct.length >= 11) {
		return hamming_distance(uans, correct) >= 0 && hamming_distance(uans, correct) <= 3;
	} else {
		return correct == uans;
	}
}


/*
 *
 * Calculates the hamming distance between two strings
 * (operations needed to transform string a to string b).
 * 
 */
hamming_distance = function (a, b) {
	var prim = "",
		sec = "",
		len = 0,
		dist = 0;

	//If null, undefined or empty string, return error value
	if (a == null || b == null || a == "undefined" || b == "undefined" || a.length < 1 || b.length < 1) {
		return -1;
	}

	//Decide which string is the "primary"
	if (a.length > b.length) {
		prim = a;
		sec = b;
	} else {
		prim = b;
		sec = a;
	}

	//For each character of the "primary" string, compare it with the "secondary" and increase
	//The total distance on the way.
	for (var i = 0; i < prim.length; i++) {
		//The second string still has characters left
		if (sec[i]) {
			//Characters are the same so continue to the next one
			if (prim[i] == sec[i])
				continue;

			//Check for fat-fingered letter.
			var temp = prim.substring(0, i) + prim.substring((i + 1), prim.length);
			if (sec == temp)
				return 1;
		}

		dist++;
	}

	return dist;

}


updateAnswers = function (assessmentId, answers, sectionName, section, sectionComplete, score) {
	var obj = {};

	if (sectionComplete) {
		obj["sections.$.completeDate"] = new Date();
		obj["sections.$.score"] = score;
	}


	if (sectionName.length < 4)
		obj["sections.$.answer." + sectionName] = answers;
	else
		obj["sections.$.answer"] = answers;


	studentAssessments.update({ _id: assessmentId, "sections.name": section }, { $set: obj });

	if (sectionComplete) {
		var doc = studentAssessments.findOne({ _id: assessmentId });
		if (checkAllSectionsFinished(doc)) {
			studentAssessments.update({ _id: assessmentId },
				{
					$set: {
						"completeDate": new Date()
					}
				})
		}
	}
}