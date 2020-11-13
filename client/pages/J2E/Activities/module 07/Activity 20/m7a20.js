Template.m7a20.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m7a20_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m7a20.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(7, 20);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(7, 20, subpage);
			oldLocation = location.href;
		}
	}, 500);

}
Template.m7a20_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a20_2"); 
	} 
}); 
 
Template.m7a20_2.events({
	
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
		
		for (var i = 0; i < $.k2l.m7a20_2.correctAnswers[$.k2l.m7a20_2.index].length; i++) {
			if (userText == $.k2l.m7a20_2.correctAnswers[$.k2l.m7a20_2.index][i]){ 
				isCorrect = true;
				// $.k2l.m7a20_2.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m7a20_2.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m7a20_2.correctAnswers[$.k2l.m7a20_2.index]);
			// $(evt.currentTarget).parent().html($.k2l.m7a20_2.displayAnswers[$.k2l.m7a20_2.index][$.k2l.m7a20_2.correctAnswerIndex]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m7a20_2.index).addClass('correctword');
			
			if ($.k2l.m7a20_2.index < $.k2l.m7a20_2.correctAnswers.length - 1) {
				$.k2l.m7a20_2.index++;
				$('#entryanswer'+$.k2l.m7a20_2.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m7a20_2.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m7a20_2.index = 0;
				$.k2l.m7a20_2.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m7a20_2.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
			}
		} else {
			$.k2l.m7a20_2.wrongcount++; 
			if ($.k2l.m7a20_2.wrongcount >= 1) {
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
		$.k2l.m7a20_2.wrongcount = 0;
		$('#entryanswer'+$.k2l.m7a20_2.index).html($.k2l.m7a20_2.correctAnswers[$.k2l.m7a20_2.index]);
		// $('#entryanswer'+$.k2l.m7a20_2.index).html($.k2l.m7a20_2.correctAnswers[$.k2l.m7a20_2.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m7a20_2.index).addClass('correctword');
		
		if ($.k2l.m7a20_2.index < $.k2l.m7a20_2.correctAnswers.length - 1) {
			$.k2l.m7a20_2.index++;
			$('#entryanswer'+$.k2l.m7a20_2.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m7a20_2.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m7a20_2.index = 0;
			$.k2l.m7a20_2.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m7a20_2.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
		}
	},

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a20_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a20_2.sound, $(evt.currentTarget));
	}
	
});

Template.m7a20_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a20_2 == 'undefined') {
		$.k2l.m7a20_2 = {};
	};
	
	$.k2l.m7a20_2.sound = new Audio();
	$.k2l.m7a20_2.index = 0;
	$.k2l.m7a20_2.wrongcount = 0;
	// $.k2l.m7a20_2.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
			["had"], // Possible answers for Q1.
			["met"]
		];
		
		/* var displayAnswers = [
			["on"], // Possible answers for Q1.
			["by"],   // Possible answers for Q2.
			["through"], // etc.
			["down"],
			["out"]
		]; 
		
	$.k2l.m7a20_2.displayAnswers = displayAnswers; */
	$.k2l.m7a20_2.correctAnswers = correctAnswers;
	
}

Template.m7a20_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a20_3"); 
	} 
}); 
 
