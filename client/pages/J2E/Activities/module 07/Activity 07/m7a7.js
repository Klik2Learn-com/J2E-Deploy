Template.m7a7.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m7a7_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m7a7.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(7, 7);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(7, 7, subpage);
			oldLocation = location.href;
		}
	}, 500);

}
Template.m7a7_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a7_1"); 
	} 
}); 
 
Template.m7a7_1.events({ 
 
	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a7_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a7_1.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		$.k2l.m7a7_1.sound.src = {};
	}
}); 
 
Template.m7a7_1.rendered = function() {


	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a7_1 == 'undefined') {
		$.k2l.m7a7_1 = {};
	};
	
	$.k2l.m7a7_1.sound = new Audio();
}


Template.m7a7_10.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a7_10"); 
	} 
}); 
 
Template.m7a7_10.events({ 
 
	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a7_10.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a7_10.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		$.k2l.m7a7_10.sound.src = {};
	}
}); 
 
Template.m7a7_10.rendered = function() {


	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a7_10 == 'undefined') {
		$.k2l.m7a7_10 = {};
	};
	
	$.k2l.m7a7_10.sound = new Audio();
}


Template.m7a7_11.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a7_11"); 
	} 
}); 
 
Template.m7a7_11.events({ 
 
}); 
 
Template.m7a7_11.rendered = function() {
}

Template.m7a7_12.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a7_12"); 
	} 
}); 
 
Template.m7a7_12.events({ 
 
}); 
 
Template.m7a7_12.rendered = function() {
}

Template.m7a7_13.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a7_13"); 
	} 
}); 
 
Template.m7a7_13.events({ 
 
}); 
 
Template.m7a7_13.rendered = function() {
}

Template.m7a7_14.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a7_14"); 
	} 
}); 
 
Template.m7a7_14.events({ 
 
}); 
 
Template.m7a7_14.rendered = function() {
}

Template.m7a7_15.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a7_15"); 
	} 
}); 
 
Template.m7a7_15.events({ 
 
}); 
 
Template.m7a7_15.rendered = function() {
}

Template.m7a7_16.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a7_16"); 
	} 
}); 
 
Template.m7a7_16.events({

	"click .pagination": function(evt){
		$.k2l.m7a7_16.draggedElement = {};
		$.k2l.m7a7_16.counter = 0;
	}
});

Template.m7a7_16.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a7_16 == 'undefined') {
		$.k2l.m7a7_16 = {};
	};
	
	$.k2l.m7a7_16.draggedElement = {};
	$.k2l.m7a7_16.counter = 0;

	// $.k2l.m7a7_16.max = 2; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m7a7_16";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a7_16",
		nextPage: "#m7a7_17"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m7a7_17.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a7_17"); 
	} 
}); 
 
Template.m7a7_17.events({

	"click .pagination": function(evt){
		$.k2l.m7a7_17.draggedElement = {};
		$.k2l.m7a7_17.counter = 0;
	}
});

Template.m7a7_17.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a7_17 == 'undefined') {
		$.k2l.m7a7_17 = {};
	};
	
	$.k2l.m7a7_17.draggedElement = {};
	$.k2l.m7a7_17.counter = 0;

	// $.k2l.m7a7_17.max = 2; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m7a7_17";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a7_17",
		nextPage: "#m7a7_18"
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m7a7_18.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a7_18"); 
	} 
}); 
 
Template.m7a7_18.events({

	"click .pagination": function(evt){
		$.k2l.m7a7_18.draggedElement = {};
		$.k2l.m7a7_18.counter = 0;
	}
});

Template.m7a7_18.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a7_18 == 'undefined') {
		$.k2l.m7a7_18 = {};
	};
	
	$.k2l.m7a7_18.draggedElement = {};
	$.k2l.m7a7_18.counter = 0;

	//$.k2l.m7a7_18.max = 2; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m7a7_18";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a7_18",
		nextPage: "#m7a7_19"
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m7a7_19.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a7_19"); 
	} 
}); 
 
Template.m7a7_19.events({

	"click .pagination": function(evt){
		$.k2l.m7a7_19.draggedElement = {};
		$.k2l.m7a7_19.counter = 0;
	}
});

