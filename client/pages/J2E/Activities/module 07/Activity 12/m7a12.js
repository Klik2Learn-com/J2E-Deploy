Template.m7a12.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m7a12_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m7a12.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(7, 12);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(7, 12, subpage);
			oldLocation = location.href;
		}
	}, 500);

}
Template.m7a12_2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a12_2");
	}
});

Template.m7a12_2.events({
	
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
		
		for (var i = 0; i < $.k2l.m7a12_2.correctAnswers[$.k2l.m7a12_2.index].length; i++) {
			if (userText == $.k2l.m7a12_2.correctAnswers[$.k2l.m7a12_2.index][i]){ 
				isCorrect = true;
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
			$.k2l.m7a12_2.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m7a12_2.correctAnswers[$.k2l.m7a12_2.index]);
			// $(evt.currentTarget).parent().html($.k2l.m7a12_2.displayAnswers[$.k2l.m7a12_2.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m7a12_2.index).addClass('correctword');
			
			if ($.k2l.m7a12_2.index < $.k2l.m7a12_2.correctAnswers.length - 1) {
				$.k2l.m7a12_2.index++;
				$('#paraword').html($.k2l.m7a12_2.words[$.k2l.m7a12_2.index]);
				$('#wordlength').html($.k2l.m7a12_2.wordslength[$.k2l.m7a12_2.index]);
				$('#entryanswer'+$.k2l.m7a12_2.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m7a12_2.index).html('<form class="textentry"><input type="text" name="userText" size="15" placeholder="" autocomplete="off"><input type="submit" value="OK"></form>');
				$('input[name=userText]').attr("placeholder", $.k2l.m7a12_2.words[$.k2l.m7a12_2.index]);
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m7a12_2.index = 0;
				$.k2l.m7a12_2.wrongcount = 0;
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
			$.k2l.m7a12_2.wrongcount++;
			if ($.k2l.m7a12_2.wrongcount >= 1) {
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
		$.k2l.m7a12_2.wrongcount = 0;
		$('#entryanswer'+$.k2l.m7a12_2.index).html($.k2l.m7a12_2.correctAnswers[$.k2l.m7a12_2.index]);
		// $('#entryanswer'+$.k2l.m7a12_2.index).html($.k2l.m7a12_2.displayAnswers[$.k2l.m7a12_2.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m7a12_2.index).addClass('correctword');
		
		if ($.k2l.m7a12_2.index < $.k2l.m7a12_2.correctAnswers.length - 1) {
			$.k2l.m7a12_2.index++;
			$('#paraword').html($.k2l.m7a12_2.words[$.k2l.m7a12_2.index]);
				$('#wordlength').html($.k2l.m7a12_2.wordslength[$.k2l.m7a12_2.index]);
			$('#entryanswer'+$.k2l.m7a12_2.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m7a12_2.index).html('<form class="textentry"><input type="text" name="userText" size="15" autocomplete="off"><input type="submit" value="OK"></form>');
			$('input[name=userText]').attr("placeholder", $.k2l.m7a12_2.words[$.k2l.m7a12_2.index]);
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m7a12_2.index = 0;
			$.k2l.m7a12_2.wrongcount = 0;
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
		$.k2l.m7a12_2.index = 0;
		$.k2l.m7a12_2.wrongcount = 0;
	}
	
});

Template.m7a12_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a12_2 == 'undefined') {
		$.k2l.m7a12_2 = {};
	};
	
	$.k2l.m7a12_2.index = 0;
	$.k2l.m7a12_2.wrongcount = 0;
	
	var correctAnswers = [
			["was growing up"],
			["was exploring"],
			["was trekking"],
			["was waiting"]
		];

	var words = ["grow up",
				"explore",
				"trek",
				"wait"];

	var wordslength = ["3",
						"2",
						"2",
						"2"];
		
		/* var displayAnswers = [
			["double glazing"],
			["driveway"],
			["spacious"],
			["coverings"]
		]; 
		
	$.k2l.m7a12_2.displayAnswers = displayAnswers; */
	$.k2l.m7a12_2.correctAnswers = correctAnswers;
	$.k2l.m7a12_2.words = words;
	$.k2l.m7a12_2.wordslength = wordslength;
	
}

Template.m7a12_3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a12_3");
	}
});

