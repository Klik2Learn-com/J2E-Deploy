Template.m9a16.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m9a16_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m9a16.rendered = function() { 
	document.title = "Journey 2 English";
	
	setStartActivity(9,16);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(9, 16, subpage);
			oldLocation = location.href;
		}
	}, 500);
		
}

Template.m9a16.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 9, 16, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m9a16.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m9a16_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a16_2"); 
	} 
}); 
 
Template.m9a16_2.events({
	'click .paraclick-word2': function(evt) {
		if ($(evt.target).hasClass('correctword')){
				return;
		}
	var parentSection = $(evt.currentTarget).parents('section');
    if($.k2l.m9a16_2.questionWordLock == false && $.k2l.m9a16_2.stuckFlag == false){
      $.k2l.m9a16_2.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m9a16_2.questionWordLock = false;
      }, 1000);
			$('.paraclick-word2').addClass('grammar');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m9a16_2.index--;
      $(".counterleft u").html($.k2l.m9a16_2.index);

      if($.k2l.m9a16_2.index <=0){
      $('.pagination').removeClass('hidden');
	  $('.stuck').addClass('hidden');
     setTimeout( function() {
        $('#welldonecap').removeClass('hidden');
        }, 1000);
      setTimeout( function() {
        $('#welldonecap').addClass('hidden');
      }, 2000);
      }
    }
	},

	'click .paraclick-word': function(evt) {
		if ($(evt.target).hasClass('correctword')){
				return;
		}
	var parentSection = $(evt.currentTarget).parents('section');
    if($.k2l.m9a16_2.questionWordLock == false && $.k2l.m9a16_2.stuckFlag == false){
      $.k2l.m9a16_2.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m9a16_2.questionWordLock = false;
      }, 1000);
      $(evt.target).addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m9a16_2.index--;
      $(".counterleft u").html($.k2l.m9a16_2.index);

      if($.k2l.m9a16_2.index <=0){
    $('.pagination').removeClass('hidden');
	$('.stuck').addClass('hidden');
    setTimeout( function() {
        $('#welldonecap').removeClass('hidden');
        }, 1000);
      setTimeout( function() {
        $('#welldonecap').addClass('hidden');
      }, 2000);
      }
    }
	},

  'click .wrong': function(evt) {

    if($.k2l.m9a16_2.questionWordLock == false && $.k2l.m9a16_2.stuckFlag == false){
      $.k2l.m9a16_2.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m9a16_2.questionWordLock = false;
      }, 1000);
      $('.incorrectscreen').removeClass("hidden");
      setTimeout(function(){
        $('.incorrectscreen').addClass("hidden");
      }, 1000);
      $.k2l.m9a16_2.wrongscore++;

      if($.k2l.m9a16_2.wrongscore > 2){
        $('.stuck').removeClass('hidden');
      }

    }
	},
  'click .stuck': function(evt) {
    $('.stuck').addClass('hidden');
    $.k2l.m9a16_2.wrongscore = 0;
    $.k2l.m9a16_2.index = 0;
    $(".counterleft u").html($.k2l.m9a16_2.index);
    $('.paraclick-word').addClass('correctword');
    $('.paraclick-word2').addClass('grammar');
    $('#m9a16_2 .navfooter a').removeClass('hidden');
    $.k2l.m9a16_2.stuckFlag = true;
  },

  'click .navfooter a': function(evt) {
    $('#m9a16_2 .navfooter a').addClass('hidden');
    $('.paraclick-word').removeClass('correctword');
    $.k2l.m9a16_2.wrongscore = 0;
    $.k2l.m9a16_2.index = 4;
		$.k2l.m9a16_2.stuckFlag = false;
    $(".counterleft u").html($.k2l.m9a16_2.index);
  }

});

Template.m9a16_2.rendered = function() {
  if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m9a16_2 == 'undefined') {
		$.k2l.m9a16_2 = {};
	};

	$.k2l.m9a16_2.index = 4;
  $.k2l.m9a16_2.wrongscore = 0;
  $.k2l.m9a16_2.stuckFlag = false;
  $.k2l.m9a16_2.questionWordLock = false;

}


Template.m9a16_5.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a16_5"); 
	} 
}); 
 
Template.m9a16_5.events({ 
 
}); 
 
Template.m9a16_5.rendered = function() {
}

