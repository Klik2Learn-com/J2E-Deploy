Template.m3a16.events({
	"click .stuck-button": function(evt) {

		$.k2l.m3a16.questionNo++;

			var currentSection = $(evt.currentTarget).parents('section');
			var nextSection = $(evt.currentTarget).parents('section').next('section');

			$('form.textentry').parent().html('<h4 class="text-center caption"> ' + $.k2l.m3a16.displayAnswers[$.k2l.m3a16.index] + ' </h4>');
			$('.incorrectscreen').addClass("hidden"); // Remove a cross if there is one.


			$.k2l.m3a16.index++; //increment the counter
			$(".stuck").addClass('hidden'); // Hide the stuck button if it is visible

			setTimeout(function(){
				$('.correctscreen').addClass("hidden");
				$('.incorrectscreen').addClass("hidden");
				$('.nothing').addClass('grammar'); //highlight word

				for (var i=0; i < $.k2l.m3a16.noAuto.length; i++) {
					if ($.k2l.m3a16.questionNo == $.k2l.m3a16.noAuto[i]) {
						$('.pagination').removeClass('hidden');
					}
					if ($.k2l.m3a16.questionNo == $.k2l.m3a16.noAuto[i]) {
						$('.caption.capred.hidden').removeClass('hidden');
					}
				}
				for (i = 0; i < $.k2l.m3a16.auto.length; i++) {
					if ($.k2l.m3a16.questionNo == $.k2l.m3a16.auto[i]) {
						currentSection.addClass('hidden'); // hide this page
						nextSection.removeClass('hidden');// reveal next page
						document.location.hash = nextSection.attr('id'); // change the hash
						Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
					}
				}

			}, 4000);

			$.k2l.m3a16.wrongCount = 0; // reset the wrongCount


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
		for (var i = 0; i < $.k2l.m3a16.correctAnswers[$.k2l.m3a16.index].length; i++) {
			if (userText == $.k2l.m3a16.correctAnswers[$.k2l.m3a16.index][i]){
				isCorrect = true;
				break;
			}
		}

		if (isCorrect) {
			$.k2l.m3a16.questionNo++;
			var currentSection = $(evt.currentTarget).parents('section');
			var nextSection = $(evt.currentTarget).parents('section').next('section');

			$(evt.currentTarget).parent().html('<h4 class="text-center caption">' + $.k2l.m3a16.displayAnswers[$.k2l.m3a16.index] + ' </h4>');
			$('.incorrectscreen').addClass("hidden"); // Remove a cross if there is one.
			$('.correctscreen').removeClass("hidden");
			$('.nothing').addClass('grammar'); //highlight word

			$.k2l.m3a16.index++; //increment the counter
			$(".stuck").addClass('hidden'); // Hide the stuck button if it is visible

			setTimeout(function(){
				$('.correctscreen').addClass("hidden");
				$('.incorrectscreen').addClass("hidden");

				for (var i=0; i < $.k2l.m3a16.noAuto.length; i++) {
					if ($.k2l.m3a16.questionNo == $.k2l.m3a16.noAuto[i]) {
						$('.pagination').removeClass('hidden');

					}
					if ($.k2l.m3a16.questionNo == 7) {
						$('.caption.capred.hidden').removeClass('hidden');
					}
				}
				for (i = 0; i < $.k2l.m3a16.auto.length; i++) {
					if ($.k2l.m3a16.questionNo == $.k2l.m3a16.auto[i]) {
						currentSection.addClass('hidden'); // hide this page
						nextSection.removeClass('hidden');// reveal next page
						document.location.hash = nextSection.attr('id'); // change the hash
						Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
					}
				}

			}, 1500);


			$.k2l.m3a16.wrongCount = 0; // reset the wrongCount

		} else {

			// Incorrect Answer
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function(){
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
			$.k2l.m3a16.wrongCount++;

			if ($.k2l.m3a16.wrongCount >= 1) {
				$(".stuck").removeClass('hidden');

				$.k2l.m3a16.wrongCount = 0;
			}
		}
	},

	'click a.restart': function(evt){
	// When clicking to restart the activity this should reset the variables to
	// initial values.

		if(typeof $.k2l != 'undefined'){
		  if(typeof $.k2l.m3a16 != 'undefined'){
			if(typeof $.k2l.m3a16.index != 'undefined'){
				$.k2l.m3a16.index = 0;
			}
			if (typeof $.k2l.m3a16.wrongCount != 'undefined'){
				$.k2l.m3a16.wrongCount = 0;
			}
			if (typeof $.k2l.m3a16.questionNo != 'undefined'){
				$.k2l.m3a16.questionNo = 0;
			}
		  }
		}
	}

});

Template.m3a16.rendered = function (){

	document.title = "Journey 2 English";
	
	setStartActivity(3, 16);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(3, 16, subpage);
			oldLocation = location.href;
		}
	}, 500);


	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	}

	if (typeof $.k2l.m3a16 == 'undefined') {
		$.k2l.m3a16 = {};
	}

		// the actual answers in acceptable form (after lowercase and trimming)
		var correctAnswers = [
			["can"], // Possible answers for Q1.
			["might"],   // Possible answers for Q2.
			["could"], // etc.
			["can"],
			["may"],
			["may"],
			["must"],
			["might"]
		];

		// The answers as they should be displayed
		var displayAnswers = ["can", "might", "could", "can", "may", "may", "must", "might"];

		// Don't auto-advance
		var noAuto = [1, 3, 6, 7, 8];
		var auto = [2, 4, 5];
		var questionNo = 0;

	$.k2l.m3a16.index = 0;
	$.k2l.m3a16.correctAnswers = correctAnswers;
	$.k2l.m3a16.displayAnswers = displayAnswers;
	$.k2l.m3a16.wrongCount = 0;
	$.k2l.m3a16.questionNo = questionNo;
	$.k2l.m3a16.noAuto = noAuto;
	$.k2l.m3a16.auto = auto;




};


Template.m3a16.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m3a16_end') { 
			return false; 
		}		return true;	 
  } 
});



Template.m3a16.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 3, 16, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m3a16.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m3a16_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a16_1");
	}
});

Template.m3a16_2a.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a16_2a");
	}
});

Template.m3a16_2b.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a16_2b");
	}
});

Template.m3a16_3a.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a16_3a");
	}
});

Template.m3a16_3b.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a16_3b");
	}
});

Template.m3a16_3c.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a16_3c");
	}
});

Template.m3a16_4.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a16_4");
	}
});

Template.m3a16_5.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a16_5");
	}
});
