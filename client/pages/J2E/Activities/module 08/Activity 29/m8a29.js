Template.m8a29.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m8a29_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m8a29.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(8,29);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 29, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m8a29.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 29, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a29.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m8a29_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a29_5"); 
	} 
}); 
 
Template.m8a29_5.events({
	
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
		
		for (var i = 0; i < $.k2l.m8a29_5.correctAnswers[$.k2l.m8a29_5.index].length; i++) {
			if (userText == $.k2l.m8a29_5.correctAnswers[$.k2l.m8a29_5.index][i]){ 
				isCorrect = true;
				// $.k2l.m8a29_5.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m8a29_5.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			// $(evt.currentTarget).parent().html($.k2l.m8a29_5.correctAnswers[$.k2l.m8a29_5.index]);
			$(evt.currentTarget).parent().html($.k2l.m8a29_5.displayAnswers[$.k2l.m8a29_5.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m8a29_5.index).addClass('correctword');
			
			if ($.k2l.m8a29_5.index < $.k2l.m8a29_5.correctAnswers.length - 1) {
				$.k2l.m8a29_5.index++;
				$('#entryanswer'+$.k2l.m8a29_5.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m8a29_5.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m8a29_5.index = 0;
				$.k2l.m8a29_5.wrongcount = 0;
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
			$.k2l.m8a29_5.wrongcount++;
			if ($.k2l.m8a29_5.wrongcount >= 1) {
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
		$.k2l.m8a29_5.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m8a29_5.index).html($.k2l.m8a29_5.correctAnswers[$.k2l.m8a29_5.index]);
		$('#entryanswer'+$.k2l.m8a29_5.index).html($.k2l.m8a29_5.displayAnswers[$.k2l.m8a29_5.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m8a29_5.index).addClass('correctword');
		
		if ($.k2l.m8a29_5.index < $.k2l.m8a29_5.correctAnswers.length - 1) {
			$.k2l.m8a29_5.index++;
			$('#entryanswer'+$.k2l.m8a29_5.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m8a29_5.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m8a29_5.index = 0;
			$.k2l.m8a29_5.wrongcount = 0;
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
		$.k2l.m8a29_5.index = 0;
		$.k2l.m8a29_5.wrongcount = 0;
	}
	
});

Template.m8a29_5.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a29_5 == 'undefined') {
		$.k2l.m8a29_5 = {};
	};
	
	$.k2l.m8a29_5.index = 0;
	$.k2l.m8a29_5.wrongcount = 0;
	$.k2l.m8a29_5.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
			["for"], // Possible answers for Q1.
			["about", "with", "in"],   // Possible answers for Q2.
			["for"], // etc.
			["under"],
			["between"],
			["in"]
		];
		
		 var displayAnswers = [
			["for"], // Possible answers for Q1.
			["about/with/in"],   // Possible answers for Q2.
			["for"], // etc.
			["under"],
			["between"],
			["in"]
		]; 
		
	$.k2l.m8a29_5.displayAnswers = displayAnswers; 
	$.k2l.m8a29_5.correctAnswers = correctAnswers;
	
}

Template.m8a29_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a29_3"); 
	} 
}); 

Template.m8a29_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a29_3 == 'undefined') {
		$.k2l.m8a29_3 = {};
	};
	
	var dragDropAmount = 7;
	var selector = "#m8a29_3";
	var options = {
		multiAns: true,
		autoNav : true,
		currPage: "#m8a29_3",
		nextPage: "#m8a29_4",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m8a29_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a29_4"); 
	} 
}); 

Template.m8a29_4.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a29_4 == 'undefined') {
		$.k2l.m8a29_4 = {};
	};
	
	var dragDropAmount = 8;
	var selector = "#m8a29_4";
	var options = {
		multiAns: true,
		autoNav : true,
		currPage: "#m8a29_4",
		nextPage: "#m8a29_5",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m8a29_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a29_2"); 
	} 
}); 

Template.m8a29_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a29_2 == 'undefined') {
		$.k2l.m8a29_2 = {};
	};
	
	var dragDropAmount = 8;
	var selector = "#m8a29_2";
	var options = {
		multiAns: true,
		autoNav : true,
		currPage: "#m8a29_2",
		nextPage: "#m8a29_3",
	};
	initDragDrop(selector, dragDropAmount, options);
}
