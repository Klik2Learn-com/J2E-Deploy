Template.m4a1.events({
	"click .stuck-button": function(evt) {
		
			var currentSection = $(evt.currentTarget).parents('section');
			var nextSection = $(evt.currentTarget).parents('section').next('section');
			
			$('form.textentry').parent().html('<h4 class="text-center caption"> ' + $.k2l.m4a1.displayAnswers[$.k2l.m4a1.index] + ' </h4>');
			$('.incorrectscreen').addClass("hidden"); // Remove a cross if there is one.
			
			
			$.k2l.m4a1.index++; //increment the counter
			$(".stuck").addClass('hidden'); // Hide the stuck button if it is visible
			
			setTimeout(function(){
				$('.correctscreen').addClass("hidden");
				$('.incorrectscreen').addClass("hidden");
				currentSection.addClass('hidden'); // hide this page
				nextSection.removeClass('hidden');// reveal next page
				document.location.hash = nextSection.attr('id'); // change the hash
				Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
			}, 4000);
			
			$.k2l.m4a1.wrongCount = 0; // reset the wrongCount
		
		
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
		for (var i = 0; i < $.k2l.m4a1.correctAnswers[$.k2l.m4a1.index].length; i++) {
			if (userText == $.k2l.m4a1.correctAnswers[$.k2l.m4a1.index][i]){ 
				isCorrect = true;
				break;
			}
		}
		
		if (isCorrect) {
			var parentSection = $(evt.currentTarget).parents('section');
			var currentSection = $(evt.currentTarget).parents('section');
			var nextSection = $(evt.currentTarget).parents('section').next('section');
			
			$(evt.currentTarget).parent().html('<h4 class="text-center caption">' + $.k2l.m4a1.displayAnswers[$.k2l.m4a1.index] + ' </h4>');
			$('.incorrectscreen').addClass("hidden"); // Remove a cross if there is one.
			
			$('.correctscreen').removeClass('hidden');
			setTimeout( function() {
				$('.correctscreen').addClass('hidden');
			}, 1000);
			
			
			$.k2l.m4a1.index++; //increment the counter
			$(".stuck").addClass('hidden'); // Hide the stuck button if it is visible
			
			if($.k2l.m4a1.index > $.k2l.m4a1.correctAnswers.length-1) {
					// Load the next page automatically
				setTimeout( function() {
					$('#welldonecap').removeClass('hidden');
					}, 1000);
				setTimeout( function() {
					$('#welldonecap').addClass('hidden');
				}, 2000);
				setTimeout(function() {
					$.k2l.m4a1_1.counter = 0;
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
			}
			setTimeout(function(){
				currentSection.addClass('hidden'); // hide this page
				nextSection.removeClass('hidden');// reveal next page
				document.location.hash = nextSection.attr('id'); // change the hash
				Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
			}, 2000);
			
			$.k2l.m4a1.wrongCount = 0; // reset the wrongCount
			
			
		} else {
			
			// Incorrect Answer
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function(){
				$('.incorrectscreen').addClass("hidden");
			}, 1000)
			$.k2l.m4a1.wrongCount++;
			
			if ($.k2l.m4a1.wrongCount >= 1) {
				$(".stuck").removeClass('hidden');
				
				$.k2l.m4a1.wrongCount = 0;
			}
		}
	},
	
	'click a.restart': function(evt){
	// When clicking to restart the activity this should reset the variables to
	// initial values.
	
	
		if(typeof $.k2l != 'undefined'){
		  if(typeof $.k2l.m4a1 != 'undefined'){
			if(typeof $.k2l.m4a1.index != 'undefined'){
				$.k2l.m4a1.index = 0;
			}
			if (typeof $.k2l.m4a1.wrongCount != 'undefined'){
				$.k2l.m4a1.wrongCount = 0;
			}
		  }
		}
	}
		
})

Template.m4a1.rendered = function (){

	document.title = "Journey 2 English";
	
	setStartActivity(4, 1);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 1, subpage);
			oldLocation = location.href;
		}
	}, 500);
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m4a1 == 'undefined') {
		$.k2l.m4a1 = {};
	};
		
		// the actual answers in acceptable form (after and trimming)
		var correctAnswers = [
			["how much free time do you have?", ""],
			["how much chocolate do you eat?"],
			["how much music do you download?"],
			["how much water do you drink a day?"],
			["how many english speakers do you know?", "how many english speakers do you know?"],
			["how much exercise do you do?"],
			["how many novels do you read a year?"],
			["how many close friends do you have?"],
			["how many hours a week do you spend studying?"],
			["how many pairs of shoes do you have?"],
			["how many brothers and sisters do you have?"],
			["how much fast food do you eat?"],
			["how much time do you spend on the internet?"],
			["how many hours a day do you spend watching tv?", "how many hours do you spend watching tv?"],
			["how many coffees do you drink a day?"],
			["how much sleep do you get?"]
		]
		
		// The answers as they should be displayed
		var displayAnswers = ["How much free time do you have?", "How much chocolate do you eat?","How much music do you download?","How much water do you drink a day?","How many English speakers do you know?","How much exercise do you do?","How many novels do you read a year?","How many close friends do you have?","How many hours a week do you spend studying?","How many pairs of shoes do you have?","How many brothers and sisters do you have?","How much fast food do you eat?","How much time do you spend on the Internet?","How many hours do you spend watching TV?","How many coffees do you drink a day?","How much sleep do you get?"];
		
	$.k2l.m4a1.index = 0;
	$.k2l.m4a1.correctAnswers = correctAnswers;
	$.k2l.m4a1.displayAnswers = displayAnswers;
	$.k2l.m4a1.wrongCount = 0;
}

