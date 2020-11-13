Template.m4a6.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m4a6_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m4a6.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(4, 6);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 6, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m4a6.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 6, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a6.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
