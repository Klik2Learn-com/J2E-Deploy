Template.GrammarGuide.events({
	
	'click a': function(evt){
		evt.preventDefault();
		$('#modalContent').children('section').addClass('hidden');
		$($(evt.currentTarget).attr('href')).removeClass('hidden');
		$('#grammarmodal').animate({ 
			scrollTop: $($(evt.currentTarget).attr('href')).offset().top 
		}, 'slow');
	},
	
	'click .ggdropdown':	function(evt){
		var target = evt.currentTarget;
		if ($(evt.currentTarget).parent().next('ul').children('li').hasClass('hidden')) {
			$(evt.currentTarget).parent().next('ul').children('li').removeClass('hidden');
		} else {
			$(evt.currentTarget).parent().next('ul').children('li').addClass('hidden');
		}
	},
	
	'click .subheader': function(evt){
		var dataTarget = $(evt.currentTarget).attr('data-target');
		
		if ($(dataTarget).parent('section').hasClass('hidden')){
			$('#modalContent').children('section').addClass('hidden');
			$(dataTarget).parent('section').removeClass('hidden');	
		}
		$('.gg-content').animate({ 
			scrollTop: $($(evt.currentTarget).attr('data-target')).offset().top 
		}, 'slow');
	},
	
	'click #backtotop': function(evt){
		$('.gg-content').animate({ scrollTop: 0 }, 'slow');
	}
});