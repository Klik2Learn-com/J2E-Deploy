

Template.m5a6.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m5a6_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m5a6.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 5, 6, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m5a6.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m5a6_3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a6_3");
	}
});

Template.m5a6_3.events({
	'click .paraclick-word': function(evt) {
		if ($(evt.target).hasClass('correctword')){
				return;
		}
	var parentSection = $(evt.currentTarget).parents('section');
    if($.k2l.m5a6_3.questionWordLock == false && $.k2l.m5a6_3.stuckFlag == false){
      $.k2l.m5a6_3.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m5a6_3.questionWordLock = false;
      }, 1000);
      $(evt.target).addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m5a6_3.index--;
      $(".counterleft u").html($.k2l.m5a6_3.index);

      if($.k2l.m5a6_3.index <=0){
    $('.pagination').removeClass('hidden');
	$('.stuck').addClass('hidden');
      }
    }
	},

  'click .wrong': function(evt) {

    if($.k2l.m5a6_3.questionWordLock == false && $.k2l.m5a6_3.stuckFlag == false){
      $.k2l.m5a6_3.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m5a6_3.questionWordLock = false;
      }, 1000);
      $('.incorrectscreen').removeClass("hidden");
      setTimeout(function(){
        $('.incorrectscreen').addClass("hidden");
      }, 1000);
      $.k2l.m5a6_3.wrongscore++;

      if($.k2l.m5a6_3.wrongscore > 2){
        $('.stuck').removeClass('hidden');
      }

    }
	},
  'click .stuck': function(evt) {
    $('.stuck').addClass('hidden');
    $.k2l.m5a6_3.wrongscore = 0;
    $.k2l.m5a6_3.index = 0;
    $(".counterleft u").html($.k2l.m5a6_3.index);
    $('.paraclick-word').addClass('correctword');
    $('.paraclick-word-sleep').addClass('correctword');
    $('#m5a6_3 .navfooter a').removeClass('hidden');
    $.k2l.m5a6_3.stuckFlag = true;
  },

  'click .navfooter a': function(evt) {
    $('#m5a6_3 .navfooter a').addClass('hidden');
    $('.paraclick-word').removeClass('correctword');
    $.k2l.m5a6_3.wrongscore = 0;
    $.k2l.m5a6_3.index = 5;
		$.k2l.m5a6_3.stuckFlag = false;
    $(".counterleft u").html($.k2l.m5a6_3.index);
  }

});

Template.m5a6_3.rendered = function() {
  if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m5a6_3 == 'undefined') {
		$.k2l.m5a6_3 = {};
	};

	$.k2l.m5a6_3.index = 5;
  $.k2l.m5a6_3.wrongscore = 0;
  $.k2l.m5a6_3.stuckFlag = false;
  $.k2l.m5a6_3.questionWordLock = false;

}

Template.m5a6_4.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a6_4");
	}
});

