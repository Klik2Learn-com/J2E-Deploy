Template.m5a16.helpers({
endPageSect: function() {
var session = Session.get('activeSection');
if (session == '#m5a16_end') {
 	return false;
	}
return true;
},

	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m5a16");
	}
})

Template.m5a16.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m5a16.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m5a16.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m5a16.sound.src = {};
	}

});

Template.m5a16.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(5, 16);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(5, 16, subpage);
			oldLocation = location.href;
		}
	}, 500);


	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m5a16 == 'undefined') {
		$.k2l.m5a16 = {};
	};
	
	$.k2l.m5a16.sound = new Audio();
}

Template.m5a16.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 5, 16, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m5a16.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m5a16_4.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a16_4");
	}
});

Template.m5a16_5.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a16_5");
	}
});

Template.m5a16_5.events({
	'click .paraclick-word-sleep': function(evt) {
		if ($(evt.target).hasClass('correctword')){
				return;
		}
	var parentSection = $(evt.currentTarget).parents('section');
    if($.k2l.m5a16_5.questionWordLock == false && $.k2l.m5a16_5.stuckFlag == false){
      $.k2l.m5a16_5.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m5a16_5.questionWordLock = false;
      }, 1000);
			$('.paraclick-word-sleep').addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m5a16_5.index--;
      $(".counterleft u").html($.k2l.m5a16_5.index);

      if($.k2l.m5a16_5.index <=0){
      $('#m5a16_5 .pagination').removeClass('hidden');
	  $('.stuck').addClass('hidden');
      }
    }
	},

	'click .paraclick-word': function(evt) {
		if ($(evt.target).hasClass('correctword')){
				return;
		}
	var parentSection = $(evt.currentTarget).parents('section');
    if($.k2l.m5a16_5.questionWordLock == false && $.k2l.m5a16_5.stuckFlag == false){
      $.k2l.m5a16_5.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m5a16_5.questionWordLock = false;
      }, 1000);
      $(evt.target).addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m5a16_5.index--;
      $(".counterleft u").html($.k2l.m5a16_5.index);

      if($.k2l.m5a16_5.index <=0){
    $('#m5a16_5 .pagination').removeClass('hidden');
	$('.stuck').addClass('hidden');
      }
    }
	},

  'click .wrong': function(evt) {

    if($.k2l.m5a16_5.questionWordLock == false && $.k2l.m5a16_5.stuckFlag == false){
      $.k2l.m5a16_5.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m5a16_5.questionWordLock = false;
      }, 1000);
      $('.incorrectscreen').removeClass("hidden");
      setTimeout(function(){
        $('.incorrectscreen').addClass("hidden");
      }, 1000);
      $.k2l.m5a16_5.wrongscore++;

      if($.k2l.m5a16_5.wrongscore > 2){
        $('.stuck').removeClass('hidden');
      }

    }
	},
  'click .stuck': function(evt) {
    $('.stuck').addClass('hidden');
    $.k2l.m5a16_5.wrongscore = 0;
    $.k2l.m5a16_5.index = 0;
    $(".counterleft u").html($.k2l.m5a16_5.index);
    $('.paraclick-word').addClass('correctword');
    $('.paraclick-word-sleep').addClass('correctword');
    $('#m5a16_5 .navfooter a').removeClass('hidden');
    $.k2l.m5a16_5.stuckFlag = true;
  },

  'click .navfooter a': function(evt) {
    $('#m5a16_5 .navfooter a').addClass('hidden');
    $('.paraclick-word').removeClass('correctword');
    $.k2l.m5a16_5.wrongscore = 0;
    $.k2l.m5a16_5.index = 1;
		$.k2l.m5a16_5.stuckFlag = false;
    $(".counterleft u").html($.k2l.m5a16_5.index);
  }

});

Template.m5a16_5.rendered = function() {
  if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m5a16_5 == 'undefined') {
		$.k2l.m5a16_5 = {};
	};

	$.k2l.m5a16_5.index = 1;
  $.k2l.m5a16_5.wrongscore = 0;
  $.k2l.m5a16_5.stuckFlag = false;
  $.k2l.m5a16_5.questionWordLock = false;

}

Template.m5a16_6.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a16_6");
	}
});

