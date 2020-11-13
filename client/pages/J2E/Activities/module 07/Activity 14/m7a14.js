Template.m7a14.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m7a14_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m7a14.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(7, 14);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(7, 14, subpage);
			oldLocation = location.href;
		}
	}, 500);

}
Template.m7a14_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a14_1"); 
	} 
}); 

Template.m7a14_1.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a14_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a14_1.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m7a14_1.sound.src = {};
	}

});

Template.m7a14_1.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a14_1 == 'undefined') {
		$.k2l.m7a14_1 = {};
	};
	
	$.k2l.m7a14_1.sound = new Audio();

	$($.k2l.m7a14_1.sound).on('ended',function(){
		 setTimeout(function() {
			$('#m7a14_1').addClass('hidden');
			$('#m7a14_2').removeClass('hidden');
			$.k2l.m7a14_1.sound.src = {};
			Session.set('activeSection', '#m7a14_2');
		}, 1000);
		});
}

Template.m7a14_10.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a14_10"); 
	} 
}); 

Template.m7a14_10.events({
	
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
		
		for (var i = 0; i < $.k2l.m7a14_10.correctAnswers[$.k2l.m7a14_10.index].length; i++) {
			if (userText == $.k2l.m7a14_10.correctAnswers[$.k2l.m7a14_10.index][i]){ 
				isCorrect = true;
				$.k2l.m7a14_10.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m7a14_10.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			// $(evt.currentTarget).parent().html($.k2l.m7a14_10.correctAnswers[$.k2l.m7a14_10.index]);
			$(evt.currentTarget).parent().html($.k2l.m7a14_10.displayAnswers[$.k2l.m7a14_10.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m7a14_10.index).addClass('correctword');
			
			if ($.k2l.m7a14_10.index < $.k2l.m7a14_10.correctAnswers.length - 1) {
				$.k2l.m7a14_10.index++;
				$('#entryanswer'+$.k2l.m7a14_10.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m7a14_10.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off" autofocus><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m7a14_10.index = 0;
				$.k2l.m7a14_10.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m7a14_10.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m7a14_10.wrongcount++;
			if ($.k2l.m7a14_10.wrongcount >= 1) {
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
		$.k2l.m7a14_10.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m7a14_10.index).html($.k2l.m7a14_10.correctAnswers[$.k2l.m7a14_10.index]);
		$('#entryanswer'+$.k2l.m7a14_10.index).html($.k2l.m7a14_10.displayAnswers[$.k2l.m7a14_10.index]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m7a14_10.index).addClass('correctword');
		
		if ($.k2l.m7a14_10.index < $.k2l.m7a14_10.correctAnswers.length - 1) {
			$.k2l.m7a14_10.index++;
			$('#entryanswer'+$.k2l.m7a14_10.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m7a14_10.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off" autofocus><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m7a14_10.index = 0;
			$.k2l.m7a14_10.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m7a14_10.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a14_10.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a14_10.sound, $(evt.currentTarget));
	},
	
	"click .pagination": function(evt){
		$.k2l.m7a14_10.index = 0;
		$.k2l.m7a14_10.wrongcount = 0;
	}
	
});

Template.m7a14_10.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a14_10 == 'undefined') {
		$.k2l.m7a14_10 = {};
	};
	
	$.k2l.m7a14_10.sound = new Audio();
	$.k2l.m7a14_10.index = 0;
	$.k2l.m7a14_10.wrongcount = 0;
	$.k2l.m7a14_10.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
			["for"], // Possible answers for Q1.
			["out"],   // Possible answers for Q2.
			["with"],
			["in", "over"]
		];
		
		var displayAnswers = [
			["for"], // Possible answers for Q1.
			["out"],   // Possible answers for Q2.
			["with"],
			["in/over"]
		]; 
		
	$.k2l.m7a14_10.displayAnswers = displayAnswers;
	$.k2l.m7a14_10.correctAnswers = correctAnswers;
	
}

Template.m7a14_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a14_2"); 
	} 
}); 

