Template.Yeti_map2.events({

	"click area": function(evt){
		Session.set('activeSection', '#Yeti_' + $(evt.currentTarget).attr('id'));
		if ($(evt.currentTarget).attr('id') == 'd2_h1') {
			Session.set('d2_hardpath', true);
			$('section').addClass('hidden');
			$('#Yeti_d2_h1').removeClass('hidden');
		} else {
			Session.set('d2_hardpath', false);
			$('section').addClass('hidden');
			$('#Yeti_d2_e1').removeClass('hidden');
		}
		document.location.hash = 'Yeti_' + $(evt.currentTarget).attr('id');
	}
});