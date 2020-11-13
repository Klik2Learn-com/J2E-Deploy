Template.A1r.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#A1r");
	}

});

Template.A1r.events({
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

Template.A1r.rendered = function(){
	window.scrollTo(0, 0);
}