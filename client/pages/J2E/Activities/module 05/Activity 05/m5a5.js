// This code works over multiple slides, only one this one .js page is needed. Set the Template. functions to the base activity
	//GIVE ALL activeSection PAGES A HELPER CLASS
// i.e. m1a20 and not the sub sections such as m1a20_2
Template.m5a5.events({
	"click .stuck-button": function(evt) {
		
			var currentSection = $(evt.currentTarget).parents('section');
			var nextSection = $(evt.currentTarget).parents('section').next('section');
			
			$('form.textentry').parent().html($.k2l.m5a5.correctAnswers[$.k2l.m5a5.index]);
			$('#entryanswer').addClass('correctword');
			$('.incorrectscreen').addClass("hidden"); // Remove a cross if there is one.
			
			
			$.k2l.m5a5.index++; //increment the counter
			$(".stuck").addClass('hidden'); // Hide the stuck button if it is visible
			
			setTimeout(function(){
				$('.correctscreen').addClass("hidden");
				$('.incorrectscreen').addClass("hidden");
				currentSection.addClass('hidden'); // hide this page
				nextSection.removeClass('hidden');// reveal next page
				document.location.hash = nextSection.attr('id'); // change the hash
				Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
			}, 4000);
			
			$.k2l.m5a5.wrongCount = 0; // reset the wrongCount
		
		
	},

	"submit form": function(evt) {
		if (evt.preventDefault){
			evt.preventDefault();
		}
		var isCorrect = false;
		
		// Tidy up the user's input
		var userText = evt.target.userText.value;
		if (userText.charAt(userText.length - 1) == '.') {
			userText = userText.substr(0, userText.length - 1);
		}
		userText = $.trim(userText);
		userText = userText.toLowerCase();
		
		// // Check if the answer is correct
		// for (var i = 0; i < $.k2l.m5a5.correctAnswers[$.k2l.m5a5.index].length; i++) {
			// if (userText == $.k2l.m5a5.correctAnswers[$.k2l.m5a5.index][i]){ 
				// isCorrect = true;
				// break;
			// }
		// }
		
		if (userText == $.k2l.m5a5.correctAnswers[$.k2l.m5a5.index]) {
			
			var currentSection = $(evt.currentTarget).parents('section');
			var nextSection = $(evt.currentTarget).parents('section').next('section');
			
			$(evt.currentTarget).parent().html($.k2l.m5a5.correctAnswers[$.k2l.m5a5.index]);
			$('#entryanswer').addClass('correctword');
			$('.incorrectscreen').addClass("hidden"); // Remove a cross if there is one.
			$('.correctscreen').removeClass("hidden");
			
			setTimeout( function() {
					$('.correctscreen').addClass("hidden");
				}, 1000);	
				
			if ($.k2l.m5a5.index == $.k2l.m5a5.correctAnswers.length-1){
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);	
			}
			
			$.k2l.m5a5.index++; //increment the counter
			$(".stuck").addClass('hidden'); // Hide the stuck button if it is visible
			
			setTimeout(function(){
				$('.correctscreen').addClass("hidden");
				$('.incorrectscreen').addClass("hidden");
				$('#welldonecap').addClass("hidden");		
				currentSection.addClass('hidden'); // hide this page
				nextSection.removeClass('hidden');// reveal next page
				document.location.hash = nextSection.attr('id'); // change the hash
				Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
			}, 2000);
			
			$.k2l.m5a5.wrongCount = 0; // reset the wrongCount
		} else {
			
			// Incorrect Answer
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function(){
				$('.incorrectscreen').addClass("hidden");
			}, 1000)
			$.k2l.m5a5.wrongCount++;
			
			if ($.k2l.m5a5.wrongCount >= 1) {
				$(".stuck").removeClass('hidden');
				
				$.k2l.m5a5.wrongCount = 0;
			}
		}
	},
	
	'click a.restart': function(evt){
	// When clicking to restart the activity this should reset the variables to
	// initial values.
	
	
		if(typeof $.k2l != 'undefined'){
		  if(typeof $.k2l.m5a5 != 'undefined'){
			if(typeof $.k2l.m5a5.index != 'undefined'){
				$.k2l.m5a5.index = 0;
			}
			if (typeof $.k2l.m5a5.wrongCount != 'undefined'){
				$.k2l.m5a5.wrongCount = 0;
			}
		  }
		}
	}
		
})

Template.m5a5.rendered = function (){
		document.title = "Journey 2 English";
	
	setStartActivity(5, 5);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(5, 5, subpage);
			oldLocation = location.href;
		}
	}, 500);
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m5a5 == 'undefined') {
		$.k2l.m5a5 = {};
	};
		
		// the actual answers in acceptable form (after lowercase and trimming)
		var correctAnswers = [
			["arrived"], // Possible answers for Q1.
			["walked"],   // Possible answers for Q2.
			["washed"], // etc.
			["played"],
			["liked"],
			["swam"],
			["went"],
			["wore"],
			["ate"],
			["bought"]
		]
		
		// The answers as they should be displayed
		// var displayAnswers = ["myth", "happy-go-lucky", "copes well with a crisis", "data", "unfounded", 
							// "exaggerate", "nevertheless", "in a good light", "serve a purpose"];
		
	$.k2l.m5a5.index = 0;
	$.k2l.m5a5.correctAnswers = correctAnswers;
	// $.k2l.m5a5.displayAnswers = displayAnswers;
	$.k2l.m5a5.wrongCount = 0;
}

Template.m5a5.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m5a5_end') { 
			return false; 
		}		return true;	 
  } 
});


Template.m5a5.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 5, 5, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m5a5.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m5a5_4.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a5_4");
	}
});
Template.m5a5_5.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a5_5");
	}
});

Template.m5a5_6.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a5_6");
	}
});
Template.m5a5_7.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a5_7");
	}
});
Template.m5a5_8.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a5_8");
	}
});
Template.m5a5_9.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a5_9");
	}
});
Template.m5a5_10.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a5_10");
	}
});
Template.m5a5_11.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a5_11");
	}
});
Template.m5a5_12.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a5_12");
	}
});
Template.m5a5_13.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a5_13");
	}
});


Template.m5a5_input.rendered = function(){
    $('input[name=userText]').first().focus();
}

