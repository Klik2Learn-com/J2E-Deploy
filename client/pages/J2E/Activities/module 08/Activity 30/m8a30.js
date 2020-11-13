Template.m8a30.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m8a30_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m8a30.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(8,30);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 30, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m8a30.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 30, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a30.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m8a30_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a30_2"); 
	} 
}); 

Template.m8a30_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m8a30_2 == 'undefined') {
		$.k2l.m8a30_2 = {};
	};
	
	var dragDropAmount = 6;
	var selector = "#m8a30_2";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a30_2",
		nextPage: "#m8a30_3",
	};
	initDragDrop(selector, dragDropAmount, options);
}

