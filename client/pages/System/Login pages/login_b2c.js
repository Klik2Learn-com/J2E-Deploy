Template.login_b2c.rendered = function() {
	
	document.title = "Journey 2 English";
	$('#iron-router-progress').addClass('done');

	$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 300) {
        $(".login-page header").addClass("smaller");
    } else {
        $(".login-page header").removeClass("smaller");
    }
	
	
});
	
}

Template.login_b2c.events({
	
	'click .pricing': function(evt) {
      $('html,body').animate({
      	scrollTop: $('#pricing').offset().top
   	  }, 800);
	}
	
});

Template.holiday_correct.events({
	
	'click .pricing': function(evt) {
      $('html,body').animate({
      	scrollTop: $('#pricing').offset().top
   	  }, 800);
	  $(".login-quiz-result").addClass("hidden");
	},
	
	'click .login-quiz-result .close': function(evt) {
		$(".login-quiz-result").addClass("hidden");
	},
	
	'click .login-quiz-result .join': function(evt) {
		$(".login-quiz-result").addClass("hidden");
		$('html,body').animate({
      	scrollTop: $('#course').offset().top
   	  }, 800);
	}
	
});

Template.holiday_wrong.events({
	
	'click .pricing': function(evt) {
      $('html,body').animate({
      	scrollTop: $('#pricing').offset().top
   	  }, 800);
	  $(".login-quiz-result").addClass("hidden");
	},
	
	'click .login-quiz-result .close': function(evt) {
		$(".login-quiz-result").addClass("hidden");
	},
	
	'click .login-quiz-result .join': function(evt) {
		$(".login-quiz-result").addClass("hidden");
		$('html,body').animate({
      	scrollTop: $('#course').offset().top
   	  }, 800);
	}
	
});

Template.boat_correct.events({
	
	'click .pricing': function(evt) {
      $('html,body').animate({
      	scrollTop: $('#pricing').offset().top
   	  }, 800);
	  $(".login-quiz-result").addClass("hidden");
	},
	
	'click .login-quiz-result .close': function(evt) {
		$(".login-quiz-result").addClass("hidden");
	},
	
	'click .login-quiz-result .join': function(evt) {
		$(".login-quiz-result").addClass("hidden");
		$('html,body').animate({
      	scrollTop: $('#includes').offset().top
   	  }, 800);
	}
	
});

Template.boat_wrong.events({
	
	'click .pricing': function(evt) {
      $('html,body').animate({
      	scrollTop: $('#pricing').offset().top
   	  }, 800);
	  $(".login-quiz-result").addClass("hidden");
	},
	
	'click .login-quiz-result .close': function(evt) {
		$(".login-quiz-result").addClass("hidden");
	},
	
	'click .login-quiz-result .join': function(evt) {
		$(".login-quiz-result").addClass("hidden");
		$('html,body').animate({
      	scrollTop: $('#includes').offset().top
   	  }, 800);
	}
	
});

Template.cake_correct.events({
	
	'click .pricing': function(evt) {
      $('html,body').animate({
      	scrollTop: $('#pricing').offset().top
   	  }, 800);
	  $(".login-quiz-result").addClass("hidden");
	},
	
	'click .login-quiz-result .close': function(evt) {
		$(".login-quiz-result").addClass("hidden");
	},
	
	'click .login-quiz-result .join': function(evt) {
		$(".login-quiz-result").addClass("hidden");
		$('html,body').animate({
      	scrollTop: $('#pricing').offset().top
   	  }, 800);
	}
	
});

Template.cake_wrong.events({
	
	'click .pricing': function(evt) {
      $('html,body').animate({
      	scrollTop: $('#pricing').offset().top
   	  }, 800);
	  $(".login-quiz-result").addClass("hidden");
	},
	
	'click .login-quiz-result .close': function(evt) {
		$(".login-quiz-result").addClass("hidden");
	},
	
	'click .login-quiz-result .join': function(evt) {
		$(".login-quiz-result").addClass("hidden");
		$('html,body').animate({
      	scrollTop: $('#pricing').offset().top
   	  }, 800);
	}
	
});

Template.tower_correct.events({
	
	'click .pricing': function(evt) {
      $('html,body').animate({
      	scrollTop: $('#pricing').offset().top
   	  }, 800);
	  $(".login-quiz-result").addClass("hidden");
	},
	
	'click .login-quiz-result .close': function(evt) {
		$(".login-quiz-result").addClass("hidden");
	},
	
	'click .login-quiz-result .join': function(evt) {
		$(".login-quiz-result").addClass("hidden");
		Router.go("/Register");
	}
	
});

Template.tower_wrong.events({
	
	'click .pricing': function(evt) {
      $('html,body').animate({
      	scrollTop: $('#pricing').offset().top
   	  }, 800);
	  $(".login-quiz-result").addClass("hidden");
	},
	
	'click .login-quiz-result .close': function(evt) {
		$(".login-quiz-result").addClass("hidden");
	},
	
	'click .login-quiz-result .join': function(evt) {
		$(".login-quiz-result").addClass("hidden");
		Router.go("/Register");
	}
	
});

Template.login_b2c_content.events({
	
	'click .join2': function(evt) {
		Router.go('/Register');
	},

	'click #b2c_contact_form_link' : function(evt){
		$("#b2c_contact_form_container").removeClass('hidden');
		$("#b2c_contact_form_link").addClass('hidden');
	},

	'click #b2c_contact_form_close' : function(evt){
		$("#b2c_contact_form_link").removeClass('hidden');
		$("#b2c_contact_form_container").addClass('hidden');
	}
	
});