Template.m7a20_3.events({
	
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
		
		for (var i = 0; i < $.k2l.m7a20_3.correctAnswers[$.k2l.m7a20_3.index].length; i++) {
			if (userText == $.k2l.m7a20_3.correctAnswers[$.k2l.m7a20_3.index][i]){ 
				isCorrect = true;
				// $.k2l.m7a20_3.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m7a20_3.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m7a20_3.correctAnswers[$.k2l.m7a20_3.index]);
			// $(evt.currentTarget).parent().html($.k2l.m7a20_3.displayAnswers[$.k2l.m7a20_3.index][$.k2l.m7a20_3.correctAnswerIndex]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m7a20_3.index).addClass('correctword');
			
			if ($.k2l.m7a20_3.index < $.k2l.m7a20_3.correctAnswers.length - 1) {
				$.k2l.m7a20_3.index++;
				$('#entryanswer'+$.k2l.m7a20_3.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m7a20_3.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m7a20_3.index = 0;
				$.k2l.m7a20_3.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m7a20_3.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
			}
		} else {
			$.k2l.m7a20_3.wrongcount++;
			if ($.k2l.m7a20_3.wrongcount >= 1) {
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
		$.k2l.m7a20_3.wrongcount = 0;
		$('#entryanswer'+$.k2l.m7a20_3.index).html($.k2l.m7a20_3.correctAnswers[$.k2l.m7a20_3.index]);
		// $('#entryanswer'+$.k2l.m7a20_3.index).html($.k2l.m7a20_3.correctAnswers[$.k2l.m7a20_3.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m7a20_3.index).addClass('correctword');
		
		if ($.k2l.m7a20_3.index < $.k2l.m7a20_3.correctAnswers.length - 1) {
			$.k2l.m7a20_3.index++;
			$('#entryanswer'+$.k2l.m7a20_3.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m7a20_3.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m7a20_3.index = 0;
			$.k2l.m7a20_3.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m7a20_3.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
		}
	},

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a20_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a20_3.sound, $(evt.currentTarget));
	}
	
	
});

Template.m7a20_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a20_3 == 'undefined') {
		$.k2l.m7a20_3 = {};
	};
	
	$.k2l.m7a20_3.sound = new Audio();
	$.k2l.m7a20_3.index = 0;
	$.k2l.m7a20_3.wrongcount = 0;
	// $.k2l.m7a20_3.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
			["had had"]
		];
		
		/* var displayAnswers = [
			["on"], // Possible answers for Q1.
			["by"],   // Possible answers for Q2.
			["through"], // etc.
			["down"],
			["out"]
		]; 
		
	$.k2l.m7a20_3.displayAnswers = displayAnswers; */
	$.k2l.m7a20_3.correctAnswers = correctAnswers;
	
}

Template.m7a20_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a20_4"); 
	} 
}); 
 
Template.m7a20_4.events({
	
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
		
		for (var i = 0; i < $.k2l.m7a20_4.correctAnswers[$.k2l.m7a20_4.index].length; i++) {
			if (userText == $.k2l.m7a20_4.correctAnswers[$.k2l.m7a20_4.index][i]){ 
				isCorrect = true;
				// $.k2l.m7a20_4.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m7a20_4.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m7a20_4.correctAnswers[$.k2l.m7a20_4.index]);
			// $(evt.currentTarget).parent().html($.k2l.m7a20_4.displayAnswers[$.k2l.m7a20_4.index][$.k2l.m7a20_4.correctAnswerIndex]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m7a20_4.index).addClass('correctword');
			
			if ($.k2l.m7a20_4.index < $.k2l.m7a20_4.correctAnswers.length - 1) {
				$.k2l.m7a20_4.index++;
				$('#entryanswer'+$.k2l.m7a20_4.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m7a20_4.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m7a20_4.index = 0;
				$.k2l.m7a20_4.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m7a20_4.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);;
			}
		} else {
			$.k2l.m7a20_4.wrongcount++;
			if ($.k2l.m7a20_4.wrongcount >= 1) {
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
		$.k2l.m7a20_4.wrongcount = 0;
		$('#entryanswer'+$.k2l.m7a20_4.index).html($.k2l.m7a20_4.correctAnswers[$.k2l.m7a20_4.index]);
		// $('#entryanswer'+$.k2l.m7a20_4.index).html($.k2l.m7a20_4.correctAnswers[$.k2l.m7a20_4.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m7a20_4.index).addClass('correctword');
		
		if ($.k2l.m7a20_4.index < $.k2l.m7a20_4.correctAnswers.length - 1) {
			$.k2l.m7a20_4.index++;
			$('#entryanswer'+$.k2l.m7a20_4.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m7a20_4.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m7a20_4.index = 0;
			$.k2l.m7a20_4.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m7a20_4.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
		}
	},

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a20_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a20_4.sound, $(evt.currentTarget));
	}
	
});

Template.m7a20_4.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a20_4 == 'undefined') {
		$.k2l.m7a20_4 = {};
	};
	
	$.k2l.m7a20_4.sound = new Audio();
	$.k2l.m7a20_4.index = 0;
	$.k2l.m7a20_4.wrongcount = 0;
	// $.k2l.m7a20_4.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
			["had intended"]
		];
		
	$.k2l.m7a20_4.correctAnswers = correctAnswers;
	
}

