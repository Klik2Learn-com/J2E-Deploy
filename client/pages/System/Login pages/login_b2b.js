Template.login_b2b.rendered = function() {
	
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

Template.login_b2b.events({
	
	'click .join': function(evt) {
		Router.go('/Register');
	}
	// Login script is now in layout.js
	
});