Template.m8a11.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m8a11_end') { 
			return false; 
		}
		return true;	 
	} 
}); 


Template.m8a11.events({
	"click .stuck-button": function(evt) {

			var currentSection = $(evt.currentTarget).parents('section');
			var nextSection = $(evt.currentTarget).parents('section').next('section');
			
			$('form.textentry').parent().html('<h4 class="text-center caption"> ' + $.k2l.m8a11.displayAnswers[$.k2l.m8a11.index] + ' </h4>');
			$('.incorrectscreen').addClass("hidden"); // Remove a cross if there is one.
			
			
			$.k2l.m8a11.index++; //increment the counter
			$(".stuck").addClass('hidden'); // Hide the stuck button if it is visible
			
			setTimeout(function(){
				$('.correctscreen').addClass("hidden");
				$('.incorrectscreen').addClass("hidden");
				currentSection.addClass('hidden'); // hide this page
				nextSection.removeClass('hidden');// reveal next page
				document.location.hash = nextSection.attr('id'); // change the hash
				Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
			}, 4000);
			
			$.k2l.m8a11.wrongCount = 0; // reset the wrongCount
		
		
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
		
		// Check if the answer is correct
		for (var i = 0; i < $.k2l.m8a11.correctAnswers[$.k2l.m8a11.index].length; i++) {
			if (userText == $.k2l.m8a11.correctAnswers[$.k2l.m8a11.index][i]){ 
				isCorrect = true;
				break;
			}
		}
		
		if (isCorrect) {
			
			var currentSection = $(evt.currentTarget).parents('section');
			var nextSection = $(evt.currentTarget).parents('section').next('section');
			
			$(evt.currentTarget).parent().html('<h4 class="text-center caption">' + $.k2l.m8a11.displayAnswers[$.k2l.m8a11.index] + ' </h4>');
			$('.incorrectscreen').addClass("hidden"); // Remove a cross if there is one.
			$('.correctscreen').removeClass("hidden");
			
			$.k2l.m8a11.index++; //increment the counter
			$(".stuck").addClass('hidden'); // Hide the stuck button if it is visible
			
			setTimeout(function(){
				$('.correctscreen').addClass("hidden");
				$('.incorrectscreen').addClass("hidden");
				currentSection.addClass('hidden'); // hide this page
				nextSection.removeClass('hidden');// reveal next page
				document.location.hash = nextSection.attr('id'); // change the hash
				Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
			}, 1500);
			
			$.k2l.m8a11.wrongCount = 0; // reset the wrongCount
		} else {
			
			// Incorrect Answer
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function(){
				$('.incorrectscreen').addClass("hidden");
			}, 1000)
			$.k2l.m8a11.wrongCount++;
			
			if ($.k2l.m8a11.wrongCount >= 1) {
				$(".stuck").removeClass('hidden');
				
				$.k2l.m8a11.wrongCount = 0;
			}
		}
	},
	
	'click a[data-function="restart"]': function(evt){
	// When clicking to restart the activity this should reset the variables to
	// initial values.
	
	
		if(typeof $.k2l != 'undefined'){
		  if(typeof $.k2l.m8a11 != 'undefined'){
			if(typeof $.k2l.m8a11.index != 'undefined'){
				$.k2l.m8a11.index = 0;
			}
			if (typeof $.k2l.m8a11.wrongCount != 'undefined'){
				$.k2l.m8a11.wrongCount = 0;
			}
		  }
		}
	}
		
})

Template.m8a11.rendered = function (){
	document.title = "Journey 2 English";
	
	setStartActivity(8,11);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 11, subpage);
			oldLocation = location.href;
		}
	}, 500);
		

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a11 == 'undefined') {
		$.k2l.m8a11 = {};
	};
		
		// the actual answers in acceptable form (after lowercase and trimming)
		var correctAnswers = [
			["consultant", "consultants"], // Possible answers for Q1.
			["steady"],   // Possible answers for Q2.
			["unconventional"], // etc.
			["the more"],
			["compensation"],
			["peculiar"],
			["boost"]
		]
		
		// The answers as they should be displayed
		var displayAnswers = ["consultants", "steady", "unconventional", "the more", "compensation", 
							"peculiar", "boost"];
		
	$.k2l.m8a11.index = 0;
	$.k2l.m8a11.correctAnswers = correctAnswers;
	$.k2l.m8a11.displayAnswers = displayAnswers;
	$.k2l.m8a11.wrongCount = 0;
}
Template.m8a11_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a11_1"); 
	} 
}); 
 
Template.m8a11_1.events({ 
 
}); 
 
Template.m8a11_1.rendered = function() {
}

Template.m8a11_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a11_2"); 
	} 
}); 
 
Template.m8a11_2.events({ 
 
}); 
 
Template.m8a11_2.rendered = function() {
}

Template.m8a11_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a11_3"); 
	} 
}); 
 
Template.m8a11_3.events({ 
 
}); 
 
Template.m8a11_3.rendered = function() {
}

Template.m8a11_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a11_4"); 
	} 
}); 
 
Template.m8a11_4.events({ 
 
}); 
 
Template.m8a11_4.rendered = function() {
}

Template.m8a11_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a11_5"); 
	} 
}); 
 
Template.m8a11_5.events({ 
 
}); 
 
Template.m8a11_5.rendered = function() {
}

Template.m8a11_6.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a11_6"); 
	} 
}); 
 
Template.m8a11_6.events({ 
 
}); 
 
Template.m8a11_6.rendered = function() {
}

Template.m8a11_7.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a11_7"); 
	} 
}); 
 
Template.m8a11_7.events({ 
 
}); 
 
Template.m8a11_7.rendered = function() {
}


Template.m8a11.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 11, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a11.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
