Template.AssessComplete.events({

	'click .button1': function(evt) {
		evt.preventDefault();
		var target = $(evt.currentTarget).attr('data-target');
		Router.go(target)
	},
	
	"click .fa-close": function(evt){
		$(".resume").addClass("hidden");
	}
})