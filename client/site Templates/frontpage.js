Template.MainFooter.created = function() {
	this.subscribe('organisations');
};

Template.MainFooter.helpers({
	college: function(){
		var organisations = Meteor.user().organisation;
		organisations.forEach(function(orgId) {
			var orgName = organisations.findOne({_id: orgId}).name;
			if(orgName == 'WCS'){
				return true;			
			}
		});
	}
});

Template.bodyHeader.helpers({
	customLogoSrc: function(){
		var user = Meteor.users.findOne({_id: Meteor.userId()});
		if(user == null || user == undefined || user.organisation == null || user.organisation == undefined)
			return "/images/logo-normal@2x.png"; // - Default Klik2Learn logo
			
		var org_Id = user.organisation[0];

		if(org_Id == null || org_Id == "undefined"){
			return "/images/logo-normal@2x.png"; // - Default Klik2Learn logo
		}

		var orgLogoSrc = LogoURLs.find({orgId: org_Id});
		orgLogoSrc = orgLogoSrc.fetch()[orgLogoSrc.fetch().length - 1];
		if(orgLogoSrc == null || orgLogoSrc == "undefined"){
			return "/images/logo-normal@2x.png"; // - Default Klik2Learn logo
		}

		return orgLogoSrc.logoSrc;
	},

	customLogoAlt: function(){
		if(orgId == null || orgId == undefined){
			return "Klik2learn"; // - Default Klik2Learn logo
		}
		var orgId = Meteor.users.findOne({_id: Meteor.userId()}).organisation[0];
		var org = organisations.findOne({_id: orgId});
		if(org == null || org == "undefined"){
			return "Klik2learn";
		}
		var orgLogoAlt = org.logoAlt;
		if(orgLogoAlt == null || orgLogoAlt == 'undefined'){
			orgLogoAlt = "Klik2learn"; // - Default Klik2Learn logo alt
		}

		return orgLogoAlt;
	}
})

Template.bodyHeader.events({

	'submit #usernameLogin': function(evt) {
		evt.preventDefault();
		var username = $('input[name="username"').val();
		var password = $('input[name="password"').val();
		Meteor.loginWithPassword(username, password);
	},

	'click a[data-target="home"]': function(evt) {
		evt.preventDefault();
		Router.go('/');
	}
})


Template.bodyHeader.rendered = function() {

	$(window).scroll(function() {    
		var scroll = $(window).scrollTop();

		if (scroll >= 100) {
			$(".course-header .logos").addClass("smaller");
			setTimeout(
				function() 
				{
					$('.course-header img[src="/images/logo-normal@2x.png"]').attr('src','/images/logo2-normal@2x.png');
					$('.course-header .banner').attr('src','/journey-to-english-1line.png');
				}, 40);
		} else {
			$(".course-header .logos").removeClass("smaller");
			setTimeout(
				function() 
				{
					$('.course-header img[src="/images/logo2-normal@2x.png"]').attr('src','/images/logo-normal@2x.png');
					$('.course-header .banner').attr('src','/landing/logo-journey.png');
				}, 40);
		}
	
	})
}
