Template.welcome.rendered = function() {
	
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

Template.welcome.events({
	
	'click .join': function(evt) {
		Router.go('/find-out-more');
	}
	// Login script is now in layout.js
	
});