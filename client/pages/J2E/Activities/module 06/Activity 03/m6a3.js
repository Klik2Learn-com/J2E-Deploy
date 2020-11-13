Template.m6a3.helpers({
endPageSect: function() {
var session = Session.get('activeSection');
if (session == '#m6a3_end') {
  return false;
  }
return true;
}
});

Template.m6a3.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(6, 3);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(6, 3, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m6a3.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 6, 3, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m6a3.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.importantpeople_modal.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.importantpeople_modal.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.importantpeople_modal.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.importantpeople_modal.sound.src = {};
	},

	'hide.bs.modal #importantpeople_modal': function(evt) {
		$.k2l.importantpeople_modal.sound.src = {};		
	}

});

Template.importantpeople_modal.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.importantpeople_modal == 'undefined') {
		$.k2l.importantpeople_modal = {};
	};
	
	$.k2l.importantpeople_modal.sound = new Audio();
}

Template.m6a3_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a3_1");
	}
});

Template.m6a3_1.events({
	'click .paraclick-word-sleep': function(evt) {
		if ($(evt.target).hasClass('correctword')){
				return;
		}
	var parentSection = $(evt.currentTarget).parents('section');
    if($.k2l.m6a3_1.questionWordLock == false && $.k2l.m6a3_1.stuckFlag == false){
      $.k2l.m6a3_1.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m6a3_1.questionWordLock = false;
      }, 1000);
			$('.paraclick-word-sleep').addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m6a3_1.index--;
      $(".counterleft u").html($.k2l.m6a3_1.index);

      if($.k2l.m6a3_1.index <=0){
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
    if($.k2l.m6a3_1.questionWordLock == false && $.k2l.m6a3_1.stuckFlag == false){
      $.k2l.m6a3_1.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m6a3_1.questionWordLock = false;
      }, 1000);
      $(evt.target).addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m6a3_1.index--;
      $(".counterleft u").html($.k2l.m6a3_1.index);

      if($.k2l.m6a3_1.index <=0){
    $('.pagination').removeClass('hidden');
	$('.stuck').addClass('hidden');
      }
    }
	},

  'click .wrong': function(evt) {

    if($.k2l.m6a3_1.questionWordLock == false && $.k2l.m6a3_1.stuckFlag == false){
      $.k2l.m6a3_1.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m6a3_1.questionWordLock = false;
      }, 1000);
      $('.incorrectscreen').removeClass("hidden");
      setTimeout(function(){
        $('.incorrectscreen').addClass("hidden");
      }, 1000);
      $.k2l.m6a3_1.wrongscore++;

      if($.k2l.m6a3_1.wrongscore > 2){
        $('.stuck').removeClass('hidden');
      }

    }
	},
  'click .stuck': function(evt) {
    $('.stuck').addClass('hidden');
    $.k2l.m6a3_1.wrongscore = 0;
    $.k2l.m6a3_1.index = 0;
    $(".counterleft u").html($.k2l.m6a3_1.index);
    $('.paraclick-word').addClass('correctword');
    $('.paraclick-word-sleep').addClass('correctword');
    $('#m6a3_1 .navfooter a').removeClass('hidden');
    $.k2l.m6a3_1.stuckFlag = true;
  },

  'click .navfooter a': function(evt) {
    $('#m6a3_1 .navfooter a').addClass('hidden');
    $('.paraclick-word').removeClass('correctword');
    $.k2l.m6a3_1.wrongscore = 0;
    $.k2l.m6a3_1.index = 1;
		$.k2l.m6a3_1.stuckFlag = false;
    $(".counterleft u").html($.k2l.m6a3_1.index);
  }

});

Template.m6a3_1.rendered = function() {
  if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m6a3_1 == 'undefined') {
		$.k2l.m6a3_1 = {};
	};

	$.k2l.m6a3_1.index = 1;
  $.k2l.m6a3_1.wrongscore = 0;
  $.k2l.m6a3_1.stuckFlag = false;
  $.k2l.m6a3_1.questionWordLock = false;

}