Template.m5a6_4.events({
	'click .paraclick-word': function(evt) {
		if ($(evt.target).hasClass('correctword')){
				return;
		}
	var parentSection = $(evt.currentTarget).parents('section');
    if($.k2l.m5a6_4.questionWordLock == false && $.k2l.m5a6_4.stuckFlag == false){
      $.k2l.m5a6_4.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m5a6_4.questionWordLock = false;
      }, 1000);
      $(evt.target).addClass('correctword');
      $('.correctscreen').removeClass("hidden");
      setTimeout(function(){
        $('.correctscreen').addClass("hidden");
      }, 1000);

      $.k2l.m5a6_4.index--;
      $(".counterleft u").html($.k2l.m5a6_4.index);

      if($.k2l.m5a6_4.index <=0){
    $('.pagination').removeClass('hidden');
	$('.stuck').addClass('hidden');
      }
    }
	},

  'click .wrong': function(evt) {

    if($.k2l.m5a6_4.questionWordLock == false && $.k2l.m5a6_4.stuckFlag == false){
      $.k2l.m5a6_4.questionWordLock = true;
      setTimeout(function(){
        $.k2l.m5a6_4.questionWordLock = false;
      }, 1000);
      $('.incorrectscreen').removeClass("hidden");
      setTimeout(function(){
        $('.incorrectscreen').addClass("hidden");
      }, 1000);
      $.k2l.m5a6_4.wrongscore++;

      if($.k2l.m5a6_4.wrongscore > 2){
        $('.stuck').removeClass('hidden');
      }

    }
	},
  'click .stuck': function(evt) {
    $('.stuck').addClass('hidden');
    $.k2l.m5a6_4.wrongscore = 0;
    $.k2l.m5a6_4.index = 0;
    $(".counterleft u").html($.k2l.m5a6_4.index);
    $('.paraclick-word').addClass('correctword');
    $('.paraclick-word-sleep').addClass('correctword');
    $('#m5a6_4 .navfooter a').removeClass('hidden');
    $.k2l.m5a6_4.stuckFlag = true;
  },

  'click .navfooter a': function(evt) {
    $('#m5a6_4 .navfooter a').addClass('hidden');
    $('.paraclick-word').removeClass('correctword');
    $.k2l.m5a6_4.wrongscore = 0;
    $.k2l.m5a6_4.index = 2;
		$.k2l.m5a6_4.stuckFlag = false;
    $(".counterleft u").html($.k2l.m5a6_4.index);
  }

});

Template.m5a6_4.rendered = function() {
  if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m5a6_4 == 'undefined') {
		$.k2l.m5a6_4 = {};
	};

	$.k2l.m5a6_4.index = 2;
  $.k2l.m5a6_4.wrongscore = 0;
  $.k2l.m5a6_4.stuckFlag = false;
  $.k2l.m5a6_4.questionWordLock = false;

}

Template.m5a6_5.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a6_5");
	}
});

Template.m5a6_5.events({
	
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
		
		for (var i = 0; i < $.k2l.m5a6_5.correctAnswers[$.k2l.m5a6_5.index].length; i++) {
			if (userText == $.k2l.m5a6_5.correctAnswers[$.k2l.m5a6_5.index][i]){ 
				isCorrect = true;
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
			$.k2l.m5a6_5.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m5a6_5.correctAnswers[$.k2l.m5a6_5.index]);
			// $(evt.currentTarget).parent().html($.k2l.m5a6_5.displayAnswers[$.k2l.m5a6_5.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m5a6_5.index).addClass('correctword');
			
			if ($.k2l.m5a6_5.index < $.k2l.m5a6_5.correctAnswers.length - 1) {
				$.k2l.m5a6_5.index++;
				$('#entryanswer'+$.k2l.m5a6_5.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m5a6_5.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m5a6_5.index = 0;
				$.k2l.m5a6_5.wrongcount = 0;
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
			$.k2l.m5a6_5.wrongcount++;
			if ($.k2l.m5a6_5.wrongcount >= 1) {
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
		$.k2l.m5a6_5.wrongcount = 0;
		$('#entryanswer'+$.k2l.m5a6_5.index).html($.k2l.m5a6_5.correctAnswers[$.k2l.m5a6_5.index]);
		// $('#entryanswer'+$.k2l.m5a6_5.index).html($.k2l.m5a6_5.displayAnswers[$.k2l.m5a6_5.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m5a6_5.index).addClass('correctword');
		
		if ($.k2l.m5a6_5.index < $.k2l.m5a6_5.correctAnswers.length - 1) {
			$.k2l.m5a6_5.index++;
			$('#entryanswer'+$.k2l.m5a6_5.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m5a6_5.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m5a6_5.index = 0;
			$.k2l.m5a6_5.wrongcount = 0;
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
		$.k2l.m5a6_5.index = 0;
		$.k2l.m5a6_5.wrongcount = 0;
	}
	
});

Template.m5a6_5.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m5a6_5 == 'undefined') {
		$.k2l.m5a6_5 = {};
	};
	
	$.k2l.m5a6_5.index = 0;
	$.k2l.m5a6_5.wrongcount = 0;
	
	var correctAnswers = [
			["reached"],
			["pounded"],
			["covered"],
			["proved"],
			["sailed"]
		];
		
		/* var displayAnswers = [
			["reached"],
			["pounded"],
			["covered"],
			["proved"],
			["sailed"]
		]; 
		
	$.k2l.m5a6_5.displayAnswers = displayAnswers; */
	$.k2l.m5a6_5.correctAnswers = correctAnswers;
	
}

Template.m5a6_6.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m5a6_6");
	}
});