Template.m7a12_3.events({
	
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
		
		for (var i = 0; i < $.k2l.m7a12_3.correctAnswers[$.k2l.m7a12_3.index].length; i++) {
			if (userText == $.k2l.m7a12_3.correctAnswers[$.k2l.m7a12_3.index][i]){ 
				isCorrect = true;
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
			$.k2l.m7a12_3.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m7a12_3.correctAnswers[$.k2l.m7a12_3.index]);
			// $(evt.currentTarget).parent().html($.k2l.m7a12_3.displayAnswers[$.k2l.m7a12_3.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m7a12_3.index).addClass('correctword');
			
			if ($.k2l.m7a12_3.index < $.k2l.m7a12_3.correctAnswers.length - 1) {
				$.k2l.m7a12_3.index++;
				$('#paraword').html($.k2l.m7a12_3.words[$.k2l.m7a12_3.index]);
				$('#wordlength').html($.k2l.m7a12_3.wordslength[$.k2l.m7a12_3.index]);
				$('#entryanswer'+$.k2l.m7a12_3.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m7a12_3.index).html('<form class="textentry"><input type="text" name="userText" size="15" placeholder="" autocomplete="off"><input type="submit" value="OK"></form>');
				$('input[name=userText]').attr("placeholder", $.k2l.m7a12_3.words[$.k2l.m7a12_3.index]);
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m7a12_3.index = 0;
				$.k2l.m7a12_3.wrongcount = 0;
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
			$.k2l.m7a12_3.wrongcount++;
			if ($.k2l.m7a12_3.wrongcount >= 1) {
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
		$.k2l.m7a12_3.wrongcount = 0;
		$('#entryanswer'+$.k2l.m7a12_3.index).html($.k2l.m7a12_3.correctAnswers[$.k2l.m7a12_3.index]);
		// $('#entryanswer'+$.k2l.m7a12_3.index).html($.k2l.m7a12_3.displayAnswers[$.k2l.m7a12_3.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m7a12_3.index).addClass('correctword');
		
		if ($.k2l.m7a12_3.index < $.k2l.m7a12_3.correctAnswers.length - 1) {
			$.k2l.m7a12_3.index++;
			$('#paraword').html($.k2l.m7a12_3.words[$.k2l.m7a12_3.index]);
				$('#wordlength').html($.k2l.m7a12_3.wordslength[$.k2l.m7a12_3.index]);
			$('#entryanswer'+$.k2l.m7a12_3.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m7a12_3.index).html('<form class="textentry"><input type="text" name="userText" size="15" autocomplete="off"><input type="submit" value="OK"></form>');
			$('input[name=userText]').attr("placeholder", $.k2l.m7a12_3.words[$.k2l.m7a12_3.index]);
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m7a12_3.index = 0;
			$.k2l.m7a12_3.wrongcount = 0;
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
		$.k2l.m7a12_3.index = 0;
		$.k2l.m7a12_3.wrongcount = 0;
	}
	
});

Template.m7a12_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a12_3 == 'undefined') {
		$.k2l.m7a12_3 = {};
	};
	
	$.k2l.m7a12_3.index = 0;
	$.k2l.m7a12_3.wrongcount = 0;
	
	var correctAnswers = [
			["were training"],
			["was training"]
		];

	var words = ["train",
				"train",];

	var wordslength = ["2",
						"2",];
		
		/* var displayAnswers = [
			["double glazing"],
			["driveway"],
			["spacious"],
			["coverings"]
		]; 
		
	$.k2l.m7a12_3.displayAnswers = displayAnswers; */
	$.k2l.m7a12_3.correctAnswers = correctAnswers;
	$.k2l.m7a12_3.words = words;
	$.k2l.m7a12_3.wordslength = wordslength;
	
}

Template.m7a12_4.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a12_4");
	}
});

