Template.m8a12.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m8a12_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m8a12.rendered = function() { 
		document.title = "Journey 2 English";
	
	setStartActivity(8,12);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 12, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}
Template.m8a12_10.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a12_10"); 
	} 
}); 
 
Template.m8a12_10.events({
	
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
		
		for (var i = 0; i < $.k2l.m8a12_10.correctAnswers[$.k2l.m8a12_10.index].length; i++) {
			if (userText == $.k2l.m8a12_10.correctAnswers[$.k2l.m8a12_10.index][i]){ 
				isCorrect = true;
				 $.k2l.m8a12_10.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m8a12_10.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			//$(evt.currentTarget).parent().html($.k2l.m8a12_10.correctAnswers[$.k2l.m8a12_10.index]);
			$(evt.currentTarget).parent().html($.k2l.m8a12_10.displayAnswers[$.k2l.m8a12_10.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m8a12_10.index).addClass('correctword');
			
			if ($.k2l.m8a12_10.index < $.k2l.m8a12_10.correctAnswers.length - 1) {
				$.k2l.m8a12_10.index++;
				$('#entryanswer'+$.k2l.m8a12_10.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m8a12_10.index).html('<form class="textentry"><input type="text" name="userText" size="9" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m8a12_10.index = 0;
				$.k2l.m8a12_10.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m8a12_10.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m8a12_10.wrongcount++;
			if ($.k2l.m8a12_10.wrongcount >= 1) {
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
		$.k2l.m8a12_10.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m8a12_10.index).html($.k2l.m8a12_10.correctAnswers[$.k2l.m8a12_10.index]);
		$('#entryanswer'+$.k2l.m8a12_10.index).html($.k2l.m8a12_10.displayAnswers[$.k2l.m8a12_10.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m8a12_10.index).addClass('correctword');
		
		if ($.k2l.m8a12_10.index < $.k2l.m8a12_10.correctAnswers.length - 1) {
			$.k2l.m8a12_10.index++;
			$('#entryanswer'+$.k2l.m8a12_10.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m8a12_10.index).html('<form class="textentry"><input type="text" name="userText" size="9" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m8a12_10.index = 0;
			$.k2l.m8a12_10.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m8a12_10.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},
	
	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m8a12_10.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a12_10.sound, $(evt.currentTarget));
	},

	"click .pagination": function(evt){
		$.k2l.m8a12_10.index = 0;
		$.k2l.m8a12_10.wrongcount = 0;
		$.k2l.m8a12_10.sound.src = {};
	}
	
});

Template.m8a12_10.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a12_10 == 'undefined') {
		$.k2l.m8a12_10 = {};
	};
	
	$.k2l.m8a12_10.sound = new Audio();
	$.k2l.m8a12_10.index = 0;
	$.k2l.m8a12_10.wrongcount = 0;
	 $.k2l.m8a12_10.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
			["had understood", "'d understood"], // Possible answers for Q1.
			["would have been", "would've been"]
		];
		
		 var displayAnswers = [
			["'d understood"], // Possible answers for Q1.
			["would have been"]
		]; 
		
	$.k2l.m8a12_10.displayAnswers = displayAnswers; 
	$.k2l.m8a12_10.correctAnswers = correctAnswers;
	
}

Template.m8a12_11.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a12_11"); 
	} 
}); 
 
Template.m8a12_11.events({
	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m8a12_11.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a12_11.sound, $(evt.currentTarget));
	},

	"click .pagination": function(evt){
		$.k2l.m8a12_11.index = 0;
		$.k2l.m8a12_11.wrongcount = 0;
		$.k2l.m8a12_11.sound.src = {};
	}
	
});

Template.m8a12_11.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a12_11 == 'undefined') {
		$.k2l.m8a12_11 = {};
	};
	
	$.k2l.m8a12_11.sound = new Audio();
	
}

Template.m8a12_12.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a12_12"); 
	} 
}); 
 
