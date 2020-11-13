Template.Yeti_d1_e5.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#Yeti_d1_e5");
	}
});


Template.Yeti_d1_e5.events({
	"dragstart .dragitem": function(evt) {
		evt.currentTarget.style.opacity = '1.0';
		evt.originalEvent.dataTransfer.effectAllowed = 'move';
		evt.originalEvent.dataTransfer.setData('Text', $(evt.currentTarget).html());
		
		$.k2l.Yeti_d1_e5.draggedElement = evt.currentTarget;
	},
	
	"dragend .ddsourceyeti": function(evt) {
		
	},
	
	"dragenter .target": function(evt) {
		if (evt.preventDefault) {
			evt.preventDefault();
		}
	},
	
	"dragover .ddtarget": function(evt) {
		if (evt.preventDefault) {
			evt.preventDefault();
		}
		evt.originalEvent.dataTransfer.dropEffect = 'move';
		return false;
	},
	
	"dragover .speech1": function(evt) {
		if (evt.preventDefault) {
			evt.preventDefault();
		}
		evt.originalEvent.dataTransfer.dropEffect = 'move';
		return false;
	},
	
	
	"dragleave .target": function(evt) {
		
	},
	
	"drop .ddtarget": function(evt) {
		evt.preventDefault();
		if (evt.stopPropagation) {
			evt.stopPropagation();
		};
		if ($($.k2l.Yeti_d1_e5.draggedElement).parent().hasClass('speech1')) {
			$($.k2l.Yeti_d1_e5.draggedElement).html('&nbsp;');
			$($.k2l.Yeti_d1_e5.draggedElement).removeClass('scramble');
			$($.k2l.Yeti_d1_e5.draggedElement).removeClass('dragitem');
			$($.k2l.Yeti_d1_e5.draggedElement).addClass('ddtarget ddwidth4');
			$($.k2l.Yeti_d1_e5.draggedElement).attr('draggable', 'False');

			$(evt.currentTarget).removeClass('ddwidth4');
			$(evt.currentTarget).removeClass('ddtarget');
			$(evt.currentTarget).addClass('scramble');
			$(evt.currentTarget).addClass('dragitem');
			$(evt.currentTarget).attr('draggable', 'true');
			$(evt.currentTarget).html(evt.originalEvent.dataTransfer.getData('Text'));
		} else {
			$($.k2l.Yeti_d1_e5.draggedElement).html('&nbsp;');
			$($.k2l.Yeti_d1_e5.draggedElement).removeClass('scramble');
			$($.k2l.Yeti_d1_e5.draggedElement).removeClass('dragitem');
			$($.k2l.Yeti_d1_e5.draggedElement).addClass('ddtarget ddwidth4');
			$($.k2l.Yeti_d1_e5.draggedElement).attr('draggable', 'False');
			
			$(evt.currentTarget).removeClass('ddwidth4');
			$(evt.currentTarget).removeClass('ddtarget');
			$(evt.currentTarget).addClass('scramble');
			$(evt.currentTarget).addClass('dragitem');
			$(evt.currentTarget).attr('draggable', 'true');
			$(evt.currentTarget).html(evt.originalEvent.dataTransfer.getData('Text'));
		}
		return false;
	},
	
	"dragend .target": function(evt) {
	},
	
	"click .pagination": function(evt){
		$.k2l.Yeti_d1_e5.draggedElement = {};
	},
	
	"click #submitButton": function(evt){
		var answer = true;
		if ($('#target1').html() != 'A large'){
			answer = false;
		}
		if ($('#target2').html() != 'animal') {
			answer = false;
		}
		if ($('#target3').html() != 'was shot'){
			answer = false;
		}
		if ($('#target4').html() != 'by an'){
			answer = false;
		}
		if ($('#target5').html() != 'Indian'){
			answer = false;
		}
		if ($('#target6').html() != 'hunter') {
			answer = false;
		}
		if ($('#target7').html() != 'from'){
			answer = false;
		}
		if ($('#target8').html() != 'Ladakh'){
			answer = false;
		}
		
		if (answer == true) {
			var score = Session.get('yetiScore');
			score += 3;
			Session.set('yetiScore', score);
			Session.set('d1_e5_result', 'correct');
			$('.correct').removeClass('hidden');
			$.k2l.Yeti_d1_e5.draggedElement = {};
		} else {
			Session.set('d1_e5_result', 'incorrect');
			$('.incorrect').removeClass('hidden');
			$.k2l.Yeti_d1_e5.draggedElement = {};
		}
		
		setTimeout(function() {
				var parentSection = $(evt.currentTarget).parents('section');
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
			}, 1500);
			
	}
	
});

Template.Yeti_d1_e5.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.Yeti_d1_e5 == 'undefined') {
		$.k2l.Yeti_d1_e5 = {};
	};
	
	$.k2l.Yeti_d1_e5.draggedElement = {};

}