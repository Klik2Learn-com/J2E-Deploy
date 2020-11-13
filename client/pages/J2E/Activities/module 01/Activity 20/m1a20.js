Template.m1a20.events({
	"click .stuck-button": function(evt) {
		
			var currentSection = $(evt.currentTarget).parents('section');
			var nextSection = $(evt.currentTarget).parents('section').next('section');
			
			$('form.textentry').parent().html('<h4 class="text-center caption"> ' + $.k2l.m1a20.displayAnswers[$.k2l.m1a20.index] + ' </h4>');
			$('.incorrectscreen').addClass("hidden"); // Remove a cross if there is one.
			
			
			$.k2l.m1a20.index++; //increment the counter
			$(".stuck").addClass('hidden'); // Hide the stuck button if it is visible
			
			setTimeout(function(){
				$('.correctscreen').addClass("hidden");
				$('.incorrectscreen').addClass("hidden");
				currentSection.addClass('hidden'); // hide this page
				nextSection.removeClass('hidden');// reveal next page
				document.location.hash = nextSection.attr('id'); // change the hash
				Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
			}, 4000);
			
			$.k2l.m1a20.wrongCount = 0; // reset the wrongCount
		
		
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
		for (var i = 0; i < $.k2l.m1a20.correctAnswers[$.k2l.m1a20.index].length; i++) {
			if (userText == $.k2l.m1a20.correctAnswers[$.k2l.m1a20.index][i]){ 
				isCorrect = true;
				break;
			}
		}
		
		if (isCorrect) {
			
			var currentSection = $(evt.currentTarget).parents('section');
			var nextSection = $(evt.currentTarget).parents('section').next('section');
			
			$(evt.currentTarget).parent().html('<h4 class="text-center caption">' + $.k2l.m1a20.displayAnswers[$.k2l.m1a20.index] + ' </h4>');
			$('.incorrectscreen').addClass("hidden"); // Remove a cross if there is one.
			$('.correctscreen').removeClass("hidden");
			
			$.k2l.m1a20.index++; //increment the counter
			$(".stuck").addClass('hidden'); // Hide the stuck button if it is visible
			
			setTimeout(function(){
				$('.correctscreen').addClass("hidden");
				$('.incorrectscreen').addClass("hidden");
				currentSection.addClass('hidden'); // hide this page
				nextSection.removeClass('hidden');// reveal next page
				document.location.hash = nextSection.attr('id'); // change the hash
				Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
			}, 1500);
			
			$.k2l.m1a20.wrongCount = 0; // reset the wrongCount
		} else {
			
			// Incorrect Answer
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function(){
				$('.incorrectscreen').addClass("hidden");
			}, 1000)
			$.k2l.m1a20.wrongCount++;
			
			if ($.k2l.m1a20.wrongCount >= 1) {
				$(".stuck").removeClass('hidden');
				
				$.k2l.m1a20.wrongCount = 0;
			}
		}
	},
	
	'click a.restart': function(evt){
	// When clicking to restart the activity this should reset the variables to
	// initial values.
	
		if(typeof $.k2l != 'undefined'){
		  if(typeof $.k2l.m1a20 != 'undefined'){
			if(typeof $.k2l.m1a20.index != 'undefined'){
				$.k2l.m1a20.index = 0;
			}
			if (typeof $.k2l.m1a20.wrongCount != 'undefined'){
				$.k2l.m1a20.wrongCount = 0;
			}
		  }
		}
	}
		
})

