Template.m8a9.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m8a9_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m8a9.rendered = function() { 
		document.title = "Journey 2 English";
	
	setStartActivity(8,9);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 9, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}
Template.m8a9_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m8a9_2"); 
	} 
}); 
 
Template.m8a9_2.events({ 
 
}); 
 
Template.m8a9_2.rendered = function() {
}


Template.m8a9.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 9, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a9.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


