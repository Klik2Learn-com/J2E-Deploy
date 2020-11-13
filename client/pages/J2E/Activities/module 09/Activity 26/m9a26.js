Template.m9a26.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m9a26_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m9a26.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(9,26);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(9, 26, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m9a26.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 9, 26, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m9a26.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m9a26_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a26_1"); 
	} 
}); 


Template.m9a26_1.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m9a26_1 == 'undefined') {
		$.k2l.m9a26_1 = {};
	};
	
	var dragDropAmount = 5;
	var selector = "#m9a26_1";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m9a26_1",
		nextPage: "#m9a26_2",
	};
	initDragDrop(selector, dragDropAmount, options);
}
