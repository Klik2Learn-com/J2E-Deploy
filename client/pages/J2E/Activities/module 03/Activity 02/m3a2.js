Template.m3a2.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m3a2_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m3a2.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(3, 2);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(3, 2, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m3a2.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 3, 2, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m3a2.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