Template.m9a16_7.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a16_7"); 
	} 
}); 
 
Template.m9a16_7.events({
	
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
		
		for (var i = 0; i < $.k2l.m9a16_7.correctAnswers[$.k2l.m9a16_7.index].length; i++) {
			if (userText == $.k2l.m9a16_7.correctAnswers[$.k2l.m9a16_7.index][i]){ 
				isCorrect = true;
				// $.k2l.m9a16_7.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m9a16_7.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			// $(evt.currentTarget).parent().html($.k2l.m9a16_7.correctAnswers[$.k2l.m9a16_7.index]);
			$(evt.currentTarget).parent().html($.k2l.m9a16_7.displayAnswers[$.k2l.m9a16_7.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m9a16_7.index).addClass('correctword');
			$('#explain'+$.k2l.m9a16_7.index).html($.k2l.m9a16_7.explain[$.k2l.m9a16_7.index]);
			
			if ($.k2l.m9a16_7.index < $.k2l.m9a16_7.correctAnswers.length - 1) {
				$.k2l.m9a16_7.index++;
				$('#entryanswer'+$.k2l.m9a16_7.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m9a16_7.index).html('<form class="textentry"><input type="text" name="userText" size="15" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m9a16_7.index = 0;
				$.k2l.m9a16_7.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				// setTimeout(function() {
				// 	$(parentSection).addClass('hidden'); // hide this page
				// 	$(parentSection).next('section').removeClass('hidden');// reveal next page.
				// 	document.location.hash = $(parentSection).next('section').attr('id');
				// 	Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
				// 	}, 2000);
				$('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m9a16_7.wrongcount++;
			if ($.k2l.m9a16_7.wrongcount >= 1) {
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
		$.k2l.m9a16_7.wrongcount = 0;
		// $('#entryanswer'+$.k2l.m9a16_7.index).html($.k2l.m9a16_7.correctAnswers[$.k2l.m9a16_7.index]);
		$('#entryanswer'+$.k2l.m9a16_7.index).html($.k2l.m9a16_7.displayAnswers[$.k2l.m9a16_7.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m9a16_7.index).addClass('correctword');
		$('#explain'+$.k2l.m9a16_7.index).html($.k2l.m9a16_7.explain[$.k2l.m9a16_7.index]);
		
		if ($.k2l.m9a16_7.index < $.k2l.m9a16_7.correctAnswers.length - 1) {
			$.k2l.m9a16_7.index++;
			$('#entryanswer'+$.k2l.m9a16_7.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m9a16_7.index).html('<form class="textentry"><input type="text" name="userText" size="15" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m9a16_7.index = 0;
			$.k2l.m9a16_7.wrongcount = 0;
				// setTimeout(function() {
				// 	$(parentSection).addClass('hidden'); // hide this page
				// 	$(parentSection).next('section').removeClass('hidden');// reveal next page.
				// 	document.location.hash = $(parentSection).next('section').attr('id');
				// 	Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
				// 	}, 1000);
			$('.pagination').removeClass('hidden');
		}
	},
	
	"click .pagination": function(evt){
		$.k2l.m9a16_7.index = 0;
		$.k2l.m9a16_7.wrongcount = 0;
	}
	
});

Template.m9a16_7.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m9a16_7 == 'undefined') {
		$.k2l.m9a16_7 = {};
	};
	
	$.k2l.m9a16_7.index = 0;
	$.k2l.m9a16_7.wrongcount = 0;
	$.k2l.m9a16_7.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
			["'ve been travelling", "ve been travelling", "have been travelling"], // Possible answers for Q1.
			["'s been living", "s been living", "has been living"],   // Possible answers for Q2.
			["'s been chatting", "s been chatting", "has been chatting"], // etc.
			["'s been working", "s been working", "has been working"],
			//["answer1", "answer2"], // Use this for multiple possible answers
			["'s been learning", "s been learning", "has been learning"]
		];
		
		 var displayAnswers = [
			["have been travelling"], // Possible answers for Q1.
			["has been living"],   // Possible answers for Q2.
			["has been chatting"], // etc.
			["has been working"],
			["has been learning"]
		]; 

		var explain = ['<div class="info right2 shadow">I am still travelling by train.</div>', '<div class="info right2 shadow">He is still living there.</div>','<div class="info right2 shadow">She is still chatting on Facebook.</div>', '<div class="info right2 shadow">He is still working too hard.</div>', '<div class="info right2 shadow">She is still learning Mandarin.</div>'];
		
	$.k2l.m9a16_7.explain = explain; 
	$.k2l.m9a16_7.displayAnswers = displayAnswers; 
	$.k2l.m9a16_7.correctAnswers = correctAnswers;
	
}

Template.m9a16_6.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a16_6"); 
	} 
}); 
 
Template.m9a16_6.events({ 
 
}); 
 
Template.m9a16_6.rendered = function() {
}

Template.m9a16_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m9a16_3"); 
	} 
}); 
 