Template.m7a12_4.events({
	
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
		
		for (var i = 0; i < $.k2l.m7a12_4.correctAnswers[$.k2l.m7a12_4.index].length; i++) {
			if (userText == $.k2l.m7a12_4.correctAnswers[$.k2l.m7a12_4.index][i]){ 
				isCorrect = true;
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
			$.k2l.m7a12_4.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m7a12_4.correctAnswers[$.k2l.m7a12_4.index]);
			// $(evt.currentTarget).parent().html($.k2l.m7a12_4.displayAnswers[$.k2l.m7a12_4.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m7a12_4.index).addClass('correctword');
			
			if ($.k2l.m7a12_4.index < $.k2l.m7a12_4.correctAnswers.length - 1) {
				$.k2l.m7a12_4.index++;
				$('#paraword').html($.k2l.m7a12_4.words[$.k2l.m7a12_4.index]);
				$('#wordlength').html($.k2l.m7a12_4.wordslength[$.k2l.m7a12_4.index]);
				$('#entryanswer'+$.k2l.m7a12_4.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m7a12_4.index).html('<form class="textentry"><input type="text" name="userText" size="15" placeholder="" autocomplete="off"><input type="submit" value="OK"></form>');
				$('input[name=userText]').attr("placeholder", $.k2l.m7a12_4.words[$.k2l.m7a12_4.index]);
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m7a12_4.index = 0;
				$.k2l.m7a12_4.wrongcount = 0;
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
			$.k2l.m7a12_4.wrongcount++;
			if ($.k2l.m7a12_4.wrongcount >= 1) {
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
		$.k2l.m7a12_4.wrongcount = 0;
		$('#entryanswer'+$.k2l.m7a12_4.index).html($.k2l.m7a12_4.correctAnswers[$.k2l.m7a12_4.index]);
		// $('#entryanswer'+$.k2l.m7a12_4.index).html($.k2l.m7a12_4.displayAnswers[$.k2l.m7a12_4.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m7a12_4.index).addClass('correctword');
		
		if ($.k2l.m7a12_4.index < $.k2l.m7a12_4.correctAnswers.length - 1) {
			$.k2l.m7a12_4.index++;
			$('#paraword').html($.k2l.m7a12_4.words[$.k2l.m7a12_4.index]);
				$('#wordlength').html($.k2l.m7a12_4.wordslength[$.k2l.m7a12_4.index]);
			$('#entryanswer'+$.k2l.m7a12_4.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m7a12_4.index).html('<form class="textentry"><input type="text" name="userText" size="15" autocomplete="off"><input type="submit" value="OK"></form>');
			$('input[name=userText]').attr("placeholder", $.k2l.m7a12_4.words[$.k2l.m7a12_4.index]);
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m7a12_4.index = 0;
			$.k2l.m7a12_4.wrongcount = 0;
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
		$.k2l.m7a12_4.index = 0;
		$.k2l.m7a12_4.wrongcount = 0;
	}
	
});

Template.m7a12_4.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a12_4 == 'undefined') {
		$.k2l.m7a12_4 = {};
	};
	
	$.k2l.m7a12_4.index = 0;
	$.k2l.m7a12_4.wrongcount = 0;
	
	var correctAnswers = [
			["was doing"],
			["was serving"],
			["was working"]
		];

	var words = ["do",
				"serve",
				"work"];

	var wordslength = ["2",
						"2",
						"2"];
		
		/* var displayAnswers = [
			["double glazing"],
			["driveway"],
			["spacious"],
			["coverings"]
		]; 
		
	$.k2l.m7a12_4.displayAnswers = displayAnswers; */
	$.k2l.m7a12_4.correctAnswers = correctAnswers;
	$.k2l.m7a12_4.words = words;
	$.k2l.m7a12_4.wordslength = wordslength;
	
}

Template.m7a12_5.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a12_5");
	}
});

