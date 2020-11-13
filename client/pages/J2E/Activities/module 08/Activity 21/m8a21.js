Template.m8a21.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m8a21_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m8a21.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(8,21);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 21, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m8a21.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 21, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a21.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m8a21_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a21_2"); 
	} 
}); 

Template.m8a21_2.events({
	"click .button2": function(evt){
		
		if ($.k2l.m8a21_2.allowClick == true) {
			var parentSection = $(evt.currentTarget).parents('section');
			$.k2l.m8a21_2.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m8a21_2.answer_index[$.k2l.m8a21_2.index]) {
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				
				if ($.k2l.m8a21_2.index < $.k2l.m8a21_2.answer_index.length-1) {
					$.k2l.m8a21_2.index++;
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$.k2l.m8a21_2.allowClick = true;
					}, 1000);
				} else {
					setTimeout(function() {
						//reset variables
						$.k2l.m8a21_2.index = 0;
						$.k2l.m8a21_2.allowClick = true;

						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
					
					// $('.pagination').removeClass('hidden');
				}
			} else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
				
				
				if ($.k2l.m8a21_2.index < $.k2l.m8a21_2.answer_index.length-1) {
					$.k2l.m8a21_2.index++;
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$.k2l.m8a21_2.allowClick = true; 
					}, 1000);
				} else {
					setTimeout(function() {
						//reset variables
						$.k2l.m8a21_2.index = 0;
						$.k2l.m8a21_2.allowClick = true;

						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				}
			}
		}		
	}
	/*
	'click .pagination': function(evt) {
		$.k2l.m8a21_2.index = 0;
		$.k2l.m8a21_2.allowClick = true;
	}
	*/

});

Template.m8a21_2.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a21_2 == 'undefined') {
		$.k2l.m8a21_2 = {};
	};
					
	var answer_index = ["2"];

	$.k2l.m8a21_2.answer_index = answer_index;
	$.k2l.m8a21_2.index = 0;

	$.k2l.m8a21_2.allowClick = true;
}

Template.m8a21_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a21_4"); 
	} 
}); 

Template.m8a21_4.events({
	"click .button2": function(evt){
		
		if ($.k2l.m8a21_4.allowClick == true) {
			var parentSection = $(evt.currentTarget).parents('section');
			$.k2l.m8a21_4.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m8a21_4.answer_index[$.k2l.m8a21_4.index]) {
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				
				if ($.k2l.m8a21_4.index < $.k2l.m8a21_4.answer_index.length-1) {
					$.k2l.m8a21_4.index++;
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$.k2l.m8a21_4.allowClick = true;
					}, 1000);
				} else {
						setTimeout(function() {
							$.k2l.m8a21_4.index = 0;
							$.k2l.m8a21_4.allowClick = true;

							$(parentSection).addClass('hidden'); // hide this page
							$(parentSection).next('section').removeClass('hidden');// reveal next page.
							document.location.hash = $(parentSection).next('section').attr('id');
							Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
						}, 2000);
					
					// $('.pagination').removeClass('hidden');
				}
			} else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
				
				
				if ($.k2l.m8a21_4.index < $.k2l.m8a21_4.answer_index.length-1) {
					$.k2l.m8a21_4.index++;
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$.k2l.m8a21_4.allowClick = true; 
					}, 1000);
				} else {
					setTimeout(function() {
						//reset variables
						$.k2l.m8a21_4.index = 0;
						$.k2l.m8a21_4.allowClick = true;

						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				}
			}
		}		
	}
	
	/*
	'click .pagination': function(evt) {
		$.k2l.m8a21_4.index = 0;
		$.k2l.m8a21_4.allowClick = true;
	}
	*/

});

Template.m8a21_4.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a21_4 == 'undefined') {
		$.k2l.m8a21_4 = {};
	};
					
	var answer_index = ["1"];

	$.k2l.m8a21_4.answer_index = answer_index;
	$.k2l.m8a21_4.index = 0;

	$.k2l.m8a21_4.allowClick = true;
}

Template.m8a21_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a21_1"); 
	} 
}); 

Template.m8a21_1.events({
	"click .button2": function(evt){
		
		if ($.k2l.m8a21_1.allowClick == true) {
			var parentSection = $(evt.currentTarget).parents('section');
			$.k2l.m8a21_1.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m8a21_1.answer_index[$.k2l.m8a21_1.index]) {
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);

				if ($.k2l.m8a21_1.index < $.k2l.m8a21_1.answer_index.length-1) {
					$.k2l.m8a21_1.index++;
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$.k2l.m8a21_1.allowClick = true;
					}, 1000);
				} else {
						setTimeout(function() {
						//reset variables
						$.k2l.m8a21_1.index = 0;
						$.k2l.m8a21_1.allowClick = true;

						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
						}, 2000);
					
						// $('.pagination').removeClass('hidden');
				}

			} else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
				
				
				if ($.k2l.m8a21_1.index < $.k2l.m8a21_1.answer_index.length-1) {
					$.k2l.m8a21_1.index++;
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$.k2l.m8a21_1.allowClick = true; 
					}, 1000);
				} else {
					setTimeout(function() {
						//reset variables
						$.k2l.m8a21_1.index = 0;
						$.k2l.m8a21_1.allowClick = true;

						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				}
			}
		}
	}
	/*
	'click .pagination': function(evt) {
		alert("hello");
		$.k2l.m8a21_1.index = 0;
		$.k2l.m8a21_1.allowClick = true;
	}
	*/

});

Template.m8a21_1.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a21_1 == 'undefined') {
		$.k2l.m8a21_1 = {};
	};
					
	var answer_index = ["2"];

	$.k2l.m8a21_1.answer_index = answer_index;
	$.k2l.m8a21_1.index = 0;

	$.k2l.m8a21_1.allowClick = true;
}

Template.m8a21_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a21_3"); 
	} 
}); 

Template.m8a21_3.events({
	"click .button2": function(evt){
		
		if ($.k2l.m8a21_3.allowClick == true) {
			var parentSection = $(evt.currentTarget).parents('section');
			$.k2l.m8a21_3.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m8a21_3.answer_index[$.k2l.m8a21_3.index]) {
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				
				if ($.k2l.m8a21_3.index < $.k2l.m8a21_3.answer_index.length-1) {
					$.k2l.m8a21_3.index++;
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$.k2l.m8a21_3.allowClick = true;
					}, 1000);
				} else {
					setTimeout(function() {
						//reset variables 
						$.k2l.m8a21_3.index = 0;
						$.k2l.m8a21_3.allowClick = true;
						
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
							
					// $('.pagination').removeClass('hidden');
				}
			} else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
				
				
				if ($.k2l.m8a21_3.index < $.k2l.m8a21_3.answer_index.length-1) {
					$.k2l.m8a21_3.index++;
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$.k2l.m8a21_3.allowClick = true; 
					}, 1000);
				} else {
					setTimeout(function() {
						//reset variables
						$.k2l.m8a21_3.index = 0;
						$.k2l.m8a21_3.allowClick = true;

						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
			}
		}
		}
			
	},
	/*
	'click .pagination': function(evt) {
		$.k2l.m8a21_3.index = 0;
		$.k2l.m8a21_3.allowClick = true;
	}
	*/

});

Template.m8a21_3.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a21_3 == 'undefined') {
		$.k2l.m8a21_3 = {};
	};
					
	var answer_index = ["2"];

	$.k2l.m8a21_3.answer_index = answer_index;
	$.k2l.m8a21_3.index = 0;

	$.k2l.m8a21_3.allowClick = true;
}
