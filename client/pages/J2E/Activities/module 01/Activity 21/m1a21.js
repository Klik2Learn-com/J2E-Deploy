Template.m1a21.rendered = function() {

	document.title = "Journey 2 English";
	
	setStartActivity(1, 21);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(1, 21, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m1a21.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m1a21_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m1a21.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 1, 21, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m1a21.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