Template.m6a3_2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a3_2");
	}
});

Template.m6a3_2.events({
	'click .paraclick-word-sleep': function(evt) {
		if ($(evt.target).hasClass('correctword')){
				return;
		}
	var parentSection = $(evt.currentTarget).parents('section');
    if($.k2l.m6a3_2.questionWordLock == false && $.k2l.m6a3_2.stuckFlag == false){
      $.k2l.m6a3_2.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m6a3_2.questionWordLock = false;
      }, 1000);
			$('.paraclick-word-sleep').addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m6a3_2.index--;
      $(".counterleft u").html($.k2l.m6a3_2.index);

      if($.k2l.m6a3_2.index <=0){
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
    if($.k2l.m6a3_2.questionWordLock == false && $.k2l.m6a3_2.stuckFlag == false){
      $.k2l.m6a3_2.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m6a3_2.questionWordLock = false;
      }, 1000);
      $(evt.target).addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m6a3_2.index--;
      $(".counterleft u").html($.k2l.m6a3_2.index);

      if($.k2l.m6a3_2.index <=0){
    $('.pagination').removeClass('hidden');
	$('.stuck').addClass('hidden');
      }
    }
	},

  'click .wrong': function(evt) {

    if($.k2l.m6a3_2.questionWordLock == false && $.k2l.m6a3_2.stuckFlag == false){
      $.k2l.m6a3_2.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m6a3_2.questionWordLock = false;
      }, 1000);
      $('.incorrectscreen').removeClass("hidden");
      setTimeout(function(){
        $('.incorrectscreen').addClass("hidden");
      }, 1000);
      $.k2l.m6a3_2.wrongscore++;

      if($.k2l.m6a3_2.wrongscore > 2){
        $('.stuck').removeClass('hidden');
      }

    }
	},
  'click .stuck': function(evt) {
    $('.stuck').addClass('hidden');
    $.k2l.m6a3_2.wrongscore = 0;
    $.k2l.m6a3_2.index = 0;
    $(".counterleft u").html($.k2l.m6a3_2.index);
    $('.paraclick-word').addClass('correctword');
    $('.paraclick-word-sleep').addClass('correctword');
    $('#m6a3_2 .navfooter a').removeClass('hidden');
    $.k2l.m6a3_2.stuckFlag = true;
  },

  'click .navfooter a': function(evt) {
    $('#m6a3_2 .navfooter a').addClass('hidden');
    $('.paraclick-word').removeClass('correctword');
    $.k2l.m6a3_2.wrongscore = 0;
    $.k2l.m6a3_2.index = 1;
		$.k2l.m6a3_2.stuckFlag = false;
    $(".counterleft u").html($.k2l.m6a3_2.index);
  }

});

Template.m6a3_2.rendered = function() {
  if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m6a3_2 == 'undefined') {
		$.k2l.m6a3_2 = {};
	};

	$.k2l.m6a3_2.index = 1;
  $.k2l.m6a3_2.wrongscore = 0;
  $.k2l.m6a3_2.stuckFlag = false;
  $.k2l.m6a3_2.questionWordLock = false;

}

Template.m6a3_3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a3_3");
	}
});

