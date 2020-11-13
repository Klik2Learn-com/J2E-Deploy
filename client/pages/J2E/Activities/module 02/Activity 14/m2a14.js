

Template.m2a14.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m2a14_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m2a14.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(2, 14);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 14, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m2a14.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 14, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m2a14.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m2a14_1.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a14_1");
	}
});

Template.m2a14_1.events({
	
	"submit form" : function(evt) {
		
		if (evt.preventDefault){
			evt.preventDefault();
		}
		var isCorrect = false;
		
		// Tidy the user input
		var userText = evt.target.userText.value;
		if (userText.charAt(userText.length - 1) == '.') {
			userText = userText.substr(0, userText.length - 1);
		}
		userText = $.trim(userText);
		userText = userText.toLowerCase();
		
		for (var i = 0; i < $.k2l.m2a14_1.correctAnswers[$.k2l.m2a14_1.index].length; i++) {
			if (userText == $.k2l.m2a14_1.correctAnswers[$.k2l.m2a14_1.index][i]){ 
				isCorrect = true;
				// $.k2l.m2a14_1.correctAnswerIndex = i; // use this if there are multiple possible answers
				break;
			}
		}
		
		if (isCorrect){
			//correct
			$('.correctscreen').removeClass('hidden');
			setTimeout( function() {
				$('.correctscreen').addClass('hidden');
			}, 1000);
			var parentSection = $(evt.currentTarget).parents('section');
			$.k2l.m2a14_1.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m2a14_1.correctAnswers[$.k2l.m2a14_1.index]);
			// $(evt.currentTarget).parent().html($.k2l.m2a14_1.displayAnswers[$.k2l.m2a14_1.index][$.k2l.m2a14_1.correctAnswerIndex]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m2a14_1.index).addClass('correctword');
			
			if ($.k2l.m2a14_1.index < $.k2l.m2a14_1.correctAnswers.length - 1) {
				$.k2l.m2a14_1.index++;
				$('#entryanswer'+$.k2l.m2a14_1.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m2a14_1.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m2a14_1.index = 0;
				$.k2l.m2a14_1.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m2a14_1.wrongcount++;
			if ($.k2l.m2a14_1.wrongcount >= 1) {
				$('.stuck').removeClass('hidden');
			}
			$('.incorrectscreen').removeClass('hidden');
		setTimeout( function() {
			$('.incorrectscreen').addClass('hidden');
		}, 1000);
			evt.target.userText.value = "";
		}
	},
	
	"click .stuck-button": function(evt) {
		$('.incorrectscreen').addClass('hidden');
		var parentSection = $(evt.currentTarget).parents('section');
		$('.stuck').addClass('hidden'); //hide stuck button if visible
		$.k2l.m2a14_1.wrongcount = 0;
		$('#entryanswer'+$.k2l.m2a14_1.index).html($.k2l.m2a14_1.correctAnswers[$.k2l.m2a14_1.index]);
		// $('#entryanswer'+$.k2l.m2a14_1.index).html($.k2l.m2a14_1.correctAnswers[$.k2l.m2a14_1.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m2a14_1.index).addClass('correctword');
		
		if ($.k2l.m2a14_1.index < $.k2l.m2a14_1.correctAnswers.length - 1) {
			$.k2l.m2a14_1.index++;
			$('#entryanswer'+$.k2l.m2a14_1.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m2a14_1.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m2a14_1.index = 0;
			$.k2l.m2a14_1.wrongcount = 0;
				setTimeout(function() {
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},
	
	"click .pagination": function(evt){
		$.k2l.m2a14_1.index = 0;
		$.k2l.m2a14_1.wrongcount = 0;
	}
	
});

Template.m2a14_1.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m2a14_1 == 'undefined') {
		$.k2l.m2a14_1 = {};
	};
	
	$.k2l.m2a14_1.index = 0;
	$.k2l.m2a14_1.wrongcount = 0;
	// $.k2l.m2a14_1.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
			["tomatoes"], // Possible answers for Q1.
			["leaves"],   // Possible answers for Q2.
			["houses"], // etc.
			["churches"],
			["babies"]
		];
		
		/* var displayAnswers = [
			["on"], // Possible answers for Q1.
			["by"],   // Possible answers for Q2.
			["through"], // etc.
			["down"],
			["out"]
		]; 
		
	$.k2l.m2a14_1.displayAnswers = displayAnswers; */
	$.k2l.m2a14_1.correctAnswers = correctAnswers;
	
}

Template.m2a14_2.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a14_2");
	}
});

