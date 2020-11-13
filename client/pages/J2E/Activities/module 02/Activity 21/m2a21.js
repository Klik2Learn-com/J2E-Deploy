

Template.m2a21.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m2a21_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m2a21.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(2, 21);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 21, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m2a21.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 21, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m2a21.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m2a21_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a21_1");
	}
});


Template.m2a21_1.events({
	
    "click #m2a21_1 .button2": function(evt) {
		
		var currentSection = $(evt.currentTarget).parents('section');
		var nextSection = $(evt.currentTarget).parents('section').next('section');
		var buttonValue = $(evt.currentTarget).data("value");
		
		if ($.k2l.m2a21_1.questionWordLock == false) {
			$.k2l.m2a21_1.questionWordLock = true;
			
			var correctAnswer = $.k2l.m2a21_1.correctAnswers[$.k2l.m2a21_1.index];
			if(buttonValue == correctAnswer){
				$('.correctscreen').removeClass("hidden");
				setTimeout(function(){
					$('.correctscreen').addClass("hidden");
				}, 1000);
				var parentSection = $(evt.currentTarget).parents('section');
				var temp = $(evt.currentTarget).data('value')
					var value = $.trim(temp);
					if (value == "True") {
						$(evt.currentTarget).addClass('noclick');
						$(evt.currentTarget).next('button').addClass('faded'); // Next Button must be False
					} else if (value == 'False') {
						$(evt.currentTarget).addClass('noclick');
						$(evt.currentTarget).prev('button').addClass('faded'); // Previous Button must be True
					}
					$.k2l.m2a21_1.index++;
					$.k2l.m2a21_1.questionWordLock = false;
					$('#m2a21_1 .row#' + $.k2l.m2a21_1.index).removeClass('hidden');				
					
					if ($.k2l.m2a21_1.index < $.k2l.m2a21_1.correctAnswers.length) {
					setTimeout(function() {						
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');						
						$.k2l.m2a21_1.questionWordLock = false; // Make the buttons clickable again						
					}, 1000);
				} else {					
					setTimeout( function() {
						$('#welldonecap').removeClass('hidden');
						}, 1000);
					setTimeout( function() {
						$('#welldonecap').addClass('hidden');
					}, 2000);	
					setTimeout(function() {
						$.k2l.m2a21_1.index = 0;
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
						}
					$.k2l.m2a21_1.questionWordLock = false;
			}	else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
				$.k2l.m2a21_1.questionWordLock = false;
			}
    }
	},
	
	'click a.restart': function(evt){
	// When clicking to restart the activity this should reset the variables to
	// initial values.
	
		if(typeof $.k2l != 'undefined'){
		  if(typeof $.k2l.m2a21_1 != 'undefined'){
			if(typeof $.k2l.m2a21_1.index != 'undefined'){
				$.k2l.m2a21_1.index = 0;
			}
			if (typeof $.k2l.m2a21_1.wrongCount != 'undefined'){
				$.k2l.m2a21_1.wrongCount = 0;
			}
		  }
		}
	}
		
})

Template.m2a21_1.rendered = function (){
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m2a21_1 == 'undefined') {
		$.k2l.m2a21_1 = {};
	};
		
	var correctAnswers = ["False", "True", "False", "True", "False", "True", "False", "False"];
		
	$.k2l.m2a21_1.index = 0;
	$.k2l.m2a21_1.correctAnswers = correctAnswers;
	
	$.k2l.m2a21_1.questionWordLock = false; //variable to prevent multiple clicks of button
}