Template.m5a16_6.events({
	'click .paraclick-word-sleep': function(evt) {
		if ($(evt.target).hasClass('correctword')){
				return;
		}
	var parentSection = $(evt.currentTarget).parents('section');
    if($.k2l.m5a16_6.questionWordLock == false && $.k2l.m5a16_6.stuckFlag == false){
      $.k2l.m5a16_6.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m5a16_6.questionWordLock = false;
      }, 1000);
			$('.paraclick-word-sleep').addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m5a16_6.index--;
      $(".counterleft u").html($.k2l.m5a16_6.index);

      if($.k2l.m5a16_6.index <=0){
      $('#m5a16_6 .pagination').removeClass('hidden');
	  $('.stuck').addClass('hidden');
      }
    }
	},

	'click .paraclick-word': function(evt) {
		if ($(evt.target).hasClass('correctword')){
				return;
		}
	var parentSection = $(evt.currentTarget).parents('section');
    if($.k2l.m5a16_6.questionWordLock == false && $.k2l.m5a16_6.stuckFlag == false){
      $.k2l.m5a16_6.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m5a16_6.questionWordLock = false;
      }, 1000);
      $(evt.target).addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m5a16_6.index--;
      $(".counterleft u").html($.k2l.m5a16_6.index);

      if($.k2l.m5a16_6.index <=0){
    $('#m5a16_6 .pagination').removeClass('hidden');
	$('.stuck').addClass('hidden');
      }
    }
	},

  'click .wrong': function(evt) {

    if($.k2l.m5a16_6.questionWordLock == false && $.k2l.m5a16_6.stuckFlag == false){
      $.k2l.m5a16_6.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m5a16_6.questionWordLock = false;
      }, 1000);
      $('.incorrectscreen').removeClass("hidden");
      setTimeout(function(){
        $('.incorrectscreen').addClass("hidden");
      }, 1000);
      $.k2l.m5a16_6.wrongscore++;

      if($.k2l.m5a16_6.wrongscore > 2){
        $('.stuck').removeClass('hidden');
      }

    }
	},
  'click .stuck': function(evt) {
    $('.stuck').addClass('hidden');
    $.k2l.m5a16_6.wrongscore = 0;
    $.k2l.m5a16_6.index = 0;
    $(".counterleft u").html($.k2l.m5a16_6.index);
    $('.paraclick-word').addClass('correctword');
    $('.paraclick-word-sleep').addClass('correctword');
    $('#m5a16_6 .navfooter a').removeClass('hidden');
    $.k2l.m5a16_6.stuckFlag = true;
  },

  'click .navfooter a': function(evt) {
    $('#m5a16_6 .navfooter a').addClass('hidden');
    $('.paraclick-word').removeClass('correctword');
    $.k2l.m5a16_6.wrongscore = 0;
    $.k2l.m5a16_6.index = 1;
		$.k2l.m5a16_6.stuckFlag = false;
    $(".counterleft u").html($.k2l.m5a16_6.index);
  }

});

Template.m5a16_6.rendered = function() {
  if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m5a16_6 == 'undefined') {
		$.k2l.m5a16_6 = {};
	};

	$.k2l.m5a16_6.index = 1;
  $.k2l.m5a16_6.wrongscore = 0;
  $.k2l.m5a16_6.stuckFlag = false;
  $.k2l.m5a16_6.questionWordLock = false;

}

Template.m5a16_7.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a16_7");
	}
});

