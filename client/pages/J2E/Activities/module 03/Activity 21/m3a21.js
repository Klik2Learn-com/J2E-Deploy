

Template.m3a21.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m3a21_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m3a21.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(3, 21);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(3, 21, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m3a21.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 3, 21, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m3a21.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m3a21_2.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a21_2");
	}
});

Template.m3a21_2.events({
	
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
		
		for (var i = 0; i < $.k2l.m3a21_2.correctAnswers[$.k2l.m3a21_2.index].length; i++) {
			if (userText == $.k2l.m3a21_2.correctAnswers[$.k2l.m3a21_2.index][i]){ 
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
			$.k2l.m3a21_2.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m3a21_2.correctAnswers[$.k2l.m3a21_2.index]);
			// $(evt.currentTarget).parent().html($.k2l.m3a21_2.displayAnswers[$.k2l.m3a21_2.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m3a21_2.index).addClass('correctword');
			
			if ($.k2l.m3a21_2.index < $.k2l.m3a21_2.correctAnswers.length - 1) {
				$.k2l.m3a21_2.index++;
				$('#entryanswer'+$.k2l.m3a21_2.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m3a21_2.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
$('input[name=userText]').focus();
} else {
				$.k2l.m3a21_2.index = 0;
				$.k2l.m3a21_2.wrongcount = 0;
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
			$.k2l.m3a21_2.wrongcount++;
			if ($.k2l.m3a21_2.wrongcount >= 1) {
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
		$.k2l.m3a21_2.wrongcount = 0;
		$('#entryanswer'+$.k2l.m3a21_2.index).html($.k2l.m3a21_2.correctAnswers[$.k2l.m3a21_2.index]);
		// $('#entryanswer'+$.k2l.m3a21_2.index).html($.k2l.m3a21_2.displayAnswers[$.k2l.m3a21_2.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m3a21_2.index).addClass('correctword');
		
		if ($.k2l.m3a21_2.index < $.k2l.m3a21_2.correctAnswers.length - 1) {
			$.k2l.m3a21_2.index++;
			$('#entryanswer'+$.k2l.m3a21_2.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m3a21_2.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
$('input[name=userText]').focus();
} else {
			$.k2l.m3a21_2.index = 0;
			$.k2l.m3a21_2.wrongcount = 0;
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
		$.k2l.m3a21_2.index = 0;
		$.k2l.m3a21_2.wrongcount = 0;
	}
	
});

Template.m3a21_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m3a21_2 == 'undefined') {
		$.k2l.m3a21_2 = {};
	};
	
	$.k2l.m3a21_2.index = 0;
	$.k2l.m3a21_2.wrongcount = 0;
	
	var correctAnswers = [
			["double glazing"],
			["driveway"],
			["spacious"],
			["coverings"]
		];
		
		/* var displayAnswers = [
			["double glazing"],
			["driveway"],
			["spacious"],
			["coverings"]
		]; 
		
	$.k2l.m3a21_2.displayAnswers = displayAnswers; */
	$.k2l.m3a21_2.correctAnswers = correctAnswers;
	
}

Template.m3a21_3.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a21_3");
	}
});

Template.m3a21_3.events({
	
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
		
		for (var i = 0; i < $.k2l.m3a21_3.correctAnswers[$.k2l.m3a21_3.index].length; i++) {
			if (userText == $.k2l.m3a21_3.correctAnswers[$.k2l.m3a21_3.index][i]){ 
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
			$.k2l.m3a21_3.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m3a21_3.correctAnswers[$.k2l.m3a21_3.index]);
			// $(evt.currentTarget).parent().html($.k2l.m3a21_3.displayAnswers[$.k2l.m3a21_3.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m3a21_3.index).addClass('correctword');
			
			if ($.k2l.m3a21_3.index < $.k2l.m3a21_3.correctAnswers.length - 1) {
				$.k2l.m3a21_3.index++;
				$('#entryanswer'+$.k2l.m3a21_3.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m3a21_3.index).html('<form class="textentry"><input type="text" name="userText" size="9" autocomplete="off"><input type="submit" value="OK"></form>');
$('input[name=userText]').focus();
} else {
				$.k2l.m3a21_3.index = 0;
				$.k2l.m3a21_3.wrongcount = 0;
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
			$.k2l.m3a21_3.wrongcount++;
			if ($.k2l.m3a21_3.wrongcount >= 1) {
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
		$.k2l.m3a21_3.wrongcount = 0;
		$('#entryanswer'+$.k2l.m3a21_3.index).html($.k2l.m3a21_3.correctAnswers[$.k2l.m3a21_3.index]);
		// $('#entryanswer'+$.k2l.m3a21_3.index).html($.k2l.m3a21_3.displayAnswers[$.k2l.m3a21_3.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m3a21_3.index).addClass('correctword');
		
		if ($.k2l.m3a21_3.index < $.k2l.m3a21_3.correctAnswers.length - 1) {
			$.k2l.m3a21_3.index++;
			$('#entryanswer'+$.k2l.m3a21_3.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m3a21_3.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
$('input[name=userText]').focus();
} else {
			$.k2l.m3a21_3.index = 0;
			$.k2l.m3a21_3.wrongcount = 0;
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
		$.k2l.m3a21_3.index = 0;
		$.k2l.m3a21_3.wrongcount = 0;
	}
	
});

Template.m3a21_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m3a21_3 == 'undefined') {
		$.k2l.m3a21_3 = {};
	};
	
	$.k2l.m3a21_3.index = 0;
	$.k2l.m3a21_3.wrongcount = 0;
	
	var correctAnswers = [
			["benefits"],
			["long term"],
			["appliances"],
			["integrated"],
			["power"]
		];
		
		/* var displayAnswers = [
			["benefits"],
			["long term"],
			["appliances"],
			["integrated"],
			["power"]
		]; 
		
	$.k2l.m3a21_3.displayAnswers = displayAnswers; */
	$.k2l.m3a21_3.correctAnswers = correctAnswers;
	
}

Template.m3a21_4.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a21_4");
	}
});

