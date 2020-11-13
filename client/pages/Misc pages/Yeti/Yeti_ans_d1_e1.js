Template.Yeti_ans_d1.helpers({
	
	activeSection: function() {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#Yeti_ans_d1");
	},
	
	d1_hardpath:function() {
		return Session.get('d1_hardpath');
	},
	
	d2_hardpath:function() {
		return Session.get('d2_hardpath');	
	},
	
	d3_hardpath:function() {
		return Session.get('d3_hardpath');
	},
	
	d4_hardpath:function() {
		return Session.get('d4_hardpath');
	}
	
});

Template.Yeti_ans_d1.events({
	
	'click #next_section': function(evt) {
		switch ($(evt.currentTarget).closest('section').next('section').attr('id')) {
			case 'title1':
				$(evt.currentTarget).closest('section').next('section').next('section').removeClass('hidden');
				$('#prev_section').removeClass('hidden');
				break;
			case 'title2':
				$(evt.currentTarget).closest('section').next('section').next('section').removeClass('hidden');
				$('#title1').addClass('hidden');
				break;
			case 'title3':
				$(evt.currentTarget).closest('section').next('section').next('section').removeClass('hidden');
				$('#title2').addClass('hidden');
				break;
			case 'title4':
				$(evt.currentTarget).closest('section').next('section').next('section').removeClass('hidden');
				$('#title3').addClass('hidden');
				break;
		}
	},
	
	'click #prev_section': function(evt) {
		switch ($(evt.currentTarget).closest('section').prev('section').attr('id')) {
			case 'title1':
				break;
			case 'title2':
				$(evt.currentTarget).closest('section').prev('section').prev('section').removeClass('hidden');
				$('#title2').addClass('hidden');
				$('#title1').removeClass('hidden');
				//$('#prev_section').addClass('hidden');
				break;
			case 'title3':
				$(evt.currentTarget).closest('section').prev('section').prev('section').removeClass('hidden');
				$('#title2').removeClass('hidden');
				$('#title3').addClass('hidden');
				break;
			case 'title4':
				$(evt.currentTarget).closest('section').prev('section').prev('section').removeClass('hidden');
				$('#title3').removeClass('hidden');
				$('#title4').addClass('hidden');
				break;
		}
		
		// Hide the prev button at the first answer
		if ($(evt.currentTarget).closest('section').prev('section').prev('section').attr('id')){
			$('#prev_section').addClass('hidden');
		}
	},
	
	'click .buttonaudio': function(evt) {
		var soundfile = "Yeti/" + $(evt.currentTarget).attr('id') + ".m4a";
		$.k2l.Yeti_ans_d1.sound.src = soundfile;
		$.k2l.Yeti_ans_d1.sound.play();
	}
	
});

Template.Yeti_ans_d1.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	}
	if (typeof $.k2l.Yeti_ans_d1 == 'undefined') {
		$.k2l.Yeti_ans_d1 = {};
	};
	
	$.k2l.Yeti_ans_d1.sound = new Audio();
};