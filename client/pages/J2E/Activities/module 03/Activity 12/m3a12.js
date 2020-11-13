Template.m3a12.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m3a12_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m3a12.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(3, 12);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(3, 12, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m3a12.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 3, 12, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m3a12.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
