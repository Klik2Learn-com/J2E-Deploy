Template.feedbackUnit1Modal.rendered = function() {

}

Template.feedbackUnit1Modal.events({

    'click #closeUnit1ModalWarning': function (evt) {
        evt.preventDefault();
        var confirmation = confirm("Close without giving feedback?");
        if (confirmation) {
            $('#closeUnit1Modal').trigger('click');
            var unitModal = Session.get("feedbackFormUnit");
            Meteor.call('setFeedbackFormStatus', unitModal, 'Ignored');
            setTimeout(function () {
                Session.set("feedbackFormUnit", "");
            }, 2000);
        } else {
            return false;
        }
    },

    'submit #unit1-form': function(evt) {
        evt.preventDefault();

        var name = "Unit 1";
        var unit1Q1 = $('input[name=unit1Q1]:checked').val();
        var unit1Q2 = $('input[name=unit1Q2]:checked').val();
        var unit1Q3 = $('input[name=unit1Q3]:checked').val();
        var unit1Q4 = $('input[name=unit1Q4]:checked').val();
        var unit1Q5 = $('input[name=unit1Q5]:checked').val();

        var unit1Scores = {
            unit1Question1: unit1Q1,
            unit1Question2: unit1Q2,
            unit1Question3: unit1Q3,
            unit1Question4: unit1Q4,
            unit1Question5: unit1Q5
        }

        var unit1Q1Comment = $('textarea#unit1Q1Comment').val();
        var unit1Q2Comment = $('textarea#unit1Q2Comment').val();
        var unit1Q3Comment = $('textarea#unit1Q3Comment').val();
        var unit1Q4Comment = $('textarea#unit1Q4Comment').val();
        var unit1Q5Comment = $('textarea#unit1Q5Comment').val();

        var unit1Comments = {
            unit1Question1Comment: unit1Q1Comment,
            unit1Question2Comment: unit1Q2Comment,
            unit1Question3Comment: unit1Q3Comment,
            unit1Question4Comment: unit1Q4Comment,
            unit1Question5Comment: unit1Q5Comment
        }


        Meteor.call('submitFeedbackForm', name, unit1Scores, unit1Comments, Meteor.userId(), function (error, result) {
			if (!error) {
				Bert.alert( 'Feedback form submitted', 'success', 'growl-top-right' );
			} else {
				Bert.alert( error.toString() , 'danger', 'growl-top-right' );
			}
        });
        
        var unitModal = Session.get("feedbackFormUnit");
        Meteor.call('setFeedbackFormStatus', unitModal, 'Completed');
		setTimeout(function () {
			Session.set("feedbackFormUnit", "");
        }, 2000);
        
        $('#feedbackUnit1Modal').modal('hide');
    }

})

Template.feedbackUnit2Modal.rendered = function() {


}

Template.feedbackUnit2Modal.events({

    'click #closeUnit2ModalWarning': function (evt) {
        evt.preventDefault();
        var confirmation = confirm("Close without giving feedback?");
        if (confirmation) {
            $('#closeUnit2Modal').trigger('click');
            var unitModal = Session.get("feedbackFormUnit");
            Meteor.call('setFeedbackFormStatus', unitModal, 'Ignored');
            setTimeout(function () {
                Session.set("feedbackFormUnit", "");
            }, 2000);
        } else {
            return false;
        }
    },

    'submit #unit2-form': function(evt) {
        evt.preventDefault();

        var name = "Unit 2";
        var unit2Q1 = $('input[name=unit2Q1]:checked').val();
        var unit2Q2 = $('input[name=unit2Q2]:checked').val();
        var unit2Q3 = $('input[name=unit2Q3]:checked').val();
        var unit2Q4 = $('input[name=unit2Q4]:checked').val();
        var unit2Q5 = $('input[name=unit2Q5]:checked').val();

        var unit2Scores = {
            unit2Question1: unit2Q1,
            unit2Question2: unit2Q2,
            unit2Question3: unit2Q3,
            unit2Question4: unit2Q4,
            unit2Question5: unit2Q5
        }

        var unit2Q1Comment = $('textarea#unit2Q1Comment').val();
        var unit2Q2Comment = $('textarea#unit2Q2Comment').val();
        var unit2Q3Comment = $('textarea#unit2Q3Comment').val();
        var unit2Q4Comment = $('textarea#unit2Q4Comment').val();
        var unit2Q5Comment = $('textarea#unit2Q5Comment').val();

        var unit2Comments = {
            unit2Question1Comment: unit2Q1Comment,
            unit2Question2Comment: unit2Q2Comment,
            unit2Question3Comment: unit2Q3Comment,
            unit2Question4Comment: unit2Q4Comment,
            unit2Question5Comment: unit2Q5Comment
        }

        Meteor.call('submitFeedbackForm', name, unit2Scores, unit2Comments, Meteor.userId(), function (error, result) {
			if (!error) {
				Bert.alert( 'Feedback form submitted', 'success', 'growl-top-right' );
			} else {
				Bert.alert( error.toString() , 'danger', 'growl-top-right' );
			}
        });
        
        var unitModal = Session.get("feedbackFormUnit");
        Meteor.call('setFeedbackFormStatus', unitModal, 'Completed');
		setTimeout(function () {
			Session.set("feedbackFormUnit", "");
        }, 2000);
        
        $('#feedbackUnit2Modal').modal('hide');
    }
    
})