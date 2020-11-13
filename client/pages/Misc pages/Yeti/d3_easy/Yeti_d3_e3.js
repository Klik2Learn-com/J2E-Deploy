Template.Yeti_d3_e3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#Yeti_d3_e3");
	}
});

Template.Yeti_d3_e3.events({
	
	"click .answer": function(evt) {
		if ($.k2l.Yeti_d3_e3.allowClick) { // prevents multiple clicks
			$.k2l.Yeti_d3_e3.allowClick = false;
			if ($(evt.currentTarget).attr('id') == 'false'){
				var score = Session.get('yetiScore');
				score += 3;
				Session.set('d3_e3_result', 'correct');
				Session.set('yetiScore', score);
				$('.correctbig').removeClass('hidden');
			} else {
				$('.incorrectbig').removeClass('hidden');
			}
			setTimeout(function() {
				var parentSection = $(evt.currentTarget).parents('section');
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));

				$.k2l.Yeti_d3_e3.allowClick = true; // reset allowClick
			}, 1500);
		}
	}
	
});

Template.Yeti_d3_e3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.Yeti_d3_e3 == 'undefined') {
		$.k2l.Yeti_d3_e3 = {};
	};	
	$.k2l.Yeti_d3_e3.allowClick = true;
};