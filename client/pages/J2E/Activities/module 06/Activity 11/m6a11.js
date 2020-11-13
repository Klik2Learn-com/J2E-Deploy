Template.m6a11.helpers({
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m6a11_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m6a11.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(6, 11);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(6, 11, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m6a11.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 6, 11, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m6a11.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m6a11_2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a11_2");
	}
});


Template.m6a11_2.events({
	
    "click #m6a11_2 .button2": function(evt) {
		
		var currentSection = $(evt.currentTarget).parents('section');
		var nextSection = $(evt.currentTarget).parents('section').next('section');
		var buttonValue = $(evt.currentTarget).data("value");
		
		if ($.k2l.m6a11_2.questionWordLock == false) {
			$.k2l.m6a11_2.questionWordLock = true;
			
			var correctAnswer = $.k2l.m6a11_2.correctAnswers[$.k2l.m6a11_2.index];
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
					$.k2l.m6a11_2.index++;
					$.k2l.m6a11_2.questionWordLock = false;
					$('#m6a11_2 .row#' + $.k2l.m6a11_2.index).removeClass('hidden');				
					
					if ($.k2l.m6a11_2.index < $.k2l.m6a11_2.correctAnswers.length) {
					setTimeout(function() {						
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');						
						$.k2l.m6a11_2.questionWordLock = false; // Make the buttons clickable again						
					}, 1000);
				} else {					
					setTimeout( function() {
						$('#welldonecap').removeClass('hidden');
						}, 1000);
					setTimeout( function() {
						$('#welldonecap').addClass('hidden');
					}, 2000);	
					setTimeout(function() {
						$.k2l.m6a11_2.index = 0;
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
						}
					$.k2l.m6a11_2.questionWordLock = false;
			}	else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
				$.k2l.m6a11_2.questionWordLock = false;
			}
    }
	},
	
	'click a.restart': function(evt){
	// When clicking to restart the activity this should reset the variables to
	// initial values.
	
	
		if(typeof $.k2l != 'undefined'){
		  if(typeof $.k2l.m6a11_2 != 'undefined'){
			if(typeof $.k2l.m6a11_2.index != 'undefined'){
				$.k2l.m6a11_2.index = 0;
			}
			if (typeof $.k2l.m6a11_2.wrongCount != 'undefined'){
				$.k2l.m6a11_2.wrongCount = 0;
			}
		  }
		}
	}
		
})

Template.m6a11_2.rendered = function (){
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m6a11_2 == 'undefined') {
		$.k2l.m6a11_2 = {};
	};
		
	var correctAnswers = ["True", "False", "False", "True", "False", "False", "False", "True", "True", "True", "True", "True"];
		
	$.k2l.m6a11_2.index = 0;
	$.k2l.m6a11_2.correctAnswers = correctAnswers;
	
	$.k2l.m6a11_2.questionWordLock = false; //variable to prevent multiple clicks of button
}
