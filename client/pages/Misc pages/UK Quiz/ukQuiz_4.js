Template.ukQuiz_4.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#ukQuiz_4");
	}
});


Template.ukQuiz_4.events({
	"dragstart .ddsourceseated": function(evt) {
        if(Device.isTouch)
            disableScrolling();

		evt.currentTarget.style.opacity = '1.0';
		evt.originalEvent.dataTransfer.effectAllowed = 'move';
		evt.originalEvent.dataTransfer.setData('Text', $(evt.currentTarget).html());
		
		$.k2l.ukQuiz_4.draggedElement = evt.currentTarget;
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
	
	"dragleave .ddseatedtarget": function(evt) {
		
	},
	
	"drop .ddseatedtarget": function(evt) {
		enableScrolling(evt);
		evt.preventDefault();
		
		if (evt.stopPropagation) {
			evt.stopPropagation();
		};

		var destination = $.k2l.ukQuiz_4.draggedElement.getAttribute("data-destination");
		var scoreCorrect = Session.get('quiz_Correct');
		var scoreIncorrect = Session.get('quiz_Incorrect');
		if ($(evt.currentTarget).attr('id') == destination) {
			$.k2l.ukQuiz_4.counter++;
			scoreCorrect++
			Session.set('quiz_Correct', scoreCorrect);
			$.k2l.ukQuiz_4.draggedElement.draggable = false;
			var parentSection = $(evt.currentTarget).parents('section');
					
			// $('.correctscreen').removeClass('hidden');
			// setTimeout( function() {
			// 	$('.correctscreen').addClass('hidden');
			// }, 1000);
			
			$($.k2l.ukQuiz_4.draggedElement).html('');
			$($.k2l.ukQuiz_4.draggedElement).removeClass('shadow');
			$($.k2l.ukQuiz_4.draggedElement).removeClass('ddsourceseated');
			$($.k2l.ukQuiz_4.draggedElement).addClass('ddsourceseated2');
			
			$(evt.currentTarget).removeClass('ddwidth7 dd1line');
			$(evt.currentTarget).removeClass('ddseatedtarget');
			$(evt.currentTarget).addClass('ddseatedtarget2');
			$(evt.currentTarget).html('');
			
			var listItem = document.createElement('div');
			$(listItem).html(evt.originalEvent.dataTransfer.getData('Text'));
			$(listItem).addClass('ddsourceseated');
			$(listItem).addClass('ddwidth7 dd1line');
			$(evt.currentTarget).append(listItem);

			if ($.k2l.ukQuiz_4.counter == $.k2l.ukQuiz_4.max) {
				
				// Load the next page automatically
			// 	setTimeout( function() {
			// 	$('#welldonecap').removeClass('hidden');
			// 	}, 1000);
			// setTimeout( function() {
			// 	$('#welldonecap').addClass('hidden');
			// }, 2000);
				setTimeout(function() {
					$.k2l.ukQuiz_4.counter = 0;
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					
					}, 2000);
			// $('.pagination').removeClass('hidden');
			};
		} else {
		$.k2l.ukQuiz_4.counter++;
			scoreIncorrect++
			Session.set('quiz_Incorrect', scoreIncorrect);
			$.k2l.ukQuiz_4.draggedElement.draggable = false;
			var parentSection = $(evt.currentTarget).parents('section');
					
			// $('.correctscreen').removeClass('hidden');
			// setTimeout( function() {
			// 	$('.correctscreen').addClass('hidden');
			// }, 1000);
			
			$($.k2l.ukQuiz_4.draggedElement).html('');
			$($.k2l.ukQuiz_4.draggedElement).removeClass('shadow');
			$($.k2l.ukQuiz_4.draggedElement).removeClass('ddsourceseated');
			$($.k2l.ukQuiz_4.draggedElement).addClass('ddsourceseated2');
			
			$(evt.currentTarget).removeClass('ddwidth7 dd1line');
			$(evt.currentTarget).removeClass('ddseatedtarget');
			$(evt.currentTarget).addClass('ddseatedtarget2');
			$(evt.currentTarget).html('');
			
			var listItem = document.createElement('div');
			$(listItem).html(evt.originalEvent.dataTransfer.getData('Text'));
			$(listItem).addClass('ddsourceseated');
			$(listItem).addClass('ddwidth7 dd1line');
			$(evt.currentTarget).append(listItem);

			if ($.k2l.ukQuiz_4.counter == $.k2l.ukQuiz_4.max) {
				
				// Load the next page automatically
			// 	setTimeout( function() {
			// 	$('#welldonecap').removeClass('hidden');
			// 	}, 1000);
			// setTimeout( function() {
			// 	$('#welldonecap').addClass('hidden');
			// }, 2000);
				setTimeout(function() {
					$.k2l.ukQuiz_4.counter = 0;
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					
					}, 2000);
			// $('.pagination').removeClass('hidden');
			};
		};
	},
	
	"dragend .target": function(evt) {
	},
	
	"click .pagination": function(evt){
		$.k2l.ukQuiz_4.draggedElement = {};
		$.k2l.ukQuiz_4.counter = 0;
	}
});

Template.ukQuiz_4.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.ukQuiz_4 == 'undefined') {
		$.k2l.ukQuiz_4 = {};
	};
	
	$.k2l.ukQuiz_4.draggedElement = {};
	$.k2l.ukQuiz_4.counter = 0;

	$.k2l.ukQuiz_4.max = 1; // number of drag spaces on this page.
}