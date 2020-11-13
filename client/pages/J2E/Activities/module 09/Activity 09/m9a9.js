Template.m9a9.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m9a9_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m9a9.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(9,9);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(9, 9, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m9a9.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 9, 9, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m9a9.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m9a9_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a9_1");
	}
});

Template.m9a9_1.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m9a9_1 == 'undefined') {
		$.k2l.m9a9_1 = {};
	};
	
	var dragDropAmount = 9;
	var selector = "#m9a9_1";
	var options = {
		multiAns: true,
		autoNav : true,
		currPage: "#m9a9_1",
		nextPage: "#m9a9_end",
	};
	initDragDrop(selector, dragDropAmount, options);
}