Template.m8a12_12.events({
	
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
		
		for (var i = 0; i < $.k2l.m8a12_12.correctAnswers[$.k2l.m8a12_12.index].length; i++) {
			if (userText == $.k2l.m8a12_12.correctAnswers[$.k2l.m8a12_12.index][i]){ 
				isCorrect = true;
				 $.k2l.m8a12_12.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m8a12_12.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			//$(evt.currentTarget).parent().html($.k2l.m8a12_12.correctAnswers[$.k2l.m8a12_12.index]);
			$(evt.currentTarget).parent().html($.k2l.m8a12_12.displayAnswers[$.k2l.m8a12_12.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m8a12_12.index).addClass('correctword');
			
			if ($.k2l.m8a12_12.index < $.k2l.m8a12_12.correctAnswers.length - 1) {
				$.k2l.m8a12_12.index++;
				$('#entryanswer'+$.k2l.m8a12_12.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m8a12_12.index).html('<form class="textentry"><input type="text" name="userText" size="9" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m8a12_12.index = 0;
				$.k2l.m8a12_12.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m8a12_12.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m8a12_12.wrongcount++;
			if ($.k2l.m8a12_12.wrongcount >= 1) {
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
		$.k2l.m8a12_12.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m8a12_12.index).html($.k2l.m8a12_12.correctAnswers[$.k2l.m8a12_12.index]);
		$('#entryanswer'+$.k2l.m8a12_12.index).html($.k2l.m8a12_12.displayAnswers[$.k2l.m8a12_12.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m8a12_12.index).addClass('correctword');
		
		if ($.k2l.m8a12_12.index < $.k2l.m8a12_12.correctAnswers.length - 1) {
			$.k2l.m8a12_12.index++;
			$('#entryanswer'+$.k2l.m8a12_12.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m8a12_12.index).html('<form class="textentry"><input type="text" name="userText" size="9" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m8a12_12.index = 0;
			$.k2l.m8a12_12.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m8a12_12.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},
	
	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m8a12_12.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a12_12.sound, $(evt.currentTarget));
	},

	"click .pagination": function(evt){
		$.k2l.m8a12_12.index = 0;
		$.k2l.m8a12_12.wrongcount = 0;
		$.k2l.m8a12_12.sound.src = {};
	}
	
});

Template.m8a12_12.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a12_12 == 'undefined') {
		$.k2l.m8a12_12 = {};
	};
	
	$.k2l.m8a12_12.sound = new Audio();
	$.k2l.m8a12_12.index = 0;
	$.k2l.m8a12_12.wrongcount = 0;
	 $.k2l.m8a12_12.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
			["'re", "are"], // Possible answers for Q1.
			["work out"]
		];
		
		 var displayAnswers = [
			["'re"], // Possible answers for Q1.
			["work out"]
		]; 
		
	$.k2l.m8a12_12.displayAnswers = displayAnswers; 
	$.k2l.m8a12_12.correctAnswers = correctAnswers;
	
}

Template.m8a12_15.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a12_15"); 
	} 
}); 
 
Template.m8a12_15.events({ 
 
}); 
 
Template.m8a12_15.rendered = function() {
}

Template.m8a12_16.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a12_16"); 
	} 
}); 
 
Template.m8a12_16.events({ 
	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m8a12_16.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a12_16.sound, $(evt.currentTarget));
	},

	'click .pagination': function(evt) {		
		$.k2l.m8a12_16.sound.src = {};
	}
}); 
 
Template.m8a12_16.rendered = function() {
	$.k2l.m8a12_16 = {};
	$.k2l.m8a12_16.sound = new Audio();
	$.k2l.m8a12_16.sound.src = 'audio/module8/a12/Complete_conversation.m4a';
}

Template.m8a12_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a12_2"); 
	} 
}); 
 
Template.m8a12_2.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m8a12_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a12_2.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m8a12_2.sound.src = {};
	}

});

Template.m8a12_2.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a12_2 == 'undefined') {
		$.k2l.m8a12_2 = {};
	};
	
	$.k2l.m8a12_2.sound = new Audio();
}

Template.m8a12_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a12_3"); 
	} 
}); 
 
Template.m8a12_3.events({
	
	"click .button2": function(evt){
		
		if ($.k2l.m8a12_3.allowClick == true) {
			$.k2l.m8a12_3.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m8a12_3.answer_index[$.k2l.m8a12_3.index]) {
				//var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m8a12_3.index++
				// Correct
				$('.correctscreen').removeClass('hidden');
				$('.info').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
					}, 1000);				
					// setTimeout (function() {
					// 	$('#welldonecap').removeClass('hidden');
					// }, 1000);
					
					// setTimeout(function() {
					// 	if ($.k2l.m8a12_3.index > $.k2l.m8a12_3.answer_index.length) {
					// 		$.k2l.m8a12_3.index = 0;
					// 	}
						
						//$.k2l.m8a12_3.allowClick = true; // Make the buttons clickable again
						//$(parentSection).addClass('hidden'); // hide this page
						//$(parentSection).next('section').removeClass('hidden');// reveal next page.
						//document.location.hash = $(parentSection).next('section').attr('id');
						//Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
				//	}, 2000);
					 $('.pagination').removeClass('hidden');
				} else {				
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$.k2l.m8a12_3.allowClick = true; // Make the buttons clickable again
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		$.k2l.m8a12_3.index = 0;
		$.k2l.m8a12_3.allowClick = true;
	}

});