Template.m1a20.rendered = function (){

	document.title = "Journey 2 English";
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m1a20 == 'undefined') {
		$.k2l.m1a20 = {};
	};
		
		// the actual answers in acceptable form (after lowercase and trimming)
		var correctAnswers = [
			["myth", "myths"], // Possible answers for Q1.
			["happy go lucky", "happy-go-lucky", "happy–go–lucky", "happy - go - lucky", "happy – go – lucky"],   // Possible answers for Q2.
			["copes well with a crisis"], // etc.
			["data"],
			["unfounded"],
			["exaggerate", "exaggerating"],
			["nevertheless"],
			["in a good light"],
			["serve a purpose"]
		]
		
		// The answers as they should be displayed
		var displayAnswers = ["myth", "happy-go-lucky", "copes well with a crisis", "data", "unfounded", 
							"exaggerate", "nevertheless", "in a good light", "serve a purpose"];
		
	$.k2l.m1a20.index = 0;
	$.k2l.m1a20.correctAnswers = correctAnswers;
	$.k2l.m1a20.displayAnswers = displayAnswers;
	$.k2l.m1a20.wrongCount = 0;

	setStartActivity(1, 20);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(1, 20, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m1a20.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m1a20_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m1a20.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 1, 20, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m1a20.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m1a20_1.helpers({
  activeSection: function(){
    var activeSection = Session.get("activeSection");
    return (activeSection == "#m1a20_1");
  }
});

Template.m1a20_2.helpers({
  activeSection: function(){
    var activeSection = Session.get("activeSection");
    return (activeSection == "#m1a20_2");
  }
});

Template.m1a20_3.helpers({
  activeSection: function(){
    var activeSection = Session.get("activeSection");
    return (activeSection == "#m1a20_3");
  }
});

Template.m1a20_4.helpers({
  activeSection: function(){
    var activeSection = Session.get("activeSection");
    return (activeSection == "#m1a20_4");
  }
});

Template.m1a20_5.helpers({
  activeSection: function(){
    var activeSection = Session.get("activeSection");
    return (activeSection == "#m1a20_5");
  }
});

Template.m1a20_6.helpers({
  activeSection: function(){
    var activeSection = Session.get("activeSection");
    return (activeSection == "#m1a20_6");
  }
});

Template.m1a20_7.helpers({
  activeSection: function(){
    var activeSection = Session.get("activeSection");
    return (activeSection == "#m1a20_7");
  }
});

Template.m1a20_8.helpers({
  activeSection: function(){
    var activeSection = Session.get("activeSection");
    return (activeSection == "#m1a20_8");
  }
});

Template.m1a20_9.helpers({
  activeSection: function(){
    var activeSection = Session.get("activeSection");
    return (activeSection == "#m1a20_9");
  }
});

Template.m1a20_10.helpers({
  activeSection: function(){
    var activeSection = Session.get("activeSection");
    return (activeSection == "#m1a20_10");
  }
});

Template.m1a20_2.events({

	"click .button1": function(evt){
		
		if ($.k2l.m1a20_2.allowClick == true) {
			$.k2l.m1a20_2.allowClick = false;
			var clickedValue = $(evt.currentTarget).attr('id');
			switch (clickedValue) {
				case "a1":
					$('.correctscreen').removeClass('hidden');
					
						$(evt.currentTarget).html("A. isn't really true");						
						$('#b1').css('visibility','hidden');
						$('#a1').addClass('noclick');
						$('#a1').removeAttr('id');
						$.k2l.m1a20_2.allowClick = true;
					setTimeout(function() {
						$('.correctscreen').addClass('hidden');
					}, 1000);
					$('#captionScience').css('visibility','visible');
					break;
					
				case "b1":				
					$('.incorrectscreen').removeClass('hidden');
					$.k2l.m1a20_2.allowClick = true;
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
					}, 1000);
					break;
				case "a2":
					
					$('.incorrectscreen').removeClass('hidden');
					$.k2l.m1a20_2.allowClick = true;
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
					}, 1000);
					break;
				case "b2":
					$('.correctscreen').removeClass('hidden');
						$('.correct').parent().html("B. name/title");
						$('#a2').css('visibility','hidden');
						$('#b2').addClass('noclick');
						$('#b2').removeAttr('id');
						$.k2l.m1a20_2.allowClick = true;
					setTimeout(function() {
						$('.correctscreen').addClass('hidden');
					}, 1000);
					$('#captionMyths').css('visibility','visible');
					break;
					
				case "a3":
					$('.correctscreen').removeClass('hidden');
					$(evt.currentTarget).html("A. isn't really true");
						$('#b3').css('visibility','hidden');
						$('#a3').addClass('noclick');
						$('#a3').removeAttr('id');
						$.k2l.m1a20_2.allowClick = true;
					setTimeout(function() {
						$('.correctscreen').addClass('hidden');						
					}, 1000);
					
					var currentSection = $(evt.currentTarget).parents('section');
					var nextSection = $(evt.currentTarget).parents('section').next('section');
					setTimeout(function(){
						$('.correctscreen').addClass("hidden");
						$('.incorrectscreen').addClass("hidden");
						currentSection.addClass('hidden'); // hide this page
						nextSection.removeClass('hidden');// reveal next page
						document.location.hash = nextSection.attr('id'); // change the hash
						Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
						$.k2l.m1a20_2.allowClick = true;
					}, 3000);
					break;
					
				case "b3":
					$('.incorrectscreen').removeClass('hidden');
					$.k2l.m1a20_2.allowClick = true;
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
					}, 1000);
					break;
			}
		}
	}
})

Template.m1a20_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m1a20_2 == 'undefined') {
		$.k2l.m1a20_2 = {};
	};
	
	$.k2l.m1a20_2.allowClick = true;
}
