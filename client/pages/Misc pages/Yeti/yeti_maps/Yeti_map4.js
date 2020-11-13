Template.Yeti_map4.events({

	"click area": function(evt){
		Session.set('activeSection', '#Yeti_' + $(evt.currentTarget).attr('id'));
		if ($(evt.currentTarget).attr('id') == 'd4_h1') {
			Session.set('d4_hardpath', true);
			$('section').addClass('hidden');
			$('#Yeti_d4_h1').removeClass('hidden');
		} else {
			Session.set('d4_hardpath', false);
			$('section').addClass('hidden');
			$('#Yeti_d4_e1').removeClass('hidden');
		}
		document.location.hash = 'Yeti_' + $(evt.currentTarget).attr('id');
	}
});