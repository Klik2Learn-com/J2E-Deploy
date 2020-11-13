Template.m9a3.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m9a3_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m9a3.events({
	
	"click .button2": function(evt){
		
		if ($.k2l.m9a3.allowClick == true) {
			$.k2l.m9a3.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m9a3.answer_index[$.k2l.m9a3.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m9a3.index++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
					}, 1000);				
					setTimeout (function() {
						$('#welldonecap').removeClass('hidden');
					}, 1000);
					
					setTimeout(function() {
						if ($.k2l.m9a3.index > $.k2l.m9a3.answer_index.length) {
							$.k2l.m9a3.index = 0;
						}
						$.k2l.m9a3.sound.src = {};
						$('#welldonecap').addClass('hidden');
						$.k2l.m9a3.allowClick = true; // Make the buttons clickable again
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
					// $('.pagination').removeClass('hidden');
				} else {				
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$.k2l.m9a3.allowClick = true; // Make the buttons clickable again
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
		}
		}
			
	},

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m9a3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m9a3.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		$.k2l.m9a3.sound.src = {};
		$.k2l.m9a3.index = 0;
		$.k2l.m9a3.allowClick = true;
	}

});

Template.m9a3.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(9,2);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(9, 2, subpage);
			oldLocation = location.href;
		}
	}, 500);

		if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m9a3 == 'undefined') {
		$.k2l.m9a3 = {};
	};
	
	var answer_index = ["3","5","1","4","2","6","7"];
	
	$.k2l.m9a3.sound = new Audio();
	$.k2l.m9a3.answer_index = answer_index;
	$.k2l.m9a3.index = 0;

	$.k2l.m9a3.allowClick = true;
		
}

Template.m9a3.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 9, 3, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m9a3.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};



Template.m9a3_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a3_3"); 
	} 
}); 
 
Template.m9a3_3.events({ 
 
}); 
 
Template.m9a3_3.rendered = function() {
}

Template.m9a3_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a3_2"); 
	} 
}); 
 
Template.m9a3_2.events({ 
 
}); 
 
Template.m9a3_2.rendered = function() {
}

Template.m9a3_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a3_5"); 
	} 
}); 
 
Template.m9a3_5.events({ 
 
}); 
 
Template.m9a3_5.rendered = function() {
}

Template.m9a3_6.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a3_6"); 
	} 
}); 
 
Template.m9a3_6.events({ 
 
}); 
 
Template.m9a3_6.rendered = function() {
}

Template.m9a3_8.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a3_8"); 
	} 
}); 
 
Template.m9a3_8.events({ 
 
}); 
 
Template.m9a3_8.rendered = function() {
}

Template.m9a3_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a3_4"); 
	} 
}); 
 
Template.m9a3_4.events({ 
 
}); 
 
Template.m9a3_4.rendered = function() {
}

Template.m9a3_7.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a3_7"); 
	} 
}); 
 
Template.m9a3_7.events({ 
 
}); 
 
Template.m9a3_7.rendered = function() {
}