Template.m7a20_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a20_5"); 
	} 
}); 
 
Template.m7a20_5.events({
	
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
		
		for (var i = 0; i < $.k2l.m7a20_5.correctAnswers[$.k2l.m7a20_5.index].length; i++) {
			if (userText == $.k2l.m7a20_5.correctAnswers[$.k2l.m7a20_5.index][i]){ 
				isCorrect = true;
				// $.k2l.m7a20_5.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m7a20_5.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m7a20_5.correctAnswers[$.k2l.m7a20_5.index]);
			// $(evt.currentTarget).parent().html($.k2l.m7a20_5.displayAnswers[$.k2l.m7a20_5.index][$.k2l.m7a20_5.correctAnswerIndex]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m7a20_5.index).addClass('correctword');
			
			if ($.k2l.m7a20_5.index < $.k2l.m7a20_5.correctAnswers.length - 1) {
				$.k2l.m7a20_5.index++;
				$('#entryanswer'+$.k2l.m7a20_5.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m7a20_5.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m7a20_5.index = 0;
				$.k2l.m7a20_5.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m7a20_5.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
			}
		} else {
			$.k2l.m7a20_5.wrongcount++;
			if ($.k2l.m7a20_5.wrongcount >= 1) {
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
		$.k2l.m7a20_5.wrongcount = 0;
		$('#entryanswer'+$.k2l.m7a20_5.index).html($.k2l.m7a20_5.correctAnswers[$.k2l.m7a20_5.index]);
		// $('#entryanswer'+$.k2l.m7a20_5.index).html($.k2l.m7a20_5.correctAnswers[$.k2l.m7a20_5.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m7a20_5.index).addClass('correctword');
		
		if ($.k2l.m7a20_5.index < $.k2l.m7a20_5.correctAnswers.length - 1) {
			$.k2l.m7a20_5.index++;
			$('#entryanswer'+$.k2l.m7a20_5.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m7a20_5.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m7a20_5.index = 0;
			$.k2l.m7a20_5.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m7a20_5.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
		}
	},

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a20_5.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a20_5.sound, $(evt.currentTarget));
	}
	
});

Template.m7a20_5.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a20_5 == 'undefined') {
		$.k2l.m7a20_5 = {};
	};
	
	$.k2l.m7a20_5.sound = new Audio();
	$.k2l.m7a20_5.index = 0;
	$.k2l.m7a20_5.wrongcount = 0;
	// $.k2l.m7a20_5.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
			["had expected"]
		];
		
		/* var displayAnswers = [
			["on"], // Possible answers for Q1.
			["by"],   // Possible answers for Q2.
			["through"], // etc.
			["down"],
			["out"]
		]; 
		
	$.k2l.m7a20_5.displayAnswers = displayAnswers; */
	$.k2l.m7a20_5.correctAnswers = correctAnswers;
	
}

Template.m7a20_6.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a20_6"); 
	} 
}); 
 
