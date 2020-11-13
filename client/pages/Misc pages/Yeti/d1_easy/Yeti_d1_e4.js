Template.Yeti_d1_e4.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#Yeti_d1_e4");
	}
});

Template.Yeti_d1_e4.events({
	
	"click .answer": function(evt) {
		if ($.k2l.yeti_d1_e4.allowClick) { // prevents multiple clicks
			$.k2l.yeti_d1_e4.allowClick = false;
			if ($(evt.currentTarget).attr('id') == 'true'){
				var score = Session.get('yetiScore');
				score += 3;
				Session.set('yetiScore', score);
				Session.set('d1_e4_result', 'correct');
				$('.correctbig').removeClass('hidden');
			} else {
				Session.set('d1_e4_result', 'incorrect');
				$('.incorrectbig').removeClass('hidden');
			}
			setTimeout(function() {
				var parentSection = $(evt.currentTarget).parents('section');
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));

				$.k2l.yeti_d1_e4.allowClick = true; // reset allowClick
			}, 1500);
		}
	}
	
});

Template.Yeti_d1_e4.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.yeti_d1_e4 == 'undefined') {
		$.k2l.yeti_d1_e4 = {};
	};	
	$.k2l.yeti_d1_e4.allowClick = true;
};