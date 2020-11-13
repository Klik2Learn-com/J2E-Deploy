Template.ukQuiz_13.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#ukQuiz_13");
	}
});


Template.ukQuiz_13.events({
	"dragstart .ddsourceseated": function(evt) {
        if(Device.isTouch)
            disableScrolling();

		evt.currentTarget.style.opacity = '1.0';
		evt.originalEvent.dataTransfer.effectAllowed = 'move';
		evt.originalEvent.dataTransfer.setData('Text', $(evt.currentTarget).html());
		
		$.k2l.ukQuiz_13.draggedElement = evt.currentTarget;
	},
	
	"dragend .ddsourceseated": function(evt) {
        enableScrolling(evt);

		
	},
	
	"dragenter .ddseatedtarget": function(evt) {
		if (evt.preventDefault) {
			evt.preventDefault();
		}
	},
	
	"dragover .ddseatedtarget": function(evt) {
		if (evt.preventDefault) {
			evt.preventDefault();
		}
		evt.originalEvent.dataTransfer.dropEffect = 'move';
		return false;
	},
	
		"dragover .ddseat": function(evt) {
		if (evt.preventDefault) {
			evt.preventDefault();
		}
		evt.originalEvent.dataTransfer.dropEffect = 'move';
		return false;
	},
	
	"dragleave .ddseatedtarget": function(evt) {
		
	},
	
	"drop .ddseatedtarget": function(evt) {
		enableScrolling(evt);
		evt.preventDefault();
		
		if (evt.stopPropagation) {
			evt.stopPropagation();
		};
		
		var destination = $.k2l.ukQuiz_13.draggedElement.getAttribute("data-destination");
			
			if ($($.k2l.ukQuiz_13.draggedElement).parent().hasClass('ddseat')) {
			$.k2l.ukQuiz_13.draggedElement.draggable = false;
			
			$($.k2l.ukQuiz_13.draggedElement).html('');
			$($.k2l.ukQuiz_13.draggedElement).removeClass('shadow');	
			$($.k2l.ukQuiz_13.draggedElement).removeClass('ddsourceseated');
			$($.k2l.ukQuiz_13.draggedElement).addClass('ddsourceseated2');
			}else {
			$.k2l.ukQuiz_13.draggedElement.draggable = false;
			$($.k2l.ukQuiz_13.draggedElement).parent().removeClass('ddsourceseated2');
			$($.k2l.ukQuiz_13.draggedElement).parent().removeClass('ddseatedtarget2');
			$($.k2l.ukQuiz_13.draggedElement).parent().addClass('ddseatedtarget');
			$($.k2l.ukQuiz_13.draggedElement).parent().html('&nbsp;');
			}
			
			//$(evt.currentTarget).removeClass('ddwidth10 dd1line');
			$(evt.currentTarget).removeClass('ddseatedtarget');
			$(evt.currentTarget).addClass('ddseatedtarget2');
			$(evt.currentTarget).html('');
			
			var listItem = document.createElement('div');
			$(listItem).html(evt.originalEvent.dataTransfer.getData('Text'));
			$(listItem).addClass('ddsourceseated');
			$(listItem).addClass('ddwidth10 dd1line');
			$(listItem).attr("draggable", "True");
			$(evt.currentTarget).append(listItem);
	},
	
		// Code for moving a filled-in answer back to the bank of potential answers
	"drop .ddseat": function(evt) {
		evt.preventDefault();
		if (evt.stopPropagation) {
			evt.stopPropagation();
		};

		var droppable = true;

		if($(evt.currentTarget).children() != 'undefined' && $(evt.currentTarget).children().length >= 1){
			droppable = !($(evt.currentTarget).children()[0].getAttribute('draggable') == 'True'
			|| $(evt.currentTarget).children()[0].getAttribute('draggable') == 'true');
		}
		
		if(!droppable){ return; }
			
		if ($($.k2l.ukQuiz_13.draggedElement).parent().hasClass('ddseatedtarget2')) {
			$.k2l.ukQuiz_13.draggedElement.draggable = false;
			$($.k2l.ukQuiz_13.draggedElement).parent().addClass('ddseatedtarget');
			$($.k2l.ukQuiz_13.draggedElement).parent().removeClass('ddseatedtarget2');
			$($.k2l.ukQuiz_13.draggedElement).parent().html('&nbsp;');
		}else {
			$($.k2l.ukQuiz_13.draggedElement).parent().html('&nbsp;');
		}
			$(evt.currentTarget).html('');
		
		var listItem = document.createElement('div');
		$(listItem).html(evt.originalEvent.dataTransfer.getData('Text'));
		$(listItem).addClass('ddsourceseated');
		$(listItem).addClass('ddwidth10 dd1line shadow');
		$(listItem).attr("draggable", "True");
		$(evt.currentTarget).append(listItem);

	},
	
	
	"dragend .target": function(evt) {
	},
	
	"click .pagination": function(evt){
		$.k2l.ukQuiz_13.draggedElement = {};
		$.k2l.ukQuiz_13.counter = 0;
	},
	
	"click #submitButton": function(evt){
		var scoreCorrect = Session.get('quiz_Correct');
		var scoreIncorrect = Session.get('quiz_Incorrect');

		if ($('#target1').children().html() != 'JK Rowling'){			
			scoreIncorrect++;
		} else {			
			scoreCorrect++;
		}
		
		if ($('#target2').children().html() != 'JRR Tolkien'){			
			scoreIncorrect++;
		} else {			
			scoreCorrect++;
		}
		
		if ($('#target3').children().html() != 'Stephen Hawking'){			
			scoreIncorrect++;
		} else {			
			scoreCorrect++;
		}
		
		if ($('#target4').children().html() != 'Charles Dickens'){			
			scoreIncorrect++;
		} else {			
			scoreCorrect++;
		}
		
		Session.set('quiz_Correct', scoreCorrect);
		Session.set('quiz_Incorrect', scoreIncorrect);
		
		$.k2l.ukQuiz_13.draggedElement = {};
				var parentSection = $(evt.currentTarget).parents('section');
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
			
	}
	
});

Template.ukQuiz_13.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.ukQuiz_13 == 'undefined') {
		$.k2l.ukQuiz_13 = {};
	};
	
	$.k2l.ukQuiz_13.draggedElement = {};
}