Template.m3a21_4.events({
	
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
		
		for (var i = 0; i < $.k2l.m3a21_4.correctAnswers[$.k2l.m3a21_4.index].length; i++) {
			if (userText == $.k2l.m3a21_4.correctAnswers[$.k2l.m3a21_4.index][i]){ 
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
			$.k2l.m3a21_4.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m3a21_4.correctAnswers[$.k2l.m3a21_4.index]);
			// $(evt.currentTarget).parent().html($.k2l.m3a21_4.displayAnswers[$.k2l.m3a21_4.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m3a21_4.index).addClass('correctword');
			
			if ($.k2l.m3a21_4.index < $.k2l.m3a21_4.correctAnswers.length - 1) {
				$.k2l.m3a21_4.index++;
				$('#entryanswer'+$.k2l.m3a21_4.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m3a21_4.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
$('input[name=userText]').focus();
} else {
				$.k2l.m3a21_4.index = 0;
				$.k2l.m3a21_4.wrongcount = 0;
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
			$.k2l.m3a21_4.wrongcount++;
			if ($.k2l.m3a21_4.wrongcount >= 1) {
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
		$.k2l.m3a21_4.wrongcount = 0;
		$('#entryanswer'+$.k2l.m3a21_4.index).html($.k2l.m3a21_4.correctAnswers[$.k2l.m3a21_4.index]);
		// $('#entryanswer'+$.k2l.m3a21_4.index).html($.k2l.m3a21_4.displayAnswers[$.k2l.m3a21_4.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m3a21_4.index).addClass('correctword');
		
		if ($.k2l.m3a21_4.index < $.k2l.m3a21_4.correctAnswers.length - 1) {
			$.k2l.m3a21_4.index++;
			$('#entryanswer'+$.k2l.m3a21_4.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m3a21_4.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
$('input[name=userText]').focus();
} else {
			$.k2l.m3a21_4.index = 0;
			$.k2l.m3a21_4.wrongcount = 0;
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
		$.k2l.m3a21_4.index = 0;
		$.k2l.m3a21_4.wrongcount = 0;
	}
	
});

Template.m3a21_4.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m3a21_4 == 'undefined') {
		$.k2l.m3a21_4 = {};
	};
	
	$.k2l.m3a21_4.index = 0;
	$.k2l.m3a21_4.wrongcount = 0;
	
	var correctAnswers = [
			["refurbished"],
			["stove"],
			["rural"],
			["panoramic"],
			["negotiation"]
		];
		
		/* var displayAnswers = [
			["refurbished"],
			["stove"],
			["rural"],
			["panoramic"],
			["negotiation"]
		]; 
		
	$.k2l.m3a21_4.displayAnswers = displayAnswers; */
	$.k2l.m3a21_4.correctAnswers = correctAnswers;
	
}

Template.m3a21_5.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a21_5");
	}
});

