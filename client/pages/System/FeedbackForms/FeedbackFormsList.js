Template.adminFeedbackList.created = function(){
	this.subscribe('feedback_forms');
};

Template.adminFeedbackList.rendered = function(){
	
    document.title = "Feedback forms list - Journey 2 English";
    var unit = null;
    var question = null;
    
};

Template.adminFeedbackList.events({

    'click .commentsButtons': function (evt) {
        var source = event.target.id;
       // console.log(source);
        if (source == "u1q1comments") {
            var unit = 1;
            var question = 1;
            Session.set("unit", unit);
            Session.set("question", question);
        }
        if (source == "u1q2comments") {
            var unit = 1;
            var question = 2;
            Session.set("unit", unit);
            Session.set("question", question);
        }
        if (source == "u1q3comments") {
            var unit = 1;
            var question = 3;
            Session.set("unit", unit);
            Session.set("question", question);
        }
        if (source == "u1q4comments") {
            var unit = 1;
            var question = 4;
            Session.set("unit", unit);
            Session.set("question", question);
        }
        if (source == "u1q5comments") {
            var unit = 1;
            var question = 5;
            Session.set("unit", unit);
            Session.set("question", question);
        }
        if (source == "u2q1comments") {
            var unit = 2;
            var question = 1;
            Session.set("unit", unit);
            Session.set("question", question);
        }
        if (source == "u2q2comments") {
            var unit = 2;
            var question = 2;
            Session.set("unit", unit);
            Session.set("question", question);
        }
        if (source == "u2q3comments") {
            var unit = 2;
            var question = 3;
            Session.set("unit", unit);
            Session.set("question", question);
        }
        if (source == "u2q4comments") {
            var unit = 2;
            var question = 4;
            Session.set("unit", unit);
            Session.set("question", question);
        }
        if (source == "u2q5comments") {
            var unit = 2;
            var question = 5;
            Session.set("unit", unit);
            Session.set("question", question);
        }

       // console.log("unit: " + unit);
        //console.log("question: " + question);

        $("#commentsModal").modal();

    },

    'change #unit-select': function (evt) {
        evt.preventDefault();
        var selected = $('#unit-select').val();
        if (selected == 'unit-1') {
            $('#feedbackFormsListTable1').removeClass('hidden');
            $('#feedbackFormsListTable2').addClass('hidden');
            Session.set("unit", 1);
        } else if (selected == 'unit-2') {
            $('#feedbackFormsListTable2').removeClass('hidden');
            $('#feedbackFormsListTable1').addClass('hidden');
            Session.set("unit", 2);
        }
	},

});

