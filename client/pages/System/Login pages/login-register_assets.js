Template.SignUpSignIn.events({
    'click .join': function (evt) {
        $('html,body').animate({
            scrollTop: $('#pricing').offset().top
        }, 800);
    }

});


Template.ForgotPassword.events({
    'submit #forgot-password-form': function (e, t) {
        e.preventDefault();

        var forgotPasswordForm = $(e.currentTarget);
        var email = forgotPasswordForm.find('#forgotPasswordEmail').val().toLowerCase();

        Accounts.forgotPassword({ email: email }, function (err) {
            if (err) {
                if (err.message === 'User not found [403]') {
                    $('.forgot-password-error').html('This email does not exist.');
                } else {
                    $('.forgot-password-error').html('We are sorry but something went wrong.');
                }
            } else {
                $('.forgot-password-error').html('Email Sent. Check your mailbox.');
            }
        });

        return false;
    },
});


Template.screenshots_b2c.rendered = function () {

    $('.screenshots').owlCarousel({
        responsive: {
            0: {
                items: 1
            },
            800: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });

}


Template.screenshots_b2b.rendered = function () {

    $('.screenshots').owlCarousel({
        responsive: {
            0: {
                items: 1
            },
            800: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });

}