Template.m8a12_3.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a12_3 == 'undefined') {
		$.k2l.m8a12_3 = {};
	};
	
	var answer_index = ["4"];
	
	$.k2l.m8a12_3.answer_index = answer_index;
	$.k2l.m8a12_3.index = 0;

	$.k2l.m8a12_3.allowClick = true;
}

Template.m8a12_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a12_4"); 
	} 
}); 
 
Template.m8a12_4.events({
	
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
		
		for (var i = 0; i < $.k2l.m8a12_4.correctAnswers[$.k2l.m8a12_4.index].length; i++) {
			if (userText == $.k2l.m8a12_4.correctAnswers[$.k2l.m8a12_4.index][i]){ 
				isCorrect = true;
				 $.k2l.m8a12_4.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m8a12_4.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			//$(evt.currentTarget).parent().html($.k2l.m8a12_4.correctAnswers[$.k2l.m8a12_4.index]);
			$(evt.currentTarget).parent().html($.k2l.m8a12_4.displayAnswers[$.k2l.m8a12_4.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m8a12_4.index).addClass('correctword');
			
			if ($.k2l.m8a12_4.index < $.k2l.m8a12_4.correctAnswers.length - 1) {
				$.k2l.m8a12_4.index++;
				$('#entryanswer'+$.k2l.m8a12_4.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m8a12_4.index).html('<form class="textentry"><input type="text" name="userText" size="9" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m8a12_4.index = 0;
				$.k2l.m8a12_4.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m8a12_4.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m8a12_4.wrongcount++;
			if ($.k2l.m8a12_4.wrongcount >= 1) {
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
		$.k2l.m8a12_4.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m8a12_4.index).html($.k2l.m8a12_4.correctAnswers[$.k2l.m8a12_4.index]);
		$('#entryanswer'+$.k2l.m8a12_4.index).html($.k2l.m8a12_4.displayAnswers[$.k2l.m8a12_4.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m8a12_4.index).addClass('correctword');
		
		if ($.k2l.m8a12_4.index < $.k2l.m8a12_4.correctAnswers.length - 1) {
			$.k2l.m8a12_4.index++;
			$('#entryanswer'+$.k2l.m8a12_4.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m8a12_4.index).html('<form class="textentry"><input type="text" name="userText" size="9" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m8a12_4.index = 0;
			$.k2l.m8a12_4.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m8a12_4.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},
	
	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m8a12_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a12_4.sound, $(evt.currentTarget));
	},

	"click .pagination": function(evt){
		$.k2l.m8a12_4.index = 0;
		$.k2l.m8a12_4.wrongcount = 0;
		$.k2l.m8a12_4.sound.src = {};
	}
	
});

Template.m8a12_4.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a12_4 == 'undefined') {
		$.k2l.m8a12_4 = {};
	};
	
	$.k2l.m8a12_4.sound = new Audio();
	$.k2l.m8a12_4.index = 0;
	$.k2l.m8a12_4.wrongcount = 0;
	 $.k2l.m8a12_4.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
			["'d known", "had known"], // Possible answers for Q1.
			["started"]
		];
		
		 var displayAnswers = [
			["'d known"], // Possible answers for Q1.
			["started"]
		]; 
		
	$.k2l.m8a12_4.displayAnswers = displayAnswers; 
	$.k2l.m8a12_4.correctAnswers = correctAnswers;
	
}

Template.m8a12_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a12_5"); 
	} 
}); 
 
