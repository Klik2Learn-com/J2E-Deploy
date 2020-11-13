Template.m7a24.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m7a24_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m7a24.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(7, 24);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(7, 24, subpage);
			oldLocation = location.href;
		}
	}, 500);

}
Template.m7a24_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a24_1"); 
	} 
}); 
 

Template.m7a24_1.events({
	
	'click .pagination': function(evt) {
		$.k2l.mod7_idioms_MN.sound.src = {};
	}

});

Template.m7a24_1.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a24_1 == 'undefined') {
		$.k2l.m7a24_1 = {};
	};
	
	$.k2l.m7a24_1.sound = new Audio();
}


Template.m7a24_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a24_2"); 
	} 
}); 
 
Template.m7a24_2.events({ 
	'click .pagination': function(evt){
		$.k2l.mod7_idioms.sound.src = {};
	}
}); 
 
Template.m7a24_2.rendered = function() {
}

Template.m7a24_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a24_3"); 
	} 
}); 
 

Template.m7a24_3.events({

	"click .pagination": function(evt){
		$.k2l.m7a24_3.draggedElement = {};
		$.k2l.m7a24_3.counter = 0;
	}
});

Template.m7a24_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a24_3 == 'undefined') {
		$.k2l.m7a24_3 = {};
	};
	
	$.k2l.m7a24_3.draggedElement = {};
	$.k2l.m7a24_3.counter = 0;

	// $.k2l.m7a24_3.max = 4; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m7a24_3";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a24_3",
		nextPage: "#m7a24_4"
	};
	initDragDrop(selector, dragDropAmount, options);
}



Template.m7a24.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 7, 24, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m7a24.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