Template.m4a1.created = function() {
  this.subscribe("userProgress");
  this.subscribe("pauseConnection", 4, 1, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a1.destroyed = function() {
  clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


Template.m4a1.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m4a1_end') { 
			return false; 
		}		return true;	 
  } 
});


Template.m4a1_input.rendered = function(){
    $('input').first().focus();
}

Template.m4a1_input_initial.rendered = function(){
    $('input').first().focus();
}


Template.m4a1_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a1_1");
	}
});


Template.m4a1_1.events({	
	"click .pagination": function(evt){
		$.k2l.m4a1_1.draggedElement = {};
		$.k2l.m4a1_1.counter = 0;
	}
});

Template.m4a1_1.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m4a1_1 == 'undefined') {
		$.k2l.m4a1_1 = {};
	};
	
	$.k2l.m4a1_1.draggedElement = {};
	$.k2l.m4a1_1.counter = 0;

	// $.k2l.m4a1_1.max = 3; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m4a1_1";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m4a1_1",
		nextPage: "#m4a1_2"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m4a1_2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a1_2");
	}
});


Template.m4a1_2.events({
	"click .pagination": function(evt){
		$.k2l.m4a1_2.draggedElement = {};
		$.k2l.m4a1_2.counter = 0;
	}
});

Template.m4a1_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m4a1_2 == 'undefined') {
		$.k2l.m4a1_2 = {};
	};
	
	$.k2l.m4a1_2.draggedElement = {};
	$.k2l.m4a1_2.counter = 0;

	// $.k2l.m4a1_2.max = 3; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m4a1_2";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m4a1_2",
		nextPage: "#m4a1_3"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m4a1_4.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a1_4");
	}
});

Template.m4a1_5.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a1_5");
	}
});

Template.m4a1_6.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a1_6");
	}
});

Template.m4a1_7.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a1_7");
	}
});

Template.m4a1_8.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a1_8");
	}
});

Template.m4a1_9.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a1_9");
	}
});

Template.m4a1_10.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a1_10");
	}
});

Template.m4a1_11.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a1_11");
	}
});

Template.m4a1_12.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a1_12");
	}
});

Template.m4a1_13.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a1_13");
	}
});

Template.m4a1_14.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a1_14");
	}
});

Template.m4a1_15.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a1_15");
	}
});

Template.m4a1_16.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a1_16");
	}
});

Template.m4a1_17.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a1_17");
	}
});

Template.m4a1_18.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a1_18");
	}
});

Template.m4a1_19.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a1_19");
	}
});
