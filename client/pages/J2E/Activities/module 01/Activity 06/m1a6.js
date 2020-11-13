Template.m1a6.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m1a6_end') { 
			return false; 
		}
		return true;	 
	} 
}); 

Template.m1a6.rendered = function() { 
	setStartActivity(1,6);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(1, 6, subpage);
			oldLocation = location.href;
		}
	}, 500);

    document.title = "Journey 2 English";
		
}


Template.m1a6.created = function() {
  this.subscribe("userProgress");
  this.subscribe("pauseConnection", 1, 6, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m1a6.destroyed = function() {
  clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


Template.m1a6_2.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a6_2");
	}
});

Template.m1a6_2.events({
	
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
		
		for (var i = 0; i < $.k2l.m1a6_2.correctAnswers[$.k2l.m1a6_2.index].length; i++) {
			if (userText == $.k2l.m1a6_2.correctAnswers[$.k2l.m1a6_2.index][i]){ 
				isCorrect = true;
				// $.k2l.m1a6_2.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m1a6_2.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			$(evt.currentTarget).parent().html($.k2l.m1a6_2.correctAnswers[$.k2l.m1a6_2.index]);
			// $(evt.currentTarget).parent().html($.k2l.m1a6_2.displayAnswers[$.k2l.m1a6_2.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m1a6_2.index).addClass('correctword');
			
			if ($.k2l.m1a6_2.index < $.k2l.m1a6_2.correctAnswers.length - 1) {
				$.k2l.m1a6_2.index++;
				$('#m1a6audio' + $.k2l.m1a6_2.audioOrder[$.k2l.m1a6_2.index]).attr("data-audiosrc","/audio/module1/a6/"+$.k2l.m1a6_2.audio[$.k2l.m1a6_2.index]+".m4a");
				if ($('#m1a6audio' + $.k2l.m1a6_2.audioOrder[$.k2l.m1a6_2.index]).hasClass('hidden')){
					$('#m1a6audio' + $.k2l.m1a6_2.audioOrder[$.k2l.m1a6_2.index]).removeClass('hidden');
				}
				$('#entryanswer'+$.k2l.m1a6_2.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m1a6_2.index).html('<form class="textentry"><input type="text" name="userText" size="4" maxlength="4" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m1a6_2.index = 0;
				$.k2l.m1a6_2.wrongcount = 0;
				$.k2l.m1a6_2.index = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					$.k2l.m1a6_2.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m1a6_2.wrongcount++;
			if ($.k2l.m1a6_2.wrongcount >= 1) {
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
		$.k2l.m1a6_2.wrongcount = 0;
		$('#entryanswer'+$.k2l.m1a6_2.index).html($.k2l.m1a6_2.correctAnswers[$.k2l.m1a6_2.index]);
		// $('#entryanswer'+$.k2l.m1a6_2.index).html($.k2l.m1a6_2.displayAnswers[$.k2l.m1a6_2.index][0]); // use this if there are multiple possible answers and you only want to show the first correct answer on the list
		$('#entryanswer'+$.k2l.m1a6_2.index).addClass('correctword');
		
		if ($.k2l.m1a6_2.index < $.k2l.m1a6_2.correctAnswers.length - 1) {
			$.k2l.m1a6_2.index++;
			$('#m1a6audio' + $.k2l.m1a6_2.audioOrder[$.k2l.m1a6_2.index]).attr("data-audiosrc","/audio/module1/a6/"+$.k2l.m1a6_2.audio[$.k2l.m1a6_2.index]+".m4a");
			if ($('#m1a6audio' + $.k2l.m1a6_2.audioOrder[$.k2l.m1a6_2.index]).hasClass('hidden')){
					$('#m1a6audio' + $.k2l.m1a6_2.audioOrder[$.k2l.m1a6_2.index]).removeClass('hidden');
				}
			$('#entryanswer'+$.k2l.m1a6_2.index).removeClass('textentry-disabled');
			$('#entryanswer'+$.k2l.m1a6_2.index).html('<form class="textentry"><input type="text" name="userText" size="4" maxlength="4" autocomplete="off"><input type="submit" value="OK"></form>');
			// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m1a6_2.index = 0;
			$.k2l.m1a6_2.wrongcount = 0;
				setTimeout(function() {
					$.k2l.m1a6_2.sound.src = {};
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 4000);
			//$('.pagination').removeClass('hidden');
		}
	},

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m1a6_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m1a6_2.sound, $(evt.currentTarget));
	},
	
	
});

Template.m1a6_2.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m1a6_2 == 'undefined') {
		$.k2l.m1a6_2 = {};
	};
	
	$.k2l.m1a6_2.index = 0;
	$.k2l.m1a6_2.wrongcount = 0;
	// $.k2l.m1a6_2.correctAnswerIndex = 0; // for multiple answers

	var correctAnswers = [
							["0776"],
							["321"],
							["7328"],
							["16"],
							["5"],
							["0"],
							["39"],
							["99"],
							["6"],
							["25"],
							["40"],
							["0"],
							["69"],
							["16"],
							["01"]
						];

	var audio = ["1-0776","2-321","3-7328","4-minus16","5-5nil","5-5nil","6-3999","6-3999","7-625","7-625","8-40love","8-40love","9-69p","10-1601","10-1601"];

	var audioOrder = ["1","1","1","2","3","3","4","4","5","5","6","6","7","8","8"];

	$.k2l.m1a6_2.audio = audio;
	$.k2l.m1a6_2.sound = new Audio();
	$.k2l.m1a6_2.correctAnswers = correctAnswers;
	$.k2l.m1a6_2.audioOrder = audioOrder;
	
}