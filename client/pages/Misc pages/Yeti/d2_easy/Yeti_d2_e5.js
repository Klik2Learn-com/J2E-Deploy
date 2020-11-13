Template.Yeti_d2_e5.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#Yeti_d2_e5");
	}
});

Template.Yeti_d2_e5.events({
	
	"click .answer": function(evt) {
		if ($.k2l.Yeti_d2_e5.allowClick) { // prevents multiple clicks
			$.k2l.Yeti_d2_e5.allowClick = false;
			if ($(evt.currentTarget).attr('id') == 'true'){
				var score = Session.get('yetiScore');
				score += 3;
				Session.set('yetiScore', score);
				Session.set('d2_e5_result', 'correct');
				$('.correctbig').removeClass('hidden');
			} else {
				Session.set('d2_e5_result', 'incorrect');
				$('.incorrectbig').removeClass('hidden');
			}
			setTimeout(function() {
				var parentSection = $(evt.currentTarget).parents('section');
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));

				$.k2l.Yeti_d2_e5.allowClick = true; // reset allowClick
			}, 1500);
		}
	}
	
});

Template.Yeti_d2_e5.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.Yeti_d2_e5 == 'undefined') {
		$.k2l.Yeti_d2_e5 = {};
	};	
	$.k2l.Yeti_d2_e5.allowClick = true;
};