Template.m7a12_5.events({
	
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
		
		for (var i = 0; i < $.k2l.m7a12_5.correctAnswers[$.k2l.m7a12_5.index].length; i++) {
			if (userText == $.k2l.m7a12_5.correctAnswers[$.k2l.m7a12_5.index][i]){ 
				isCorrect = true;
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
			$.k2l.m7a12_5.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m7a12_5.correctAnswers[$.k2l.m7a12_5.index]);
			// $(evt.currentTarget).parent().html($.k2l.m7a12_5.displayAnswers[$.k2l.m7a12_5.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m7a12_5.index).addClass('correctword');
			
			if ($.k2l.m7a12_5.index < $.k2l.m7a12_5.correctAnswers.length - 1) {
				$.k2l.m7a12_5.index++;
				$('#paraword').html($.k2l.m7a12_5.words[$.k2l.m7a12_5.index]);
				$('#wordlength').html($.k2l.m7a12_5.wordslength[$.k2l.m7a12_5.index]);
				$('#entryanswer'+$.k2l.m7a12_5.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m7a12_5.index).html('<form class="textentry"><input type="text" name="userText" size="15" placeholder="" autocomplete="off"><input type="submit" value="OK"></form>');
				$('input[name=userText]').attr("placeholder", $.k2l.m7a12_5.words[$.k2l.m7a12_5.index]);
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m7a12_5.index = 0;
				$.k2l.m7a12_5.wrongcount = 0;
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
			$.k2l.m7a12_5.wrongcount++;
			if ($.k2l.m7a12_5.wrongcount >= 1) {
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
		$.k2l.m7a12_5.wrongcount = 0;
		$('#entryanswer'+$.k2l.m7a12_5.index).html($.k2l.m7a12_5.correctAnswers[$.k2l.m7a12_5.index]);
		// $('#entryanswer'+$.k2l.m7a12_5.index).html($.k2l.m7a12_5.displayAnswers[$.k2l.m7a12_5.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m7a12_5.index).addClass('correctword');
		
		if ($.k2l.m7a12_5.index < $.k2l.m7a12_5.correctAnswers.length - 1) {
			$.k2l.m7a12_5.index++;
			$('#paraword').html($.k2l.m7a12_5.words[$.k2l.m7a12_5.index]);
				$('#wordlength').html($.k2l.m7a12_5.wordslength[$.k2l.m7a12_5.index]);
			$('#entryanswer'+$.k2l.m7a12_5.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m7a12_5.index).html('<form class="textentry"><input type="text" name="userText" size="15" autocomplete="off"><input type="submit" value="OK"></form>');
			$('input[name=userText]').attr("placeholder", $.k2l.m7a12_5.words[$.k2l.m7a12_5.index]);
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m7a12_5.index = 0;
			$.k2l.m7a12_5.wrongcount = 0;
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
		$.k2l.m7a12_5.index = 0;
		$.k2l.m7a12_5.wrongcount = 0;
	}
	
});

Template.m7a12_5.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a12_5 == 'undefined') {
		$.k2l.m7a12_5 = {};
	};
	
	$.k2l.m7a12_5.index = 0;
	$.k2l.m7a12_5.wrongcount = 0;
	
	var correctAnswers = [
			["was constantly uprooting"],
			["was always establishing"],
			["was pounding"],
			["was sweating"],
			["was going"],
			["was going"]
		];

	var words = ["constantly uproot",
				"always establish",
				"pound",
				"sweat",
				"go",
				"go"];

	var wordslength = ["3",
						"3",
						"2",
						"2",
						"2",
						"2"];
		
		/* var displayAnswers = [
			["double glazing"],
			["driveway"],
			["spacious"],
			["coverings"]
		]; 
		
	$.k2l.m7a12_5.displayAnswers = displayAnswers; */
	$.k2l.m7a12_5.correctAnswers = correctAnswers;
	$.k2l.m7a12_5.words = words;
	$.k2l.m7a12_5.wordslength = wordslength;
	
}


Template.m7a12.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 7, 12, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m7a12.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
