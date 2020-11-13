Template.m8a31.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m8a31_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m8a31.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(8,31);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 31, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m8a31.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 31, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a31.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m8a31_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a31_1"); 
	} 
}); 

Template.m8a31_1.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a31_1 == 'undefined') {
		$.k2l.m8a31_1 = {};
	};
	var dragDropAmount = 5;
	var selector = "#m8a31_1";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a31_1",
		nextPage: "#m8a31_2",
	};
	initDragDrop(selector, dragDropAmount, options);
}

