Template.Yeti_d2_h3.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#Yeti_d2_h3");
	}
});


Template.Yeti_d2_h3.events({
	"dragstart .dragitem": function(evt) {
		evt.currentTarget.style.opacity = '1.0';
		evt.originalEvent.dataTransfer.effectAllowed = 'move';
		evt.originalEvent.dataTransfer.setData('Text', $(evt.currentTarget).html());
		
		$.k2l.Yeti_d2_h3.draggedElement = evt.currentTarget;
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
		if ($($.k2l.Yeti_d2_h3.draggedElement).parent().hasClass('Yetibox')) {
			$($.k2l.Yeti_d2_h3.draggedElement).addClass('answerBank');
			$($.k2l.Yeti_d2_h3.draggedElement).addClass('ddtarget');
			$($.k2l.Yeti_d2_h3.draggedElement).addClass('ddwidth11');
			$($.k2l.Yeti_d2_h3.draggedElement).removeClass('ddsourceyeti');
			$($.k2l.Yeti_d2_h3.draggedElement).html('&nbsp;');
			$($.k2l.Yeti_d2_h3.draggedElement).attr('draggable', 'False');
		} else {
			// Otherwise it must be dragged from an answerSlot
			$($.k2l.Yeti_d2_h3.draggedElement).parent().removeClass('yetidd');
			$($.k2l.Yeti_d2_h3.draggedElement).parent().addClass('ddtarget');
			$($.k2l.Yeti_d2_h3.draggedElement).parent().html('&nbsp;');
		}
		
		//$(evt.currentTarget).removeClass('ddwidth11');
		//$(evt.currentTarget).addClass('ddwidth10');
		$(evt.currentTarget).removeClass('ddtarget');
		$(evt.currentTarget).addClass('yetidd');
		$(evt.currentTarget).addClass('center');
		$(evt.currentTarget).html('');

		var listItem = document.createElement('div');
		$(listItem).html(evt.originalEvent.dataTransfer.getData('Text'));
		$(listItem).addClass('dragitem');
		$(listItem).attr("draggable", "True");
		$(evt.currentTarget).append(listItem);
		
		$.k2l.Yeti_d2_h3.draggedElement = {};

		return false;

	},
	
	// Code for moving a filled-in answer back to the bank of potential answers
	"drop .answerBank": function(evt) {
		evt.preventDefault();
		// If the item dropped in here is from an answerSlot we need to revert the answerSlot to default
		if ($($.k2l.Yeti_d2_h3.draggedElement).parent().hasClass('answerSlot')) {
			$($.k2l.Yeti_d2_h3.draggedElement).parent().removeClass('yetidd');
			$($.k2l.Yeti_d2_h3.draggedElement).parent().addClass('ddtarget');
			$($.k2l.Yeti_d2_h3.draggedElement).parent().html('&nbsp;');
			
			$(evt.currentTarget).addClass('ddsourceyeti');
			$(evt.currentTarget).addClass('dragitem');
			//$(evt.currentTarget).addClass('ddwidth9');
			
			$(evt.currentTarget).attr('draggable', 'True');

			//$(evt.currentTarget).removeClass('ddwidth9');
			$(evt.currentTarget).removeClass('ddtarget');
			$(evt.currentTarget).removeClass('answerBank');
			$(evt.currentTarget).html(evt.originalEvent.dataTransfer.getData('Text'));
			
			$.k2l.Yeti_d2_h3.draggedElement = {};
		} 

	},
	
	"dragend .target": function(evt) {
	},
	
	"click .pagination": function(evt){
		$.k2l.Yeti_d2_h3.draggedElement = {};
	},
	
	"click #submitButton": function(evt){
		var answer = true;
		if ($('#target1').children().html() != 'In 1970'){
			answer = false;
		}
		
		if ($('#target2').children().html() != 'a famous') {
			answer = false;
		}
		
		if ($('#target3').children().html() != 'British'){
			answer = false;
		}
		
		if ($('#target4').children().html() != 'climber'){
			answer = false;
		}
		
		if ($('#target5').children().html() != 'saw'){
			answer = false;
		}
		
		if ($('#target6').children().html() != 'an ape like'){
			answer = false;
		}
		
		if ($('#target7').children().html() != 'creature'){
			answer = false;
		}
		
		if ($('#target8').children().html() != 'searching for'){
			answer = false;
		}
		
		if ($('#target9').children().html() != 'food'){
			answer = false;
		}
		
		if ($('#target10').children().html() != 'around his camp.'){
			answer = false;
		}
		
		
		if (answer == true) {
			var score = Session.get('yetiScore');
			score += 7;
			Session.set('yetiScore', score);
			Session.set('d2_h3_result', 'correct');
			$('.correctbig').removeClass('hidden');
			$.k2l.Yeti_d2_h3.draggedElement = {};
		} else {
			Session.set('d2_h3_result', 'incorrect');
			$('.incorrectbig').removeClass('hidden');
			$.k2l.Yeti_d2_h3.draggedElement = {};
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

Template.Yeti_d2_h3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.Yeti_d2_h3 == 'undefined') {
		$.k2l.Yeti_d2_h3 = {};
	};
	
	$.k2l.Yeti_d2_h3.draggedElement = {};

}