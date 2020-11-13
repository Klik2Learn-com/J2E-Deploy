Template.Yeti_d1_h2.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#Yeti_d1_h2");
	}
});


Template.Yeti_d1_h2.events({
	"dragstart .dragitem": function(evt) {
		evt.currentTarget.style.opacity = '1.0';
		evt.originalEvent.dataTransfer.effectAllowed = 'move';
		evt.originalEvent.dataTransfer.setData('Text', $(evt.currentTarget).html());
		
		$.k2l.Yeti_d1_h2.draggedElement = evt.currentTarget;
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
		if ($($.k2l.Yeti_d1_h2.draggedElement).parent().hasClass('Yetibox')) {
			$($.k2l.Yeti_d1_h2.draggedElement).addClass('answerBank');
			$($.k2l.Yeti_d1_h2.draggedElement).addClass('ddtarget');
			$($.k2l.Yeti_d1_h2.draggedElement).addClass('ddwidth11');
			$($.k2l.Yeti_d1_h2.draggedElement).removeClass('ddsourceyeti');
			$($.k2l.Yeti_d1_h2.draggedElement).html('&nbsp;');
			$($.k2l.Yeti_d1_h2.draggedElement).attr('draggable', 'False');
		} else {
			// Otherwise it must be dragged from an answerSlot
			$($.k2l.Yeti_d1_h2.draggedElement).parent().removeClass('yetidd');
			$($.k2l.Yeti_d1_h2.draggedElement).parent().addClass('ddtarget');
			$($.k2l.Yeti_d1_h2.draggedElement).parent().html('&nbsp;');
		}
		
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
		if ($($.k2l.Yeti_d1_h2.draggedElement).parent().hasClass('answerSlot')) {
			$($.k2l.Yeti_d1_h2.draggedElement).parent().removeClass('yetidd');
			$($.k2l.Yeti_d1_h2.draggedElement).parent().addClass('ddtarget');
			$($.k2l.Yeti_d1_h2.draggedElement).parent().html('&nbsp;');
			
			$(evt.currentTarget).addClass('ddsourceyeti');
			$(evt.currentTarget).addClass('dragitem');
			//$(evt.currentTarget).addClass('ddwidth9');
			
			$(evt.currentTarget).attr('draggable', 'True');

			//$(evt.currentTarget).removeClass('ddwidth9');
			$(evt.currentTarget).removeClass('ddtarget');
			$(evt.currentTarget).removeClass('answerBank');
			$(evt.currentTarget).html(evt.originalEvent.dataTransfer.getData('Text'));
		} 

	},
	
	"dragend .target": function(evt) {
	},
	
	"click .pagination": function(evt){
		$.k2l.Yeti_d1_h2.draggedElement = {};
	},
	
	"click #submitButton": function(evt){
		var answer = true;
		if ($('#target1').children().html() != 'In 1925'){
			answer = false;
		}
		if ($('#target2').children().html() != 'a photographer') {
			answer = false;
		}
		if ($('#target3').children().html() != 'saw a'){
			answer = false;
		}
		if ($('#target4').children().html() != 'creature like a'){
			answer = false;
		}
		if ($('#target5').children().html() != 'man'){
			answer = false;
		}
		if ($('#target6').children().html() != 'pulling up'){
			answer = false;
		}
		if ($('#target7').children().html() != 'small bushes near'){
			answer = false;
		}
		if ($('#target8').children().html() != 'the Zemu glacier.'){
			answer = false;
		}
		
		
		if (answer == true) {
			var score = Session.get('yetiScore');
			score += 7;
			Session.set('yetiScore', score);
			Session.set('d1_h2_result', 'correct'); // Set the result as correct
			$('.correctbig').removeClass('hidden');
			$.k2l.Yeti_d1_h2.draggedElement = {};
		} else {
			Session.set('d1_h2_result', 'incorrect');
			$('.incorrectbig').removeClass('hidden');
			$.k2l.Yeti_d1_h2.draggedElement = {};
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

Template.Yeti_d1_h2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.Yeti_d1_h2 == 'undefined') {
		$.k2l.Yeti_d1_h2 = {};
	};
	
	$.k2l.Yeti_d1_h2.draggedElement = {};

}