Template.Yeti_d3_e4.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#Yeti_d3_e4");
	}
});

Template.Yeti_d3_e4.events({
	
	"click .yetibuttonaudio": function(evt) {
		var soundfile = "Yeti/" + $(evt.currentTarget).attr('id') + ".m4a";
		$.k2l.Yeti_d3_e4.sound.src = soundfile;
		$.k2l.Yeti_d3_e4.sound.play();
	},
	
	"click .button1": function(evt){
		$(evt.currentTarget).next('div').css('visibility', 'visible');
		if ($(evt.currentTarget).attr('id') == "answerbutton2"){
			$('.correctbig').removeClass('hidden');
			var score = Session.get('yetiScore');
			score += 3;
			Session.set('yetiScore', score);
			Session.set('d3_e4_result', 'correct');
		} else {
			$('.incorrectbig').removeClass('hidden');
			Session.set('d3_e4_result', 'incorrect');
		}
		setTimeout(function () {
			$(evt.currentTarget).parents('section').addClass('hidden');
			var nextSection = $(evt.currentTarget).parents('section').next('section').removeClass('hidden');
			Session.set('activeSection', '#'+$(nextSection).attr('id'));
			document.location.hash = $(nextSection).attr('id');
			$.k2l.Yeti_d3_e4.sound.pause();
			$.k2l.Yeti_d3_e4.sound.src = "";
		}, 2000);
	}

});

Template.Yeti_d3_e4.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	}
	if (typeof $.k2l.Yeti_d3_e4 == 'undefined') {
		$.k2l.Yeti_d3_e4 = {};
	};
	
	$.k2l.Yeti_d3_e4.sound = new Audio();
	
}