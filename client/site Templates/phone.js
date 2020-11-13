// Handle things that need to happen when a phone button is clicked
// inside this script.
Template.phone.events({

	'click #phone_button_2': function(evt){
		$('#note_write').addClass('hidden');
		$('#note_read').removeClass('hidden');
	},

	'click #phone_button_4': function(evt){
		$('#recorder_save').addClass('hidden');
		$('#recorder_listen').removeClass('hidden');
	}

})