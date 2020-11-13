Template.Yeti_d4_e1.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#Yeti_d4_e1");
	}
});


Template.Yeti_d4_e1.events({
	"dragstart .dragitem": function(evt) {
		evt.currentTarget.style.opacity = '1.0';
		evt.originalEvent.dataTransfer.effectAllowed = 'move';
		evt.originalEvent.dataTransfer.setData('Text', $(evt.currentTarget).html());
		
		$.k2l.Yeti_d4_e1.draggedElement = evt.currentTarget;
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
	
	"dragover .Yetibox": function(evt) {
		if (evt.preventDefault) {
			evt.preventDefault();
		}
		evt.originalEvent.dataTransfer.dropEffect = 'move';
		return false;
	},
	
	
	"dragleave .target": function(evt) {
		
	},
	
	// Code for moving an answer from anywhere into an empty answer-slot
	"drop .answerSlot": function(evt) {
		evt.preventDefault();
		if (evt.stopPropagation) {
			evt.stopPropagation();
		};
		
		// if the answer was dragged from the main answerbox (class=Yetibox) then
		// max an answerBox space
		if ($($.k2l.Yeti_d4_e1.draggedElement).parent().hasClass('Yetibox')) {
			$($.k2l.Yeti_d4_e1.draggedElement).addClass('answerBank');
			$($.k2l.Yeti_d4_e1.draggedElement).addClass('ddtarget');
			$($.k2l.Yeti_d4_e1.draggedElement).addClass('ddwidth9');
			$($.k2l.Yeti_d4_e1.draggedElement).removeClass('ddsourceyeti');
			$($.k2l.Yeti_d4_e1.draggedElement).html('&nbsp;');
			$($.k2l.Yeti_d4_e1.draggedElement).attr('draggable', 'False');
		} else {
			// Otherwise it must be dragged from an answerSlot
			$($.k2l.Yeti_d4_e1.draggedElement).parent().removeClass('yetidd');
			$($.k2l.Yeti_d4_e1.draggedElement).parent().addClass('ddtarget');
			$($.k2l.Yeti_d4_e1.draggedElement).parent().removeClass('ddwidth6'); // swap ddwidth6 for 7
			$($.k2l.Yeti_d4_e1.draggedElement).parent().addClass('ddwidth7');
			$($.k2l.Yeti_d4_e1.draggedElement).parent().html('&nbsp;');
		}
		
		$(evt.currentTarget).removeClass('ddwidth7');
		$(evt.currentTarget).addClass('ddwidth6');
		$(evt.currentTarget).removeClass('ddtarget');
		$(evt.currentTarget).addClass('yetidd');
		$(evt.currentTarget).addClass('center');
		$(evt.currentTarget).html('');


		var listItem = document.createElement('div');
		$(listItem).html(evt.originalEvent.dataTransfer.getData('Text'));
		$(listItem).addClass('dragitem');
		$(listItem).attr("draggable", "True");
		$(evt.currentTarget).append(listItem);

		return false;

	},
	
	// Code for moving a filled-in answer back to the bank of potential answers
	"drop .answerBank": function(evt) {
		evt.preventDefault();
		// If the item dropped in here is from an answerSlot we need to revert the answerSlot to default
		if ($($.k2l.Yeti_d4_e1.draggedElement).parent().hasClass('answerSlot')) {
			$($.k2l.Yeti_d4_e1.draggedElement).parent().removeClass('yetidd');
			$($.k2l.Yeti_d4_e1.draggedElement).parent().addClass('ddtarget');
			$($.k2l.Yeti_d4_e1.draggedElement).parent().removeClass('ddwidth6'); // swap ddwidth6 for 7
			$($.k2l.Yeti_d4_e1.draggedElement).parent().addClass('ddwidth7');
			$($.k2l.Yeti_d4_e1.draggedElement).parent().html('&nbsp;');
			
			$(evt.currentTarget).addClass('ddsourceyeti');
			$(evt.currentTarget).addClass('dragitem');
			$(evt.currentTarget).addClass('ddwidth7');
			
			$(evt.currentTarget).attr('draggable', 'True');

			$(evt.currentTarget).removeClass('ddwidth9');
			$(evt.currentTarget).removeClass('ddtarget');
			$(evt.currentTarget).removeClass('answerBank');
			$(evt.currentTarget).html(evt.originalEvent.dataTransfer.getData('Text'));
		} 

	},
	
	"dragend .target": function(evt) {
	},
	
	"click .pagination": function(evt){
		$.k2l.Yeti_d4_e1.draggedElement = {};
	},
	
	"click #submitButton": function(evt){
		var answer = true;
		if ($('#target1').children().html() != 'There'){
			answer = false;
		}
		if ($('#target2').children().html() != 'many') {
			answer = false;
		}
		if ($('#target3').children().html() != 'creature'){
			answer = false;
		}
		if ($('#target4').children().html() != 'in'){
			answer = false;
		}


		
		if (answer == true) {
			var score = Session.get('yetiScore');
			score += 3;
			Session.set('yetiScore', score);
			Session.set('d4_e1_result', 'correct'); // Set the result as correct
			$('.correctbig').removeClass('hidden');
			$.k2l.Yeti_d4_e1.draggedElement = {};
		} else {
			Session.set('d4_e1_result', 'incorrect'); // Set the result as incorrect
			$('.incorrectbig').removeClass('hidden');
			$.k2l.Yeti_d4_e1.draggedElement = {};
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

Template.Yeti_d4_e1.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.Yeti_d4_e1 == 'undefined') {
		$.k2l.Yeti_d4_e1 = {};
	};
	
	$.k2l.Yeti_d4_e1.draggedElement = {};

}