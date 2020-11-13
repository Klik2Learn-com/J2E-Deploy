Template.m8a7.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m8a7_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m8a7.rendered = function() { 
		document.title = "Journey 2 English";
	
	setStartActivity(8,7);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 7, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}
Template.m8a7_10.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a7_10"); 
	} 
}); 
 
Template.m8a7_10.events({
	
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
		
		for (var i = 0; i < $.k2l.m8a7_10.correctAnswers[$.k2l.m8a7_10.index].length; i++) {
			if (userText == $.k2l.m8a7_10.correctAnswers[$.k2l.m8a7_10.index][i]){ 
				isCorrect = true;
				 $.k2l.m8a7_10.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m8a7_10.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			//$(evt.currentTarget).parent().html($.k2l.m8a7_10.correctAnswers[$.k2l.m8a7_10.index]);
			$(evt.currentTarget).parent().html($.k2l.m8a7_10.displayAnswers[$.k2l.m8a7_10.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m8a7_10.index).addClass('correctword');
			
			if ($.k2l.m8a7_10.index < $.k2l.m8a7_10.correctAnswers.length - 1) {
				$.k2l.m8a7_10.index++;
				$('#entryanswer'+$.k2l.m8a7_10.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m8a7_10.index).html('<form class="textentry"><input type="text" name="userText" size="14" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m8a7_10.index = 0;
				$.k2l.m8a7_10.wrongcount = 0;
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
			$.k2l.m8a7_10.wrongcount++;
			if ($.k2l.m8a7_10.wrongcount >= 1) {
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
		$.k2l.m8a7_10.wrongcount = 0;
		//$('#entryanswer'+$.k2l.m8a7_10.index).html($.k2l.m8a7_10.correctAnswers[$.k2l.m8a7_10.index]);
		$('#entryanswer'+$.k2l.m8a7_10.index).html($.k2l.m8a7_10.displayAnswers[$.k2l.m8a7_10.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m8a7_10.index).addClass('correctword');
		
		if ($.k2l.m8a7_10.index < $.k2l.m8a7_10.correctAnswers.length - 1) {
			$.k2l.m8a7_10.index++;
			$('#entryanswer'+$.k2l.m8a7_10.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m8a7_10.index).html('<form class="textentry"><input type="text" name="userText" size="14" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m8a7_10.index = 0;
			$.k2l.m8a7_10.wrongcount = 0;
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
		$.k2l.m8a7_10.index = 0;
		$.k2l.m8a7_10.wrongcount = 0;
	}
	
});

Template.m8a7_10.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a7_10 == 'undefined') {
		$.k2l.m8a7_10 = {};
	};
	
	$.k2l.m8a7_10.index = 0;
	$.k2l.m8a7_10.wrongcount = 0;
	 $.k2l.m8a7_10.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
			["tough minded", "tough-minded"], // Possible answers for Q1.
			["agreeable"]  // Possible answers for Q2.
			
		];
		
		 var displayAnswers = [
			["Tough-minded"], // Possible answers for Q1.
			["Agreeable"]   // Possible answers for Q2.
			
		]; 
		
	$.k2l.m8a7_10.displayAnswers = displayAnswers; 
	$.k2l.m8a7_10.correctAnswers = correctAnswers;
	
}

Template.m8a7_11.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a7_11"); 
	} 
}); 
 
Template.m8a7_11.events({
	
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
		
		for (var i = 0; i < $.k2l.m8a7_11.correctAnswers[$.k2l.m8a7_11.index].length; i++) {
			if (userText == $.k2l.m8a7_11.correctAnswers[$.k2l.m8a7_11.index][i]){ 
				isCorrect = true;
				 $.k2l.m8a7_11.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m8a7_11.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			//$(evt.currentTarget).parent().html($.k2l.m8a7_11.correctAnswers[$.k2l.m8a7_11.index]);
			$(evt.currentTarget).parent().html($.k2l.m8a7_11.displayAnswers[$.k2l.m8a7_11.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m8a7_11.index).addClass('correctword');
			
			if ($.k2l.m8a7_11.index < $.k2l.m8a7_11.correctAnswers.length - 1) {
				$.k2l.m8a7_11.index++;
				$('#entryanswer'+$.k2l.m8a7_11.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m8a7_11.index).html('<form class="textentry"><input type="text" name="userText" size="14" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m8a7_11.index = 0;
				$.k2l.m8a7_11.wrongcount = 0;
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
			$.k2l.m8a7_11.wrongcount++;
			if ($.k2l.m8a7_11.wrongcount >= 1) {
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
		$.k2l.m8a7_11.wrongcount = 0;
		//$('#entryanswer'+$.k2l.m8a7_11.index).html($.k2l.m8a7_11.correctAnswers[$.k2l.m8a7_11.index]);
		$('#entryanswer'+$.k2l.m8a7_11.index).html($.k2l.m8a7_11.displayAnswers[$.k2l.m8a7_11.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m8a7_11.index).addClass('correctword');
		
		if ($.k2l.m8a7_11.index < $.k2l.m8a7_11.correctAnswers.length - 1) {
			$.k2l.m8a7_11.index++;
			$('#entryanswer'+$.k2l.m8a7_11.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m8a7_11.index).html('<form class="textentry"><input type="text" name="userText" size="14" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m8a7_11.index = 0;
			$.k2l.m8a7_11.wrongcount = 0;
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
		$.k2l.m8a7_11.index = 0;
		$.k2l.m8a7_11.wrongcount = 0;
	}
	
});

Template.m8a7_11.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a7_11 == 'undefined') {
		$.k2l.m8a7_11 = {};
	};
	
	$.k2l.m8a7_11.index = 0;
	$.k2l.m8a7_11.wrongcount = 0;
	 $.k2l.m8a7_11.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
			["conforming"], // Possible answers for Q1.
			["creative"]  // Possible answers for Q2.
			
		];
		
		 var displayAnswers = [
			["Conforming"], // Possible answers for Q1.
			["Creative"]   // Possible answers for Q2.
			
		]; 
		
	$.k2l.m8a7_11.displayAnswers = displayAnswers; 
	$.k2l.m8a7_11.correctAnswers = correctAnswers;
	
}

Template.m8a7_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a7_4"); 
	} 
}); 

Template.m8a7_4.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a7_4 == 'undefined') {
		$.k2l.m8a7_4 = {};
	};
	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m8a7_4";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a7_4",
		nextPage: "#m8a7_5",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m8a7_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a7_5"); 
	} 
}); 