Template.m8a12_5.events({
	
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
		
		for (var i = 0; i < $.k2l.m8a12_5.correctAnswers[$.k2l.m8a12_5.index].length; i++) {
			if (userText == $.k2l.m8a12_5.correctAnswers[$.k2l.m8a12_5.index][i]){ 
				isCorrect = true;
				 $.k2l.m8a12_5.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m8a12_5.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			//$(evt.currentTarget).parent().html($.k2l.m8a12_5.correctAnswers[$.k2l.m8a12_5.index]);
			$(evt.currentTarget).parent().html($.k2l.m8a12_5.displayAnswers[$.k2l.m8a12_5.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m8a12_5.index).addClass('correctword');
			
			if ($.k2l.m8a12_5.index < $.k2l.m8a12_5.correctAnswers.length - 1) {
				$.k2l.m8a12_5.index++;
				$('#entryanswer'+$.k2l.m8a12_5.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m8a12_5.index).html('<form class="textentry"><input type="text" name="userText" size="9" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m8a12_5.index = 0;
				$.k2l.m8a12_5.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m8a12_5.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m8a12_5.wrongcount++;
			if ($.k2l.m8a12_5.wrongcount >= 1) {
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
		$.k2l.m8a12_5.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m8a12_5.index).html($.k2l.m8a12_5.correctAnswers[$.k2l.m8a12_5.index]);
		$('#entryanswer'+$.k2l.m8a12_5.index).html($.k2l.m8a12_5.displayAnswers[$.k2l.m8a12_5.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m8a12_5.index).addClass('correctword');
		
		if ($.k2l.m8a12_5.index < $.k2l.m8a12_5.correctAnswers.length - 1) {
			$.k2l.m8a12_5.index++;
			$('#entryanswer'+$.k2l.m8a12_5.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m8a12_5.index).html('<form class="textentry"><input type="text" name="userText" size="9" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m8a12_5.index = 0;
			$.k2l.m8a12_5.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m8a12_5.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},
	
	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m8a12_5.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a12_5.sound, $(evt.currentTarget));
	},

	"click .pagination": function(evt){
		$.k2l.m8a12_5.index = 0;
		$.k2l.m8a12_5.wrongcount = 0;
		$.k2l.m8a12_5.sound.src = {};
	}
	
});

Template.m8a12_5.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a12_5 == 'undefined') {
		$.k2l.m8a12_5 = {};
	};
	
	$.k2l.m8a12_5.sound = new Audio();
	$.k2l.m8a12_5.index = 0;
	$.k2l.m8a12_5.wrongcount = 0;
	 $.k2l.m8a12_5.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
			["'d realised", "had realised"], // Possible answers for Q1.
			["'d have", "would have", "would've", "'d've"]
		];
		
		 var displayAnswers = [
			["'d realised"], // Possible answers for Q1.
			["'d have"]
		]; 
		
	$.k2l.m8a12_5.displayAnswers = displayAnswers; 
	$.k2l.m8a12_5.correctAnswers = correctAnswers;
	
}

Template.m8a12_6.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a12_6"); 
	} 
}); 
 
Template.m8a12_6.events({
	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m8a12_6.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a12_6.sound, $(evt.currentTarget));
	},

	"click .pagination": function(evt){
		$.k2l.m8a12_6.index = 0;
		$.k2l.m8a12_6.wrongcount = 0;
		$.k2l.m8a12_6.sound.src = {};
	}
	
});

Template.m8a12_6.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a12_6 == 'undefined') {
		$.k2l.m8a12_6 = {};
	};
	
	$.k2l.m8a12_6.sound = new Audio();
	
}

Template.m8a12_7.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a12_7"); 
	} 
}); 
 
Template.m8a12_7.events({
	
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
		
		for (var i = 0; i < $.k2l.m8a12_7.correctAnswers[$.k2l.m8a12_7.index].length; i++) {
			if (userText == $.k2l.m8a12_7.correctAnswers[$.k2l.m8a12_7.index][i]){ 
				isCorrect = true;
				 $.k2l.m8a12_7.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m8a12_7.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			//$(evt.currentTarget).parent().html($.k2l.m8a12_7.correctAnswers[$.k2l.m8a12_7.index]);
			$(evt.currentTarget).parent().html($.k2l.m8a12_7.displayAnswers[$.k2l.m8a12_7.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m8a12_7.index).addClass('correctword');
			
			if ($.k2l.m8a12_7.index < $.k2l.m8a12_7.correctAnswers.length - 1) {
				$.k2l.m8a12_7.index++;
				$('#entryanswer'+$.k2l.m8a12_7.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m8a12_7.index).html('<form class="textentry"><input type="text" name="userText" size="9" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m8a12_7.index = 0;
				$.k2l.m8a12_7.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m8a12_7.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m8a12_7.wrongcount++;
			if ($.k2l.m8a12_7.wrongcount >= 1) {
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
		$.k2l.m8a12_7.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m8a12_7.index).html($.k2l.m8a12_7.correctAnswers[$.k2l.m8a12_7.index]);
		$('#entryanswer'+$.k2l.m8a12_7.index).html($.k2l.m8a12_7.displayAnswers[$.k2l.m8a12_7.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m8a12_7.index).addClass('correctword');
		
		if ($.k2l.m8a12_7.index < $.k2l.m8a12_7.correctAnswers.length - 1) {
			$.k2l.m8a12_7.index++;
			$('#entryanswer'+$.k2l.m8a12_7.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m8a12_7.index).html('<form class="textentry"><input type="text" name="userText" size="9" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m8a12_7.index = 0;
			$.k2l.m8a12_7.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m8a12_7.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},
	
	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m8a12_7.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a12_7.sound, $(evt.currentTarget));
	},

	"click .pagination": function(evt){
		$.k2l.m8a12_7.index = 0;
		$.k2l.m8a12_7.wrongcount = 0;
		$.k2l.m8a12_7.sound.src = {};
	}
	
});

Template.m8a12_7.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a12_7 == 'undefined') {
		$.k2l.m8a12_7 = {};
	};
	
	$.k2l.m8a12_7.sound = new Audio();
	$.k2l.m8a12_7.index = 0;
	$.k2l.m8a12_7.wrongcount = 0;
	 $.k2l.m8a12_7.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
			["thought"], // Possible answers for Q1.
			["'d be", "would be"]
		];
		
		 var displayAnswers = [
			["thought"], // Possible answers for Q1.
			["would be"]
		]; 
		
	$.k2l.m8a12_7.displayAnswers = displayAnswers; 
	$.k2l.m8a12_7.correctAnswers = correctAnswers;
	
}

Template.m8a12_8.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a12_8"); 
	} 
}); 
 