Template.m2a14_2.events({
	
	"submit form" : function(evt) {
		
		if (evt.preventDefault){
			evt.preventDefault();
		}
		var isCorrect = false;
		
		// Tidy the user input
		var userText = evt.target.userText.value;
		if (userText.charAt(userText.length - 1) == '.') {
			userText = userText.substr(0, userText.length - 1);
		}
		userText = $.trim(userText);
		userText = userText.toLowerCase();
		
		for (var i = 0; i < $.k2l.m2a14_2.correctAnswers[$.k2l.m2a14_2.index].length; i++) {
			if (userText == $.k2l.m2a14_2.correctAnswers[$.k2l.m2a14_2.index][i]){ 
				isCorrect = true;
				// $.k2l.m2a14_2.correctAnswerIndex = i; // use this if there are multiple possible answers
				break;
			}
		}
		
		if (isCorrect){
			//correct
			$('.correctscreen').removeClass('hidden');
			setTimeout( function() {
				$('.correctscreen').addClass('hidden');
			}, 1000);
			var parentSection = $(evt.currentTarget).parents('section');
			$.k2l.m2a14_2.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m2a14_2.correctAnswers[$.k2l.m2a14_2.index]);
			// $(evt.currentTarget).parent().html($.k2l.m2a14_2.displayAnswers[$.k2l.m2a14_2.index][$.k2l.m2a14_2.correctAnswerIndex]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m2a14_2.index).addClass('correctword');
			
			if ($.k2l.m2a14_2.index < $.k2l.m2a14_2.correctAnswers.length - 1) {
				$.k2l.m2a14_2.index++;
				$('#entryanswer'+$.k2l.m2a14_2.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m2a14_2.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m2a14_2.index = 0;
				$.k2l.m2a14_2.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m2a14_2.wrongcount++;
			if ($.k2l.m2a14_2.wrongcount >= 1) {
				$('.stuck').removeClass('hidden');
			}
			$('.incorrectscreen').removeClass('hidden');
		setTimeout( function() {
			$('.incorrectscreen').addClass('hidden');
		}, 1000);
			evt.target.userText.value = "";
		}
	},
	
	"click .stuck-button": function(evt) {
		$('.incorrectscreen').addClass('hidden');
		var parentSection = $(evt.currentTarget).parents('section');
		$('.stuck').addClass('hidden'); //hide stuck button if visible
		$.k2l.m2a14_2.wrongcount = 0;
		$('#entryanswer'+$.k2l.m2a14_2.index).html($.k2l.m2a14_2.correctAnswers[$.k2l.m2a14_2.index]);
		// $('#entryanswer'+$.k2l.m2a14_2.index).html($.k2l.m2a14_2.correctAnswers[$.k2l.m2a14_2.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m2a14_2.index).addClass('correctword');
		
		if ($.k2l.m2a14_2.index < $.k2l.m2a14_2.correctAnswers.length - 1) {
			$.k2l.m2a14_2.index++;
			$('#entryanswer'+$.k2l.m2a14_2.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m2a14_2.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m2a14_2.index = 0;
			$.k2l.m2a14_2.wrongcount = 0;
				setTimeout(function() {
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},
	
	"click .pagination": function(evt){
		$.k2l.m2a14_2.index = 0;
		$.k2l.m2a14_2.wrongcount = 0;
	}
	
});

Template.m2a14_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m2a14_2 == 'undefined') {
		$.k2l.m2a14_2 = {};
	};
	
	$.k2l.m2a14_2.index = 0;
	$.k2l.m2a14_2.wrongcount = 0;
	// $.k2l.m2a14_2.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
			["halves"], // Possible answers for Q1.
			["pennies"],   // Possible answers for Q2.
			["watches"], // etc.
			["knives"],
			["fish"]
		];
		
		/* var displayAnswers = [
			["on"], // Possible answers for Q1.
			["by"],   // Possible answers for Q2.
			["through"], // etc.
			["down"],
			["out"]
		]; 
		
	$.k2l.m2a14_2.displayAnswers = displayAnswers; */
	$.k2l.m2a14_2.correctAnswers = correctAnswers;
	
}