Template.m7a7_19.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a7_19 == 'undefined') {
		$.k2l.m7a7_19 = {};
	};
	
	$.k2l.m7a7_19.draggedElement = {};
	$.k2l.m7a7_19.counter = 0;

	// $.k2l.m7a7_19.max = 2; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m7a7_19";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a7_19",
		nextPage: "#m7a7_20"
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m7a7_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a7_2"); 
	} 
}); 
 
Template.m7a7_2.events({ 
 
	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a7_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a7_2.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		$.k2l.m7a7_2.sound.src = {};
	}
}); 
 
Template.m7a7_2.rendered = function() {


	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a7_2 == 'undefined') {
		$.k2l.m7a7_2 = {};
	};
	
	$.k2l.m7a7_2.sound = new Audio();
}


Template.m7a7_20.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a7_20"); 
	} 
}); 
 
Template.m7a7_20.events({

	"click .pagination": function(evt){
		$.k2l.m7a7_20.draggedElement = {};
		$.k2l.m7a7_20.counter = 0;
	}
});

Template.m7a7_20.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a7_20 == 'undefined') {
		$.k2l.m7a7_20 = {};
	};
	
	$.k2l.m7a7_20.draggedElement = {};
	$.k2l.m7a7_20.counter = 0;

	$.k2l.m7a7_20.max = 2; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m7a7_20";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a7_20",
		nextPage: "#m7a7_21"
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m7a7_21.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a7_21"); 
	} 
}); 
 
Template.m7a7_21.events({

	"click .pagination": function(evt){
		$.k2l.m7a7_21.draggedElement = {};
		$.k2l.m7a7_21.counter = 0;
	}
});

Template.m7a7_21.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a7_21 == 'undefined') {
		$.k2l.m7a7_21 = {};
	};
	
	$.k2l.m7a7_21.draggedElement = {};
	$.k2l.m7a7_21.counter = 0;

	$.k2l.m7a7_21.max = 2; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m7a7_21";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a7_21",
		nextPage: "#m7a7_22"
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m7a7_22.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a7_22"); 
	} 
}); 
 
Template.m7a7_22.events({

	"click .pagination": function(evt){
		$.k2l.m7a7_22.draggedElement = {};
		$.k2l.m7a7_22.counter = 0;
	}
});

Template.m7a7_22.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a7_22 == 'undefined') {
		$.k2l.m7a7_22 = {};
	};
	
	$.k2l.m7a7_22.draggedElement = {};
	$.k2l.m7a7_22.counter = 0;

	// $.k2l.m7a7_22.max = 2; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m7a7_22";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a7_22",
		nextPage: "#m7a7_23"
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m7a7_23.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a7_23"); 
	} 
}); 
 
Template.m7a7_23.events({

	"click .pagination": function(evt){
		$.k2l.m7a7_23.draggedElement = {};
		$.k2l.m7a7_23.counter = 0;
	}
});

Template.m7a7_23.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a7_23 == 'undefined') {
		$.k2l.m7a7_23 = {};
	};
	
	$.k2l.m7a7_23.draggedElement = {};
	$.k2l.m7a7_23.counter = 0;

	// $.k2l.m7a7_23.max = 2; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m7a7_23";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a7_23",
		nextPage: "#m7a7_24"
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m7a7_24.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a7_24"); 
	} 
}); 
 
Template.m7a7_24.events({

	"click .pagination": function(evt){
		$.k2l.m7a7_24.draggedElement = {};
		$.k2l.m7a7_24.counter = 0;
	}
});

Template.m7a7_24.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a7_24 == 'undefined') {
		$.k2l.m7a7_24 = {};
	};
	
	$.k2l.m7a7_24.draggedElement = {};
	$.k2l.m7a7_24.counter = 0;

	// $.k2l.m7a7_24.max = 2; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m7a7_24";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a7_24",
		nextPage: "#m7a7_25"
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m7a7_25.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a7_25"); 
	} 
}); 
 
Template.m7a7_25.events({

	"click .pagination": function(evt){
		$.k2l.m7a7_25.draggedElement = {};
		$.k2l.m7a7_25.counter = 0;
	}
});