Template.m7a14_2.events({
	
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
		
		for (var i = 0; i < $.k2l.m7a14_2.correctAnswers[$.k2l.m7a14_2.index].length; i++) {
			if (userText == $.k2l.m7a14_2.correctAnswers[$.k2l.m7a14_2.index][i]){ 
				isCorrect = true;
				// $.k2l.m7a14_2.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m7a14_2.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m7a14_2.correctAnswers[$.k2l.m7a14_2.index]);
			// $(evt.currentTarget).parent().html($.k2l.m7a14_2.displayAnswers[$.k2l.m7a14_2.index][$.k2l.m7a14_2.correctAnswerIndex]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m7a14_2.index).addClass('correctword');
			
			if ($.k2l.m7a14_2.index < $.k2l.m7a14_2.correctAnswers.length - 1) {
				$.k2l.m7a14_2.index++;
				$('#entryanswer'+$.k2l.m7a14_2.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m7a14_2.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off" autofocus><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m7a14_2.index = 0;
				$.k2l.m7a14_2.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m7a14_2.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m7a14_2.wrongcount++;
			if ($.k2l.m7a14_2.wrongcount >= 1) {
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
		$.k2l.m7a14_2.wrongcount = 0;
		$('#entryanswer'+$.k2l.m7a14_2.index).html($.k2l.m7a14_2.correctAnswers[$.k2l.m7a14_2.index]);
		// $('#entryanswer'+$.k2l.m7a14_2.index).html($.k2l.m7a14_2.correctAnswers[$.k2l.m7a14_2.index]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m7a14_2.index).addClass('correctword');
		
		if ($.k2l.m7a14_2.index < $.k2l.m7a14_2.correctAnswers.length - 1) {
			$.k2l.m7a14_2.index++;
			$('#entryanswer'+$.k2l.m7a14_2.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m7a14_2.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off" autofocus><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m7a14_2.index = 0;
			$.k2l.m7a14_2.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m7a14_2.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a14_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a14_2.sound, $(evt.currentTarget));
	},
	
	"click .pagination": function(evt){
		$.k2l.m7a14_2.index = 0;
		$.k2l.m7a14_2.wrongcount = 0;
	}
	
});

Template.m7a14_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a14_2 == 'undefined') {
		$.k2l.m7a14_2 = {};
	};
	
	$.k2l.m7a14_2.sound = new Audio();
	$.k2l.m7a14_2.index = 0;
	$.k2l.m7a14_2.wrongcount = 0;
	// $.k2l.m7a14_2.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
			["with"], // Possible answers for Q1.
			["to"],   // Possible answers for Q2.
			["of"]
		];
		
		/* var displayAnswers = [
			["on"], // Possible answers for Q1.
			["by"],   // Possible answers for Q2.
			["through"], // etc.
			["down"],
			["out"]
		]; 
		
	$.k2l.m7a14_2.displayAnswers = displayAnswers; */
	$.k2l.m7a14_2.correctAnswers = correctAnswers;
	
}

Template.m7a14_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a14_3"); 
	} 
}); 

Template.m7a14_3.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a14_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a14_3.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m7a14_3.sound.src = {};
	}

});

Template.m7a14_3.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a14_3 == 'undefined') {
		$.k2l.m7a14_3 = {};
	};
	
	$.k2l.m7a14_3.sound = new Audio();

	$($.k2l.m7a14_3.sound).on('ended',function(){
		 setTimeout(function() {
			$('#m7a14_3').addClass('hidden');
			$('#m7a14_4').removeClass('hidden');
			$.k2l.m7a14_3.sound.src = {};
			Session.set('activeSection', '#m7a14_4');
		}, 1000);
		});
}

Template.m7a14_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a14_4"); 
	} 
}); 

Template.m7a14_4.events({
	
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
		
		for (var i = 0; i < $.k2l.m7a14_4.correctAnswers[$.k2l.m7a14_4.index].length; i++) {
			if (userText == $.k2l.m7a14_4.correctAnswers[$.k2l.m7a14_4.index][i]){ 
				isCorrect = true;
				$.k2l.m7a14_4.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m7a14_4.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			// $(evt.currentTarget).parent().html($.k2l.m7a14_4.correctAnswers[$.k2l.m7a14_4.index]);
			$(evt.currentTarget).parent().html($.k2l.m7a14_4.displayAnswers[$.k2l.m7a14_4.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m7a14_4.index).addClass('correctword');
			
			if ($.k2l.m7a14_4.index < $.k2l.m7a14_4.correctAnswers.length - 1) {
				$.k2l.m7a14_4.index++;
				$('#entryanswer'+$.k2l.m7a14_4.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m7a14_4.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off" autofocus><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m7a14_4.index = 0;
				$.k2l.m7a14_4.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m7a14_4.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m7a14_4.wrongcount++;
			if ($.k2l.m7a14_4.wrongcount >= 1) {
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
		$.k2l.m7a14_4.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m7a14_4.index).html($.k2l.m7a14_4.correctAnswers[$.k2l.m7a14_4.index]);
		$('#entryanswer'+$.k2l.m7a14_4.index).html($.k2l.m7a14_4.displayAnswers[$.k2l.m7a14_4.index]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m7a14_4.index).addClass('correctword');
		
		if ($.k2l.m7a14_4.index < $.k2l.m7a14_4.correctAnswers.length - 1) {
			$.k2l.m7a14_4.index++;
			$('#entryanswer'+$.k2l.m7a14_4.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m7a14_4.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off" autofocus><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m7a14_4.index = 0;
			$.k2l.m7a14_4.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m7a14_4.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a14_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a14_4.sound, $(evt.currentTarget));
	},
	
	"click .pagination": function(evt){
		$.k2l.m7a14_4.index = 0;
		$.k2l.m7a14_4.wrongcount = 0;
	}
	
});

Template.m7a14_4.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a14_4 == 'undefined') {
		$.k2l.m7a14_4 = {};
	};
	
	$.k2l.m7a14_4.sound = new Audio();
	$.k2l.m7a14_4.index = 0;
	$.k2l.m7a14_4.wrongcount = 0;
	$.k2l.m7a14_4.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
			["in"], // Possible answers for Q1.
			["to"],   // Possible answers for Q2.
			["among", "in"]
		];
		
		var displayAnswers = [
			["in"], // Possible answers for Q1.
			["to"],   // Possible answers for Q2.
			["among/in"]
		]; 
		
	$.k2l.m7a14_4.displayAnswers = displayAnswers;
	$.k2l.m7a14_4.correctAnswers = correctAnswers;
	
}

Template.m7a14_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a14_5"); 
	} 
}); 

