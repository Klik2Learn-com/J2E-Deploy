Template.m2a13.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m2a13_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m2a13.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(2, 13);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 13, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m2a13.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 13, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m2a13.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
