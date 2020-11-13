Template.m6a19.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m6a19_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m6a19.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(6, 19);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(6, 19, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m6a19.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 6, 19, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m6a19.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m6a19_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m6a19_1"); 
	} 
}); 
 
Template.m6a19_1.events({ 
 
}); 
 
Template.m6a19_1.rendered = function() {
}

Template.m6a19_2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a19_2");
	}
});

Template.m6a19_2.events({
	'click .paraclick-word-sleep': function(evt) {
		if ($(evt.target).hasClass('correctword')){
				return;
		}
	var parentSection = $(evt.currentTarget).parents('section');
    if($.k2l.m6a19_2.questionWordLock == false && $.k2l.m6a19_2.stuckFlag == false){
      $.k2l.m6a19_2.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m6a19_2.questionWordLock = false;
      }, 1000);
			$('.paraclick-word-sleep').addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m6a19_2.index--;
      $(".counterleft u").html($.k2l.m6a19_2.index);

      if($.k2l.m6a19_2.index <=0){
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
    if($.k2l.m6a19_2.questionWordLock == false && $.k2l.m6a19_2.stuckFlag == false){
      $.k2l.m6a19_2.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m6a19_2.questionWordLock = false;
      }, 1000);
      $(evt.target).addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m6a19_2.index--;
      $(".counterleft u").html($.k2l.m6a19_2.index);

      if($.k2l.m6a19_2.index <=0){
    $('.pagination').removeClass('hidden');
	$('.stuck').addClass('hidden');
      }
    }
	},

  'click .wrong': function(evt) {

    if($.k2l.m6a19_2.questionWordLock == false && $.k2l.m6a19_2.stuckFlag == false){
      $.k2l.m6a19_2.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m6a19_2.questionWordLock = false;
      }, 1000);
      $('.incorrectscreen').removeClass("hidden");
      setTimeout(function(){
        $('.incorrectscreen').addClass("hidden");
      }, 1000);
      $.k2l.m6a19_2.wrongscore++;

      if($.k2l.m6a19_2.wrongscore > 2){
        $('.stuck').removeClass('hidden');
      }

    }
	},
  'click .stuck': function(evt) {
    $('.stuck').addClass('hidden');
    $.k2l.m6a19_2.wrongscore = 0;
    $.k2l.m6a19_2.index = 0;
    $(".counterleft u").html($.k2l.m6a19_2.index);
    $('.paraclick-word').addClass('correctword');
    $('.paraclick-word-sleep').addClass('correctword');
    $('#m6a19_2 .navfooter a').removeClass('hidden');
    $.k2l.m6a19_2.stuckFlag = true;
  },

  'click .navfooter a': function(evt) {
    $('#m6a19_2 .navfooter a').addClass('hidden');
    $('.paraclick-word').removeClass('correctword');
    $.k2l.m6a19_2.wrongscore = 0;
    $.k2l.m6a19_2.index = 7;
		$.k2l.m6a19_2.stuckFlag = false;
    $(".counterleft u").html($.k2l.m6a19_2.index);
  }

});

Template.m6a19_2.rendered = function() {
  if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m6a19_2 == 'undefined') {
		$.k2l.m6a19_2 = {};
	};

	$.k2l.m6a19_2.index = 7;
  $.k2l.m6a19_2.wrongscore = 0;
  $.k2l.m6a19_2.stuckFlag = false;
  $.k2l.m6a19_2.questionWordLock = false;

	$('[data-toggle="popover"]').popover();

}


Template.m6a19_3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a19_3");
	}
});

Template.m6a19_3.events({

    'click .buttonaudio': function(evt) {
    audioButtonClickSetup($.k2l.m6a19_3.sound, $(evt.currentTarget));
    playPauseAudio($.k2l.m6a19_3.sound, $(evt.currentTarget));
  },

	'click .paraclick-word-sleep': function(evt) {
		if ($(evt.target).hasClass('correctword')){
				return;
		}
	var parentSection = $(evt.currentTarget).parents('section');
    if($.k2l.m6a19_3.questionWordLock == false && $.k2l.m6a19_3.stuckFlag == false){
      $.k2l.m6a19_3.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m6a19_3.questionWordLock = false;
      }, 1000);
			$('.paraclick-word-sleep').addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m6a19_3.index--;
      $(".counterleft u").html($.k2l.m6a19_3.index);

      if($.k2l.m6a19_3.index <=0){
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
    if($.k2l.m6a19_3.questionWordLock == false && $.k2l.m6a19_3.stuckFlag == false){
      $.k2l.m6a19_3.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m6a19_3.questionWordLock = false;
      }, 1000);
      $(evt.target).addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m6a19_3.index--;
      $(".counterleft u").html($.k2l.m6a19_3.index);

      if($.k2l.m6a19_3.index <=0){
    $('.pagination').removeClass('hidden');
	$('.stuck').addClass('hidden');
    $('#m6a19article').removeClass('hidden');
      }
    }
	},

  'click .wrong': function(evt) {

    if($.k2l.m6a19_3.questionWordLock == false && $.k2l.m6a19_3.stuckFlag == false){
      $.k2l.m6a19_3.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m6a19_3.questionWordLock = false;
      }, 1000);
      $('.incorrectscreen').removeClass("hidden");
      setTimeout(function(){
        $('.incorrectscreen').addClass("hidden");
      }, 1000);
      $.k2l.m6a19_3.wrongscore++;

      if($.k2l.m6a19_3.wrongscore > 2){
        $('.stuck').removeClass('hidden');
      }

    }
	},
  'click .stuck': function(evt) {
    $('.stuck').addClass('hidden');
    $.k2l.m6a19_3.wrongscore = 0;
    $.k2l.m6a19_3.index = 0;
    $(".counterleft u").html($.k2l.m6a19_3.index);
    $('.paraclick-word').addClass('correctword');
    $('.paraclick-word-sleep').addClass('correctword');
    $('#m6a19_3 .navfooter a').removeClass('hidden');
    $('#m6a19article').removeClass('hidden');
    $.k2l.m6a19_3.stuckFlag = true;
  },

  'click .navfooter a': function(evt) {
    $('#m6a19_3 .navfooter a').addClass('hidden');
    $.k2l.m6a19_3.sound.src = {};
    $('.paraclick-word').removeClass('correctword');
    $.k2l.m6a19_3.wrongscore = 0;
    $.k2l.m6a19_3.index = 7;
		$.k2l.m6a19_3.stuckFlag = false;
    $(".counterleft u").html($.k2l.m6a19_3.index);
  }

});

Template.m6a19_3.rendered = function() {
  if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m6a19_3 == 'undefined') {
		$.k2l.m6a19_3 = {};
	};

  $.k2l.m6a19_3.sound = new Audio();
	$.k2l.m6a19_3.index = 7;
  $.k2l.m6a19_3.wrongscore = 0;
  $.k2l.m6a19_3.stuckFlag = false;
  $.k2l.m6a19_3.questionWordLock = false;

	$('[data-toggle="popover"]').popover();
}