Template.m7a14_5.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a14_5.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a14_5.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m7a14_5.sound.src = {};
	}

});

Template.m7a14_5.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a14_5 == 'undefined') {
		$.k2l.m7a14_5 = {};
	};
	
	$.k2l.m7a14_5.sound = new Audio();

	$($.k2l.m7a14_5.sound).on('ended',function(){
		 setTimeout(function() {
			$('#m7a14_5').addClass('hidden');
			$('#m7a14_6').removeClass('hidden');
			$.k2l.m7a14_5.sound.src = {};
			Session.set('activeSection', '#m7a14_6');
		}, 1000);
		});
}

Template.m7a14_6.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a14_6"); 
	} 
}); 

Template.m7a14_6.events({
	
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
		
		for (var i = 0; i < $.k2l.m7a14_6.correctAnswers[$.k2l.m7a14_6.index].length; i++) {
			if (userText == $.k2l.m7a14_6.correctAnswers[$.k2l.m7a14_6.index][i]){ 
				isCorrect = true;
				// $.k2l.m7a14_6.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m7a14_6.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m7a14_6.correctAnswers[$.k2l.m7a14_6.index]);
			// $(evt.currentTarget).parent().html($.k2l.m7a14_6.displayAnswers[$.k2l.m7a14_6.index][$.k2l.m7a14_6.correctAnswerIndex]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m7a14_6.index).addClass('correctword');
			
			if ($.k2l.m7a14_6.index < $.k2l.m7a14_6.correctAnswers.length - 1) {
				$.k2l.m7a14_6.index++;
				$('#entryanswer'+$.k2l.m7a14_6.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m7a14_6.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off" autofocus><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m7a14_6.index = 0;
				$.k2l.m7a14_6.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m7a14_6.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m7a14_6.wrongcount++;
			if ($.k2l.m7a14_6.wrongcount >= 1) {
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
		$.k2l.m7a14_6.wrongcount = 0;
		$('#entryanswer'+$.k2l.m7a14_6.index).html($.k2l.m7a14_6.correctAnswers[$.k2l.m7a14_6.index]);
		// $('#entryanswer'+$.k2l.m7a14_6.index).html($.k2l.m7a14_6.correctAnswers[$.k2l.m7a14_6.index]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m7a14_6.index).addClass('correctword');
		
		if ($.k2l.m7a14_6.index < $.k2l.m7a14_6.correctAnswers.length - 1) {
			$.k2l.m7a14_6.index++;
			$('#entryanswer'+$.k2l.m7a14_6.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m7a14_6.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off" autofocus><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m7a14_6.index = 0;
			$.k2l.m7a14_6.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m7a14_6.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a14_6.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a14_6.sound, $(evt.currentTarget));
	},
	
	"click .pagination": function(evt){
		$.k2l.m7a14_6.index = 0;
		$.k2l.m7a14_6.wrongcount = 0;
	}
	
});

Template.m7a14_6.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a14_6 == 'undefined') {
		$.k2l.m7a14_6 = {};
	};
	
	$.k2l.m7a14_6.sound = new Audio();
	$.k2l.m7a14_6.index = 0;
	$.k2l.m7a14_6.wrongcount = 0;
	// $.k2l.m7a14_6.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
			["of"], // Possible answers for Q1.
			["on"],   // Possible answers for Q2.
			["in"]
		];
		
		/* var displayAnswers = [
			["on"], // Possible answers for Q1.
			["by"],   // Possible answers for Q2.
			["through"], // etc.
			["down"],
			["out"]
		]; 
		
	$.k2l.m7a14_6.displayAnswers = displayAnswers; */
	$.k2l.m7a14_6.correctAnswers = correctAnswers;
	
}

Template.m7a14_7.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a14_7"); 
	} 
}); 

