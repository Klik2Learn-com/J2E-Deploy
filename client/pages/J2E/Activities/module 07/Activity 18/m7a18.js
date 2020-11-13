Template.m7a18.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m7a18_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m7a18.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(7, 18);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(7, 18, subpage);
			oldLocation = location.href;
		}
	}, 500);

}
Template.m7a18_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a18_2"); 
	} 
}); 
 
Template.m7a18_2.events({

	'click .buttonaudioc': function(evt) {
		;
		audioButtonClickSetup($.k2l.m7a18_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a18_2.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m7a18_2.sound.src = {};
	}

})


Template.m7a18_2.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a18_2 == 'undefined') {
		$.k2l.m7a18_2 = {};
	};
	
	$.k2l.m7a18_2.sound = new Audio();
}

Template.m7a18_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a18_3"); 
	} 
}); 
 
Template.m7a18_3.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a18_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a18_3.sound, $(evt.currentTarget));
	},
	
	"click .pagination": function(evt){
		$.k2l.m7a18_3.sound.src = {};
		$.k2l.m7a18_3.draggedElement = {};
		$.k2l.m7a18_3.counter = 0;
		$('#welldonecap').addClass('hidden');
	},

	"drop .ddseatedtarget": function (evt) {
		evt.preventDefault();
		
        if ($(evt.toElement).data("destination") == $(evt.target).data('destinationid')){
			$.k2l.m7a18_3.counter++;
			if($.k2l.m7a18_3.counter == $.k2l.m7a18_3.max){
				$("#pasttext").removeClass('hidden');
			}
        }
    }
});

Template.m7a18_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a18_3 == 'undefined') {
		$.k2l.m7a18_3 = {};
	};
	
	$.k2l.m7a18_3.sound = new Audio();
	$.k2l.m7a18_3.draggedElement = {};
	$.k2l.m7a18_3.counter = 0;

	// $.k2l.m7a18_3.max = 3; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m7a18_3";
	var options = {
		multiAns: true,
		autoNav: false,
		currPage: "#m7a18_3",
		nextPage: "#m7a18_4",
		currAudio: $.k2l.m7a18_3.sound
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m7a18_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a18_4"); 
	} 
}); 
 
Template.m7a18_4.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a18_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a18_4.sound, $(evt.currentTarget));
	},
	
	"click .pagination": function(evt){
		$.k2l.m7a18_4.sound.src = {};
		$.k2l.m7a18_4.draggedElement = {};
		$.k2l.m7a18_4.counter = 0;
		$('#welldonecap').addClass('hidden');
	},

	"drop .ddseatedtarget": function (evt) {
		evt.preventDefault();
		
        if ($(evt.toElement).data("destination") == $(evt.target).data('destinationid')){
			$.k2l.m7a18_4.counter++;
			if($.k2l.m7a18_4.counter == $.k2l.m7a18_4.max){
				$("#pasttext").removeClass('hidden');
			}
        }
    }
});

Template.m7a18_4.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a18_4 == 'undefined') {
		$.k2l.m7a18_4 = {};
	};
	
	$.k2l.m7a18_4.sound = new Audio();
	$.k2l.m7a18_4.draggedElement = {};
	$.k2l.m7a18_4.counter = 0;

	// $.k2l.m7a18_4.max = 2; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m7a18_4";
	var options = {
		multiAns: true,
		autoNav: false,
		currPage: "#m7a18_4",
		nextPage: "#m7a18_5",
		currAudio: $.k2l.m7a18_4.sound
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m7a18_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a18_5"); 
	} 
}); 
 
Template.m7a18_5.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a18_5.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a18_5.sound, $(evt.currentTarget));
	},
	
	"click .pagination": function(evt){
		$.k2l.m7a18_5.sound.src = {};
		$.k2l.m7a18_5.draggedElement = {};
		$.k2l.m7a18_5.counter = 0;
		$('#welldonecap').addClass('hidden');
	},

	"drop .ddseatedtarget": function (evt) {
		evt.preventDefault();
		
        if ($(evt.toElement).data("destination") == $(evt.target).data('destinationid')){
			$.k2l.m7a18_5.counter++;
			if($.k2l.m7a18_5.counter == $.k2l.m7a18_5.max){
				$("#pasttext").removeClass('hidden');
			}
        }
    }
});

Template.m7a18_5.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a18_5 == 'undefined') {
		$.k2l.m7a18_5 = {};
	};
	
	$.k2l.m7a18_5.sound = new Audio();
	$.k2l.m7a18_5.draggedElement = {};
	$.k2l.m7a18_5.counter = 0;

	// $.k2l.m7a18_5.max = 3; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m7a18_5";
	var options = {
		multiAns: true,
		autoNav: false,
		currPage: "#m7a18_5",
		nextPage: "#m7a18_6",
		currAudio: $.k2l.m7a18_5.sound
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m7a18_6.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a18_6"); 
	} 
}); 


Template.m7a18.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 7, 18, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m7a18.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