Template.m7a20_6.events({
	
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
		
		for (var i = 0; i < $.k2l.m7a20_6.correctAnswers[$.k2l.m7a20_6.index].length; i++) {
			if (userText == $.k2l.m7a20_6.correctAnswers[$.k2l.m7a20_6.index][i]){ 
				isCorrect = true;
				$.k2l.m7a20_6.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m7a20_6.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			//$(evt.currentTarget).parent().html($.k2l.m7a20_6.correctAnswers[$.k2l.m7a20_6.index]);
			 $(evt.currentTarget).parent().html($.k2l.m7a20_6.displayAnswers[$.k2l.m7a20_6.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m7a20_6.index).addClass('correctword');
			
			if ($.k2l.m7a20_6.index < $.k2l.m7a20_6.correctAnswers.length - 1) {
				$.k2l.m7a20_6.index++;
				$('#entryanswer'+$.k2l.m7a20_6.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m7a20_6.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m7a20_6.index = 0;
				$.k2l.m7a20_6.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m7a20_6.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
			}
		} else {
			$.k2l.m7a20_6.wrongcount++;
			if ($.k2l.m7a20_6.wrongcount >= 1) {
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
		$.k2l.m7a20_6.wrongcount = 0;
		//$('#entryanswer'+$.k2l.m7a20_6.index).html($.k2l.m7a20_6.correctAnswers[$.k2l.m7a20_6.index]);
		 $('#entryanswer'+$.k2l.m7a20_6.index).html($.k2l.m7a20_6.displayAnswers[$.k2l.m7a20_6.index]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m7a20_6.index).addClass('correctword');
		
		if ($.k2l.m7a20_6.index < $.k2l.m7a20_6.correctAnswers.length - 1) {
			$.k2l.m7a20_6.index++;
			$('#entryanswer'+$.k2l.m7a20_6.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m7a20_6.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m7a20_6.index = 0;
			$.k2l.m7a20_6.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m7a20_6.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
		}
	},

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a20_6.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a20_6.sound, $(evt.currentTarget));
	}
	
});

Template.m7a20_6.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a20_6 == 'undefined') {
		$.k2l.m7a20_6 = {};
	};
	
	$.k2l.m7a20_6.sound = new Audio();
	$.k2l.m7a20_6.index = 0;
	$.k2l.m7a20_6.wrongcount = 0;
	$.k2l.m7a20_6.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
			["he'd been writing", "hed been writing", "he had been writing"]
		];
		
		 var displayAnswers = [
			["He'd been writing"]
		]; 
		
	$.k2l.m7a20_6.displayAnswers = displayAnswers; 
	$.k2l.m7a20_6.correctAnswers = correctAnswers;
	
}

Template.m7a20_7.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a20_7"); 
	} 
}); 
 
Template.m7a20_7.events({
	
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
		
		for (var i = 0; i < $.k2l.m7a20_7.correctAnswers[$.k2l.m7a20_7.index].length; i++) {
			if (userText == $.k2l.m7a20_7.correctAnswers[$.k2l.m7a20_7.index][i]){ 
				isCorrect = true;
				$.k2l.m7a20_7.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m7a20_7.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			//$(evt.currentTarget).parent().html($.k2l.m7a20_7.correctAnswers[$.k2l.m7a20_7.index]);
			 $(evt.currentTarget).parent().html($.k2l.m7a20_7.displayAnswers[$.k2l.m7a20_7.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m7a20_7.index).addClass('correctword');
			
			if ($.k2l.m7a20_7.index < $.k2l.m7a20_7.correctAnswers.length - 1) {
				$.k2l.m7a20_7.index++;
				$('#entryanswer'+$.k2l.m7a20_7.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m7a20_7.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m7a20_7.index = 0;
				$.k2l.m7a20_7.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m7a20_7.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
			}
		} else {
			$.k2l.m7a20_7.wrongcount++;
			if ($.k2l.m7a20_7.wrongcount >= 1) {
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
		$.k2l.m7a20_7.wrongcount = 0;
		//$('#entryanswer'+$.k2l.m7a20_7.index).html($.k2l.m7a20_7.correctAnswers[$.k2l.m7a20_7.index]);
		 $('#entryanswer'+$.k2l.m7a20_7.index).html($.k2l.m7a20_7.displayAnswers[$.k2l.m7a20_7.index]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m7a20_7.index).addClass('correctword');
		
		if ($.k2l.m7a20_7.index < $.k2l.m7a20_7.correctAnswers.length - 1) {
			$.k2l.m7a20_7.index++;
			$('#entryanswer'+$.k2l.m7a20_7.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m7a20_7.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m7a20_7.index = 0;
			$.k2l.m7a20_7.wrongcount = 0;
			setTimeout(function() {
				$.k2l.m7a20_7.sound.src = {};
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
			}, 4000);
		}
	},

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a20_7.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a20_7.sound, $(evt.currentTarget));
	}
	
});

Template.m7a20_7.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a20_7 == 'undefined') {
		$.k2l.m7a20_7 = {};
	};
	
	$.k2l.m7a20_7.sound = new Audio();
	$.k2l.m7a20_7.index = 0;
	$.k2l.m7a20_7.wrongcount = 0;
	//$.k2l.m7a20_7.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
		["d found", "'d found", "had found"]
	];
		
	var displayAnswers = [
		["had found"]
	]; 
		
	$.k2l.m7a20_7.displayAnswers = displayAnswers; 
	$.k2l.m7a20_7.correctAnswers = correctAnswers;
	
}


Template.m7a20.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 7, 20, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m7a20.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
