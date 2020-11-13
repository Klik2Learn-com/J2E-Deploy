Template.m1a22.events({
	
	"click .buttonaudio": function(evt){
		var image = {};
		
		$.k2l.m1a22.sound.pause();
		$.k2l.m1a22.sound.currentTime = 0;
		$.k2l.m1a22.imageCounter = 0;
		$.k2l.m1a22.sound.play();
		
		$.k2l.m1a22.imageSwapper = setInterval(function (){
			image = $.k2l.m1a22.images[$.k2l.m1a22.imageCounter];
			if ($.k2l.m1a22.imageCounter < $.k2l.m1a22.images.length) {
				$.k2l.m1a22.imageCounter++;
				$('#displayImage').attr('src', 'images/activity22/' + image);
			} else {
				clearInterval($.k2l.m1a22.imageSwapper);
				$.k2l.m1a22.imageCounter = 0;
			};
			
		}, 3000);
		
		
	},
	
	"click .pagination" : function(evt) {
		$.k2l.m1a22.sound.pause();
		$.k2l.m1a22.sound.currentTime = 0;
		clearInterval($.k2l.m1a22.imageSwapper);
		$.k2l.m1a22.imageCounter = 0;
	}
	
})

Template.m1a22.rendered = function(){

	document.title = "Journey 2 English";
	
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m1a22 == 'undefined') {
		$.k2l.m1a22 = {};
	};
	
	$.k2l.m1a22.images = ["activity_1.png", "activity_2.png", "activity_3.png", "activity_4.png", "activity_5.png", "activity__6.png"];
	$.k2l.m1a22.sound = new Audio;
	$.k2l.m1a22.sound.src = "audio/module1/a22/act_12_hi_im_david_i_dont_think.m4a"
	$.k2l.m1a22.imageCounter = 0;
	$.k2l.m1a22.imageSwapper = {};

	setStartActivity(1, 22);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(1, 22, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m1a22.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m1a22_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m1a22.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 1, 22, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m1a22.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m1a22_1.helpers({
  activeSection: function(){
    var activeSection = Session.get("activeSection");
    return (activeSection == "#m1a22_1");
  }
});

Template.m1a22_2.helpers({
  activeSection: function(){
    var activeSection = Session.get("activeSection");
    return (activeSection == "#m1a22_2");
  }
});

Template.m1a22_3.helpers({
  activeSection: function(){
    var activeSection = Session.get("activeSection");
    return (activeSection == "#m1a22_3");
  }
});


