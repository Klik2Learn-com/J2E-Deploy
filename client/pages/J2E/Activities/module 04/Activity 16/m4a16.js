Template.m4a16.helpers({
endPageSect: function() {
var session = Session.get('activeSection');
if (session == '#m4a16_end') {
 	return false;
	}
return true;
},

	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m4a16");
	}
})

Template.m4a16.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m4a16.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m4a16.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m4a16.sound.src = {};
	}

});

Template.m4a16.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(4, 16);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 16, subpage);
			oldLocation = location.href;
		}
	}, 500);


	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m4a16 == 'undefined') {
		$.k2l.m4a16 = {};
	};
	
	$.k2l.m4a16.sound = new Audio();
}

Template.m4a16.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 16, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a16.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m4a16_2.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a16_2");
	}
});

Template.m4a16_2.events({
	
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
		
		for (var i = 0; i < $.k2l.m4a16_2.correctAnswers[$.k2l.m4a16_2.index].length; i++) {
			if (userText == $.k2l.m4a16_2.correctAnswers[$.k2l.m4a16_2.index][i]){ 
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
			$.k2l.m4a16_2.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			// $(evt.currentTarget).parent().html($.k2l.m4a16_2.correctAnswers[$.k2l.m4a16_2.index]);
			$(evt.currentTarget).parent().html($.k2l.m4a16_2.displayAnswers[$.k2l.m4a16_2.index]);
			$('#entryanswer'+$.k2l.m4a16_2.index).addClass('correctword');
			
			if ($.k2l.m4a16_2.index < $.k2l.m4a16_2.correctAnswers.length - 1) {
				$.k2l.m4a16_2.index++;
				$('#entryanswer'+$.k2l.m4a16_2.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m4a16_2.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m4a16_2.index = 0;
				$.k2l.m4a16_2.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m4a16.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m4a16_2.wrongcount++;
			if ($.k2l.m4a16_2.wrongcount >= 1) {
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
		$.k2l.m4a16_2.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m4a16_2.index).html($.k2l.m4a16_2.correctAnswers[$.k2l.m4a16_2.index]); //
		$('#entryanswer'+$.k2l.m4a16_2.index).html($.k2l.m4a16_2.displayAnswers[$.k2l.m4a16_2.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m4a16_2.index).addClass('correctword');
		
		if ($.k2l.m4a16_2.index < $.k2l.m4a16_2.correctAnswers.length - 1) {
			$.k2l.m4a16_2.index++;
			$('#entryanswer'+$.k2l.m4a16_2.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m4a16_2.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m4a16_2.index = 0;
			$.k2l.m4a16_2.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m4a16.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},
	
	"click .pagination": function(evt){
		$.k2l.m4a16_2.index = 0;
		$.k2l.m4a16_2.wrongcount = 0;
	}
	
});

Template.m4a16_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m4a16_2 == 'undefined') {
		$.k2l.m4a16_2 = {};
	};
	
	$.k2l.m4a16_2.index = 0;
	$.k2l.m4a16_2.wrongcount = 0;
	
	var correctAnswers = [
			["best", "hottest", "mildest"],
			["more"],
			["most"]
		];
		
		var displayAnswers = [
			["best/hottest/mildest"],
			["more"],
			["most"]
		]; 
		
	$.k2l.m4a16_2.displayAnswers = displayAnswers;
	$.k2l.m4a16_2.correctAnswers = correctAnswers;
	
}

Template.m4a16_4.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a16_4");
	}
});

Template.m4a16_4.events({
	
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
		
		for (var i = 0; i < $.k2l.m4a16_4.correctAnswers[$.k2l.m4a16_4.index].length; i++) {
			if (userText == $.k2l.m4a16_4.correctAnswers[$.k2l.m4a16_4.index][i]){ 
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
			$.k2l.m4a16_4.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			// $(evt.currentTarget).parent().html($.k2l.m4a16_4.correctAnswers[$.k2l.m4a16_4.index]);
			$(evt.currentTarget).parent().html($.k2l.m4a16_4.displayAnswers[$.k2l.m4a16_4.index]);
			$('#entryanswer'+$.k2l.m4a16_4.index).addClass('correctword');
			
			if ($.k2l.m4a16_4.index < $.k2l.m4a16_4.correctAnswers.length - 1) {
				$.k2l.m4a16_4.index++;
				$('#entryanswer'+$.k2l.m4a16_4.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m4a16_4.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m4a16_4.index = 0;
				$.k2l.m4a16_4.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m4a16.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m4a16_4.wrongcount++;
			if ($.k2l.m4a16_4.wrongcount >= 1) {
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
		$.k2l.m4a16_4.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m4a16_4.index).html($.k2l.m4a16_4.correctAnswers[$.k2l.m4a16_4.index]); //
		$('#entryanswer'+$.k2l.m4a16_4.index).html($.k2l.m4a16_4.displayAnswers[$.k2l.m4a16_4.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m4a16_4.index).addClass('correctword');
		
		if ($.k2l.m4a16_4.index < $.k2l.m4a16_4.correctAnswers.length - 1) {
			$.k2l.m4a16_4.index++;
			$('#entryanswer'+$.k2l.m4a16_4.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m4a16_4.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m4a16_4.index = 0;
			$.k2l.m4a16_4.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m4a16.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},
	
	"click .pagination": function(evt){
		$.k2l.m4a16_4.index = 0;
		$.k2l.m4a16_4.wrongcount = 0;
	}
	
});

Template.m4a16_4.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m4a16_4 == 'undefined') {
		$.k2l.m4a16_4 = {};
	};
	
	$.k2l.m4a16_4.index = 0;
	$.k2l.m4a16_4.wrongcount = 0;
	
	var correctAnswers = [
			["better"],
			["busier"],
			["hottest"],
			["mildest"]
		];
		
		var displayAnswers = [
			["better"],
			["busier"],
			["hottest"],
			["mildest"]
		]; 
		
	$.k2l.m4a16_4.displayAnswers = displayAnswers;
	$.k2l.m4a16_4.correctAnswers = correctAnswers;
	
}

Template.m4a16_5.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a16_5");
	}
});

Template.m4a16_5.events({
	
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
		
		for (var i = 0; i < $.k2l.m4a16_5.correctAnswers[$.k2l.m4a16_5.index].length; i++) {
			if (userText == $.k2l.m4a16_5.correctAnswers[$.k2l.m4a16_5.index][i]){ 
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
			$.k2l.m4a16_5.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			// $(evt.currentTarget).parent().html($.k2l.m4a16_5.correctAnswers[$.k2l.m4a16_5.index]);
			$(evt.currentTarget).parent().html($.k2l.m4a16_5.displayAnswers[$.k2l.m4a16_5.index]);
			$('#entryanswer'+$.k2l.m4a16_5.index).addClass('correctword');
			
			if ($.k2l.m4a16_5.index < $.k2l.m4a16_5.correctAnswers.length - 1) {
				$.k2l.m4a16_5.index++;
				$('#entryanswer'+$.k2l.m4a16_5.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m4a16_5.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m4a16_5.index = 0;
				$.k2l.m4a16_5.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m4a16.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m4a16_5.wrongcount++;
			if ($.k2l.m4a16_5.wrongcount >= 1) {
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
		$.k2l.m4a16_5.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m4a16_5.index).html($.k2l.m4a16_5.correctAnswers[$.k2l.m4a16_5.index]); //
		$('#entryanswer'+$.k2l.m4a16_5.index).html($.k2l.m4a16_5.displayAnswers[$.k2l.m4a16_5.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m4a16_5.index).addClass('correctword');
		
		if ($.k2l.m4a16_5.index < $.k2l.m4a16_5.correctAnswers.length - 1) {
			$.k2l.m4a16_5.index++;
			$('#entryanswer'+$.k2l.m4a16_5.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m4a16_5.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m4a16_5.index = 0;
			$.k2l.m4a16_5.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m4a16.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},
	
	"click .pagination": function(evt){
		$.k2l.m4a16_5.index = 0;
		$.k2l.m4a16_5.wrongcount = 0;
	}
	
});

Template.m4a16_5.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m4a16_5 == 'undefined') {
		$.k2l.m4a16_5 = {};
	};
	
	$.k2l.m4a16_5.index = 0;
	$.k2l.m4a16_5.wrongcount = 0;
	
	var correctAnswers = [
			["driest"],
			["biggest"],
			["strongest"],
			["better"]
		];
		
		var displayAnswers = [
			["driest"],
			["biggest"],
			["strongest"],
			["better"]
		]; 
		
	$.k2l.m4a16_5.displayAnswers = displayAnswers;
	$.k2l.m4a16_5.correctAnswers = correctAnswers;
	
}