Template.m6a3_3.events({
	'click .paraclick-word-sleep': function(evt) {
		if ($(evt.target).hasClass('correctword')){
				return;
		}
	var parentSection = $(evt.currentTarget).parents('section');
    if($.k2l.m6a3_3.questionWordLock == false && $.k2l.m6a3_3.stuckFlag == false){
      $.k2l.m6a3_3.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m6a3_3.questionWordLock = false;
      }, 1000);
			$('.paraclick-word-sleep').addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m6a3_3.index--;
      $(".counterleft u").html($.k2l.m6a3_3.index);

      if($.k2l.m6a3_3.index <=0){
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
    if($.k2l.m6a3_3.questionWordLock == false && $.k2l.m6a3_3.stuckFlag == false){
      $.k2l.m6a3_3.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m6a3_3.questionWordLock = false;
      }, 1000);
      $(evt.target).addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m6a3_3.index--;
      $(".counterleft u").html($.k2l.m6a3_3.index);

      if($.k2l.m6a3_3.index <=0){
    $('.pagination').removeClass('hidden');
	$('.stuck').addClass('hidden');
      }
    }
	},

  'click .wrong': function(evt) {

    if($.k2l.m6a3_3.questionWordLock == false && $.k2l.m6a3_3.stuckFlag == false){
      $.k2l.m6a3_3.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m6a3_3.questionWordLock = false;
      }, 1000);
      $('.incorrectscreen').removeClass("hidden");
      setTimeout(function(){
        $('.incorrectscreen').addClass("hidden");
      }, 1000);
      $.k2l.m6a3_3.wrongscore++;

      if($.k2l.m6a3_3.wrongscore > 2){
        $('.stuck').removeClass('hidden');
      }

    }
	},
  'click .stuck': function(evt) {
    $('.stuck').addClass('hidden');
    $.k2l.m6a3_3.wrongscore = 0;
    $.k2l.m6a3_3.index = 0;
    $(".counterleft u").html($.k2l.m6a3_3.index);
    $('.paraclick-word').addClass('correctword');
    $('.paraclick-word-sleep').addClass('correctword');
    $('#m6a3_3 .navfooter a').removeClass('hidden');
    $.k2l.m6a3_3.stuckFlag = true;
  },

  'click .navfooter a': function(evt) {
    $('#m6a3_3 .navfooter a').addClass('hidden');
    $('.paraclick-word').removeClass('correctword');
    $.k2l.m6a3_3.wrongscore = 0;
    $.k2l.m6a3_3.index = 1;
		$.k2l.m6a3_3.stuckFlag = false;
    $(".counterleft u").html($.k2l.m6a3_3.index);
  }

});

Template.m6a3_3.rendered = function() {
  if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m6a3_3 == 'undefined') {
		$.k2l.m6a3_3 = {};
	};

	$.k2l.m6a3_3.index = 1;
  $.k2l.m6a3_3.wrongscore = 0;
  $.k2l.m6a3_3.stuckFlag = false;
  $.k2l.m6a3_3.questionWordLock = false;

}

Template.m6a3_4.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a3_4");
	}
});

Template.m6a3_4.events({
	'click .paraclick-word-sleep': function(evt) {
		if ($(evt.target).hasClass('correctword')){
				return;
		}
	var parentSection = $(evt.currentTarget).parents('section');
    if($.k2l.m6a3_4.questionWordLock == false && $.k2l.m6a3_4.stuckFlag == false){
      $.k2l.m6a3_4.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m6a3_4.questionWordLock = false;
      }, 1000);
			$('.paraclick-word-sleep').addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m6a3_4.index--;
      $(".counterleft u").html($.k2l.m6a3_4.index);

      if($.k2l.m6a3_4.index <=0){
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
    if($.k2l.m6a3_4.questionWordLock == false && $.k2l.m6a3_4.stuckFlag == false){
      $.k2l.m6a3_4.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m6a3_4.questionWordLock = false;
      }, 1000);
      $(evt.target).addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m6a3_4.index--;
      $(".counterleft u").html($.k2l.m6a3_4.index);

      if($.k2l.m6a3_4.index <=0){
    $('.pagination').removeClass('hidden');
	$('.stuck').addClass('hidden');
      }
    }
	},

  'click .wrong': function(evt) {

    if($.k2l.m6a3_4.questionWordLock == false && $.k2l.m6a3_4.stuckFlag == false){
      $.k2l.m6a3_4.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m6a3_4.questionWordLock = false;
      }, 1000);
      $('.incorrectscreen').removeClass("hidden");
      setTimeout(function(){
        $('.incorrectscreen').addClass("hidden");
      }, 1000);
      $.k2l.m6a3_4.wrongscore++;

      if($.k2l.m6a3_4.wrongscore > 2){
        $('.stuck').removeClass('hidden');
      }

    }
	},
  'click .stuck': function(evt) {
    $('.stuck').addClass('hidden');
    $.k2l.m6a3_4.wrongscore = 0;
    $.k2l.m6a3_4.index = 0;
    $(".counterleft u").html($.k2l.m6a3_4.index);
    $('.paraclick-word').addClass('correctword');
    $('.paraclick-word-sleep').addClass('correctword');
    $('#m6a3_4 .navfooter a').removeClass('hidden');
    $.k2l.m6a3_4.stuckFlag = true;
  },

  'click .navfooter a': function(evt) {
    $('#m6a3_4 .navfooter a').addClass('hidden');
    $('.paraclick-word').removeClass('correctword');
    $.k2l.m6a3_4.wrongscore = 0;
    $.k2l.m6a3_4.index = 1;
		$.k2l.m6a3_4.stuckFlag = false;
    $(".counterleft u").html($.k2l.m6a3_4.index);
  }

});