Template.adminFeedbackList.helpers({

    questionNumber: function () {
        var question = Session.get("question");
        return question;
    },

    getComments: function () {
        var unit = Session.get("unit");
        var unitString = unit.toString();
        var question = Session.get("question");
        var questionString = question.toString();
        var unitName = "Unit " + unitString;
        var questionNumber = "unit" + unitString + "Question" + questionString + "Comment";

        var feedback = feedback_forms.find({name: unitName});
        var commentsArray = [];

        feedback.forEach(function(f){
            //console.log(f.comments[questionNumber]);
            if (f.comments[questionNumber] != '' && typeof f.comments[questionNumber] != "undefined") {
                commentsArray.push(f.comments[questionNumber]);
            }
        })
        
        // for (var i = 0; i <= commentsArray.length; i++) {
        //     console.log("Comments array el: " + commentsArray[i]);
        // }

        if (commentsArray.length == 0) {
            commentsArray.push("No comments yet");
        }

        //console.log("commentsArray: " + commentsArray);
        return commentsArray;
    },

    calculatePercentage: function (unit, question, score) {
        //console.log("Passed args: " + unit + ", " + question + ", " + score);
        var unitString = unit.toString();
        var unitName = "Unit " + unitString;
        var questionString = question.toString();
        var questionNumber = "unit" + unitString + "Question" + questionString;
        //console.log("questionNumber " + questionNumber);
        var scoreString = score.toString();
        //console.log("scoreString: " + scoreString);

        
        var total = feedback_forms.find({name: unitName}, {questionNumber: 1}).count();

        if (total == 0) {
            return 0;
        }

        //var count = feedback_forms.find({name: unitName, questionNumber: scoreString}, {scores: 1}).count();
        var feedbackForms = feedback_forms.find({name: unitName});
        var count = 0;
        feedbackForms.forEach(function(form){
            if(form.scores[questionNumber] == scoreString)
                count++;
        })
        //console.log(count);

        var percentage = Math.floor((count*100)/total);
        //console.log("%: " + percentage);
        
        return percentage;
    },

    // UNIT 1
    // Question 1
    countU1Q1score5: function () {
        return feedback_forms.find({name: "Unit 1", "scores.unit1Question1": "5"}, {scores: 1}).count();
    },

    countU1Q1score4: function () {
        return feedback_forms.find({name: "Unit 1", "scores.unit1Question1": "4"}, {scores: 1}).count();
    },

    countU1Q1score3: function () {
        return feedback_forms.find({name: "Unit 1", "scores.unit1Question1": "3"}, {scores: 1}).count();
    },

    countU1Q1score2: function () {
        return feedback_forms.find({name: "Unit 1", "scores.unit1Question1": "2"}, {scores: 1}).count();
    },

    countU1Q1score1: function () {
        return feedback_forms.find({name: "Unit 1", "scores.unit1Question1": "1"}, {scores: 1}).count();
    },

    // Question 2
    countU1Q2score5: function () {
        return feedback_forms.find({name: "Unit 1", "scores.unit1Question2": "5"}, {scores: 1}).count();
    },

    countU1Q2score4: function () {
        return feedback_forms.find({name: "Unit 1", "scores.unit1Question2": "4"}, {scores: 1}).count();
    },

    countU1Q2score3: function () {
        return feedback_forms.find({name: "Unit 1", "scores.unit1Question2": "3"}, {scores: 1}).count();
    },

    countU1Q2score2: function () {
        return feedback_forms.find({name: "Unit 1", "scores.unit1Question2": "2"}, {scores: 1}).count();
    },

    countU1Q2score1: function () {
        return feedback_forms.find({name: "Unit 1", "scores.unit1Question2": "1"}, {scores: 1}).count();
    },

    // Question 3
    countU1Q3score5: function () {
        return feedback_forms.find({name: "Unit 1", "scores.unit1Question3": "5"}, {scores: 1}).count();
    },

    countU1Q3score4: function () {
        return feedback_forms.find({name: "Unit 1", "scores.unit1Question3": "4"}, {scores: 1}).count();
    },

    countU1Q3score3: function () {
        return feedback_forms.find({name: "Unit 1", "scores.unit1Question3": "3"}, {scores: 1}).count();
    },

    countU1Q3score2: function () {
        return feedback_forms.find({name: "Unit 1", "scores.unit1Question3": "2"}, {scores: 1}).count();
    },

    countU1Q3score1: function () {
        return feedback_forms.find({name: "Unit 1", "scores.unit1Question3": "1"}, {scores: 1}).count();
    },

    // Question 4
    countU1Q4score5: function () {
        return feedback_forms.find({name: "Unit 1", "scores.unit1Question4": "5"}, {scores: 1}).count();
    },

    countU1Q4score4: function () {
        return feedback_forms.find({name: "Unit 1", "scores.unit1Question4": "4"}, {scores: 1}).count();
    },

    countU1Q4score3: function () {
        return feedback_forms.find({name: "Unit 1", "scores.unit1Question4": "3"}, {scores: 1}).count();
    },

    countU1Q4score2: function () {
        return feedback_forms.find({name: "Unit 1", "scores.unit1Question4": "2"}, {scores: 1}).count();
    },

    countU1Q4score1: function () {
        return feedback_forms.find({name: "Unit 1", "scores.unit1Question4": "1"}, {scores: 1}).count();
    },

    // Question 5
    countU1Q5Yes: function () {
        return feedback_forms.find({name: "Unit 1", "scores.unit1Question5": "yes"}, {scores: 1}).count();
    },

    countU1Q5No: function () {
        return feedback_forms.find({name: "Unit 1", "scores.unit1Question5": "no"}, {scores: 1}).count();
    },

    // UNIT 2
    // Question 1
    countU2Q1score5: function () {
        return feedback_forms.find({name: "Unit 2", "scores.unit2Question1": "5"}, {scores: 1}).count();
    },

    countU2Q1score4: function () {
        return feedback_forms.find({name: "Unit 2", "scores.unit2Question1": "4"}, {scores: 1}).count();
    },

    countU2Q1score3: function () {
        return feedback_forms.find({name: "Unit 2", "scores.unit2Question1": "3"}, {scores: 1}).count();
    },

    countU2Q1score2: function () {
        return feedback_forms.find({name: "Unit 2", "scores.unit2Question1": "2"}, {scores: 1}).count();
    },

    countU2Q1score1: function () {
        return feedback_forms.find({name: "Unit 2", "scores.unit2Question1": "1"}, {scores: 1}).count();
    },

    // Question 2
    countU2Q2score5: function () {
        return feedback_forms.find({name: "Unit 2", "scores.unit2Question2": "5"}, {scores: 1}).count();
    },

    countU2Q2score4: function () {
        return feedback_forms.find({name: "Unit 2", "scores.unit2Question2": "4"}, {scores: 1}).count();
    },

    countU2Q2score3: function () {
        return feedback_forms.find({name: "Unit 2", "scores.unit2Question2": "3"}, {scores: 1}).count();
    },

    countU2Q2score2: function () {
        return feedback_forms.find({name: "Unit 2", "scores.unit2Question2": "2"}, {scores: 1}).count();
    },

    countU2Q2score1: function () {
        return feedback_forms.find({name: "Unit 2", "scores.unit2Question2": "1"}, {scores: 1}).count();
    },

    // Question 3
    countU2Q3score5: function () {
        return feedback_forms.find({name: "Unit 2", "scores.unit2Question3": "5"}, {scores: 1}).count();
    },

    countU2Q3score4: function () {
        return feedback_forms.find({name: "Unit 2", "scores.unit2Question3": "4"}, {scores: 1}).count();
    },

    countU2Q3score3: function () {
        return feedback_forms.find({name: "Unit 2", "scores.unit2Question3": "3"}, {scores: 1}).count();
    },

    countU2Q3score2: function () {
        return feedback_forms.find({name: "Unit 2", "scores.unit2Question3": "2"}, {scores: 1}).count();
    },

    countU2Q3score1: function () {
        return feedback_forms.find({name: "Unit 2", "scores.unit2Question3": "1"}, {scores: 1}).count();
    },

    // Question 4
    countU2Q4score5: function () {
        return feedback_forms.find({name: "Unit 2", "scores.unit2Question4": "5"}, {scores: 1}).count();
    },

    countU2Q4score4: function () {
        return feedback_forms.find({name: "Unit 2", "scores.unit2Question4": "4"}, {scores: 1}).count();
    },

    countU2Q4score3: function () {
        return feedback_forms.find({name: "Unit 2", "scores.unit2Question4": "3"}, {scores: 1}).count();
    },

    countU2Q4score2: function () {
        return feedback_forms.find({name: "Unit 2", "scores.unit2Question4": "2"}, {scores: 1}).count();
    },

    countU2Q4score1: function () {
        return feedback_forms.find({name: "Unit 2", "scores.unit2Question4": "1"}, {scores: 1}).count();
    },

    // Question 5
    countU2Q5score5: function () {
        return feedback_forms.find({name: "Unit 2", "scores.unit2Question5": "5"}, {scores: 1}).count();
    },

    countU2Q5score4: function () {
        return feedback_forms.find({name: "Unit 2", "scores.unit2Question5": "4"}, {scores: 1}).count();
    },

    countU2Q5score3: function () {
        return feedback_forms.find({name: "Unit 2", "scores.unit2Question5": "3"}, {scores: 1}).count();
    },

    countU2Q5score2: function () {
        return feedback_forms.find({name: "Unit 2", "scores.unit2Question5": "2"}, {scores: 1}).count();
    },

    countU2Q5score1: function () {
        return feedback_forms.find({name: "Unit 2", "scores.unit2Question5": "1"}, {scores: 1}).count();
    },
    
});

var getUnitNumber = function() {
    var unit = Session.get("unit");
    if (unit == 1) {
        return "1";
    } else if (unit == 2) {
        return "2";
    }
}

/**
 * WIP to be used when improving the feedback forms system
 */
var feedbackForms = function() {
    var unit = Session.get("unit");

    unit1Questions = ["How would you rate your learning journey in Unit 1?", "How would you rate the end-of-module games?", "How would you rate the idioms/phrasal verbs?", "How would you rate the achievement badges/trophies?", "Did you find the learning tools (dictionary, notebook, voice recorder & grammar guide) helpful?"];

    unit2Questions = ["How would you rate your learning journey in Unit 2", "How would you rate the end-of-module games?", "How would you rate the stress and intonation activities?", "Has your grammar improved?", "Has your vocabulary improved?"];

    var scoresGiven = null;
    //var results = 5;
    var question = "";

    if (unit == 1) {
        for (var i = 0; i < unit1Questions.length; i++) {
            for (var j = 5; j >= 1; j--) {
                question = "scores.unit1Question" + (i+1);
                scoresGiven = feedback_forms.find({name: "Unit 1", question: j}, {scores: 1}).count();
            }
        }
        return scoresGiven;

    } else if (unit == 2) {

    }
}