Template.m3a21_5.events({
	
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
		
		for (var i = 0; i < $.k2l.m3a21_5.correctAnswers[$.k2l.m3a21_5.index].length; i++) {
			if (userText == $.k2l.m3a21_5.correctAnswers[$.k2l.m3a21_5.index][i]){ 
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
			$.k2l.m3a21_5.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m3a21_5.correctAnswers[$.k2l.m3a21_5.index]);
			// $(evt.currentTarget).parent().html($.k2l.m3a21_5.displayAnswers[$.k2l.m3a21_5.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m3a21_5.index).addClass('correctword');
			
			if ($.k2l.m3a21_5.index < $.k2l.m3a21_5.correctAnswers.length - 1) {
				$.k2l.m3a21_5.index++;
				$('#entryanswer'+$.k2l.m3a21_5.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m3a21_5.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
$('input[name=userText]').focus();
} else {
				$.k2l.m3a21_5.index = 0;
				$.k2l.m3a21_5.wrongcount = 0;
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
			$.k2l.m3a21_5.wrongcount++;
			if ($.k2l.m3a21_5.wrongcount >= 1) {
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
		$.k2l.m3a21_5.wrongcount = 0;
		$('#entryanswer'+$.k2l.m3a21_5.index).html($.k2l.m3a21_5.correctAnswers[$.k2l.m3a21_5.index]);
		// $('#entryanswer'+$.k2l.m3a21_5.index).html($.k2l.m3a21_5.displayAnswers[$.k2l.m3a21_5.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m3a21_5.index).addClass('correctword');
		
		if ($.k2l.m3a21_5.index < $.k2l.m3a21_5.correctAnswers.length - 1) {
			$.k2l.m3a21_5.index++;
			$('#entryanswer'+$.k2l.m3a21_5.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m3a21_5.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
$('input[name=userText]').focus();
} else {
			$.k2l.m3a21_5.index = 0;
			$.k2l.m3a21_5.wrongcount = 0;
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
		$.k2l.m3a21_5.index = 0;
		$.k2l.m3a21_5.wrongcount = 0;
	}
	
});

Template.m3a21_5.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m3a21_5 == 'undefined') {
		$.k2l.m3a21_5 = {};
	};
	
	$.k2l.m3a21_5.index = 0;
	$.k2l.m3a21_5.wrongcount = 0;
	
	var correctAnswers = [
			["desirable"],
			["detached"],
			["secluded"],
			["master"],
			["maintenance"],
			["communal"]
		];
		
		/* var displayAnswers = [
			["desirable"],
			["detached"],
			["secluded"],
			["master"],
			["maintenance"],
			["communal"]
		]; 
		
	$.k2l.m3a21_5.displayAnswers = displayAnswers; */
	$.k2l.m3a21_5.correctAnswers = correctAnswers;
	
}

Template.m3a21_6.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a21_6");
	}
});

Template.m3a21_6.events({
	
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
		
		for (var i = 0; i < $.k2l.m3a21_6.correctAnswers[$.k2l.m3a21_6.index].length; i++) {
			if (userText == $.k2l.m3a21_6.correctAnswers[$.k2l.m3a21_6.index][i]){ 
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
			$.k2l.m3a21_6.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m3a21_6.correctAnswers[$.k2l.m3a21_6.index]);
			// $(evt.currentTarget).parent().html($.k2l.m3a21_6.displayAnswers[$.k2l.m3a21_6.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m3a21_6.index).addClass('correctword');
			
			if ($.k2l.m3a21_6.index < $.k2l.m3a21_6.correctAnswers.length - 1) {
				$.k2l.m3a21_6.index++;
				$('#entryanswer'+$.k2l.m3a21_6.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m3a21_6.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
$('input[name=userText]').focus();
} else {
				$.k2l.m3a21_6.index = 0;
				$.k2l.m3a21_6.wrongcount = 0;
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
			$.k2l.m3a21_6.wrongcount++;
			if ($.k2l.m3a21_6.wrongcount >= 1) {
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
		$.k2l.m3a21_6.wrongcount = 0;
		$('#entryanswer'+$.k2l.m3a21_6.index).html($.k2l.m3a21_6.correctAnswers[$.k2l.m3a21_6.index]);
		// $('#entryanswer'+$.k2l.m3a21_6.index).html($.k2l.m3a21_6.displayAnswers[$.k2l.m3a21_6.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m3a21_6.index).addClass('correctword');
		
		if ($.k2l.m3a21_6.index < $.k2l.m3a21_6.correctAnswers.length - 1) {
			$.k2l.m3a21_6.index++;
			$('#entryanswer'+$.k2l.m3a21_6.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m3a21_6.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
$('input[name=userText]').focus();
} else {
			$.k2l.m3a21_6.index = 0;
			$.k2l.m3a21_6.wrongcount = 0;
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
		$.k2l.m3a21_6.index = 0;
		$.k2l.m3a21_6.wrongcount = 0;
	}
	
});

Template.m3a21_6.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m3a21_6 == 'undefined') {
		$.k2l.m3a21_6 = {};
	};
	
	$.k2l.m3a21_6.index = 0;
	$.k2l.m3a21_6.wrongcount = 0;
	
	var correctAnswers = [
			["location"],
			["decorated"],
			["lounge"],
			["mirrored"],
			["enclosed"]
		];
		
		/* var displayAnswers = [
			["location"],
			["decorated"],
			["lounge"],
			["mirrored"],
			["enclosed"]
		]; 
		
	$.k2l.m3a21_6.displayAnswers = displayAnswers; */
	$.k2l.m3a21_6.correctAnswers = correctAnswers;
	
}

Template.m3a21_7.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a21_7");
	}
});