Template.m6a3_4.rendered = function() {
  if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m6a3_4 == 'undefined') {
		$.k2l.m6a3_4 = {};
	};

	$.k2l.m6a3_4.index = 1;
  $.k2l.m6a3_4.wrongscore = 0;
  $.k2l.m6a3_4.stuckFlag = false;
  $.k2l.m6a3_4.questionWordLock = false;

}

Template.m6a3_5.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a3_5");
	}
});

Template.m6a3_5.events({
	'click .paraclick-word-sleep': function(evt) {
		if ($(evt.target).hasClass('correctword')){
				return;
		}
	var parentSection = $(evt.currentTarget).parents('section');
    if($.k2l.m6a3_5.questionWordLock == false && $.k2l.m6a3_5.stuckFlag == false){
      $.k2l.m6a3_5.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m6a3_5.questionWordLock = false;
      }, 1000);
			$('.paraclick-word-sleep').addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m6a3_5.index--;
      $(".counterleft u").html($.k2l.m6a3_5.index);

      if($.k2l.m6a3_5.index <=0){
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
    if($.k2l.m6a3_5.questionWordLock == false && $.k2l.m6a3_5.stuckFlag == false){
      $.k2l.m6a3_5.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m6a3_5.questionWordLock = false;
      }, 1000);
      $(evt.target).addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m6a3_5.index--;
      $(".counterleft u").html($.k2l.m6a3_5.index);

      if($.k2l.m6a3_5.index <=0){
    $('.pagination').removeClass('hidden');
	$('.stuck').addClass('hidden');
      }
    }
	},

  'click .wrong': function(evt) {

    if($.k2l.m6a3_5.questionWordLock == false && $.k2l.m6a3_5.stuckFlag == false){
      $.k2l.m6a3_5.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m6a3_5.questionWordLock = false;
      }, 1000);
      $('.incorrectscreen').removeClass("hidden");
      setTimeout(function(){
        $('.incorrectscreen').addClass("hidden");
      }, 1000);
      $.k2l.m6a3_5.wrongscore++;

      if($.k2l.m6a3_5.wrongscore > 2){
        $('.stuck').removeClass('hidden');
      }

    }
	},
  'click .stuck': function(evt) {
    $('.stuck').addClass('hidden');
    $.k2l.m6a3_5.wrongscore = 0;
    $.k2l.m6a3_5.index = 0;
    $(".counterleft u").html($.k2l.m6a3_5.index);
    $('.paraclick-word').addClass('correctword');
    $('.paraclick-word-sleep').addClass('correctword');
    $('#m6a3_5 .navfooter a').removeClass('hidden');
    $.k2l.m6a3_5.stuckFlag = true;
  },

  'click .navfooter a': function(evt) {
    $('#m6a3_5 .navfooter a').addClass('hidden');
    $('.paraclick-word').removeClass('correctword');
    $.k2l.m6a3_5.wrongscore = 0;
    $.k2l.m6a3_5.index = 1;
		$.k2l.m6a3_5.stuckFlag = false;
    $(".counterleft u").html($.k2l.m6a3_5.index);
  }

});

