Template.A2r.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#A2r");
	}

});

Template.A2r.events({
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

Template.A2r.rendered = function(){
	window.scrollTo(0, 0);
	assessmentShowStartMessage("A2");
}