Template.m3a21_7.events({
	
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
		
		for (var i = 0; i < $.k2l.m3a21_7.correctAnswers[$.k2l.m3a21_7.index].length; i++) {
			if (userText == $.k2l.m3a21_7.correctAnswers[$.k2l.m3a21_7.index][i]){ 
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
			$.k2l.m3a21_7.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m3a21_7.correctAnswers[$.k2l.m3a21_7.index]);
			// $(evt.currentTarget).parent().html($.k2l.m3a21_7.displayAnswers[$.k2l.m3a21_7.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m3a21_7.index).addClass('correctword');
			
			if ($.k2l.m3a21_7.index < $.k2l.m3a21_7.correctAnswers.length - 1) {
				$.k2l.m3a21_7.index++;
				$('#entryanswer'+$.k2l.m3a21_7.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m3a21_7.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
$('input[name=userText]').focus();
} else {
				$.k2l.m3a21_7.index = 0;
				$.k2l.m3a21_7.wrongcount = 0;
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
			$.k2l.m3a21_7.wrongcount++;
			if ($.k2l.m3a21_7.wrongcount >= 1) {
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
		$.k2l.m3a21_7.wrongcount = 0;
		$('#entryanswer'+$.k2l.m3a21_7.index).html($.k2l.m3a21_7.correctAnswers[$.k2l.m3a21_7.index]);
		// $('#entryanswer'+$.k2l.m3a21_7.index).html($.k2l.m3a21_7.displayAnswers[$.k2l.m3a21_7.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m3a21_7.index).addClass('correctword');
		
		if ($.k2l.m3a21_7.index < $.k2l.m3a21_7.correctAnswers.length - 1) {
			$.k2l.m3a21_7.index++;
			$('#entryanswer'+$.k2l.m3a21_7.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m3a21_7.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
$('input[name=userText]').focus();
} else {
			$.k2l.m3a21_7.index = 0;
			$.k2l.m3a21_7.wrongcount = 0;
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
		$.k2l.m3a21_7.index = 0;
		$.k2l.m3a21_7.wrongcount = 0;
	}
	
});

Template.m3a21_7.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m3a21_7 == 'undefined') {
		$.k2l.m3a21_7 = {};
	};
	
	$.k2l.m3a21_7.index = 0;
	$.k2l.m3a21_7.wrongcount = 0;
	
	var correctAnswers = [
			["storage"],
			["fitted"],
			["balcony"],
			["service"]
		];
		
		/* var displayAnswers = [
			["storage"],
			["fitted"],
			["balcony"],
			["service"]
		]; 
		
	$.k2l.m3a21_7.displayAnswers = displayAnswers; */
	$.k2l.m3a21_7.correctAnswers = correctAnswers;
	
}

Template.m3a21_8.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a21_8");
	}
});

