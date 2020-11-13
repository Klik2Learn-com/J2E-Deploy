Template.m7a4.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m7a4_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m7a4.events({
	"click .stuck-button": function(evt) {
		
			var currentSection = $(evt.currentTarget).parents('section');
			var nextSection = $(evt.currentTarget).parents('section').next('section');
			
			$('form.textentry').parent().html('<h4 class="text-center caption"> ' + $.k2l.m7a4.displayAnswers[$.k2l.m7a4.index] + ' </h4>');
			$('.incorrectscreen').addClass("hidden"); // Remove a cross if there is one.
			
			
			$.k2l.m7a4.index++; //increment the counter
			$(".stuck").addClass('hidden'); // Hide the stuck button if it is visible
			
			setTimeout(function(){
				$('.correctscreen').addClass("hidden");
				$('.incorrectscreen').addClass("hidden");
				currentSection.addClass('hidden'); // hide this page
				nextSection.removeClass('hidden');// reveal next page
				document.location.hash = nextSection.attr('id'); // change the hash
				Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
			}, 4000);
			
			$.k2l.m7a4.wrongCount = 0; // reset the wrongCount
		
		
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
		for (var i = 0; i < $.k2l.m7a4.correctAnswers[$.k2l.m7a4.index].length; i++) {
			if (userText == $.k2l.m7a4.correctAnswers[$.k2l.m7a4.index][i]){ 
				isCorrect = true;
				break;
			}
		}
		
		if (isCorrect) {
			
			var currentSection = $(evt.currentTarget).parents('section');
			var nextSection = $(evt.currentTarget).parents('section').next('section');
			
			$(evt.currentTarget).parent().html('<h4 class="text-center caption">' + $.k2l.m7a4.displayAnswers[$.k2l.m7a4.index] + ' </h4>');
			$('.incorrectscreen').addClass("hidden"); // Remove a cross if there is one.
			$('.correctscreen').removeClass("hidden");
			
			$.k2l.m7a4.index++; //increment the counter
			$(".stuck").addClass('hidden'); // Hide the stuck button if it is visible
			
			setTimeout(function(){
				$('.correctscreen').addClass("hidden");
				$('.incorrectscreen').addClass("hidden");
				currentSection.addClass('hidden'); // hide this page
				nextSection.removeClass('hidden');// reveal next page
				document.location.hash = nextSection.attr('id'); // change the hash
				Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
			}, 1500);
			
			$.k2l.m7a4.wrongCount = 0; // reset the wrongCount
		} else {
			
			// Incorrect Answer
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function(){
				$('.incorrectscreen').addClass("hidden");
			}, 1000)
			$.k2l.m7a4.wrongCount++;
			
			if ($.k2l.m7a4.wrongCount >= 1) {
				$(".stuck").removeClass('hidden');
				
				$.k2l.m7a4.wrongCount = 0;
			}
		}
	},
	
	'click a[data-function="restart"]': function(evt){
	// When clicking to restart the activity this should reset the variables to
	// initial values.
	
	
		if(typeof $.k2l != 'undefined'){
		  if(typeof $.k2l.m7a4 != 'undefined'){
			if(typeof $.k2l.m7a4.index != 'undefined'){
				$.k2l.m7a4.index = 0;
			}
			if (typeof $.k2l.m7a4.wrongCount != 'undefined'){
				$.k2l.m7a4.wrongCount = 0;
			}
		  }
		}
	}
		
})

Template.m7a4.rendered = function (){
		document.title = "Journey 2 English";
	
	setStartActivity(7, 4);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(7, 4, subpage);
			oldLocation = location.href;
		}
	}, 500);
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a4 == 'undefined') {
		$.k2l.m7a4 = {};
	};
		
		// the actual answers in acceptable form (after lowercase and trimming)
				var correctAnswers = [
			["vivid"],
			["fully-rounded", "fully - rounded", "fully- rounded", "fully -rounded"],
			["switch off"],
			["turn up"],
			["outstanding"],
			["breaks into a broad smile"],
		];
		
		
		// The answers as they should be displayed
		var displayAnswers = ["vivid","fully-rounded","switch off","turn up","outstanding","breaks into a broad smile"];
		
	$.k2l.m7a4.index = 0;
	$.k2l.m7a4.correctAnswers = correctAnswers;
	$.k2l.m7a4.displayAnswers = displayAnswers;
	$.k2l.m7a4.wrongCount = 0;
}


Template.m7a4_1.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a4_1");
	}
});

Template.m7a4_2.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a4_2");
	}
});

Template.m7a4_3.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a4_3");
	}
});

Template.m7a4_4.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a4_4");
	}
});

Template.m7a4_5.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a4_5");
	}
});

Template.m7a4_6.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a4_6");
	}
});

Template.m7a4_input.rendered = function(){
    $('input[name=userText]').first().focus();
}



Template.m7a4.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 7, 4, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m7a4.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
