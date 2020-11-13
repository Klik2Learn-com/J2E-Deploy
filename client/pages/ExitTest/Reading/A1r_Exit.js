Template.A1r_Exit.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#A1r");
	}

});

Template.A1r_Exit.events({
	'keypress .textentry input': function (evt) {
		if (evt.which === 13){
			evt.preventDefault();
		}

	},

	'click #assess-finish': function(evt) {
		$(".finish").removeClass('hidden');
		$(".finish").addClass('fadeIn');
	}
});

Template.A1r_Exit.rendered = function(){
	window.scrollTo(0, 0);
}