Template.m5a16_7.events({
	'click .paraclick-word-sleep': function(evt) {
		if ($(evt.target).hasClass('correctword')){
				return;
		}
	var parentSection = $(evt.currentTarget).parents('section');
    if($.k2l.m5a16_7.questionWordLock == false && $.k2l.m5a16_7.stuckFlag == false){
      $.k2l.m5a16_7.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m5a16_7.questionWordLock = false;
      }, 1000);
			$('.paraclick-word-sleep').addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m5a16_7.index--;
      $(".counterleft u").html($.k2l.m5a16_7.index);

      if($.k2l.m5a16_7.index <=0){
      $('#m5a16_7 .pagination').removeClass('hidden');
	  $('.stuck').addClass('hidden');
      }
    }
	},

	'click .paraclick-word': function(evt) {
		if ($(evt.target).hasClass('correctword')){
				return;
		}
	var parentSection = $(evt.currentTarget).parents('section');
    if($.k2l.m5a16_7.questionWordLock == false && $.k2l.m5a16_7.stuckFlag == false){
      $.k2l.m5a16_7.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m5a16_7.questionWordLock = false;
      }, 1000);
      $(evt.target).addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m5a16_7.index--;
      $(".counterleft u").html($.k2l.m5a16_7.index);

      if($.k2l.m5a16_7.index <=0){
    $('#m5a16_7 .pagination').removeClass('hidden');
	$('.stuck').addClass('hidden');
      }
    }
	},

  'click .wrong': function(evt) {

    if($.k2l.m5a16_7.questionWordLock == false && $.k2l.m5a16_7.stuckFlag == false){
      $.k2l.m5a16_7.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m5a16_7.questionWordLock = false;
      }, 1000);
      $('.incorrectscreen').removeClass("hidden");
      setTimeout(function(){
        $('.incorrectscreen').addClass("hidden");
      }, 1000);
      $.k2l.m5a16_7.wrongscore++;

      if($.k2l.m5a16_7.wrongscore > 2){
        $('.stuck').removeClass('hidden');
      }

    }
	},
  'click .stuck': function(evt) {
    $('.stuck').addClass('hidden');
    $.k2l.m5a16_7.wrongscore = 0;
    $.k2l.m5a16_7.index = 0;
    $(".counterleft u").html($.k2l.m5a16_7.index);
    $('.paraclick-word').addClass('correctword');
    $('.paraclick-word-sleep').addClass('correctword');
    $('#m5a16_7 .navfooter a').removeClass('hidden');
    $.k2l.m5a16_7.stuckFlag = true;
  },

  'click .navfooter a': function(evt) {
    $('#m5a16_7 .navfooter a').addClass('hidden');
    $('.paraclick-word').removeClass('correctword');
    $.k2l.m5a16_7.wrongscore = 0;
    $.k2l.m5a16_7.index = 2;
		$.k2l.m5a16_7.stuckFlag = false;
    $(".counterleft u").html($.k2l.m5a16_7.index);
  }

});

Template.m5a16_7.rendered = function() {
  if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m5a16_7 == 'undefined') {
		$.k2l.m5a16_7 = {};
	};

	$.k2l.m5a16_7.index = 2;
  $.k2l.m5a16_7.wrongscore = 0;
  $.k2l.m5a16_7.stuckFlag = false;
  $.k2l.m5a16_7.questionWordLock = false;

}

Template.m5a16_8.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a16_8");
	}
});

Template.m5a16_8.events({
	'click .paraclick-word-sleep': function(evt) {
		if ($(evt.target).hasClass('correctword')){
				return;
		}
	var parentSection = $(evt.currentTarget).parents('section');
    if($.k2l.m5a16_8.questionWordLock == false && $.k2l.m5a16_8.stuckFlag == false){
      $.k2l.m5a16_8.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m5a16_8.questionWordLock = false;
      }, 1000);
			$('.paraclick-word-sleep').addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m5a16_8.index--;
      $(".counterleft u").html($.k2l.m5a16_8.index);

      if($.k2l.m5a16_8.index <=0){
      $('#m5a16_8 .pagination').removeClass('hidden');
	  $('.stuck').addClass('hidden');
      }
    }
	},

	'click .paraclick-word': function(evt) {
		if ($(evt.target).hasClass('correctword')){
				return;
		}
	var parentSection = $(evt.currentTarget).parents('section');
    if($.k2l.m5a16_8.questionWordLock == false && $.k2l.m5a16_8.stuckFlag == false){
      $.k2l.m5a16_8.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m5a16_8.questionWordLock = false;
      }, 1000);
      $(evt.target).addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m5a16_8.index--;
      $(".counterleft u").html($.k2l.m5a16_8.index);

      if($.k2l.m5a16_8.index <=0){
    $('#m5a16_8 .pagination').removeClass('hidden');
	$('.stuck').addClass('hidden');
      }
    }
	},

  'click .wrong': function(evt) {

    if($.k2l.m5a16_8.questionWordLock == false && $.k2l.m5a16_8.stuckFlag == false){
      $.k2l.m5a16_8.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m5a16_8.questionWordLock = false;
      }, 1000);
      $('.incorrectscreen').removeClass("hidden");
      setTimeout(function(){
        $('.incorrectscreen').addClass("hidden");
      }, 1000);
      $.k2l.m5a16_8.wrongscore++;

      if($.k2l.m5a16_8.wrongscore > 2){
        $('.stuck').removeClass('hidden');
      }

    }
	},
  'click .stuck': function(evt) {
    $('.stuck').addClass('hidden');
    $.k2l.m5a16_8.wrongscore = 0;
    $.k2l.m5a16_8.index = 0;
    $(".counterleft u").html($.k2l.m5a16_8.index);
    $('.paraclick-word').addClass('correctword');
    $('.paraclick-word-sleep').addClass('correctword');
    $('#m5a16_8 .navfooter a').removeClass('hidden');
    $.k2l.m5a16_8.stuckFlag = true;
  },

  'click .navfooter a': function(evt) {
    $('#m5a16_8 .navfooter a').addClass('hidden');
    $('.paraclick-word').removeClass('correctword');
    $.k2l.m5a16_8.wrongscore = 0;
    $.k2l.m5a16_8.index = 1;
		$.k2l.m5a16_8.stuckFlag = false;
    $(".counterleft u").html($.k2l.m5a16_8.index);
  }

});

