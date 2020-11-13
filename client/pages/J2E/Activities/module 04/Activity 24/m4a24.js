

Template.m4a24.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m4a24_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m4a24.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 24, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a24.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m4a24.events({
	
	"click .button2": function(evt){
		
		if ($.k2l.m4a24.allowClick == true) {
			$.k2l.m4a24.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m4a24.answer_index[$.k2l.m4a24.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m4a24.index++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
					}, 1000);				
					
					if ($.k2l.m4a24.index >= $.k2l.m4a24.answer_index.length) {
					
						
							$.k2l.m4a24.index = 0;
							setTimeout (function() {
							$('#welldonecap').removeClass('hidden');
							}, 1000);
						
						setTimeout(function() {
						$('#welldonecap').addClass('hidden');
						$.k2l.m4a24.allowClick = true; // Make the buttons clickable again
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
					// $('.pagination').removeClass('hidden');
				}else{
					setTimeout(function() {
						$('#welldonecap').addClass('hidden');
						$.k2l.m4a24.allowClick = true; // Make the buttons clickable again
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 1000);
				}}
				 else {				
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$.k2l.m4a24.allowClick = true; // Make the buttons clickable again
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		$.k2l.m4a24.index = 0;
		$.k2l.m4a24.allowClick = true;
	}

});

Template.m4a24.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(4, 24);

	    var oldLocation = location.href;
  $.locationInterval = setInterval( function() {
    if(location.href != oldLocation) {
      subpage = location.href.split("#")[1];
      setLatestSubPage(4, 24, subpage);
      oldLocation = location.href;
    }
  }, 500);

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m4a24 == 'undefined') {
		$.k2l.m4a24 = {};
	};
	
	var answer_index = ["1","2","1","1","2"];
	
	$.k2l.m4a24.answer_index = answer_index;
	$.k2l.m4a24.index = 0;

	$.k2l.m4a24.allowClick = true;
}

Template.m4a24_5.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a24_5");
	}
});

Template.m4a24_6.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a24_6");
	}
});

Template.m4a24_7.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a24_7");
	}
});

Template.m4a24_8.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a24_8");
	}
});

Template.m4a24_9.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a24_9");
	}
});