Template.m5a6_6.events({
	
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
		
		for (var i = 0; i < $.k2l.m5a6_6.correctAnswers[$.k2l.m5a6_6.index].length; i++) {
			if (userText == $.k2l.m5a6_6.correctAnswers[$.k2l.m5a6_6.index][i]){ 
				isCorrect = true;
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
			$.k2l.m5a6_6.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m5a6_6.correctAnswers[$.k2l.m5a6_6.index]);
			// $(evt.currentTarget).parent().html($.k2l.m5a6_6.displayAnswers[$.k2l.m5a6_6.index]); // use this is there is multiple possible answers
			$('#entryanswer'+$.k2l.m5a6_6.index).addClass('correctword');
			
			if ($.k2l.m5a6_6.index < $.k2l.m5a6_6.correctAnswers.length - 1) {
				$.k2l.m5a6_6.index++;
				$('#entryanswer'+$.k2l.m5a6_6.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m5a6_6.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m5a6_6.index = 0;
				$.k2l.m5a6_6.wrongcount = 0;
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
			$.k2l.m5a6_6.wrongcount++;
			if ($.k2l.m5a6_6.wrongcount >= 1) {
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
		$.k2l.m5a6_6.wrongcount = 0;
		$('#entryanswer'+$.k2l.m5a6_6.index).html($.k2l.m5a6_6.correctAnswers[$.k2l.m5a6_6.index]);
		// $('#entryanswer'+$.k2l.m5a6_6.index).html($.k2l.m5a6_6.displayAnswers[$.k2l.m5a6_6.index]); // use this is there is multiple possible answers
		$('#entryanswer'+$.k2l.m5a6_6.index).addClass('correctword');
		
		if ($.k2l.m5a6_6.index < $.k2l.m5a6_6.correctAnswers.length - 1) {
			$.k2l.m5a6_6.index++;
			$('#entryanswer'+$.k2l.m5a6_6.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m5a6_6.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m5a6_6.index = 0;
			$.k2l.m5a6_6.wrongcount = 0;
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
		$.k2l.m5a6_6.index = 0;
		$.k2l.m5a6_6.wrongcount = 0;
	}
	
});

Template.m5a6_6.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m5a6_6 == 'undefined') {
		$.k2l.m5a6_6 = {};
	};
	
	$.k2l.m5a6_6.index = 0;
	$.k2l.m5a6_6.wrongcount = 0;
	
	var correctAnswers = [
			["waded"],
			["flooded"]
		];
		
		/* var displayAnswers = [
			["waded"],
			["flooded"]
		]; 
		
	$.k2l.m5a6_6.displayAnswers = displayAnswers; */
	$.k2l.m5a6_6.correctAnswers = correctAnswers;
	
}

Template.m5a6.helpers({
endPageSect: function() {
var session = Session.get('activeSection');
if (session == '#m5a6_end') {
 	return false;
	}
return true;
},

	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m5a6");
	}
})

Template.m5a6.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m5a6.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m5a6.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m5a6.sound.src = {};
	}

});

Template.m5a6.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(5, 6);

	    var oldLocation = location.href;
  $.locationInterval = setInterval( function() {
    if(location.href != oldLocation) {
      subpage = location.href.split("#")[1];
      setLatestSubPage(5, 6, subpage);
      oldLocation = location.href;
    }
  }, 500);

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m5a6 == 'undefined') {
		$.k2l.m5a6 = {};
	};
	
	$.k2l.m5a6.sound = new Audio();
}
