Template.m4a19.events({
	
	"click .button2": function(evt){
		
		if ($.k2l.m4a19_1.allowClick == true) {
			$.k2l.m4a19_1.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m4a19_1.answer_index[$.k2l.m4a19_1.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m4a19_1.index++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
					setTimeout(function() {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
					}, 1000);				
					// setTimeout (function() {
					// 	$('#welldonecap').removeClass('hidden');
					// }, 1000);
					if ($.k2l.m4a19_1.index >= $.k2l.m4a19_1.answer_index.length) {
							$.k2l.m4a19_1.index = 0;
							setTimeout (function() {
						$('#welldonecap').removeClass('hidden');
					}, 1000);
							setTimeout(function() {
						
						$('#welldonecap').addClass('hidden');
						$.k2l.m4a19_1.allowClick = true; // Make the buttons clickable again
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
						}
					setTimeout(function() {
						
						$('#welldonecap').addClass('hidden');
						$.k2l.m4a19_1.allowClick = true; // Make the buttons clickable again
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 1000);
					// $('.pagination').removeClass('hidden');
				} else {				
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$.k2l.m4a19_1.allowClick = true; // Make the buttons clickable again
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
		}
		}
			
	},
	
	'click .pagination': function(evt) {
		$.k2l.m4a19_1.index = 0;
		$.k2l.m4a19_1.allowClick = true;
	}

});

Template.m4a19_1.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m4a19_1 == 'undefined') {
		$.k2l.m4a19_1 = {};
	};
	
	var answer_index = ["3","3","1","1","2","1"];
	
	$.k2l.m4a19_1.answer_index = answer_index;
	$.k2l.m4a19_1.index = 0;

	$.k2l.m4a19_1.allowClick = true;
}
				

Template.m4a19.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m4a19_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m4a19.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(4, 19);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 19, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m4a19.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 19, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a19.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m4a19_7.events({
	
	"click .space-find": function(evt){
		
		
		if ($(evt.currentTarget).attr('data-content') == "true") {
			var currentSection = $(evt.currentTarget).parents('section');
			var nextSection = $(evt.currentTarget).parents('section').next('section');
			
			
			$(evt.currentTarget).children().removeClass('invisible');
			$(evt.currentTarget).removeClass('space-find');
			$(evt.currentTarget).addClass('space-find2');
			$.k2l.m4a19_7.index++;
			if ($.k2l.m4a19_7.index == 3){
				$("#welldonecap").removeClass("hidden");
				setTimeout(function(){
				$("#welldonecap").addClass("hidden");
				$(".space-find2").addClass('space-find');
				$(".space-find").removeClass('space-find2');
				$(".space-find").children().removeClass('invisible');
				$.k2l.m4a19_7.index = 0;
				currentSection.addClass('hidden'); // hide this page
				nextSection.removeClass('hidden');// reveal next page
				document.location.hash = nextSection.attr('id'); // change the hash
				Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
			}, 1500);
			};
		} else {
			$(evt.currentTarget).children().removeClass('invisible');
			$(evt.currentTarget).removeClass('space-find');
			setTimeout(function(){
				$(evt.currentTarget).children().addClass('invisible');
			}, 1000)
		}			
	},
	
	'click .pagination': function(evt) {
		 $.k2l.m4a19_7.index = 0;		
	}

});

Template.m4a19_7.rendered = function (){
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m4a19_7 == 'undefined') {
		$.k2l.m4a19_7 = {};
	};
	
	$.k2l.m4a19_7.index = 0;
}

Template.m4a19_1b.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m4a19_1b");
	}
})
Template.m4a19_2.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m4a19_2");
	}
})
Template.m4a19_3.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m4a19_3");
	}
})
Template.m4a19_4.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m4a19_4");
	}
})
Template.m4a19_5.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m4a19_5");
	}
})
Template.m4a19_6.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m4a19_6");
	}
})
Template.m4a19_7.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m4a19_7");
	}
})

