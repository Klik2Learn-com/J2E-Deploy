Template.ToolIconNote.events({

	'click a[data-target="#notebookmodal"]': function(evt) {
		$('#note_read').addClass('hidden');
		$('#note_write').removeClass('hidden');
	}

})


Template.ToolIconRec.events({

	'click a[data-target="#voicerecordermodal"]': function(evt) {
		$('#recorder_listen').addClass('hidden');
		$('#recorder_save').removeClass('hidden');
	}

})


Template.ToolIconGG.events({

	'click a[data-target="#grammarmodal"]': function(evt) {
		$('#grammarmodal section').not('#GGintro').addClass('hidden');
		$('#GGintro').removeClass('hidden');
	}

})

Template.gg_button.events({
	'click #gg_button': function(evt) {
		var dataTarget = $(evt.currentTarget).attr('data-subsect');
		if (dataTarget != undefined && dataTarget != ""){
			if ($(dataTarget).parent('section').hasClass('hidden')){
				$('#modalContent').children('section').addClass('hidden');
				$(dataTarget).parent('section').removeClass('hidden');	
			}
			$('.gg-content').animate({ 
				scrollTop: $($(evt.currentTarget).attr('data-subsect')).offset().top 
			}, 'slow');
		} else {
			$('#modalContent').children('section').addClass('hidden');
			$('#GGintro').removeClass('hidden');
		}
	}

});