Template.m8a12_8.events({
	
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
		
		for (var i = 0; i < $.k2l.m8a12_8.correctAnswers[$.k2l.m8a12_8.index].length; i++) {
			if (userText == $.k2l.m8a12_8.correctAnswers[$.k2l.m8a12_8.index][i]){ 
				isCorrect = true;
				 $.k2l.m8a12_8.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m8a12_8.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			//$(evt.currentTarget).parent().html($.k2l.m8a12_8.correctAnswers[$.k2l.m8a12_8.index]);
			$(evt.currentTarget).parent().html($.k2l.m8a12_8.displayAnswers[$.k2l.m8a12_8.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m8a12_8.index).addClass('correctword');
			
			if ($.k2l.m8a12_8.index < $.k2l.m8a12_8.correctAnswers.length - 1) {
				$.k2l.m8a12_8.index++;
				$('#entryanswer'+$.k2l.m8a12_8.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m8a12_8.index).html('<form class="textentry"><input type="text" name="userText" size="9" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m8a12_8.index = 0;
				$.k2l.m8a12_8.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m8a12_8.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m8a12_8.wrongcount++;
			if ($.k2l.m8a12_8.wrongcount >= 1) {
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
		$.k2l.m8a12_8.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m8a12_8.index).html($.k2l.m8a12_8.correctAnswers[$.k2l.m8a12_8.index]);
		$('#entryanswer'+$.k2l.m8a12_8.index).html($.k2l.m8a12_8.displayAnswers[$.k2l.m8a12_8.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m8a12_8.index).addClass('correctword');
		
		if ($.k2l.m8a12_8.index < $.k2l.m8a12_8.correctAnswers.length - 1) {
			$.k2l.m8a12_8.index++;
			$('#entryanswer'+$.k2l.m8a12_8.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m8a12_8.index).html('<form class="textentry"><input type="text" name="userText" size="9" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m8a12_8.index = 0;
			$.k2l.m8a12_8.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m8a12_8.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},
	
	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m8a12_8.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a12_8.sound, $(evt.currentTarget));
	},

	"click .pagination": function(evt){
		$.k2l.m8a12_8.index = 0;
		$.k2l.m8a12_8.wrongcount = 0;
		$.k2l.m8a12_8.sound.src = {};
	}
	
});

Template.m8a12_8.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a12_8 == 'undefined') {
		$.k2l.m8a12_8 = {};
	};
	
	$.k2l.m8a12_8.sound = new Audio();
	$.k2l.m8a12_8.index = 0;
	$.k2l.m8a12_8.wrongcount = 0;
	 $.k2l.m8a12_8.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
			["would have been", "would've been", "'d have been", "'d've been"], // Possible answers for Q1.
			["had told"]
		];
		
		 var displayAnswers = [
			["would have been"], // Possible answers for Q1.
			["had told"]
		]; 
		
	$.k2l.m8a12_8.displayAnswers = displayAnswers; 
	$.k2l.m8a12_8.correctAnswers = correctAnswers;
	
}

Template.m8a12_9.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a12_9"); 
	} 
}); 
 
Template.m8a12_9.events({
	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m8a12_9.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a12_9.sound, $(evt.currentTarget));
	},

	"click .pagination": function(evt){
		$.k2l.m8a12_9.index = 0;
		$.k2l.m8a12_9.wrongcount = 0;
		$.k2l.m8a12_9.sound.src = {};
	}
	
});

Template.m8a12_9.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a12_9 == 'undefined') {
		$.k2l.m8a12_9 = {};
	};
	
	$.k2l.m8a12_9.sound = new Audio();
	
}


Template.m8a12.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 12, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a12.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