Template.m7a14_7.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a14_7.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a14_7.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m7a14_7.sound.src = {};
	}

});

Template.m7a14_7.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a14_7 == 'undefined') {
		$.k2l.m7a14_7 = {};
	};
	
	$.k2l.m7a14_7.sound = new Audio();

	$($.k2l.m7a14_7.sound).on('ended',function(){
		 setTimeout(function() {
			$('#m7a14_7').addClass('hidden');
			$('#m7a14_8').removeClass('hidden');
			$.k2l.m7a14_7.sound.src = {};
			Session.set('activeSection', '#m7a14_8');
		}, 1000);
		});
}

Template.m7a14_8.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a14_8"); 
	} 
}); 

Template.m7a14_8.events({
	
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
		
		for (var i = 0; i < $.k2l.m7a14_8.correctAnswers[$.k2l.m7a14_8.index].length; i++) {
			if (userText == $.k2l.m7a14_8.correctAnswers[$.k2l.m7a14_8.index][i]){ 
				isCorrect = true;
				// $.k2l.m7a14_8.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m7a14_8.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m7a14_8.correctAnswers[$.k2l.m7a14_8.index]);
			// $(evt.currentTarget).parent().html($.k2l.m7a14_8.displayAnswers[$.k2l.m7a14_8.index][$.k2l.m7a14_8.correctAnswerIndex]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m7a14_8.index).addClass('correctword');
			
			if ($.k2l.m7a14_8.index < $.k2l.m7a14_8.correctAnswers.length - 1) {
				$.k2l.m7a14_8.index++;
				$('#entryanswer'+$.k2l.m7a14_8.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m7a14_8.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off" autofocus><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m7a14_8.index = 0;
				$.k2l.m7a14_8.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m7a14_8.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m7a14_8.wrongcount++;
			if ($.k2l.m7a14_8.wrongcount >= 1) {
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
		$.k2l.m7a14_8.wrongcount = 0;
		$('#entryanswer'+$.k2l.m7a14_8.index).html($.k2l.m7a14_8.correctAnswers[$.k2l.m7a14_8.index]);
		// $('#entryanswer'+$.k2l.m7a14_8.index).html($.k2l.m7a14_8.correctAnswers[$.k2l.m7a14_8.index]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m7a14_8.index).addClass('correctword');
		
		if ($.k2l.m7a14_8.index < $.k2l.m7a14_8.correctAnswers.length - 1) {
			$.k2l.m7a14_8.index++;
			$('#entryanswer'+$.k2l.m7a14_8.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m7a14_8.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off" autofocus><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m7a14_8.index = 0;
			$.k2l.m7a14_8.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m7a14_8.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a14_8.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a14_8.sound, $(evt.currentTarget));
	},
	
	"click .pagination": function(evt){
		$.k2l.m7a14_8.index = 0;
		$.k2l.m7a14_8.wrongcount = 0;
	}
	
});

Template.m7a14_8.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a14_8 == 'undefined') {
		$.k2l.m7a14_8 = {};
	};
	
	$.k2l.m7a14_8.sound = new Audio();
	$.k2l.m7a14_8.index = 0;
	$.k2l.m7a14_8.wrongcount = 0;
	// $.k2l.m7a14_8.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
			["on"], // Possible answers for Q1.
			["from"],   // Possible answers for Q2.
			["to"]
		];
		
		/* var displayAnswers = [
			["on"], // Possible answers for Q1.
			["by"],   // Possible answers for Q2.
			["through"], // etc.
			["down"],
			["out"]
		]; 
		
	$.k2l.m7a14_8.displayAnswers = displayAnswers; */
	$.k2l.m7a14_8.correctAnswers = correctAnswers;
	
}

Template.m7a14_9.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a14_9"); 
	} 
}); 

Template.m7a14_9.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a14_9.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a14_9.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m7a14_9.sound.src = {};
	}

});

Template.m7a14_9.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a14_9 == 'undefined') {
		$.k2l.m7a14_9 = {};
	};
	
	$.k2l.m7a14_9.sound = new Audio();

	$($.k2l.m7a14_9.sound).on('ended',function(){
		 setTimeout(function() {
			$('#m7a14_9').addClass('hidden');
			$('#m7a14_10').removeClass('hidden');
			$.k2l.m7a14_9.sound.src = {};
			Session.set('activeSection', '#m7a14_10');
		}, 1000);
		});
}


Template.m7a14.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 7, 14, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m7a14.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