Template.m8a7_5.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a7_5 == 'undefined') {
		$.k2l.m8a7_5 = {};
	};
	
	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m8a7_5";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a7_5",
		nextPage: "#m8a7_6",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m8a7_6.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a7_6"); 
	} 
}); 

Template.m8a7_7.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a7_7"); 
	} 
}); 
 
Template.m8a7_7.events({
	
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
		
		for (var i = 0; i < $.k2l.m8a7_7.correctAnswers[$.k2l.m8a7_7.index].length; i++) {
			if (userText == $.k2l.m8a7_7.correctAnswers[$.k2l.m8a7_7.index][i]){ 
				isCorrect = true;
				 $.k2l.m8a7_7.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m8a7_7.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			//$(evt.currentTarget).parent().html($.k2l.m8a7_7.correctAnswers[$.k2l.m8a7_7.index]);
			$(evt.currentTarget).parent().html($.k2l.m8a7_7.displayAnswers[$.k2l.m8a7_7.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m8a7_7.index).addClass('correctword');
			
			if ($.k2l.m8a7_7.index < $.k2l.m8a7_7.correctAnswers.length - 1) {
				$.k2l.m8a7_7.index++;
				$('#entryanswer'+$.k2l.m8a7_7.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m8a7_7.index).html('<form class="textentry"><input type="text" name="userText" size="14" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m8a7_7.index = 0;
				$.k2l.m8a7_7.wrongcount = 0;
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
			$.k2l.m8a7_7.wrongcount++;
			if ($.k2l.m8a7_7.wrongcount >= 1) {
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
		$.k2l.m8a7_7.wrongcount = 0;
		//$('#entryanswer'+$.k2l.m8a7_7.index).html($.k2l.m8a7_7.correctAnswers[$.k2l.m8a7_7.index]);
		$('#entryanswer'+$.k2l.m8a7_7.index).html($.k2l.m8a7_7.displayAnswers[$.k2l.m8a7_7.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m8a7_7.index).addClass('correctword');
		
		if ($.k2l.m8a7_7.index < $.k2l.m8a7_7.correctAnswers.length - 1) {
			$.k2l.m8a7_7.index++;
			$('#entryanswer'+$.k2l.m8a7_7.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m8a7_7.index).html('<form class="textentry"><input type="text" name="userText" size="14" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m8a7_7.index = 0;
			$.k2l.m8a7_7.wrongcount = 0;
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
		$.k2l.m8a7_7.index = 0;
		$.k2l.m8a7_7.wrongcount = 0;
	}
	
});

Template.m8a7_7.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a7_7 == 'undefined') {
		$.k2l.m8a7_7 = {};
	};
	
	$.k2l.m8a7_7.index = 0;
	$.k2l.m8a7_7.wrongcount = 0;
	 $.k2l.m8a7_7.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
			["extrovert"], // Possible answers for Q1.
			["introvert", "introverted"]  // Possible answers for Q2.
			
		];
		
		 var displayAnswers = [
			["Extrovert"], // Possible answers for Q1.
			["Introverted"]   // Possible answers for Q2.
			
		]; 
		
	$.k2l.m8a7_7.displayAnswers = displayAnswers; 
	$.k2l.m8a7_7.correctAnswers = correctAnswers;
	
}

Template.m8a7_8.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a7_8"); 
	} 
}); 
 
Template.m8a7_8.events({
	
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
		
		for (var i = 0; i < $.k2l.m8a7_8.correctAnswers[$.k2l.m8a7_8.index].length; i++) {
			if (userText == $.k2l.m8a7_8.correctAnswers[$.k2l.m8a7_8.index][i]){ 
				isCorrect = true;
				 $.k2l.m8a7_8.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m8a7_8.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			//$(evt.currentTarget).parent().html($.k2l.m8a7_8.correctAnswers[$.k2l.m8a7_8.index]);
			$(evt.currentTarget).parent().html($.k2l.m8a7_8.displayAnswers[$.k2l.m8a7_8.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m8a7_8.index).addClass('correctword');
			
			if ($.k2l.m8a7_8.index < $.k2l.m8a7_8.correctAnswers.length - 1) {
				$.k2l.m8a7_8.index++;
				$('#entryanswer'+$.k2l.m8a7_8.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m8a7_8.index).html('<form class="textentry"><input type="text" name="userText" size="14" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m8a7_8.index = 0;
				$.k2l.m8a7_8.wrongcount = 0;
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
			$.k2l.m8a7_8.wrongcount++;
			if ($.k2l.m8a7_8.wrongcount >= 1) {
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
		$.k2l.m8a7_8.wrongcount = 0;
		//$('#entryanswer'+$.k2l.m8a7_8.index).html($.k2l.m8a7_8.correctAnswers[$.k2l.m8a7_8.index]);
		$('#entryanswer'+$.k2l.m8a7_8.index).html($.k2l.m8a7_8.displayAnswers[$.k2l.m8a7_8.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m8a7_8.index).addClass('correctword');
		
		if ($.k2l.m8a7_8.index < $.k2l.m8a7_8.correctAnswers.length - 1) {
			$.k2l.m8a7_8.index++;
			$('#entryanswer'+$.k2l.m8a7_8.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m8a7_8.index).html('<form class="textentry"><input type="text" name="userText" size="14" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m8a7_8.index = 0;
			$.k2l.m8a7_8.wrongcount = 0;
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
		$.k2l.m8a7_8.index = 0;
		$.k2l.m8a7_8.wrongcount = 0;
	}
	
});

Template.m8a7_8.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a7_8 == 'undefined') {
		$.k2l.m8a7_8 = {};
	};
	
	$.k2l.m8a7_8.index = 0;
	$.k2l.m8a7_8.wrongcount = 0;
	 $.k2l.m8a7_8.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
			["confident"], // Possible answers for Q1.
			["sensitive"]  // Possible answers for Q2.
			
		];
		
		 var displayAnswers = [
			["Confident"], // Possible answers for Q1.
			["Sensitive"]   // Possible answers for Q2.
			
		]; 
		
	$.k2l.m8a7_8.displayAnswers = displayAnswers; 
	$.k2l.m8a7_8.correctAnswers = correctAnswers;
	
}

Template.m8a7_9.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a7_9"); 
	} 
}); 
 
Template.m8a7_9.events({
	
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
		
		for (var i = 0; i < $.k2l.m8a7_9.correctAnswers[$.k2l.m8a7_9.index].length; i++) {
			if (userText == $.k2l.m8a7_9.correctAnswers[$.k2l.m8a7_9.index][i]){ 
				isCorrect = true;
				 $.k2l.m8a7_9.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m8a7_9.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			//$(evt.currentTarget).parent().html($.k2l.m8a7_9.correctAnswers[$.k2l.m8a7_9.index]);
			$(evt.currentTarget).parent().html($.k2l.m8a7_9.displayAnswers[$.k2l.m8a7_9.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m8a7_9.index).addClass('correctword');
			
			if ($.k2l.m8a7_9.index < $.k2l.m8a7_9.correctAnswers.length - 1) {
				$.k2l.m8a7_9.index++;
				$('#entryanswer'+$.k2l.m8a7_9.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m8a7_9.index).html('<form class="textentry"><input type="text" name="userText" size="14" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m8a7_9.index = 0;
				$.k2l.m8a7_9.wrongcount = 0;
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
			$.k2l.m8a7_9.wrongcount++;
			if ($.k2l.m8a7_9.wrongcount >= 1) {
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
		$.k2l.m8a7_9.wrongcount = 0;
		//$('#entryanswer'+$.k2l.m8a7_9.index).html($.k2l.m8a7_9.correctAnswers[$.k2l.m8a7_9.index]);
		$('#entryanswer'+$.k2l.m8a7_9.index).html($.k2l.m8a7_9.displayAnswers[$.k2l.m8a7_9.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m8a7_9.index).addClass('correctword');
		
		if ($.k2l.m8a7_9.index < $.k2l.m8a7_9.correctAnswers.length - 1) {
			$.k2l.m8a7_9.index++;
			$('#entryanswer'+$.k2l.m8a7_9.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m8a7_9.index).html('<form class="textentry"><input type="text" name="userText" size="14" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m8a7_9.index = 0;
			$.k2l.m8a7_9.wrongcount = 0;
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
		$.k2l.m8a7_9.index = 0;
		$.k2l.m8a7_9.wrongcount = 0;
	}
	
});

Template.m8a7_9.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a7_9 == 'undefined') {
		$.k2l.m8a7_9 = {};
	};
	
	$.k2l.m8a7_9.index = 0;
	$.k2l.m8a7_9.wrongcount = 0;
	 $.k2l.m8a7_9.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
			["detail conscious", "detail-conscious"], // Possible answers for Q1.
			["unstructured"]  // Possible answers for Q2.
			
		];
		
		 var displayAnswers = [
			["Detail-Conscious"], // Possible answers for Q1.
			["Unstructured"]   // Possible answers for Q2.
			
		]; 
		
	$.k2l.m8a7_9.displayAnswers = displayAnswers; 
	$.k2l.m8a7_9.correctAnswers = correctAnswers;
	
}


Template.m8a7.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 7, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a7.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};