Template.m6a3_5.rendered = function() {
  if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m6a3_5 == 'undefined') {
		$.k2l.m6a3_5 = {};
	};

	$.k2l.m6a3_5.index = 1;
  $.k2l.m6a3_5.wrongscore = 0;
  $.k2l.m6a3_5.stuckFlag = false;
  $.k2l.m6a3_5.questionWordLock = false;

}

Template.m6a3_6.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a3_6");
	}
});

Template.m6a3_6.events({
	'click .paraclick-word-sleep': function(evt) {
		if ($(evt.target).hasClass('correctword')){
				return;
		}
	var parentSection = $(evt.currentTarget).parents('section');
    if($.k2l.m6a3_6.questionWordLock == false && $.k2l.m6a3_6.stuckFlag == false){
      $.k2l.m6a3_6.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m6a3_6.questionWordLock = false;
      }, 1000);
			$('.paraclick-word-sleep').addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m6a3_6.index--;
      $(".counterleft u").html($.k2l.m6a3_6.index);

      if($.k2l.m6a3_6.index <=0){
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
    if($.k2l.m6a3_6.questionWordLock == false && $.k2l.m6a3_6.stuckFlag == false){
      $.k2l.m6a3_6.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m6a3_6.questionWordLock = false;
      }, 1000);
      $(evt.target).addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m6a3_6.index--;
      $(".counterleft u").html($.k2l.m6a3_6.index);

      if($.k2l.m6a3_6.index <=0){
    $('.pagination').removeClass('hidden');
	$('.stuck').addClass('hidden');
      }
    }
	},

  'click .wrong': function(evt) {

    if($.k2l.m6a3_6.questionWordLock == false && $.k2l.m6a3_6.stuckFlag == false){
      $.k2l.m6a3_6.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m6a3_6.questionWordLock = false;
      }, 1000);
      $('.incorrectscreen').removeClass("hidden");
      setTimeout(function(){
        $('.incorrectscreen').addClass("hidden");
      }, 1000);
      $.k2l.m6a3_6.wrongscore++;

      if($.k2l.m6a3_6.wrongscore > 2){
        $('.stuck').removeClass('hidden');
      }

    }
	},
  'click .stuck': function(evt) {
    $('.stuck').addClass('hidden');
    $.k2l.m6a3_6.wrongscore = 0;
    $.k2l.m6a3_6.index = 0;
    $(".counterleft u").html($.k2l.m6a3_6.index);
    $('.paraclick-word').addClass('correctword');
    $('.paraclick-word-sleep').addClass('correctword');
    $('#m6a3_6 .navfooter a').removeClass('hidden');
    $.k2l.m6a3_6.stuckFlag = true;
  },

  'click .navfooter a': function(evt) {
    $('#m6a3_6 .navfooter a').addClass('hidden');
    $('.paraclick-word').removeClass('correctword');
    $.k2l.m6a3_6.wrongscore = 0;
    $.k2l.m6a3_6.index = 1;
		$.k2l.m6a3_6.stuckFlag = false;
    $(".counterleft u").html($.k2l.m6a3_6.index);
  }

});

Template.m6a3_6.rendered = function() {
  if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m6a3_6 == 'undefined') {
		$.k2l.m6a3_6 = {};
	};

	$.k2l.m6a3_6.index = 1;
  $.k2l.m6a3_6.wrongscore = 0;
  $.k2l.m6a3_6.stuckFlag = false;
  $.k2l.m6a3_6.questionWordLock = false;

}

Template.m6a3_7.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a3_7");
	}
});