Template.m7a7_25.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a7_25 == 'undefined') {
		$.k2l.m7a7_25 = {};
	};
	
	$.k2l.m7a7_25.draggedElement = {};
	$.k2l.m7a7_25.counter = 0;

	// $.k2l.m7a7_25.max = 2; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m7a7_25";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a7_25",
		nextPage: "#m7a7_26"
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m7a7_26.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a7_26"); 
	} 
}); 
 
Template.m7a7_26.events({

	"click .pagination": function(evt){
		$.k2l.m7a7_26.draggedElement = {};
		$.k2l.m7a7_26.counter = 0;
	}
});

Template.m7a7_26.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a7_26 == 'undefined') {
		$.k2l.m7a7_26 = {};
	};
	
	$.k2l.m7a7_26.draggedElement = {};
	$.k2l.m7a7_26.counter = 0;

	// $.k2l.m7a7_26.max = 2; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 2;
	var selector = "#m7a7_26";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a7_26",
		nextPage: "#m7a7_end"
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m7a7_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a7_3"); 
	} 
}); 
 
Template.m7a7_3.events({ 
 
	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a7_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a7_3.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		$.k2l.m7a7_3.sound.src = {};
	}
}); 
 
Template.m7a7_3.rendered = function() {


	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a7_3 == 'undefined') {
		$.k2l.m7a7_3 = {};
	};
	
	$.k2l.m7a7_3.sound = new Audio();
}


Template.m7a7_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a7_4"); 
	} 
}); 
 
Template.m7a7_4.events({ 
 
	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a7_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a7_4.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		$.k2l.m7a7_4.sound.src = {};
	}
}); 
 
Template.m7a7_4.rendered = function() {


	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a7_4 == 'undefined') {
		$.k2l.m7a7_4 = {};
	};
	
	$.k2l.m7a7_4.sound = new Audio();
}


Template.m7a7_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a7_5"); 
	} 
}); 
 
Template.m7a7_5.events({ 
 
	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a7_5.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a7_5.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		$.k2l.m7a7_5.sound.src = {};
	}
}); 
 
Template.m7a7_5.rendered = function() {


	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a7_5 == 'undefined') {
		$.k2l.m7a7_5 = {};
	};
	
	$.k2l.m7a7_5.sound = new Audio();
}


Template.m7a7_6.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a7_6"); 
	} 
}); 
 
Template.m7a7_6.events({ 
 
	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a7_6.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a7_6.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		$.k2l.m7a7_6.sound.src = {};
	}
}); 
 
Template.m7a7_6.rendered = function() {


	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a7_6 == 'undefined') {
		$.k2l.m7a7_6 = {};
	};
	
	$.k2l.m7a7_6.sound = new Audio();
}


Template.m7a7_7.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a7_7"); 
	} 
}); 
 
Template.m7a7_7.events({ 
 
	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a7_7.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a7_7.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		$.k2l.m7a7_7.sound.src = {};
	}
}); 
 
Template.m7a7_7.rendered = function() {


	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a7_7 == 'undefined') {
		$.k2l.m7a7_7 = {};
	};
	
	$.k2l.m7a7_7.sound = new Audio();
}


Template.m7a7_8.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a7_8"); 
	} 
}); 
 
Template.m7a7_8.events({ 
 
	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a7_8.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a7_8.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		$.k2l.m7a7_8.sound.src = {};
	}
}); 
 
Template.m7a7_8.rendered = function() {


	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a7_8 == 'undefined') {
		$.k2l.m7a7_8 = {};
	};
	
	$.k2l.m7a7_8.sound = new Audio();
}


Template.m7a7_9.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a7_9"); 
	} 
}); 
 
Template.m7a7_9.events({ 
 
	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a7_9.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a7_9.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		$.k2l.m7a7_9.sound.src = {};
	}
}); 
 
Template.m7a7_9.rendered = function() {


	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a7_9 == 'undefined') {
		$.k2l.m7a7_9 = {};
	};
	
	$.k2l.m7a7_9.sound = new Audio();
}



Template.m7a7.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 7, 7, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m7a7.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
