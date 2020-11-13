Template.m10a6.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m10a6_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m10a6.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(10,6);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(10, 6, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m10a6.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 10, 6, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m10a6.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m10a6_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a6_5"); 
	} 
}); 
 
Template.m10a6_5.events({
	
	"click .button2": function(evt){
		
		if ($.k2l.m10a6_5.allowClick == true) {
			$.k2l.m10a6_5.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m10a6_5.answer_index[$.k2l.m10a6_5.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m10a6_5.index++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				if ($.k2l.m10a6_5.index > $.k2l.m10a6_5.words.length-1){
					setTimeout (function() {
						$('#welldonecap').removeClass('hidden');
					}, 1000);
					
					setTimeout(function() {
						$.k2l.m10a6_5.index = 0;
						$('#welldonecap').addClass('hidden');
						$.k2l.m10a6_5.allowClick = true; // Make the buttons clickable again
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				}else{
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$('#m10a6text').html($.k2l.m10a6_5.words[$.k2l.m10a6_5.index]);
						$.k2l.m10a6_5.allowClick = true; // Make the buttons clickable again
					}, 1000);	
				}
				} else {				
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$.k2l.m10a6_5.allowClick = true; // Make the buttons clickable again
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		$.k2l.m10a6_5.index = 0;
		$.k2l.m10a6_5.allowClick = true;
	}

});

Template.m10a6_5.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a6_5 == 'undefined') {
		$.k2l.m10a6_5 = {};
	};
	
	var words = ["a cold","abroad","out of business","bald","crazy","sight of","into view","close to doing something","the bus","to a standstill"]
	var answer_index = ["1","3","3","3","3","1","2","2","1","2"];


	
	$.k2l.m10a6_5.words = words;
	$.k2l.m10a6_5.answer_index = answer_index;
	$.k2l.m10a6_5.index = 0;

	$.k2l.m10a6_5.allowClick = true;
}

Template.m10a6_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a6_1"); 
	} 
}); 
 
Template.m10a6_1.events({
	
	"click .button2": function(evt){
		
		if ($.k2l.m10a6_1.allowClick == true) {
			$.k2l.m10a6_1.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m10a6_1.answer_index[$.k2l.m10a6_1.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m10a6_1.index++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				if ($.k2l.m10a6_1.index > $.k2l.m10a6_1.words.length-1){
					setTimeout (function() {
						$('#welldonecap').removeClass('hidden');
					}, 1000);
					
					setTimeout(function() {
						$.k2l.m10a6_1.index = 0;
						$('#welldonecap').addClass('hidden');
						$.k2l.m10a6_1.allowClick = true; // Make the buttons clickable again
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				}else{
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$('#m10a6text').html($.k2l.m10a6_1.words[$.k2l.m10a6_1.index]);
						$.k2l.m10a6_1.allowClick = true; // Make the buttons clickable again
					}, 1000);	
				}
				} else {				
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$.k2l.m10a6_1.allowClick = true; // Make the buttons clickable again
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		$.k2l.m10a6_1.index = 0;
		$.k2l.m10a6_1.allowClick = true;
	}

});

Template.m10a6_1.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a6_1 == 'undefined') {
		$.k2l.m10a6_1 = {};
	};
	
	var words = ["your best","some sympathy","the washing up","a train","upset","a good time","excited","her a favour","the sack","ready"]
	var answer_index = ["1","2","1","3","3","2","3","1","3","3"];


	
	$.k2l.m10a6_1.words = words;
	$.k2l.m10a6_1.answer_index = answer_index;
	$.k2l.m10a6_1.index = 0;

	$.k2l.m10a6_1.allowClick = true;
}



Template.m10a6_7.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a6_7"); 
	} 
}); 
 
