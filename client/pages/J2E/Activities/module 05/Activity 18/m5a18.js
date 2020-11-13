Template.m5a18.helpers({
endPageSect: function() {
var session = Session.get('activeSection');
if (session == '#m5a18_end') {
 	return false;
	}
return true;
},

	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m5a18");
	}
})

Template.m5a18.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m5a18.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m5a18.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m5a18.sound.src = {};
	}

});

Template.m5a18.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(5, 18);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(5, 18, subpage);
			oldLocation = location.href;
		}
	}, 500);


	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m5a18 == 'undefined') {
		$.k2l.m5a18 = {};
	};
	
	$.k2l.m5a18.sound = new Audio();
}

Template.m5a18.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 5, 18, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m5a18.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m5a18_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a18_1");
	}
});

Template.m5a18_2.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a18_2");
	}
});

Template.m5a18_2.events({
	
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
		
		for (var i = 0; i < $.k2l.m5a18_2.correctAnswers[$.k2l.m5a18_2.index].length; i++) {
			if (userText == $.k2l.m5a18_2.correctAnswers[$.k2l.m5a18_2.index][i]){ 
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
			$.k2l.m5a18_2.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			// $(evt.currentTarget).parent().html($.k2l.m5a18_2.correctAnswers[$.k2l.m5a18_2.index]);
			$(evt.currentTarget).parent().html($.k2l.m5a18_2.displayAnswers[$.k2l.m5a18_2.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m5a18_2.index).addClass('correctword');
			
			if ($.k2l.m5a18_2.index < $.k2l.m5a18_2.correctAnswers.length - 1) {
				$.k2l.m5a18_2.index++;
				$('#entryanswer'+$.k2l.m5a18_2.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m5a18_2.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m5a18_2.index = 0;
				$.k2l.m5a18_2.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m5a18.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m5a18_2.wrongcount++;
			if ($.k2l.m5a18_2.wrongcount >= 1) {
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
		$.k2l.m5a18_2.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m5a18_2.index).html($.k2l.m5a18_2.correctAnswers[$.k2l.m5a18_2.index]);
		$('#entryanswer'+$.k2l.m5a18_2.index).html($.k2l.m5a18_2.displayAnswers[$.k2l.m5a18_2.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m5a18_2.index).addClass('correctword');
		
		if ($.k2l.m5a18_2.index < $.k2l.m5a18_2.correctAnswers.length - 1) {
			$.k2l.m5a18_2.index++;
			$('#entryanswer'+$.k2l.m5a18_2.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m5a18_2.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m5a18_2.index = 0;
			$.k2l.m5a18_2.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m5a18.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},
	
	"click .pagination": function(evt){
		$.k2l.m5a18_2.index = 0;
		$.k2l.m5a18_2.wrongcount = 0;
	}
	
});

Template.m5a18_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m5a18_2 == 'undefined') {
		$.k2l.m5a18_2 = {};
	};
	
	$.k2l.m5a18_2.index = 0;
	$.k2l.m5a18_2.wrongcount = 0;
	
	var correctAnswers = [
			["would"]
		];
		
		var displayAnswers = [
			["would"]
		]; 
		
	$.k2l.m5a18_2.displayAnswers = displayAnswers;
	$.k2l.m5a18_2.correctAnswers = correctAnswers;
	
}

Template.m5a18_3.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a18_3");
	}
});

Template.m5a18_3.events({
	
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
		
		for (var i = 0; i < $.k2l.m5a18_3.correctAnswers[$.k2l.m5a18_3.index].length; i++) {
			if (userText == $.k2l.m5a18_3.correctAnswers[$.k2l.m5a18_3.index][i]){ 
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
			$.k2l.m5a18_3.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			// $(evt.currentTarget).parent().html($.k2l.m5a18_3.correctAnswers[$.k2l.m5a18_3.index]);
			$(evt.currentTarget).parent().html($.k2l.m5a18_3.displayAnswers[$.k2l.m5a18_3.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m5a18_3.index).addClass('correctword');
			
			if ($.k2l.m5a18_3.index < $.k2l.m5a18_3.correctAnswers.length - 1) {
				$.k2l.m5a18_3.index++;
				$('#entryanswer'+$.k2l.m5a18_3.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m5a18_3.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m5a18_3.index = 0;
				$.k2l.m5a18_3.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m5a18.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m5a18_3.wrongcount++;
			if ($.k2l.m5a18_3.wrongcount >= 1) {
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
		$.k2l.m5a18_3.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m5a18_3.index).html($.k2l.m5a18_3.correctAnswers[$.k2l.m5a18_3.index]);
		$('#entryanswer'+$.k2l.m5a18_3.index).html($.k2l.m5a18_3.displayAnswers[$.k2l.m5a18_3.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m5a18_3.index).addClass('correctword');
		
		if ($.k2l.m5a18_3.index < $.k2l.m5a18_3.correctAnswers.length - 1) {
			$.k2l.m5a18_3.index++;
			$('#entryanswer'+$.k2l.m5a18_3.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m5a18_3.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m5a18_3.index = 0;
			$.k2l.m5a18_3.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m5a18.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},
	
	"click .pagination": function(evt){
		$.k2l.m5a18_3.index = 0;
		$.k2l.m5a18_3.wrongcount = 0;
	}
	
});

Template.m5a18_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m5a18_3 == 'undefined') {
		$.k2l.m5a18_3 = {};
	};
	
	$.k2l.m5a18_3.index = 0;
	$.k2l.m5a18_3.wrongcount = 0;
	
	var correctAnswers = [
			["'d", "d", "would"]
		];
		
		var displayAnswers = [
			["'d / I would"]
		]; 
		
	$.k2l.m5a18_3.displayAnswers = displayAnswers;
	$.k2l.m5a18_3.correctAnswers = correctAnswers;
	
}

Template.m5a18_4.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a18_4");
	}
});

Template.m5a18_4.events({
	
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
		
		for (var i = 0; i < $.k2l.m5a18_4.correctAnswers[$.k2l.m5a18_4.index].length; i++) {
			if (userText == $.k2l.m5a18_4.correctAnswers[$.k2l.m5a18_4.index][i]){ 
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
			$.k2l.m5a18_4.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			// $(evt.currentTarget).parent().html($.k2l.m5a18_4.correctAnswers[$.k2l.m5a18_4.index]);
			$(evt.currentTarget).parent().html($.k2l.m5a18_4.displayAnswers[$.k2l.m5a18_4.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m5a18_4.index).addClass('correctword');
			
			if ($.k2l.m5a18_4.index < $.k2l.m5a18_4.correctAnswers.length - 1) {
				$.k2l.m5a18_4.index++;
				$('#entryanswer'+$.k2l.m5a18_4.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m5a18_4.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m5a18_4.index = 0;
				$.k2l.m5a18_4.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m5a18.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m5a18_4.wrongcount++;
			if ($.k2l.m5a18_4.wrongcount >= 1) {
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
		$.k2l.m5a18_4.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m5a18_4.index).html($.k2l.m5a18_4.correctAnswers[$.k2l.m5a18_4.index]);
		$('#entryanswer'+$.k2l.m5a18_4.index).html($.k2l.m5a18_4.displayAnswers[$.k2l.m5a18_4.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m5a18_4.index).addClass('correctword');
		
		if ($.k2l.m5a18_4.index < $.k2l.m5a18_4.correctAnswers.length - 1) {
			$.k2l.m5a18_4.index++;
			$('#entryanswer'+$.k2l.m5a18_4.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m5a18_4.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m5a18_4.index = 0;
			$.k2l.m5a18_4.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m5a18.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},
	
	"click .pagination": function(evt){
		$.k2l.m5a18_4.index = 0;
		$.k2l.m5a18_4.wrongcount = 0;
	}
	
});

Template.m5a18_4.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m5a18_4 == 'undefined') {
		$.k2l.m5a18_4 = {};
	};
	
	$.k2l.m5a18_4.index = 0;
	$.k2l.m5a18_4.wrongcount = 0;
	
	var correctAnswers = [
			["'d", "d", "would"]
		];
		
		var displayAnswers = [
			["'d / I would"]
		]; 
		
	$.k2l.m5a18_4.displayAnswers = displayAnswers;
	$.k2l.m5a18_4.correctAnswers = correctAnswers;
	
}

Template.m5a18_5.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a18_5");
	}
});

Template.m5a18_5.events({
	
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
		
		for (var i = 0; i < $.k2l.m5a18_5.correctAnswers[$.k2l.m5a18_5.index].length; i++) {
			if (userText == $.k2l.m5a18_5.correctAnswers[$.k2l.m5a18_5.index][i]){ 
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
			$.k2l.m5a18_5.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			// $(evt.currentTarget).parent().html($.k2l.m5a18_5.correctAnswers[$.k2l.m5a18_5.index]);
			$(evt.currentTarget).parent().html($.k2l.m5a18_5.displayAnswers[$.k2l.m5a18_5.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m5a18_5.index).addClass('correctword');
			
			if ($.k2l.m5a18_5.index < $.k2l.m5a18_5.correctAnswers.length - 1) {
				$.k2l.m5a18_5.index++;
				$('#entryanswer'+$.k2l.m5a18_5.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m5a18_5.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m5a18_5.index = 0;
				$.k2l.m5a18_5.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m5a18.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m5a18_5.wrongcount++;
			if ($.k2l.m5a18_5.wrongcount >= 1) {
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
		$.k2l.m5a18_5.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m5a18_5.index).html($.k2l.m5a18_5.correctAnswers[$.k2l.m5a18_5.index]);
		$('#entryanswer'+$.k2l.m5a18_5.index).html($.k2l.m5a18_5.displayAnswers[$.k2l.m5a18_5.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m5a18_5.index).addClass('correctword');
		
		if ($.k2l.m5a18_5.index < $.k2l.m5a18_5.correctAnswers.length - 1) {
			$.k2l.m5a18_5.index++;
			$('#entryanswer'+$.k2l.m5a18_5.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m5a18_5.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m5a18_5.index = 0;
			$.k2l.m5a18_5.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m5a18.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},
	
	"click .pagination": function(evt){
		$.k2l.m5a18_5.index = 0;
		$.k2l.m5a18_5.wrongcount = 0;
	}
	
});

Template.m5a18_5.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m5a18_5 == 'undefined') {
		$.k2l.m5a18_5 = {};
	};
	
	$.k2l.m5a18_5.index = 0;
	$.k2l.m5a18_5.wrongcount = 0;
	
	var correctAnswers = [
			["would"],
			["would"]
		];
		
		var displayAnswers = [
			["Would"],
			["would"]
		]; 
		
	$.k2l.m5a18_5.displayAnswers = displayAnswers;
	$.k2l.m5a18_5.correctAnswers = correctAnswers;
	
}

Template.m5a18_6.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a18_6");
	}
});

Template.m5a18_6.events({
	
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
		
		for (var i = 0; i < $.k2l.m5a18_6.correctAnswers[$.k2l.m5a18_6.index].length; i++) {
			if (userText == $.k2l.m5a18_6.correctAnswers[$.k2l.m5a18_6.index][i]){ 
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
			$.k2l.m5a18_6.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			// $(evt.currentTarget).parent().html($.k2l.m5a18_6.correctAnswers[$.k2l.m5a18_6.index]);
			$(evt.currentTarget).parent().html($.k2l.m5a18_6.displayAnswers[$.k2l.m5a18_6.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m5a18_6.index).addClass('correctword');
			
			if ($.k2l.m5a18_6.index < $.k2l.m5a18_6.correctAnswers.length - 1) {
				$.k2l.m5a18_6.index++;
				$('#entryanswer'+$.k2l.m5a18_6.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m5a18_6.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m5a18_6.index = 0;
				$.k2l.m5a18_6.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m5a18.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m5a18_6.wrongcount++;
			if ($.k2l.m5a18_6.wrongcount >= 1) {
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
		$.k2l.m5a18_6.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m5a18_6.index).html($.k2l.m5a18_6.correctAnswers[$.k2l.m5a18_6.index]);
		$('#entryanswer'+$.k2l.m5a18_6.index).html($.k2l.m5a18_6.displayAnswers[$.k2l.m5a18_6.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m5a18_6.index).addClass('correctword');
		
		if ($.k2l.m5a18_6.index < $.k2l.m5a18_6.correctAnswers.length - 1) {
			$.k2l.m5a18_6.index++;
			$('#entryanswer'+$.k2l.m5a18_6.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m5a18_6.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m5a18_6.index = 0;
			$.k2l.m5a18_6.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m5a18.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},
	
	"click .pagination": function(evt){
		$.k2l.m5a18_6.index = 0;
		$.k2l.m5a18_6.wrongcount = 0;
	}
	
});

Template.m5a18_6.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m5a18_6 == 'undefined') {
		$.k2l.m5a18_6 = {};
	};
	
	$.k2l.m5a18_6.index = 0;
	$.k2l.m5a18_6.wrongcount = 0;
	
	var correctAnswers = [
			["won't", "wont", "will not"]
		];
		
		var displayAnswers = [
			["won't / will not"]
		]; 
		
	$.k2l.m5a18_6.displayAnswers = displayAnswers;
	$.k2l.m5a18_6.correctAnswers = correctAnswers;
	
}

Template.m5a18_7.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a18_7");
	}
});

Template.m5a18_7.events({
	
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
		
		for (var i = 0; i < $.k2l.m5a18_7.correctAnswers[$.k2l.m5a18_7.index].length; i++) {
			if (userText == $.k2l.m5a18_7.correctAnswers[$.k2l.m5a18_7.index][i]){ 
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
			$.k2l.m5a18_7.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			// $(evt.currentTarget).parent().html($.k2l.m5a18_7.correctAnswers[$.k2l.m5a18_7.index]);
			$(evt.currentTarget).parent().html($.k2l.m5a18_7.displayAnswers[$.k2l.m5a18_7.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m5a18_7.index).addClass('correctword');
			
			if ($.k2l.m5a18_7.index < $.k2l.m5a18_7.correctAnswers.length - 1) {
				$.k2l.m5a18_7.index++;
				$('#entryanswer'+$.k2l.m5a18_7.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m5a18_7.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m5a18_7.index = 0;
				$.k2l.m5a18_7.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m5a18.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m5a18_7.wrongcount++;
			if ($.k2l.m5a18_7.wrongcount >= 1) {
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
		$.k2l.m5a18_7.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m5a18_7.index).html($.k2l.m5a18_7.correctAnswers[$.k2l.m5a18_7.index]);
		$('#entryanswer'+$.k2l.m5a18_7.index).html($.k2l.m5a18_7.displayAnswers[$.k2l.m5a18_7.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m5a18_7.index).addClass('correctword');
		
		if ($.k2l.m5a18_7.index < $.k2l.m5a18_7.correctAnswers.length - 1) {
			$.k2l.m5a18_7.index++;
			$('#entryanswer'+$.k2l.m5a18_7.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m5a18_7.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m5a18_7.index = 0;
			$.k2l.m5a18_7.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m5a18.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},
	
	"click .pagination": function(evt){
		$.k2l.m5a18_7.index = 0;
		$.k2l.m5a18_7.wrongcount = 0;
	}
	
});

Template.m5a18_7.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m5a18_7 == 'undefined') {
		$.k2l.m5a18_7 = {};
	};
	
	$.k2l.m5a18_7.index = 0;
	$.k2l.m5a18_7.wrongcount = 0;
	
	var correctAnswers = [
			["will"]
		];
		
		var displayAnswers = [
			["will"]
		]; 
		
	$.k2l.m5a18_7.displayAnswers = displayAnswers;
	$.k2l.m5a18_7.correctAnswers = correctAnswers;
	
}

Template.m5a18_8.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a18_8");
	}
});

Template.m5a18_8.events({
	
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
		
		for (var i = 0; i < $.k2l.m5a18_8.correctAnswers[$.k2l.m5a18_8.index].length; i++) {
			if (userText == $.k2l.m5a18_8.correctAnswers[$.k2l.m5a18_8.index][i]){ 
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
			$.k2l.m5a18_8.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			// $(evt.currentTarget).parent().html($.k2l.m5a18_8.correctAnswers[$.k2l.m5a18_8.index]);
			$(evt.currentTarget).parent().html($.k2l.m5a18_8.displayAnswers[$.k2l.m5a18_8.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m5a18_8.index).addClass('correctword');
			
			if ($.k2l.m5a18_8.index < $.k2l.m5a18_8.correctAnswers.length - 1) {
				$.k2l.m5a18_8.index++;
				$('#entryanswer'+$.k2l.m5a18_8.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m5a18_8.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m5a18_8.index = 0;
				$.k2l.m5a18_8.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m5a18.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m5a18_8.wrongcount++;
			if ($.k2l.m5a18_8.wrongcount >= 1) {
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
		$.k2l.m5a18_8.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m5a18_8.index).html($.k2l.m5a18_8.correctAnswers[$.k2l.m5a18_8.index]);
		$('#entryanswer'+$.k2l.m5a18_8.index).html($.k2l.m5a18_8.displayAnswers[$.k2l.m5a18_8.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m5a18_8.index).addClass('correctword');
		
		if ($.k2l.m5a18_8.index < $.k2l.m5a18_8.correctAnswers.length - 1) {
			$.k2l.m5a18_8.index++;
			$('#entryanswer'+$.k2l.m5a18_8.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m5a18_8.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m5a18_8.index = 0;
			$.k2l.m5a18_8.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m5a18.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},
	
	"click .pagination": function(evt){
		$.k2l.m5a18_8.index = 0;
		$.k2l.m5a18_8.wrongcount = 0;
	}
	
});

Template.m5a18_8.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m5a18_8 == 'undefined') {
		$.k2l.m5a18_8 = {};
	};
	
	$.k2l.m5a18_8.index = 0;
	$.k2l.m5a18_8.wrongcount = 0;
	
	var correctAnswers = [
			["won't", "wont"]
		];
		
		var displayAnswers = [
			["won't"]
		]; 
		
	$.k2l.m5a18_8.displayAnswers = displayAnswers;
	$.k2l.m5a18_8.correctAnswers = correctAnswers;
	
}
