Template.m6a24.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m6a24_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m6a24.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(6, 24);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(6, 24, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m6a24.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 6, 24, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m6a24.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m6a24_2.rendered = function() {
	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m6a24_2";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}