Template.GGVerbs.events({

	'click .ggpageselect': function(evt){
		
		evt.preventDefault;
		$(evt.currentTarget).parents('section').addClass('hidden');
		$($(evt.currentTarget).attr('href')).removeClass('hidden');
	}
	
});
