Template.m10Game.helpers({
	
	hardpath: function() {
		var path = Session.get('hardpath');
		if (path == true){
			return true;
		} else {
			return false;
		}
	}

});

Template.m10Game.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(10,29);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(10, 29, subpage);
			oldLocation = location.href;
		}
	}, 500);

  $('footer').removeClass('invisible');

  	if (Session.get('Easy_Correct') == undefined){
		Session.set('Easy_Correct', 0);
	};
	if (Session.get('R1_Correct') == undefined){
		Session.set('R1_Correct', 0);
	};
	if (Session.get('R2_Correct') == undefined){
		Session.set('R2_Correct', 0);
	};
	if (Session.get('R3_Correct') == undefined){
		Session.set('R3_Correct', 0);
	};
	if (Session.get('R4_Correct') == undefined){
		Session.set('R4_Correct', 0);
	};
	if (Session.get('R5_Correct') == undefined){
		Session.set('R5_Correct', 0);
	};
	if (Session.get('R6_Correct') == undefined){
		Session.set('R6_Correct', 0);
	};
	if (Session.get('R7_Correct') == undefined){
		Session.set('R7_Correct', 0);
	};
	if (Session.get('R8_Correct') == undefined){
		Session.set('R8_Correct', 0);
	};
	if (Session.get('R9_Correct') == undefined){
		Session.set('R9_Correct', 0);
	};
	if (Session.get('R10_Correct') == undefined){
		Session.set('R10_Correct', 0);
	};
	if (Session.get('R11_Correct') == undefined){
		Session.set('R11_Correct', 0);
	};
	if (Session.get('R12_Correct') == undefined){
		Session.set('R12_Correct', 0);
	};
	if (Session.get('R13_Correct') == undefined){
		Session.set('R13_Correct', 0);
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

Template.m10Game.events({
	
	'click .game-begin': function(evt) {

	Session.set("activeSection", "#m10Game_1");
	 },

	 'click .roadsign': function(evt){
	 	Session.set('Easy_Correct', 0);
	 	Session.set('R1_Correct', 0);
	 	Session.set('R2_Correct', 0);
	 	Session.set('R3_Correct', 0);
	 	Session.set('R4_Correct', 0);
	 	Session.set('R5_Correct', 0);
	 	Session.set('R6_Correct', 0);
	 	Session.set('R7_Correct', 0);
	 	Session.set('R8_Correct', 0);
	 	Session.set('R9_Correct', 0);
	 	Session.set('R10_Correct', 0);
	 	Session.set('R11_Correct', 0);
	 	Session.set('R12_Correct', 0);
	 	Session.set('R13_Correct', 0);
	Session.set('Easy_Incorrect', 0);
	Session.set('Hard_Correct', 0);
	Session.set('Hard_Incorrect', 0);
	Session.set('hardpath', false);
	 }, 

	 'click .roadsign-left': function(evt){
	 	Session.set('Easy_Correct', 0);
	 	Session.set('R1_Correct', 0);
	 	Session.set('R2_Correct', 0);
	 	Session.set('R3_Correct', 0);
	 	Session.set('R4_Correct', 0);
	 	Session.set('R5_Correct', 0);
	 	Session.set('R6_Correct', 0);
	 	Session.set('R7_Correct', 0);
	 	Session.set('R8_Correct', 0);
	 	Session.set('R9_Correct', 0);
	 	Session.set('R10_Correct', 0);
	 	Session.set('R11_Correct', 0);
	 	Session.set('R12_Correct', 0);
	 	Session.set('R13_Correct', 0);
	Session.set('Easy_Incorrect', 0);
	Session.set('Hard_Correct', 0);
	Session.set('Hard_Incorrect', 0);
	Session.set('hardpath', false);
	 }
});


Template.m10Game.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 10, 29, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m10Game.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

