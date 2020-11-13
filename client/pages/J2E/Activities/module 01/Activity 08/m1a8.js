
Template.m1a8.helpers({
endPageSect: function() {
var session = Session.get('activeSection');
if (session == '#m1a8_end') {
 	return false;
	}
return true;
},

  activeSection: function(){
    var activeSection = Session.get("activeSection");
    
    return (activeSection == "#m1a8_conv1");
  }
});

Template.m1a8.events({
	"click .buttonaudio": function(evt){
		$(evt.currentTarget).attr('data-audiosrc', "/audio/module1/a8/" + $(evt.currentTarget).attr('id') + ".m4a");
		audioButtonClickSetup($.k2l.m1a8.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m1a8.sound, $(evt.currentTarget));
	},
	"click .pagination": function(evt){
		$.k2l.m1a8.sound.src = {};
	},
   "click .wrong-ans": function(evt){    
      // Show tick 
		
	    $('.incorrectscreen').removeClass('hidden');
		setTimeout( function() {
			$('.incorrectscreen').addClass('hidden');
		}, 1000);
		
	}, 
  "click .correct-ans1": function(evt){
      // Show tick 
	  $('.correctscreen').removeClass('hidden');
	  setTimeout(function(){
		  var parentSection = $(evt.currentTarget).closest('section');
		  $('.correctscreen').addClass('hidden');
		  $(parentSection).next('section').removeClass('hidden');
		  $(parentSection).addClass('hidden');
		  Session.set('activeSection', $(parentSection).next('section').attr('id'));
		}, 2000);

		$.k2l.m1a8.sound.src = {};
	},

  "click .correct-ans2": function(evt){
      // Show tick 
	    $('.correctscreen').removeClass('hidden');
	     setTimeout(function(){
		  var parentSection = $(evt.currentTarget).closest('section');
		  $('.correctscreen').addClass('hidden');
		  
		  $(parentSection).next('section').removeClass('hidden');
		  $(parentSection).addClass('hidden');
		  Session.set('activeSection', $(parentSection).next('section').attr('id'));
		}, 2000);
		
		$.k2l.m1a8.sound.src = {};
	},

  "click .correct-ans3": function(evt){
      // Show tick 
	   $('.correctscreen').removeClass('hidden');
	    setTimeout(function(){
		  var parentSection = $(evt.currentTarget).closest('section');
		  $('.correctscreen').addClass('hidden');
		  
		  $(parentSection).next('section').removeClass('hidden');
		  $(parentSection).addClass('hidden');
		  Session.set('activeSection', $(parentSection).next('section').attr('id'));
		}, 2000);
		
		$.k2l.m1a8.sound.src = {};
	},

  "click .correct-ans4": function(evt){
      // Show tick 
	   $('.correctscreen').removeClass('hidden');
	    setTimeout(function(){
		  var parentSection = $(evt.currentTarget).closest('section');
		  $('.correctscreen').addClass('hidden');
		  
		  $(parentSection).next('section').removeClass('hidden');
		  $(parentSection).addClass('hidden');
		  Session.set('activeSection', $(parentSection).next('section').attr('id'));
		}, 2000);
		
		$.k2l.m1a8.sound.src = {};
	},

 "click .correct-ans5": function(evt){
      // Show tick 
	   $('.correctscreen').removeClass('hidden');
	    setTimeout(function(){
		  var parentSection = $(evt.currentTarget).closest('section');
		  $('.correctscreen').addClass('hidden');
		  
		  $(parentSection).next('section').removeClass('hidden');
		  $(parentSection).addClass('hidden');
		  Session.set('activeSection', $(parentSection).next('section').attr('id'));
		}, 2000);
		
		$.k2l.m1a8.sound.src = {};
	},
	
  "click a.restart": function(evt){

		/*$("#m1a8_conv1>footer>nav>ul>li>a[rel='next']").addClass("hidden");
		$("#m1a8_conv2>footer>nav>ul>li>a[rel='next']").addClass("hidden");
		$("#m1a8_conv3>footer>nav>ul>li>a[rel='next']").addClass("hidden");
		$("#m1a8_conv4>footer>nav>ul>li>a[rel='next']").addClass("hidden");
		$("#m1a8_conv5>footer>nav>ul>li>a[rel='next']").addClass("hidden");*/
		$('.correctscreen').addClass('hidden');
		$('.incorrectscreen').addClass('hidden');
	}
});

Template.m1a8.rendered = function() {
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m1a8 == 'undefined') {
		$.k2l.m1a8 = {};
	};
	
	$.k2l.m1a8.sound = new Audio();
	setStartActivity(1, 8);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(1, 8, subpage);
			oldLocation = location.href;
		}
	}, 500);

	document.title = "Journey 2 English";

}


Template.m1a8.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 1, 8, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m1a8.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
