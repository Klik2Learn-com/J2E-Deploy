// This code works over multiple slides, only one this one .js page is needed. Set the Template. functions to the base activity
	//GIVE ALL activeSection PAGES A HELPER CLASS
// i.e. m1a20 and not the sub sections such as m1a20_2
Template.m4a10.events({
	"click .stuck-button": function(evt) {
		
			var currentSection = $(evt.currentTarget).parents('section');
			var nextSection = $(evt.currentTarget).parents('section').next('section');
			
			$('.incorrectscreen').addClass('hidden');
			var parentSection = $(evt.currentTarget).parents('section');

			// $('#entryanswer').html($.k2l.m4a10.correctAnswers[$.k2l.m4a10.index]);
			$('#entryanswer').html($.k2l.m4a10.displayAnswers[$.k2l.m4a10.index]); // use this is there is multiple possible answers
			$('#entryanswer').addClass('correctword');
			
			
			$.k2l.m4a10.index++; //increment the counter
			$(".stuck").addClass('hidden'); // Hide the stuck button if it is visible
			
			setTimeout(function(){
				$('.correctscreen').addClass("hidden");
				$('.incorrectscreen').addClass("hidden");
				currentSection.addClass('hidden'); // hide this page
				nextSection.removeClass('hidden');// reveal next page
				document.location.hash = nextSection.attr('id'); // change the hash
				Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
			}, 4000);
			
			$.k2l.m4a10.wrongCount = 0; // reset the wrongCount
		
		
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
		for (var i = 0; i < $.k2l.m4a10.correctAnswers[$.k2l.m4a10.index].length; i++) {
			if (userText == $.k2l.m4a10.correctAnswers[$.k2l.m4a10.index][i]){ 
				isCorrect = true;
				break;
			}
		}
		
		if (isCorrect) {
			
			var currentSection = $(evt.currentTarget).parents('section');
			var nextSection = $(evt.currentTarget).parents('section').next('section');
			
			//$('#entryanswer').html($.k2l.m4a10.correctAnswers[$.k2l.m4a10.index]);
			$('#entryanswer').html($.k2l.m4a10.displayAnswers[$.k2l.m4a10.index]); // use this is there is multiple possible answers
			$('#entryanswer').addClass('correctword');
			$('.incorrectscreen').addClass("hidden"); // Remove a cross if there is one.
			$('.correctscreen').removeClass("hidden");
			
			$.k2l.m4a10.index++; //increment the counter
			$(".stuck").addClass('hidden'); // Hide the stuck button if it is visible
			
			if($.k2l.m4a10.index > $.k2l.m4a10.correctAnswers.length-1) {
				setTimeout(function(){
					$('.correctscreen').addClass("hidden");
					$('#welldonecap').removeClass('hidden');
				}, 1000);
			}
			setTimeout(function(){
				$('.correctscreen').addClass("hidden");
				$('.incorrectscreen').addClass("hidden");
				$('#welldonecap').addClass('hidden');
				currentSection.addClass('hidden'); // hide this page
				nextSection.removeClass('hidden');// reveal next page
				document.location.hash = nextSection.attr('id'); // change the hash
				Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
			}, 2000);
			
			$.k2l.m4a10.wrongCount = 0; // reset the wrongCount
		} else {
			
			// Incorrect Answer
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function(){
				$('.incorrectscreen').addClass("hidden");
			}, 1000)
			$.k2l.m4a10.wrongCount++;
			
			if ($.k2l.m4a10.wrongCount >= 1) {
				$(".stuck").removeClass('hidden');
				
				$.k2l.m4a10.wrongCount = 0;
			}
		}
	},
	
	'click a.restart': function(evt){
	// When clicking to restart the activity this should reset the variables to
	// initial values.
	
	
		if(typeof $.k2l != 'undefined'){
		  if(typeof $.k2l.m4a10 != 'undefined'){
			if(typeof $.k2l.m4a10.index != 'undefined'){
				$.k2l.m4a10.index = 0;
			}
			if (typeof $.k2l.m4a10.wrongCount != 'undefined'){
				$.k2l.m4a10.wrongCount = 0;
			}
		  }
		}
	}
		
})

Template.m4a10.rendered = function (){
		document.title = "Journey 2 English";
	
	setStartActivity(4, 10);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 10, subpage);
			oldLocation = location.href;
		}
	}, 500);
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m4a10 == 'undefined') {
		$.k2l.m4a10 = {};
	};
		
		// the actual answers in acceptable form (after lowercase and trimming)
		var correctAnswers = [
			["collapsed"], // Possible answers for Q1.
			["cut"],   // Possible answers for Q2.
			["woke"], // etc.
			["fell"],
			["twisted"],
			["burnt","burned"],
			["upset"],
			["sick"],
			["scalded"],
			["headache"],
			["cold"],
			["broke"]
		];

		var displayAnswers = [
			["collapsed"], // Possible answers for Q1.
			["cut"],   // Possible answers for Q2.
			["woke"], // etc.
			["fell"],
			["twisted"],
			["burnt/burned"],
			["upset"],
			["sick"],
			["scalded"],
			["headache"],
			["cold"],
			["broke"]
		];
		
		// The answers as they should be displayed
		// var displayAnswers = ["myth", "happy-go-lucky", "copes well with a crisis", "data", "unfounded", 
							// "exaggerate", "nevertheless", "in a good light", "serve a purpose"];
		
	$.k2l.m4a10.index = 0;
	$.k2l.m4a10.correctAnswers = correctAnswers;
	$.k2l.m4a10.displayAnswers = displayAnswers;
	$.k2l.m4a10.wrongCount = 0;
}

Template.m4a10.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m4a10_end') { 
			return false; 
		}		return true;	 
  } 
});



Template.m4a10.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 10, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a10.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m4a10_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a10_1");
	}
});

Template.m4a10_2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a10_2");
	}
});

Template.m4a10_3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a10_3");
	}
});

Template.m4a10_4.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a10_4");
	}
});

Template.m4a10_5.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a10_5");
	}
});

Template.m4a10_6.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a10_6");
	}
});
Template.m4a10_7.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a10_7");
	}
});
Template.m4a10_8.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a10_8");
	}
});
Template.m4a10_9.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a10_9");
	}
});
Template.m4a10_10.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a10_10");
	}
});
Template.m4a10_4b.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a10_4b");
	}
});
Template.m4a10_6b.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a10_6b");
	}
});