Template.m9a16_3.events({
	'click .paraclick-word2': function(evt) {
		if ($(evt.target).hasClass('correctword')){
				return;
		}
	var parentSection = $(evt.currentTarget).parents('section');
    if($.k2l.m9a16_3.questionWordLock == false && $.k2l.m9a16_3.stuckFlag == false){
      $.k2l.m9a16_3.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m9a16_3.questionWordLock = false;
      }, 1000);
			$('.paraclick-word2').addClass('grammar');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m9a16_3.index--;
      $(".counterleft u").html($.k2l.m9a16_3.index);

      if($.k2l.m9a16_3.index <=0){
      $('.pagination').removeClass('hidden');
	  $('.stuck').addClass('hidden');
     setTimeout( function() {
        $('#welldonecap').removeClass('hidden');
        }, 1000);
      setTimeout( function() {
        $('#welldonecap').addClass('hidden');
      }, 2000);
      }
    }
	},

	'click .paraclick-word': function(evt) {
		if ($(evt.target).hasClass('correctword')){
				return;
		}
	var parentSection = $(evt.currentTarget).parents('section');
    if($.k2l.m9a16_3.questionWordLock == false && $.k2l.m9a16_3.stuckFlag == false){
      $.k2l.m9a16_3.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m9a16_3.questionWordLock = false;
      }, 1000);
      $(evt.target).addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m9a16_3.index--;
      $(".counterleft u").html($.k2l.m9a16_3.index);

      if($.k2l.m9a16_3.index <=0){
    $('.pagination').removeClass('hidden');
	$('.stuck').addClass('hidden');
    setTimeout( function() {
        $('#welldonecap').removeClass('hidden');
        }, 1000);
      setTimeout( function() {
        $('#welldonecap').addClass('hidden');
      }, 2000);
      }
    }
	},

  'click .wrong': function(evt) {

    if($.k2l.m9a16_3.questionWordLock == false && $.k2l.m9a16_3.stuckFlag == false){
      $.k2l.m9a16_3.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m9a16_3.questionWordLock = false;
      }, 1000);
      $('.incorrectscreen').removeClass("hidden");
      setTimeout(function(){
        $('.incorrectscreen').addClass("hidden");
      }, 1000);
      $.k2l.m9a16_3.wrongscore++;

      if($.k2l.m9a16_3.wrongscore > 2){
        $('.stuck').removeClass('hidden');
      }

    }
	},
  'click .stuck': function(evt) {
    $('.stuck').addClass('hidden');
    $.k2l.m9a16_3.wrongscore = 0;
    $.k2l.m9a16_3.index = 0;
    $(".counterleft u").html($.k2l.m9a16_3.index);
    $('.paraclick-word').addClass('correctword');
    $('.paraclick-word-sleep').addClass('correctword');
    $('#m9a16_3 .navfooter a').removeClass('hidden');
    $.k2l.m9a16_3.stuckFlag = true;
  },

  'click .navfooter a': function(evt) {
    $('#m9a16_3 .navfooter a').addClass('hidden');
    $('.paraclick-word').removeClass('correctword');
    $.k2l.m9a16_3.wrongscore = 0;
    $.k2l.m9a16_3.index = 4;
		$.k2l.m9a16_3.stuckFlag = false;
    $(".counterleft u").html($.k2l.m9a16_3.index);
  }

});

Template.m9a16_3.rendered = function() {
  if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m9a16_3 == 'undefined') {
		$.k2l.m9a16_3 = {};
	};

	$.k2l.m9a16_3.index = 4;
  $.k2l.m9a16_3.wrongscore = 0;
  $.k2l.m9a16_3.stuckFlag = false;
  $.k2l.m9a16_3.questionWordLock = false;

}