Template.m6a3_7.events({
	
	"submit form" : function(evt) {
		
		if (evt.preventDefault){
			evt.preventDefault();
		}
		var isCorrect = false;
		
		// Tidy the user input
		var userText = evt.target.userText.value;
		if (userText.charAt(userText.length - 1) == '.') {
			userText = userText.substr(0, userText.length - 1);
		}
		userText = $.trim(userText);
		userText = userText.toLowerCase();
		
		for (var i = 0; i < $.k2l.m6a3_7.correctAnswers[$.k2l.m6a3_7.index].length; i++) {
			if (userText == $.k2l.m6a3_7.correctAnswers[$.k2l.m6a3_7.index][i]){ 
				isCorrect = true;
			//	$.k2l.m6a3_7.correctAnswerIndex = i; // use this if there are multiple possible answers
				break;
			}
		}
		
		if (isCorrect){
			//correct
			$('.correctscreen').removeClass('hidden');
			setTimeout( function() {
				$('.correctscreen').addClass('hidden');
			}, 1000);
			var parentSection = $(evt.currentTarget).parents('section');
			$.k2l.m6a3_7.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			// $(evt.currentTarget).parent().html($.k2l.m6a3_7.correctAnswers[$.k2l.m6a3_7.index]);
			$(evt.currentTarget).parent().html($.k2l.m6a3_7.displayAnswers[$.k2l.m6a3_7.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m6a3_7.index).addClass('correctword');
			
			if ($.k2l.m6a3_7.index < $.k2l.m6a3_7.correctAnswers.length - 1) {
				$.k2l.m6a3_7.index++;
				$('#entryanswer'+$.k2l.m6a3_7.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m6a3_7.index).html('<form class="textentry"><input type="text" name="userText" size="12" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m6a3_7.index = 0;
				$.k2l.m6a3_7.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m6a3_7.wrongcount++;
			if ($.k2l.m6a3_7.wrongcount >= 1) {
				$('.stuck').removeClass('hidden');
			}
			$('.incorrectscreen').removeClass('hidden');
		setTimeout( function() {
			$('.incorrectscreen').addClass('hidden');
		}, 1000);
			evt.target.userText.value = "";
		}
	},
	
	"click .stuck-button": function(evt) {
		$('.incorrectscreen').addClass('hidden');
		var parentSection = $(evt.currentTarget).parents('section');
		$('.stuck').addClass('hidden'); //hide stuck button if visible
		$.k2l.m6a3_7.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m6a3_7.index).html($.k2l.m6a3_7.correctAnswers[$.k2l.m6a3_7.index]);
		$('#entryanswer'+$.k2l.m6a3_7.index).html($.k2l.m6a3_7.correctAnswers[$.k2l.m6a3_7.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m6a3_7.index).addClass('correctword');
		
		if ($.k2l.m6a3_7.index < $.k2l.m6a3_7.correctAnswers.length - 1) {
			$.k2l.m6a3_7.index++;
			$('#entryanswer'+$.k2l.m6a3_7.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m6a3_7.index).html('<form class="textentry"><input type="text" name="userText" size="12" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m6a3_7.index = 0;
			$.k2l.m6a3_7.wrongcount = 0;
				setTimeout(function() {
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},
	
	"click .pagination": function(evt){
		$.k2l.m6a3_7.index = 0;
		$.k2l.m6a3_7.wrongcount = 0;
	}
	
});

Template.m6a3_7.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m6a3_7 == 'undefined') {
		$.k2l.m6a3_7 = {};
	};
	
	$.k2l.m6a3_7.index = 0;
	$.k2l.m6a3_7.wrongcount = 0;
//	$.k2l.m6a3_7.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
			["outrank"], // Possible answers for Q1.
			["unduly"],   // Possible answers for Q2.
			["heartthrob"], // etc.
			["frivolous"],
			//["answer1", "answer2"], // Use this for multiple possible answers
			["rest on their laurels", "rest on your laurels"],
			["lagged", "lag"]
		];
		
		 var displayAnswers = [
		["outrank"], // Possible answers for Q1.
      ["unduly"],   // Possible answers for Q2.
      ["heartthrob"], // etc.
      ["frivolous"],
      //["answer1", "answer2"], // Use this for multiple possible answers
      ["rest on their laurels"],
      ["lagged"]
		]; 
		
	$.k2l.m6a3_7.displayAnswers = displayAnswers; 
	$.k2l.m6a3_7.correctAnswers = correctAnswers;
	
}
