Template.m9a7.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m9a7_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m9a7.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(9,7);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(9, 7, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m9a7.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 9, 7, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m9a7.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m9a7_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a7_4"); 
	} 
}); 
 
Template.m9a7_4.events({
	
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
		
		for (var i = 0; i < $.k2l.m9a7_4.correctAnswers[$.k2l.m9a7_4.index].length; i++) {
			if (userText == $.k2l.m9a7_4.correctAnswers[$.k2l.m9a7_4.index][i]){ 
				isCorrect = true;
				// $.k2l.m9a7_4.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m9a7_4.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			// $(evt.currentTarget).parent().html($.k2l.m9a7_4.correctAnswers[$.k2l.m9a7_4.index]);
			$(evt.currentTarget).parent().html($.k2l.m9a7_4.displayAnswers[$.k2l.m9a7_4.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m9a7_4.index).addClass('correctword');
			
			if ($.k2l.m9a7_4.index < $.k2l.m9a7_4.correctAnswers.length - 1) {
				$.k2l.m9a7_4.index++;
				$('#m9a7instructions').html($.k2l.m9a7_4.instructions[$.k2l.m9a7_4.index]);
				$('#entryanswer'+$.k2l.m9a7_4.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m9a7_4.index).html('<form class="textentry"><input type="text" name="userText" size="14" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m9a7_4.index = 0;
				$.k2l.m9a7_4.wrongcount = 0;
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
			$.k2l.m9a7_4.wrongcount++;
			if ($.k2l.m9a7_4.wrongcount >= 1) {
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
		$.k2l.m9a7_4.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m9a7_4.index).html($.k2l.m9a7_4.correctAnswers[$.k2l.m9a7_4.index]);
		$('#entryanswer'+$.k2l.m9a7_4.index).html($.k2l.m9a7_4.displayAnswers[$.k2l.m9a7_4.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m9a7_4.index).addClass('correctword');
		
		if ($.k2l.m9a7_4.index < $.k2l.m9a7_4.correctAnswers.length - 1) {
			$.k2l.m9a7_4.index++;
			$('#m9a7instructions').html($.k2l.m9a7_4.instructions[$.k2l.m9a7_4.index]);
			$('#entryanswer'+$.k2l.m9a7_4.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m9a7_4.index).html('<form class="textentry"><input type="text" name="userText" size="14" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m9a7_4.index = 0;
			$.k2l.m9a7_4.wrongcount = 0;
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
		$.k2l.m9a7_4.index = 0;
		$.k2l.m9a7_4.wrongcount = 0;
	}
	
});

Template.m9a7_4.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m9a7_4 == 'undefined') {
		$.k2l.m9a7_4 = {};
	};
	
	$.k2l.m9a7_4.index = 0;
	$.k2l.m9a7_4.wrongcount = 0;
	 $.k2l.m9a7_4.correctAnswerIndex = 0; // for multiple answers

	 var instructions = ["Write the active tense in the space. (2 words)", "Write the passive tense in the space. (3 words)"];

	var correctAnswers = [
			["broke into"], // Possible answers for Q1.
			["was broken into"]
		];
		
		 var displayAnswers = [
			["broke into"], // Possible answers for Q1.
			["was broken into"]
		]; 
		
	$.k2l.m9a7_4.instructions = instructions;
	$.k2l.m9a7_4.displayAnswers = displayAnswers; 
	$.k2l.m9a7_4.correctAnswers = correctAnswers;
	
}

Template.m9a7_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a7_2"); 
	} 
}); 
 
Template.m9a7_2.events({
	
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
		
		for (var i = 0; i < $.k2l.m9a7_2.correctAnswers[$.k2l.m9a7_2.index].length; i++) {
			if (userText == $.k2l.m9a7_2.correctAnswers[$.k2l.m9a7_2.index][i]){ 
				isCorrect = true;
				// $.k2l.m9a7_2.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m9a7_2.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			// $(evt.currentTarget).parent().html($.k2l.m9a7_2.correctAnswers[$.k2l.m9a7_2.index]);
			$(evt.currentTarget).parent().html($.k2l.m9a7_2.displayAnswers[$.k2l.m9a7_2.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m9a7_2.index).addClass('correctword');
			
			if ($.k2l.m9a7_2.index < $.k2l.m9a7_2.correctAnswers.length - 1) {
				$.k2l.m9a7_2.index++;
				$('#m9a7instructions').html($.k2l.m9a7_2.instructions[$.k2l.m9a7_2.index]);
				$('#entryanswer'+$.k2l.m9a7_2.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m9a7_2.index).html('<form class="textentry"><input type="text" name="userText" size="14" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m9a7_2.index = 0;
				$.k2l.m9a7_2.wrongcount = 0;
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
			$.k2l.m9a7_2.wrongcount++;
			if ($.k2l.m9a7_2.wrongcount >= 1) {
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
		$.k2l.m9a7_2.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m9a7_2.index).html($.k2l.m9a7_2.correctAnswers[$.k2l.m9a7_2.index]);
		$('#entryanswer'+$.k2l.m9a7_2.index).html($.k2l.m9a7_2.displayAnswers[$.k2l.m9a7_2.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m9a7_2.index).addClass('correctword');
		
		if ($.k2l.m9a7_2.index < $.k2l.m9a7_2.correctAnswers.length - 1) {
			$.k2l.m9a7_2.index++;
			$('#m9a7instructions').html($.k2l.m9a7_2.instructions[$.k2l.m9a7_2.index]);
			$('#entryanswer'+$.k2l.m9a7_2.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m9a7_2.index).html('<form class="textentry"><input type="text" name="userText" size="14" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m9a7_2.index = 0;
			$.k2l.m9a7_2.wrongcount = 0;
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
		$.k2l.m9a7_2.index = 0;
		$.k2l.m9a7_2.wrongcount = 0;
	}
	
});

Template.m9a7_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m9a7_2 == 'undefined') {
		$.k2l.m9a7_2 = {};
	};
	
	$.k2l.m9a7_2.index = 0;
	$.k2l.m9a7_2.wrongcount = 0;
	 $.k2l.m9a7_2.correctAnswerIndex = 0; // for multiple answers

	 var instructions = ["Write the active tense in the space. (1 word)", "Write the passive tense in the space. (2 words)"];

	var correctAnswers = [
			["wrote"], // Possible answers for Q1.
			["was written"]
		];
		
		 var displayAnswers = [
			["wrote"], // Possible answers for Q1.
			["was written"]
		]; 
		
	$.k2l.m9a7_2.instructions = instructions;
	$.k2l.m9a7_2.displayAnswers = displayAnswers; 
	$.k2l.m9a7_2.correctAnswers = correctAnswers;
	
}

Template.m9a7_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a7_3"); 
	} 
}); 
 
Template.m9a7_3.events({
	
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
		
		for (var i = 0; i < $.k2l.m9a7_3.correctAnswers[$.k2l.m9a7_3.index].length; i++) {
			if (userText == $.k2l.m9a7_3.correctAnswers[$.k2l.m9a7_3.index][i]){ 
				isCorrect = true;
				// $.k2l.m9a7_3.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m9a7_3.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			// $(evt.currentTarget).parent().html($.k2l.m9a7_3.correctAnswers[$.k2l.m9a7_3.index]);
			$(evt.currentTarget).parent().html($.k2l.m9a7_3.displayAnswers[$.k2l.m9a7_3.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m9a7_3.index).addClass('correctword');
			
			if ($.k2l.m9a7_3.index < $.k2l.m9a7_3.correctAnswers.length - 1) {
				$.k2l.m9a7_3.index++;
				$('#m9a7instructions').html($.k2l.m9a7_3.instructions[$.k2l.m9a7_3.index]);
				$('#entryanswer'+$.k2l.m9a7_3.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m9a7_3.index).html('<form class="textentry"><input type="text" name="userText" size="14" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m9a7_3.index = 0;
				$.k2l.m9a7_3.wrongcount = 0;
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
			$.k2l.m9a7_3.wrongcount++;
			if ($.k2l.m9a7_3.wrongcount >= 1) {
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
		$.k2l.m9a7_3.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m9a7_3.index).html($.k2l.m9a7_3.correctAnswers[$.k2l.m9a7_3.index]);
		$('#entryanswer'+$.k2l.m9a7_3.index).html($.k2l.m9a7_3.displayAnswers[$.k2l.m9a7_3.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m9a7_3.index).addClass('correctword');
		
		if ($.k2l.m9a7_3.index < $.k2l.m9a7_3.correctAnswers.length - 1) {
			$.k2l.m9a7_3.index++;
			$('#m9a7instructions').html($.k2l.m9a7_3.instructions[$.k2l.m9a7_3.index]);
			$('#entryanswer'+$.k2l.m9a7_3.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m9a7_3.index).html('<form class="textentry"><input type="text" name="userText" size="14" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m9a7_3.index = 0;
			$.k2l.m9a7_3.wrongcount = 0;
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
		$.k2l.m9a7_3.index = 0;
		$.k2l.m9a7_3.wrongcount = 0;
	}
	
});

Template.m9a7_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m9a7_3 == 'undefined') {
		$.k2l.m9a7_3 = {};
	};
	
	$.k2l.m9a7_3.index = 0;
	$.k2l.m9a7_3.wrongcount = 0;
	 $.k2l.m9a7_3.correctAnswerIndex = 0; // for multiple answers

	 var instructions = ["Write the active tense in the space. (1 word)", "Write the passive tense in the space. (2 words)"];

	var correctAnswers = [
			["drink"], // Possible answers for Q1.
			["is drunk"]
		];
		
		 var displayAnswers = [
			["drink"], // Possible answers for Q1.
			["is drunk"]
		]; 
		
	$.k2l.m9a7_3.instructions = instructions;
	$.k2l.m9a7_3.displayAnswers = displayAnswers; 
	$.k2l.m9a7_3.correctAnswers = correctAnswers;
	
}

Template.m9a7_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a7_5"); 
	} 
}); 
 
Template.m9a7_5.events({
	
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
		
		for (var i = 0; i < $.k2l.m9a7_5.correctAnswers[$.k2l.m9a7_5.index].length; i++) {
			if (userText == $.k2l.m9a7_5.correctAnswers[$.k2l.m9a7_5.index][i]){ 
				isCorrect = true;
				// $.k2l.m9a7_5.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m9a7_5.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			// $(evt.currentTarget).parent().html($.k2l.m9a7_5.correctAnswers[$.k2l.m9a7_5.index]);
			$(evt.currentTarget).parent().html($.k2l.m9a7_5.displayAnswers[$.k2l.m9a7_5.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m9a7_5.index).addClass('correctword');
			
			if ($.k2l.m9a7_5.index < $.k2l.m9a7_5.correctAnswers.length - 1) {
				$.k2l.m9a7_5.index++;
				$('#m9a7instructions').html($.k2l.m9a7_5.instructions[$.k2l.m9a7_5.index]);
				$('#entryanswer'+$.k2l.m9a7_5.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m9a7_5.index).html('<form class="textentry"><input type="text" name="userText" size="14" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m9a7_5.index = 0;
				$.k2l.m9a7_5.wrongcount = 0;
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
			$.k2l.m9a7_5.wrongcount++;
			if ($.k2l.m9a7_5.wrongcount >= 1) {
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
		$.k2l.m9a7_5.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m9a7_5.index).html($.k2l.m9a7_5.correctAnswers[$.k2l.m9a7_5.index]);
		$('#entryanswer'+$.k2l.m9a7_5.index).html($.k2l.m9a7_5.displayAnswers[$.k2l.m9a7_5.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m9a7_5.index).addClass('correctword');
		
		if ($.k2l.m9a7_5.index < $.k2l.m9a7_5.correctAnswers.length - 1) {
			$.k2l.m9a7_5.index++;
			$('#m9a7instructions').html($.k2l.m9a7_5.instructions[$.k2l.m9a7_5.index]);
			$('#entryanswer'+$.k2l.m9a7_5.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m9a7_5.index).html('<form class="textentry"><input type="text" name="userText" size="14" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m9a7_5.index = 0;
			$.k2l.m9a7_5.wrongcount = 0;
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
		$.k2l.m9a7_5.index = 0;
		$.k2l.m9a7_5.wrongcount = 0;
	}
	
});

Template.m9a7_5.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m9a7_5 == 'undefined') {
		$.k2l.m9a7_5 = {};
	};
	
	$.k2l.m9a7_5.index = 0;
	$.k2l.m9a7_5.wrongcount = 0;
	 $.k2l.m9a7_5.correctAnswerIndex = 0; // for multiple answers

	 var instructions = ["Write the active tense in the space. (1 word)", "Write the passive tense in the space. (2 words)"];

	var correctAnswers = [
			["produces"], // Possible answers for Q1.
			["is produced"]
		];
		
		 var displayAnswers = [
			["produces"], // Possible answers for Q1.
			["is produced"]
		]; 
		
	$.k2l.m9a7_5.instructions = instructions;
	$.k2l.m9a7_5.displayAnswers = displayAnswers; 
	$.k2l.m9a7_5.correctAnswers = correctAnswers;
	
}

Template.m9a7_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a7_1"); 
	} 
}); 
 
Template.m9a7_1.events({
	
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
		
		for (var i = 0; i < $.k2l.m9a7_1.correctAnswers[$.k2l.m9a7_1.index].length; i++) {
			if (userText == $.k2l.m9a7_1.correctAnswers[$.k2l.m9a7_1.index][i]){ 
				isCorrect = true;
				 $.k2l.m9a7_1.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m9a7_1.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			// $(evt.currentTarget).parent().html($.k2l.m9a7_1.correctAnswers[$.k2l.m9a7_1.index]);
			$(evt.currentTarget).parent().html($.k2l.m9a7_1.displayAnswers[$.k2l.m9a7_1.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m9a7_1.index).addClass('correctword');
			
			if ($.k2l.m9a7_1.index < $.k2l.m9a7_1.correctAnswers.length - 1) {
				$.k2l.m9a7_1.index++;
				$('#m9a7instructions').html($.k2l.m9a7_1.instructions[$.k2l.m9a7_1.index]);
				$('#entryanswer'+$.k2l.m9a7_1.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m9a7_1.index).html('<form class="textentry"><input type="text" name="userText" size="14" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m9a7_1.index = 0;
				$.k2l.m9a7_1.wrongcount = 0;
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
			$.k2l.m9a7_1.wrongcount++;
			if ($.k2l.m9a7_1.wrongcount >= 1) {
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
		$.k2l.m9a7_1.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m9a7_1.index).html($.k2l.m9a7_1.correctAnswers[$.k2l.m9a7_1.index]);
		$('#entryanswer'+$.k2l.m9a7_1.index).html($.k2l.m9a7_1.displayAnswers[$.k2l.m9a7_1.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m9a7_1.index).addClass('correctword');
		
		if ($.k2l.m9a7_1.index < $.k2l.m9a7_1.correctAnswers.length - 1) {
			$.k2l.m9a7_1.index++;
			$('#m9a7instructions').html($.k2l.m9a7_1.instructions[$.k2l.m9a7_1.index]);
			$('#entryanswer'+$.k2l.m9a7_1.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m9a7_1.index).html('<form class="textentry"><input type="text" name="userText" size="14" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m9a7_1.index = 0;
			$.k2l.m9a7_1.wrongcount = 0;
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
		$.k2l.m9a7_1.index = 0;
		$.k2l.m9a7_1.wrongcount = 0;
	}
	
});

Template.m9a7_1.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m9a7_1 == 'undefined') {
		$.k2l.m9a7_1 = {};
	};
	
	$.k2l.m9a7_1.index = 0;
	$.k2l.m9a7_1.wrongcount = 0;
	 $.k2l.m9a7_1.correctAnswerIndex = 0; // for multiple answers

	 var instructions = ["Write the active tense in the space. Remember to use the short form. (2 words)", "Write the passive tense in the space. (3 words)"];

	var correctAnswers = [
			["'m painting", "am painting"], // Possible answers for Q1.
			["is being painted"]
		];
		
		 var displayAnswers = [
			["'m painting"], // Possible answers for Q1.
			["is being painted"]
		]; 
		
	$.k2l.m9a7_1.instructions = instructions;
	$.k2l.m9a7_1.displayAnswers = displayAnswers; 
	$.k2l.m9a7_1.correctAnswers = correctAnswers;
	
}

Template.m9a7_7.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a7_7"); 
	} 
}); 
 
Template.m9a7_7.events({
	
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
		
		for (var i = 0; i < $.k2l.m9a7_7.correctAnswers[$.k2l.m9a7_7.index].length; i++) {
			if (userText == $.k2l.m9a7_7.correctAnswers[$.k2l.m9a7_7.index][i]){ 
				isCorrect = true;
				 $.k2l.m9a7_7.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m9a7_7.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			// $(evt.currentTarget).parent().html($.k2l.m9a7_7.correctAnswers[$.k2l.m9a7_7.index]);
			$(evt.currentTarget).parent().html($.k2l.m9a7_7.displayAnswers[$.k2l.m9a7_7.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m9a7_7.index).addClass('correctword');
			
			if ($.k2l.m9a7_7.index < $.k2l.m9a7_7.correctAnswers.length - 1) {
				$.k2l.m9a7_7.index++;
				$('#m9a7instructions').html($.k2l.m9a7_7.instructions[$.k2l.m9a7_7.index]);
				$('#entryanswer'+$.k2l.m9a7_7.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m9a7_7.index).html('<form class="textentry"><input type="text" name="userText" size="14" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m9a7_7.index = 0;
				$.k2l.m9a7_7.wrongcount = 0;
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
			$.k2l.m9a7_7.wrongcount++;
			if ($.k2l.m9a7_7.wrongcount >= 1) {
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
		$.k2l.m9a7_7.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m9a7_7.index).html($.k2l.m9a7_7.correctAnswers[$.k2l.m9a7_7.index]);
		$('#entryanswer'+$.k2l.m9a7_7.index).html($.k2l.m9a7_7.displayAnswers[$.k2l.m9a7_7.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m9a7_7.index).addClass('correctword');
		
		if ($.k2l.m9a7_7.index < $.k2l.m9a7_7.correctAnswers.length - 1) {
			$.k2l.m9a7_7.index++;
			$('#m9a7instructions').html($.k2l.m9a7_7.instructions[$.k2l.m9a7_7.index]);
			$('#entryanswer'+$.k2l.m9a7_7.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m9a7_7.index).html('<form class="textentry"><input type="text" name="userText" size="14" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m9a7_7.index = 0;
			$.k2l.m9a7_7.wrongcount = 0;
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
		$.k2l.m9a7_7.index = 0;
		$.k2l.m9a7_7.wrongcount = 0;
	}
	
});

Template.m9a7_7.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m9a7_7 == 'undefined') {
		$.k2l.m9a7_7 = {};
	};
	
	$.k2l.m9a7_7.index = 0;
	$.k2l.m9a7_7.wrongcount = 0;
	 $.k2l.m9a7_7.correctAnswerIndex = 0; // for multiple answers

	 var instructions = ["Write the active tense in the space. (1 word)","Write the active tense in the space. (1 word)", "Write the passive tense in the space. Use the short form. (1 word)", "Write the passive tense in the space. (2 words)"];

	var correctAnswers = [
			["has"], // Possible answers for Q1.
			["told"],
			["'ve","have"],
			["been told"]
		];
		
		 var displayAnswers = [
			["has"], // Possible answers for Q1.
			["told"],
			["'ve"],
			["been told"]
		]; 
		
	$.k2l.m9a7_7.instructions = instructions;
	$.k2l.m9a7_7.displayAnswers = displayAnswers; 
	$.k2l.m9a7_7.correctAnswers = correctAnswers;
	
}

Template.m9a7_6.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a7_6"); 
	} 
}); 
 
Template.m9a7_6.events({
	
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
		
		for (var i = 0; i < $.k2l.m9a7_6.correctAnswers[$.k2l.m9a7_6.index].length; i++) {
			if (userText == $.k2l.m9a7_6.correctAnswers[$.k2l.m9a7_6.index][i]){ 
				isCorrect = true;
				// $.k2l.m9a7_6.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m9a7_6.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			// $(evt.currentTarget).parent().html($.k2l.m9a7_6.correctAnswers[$.k2l.m9a7_6.index]);
			$(evt.currentTarget).parent().html($.k2l.m9a7_6.displayAnswers[$.k2l.m9a7_6.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m9a7_6.index).addClass('correctword');
			
			if ($.k2l.m9a7_6.index < $.k2l.m9a7_6.correctAnswers.length - 1) {
				$.k2l.m9a7_6.index++;
				$('#m9a7instructions').html($.k2l.m9a7_6.instructions[$.k2l.m9a7_6.index]);
				$('#entryanswer'+$.k2l.m9a7_6.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m9a7_6.index).html('<form class="textentry"><input type="text" name="userText" size="14" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m9a7_6.index = 0;
				$.k2l.m9a7_6.wrongcount = 0;
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
			$.k2l.m9a7_6.wrongcount++;
			if ($.k2l.m9a7_6.wrongcount >= 1) {
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
		$.k2l.m9a7_6.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m9a7_6.index).html($.k2l.m9a7_6.correctAnswers[$.k2l.m9a7_6.index]);
		$('#entryanswer'+$.k2l.m9a7_6.index).html($.k2l.m9a7_6.displayAnswers[$.k2l.m9a7_6.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m9a7_6.index).addClass('correctword');
		
		if ($.k2l.m9a7_6.index < $.k2l.m9a7_6.correctAnswers.length - 1) {
			$.k2l.m9a7_6.index++;
			$('#m9a7instructions').html($.k2l.m9a7_6.instructions[$.k2l.m9a7_6.index]);
			$('#entryanswer'+$.k2l.m9a7_6.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m9a7_6.index).html('<form class="textentry"><input type="text" name="userText" size="14" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m9a7_6.index = 0;
			$.k2l.m9a7_6.wrongcount = 0;
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
		$.k2l.m9a7_6.index = 0;
		$.k2l.m9a7_6.wrongcount = 0;
	}
	
});

Template.m9a7_6.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m9a7_6 == 'undefined') {
		$.k2l.m9a7_6 = {};
	};
	
	$.k2l.m9a7_6.index = 0;
	$.k2l.m9a7_6.wrongcount = 0;
	 $.k2l.m9a7_6.correctAnswerIndex = 0; // for multiple answers

	 var instructions = ["Write the active tense in the space. (1 word)", "Write the passive tense in the space. (2 words)"];

	var correctAnswers = [
			["closed"], // Possible answers for Q1.
			["was closed"]
		];
		
		 var displayAnswers = [
			["closed"], // Possible answers for Q1.
			["was closed"]
		]; 
		
	$.k2l.m9a7_6.instructions = instructions;
	$.k2l.m9a7_6.displayAnswers = displayAnswers; 
	$.k2l.m9a7_6.correctAnswers = correctAnswers;
	
}
