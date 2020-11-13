Template.finishBtn.events({
    "click .finishYesButton": function (evt) {
        evt.preventDefault();
        Session.set('dirty', false);
        var answers = [];
        var answerCollector = [];
        var assessmentId = Router.current().params.assessmentid;

        if (Session.get("temp-score") == null || Session.get("temp-score") == 'undefined') {
            Session.set("temp-score", 0);
        }

        var activeSection = Session.get("activeSection");
        console.log("activeSection: " + activeSection);
        if (activeSection.indexOf("Writing") >= 0) {
            activeSection = "Writing";
        } else if (activeSection.indexOf("Listening") >= 0) {
            activeSection = "Listening";
        } else {
            var reading = activeSection.indexOf("r") >= 0;
            //reading = true if in reading section
            activeSection = activeSection.substring(1, 3);

            answers = [
                {
                    name: activeSection
                }
            ];
        }


        /**
            activeSection = A1/A2/B1/B2/C1
            Session activeSection = A1r/A2r/B1r/B2r/C1r/A2l/B1l/B2l/C1l
            reading = reading section
            !reading = listening section
         */

        if (reading && activeSection.length < 4) {
            //Reading
            $('*[data-function="answerBox"]').each(function () {
                var userAnswer = $(this).val();
                if (answers[$(this).attr('id')] == undefined) {
                    answers[$(this).attr('id')] = [];
                }
                var q = $('*[data-questionFor="' + $(this).attr('id') + '"]').html();
                answers.push({
                    "question": q,
                    "answerNumber": $(this).attr('id'),
                    "answerValue": userAnswer
                });
            });
        } else if (!reading && activeSection.length < 4) {
            //Listening
            var tempAnswers = [];


            $('input.listeningInput').each(function () {

                if ($(this).attr('type') == 'checkbox') {
                    // Each Checkbox..
                    if ($(this).is(':checked')) {
                        if (tempAnswers[$(this).attr('name')] == undefined) {
                            tempAnswers[$(this).attr('name')] = [];
                        }
                        tempAnswers[$(this).attr('name')].push($(this).val());
                    } else {
                        if (tempAnswers[$(this).attr('name')] == undefined) {
                            tempAnswers[$(this).attr('name')] = [];
                        }
                        tempAnswers[$(this).attr('name')].push();
                    }
                } else if ($(this).attr('type') == 'radio') {
                    // Each Radio Button..
                    if ($(this).is(':checked')) {
                        if (tempAnswers[$(this).attr('name')] == undefined) {
                            tempAnswers[$(this).attr('name')] = [];
                        }
                        tempAnswers[$(this).attr('name')].push($(this).val());
                    } else {
                        if (tempAnswers[$(this).attr('name')] == undefined) {
                            tempAnswers[$(this).attr('name')] = [];
                        }
                        tempAnswers[$(this).attr('name')].push();
                    }
                }
            });

            for (key in tempAnswers) {
                var q = $('*[data-questionFor="' + key + '"]').html();
                answers.push({
                    "question": q,
                    "answerNumber": key,
                    "answerValue": tempAnswers[key]
                });

            }
        } else {
            // Writing
            if ($('#answerBox').val() == '') {
                alert("You've not entered any words into the answer box!");
                $(".finish").addClass("hidden");
                return false;
            } else {
                answers.push({
                    "answerNumber": Session.get("writing-qnum"),
                    "answerValue": $('#answerBox').val()
                })

                Meteor.call('setTextSectionComplete', assessmentId, "Writing", answers, function (err, result) {
                    if (err) alert(err);
                });
                goToAssessment(assessmentId);
                // return;
            }
        }


        var section = activeSection;

        if (activeSection.length <= 3) {

            var pass = getScoring(activeSection + (reading ? "r" : "l"));

            section = Session.get("activeSection").substring(1, 4);
        }


        Meteor.call('setScoredSectionComplete', assessmentId, section, answers, Session.get("temp-score"), function (err, userScore) {

            if (activeSection.length <= 3) {
                Session.set("temp-score", (Session.get("temp-score") + userScore));

                if (section == "A2l")
                    Session.set("A2lScore", userScore);

                if (activeSection.indexOf("C1") >= 0 && userScore >= 6 || section.indexOf("C1l") >= 0 && userScore >= 5) {
                    //Exceptional score.
                    //Suggest C1+ score for this student!
                    Meteor.call('markAssessmentSection', assessmentId, (reading ? "Reading" : "Listening"), "C1+", function () {
                        goToAssessment(assessmentId);

                    });

                } else if (userScore >= pass) {
                    //User passed with enough points to proceed to next grade (if possible).
                    var nextSection = getNextSection(section);
                    Session.set("activeSection", "#" + nextSection);
                    window.location.hash = "#" + nextSection;

                } else {
                    //User did not pass. Award grade (if such) and go to next section
                    var lowerGrade = getLowerGrade(section);

                    // if (lowerGrade == "N/A") {
                    //     goToAssessment(assessmentId);
                    // } else {
                        Meteor.call('markAssessmentSection', assessmentId, (reading ? "Reading" : "Listening"), (lowerGrade == "N/A" ? "Not Achieved" : lowerGrade) , function (err) {
                            goToAssessment(assessmentId);
                        });
                    // }
                }
            }
        });
    },

    "click .finishNoButton": function (evt) {
        $(".finish").addClass("hidden");
    },
});

Template.finishBtn.helpers({
    Section: function () {
        var section = Session.get("activeSection");
        var activeSection = Session.get("activeSection");
        if (activeSection.length <= 4) {
            if (activeSection.indexOf("r") >= 0) {
                section = "Reading";
            } else {
                section = "Listening";
            }
        } else {
            section = "Writing";
        }

        return section;
    }
});

goToAssessment = function (assessmentId) {
    $(".finish").addClass("hidden");
    $(".sectionFinishDialog").removeClass('hidden');
    $(".sectionFinishDialog").addClass('fadeIn');

    $(".sectionFinishDialog").click(function () {
        $(".sectionFinishDialog").addClass('hidden');
        Session.set("activeSection", "#InitialAssessment");
        Session.set("temp-score", 0);
        Router.go('/assessment/' + assessmentId);
    });
}

getScoring = function (activeSection) {
    var pass = 100;
    switch (activeSection) {
        case "A2l":
            pass = 4;
            break;
        case "A1r":
            pass = 3;
            break;
        case "B1l":
            pass = 5;
            break;
        case "A2r":
        case "B2l":
        case "C1l":
            pass = 4;
            break;
        case "B1r":
        case "B2r":
        case "C1r":
            pass = 5;
            break;
        default:
            break;
    }

    return pass;
}

getLowerGrade = function (section) {

    var activeSection = section.substring(0, 2);

    if (section == "B1l") {
        if (Session.get("A2lScore") < 4)
            return "A1";
        else
            return "A2";
    }

    switch (activeSection) {
        case "A1":
            return "N/A"
        case "A2":
            return "A1"
        case "B1":
            return "A2"
        case "B2":
            return "B1"
        case "C1":
            return "B2"
        default:
            return "N/A";
    }
}

getNextSection = function (activeSection) {
    switch (activeSection) {
        case "A1r":
            return "A2r"
        case "A2r":
            return "B1r"
        case "B1r":
            return "B2r"
        case "B2r":
            return "C1r"
        case "C1r":
            return "N/A"
        case "A2l":
            return "B1l"
        case "B1l":
            return "B2l"
        case "B2l":
            return "C1l"
        case "C1l":
            return "N/A"
        default:
            return "N/A";
    }
}