Template.m7Game.helpers({
	
	hardpath: function() {
		var path = Session.get('hardpath');
		if (path == true){
			return true;
		} else {
			return false;
		}
	}

});

Template.m7Game.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(7,27);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(7, 27, subpage);
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

Template.m7Game.events({
	
	'click .game-begin': function(evt) {

	Session.set("activeSection", "#m7Game_1");
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

Template.m7Game.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 7, 27, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m7Game.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