Template.m10a6_7.events({
	
	"click .button2": function(evt){
		
		if ($.k2l.m10a6_7.allowClick == true) {
			$.k2l.m10a6_7.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m10a6_7.answer_index[$.k2l.m10a6_7.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m10a6_7.index++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				if ($.k2l.m10a6_7.index > $.k2l.m10a6_7.words.length-1){
					setTimeout (function() {
						$('#welldonecap').removeClass('hidden');
					}, 1000);
					
					setTimeout(function() {
						$.k2l.m10a6_7.index = 0;
						$('#welldonecap').addClass('hidden');
						$.k2l.m10a6_7.allowClick = true; // Make the buttons clickable again
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				}else{
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$('#m10a6text').html($.k2l.m10a6_7.words[$.k2l.m10a6_7.index]);
						$.k2l.m10a6_7.allowClick = true; // Make the buttons clickable again
					}, 1000);	
				}
				} else {				
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$.k2l.m10a6_7.allowClick = true; // Make the buttons clickable again
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		$.k2l.m10a6_7.index = 0;
		$.k2l.m10a6_7.allowClick = true;
	}

});

Template.m10a6_7.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a6_7 == 'undefined') {
		$.k2l.m10a6_7 = {};
	};
	
	var words = ["time","it time","way","energy","something on hold","someone grief","money","something behind you","permission","your back into something"]
	var answer_index = ["2","1","1","2","3","1","2","3","1","3"];


	
	$.k2l.m10a6_7.words = words;
	$.k2l.m10a6_7.answer_index = answer_index;
	$.k2l.m10a6_7.index = 0;

	$.k2l.m10a6_7.allowClick = true;
}



Template.m10a6_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a6_3"); 
	} 
}); 
 
Template.m10a6_3.events({
	
	"click .button2": function(evt){
		
		if ($.k2l.m10a6_3.allowClick == true) {
			$.k2l.m10a6_3.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m10a6_3.answer_index[$.k2l.m10a6_3.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m10a6_3.index++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				if ($.k2l.m10a6_3.index > $.k2l.m10a6_3.words.length-1){
					setTimeout (function() {
						$('#welldonecap').removeClass('hidden');
					}, 1000);
					
					setTimeout(function() {
						$.k2l.m10a6_3.index = 0;
						$('#welldonecap').addClass('hidden');
						$.k2l.m10a6_3.allowClick = true; // Make the buttons clickable again
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				}else{
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$('#m10a6text').html($.k2l.m10a6_3.words[$.k2l.m10a6_3.index]);
						$.k2l.m10a6_3.allowClick = true; // Make the buttons clickable again
					}, 1000);	
				}
				} else {				
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$.k2l.m10a6_3.allowClick = true; // Make the buttons clickable again
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		$.k2l.m10a6_3.index = 0;
		$.k2l.m10a6_3.allowClick = true;
	}

});

Template.m10a6_3.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a6_3 == 'undefined') {
		$.k2l.m10a6_3 = {};
	};
	
	var words = ["someone's heart","someone happy","the rules","room","an exam","the law","a chance","a mess","a look","a mistake"]
	var answer_index = ["1","3","1","3","2","1","2","3","2","3"];


	
	$.k2l.m10a6_3.words = words;
	$.k2l.m10a6_3.answer_index = answer_index;
	$.k2l.m10a6_3.index = 0;

	$.k2l.m10a6_3.allowClick = true;
}

Template.m10a6_9.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10a6_9"); 
	} 
}); 
 
Template.m10a6_9.events({
	
	"click .button2": function(evt){
		
		if ($.k2l.m10a6_9.allowClick == true) {
			$.k2l.m10a6_9.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m10a6_9.answer_index[$.k2l.m10a6_9.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m10a6_9.index++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				if ($.k2l.m10a6_9.index > $.k2l.m10a6_9.words.length-1){
					setTimeout (function() {
						$('#welldonecap').removeClass('hidden');
					}, 1000);
					
					setTimeout(function() {
						$.k2l.m10a6_9.index = 0;
						$('#welldonecap').addClass('hidden');
						$.k2l.m10a6_9.allowClick = true; // Make the buttons clickable again
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				}else{
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$('#m10a6text').html($.k2l.m10a6_9.words[$.k2l.m10a6_9.index]);
						$.k2l.m10a6_9.allowClick = true; // Make the buttons clickable again
					}, 1000);	
				}
				} else {				
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$.k2l.m10a6_9.allowClick = true; // Make the buttons clickable again
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		$.k2l.m10a6_9.index = 0;
		$.k2l.m10a6_9.allowClick = true;
	}

});

Template.m10a6_9.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10a6_9 == 'undefined') {
		$.k2l.m10a6_9 = {};
	};
	
	var words = ["in touch","attention","someone a visit","games with someone","respect","an eye on something","a promise","by credit card","it safe","quiet"]
	var answer_index = ["2","1","1","3","1","2","2","1","3","2"];


	
	$.k2l.m10a6_9.words = words;
	$.k2l.m10a6_9.answer_index = answer_index;
	$.k2l.m10a6_9.index = 0;

	$.k2l.m10a6_9.allowClick = true;
}
