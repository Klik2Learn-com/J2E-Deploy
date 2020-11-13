Template.m5a3.events({

	"click .button1": function(evt){
		
		if ($.k2l.m5a3.allowClick === true) {
			$.k2l.m5a3.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m5a3.answer_index[$.k2l.m5a3.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m5a3.index++;
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
					if ($.k2l.m5a3.index >= $.k2l.m5a3.answer_index.length) {
						$.k2l.m5a3.index = 0;
					}
					$('#welldonecap').addClass('hidden');
						$.k2l.m5a3.allowClick = true; // Make the buttons clickable again
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
					// $('.pagination').removeClass('hidden');
				} else {
					$('.incorrectscreen').removeClass('hidden');
					setTimeout( function() {
					$.k2l.m5a3.allowClick = true; // Make the buttons clickable again
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
				}
			}

		},

		'click .pagination': function(evt) {
		// $.k2l.m5a3.index = 0;
		$.k2l.m5a3.allowClick = true;
	}

});

Template.m5a3_2.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	}

	if (typeof $.k2l.m5a3 == 'undefined') {
		$.k2l.m5a3 = {};
	}

	var answer_index = ["4","2","3","4","3","1","1","4","3","1","4","1","3","4"];

	$.k2l.m5a3.answer_index = answer_index;
	$.k2l.m5a3.index = 0;

	$.k2l.m5a3.allowClick = true;
};


Template.m5a3.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 5, 3, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m5a3.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m5a3.helpers({
	endPageSect: function() {
		var session = Session.get('activeSection');
		if (session == '#m5a3_end') {
			return false;
		}
		return true;
	},

	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m5a3");
	}
})

Template.m5a3.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m5a3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m5a3.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m5a3.sound.src = {};
	}

});

Template.m5a3.rendered = function() {

	document.title = "Journey 2 English";
	
	setStartActivity(5, 3);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(5, 3, subpage);
			oldLocation = location.href;
		}
	}, 500);

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m5a3 == 'undefined') {
		$.k2l.m5a3 = {};
	};
	
	$.k2l.m5a3.sound = new Audio();
}

Template.m5a3_2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a3_2");
	}
});


Template.m5a3_4.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a3_4");
	}
});


Template.m5a3_6.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a3_6");
	}
});


Template.m5a3_8.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a3_8");
	}
});


Template.m5a3_10.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a3_10");
	}
});


Template.m5a3_12.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a3_12");
	}
});


Template.m5a3_14.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a3_14");
	}
});


Template.m5a3_16.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a3_16");
	}
});


Template.m5a3_18.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a3_18");
	}
});


Template.m5a3_20.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a3_20");
	}
});


Template.m5a3_22.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a3_22");
	}
});


Template.m5a3_24.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a3_24");
	}
});


Template.m5a3_26.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a3_26");
	}
});


Template.m5a3_28.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a3_28");
	}
});

