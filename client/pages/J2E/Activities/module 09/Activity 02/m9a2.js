Template.m9a2.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m9a2_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m9a2.events({
	"click #stuckanswer .stuck-button": function(evt) {
		
			var currentSection = $(evt.currentTarget).parents('section');
			var nextSection = $(evt.currentTarget).parents('section').next('section');
			
			$('form.textentry').parent().html('<h4 class="text-center caption"> ' + $.k2l.m9a2.displayAnswers[$.k2l.m9a2.index] + ' </h4>');
			$('.incorrectscreen').addClass("hidden"); // Remove a cross if there is one.
			
			
			$.k2l.m9a2.index++; //increment the counter
			$(".stuck").addClass('hidden'); // Hide the stuck button if it is visible
			
			setTimeout(function(){
				$('.correctscreen').addClass("hidden");
				$('.incorrectscreen').addClass("hidden");
				currentSection.addClass('hidden'); // hide this page
				nextSection.removeClass('hidden');// reveal next page
				document.location.hash = nextSection.attr('id'); // change the hash
				Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
			}, 1500);
			
			$.k2l.m9a2.wrongCount = 0; // reset the wrongCount
		
		
	},

	"click #stuckhint .stuck-button": function(evt) {
		$('#m9a2_modal').modal('show'); 
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
		for (var i = 0; i < $.k2l.m9a2.correctAnswers[$.k2l.m9a2.index].length; i++) {
			if (userText == $.k2l.m9a2.correctAnswers[$.k2l.m9a2.index][i]){ 
				isCorrect = true;
				break;
			}
		}
		
		if (isCorrect) {
			
			var currentSection = $(evt.currentTarget).parents('section');
			var nextSection = $(evt.currentTarget).parents('section').next('section');
			
			$(evt.currentTarget).parent().html('<h4 class="text-center caption">' + $.k2l.m9a2.displayAnswers[$.k2l.m9a2.index] + ' </h4>');
			$('.incorrectscreen').addClass("hidden"); // Remove a cross if there is one.
			$('.correctscreen').removeClass("hidden");
			
			$.k2l.m9a2.index++; //increment the counter
			$(".stuck").addClass('hidden'); // Hide the stuck button if it is visible
			
			setTimeout(function(){
				$.k2l.m9a2.sound.src = {};
				$('.correctscreen').addClass("hidden");
				$('.incorrectscreen').addClass("hidden");
				currentSection.addClass('hidden'); // hide this page
				nextSection.removeClass('hidden');// reveal next page
				document.location.hash = nextSection.attr('id'); // change the hash
				Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
			}, 1500);
			
			$.k2l.m9a2.wrongCount = 0; // reset the wrongCount
		} else {
			
			// Incorrect Answer
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function(){
				$('.incorrectscreen').addClass("hidden");
			}, 1000)
			$.k2l.m9a2.wrongCount++;
			
			if ($.k2l.m9a2.wrongCount >= 1) {
				$("#stuckhint").removeClass('hidden');
				
				//$.k2l.m9a2.wrongCount = 0;
			}

			if ($.k2l.m9a2.wrongCount >= 3) {
				$("#stuckanswer").removeClass('hidden');
				$("#stuckhint").addClass('hidden');
				
				$.k2l.m9a2.wrongCount = 0;
			}
		}
	},
	
	'click a[data-function="restart"]': function(evt){
	// When clicking to restart the activity this should reset the variables to
	// initial values.
	
	
		if(typeof $.k2l != 'undefined'){
		  if(typeof $.k2l.m9a2 != 'undefined'){
			if(typeof $.k2l.m9a2.index != 'undefined'){
				$.k2l.m9a2.index = 0;
			}
			if (typeof $.k2l.m9a2.wrongCount != 'undefined'){
				$.k2l.m9a2.wrongCount = 0;
			}
		  }
		}
	},

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m9a2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m9a2.sound, $(evt.currentTarget));
	},

	'click .pagination': function(evt) {
		
		$.k2l.m9a2.sound.src = {};
	}
		
})

Template.m9a2.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(9,2);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(9, 2, subpage);
			oldLocation = location.href;
		}
	}, 500);

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m9a2 == 'undefined') {
		$.k2l.m9a2 = {};
	};
		
		$.k2l.m9a2.sound = new Audio();

		// the actual answers in acceptable form (after lowercase and trimming)
		var correctAnswers = [
			["big head", "to get a big head", "big-headed", "big headed"], // Possible answers for Q1.
			["full of yourself", "to get a little full of yourself"],   // Possible answers for Q2.
			["work ethic"], // etc.
			["fun stuff"],
			["drudgery"],
			["glamorous"],
			["to grow a thick skin"],
			["learn to deal with it"],
			["incredibly"],
			["mentor"],
			["in the process"]
		]
		
		// The answers as they should be displayed
		var displayAnswers = ["to get a big head","to get a little full of yourself","work ethic","fun stuff","drudgery","glamorous","to grow a thick skin","learn to deal with it","incredibly","mentor","in the process"];
		
	$.k2l.m9a2.index = 0;
	$.k2l.m9a2.correctAnswers = correctAnswers;
	$.k2l.m9a2.displayAnswers = displayAnswers;
	$.k2l.m9a2.wrongCount = 0;
		
}

Template.m9a2.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 9, 2, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m9a2.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m9a2_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a2_3"); 
	} 
}); 
 
Template.m9a2_3.events({ 
 
}); 
 
Template.m9a2_3.rendered = function() {
}

Template.m9a2_10.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a2_10"); 
	} 
}); 
 
Template.m9a2_10.events({ 
 
}); 
 
Template.m9a2_10.rendered = function() {
}

Template.m9a2_6.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a2_6"); 
	} 
}); 
 
Template.m9a2_6.events({ 
 
}); 
 
Template.m9a2_6.rendered = function() {
}

Template.m9a2_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a2_2"); 
	} 
}); 
 
Template.m9a2_2.events({ 
 
}); 
 
Template.m9a2_2.rendered = function() {
}

Template.m9a2_9.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a2_9"); 
	} 
}); 
 
Template.m9a2_9.events({ 
 
}); 
 
Template.m9a2_9.rendered = function() {
}

Template.m9a2_11.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a2_11"); 
	} 
}); 
 
Template.m9a2_11.events({ 
 
}); 
 
Template.m9a2_11.rendered = function() {
}

Template.m9a2_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a2_5"); 
	} 
}); 
 
Template.m9a2_5.events({ 
 
}); 
 
Template.m9a2_5.rendered = function() {
}

Template.m9a2_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a2_4"); 
	} 
}); 
 
Template.m9a2_4.events({ 
 
}); 
 
Template.m9a2_4.rendered = function() {
}

Template.m9a2_7.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a2_7"); 
	} 
}); 
 
Template.m9a2_7.events({ 
 
}); 
 
Template.m9a2_7.rendered = function() {
}

Template.m9a2_8.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a2_8"); 
	} 
}); 
 
Template.m9a2_8.events({ 
 
}); 
 
Template.m9a2_8.rendered = function() {
}

Template.m9a2_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a2_1"); 
	} 
}); 
 
Template.m9a2_1.events({ 
 
}); 
 
Template.m9a2_1.rendered = function() {
}
