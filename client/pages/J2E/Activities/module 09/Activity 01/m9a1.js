Template.m9a1.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m9a1_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m9a1.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(9,1);
	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(9, 1, subpage);
			oldLocation = location.href;
		}
	}, 500);
}

Template.m9a1.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 9, 1, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m9a1.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m9a1_7.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		
		return (activeSection == "#m9a1_7"); 
	} 
}); 
 
Template.m9a1_7.events({
	
    "click #m9a1_7 .button2": function(evt) {
		
		var currentSection = $(evt.currentTarget).parents('section');
		var nextSection = $(evt.currentTarget).parents('section').next('section');
		var buttonValue = $(evt.currentTarget).data("value");
		
		if ($.k2l.m9a1_7.questionWordLock == false) {
			$.k2l.m9a1_7.questionWordLock = true;
			
			var correctAnswer = $.k2l.m9a1_7.correctAnswers[$.k2l.m9a1_7.index];
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
					$.k2l.m9a1_7.index++;
					$.k2l.m9a1_7.questionWordLock = false;
					$('#m9a1_7 .row#' + $.k2l.m9a1_7.index).removeClass('hidden');				
					
					if ($.k2l.m9a1_7.index < $.k2l.m9a1_7.correctAnswers.length) {
					setTimeout(function() {						
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');						
						$.k2l.m9a1_7.questionWordLock = false; // Make the buttons clickable again						
					}, 1000);
				} else {					
					setTimeout( function() {
						$('#welldonecap').removeClass('hidden');
						}, 1000);
					setTimeout( function() {
						$('#welldonecap').addClass('hidden');
					}, 2000);	
					setTimeout(function() {
						$.k2l.m9a1_7.index = 0;
						$.k2l.m9a1_7.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
						}
					$.k2l.m9a1_7.questionWordLock = false;
			}	else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
				$.k2l.m9a1_7.questionWordLock = false;
			}
    }
	},

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m9a1_7.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m9a1_7.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		$.k2l.m9a1_7.sound.src = {};
	},
	
	'click a.restart': function(evt){
	// When clicking to restart the activity this should reset the variables to
	// initial values.
	
	
		if(typeof $.k2l != 'undefined'){
		  if(typeof $.k2l.m9a1_7 != 'undefined'){
			if(typeof $.k2l.m9a1_7.index != 'undefined'){
				$.k2l.m9a1_7.index = 0;
			}
			if (typeof $.k2l.m9a1_7.wrongCount != 'undefined'){
				$.k2l.m9a1_7.wrongCount = 0;
			}
		  }
		}
	}
		
})

Template.m9a1_7.rendered = function (){
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m9a1_7 == 'undefined') {
		$.k2l.m9a1_7 = {};
	};
		
	var correctAnswers = ["False", "True", "True"];
	$.k2l.m9a1_7.sound = new Audio();	
	$.k2l.m9a1_7.index = 0;
	$.k2l.m9a1_7.correctAnswers = correctAnswers;
	
	$.k2l.m9a1_7.questionWordLock = false; //variable to prevent multiple clicks of button
}

Template.m9a1_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a1_3"); 
	} 
}); 
 
Template.m9a1_3.events({
	
	"click .pagination": function(evt){
		$('#video-id').get(0).pause();
		$('#video-id').get(0).currentTime = 0;
	}
});

Template.m9a1_3.rendered = function() {
}

Template.m9a1_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a1_5"); 
	} 
}); 
 
Template.m9a1_5.events({
	
    "click #m9a1_5 .button2": function(evt) {
		
		var currentSection = $(evt.currentTarget).parents('section');
		var nextSection = $(evt.currentTarget).parents('section').next('section');
		var buttonValue = $(evt.currentTarget).data("value");
		
		if ($.k2l.m9a1_5.questionWordLock == false) {
			$.k2l.m9a1_5.questionWordLock = true;
			
			var correctAnswer = $.k2l.m9a1_5.correctAnswers[$.k2l.m9a1_5.index];
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
					$.k2l.m9a1_5.index++;
					$.k2l.m9a1_5.questionWordLock = false;
					$('#m9a1_5 .row#' + $.k2l.m9a1_5.index).removeClass('hidden');				
					
					if ($.k2l.m9a1_5.index < $.k2l.m9a1_5.correctAnswers.length) {
					setTimeout(function() {						
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');						
						$.k2l.m9a1_5.questionWordLock = false; // Make the buttons clickable again						
					}, 1000);
				} else {					
					setTimeout( function() {
						$('#welldonecap').removeClass('hidden');
						}, 1000);
					setTimeout( function() {
						$('#welldonecap').addClass('hidden');
					}, 2000);	
					setTimeout(function() {
						$.k2l.m9a1_5.index = 0;
						$.k2l.m9a1_5.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
						}
					$.k2l.m9a1_5.questionWordLock = false;
			}	else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
				$.k2l.m9a1_5.questionWordLock = false;
			}
    }
	},

		'click .buttonaudio': function(evt) {
			audioButtonClickSetup($.k2l.m9a1_5.sound, $(evt.currentTarget));
			playPauseAudio($.k2l.m9a1_5.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		$.k2l.m9a1_5.sound.src = {};
	},
	
	'click a.restart': function(evt){
	// When clicking to restart the activity this should reset the variables to
	// initial values.
	
	
		if(typeof $.k2l != 'undefined'){
		  if(typeof $.k2l.m9a1_5 != 'undefined'){
			if(typeof $.k2l.m9a1_5.index != 'undefined'){
				$.k2l.m9a1_5.index = 0;
			}
			if (typeof $.k2l.m9a1_5.wrongCount != 'undefined'){
				$.k2l.m9a1_5.wrongCount = 0;
			}
		  }
		}
	}
		
})

Template.m9a1_5.rendered = function (){
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m9a1_5 == 'undefined') {
		$.k2l.m9a1_5 = {};
	};
		
	var correctAnswers = ["False", "True"];
	$.k2l.m9a1_5.sound = new Audio();	
	$.k2l.m9a1_5.index = 0;
	$.k2l.m9a1_5.correctAnswers = correctAnswers;
	
	$.k2l.m9a1_5.questionWordLock = false; //variable to prevent multiple clicks of button
}

