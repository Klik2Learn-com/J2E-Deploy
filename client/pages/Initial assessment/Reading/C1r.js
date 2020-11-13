Template.C1r.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#C1r");
	}

});

Template.C1r.events({
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

Template.C1r.rendered = function(){
	window.scrollTo(0, 0);
	assessmentShowStartMessage("C1");
}