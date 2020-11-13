Template.Yeti_map3.events({

	"click area": function(evt){
		Session.set('activeSection', '#Yeti_' + $(evt.currentTarget).attr('id'));
		if ($(evt.currentTarget).attr('id') == 'd3_h1') {
			Session.set('d3_hardpath', true);
			$('section').addClass('hidden');
			$('#Yeti_d3_h1').removeClass('hidden');
		} else {
			Session.set('d3_hardpath', false);
			$('section').addClass('hidden');
			$('#Yeti_d3_e1').removeClass('hidden');
		}
		document.location.hash = 'Yeti_' + $(evt.currentTarget).attr('id');
	}
});