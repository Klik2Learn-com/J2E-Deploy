Template.m8a32.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m8a32_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m8a32.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(8,32);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 32, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m8a32.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 32, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a32.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m8a32_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a32_3"); 
	} 
}); 

Template.m8a32_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a32_3 == 'undefined') {
		$.k2l.m8a32_3 = {};
	};
	
	var dragDropAmount = 4;
	var selector = "#m8a32_3";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a32_3",
		nextPage: "#m8a32_4",
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m8a32_1.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m8a32_1");
	}
})

Template.m8a32_1.events({
	
	'click .pagination': function(evt) {
		$.k2l.mod8_idioms_OP.sound.src = {};
	}

});

Template.m8a32_1.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a32_1 == 'undefined') {
		$.k2l.m8a32_1 = {};
	};
	
	$.k2l.m8a32_1.sound = new Audio();
}


Template.m8a32_2.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m8a32_2");
	}
})

Template.m8a32_2.events({
	
	'click .pagination': function(evt) {
		$.k2l.mod8_idioms.sound.src = {};
	}

});

Template.m8a32_2.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a32_2 == 'undefined') {
		$.k2l.m8a32_2 = {};
	};
	
	$.k2l.m8a32_2.sound = new Audio();
}

