Template.NewUserLink.events({

	'click a': function(evt) {
		evt.preventDefault();
		var target = $(evt.currentTarget).attr('href');
		Router.go(target)
	}
})

Template.NewGroupLink.events({

	'click a': function(evt) {
		evt.preventDefault();
		var target = $(evt.currentTarget).attr('href');
		Router.go(target)
	}
})

Template.NewOrgLink.events({

	'click a': function(evt) {
		evt.preventDefault();
		var target = $(evt.currentTarget).attr('href');
		Router.go(target)
	}
})