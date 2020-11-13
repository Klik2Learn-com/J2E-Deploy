Template.m7a13.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m7a13_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m7a13.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(7, 13);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(7, 13, subpage);
			oldLocation = location.href;
		}
	}, 500);

}
Template.m7a13_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a13_2"); 
	} 
}); 
 
Template.m7a13_2.events({
	"click .button1": function(evt){
		
		if ($.k2l.m7a13_2.allowClick == true) {
			
			$.k2l.m7a13_2.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m7a13_2.answer_index[$.k2l.m7a13_2.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				
				
				if ($.k2l.m7a13_2.index < $.k2l.m7a13_2.question.length-1) {
					$.k2l.m7a13_2.index++;
					setTimeout(function() {
						
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$('.number').html($.k2l.m7a13_2.index+1);
						$('#question_text').html($.k2l.m7a13_2.question[$.k2l.m7a13_2.index]);
						$.k2l.m7a13_2.allowClick = true; // Make the buttons clickable again
						
					}, 1000);
				} else {
					// Load the next page automatically
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m7a13_2.index = 0;
					$.k2l.m7a13_2.allowClick = true; // Make the buttons clickable again
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
					$.k2l.m7a13_2.allowClick = true; // Make the buttons clickable again
				}, 1000);
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m7a13_2.index = 0;
		$.k2l.m7a13_2.allowClick = true;
	}

});

Template.m7a13_2.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a13_2 == 'undefined') {
		$.k2l.m7a13_2 = {};
	};
	
	var questions = ["When he was growing up, Fiennes was a good looking boy.",
	"Fiennes was exploring Oman in 1992 when his team discovered the lost city of Ubar.",
	"When he was trekking to the North Pole in 2000 he got frostbite and had to have his fingertips amputated.",
	"In 2003 Harry was working as a volunteer in Lesotho.",
	"When the swimmers were training, some people even teased him about his long arms.",
	"When he was young, his father was constantly uprooting the family to find new work.",
	'When he was doing his army training Harry’s pals called him the “Ginger Bullet Magnet.”',
	"While he was training for his first Olympics, Michael even went into the pool on Christmas Day.",
	"In 2003, he was waiting for take off from Bristol airport when he suffered a major heart attack.",
	"As a result, Tom was always establishing himself over and over again at new schools.",
	'“My heart was pounding, I was sweating, and I felt as if I was going to vomit.”'];	
	
					
	var answer_index = ["1","2","2","1","2","1","2","2","2","1","1"];
	
	$.k2l.m7a13_2.question = questions;	
	$.k2l.m7a13_2.answer_index = answer_index;
	$.k2l.m7a13_2.index = 0;
	$.k2l.m7a13_2.allowClick = true;
}


Template.m7a13.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 7, 13, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m7a13.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
