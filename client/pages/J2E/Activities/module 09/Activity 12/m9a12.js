Template.m9a12.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m9a12_end') { 
			return false; 
		}
		return true;	 
	} 
}); 


Template.m9a12.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 9, 12, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m9a12.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


Template.m9a12.events({
	"click .stuck-button": function(evt) {
		
			var currentSection = $(evt.currentTarget).parents('section');
			var nextSection = $(evt.currentTarget).parents('section').next('section');
			
			$('form.textentry').parent().html('<h4 class="text-center caption"> ' + $.k2l.m9a12.displayAnswers[$.k2l.m9a12.index] + ' </h4>');
			$('.incorrectscreen').addClass("hidden"); // Remove a cross if there is one.
			
			
			$.k2l.m9a12.index++; //increment the counter
			$(".stuck").addClass('hidden'); // Hide the stuck button if it is visible
			
			setTimeout(function(){
				$('.correctscreen').addClass("hidden");
				$('.incorrectscreen').addClass("hidden");
				currentSection.addClass('hidden'); // hide this page
				nextSection.removeClass('hidden');// reveal next page
				document.location.hash = nextSection.attr('id'); // change the hash
				Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
			}, 4000);
			
			$.k2l.m9a12.wrongCount = 0; // reset the wrongCount
		
		
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
		for (var i = 0; i < $.k2l.m9a12.correctAnswers[$.k2l.m9a12.index].length; i++) {
			if (userText == $.k2l.m9a12.correctAnswers[$.k2l.m9a12.index][i]){ 
				isCorrect = true;
				break;
			}
		}
		
		if (isCorrect) {
			
			var currentSection = $(evt.currentTarget).parents('section');
			var nextSection = $(evt.currentTarget).parents('section').next('section');
			
			$(evt.currentTarget).parent().html('<h4 class="text-center caption">' + $.k2l.m9a12.displayAnswers[$.k2l.m9a12.index] + ' </h4>');
			$('.incorrectscreen').addClass("hidden"); // Remove a cross if there is one.
			$('.correctscreen').removeClass("hidden");
			
			$.k2l.m9a12.index++; //increment the counter
			$(".stuck").addClass('hidden'); // Hide the stuck button if it is visible
			
			setTimeout(function(){
				$('.correctscreen').addClass("hidden");
				$('.incorrectscreen').addClass("hidden");
				currentSection.addClass('hidden'); // hide this page
				nextSection.removeClass('hidden');// reveal next page
				document.location.hash = nextSection.attr('id'); // change the hash
				Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
			}, 1500);
			
			$.k2l.m9a12.wrongCount = 0; // reset the wrongCount
		} else {
			
			// Incorrect Answer
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function(){
				$('.incorrectscreen').addClass("hidden");
			}, 1000)
			$.k2l.m9a12.wrongCount++;
			
			if ($.k2l.m9a12.wrongCount >= 1) {
				$(".stuck").removeClass('hidden');
				
				$.k2l.m9a12.wrongCount = 0;
			}
		}
	},
	
	'click a[data-function="restart"]': function(evt){
	// When clicking to restart the activity this should reset the variables to
	// initial values.
	
	
		if(typeof $.k2l != 'undefined'){
		  if(typeof $.k2l.m9a12 != 'undefined'){
			if(typeof $.k2l.m9a12.index != 'undefined'){
				$.k2l.m9a12.index = 0;
			}
			if (typeof $.k2l.m9a12.wrongCount != 'undefined'){
				$.k2l.m9a12.wrongCount = 0;
			}
		  }
		}
	}
		
})

Template.m9a12.rendered = function (){
	document.title = "Journey 2 English";
	
	setStartActivity(9,12);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(9, 12, subpage);
			oldLocation = location.href;
		}
	}, 500);
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m9a12 == 'undefined') {
		$.k2l.m9a12 = {};
	};
		
		// the actual answers in acceptable form (after lowercase and trimming)
		var correctAnswers = [
			["first hand"], // Possible answers for Q1.
			["temporary"],   // Possible answers for Q2.
			["shift"], // etc.
			["sacked"],
			["takes on", "take on"],
			["multinationals", "multinational"],
			["minimal"],
			["master", "mastered"],
			["figuring out","figure out"],
			["fulfilment centre"],
			["cog"],
			["massive"],
			["enormous"]

		]
		
		// The answers as they should be displayed
		var displayAnswers = ["first hand","temporary","shift","sacked","takes on", "multinationals","minimal","mastered","figuring out","fulfilment centre","cog","massive","enormous"];
		
	$.k2l.m9a12.index = 0;
	$.k2l.m9a12.correctAnswers = correctAnswers;
	$.k2l.m9a12.displayAnswers = displayAnswers;
	$.k2l.m9a12.wrongCount = 0;
}
Template.m9a12_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a12_2"); 
	} 
}); 
 
Template.m9a12_2.events({ 
 
}); 
 
Template.m9a12_2.rendered = function() {
}

Template.m9a12_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a12_3"); 
	} 
}); 
 
Template.m9a12_3.events({ 
 
}); 
 
Template.m9a12_3.rendered = function() {
}

Template.m9a12_7.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a12_7"); 
	} 
}); 
 
Template.m9a12_7.events({ 
 
}); 
 
Template.m9a12_7.rendered = function() {
}

Template.m9a12_11.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a12_11"); 
	} 
}); 
 
Template.m9a12_11.events({ 
 
}); 
 
Template.m9a12_11.rendered = function() {
}

Template.m9a12_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a12_1"); 
	} 
}); 
 
Template.m9a12_1.events({ 
 
}); 
 
Template.m9a12_1.rendered = function() {
}

Template.m9a12_9.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a12_9"); 
	} 
}); 
 
Template.m9a12_9.events({ 
 
}); 
 
Template.m9a12_9.rendered = function() {
}

Template.m9a12_10.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a12_10"); 
	} 
}); 
 
Template.m9a12_10.events({ 
 
}); 
 
Template.m9a12_10.rendered = function() {
}

Template.m9a12_8.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a12_8"); 
	} 
}); 
 
Template.m9a12_8.events({ 
 
}); 
 
Template.m9a12_8.rendered = function() {
}

Template.m9a12_13.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a12_13"); 
	} 
}); 
 
Template.m9a12_13.events({ 
 
}); 
 
Template.m9a12_13.rendered = function() {
}

Template.m9a12_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a12_4"); 
	} 
}); 
 
Template.m9a12_4.events({ 
 
}); 
 
Template.m9a12_4.rendered = function() {
}

Template.m9a12_6.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a12_6"); 
	} 
}); 
 
Template.m9a12_6.events({ 
 
}); 
 
Template.m9a12_6.rendered = function() {
}

Template.m9a12_12.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a12_12"); 
	} 
}); 
 
Template.m9a12_12.events({ 
 
}); 
 
Template.m9a12_12.rendered = function() {
}

Template.m9a12_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a12_5"); 
	} 
}); 
 
Template.m9a12_5.events({ 
 
}); 
 
Template.m9a12_5.rendered = function() {
}
