Template.m4Game.helpers({
	
	hardpath: function() {
		var path = Session.get('hardpath');
		if (path == true){
			return true;
		} else {
			return false;
		}
	}

});

Template.m4Game.rendered = function () {

	document.title = "Journey 2 English";
	
	setStartActivity(4,31);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 31, subpage);
			oldLocation = location.href;
		}
	}, 500);

  $('footer').removeClass('invisible');

  	if (Session.get('Easy_Correct') == undefined){
		Session.set('Easy_Correct', 0);
	};
	if (Session.get('Easy_Incorrect') == undefined){
		Session.set('Easy_Incorrect', 0);
	};
	if (Session.get('Hard_Correct') == undefined){
		Session.set('Hard_Correct', 0);
	};
	if (Session.get('Hard_Incorrect') == undefined){
		Session.set('Hard_Incorrect', 0);
	};

};

Template.m4Game.events({
	
	'click .game-begin': function(evt) {

	Session.set("activeSection", "#m4Game_1");
	 },

	 'click .roadsign': function(evt){
	 	Session.set('Easy_Correct', 0);
	Session.set('Easy_Incorrect', 0);
	Session.set('Hard_Correct', 0);
	Session.set('Hard_Incorrect', 0);
	Session.set('hardpath', false);
	 }, 

	 'click .roadsign-left': function(evt){
	 	Session.set('Easy_Correct', 0);
	Session.set('Easy_Incorrect', 0);
	Session.set('Hard_Correct', 0);
	Session.set('Hard_Incorrect', 0);
	Session.set('hardpath', false);
	 }
});

Template.m4Game.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 31, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4Game.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