Template.m9a1_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a1_4"); 
	} 
}); 
 
Template.m9a1_4.events({
	
    "click #m9a1_4 .button2": function(evt) {
		
		var currentSection = $(evt.currentTarget).parents('section');
		var nextSection = $(evt.currentTarget).parents('section').next('section');
		var buttonValue = $(evt.currentTarget).data("value");
		
		if ($.k2l.m9a1_4.questionWordLock == false) {
			$.k2l.m9a1_4.questionWordLock = true;
			
			var correctAnswer = $.k2l.m9a1_4.correctAnswers[$.k2l.m9a1_4.index];
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
					$.k2l.m9a1_4.index++;
					$.k2l.m9a1_4.questionWordLock = false;
					$('#m9a1_4 .row#' + $.k2l.m9a1_4.index).removeClass('hidden');				
					
					if ($.k2l.m9a1_4.index < $.k2l.m9a1_4.correctAnswers.length) {
					setTimeout(function() {						
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');						
						$.k2l.m9a1_4.questionWordLock = false; // Make the buttons clickable again						
					}, 1000);
				} else {					
					setTimeout( function() {
						$('#welldonecap').removeClass('hidden');
						}, 1000);
					setTimeout( function() {
						$('#welldonecap').addClass('hidden');
					}, 2000);	
					setTimeout(function() {
						$.k2l.m9a1_4.index = 0;
						$.k2l.m9a1_4.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
						}
					$.k2l.m9a1_4.questionWordLock = false;
			}	else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
				$.k2l.m9a1_4.questionWordLock = false;
			}
    }
	},

		'click .buttonaudio': function(evt) {
			audioButtonClickSetup($.k2l.m9a1_4.sound, $(evt.currentTarget));
			playPauseAudio($.k2l.m9a1_4.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		$.k2l.m9a1_4.sound.src = {};
	},
	
	'click a.restart': function(evt){
	// When clicking to restart the activity this should reset the variables to
	// initial values.
	
	
		if(typeof $.k2l != 'undefined'){
		  if(typeof $.k2l.m9a1_4 != 'undefined'){
			if(typeof $.k2l.m9a1_4.index != 'undefined'){
				$.k2l.m9a1_4.index = 0;
			}
			if (typeof $.k2l.m9a1_4.wrongCount != 'undefined'){
				$.k2l.m9a1_4.wrongCount = 0;
			}
		  }
		}
	}
		
})

Template.m9a1_4.rendered = function (){
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m9a1_4 == 'undefined') {
		$.k2l.m9a1_4 = {};
	};
		
	var correctAnswers = ["True", "False", "False", "True"];
	$.k2l.m9a1_4.sound = new Audio();	
	$.k2l.m9a1_4.index = 0;
	$.k2l.m9a1_4.correctAnswers = correctAnswers;
	
	$.k2l.m9a1_4.questionWordLock = false; //variable to prevent multiple clicks of button
}

Template.m9a1_8.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a1_8"); 
	} 
}); 
 
