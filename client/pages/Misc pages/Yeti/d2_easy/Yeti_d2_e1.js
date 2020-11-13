Template.Yeti_d2_e1.helpers({
	activeSection: function() {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#Yeti_d2_e1");
	}
});

Template.Yeti_d2_e1.events({
	
	"click .yetibuttonaudio": function(evt) {
		var soundfile = "Yeti/" + $(evt.currentTarget).attr('id') + ".m4a";
		$.k2l.Yeti_d2_e1.sound.src = soundfile;
		$.k2l.Yeti_d2_e1.sound.play();
	},
	
	"click .button1": function(evt){
		$(evt.currentTarget).next('div').css('visibility', 'visible');
		if ($(evt.currentTarget).attr('id') == "answerButton2"){
			$('.correctbig').removeClass('hidden');
			var score = Session.get('yetiScore');
			score += 3;
			Session.set('yetiScore', score);
			Session.set('d2_e1_result', 'correct');
		} else {
			$('.incorrectbig').removeClass('hidden');
			Session.set('d2_e1_result', 'incorrect');
		}
		setTimeout(function () {
			$(evt.currentTarget).parents('section').addClass('hidden');
			var nextSection = $(evt.currentTarget).parents('section').next('section').removeClass('hidden');
			Session.set('activeSection', '#'+$(nextSection).attr('id'));
			document.location.hash = $(nextSection).attr('id');
			$.k2l.Yeti_d2_e1.sound.pause();
			$.k2l.Yeti_d2_e1.sound.src = "";
		}, 2000);
	}
	
});


Template.Yeti_d2_e1.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	}
	if (typeof $.k2l.Yeti_d2_e1 == 'undefined') {
		$.k2l.Yeti_d2_e1 = {};
	};
	
	$.k2l.Yeti_d2_e1.sound = new Audio();
	
}