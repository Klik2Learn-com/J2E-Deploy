Template.login.rendered = function() {
	
	document.title = "Journey 2 English";
	$('#iron-router-progress').addClass('done');

	$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 400) {
        $(".login-page header").addClass("smaller");
    } else {
        $(".login-page header").removeClass("smaller");
    }
});
	
}

Template.login.events({
	
	'click .join': function(evt) {
		Router.go('/Register');
	}
	// Login script is now in layout.js
	
});