Template.m9a1_8.events({
	
    "click #m9a1_8 .button2": function(evt) {
		
		var currentSection = $(evt.currentTarget).parents('section');
		var nextSection = $(evt.currentTarget).parents('section').next('section');
		var buttonValue = $(evt.currentTarget).data("value");
		
		if ($.k2l.m9a1_8.questionWordLock == false) {
			$.k2l.m9a1_8.questionWordLock = true;
			
			var correctAnswer = $.k2l.m9a1_8.correctAnswers[$.k2l.m9a1_8.index];
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
					$.k2l.m9a1_8.index++;
					$.k2l.m9a1_8.questionWordLock = false;
					$('#m9a1_8 .row#' + $.k2l.m9a1_8.index).removeClass('hidden');				
					
					if ($.k2l.m9a1_8.index < $.k2l.m9a1_8.correctAnswers.length) {
					setTimeout(function() {						
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');						
						$.k2l.m9a1_8.questionWordLock = false; // Make the buttons clickable again						
					}, 1000);
				} else {					
					setTimeout( function() {
						$('#welldonecap').removeClass('hidden');
						}, 1000);
					setTimeout( function() {
						$('#welldonecap').addClass('hidden');
					}, 2000);	
					setTimeout(function() {
						$.k2l.m9a1_8.index = 0;
						$.k2l.m9a1_8.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
						}
					$.k2l.m9a1_8.questionWordLock = false;
			}	else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
				$.k2l.m9a1_8.questionWordLock = false;
			}
    }
	},

		'click .buttonaudio': function(evt) {
			audioButtonClickSetup($.k2l.m9a1_8.sound, $(evt.currentTarget));
			playPauseAudio($.k2l.m9a1_8.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		$.k2l.m9a1_8.sound.src = {};
	},

	
	'click a.restart': function(evt){
	// When clicking to restart the activity this should reset the variables to
	// initial values.
	
	
		if(typeof $.k2l != 'undefined'){
		  if(typeof $.k2l.m9a1_8 != 'undefined'){
			if(typeof $.k2l.m9a1_8.index != 'undefined'){
				$.k2l.m9a1_8.index = 0;
			}
			if (typeof $.k2l.m9a1_8.wrongCount != 'undefined'){
				$.k2l.m9a1_8.wrongCount = 0;
			}
		  }
		}
	}
		
})

Template.m9a1_8.rendered = function (){
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m9a1_8 == 'undefined') {
		$.k2l.m9a1_8 = {};
	};
		
	var correctAnswers = ["False", "True", "True"];
	
	$.k2l.m9a1_8.sound = new Audio();
	$.k2l.m9a1_8.index = 0;
	$.k2l.m9a1_8.correctAnswers = correctAnswers;
	
	$.k2l.m9a1_8.questionWordLock = false; //variable to prevent multiple clicks of button
}

Template.m9a1_6.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a1_6"); 
	} 
}); 
 
Template.m9a1_6.events({
	
    "click #m9a1_6 .button2": function(evt) {
		
		var currentSection = $(evt.currentTarget).parents('section');
		var nextSection = $(evt.currentTarget).parents('section').next('section');
		var buttonValue = $(evt.currentTarget).data("value");
		
		if ($.k2l.m9a1_6.questionWordLock == false) {
			$.k2l.m9a1_6.questionWordLock = true;
			
			var correctAnswer = $.k2l.m9a1_6.correctAnswers[$.k2l.m9a1_6.index];
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
					$.k2l.m9a1_6.index++;
					$.k2l.m9a1_6.questionWordLock = false;
					$('#m9a1_6 .row#' + $.k2l.m9a1_6.index).removeClass('hidden');				
					
					if ($.k2l.m9a1_6.index < $.k2l.m9a1_6.correctAnswers.length) {
					setTimeout(function() {						
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');						
						$.k2l.m9a1_6.questionWordLock = false; // Make the buttons clickable again						
					}, 1000);
				} else {					
					setTimeout( function() {
						$('#welldonecap').removeClass('hidden');
						}, 1000);
					setTimeout( function() {
						$('#welldonecap').addClass('hidden');
					}, 2000);	
					setTimeout(function() {
						$.k2l.m9a1_6.index = 0;
						$.k2l.m9a1_6.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
						}
					$.k2l.m9a1_6.questionWordLock = false;
			}	else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
				$.k2l.m9a1_6.questionWordLock = false;
			}
    }
	},

		'click .buttonaudio': function(evt) {
			audioButtonClickSetup($.k2l.m9a1_6.sound, $(evt.currentTarget));
			playPauseAudio($.k2l.m9a1_6.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		$.k2l.m9a1_6.sound.src = {};
	},

	
	'click a.restart': function(evt){
	// When clicking to restart the activity this should reset the variables to
	// initial values.
	
	
		if(typeof $.k2l != 'undefined'){
		  if(typeof $.k2l.m9a1_6 != 'undefined'){
			if(typeof $.k2l.m9a1_6.index != 'undefined'){
				$.k2l.m9a1_6.index = 0;
			}
			if (typeof $.k2l.m9a1_6.wrongCount != 'undefined'){
				$.k2l.m9a1_6.wrongCount = 0;
			}
		  }
		}
	}
		
})

Template.m9a1_6.rendered = function (){
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m9a1_6 == 'undefined') {
		$.k2l.m9a1_6 = {};
	};
		
	var correctAnswers = ["False", "False", "True"];
	
	$.k2l.m9a1_6.sound = new Audio();	
	$.k2l.m9a1_6.index = 0;
	$.k2l.m9a1_6.correctAnswers = correctAnswers;
	
	$.k2l.m9a1_6.questionWordLock = false; //variable to prevent multiple clicks of button
}