Template.m5a16_8.rendered = function() {
  if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m5a16_8 == 'undefined') {
		$.k2l.m5a16_8 = {};
	};

	$.k2l.m5a16_8.index = 1;
  $.k2l.m5a16_8.wrongscore = 0;
  $.k2l.m5a16_8.stuckFlag = false;
  $.k2l.m5a16_8.questionWordLock = false;

}

Template.m5a16_9.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a16_9");
	}
});

Template.m5a16_9.events({
	'click .paraclick-word-sleep': function(evt) {
		if ($(evt.target).hasClass('correctword')){
				return;
		}
	var parentSection = $(evt.currentTarget).parents('section');
    if($.k2l.m5a16_9.questionWordLock == false && $.k2l.m5a16_9.stuckFlag == false){
      $.k2l.m5a16_9.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m5a16_9.questionWordLock = false;
      }, 1000);
			$('.paraclick-word-sleep').addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m5a16_9.index--;
      $(".counterleft u").html($.k2l.m5a16_9.index);

      if($.k2l.m5a16_9.index <=0){
      $('#m5a16_9 .pagination').removeClass('hidden');
	  $('.stuck').addClass('hidden');
      }
    }
	},

	'click .paraclick-word': function(evt) {
		if ($(evt.target).hasClass('correctword')){
				return;
		}
	var parentSection = $(evt.currentTarget).parents('section');
    if($.k2l.m5a16_9.questionWordLock == false && $.k2l.m5a16_9.stuckFlag == false){
      $.k2l.m5a16_9.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m5a16_9.questionWordLock = false;
      }, 1000);
      $(evt.target).addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m5a16_9.index--;
      $(".counterleft u").html($.k2l.m5a16_9.index);

      if($.k2l.m5a16_9.index <=0){
    $('#m5a16_9 .pagination').removeClass('hidden');
	$('.stuck').addClass('hidden');
      }
    }
	},

  'click .wrong': function(evt) {

    if($.k2l.m5a16_9.questionWordLock == false && $.k2l.m5a16_9.stuckFlag == false){
      $.k2l.m5a16_9.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m5a16_9.questionWordLock = false;
      }, 1000);
      $('.incorrectscreen').removeClass("hidden");
      setTimeout(function(){
        $('.incorrectscreen').addClass("hidden");
      }, 1000);
      $.k2l.m5a16_9.wrongscore++;

      if($.k2l.m5a16_9.wrongscore > 2){
        $('.stuck').removeClass('hidden');
      }

    }
	},
  'click .stuck': function(evt) {
    $('.stuck').addClass('hidden');
    $.k2l.m5a16_9.wrongscore = 0;
    $.k2l.m5a16_9.index = 0;
    $(".counterleft u").html($.k2l.m5a16_9.index);
    $('.paraclick-word').addClass('correctword');
    $('.paraclick-word-sleep').addClass('correctword');
    $('#m5a16_9 .navfooter a').removeClass('hidden');
    $.k2l.m5a16_9.stuckFlag = true;
  },

  'click .navfooter a': function(evt) {
    $('#m5a16_9 .navfooter a').addClass('hidden');
    $('.paraclick-word').removeClass('correctword');
    $.k2l.m5a16_9.wrongscore = 0;
    $.k2l.m5a16_9.index = 1;
		$.k2l.m5a16_9.stuckFlag = false;
    $(".counterleft u").html($.k2l.m5a16_9.index);
  }

});

Template.m5a16_9.rendered = function() {
  if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m5a16_9 == 'undefined') {
		$.k2l.m5a16_9 = {};
	};

	$.k2l.m5a16_9.index = 1;
  $.k2l.m5a16_9.wrongscore = 0;
  $.k2l.m5a16_9.stuckFlag = false;
  $.k2l.m5a16_9.questionWordLock = false;

}
