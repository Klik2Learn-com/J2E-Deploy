Template.m9a14.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m9a14_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m9a14.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(9,14);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(9, 14, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m9a14.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 9, 14, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m9a14.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