Template.m3a21_8.events({
	
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
		
		for (var i = 0; i < $.k2l.m3a21_8.correctAnswers[$.k2l.m3a21_8.index].length; i++) {
			if (userText == $.k2l.m3a21_8.correctAnswers[$.k2l.m3a21_8.index][i]){ 
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
			$.k2l.m3a21_8.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m3a21_8.correctAnswers[$.k2l.m3a21_8.index]);
			// $(evt.currentTarget).parent().html($.k2l.m3a21_8.displayAnswers[$.k2l.m3a21_8.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m3a21_8.index).addClass('correctword');
			
			if ($.k2l.m3a21_8.index < $.k2l.m3a21_8.correctAnswers.length - 1) {
				$.k2l.m3a21_8.index++;
				$('#entryanswer'+$.k2l.m3a21_8.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m3a21_8.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
$('input[name=userText]').focus();
} else {
				$.k2l.m3a21_8.index = 0;
				$.k2l.m3a21_8.wrongcount = 0;
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
			$.k2l.m3a21_8.wrongcount++;
			if ($.k2l.m3a21_8.wrongcount >= 1) {
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
		$.k2l.m3a21_8.wrongcount = 0;
		$('#entryanswer'+$.k2l.m3a21_8.index).html($.k2l.m3a21_8.correctAnswers[$.k2l.m3a21_8.index]);
		// $('#entryanswer'+$.k2l.m3a21_8.index).html($.k2l.m3a21_8.displayAnswers[$.k2l.m3a21_8.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m3a21_8.index).addClass('correctword');
		
		if ($.k2l.m3a21_8.index < $.k2l.m3a21_8.correctAnswers.length - 1) {
			$.k2l.m3a21_8.index++;
			$('#entryanswer'+$.k2l.m3a21_8.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m3a21_8.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
$('input[name=userText]').focus();
} else {
			$.k2l.m3a21_8.index = 0;
			$.k2l.m3a21_8.wrongcount = 0;
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
		$.k2l.m3a21_8.index = 0;
		$.k2l.m3a21_8.wrongcount = 0;
	}
	
});

Template.m3a21_8.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m3a21_8 == 'undefined') {
		$.k2l.m3a21_8 = {};
	};
	
	$.k2l.m3a21_8.index = 0;
	$.k2l.m3a21_8.wrongcount = 0;
	
	var correctAnswers = [
			["apartments"],
			["ideal"],
			["access"],
			["distance"]
		];
		
		/* var displayAnswers = [
			["apartments"],
			["ideal"],
			["access"],
			["distance"]
		]; 
		
	$.k2l.m3a21_8.displayAnswers = displayAnswers; */
	$.k2l.m3a21_8.correctAnswers = correctAnswers;
	
}

Template.m3a21_9.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a21_9");
	}
});

Template.m3a21_9.events({
	
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
		
		for (var i = 0; i < $.k2l.m3a21_9.correctAnswers[$.k2l.m3a21_9.index].length; i++) {
			if (userText == $.k2l.m3a21_9.correctAnswers[$.k2l.m3a21_9.index][i]){ 
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
			$.k2l.m3a21_9.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m3a21_9.correctAnswers[$.k2l.m3a21_9.index]);
			// $(evt.currentTarget).parent().html($.k2l.m3a21_9.displayAnswers[$.k2l.m3a21_9.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m3a21_9.index).addClass('correctword');
			
			if ($.k2l.m3a21_9.index < $.k2l.m3a21_9.correctAnswers.length - 1) {
				$.k2l.m3a21_9.index++;
				$('#entryanswer'+$.k2l.m3a21_9.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m3a21_9.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
$('input[name=userText]').focus();
} else {
				$.k2l.m3a21_9.index = 0;
				$.k2l.m3a21_9.wrongcount = 0;
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
			$.k2l.m3a21_9.wrongcount++;
			if ($.k2l.m3a21_9.wrongcount >= 1) {
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
		$.k2l.m3a21_9.wrongcount = 0;
		$('#entryanswer'+$.k2l.m3a21_9.index).html($.k2l.m3a21_9.correctAnswers[$.k2l.m3a21_9.index]);
		// $('#entryanswer'+$.k2l.m3a21_9.index).html($.k2l.m3a21_9.displayAnswers[$.k2l.m3a21_9.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m3a21_9.index).addClass('correctword');
		
		if ($.k2l.m3a21_9.index < $.k2l.m3a21_9.correctAnswers.length - 1) {
			$.k2l.m3a21_9.index++;
			$('#entryanswer'+$.k2l.m3a21_9.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m3a21_9.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
$('input[name=userText]').focus();
} else {
			$.k2l.m3a21_9.index = 0;
			$.k2l.m3a21_9.wrongcount = 0;
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
		$.k2l.m3a21_9.index = 0;
		$.k2l.m3a21_9.wrongcount = 0;
	}
	
});

Template.m3a21_9.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m3a21_9 == 'undefined') {
		$.k2l.m3a21_9 = {};
	};
	
	$.k2l.m3a21_9.index = 0;
	$.k2l.m3a21_9.wrongcount = 0;
	
	var correctAnswers = [
			["outstanding"],
			["conservatory"],
			["landscaped"],
			["mature"],
			["unfurnished"]
		];
		
		/* var displayAnswers = [
			["outstanding"],
			["conservatory"],
			["landscaped"],
			["mature"],
			["unfurnished"]
		]; 
		
	$.k2l.m3a21_9.displayAnswers = displayAnswers; */
	$.k2l.m3a21_9.correctAnswers = correctAnswers;
	
}
