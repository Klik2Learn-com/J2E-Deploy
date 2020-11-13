Template.B2r.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#B2r");
	}

});

Template.B2r.events({
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

Template.B2r.rendered = function(){
	window.scrollTo(0, 0);
	assessmentShowStartMessage("B2");
}