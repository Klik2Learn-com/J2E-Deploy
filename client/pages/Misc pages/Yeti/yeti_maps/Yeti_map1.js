Template.Yeti_map1.events({

	"click area": function(evt){
		Session.set('activeSection', '#Yeti_' + $(evt.currentTarget).attr('id'));
		if ($(evt.currentTarget).attr('id') == 'd1_h1') {
			Session.set('d1_hardpath', true);
			$('section').addClass('hidden');
			$('#Yeti_d1_h1').removeClass('hidden');
		} else {
			Session.set('d1_hardpath', false);
			$('section').addClass('hidden');
			$('#Yeti_d1_e1').removeClass('hidden');
		}
		document.location.hash = 'Yeti_' + $(evt.currentTarget).attr('id');
	}
});