

Template.m4a3.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m4a3_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m4a3.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(4, 3);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 3, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m4a3.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 3, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a3.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m4a3_3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a3_3");
	}
});

Template.m4a3_3.events({
	'click .paraclick-word-sleep': function(evt) {
		if ($(evt.target).hasClass('correctword')){
				return;
		}
	var parentSection = $(evt.currentTarget).parents('section');
    if($.k2l.m4a3_3.questionWordLock == false && $.k2l.m4a3_3.stuckFlag == false){
      $.k2l.m4a3_3.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m4a3_3.questionWordLock = false;
      }, 1000);
			$('.paraclick-word-sleep').addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m4a3_3.index--;
      $(".counterleft u").html($.k2l.m4a3_3.index);

      if($.k2l.m4a3_3.index <=0){
      $('.pagination').removeClass('hidden');
	  $('.stuck').addClass('hidden');
      }
    }
	},

	'click .paraclick-word': function(evt) {
		if ($(evt.target).hasClass('correctword')){
				return;
		}
	var parentSection = $(evt.currentTarget).parents('section');
    if($.k2l.m4a3_3.questionWordLock == false && $.k2l.m4a3_3.stuckFlag == false){
      $.k2l.m4a3_3.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m4a3_3.questionWordLock = false;
      }, 1000);
      $(evt.target).addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m4a3_3.index--;
      $(".counterleft u").html($.k2l.m4a3_3.index);

      if($.k2l.m4a3_3.index <=0){
    $('.pagination').removeClass('hidden');
	$('.stuck').addClass('hidden');
      }
    }
	},

  'click .wrong': function(evt) {

    if($.k2l.m4a3_3.questionWordLock == false && $.k2l.m4a3_3.stuckFlag == false){
      $.k2l.m4a3_3.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m4a3_3.questionWordLock = false;
      }, 1000);
      $('.incorrectscreen').removeClass("hidden");
      setTimeout(function(){
        $('.incorrectscreen').addClass("hidden");
      }, 1000);
      $.k2l.m4a3_3.wrongscore++;

      if($.k2l.m4a3_3.wrongscore > 2){
        $('.stuck').removeClass('hidden');
      }

    }
	},
  'click .stuck': function(evt) {
    $('.stuck').addClass('hidden');
    $.k2l.m4a3_3.wrongscore = 0;
    $.k2l.m4a3_3.index = 0;
    $(".counterleft u").html($.k2l.m4a3_3.index);
    $('.paraclick-word').addClass('correctword');
    $('.paraclick-word-sleep').addClass('correctword');
    $('#m4a3_3 .navfooter a').removeClass('hidden');
    $.k2l.m4a3_3.stuckFlag = true;
  },

  'click .navfooter a': function(evt) {
    $('#m4a3_3 .navfooter a').addClass('hidden');
    $('.paraclick-word').removeClass('correctword');
    $.k2l.m4a3_3.wrongscore = 0;
    $.k2l.m4a3_3.index = 11;
		$.k2l.m4a3_3.stuckFlag = false;
    $(".counterleft u").html($.k2l.m4a3_3.index);
  }

});

Template.m4a3_3.rendered = function() {
  if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m4a3_3 == 'undefined') {
		$.k2l.m4a3_3 = {};
	};

	$.k2l.m4a3_3.index = 11;
  $.k2l.m4a3_3.wrongscore = 0;
  $.k2l.m4a3_3.stuckFlag = false;
  $.k2l.m4a3_3.questionWordLock = false;

}

