Template.m7a10.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m7a10_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m7a10.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(7, 10);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(7, 10, subpage);
			oldLocation = location.href;
		}
	}, 500);

}
Template.m7a10_1.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a10_1");
	}
});

Template.m7a10_1.events({
	
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
		
		for (var i = 0; i < $.k2l.m7a10_1.correctAnswers[$.k2l.m7a10_1.index].length; i++) {
			if (userText == $.k2l.m7a10_1.correctAnswers[$.k2l.m7a10_1.index][i]){ 
				isCorrect = true;
				 $.k2l.m7a10_1.correctAnswerIndex = i; // use this if there are multiple possible answers
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
			$.k2l.m7a10_1.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			//$(evt.currentTarget).parent().html($.k2l.m7a10_1.correctAnswers[$.k2l.m7a10_1.index]);
			$(evt.currentTarget).parent().html($.k2l.m7a10_1.displayAnswers[$.k2l.m7a10_1.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m7a10_1.index).addClass('correctword');
			if ($.k2l.m7a10_1.index < $.k2l.m7a10_1.correctAnswers.length - 1) {
				$.k2l.m7a10_1.index++;
	for (i=0; i< $.k2l.m7a10_1.switcherIndexes.length; i++){
		if( $.k2l.m7a10_1.index == $.k2l.m7a10_1.switcherIndexes[i]){
			setTimeout(function(){
				resetAudio();
				$('.buttonaudio').attr("data-audiosrc",$.k2l.m7a10_1.questionsaudio[$.k2l.m7a10_1.index]);
			$("#entryanswer" + ($.k2l.m7a10_1.index - 1)).parent("li").addClass("hidden");
			$("#entryanswer" + ($.k2l.m7a10_1.index)).parent("li").removeClass("hidden");
		},1500)
			// setTimeout(function() {
			// 				$.k2l.m7a10_1.sound.src = $('.buttonaudio').attr("data-audiosrc");
			// 				$.k2l.m7a10_1.sound.play();
			// 			}, 800);
			break;

		}
	}
				$('#entryanswer'+$.k2l.m7a10_1.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m7a10_1.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
			} else {
				$.k2l.m7a10_1.index = 0;
				$.k2l.m7a10_1.wrongcount = 0;
				setTimeout( function() {
				$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
			
				setTimeout(function() {
					resetAudio();
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
				// $('.pagination').removeClass('hidden');
			}
		} else {
			$.k2l.m7a10_1.wrongcount++;
			if ($.k2l.m7a10_1.wrongcount >= 1) {
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
			$.k2l.m7a10_1.wrongcount = 0;
			$('.stuck').addClass('hidden'); //hide stuck button if visible
			//$(evt.currentTarget).parent().html($.k2l.m7a10_1.correctAnswers[$.k2l.m7a10_1.index]);
			$('#entryanswer'+$.k2l.m7a10_1.index).html($.k2l.m7a10_1.displayAnswers[$.k2l.m7a10_1.index]); // use this if there are multiple possible answers
			$('#entryanswer'+$.k2l.m7a10_1.index).addClass('correctword');
			
			if ($.k2l.m7a10_1.index < $.k2l.m7a10_1.correctAnswers.length - 1) {
				$.k2l.m7a10_1.index++;
	for (i=0; i< $.k2l.m7a10_1.switcherIndexes.length; i++){
		if( $.k2l.m7a10_1.index == $.k2l.m7a10_1.switcherIndexes[i]){
			setTimeout(function(){
				$('.buttonaudio').attr("data-audiosrc",$.k2l.m7a10_1.questionsaudio[$.k2l.m7a10_1.index]);
			$("#entryanswer" + ($.k2l.m7a10_1.index - 1)).parent("li").addClass("hidden");
			$("#entryanswer" + ($.k2l.m7a10_1.index)).parent("li").removeClass("hidden");
		},4000)
			// setTimeout(function() {
			// 				$.k2l.m7a10_1.sound.src = $('.buttonaudio').attr("data-audiosrc");
			// 				$.k2l.m7a10_1.sound.play();
			// 			}, 800);
			break;

		}
	}
				$('#entryanswer'+$.k2l.m7a10_1.index).removeClass('textentry-disabled');
				$('#entryanswer'+$.k2l.m7a10_1.index).html('<form class="textentry"><input type="text" name="userText" size="7" autocomplete="off"><input type="submit" value="OK"></form>');
				// Need to get the cursor to focus on the next attempt
				$('input[name=userText]').focus();
		} else {
			$.k2l.m7a10_1.index = 0;
			$.k2l.m7a10_1.wrongcount = 0;
				setTimeout(function() {
					resetAudio();
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 1000);
			//$('.pagination').removeClass('hidden');
		}
	},

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a10_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a10_1.sound, $(evt.currentTarget));
	},

});

Template.m7a10_1.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a10_1 == 'undefined') {
		$.k2l.m7a10_1 = {};
	};
	
	$.k2l.m7a10_1.index = 0;
	$.k2l.m7a10_1.wrongcount = 0;
	$.k2l.m7a10_1.correctAnswerIndex = 0; // for multiple answers
	$.k2l.m7a10_1.sound = new Audio();

	var switcherIndexes = [2,4,6];
	$.k2l.m7a10_1.switcherIndexes = switcherIndexes;
	


	var correctAnswers = [
			["needed"], 
			["'d be", "would be"],  
			["were"], 
			["would not", "wouldnt", "wouldn't"],
			["were"],
			["would be"]
		];
		
		 var displayAnswers = [
			["needed"], 
			["would be"],  
			["were"], 
			["wouldn't"],
			["were"],
			["would be"]
		]; 

	var questionsaudio = ["/audio/module7/a10/1.m4a","/audio/module7/a10/1.m4a",	"/audio/module7/a10/2.m4a","/audio/module7/a10/2.m4a",	"/audio/module7/a10/3.m4a","/audio/module7/a10/3.m4a"];

	// var questionsaudio = ["/audio/module7/a10/1.m4a","/audio/module7/a10/2.m4a","/audio/module7/a10/3.m4a"];
		
	$.k2l.m7a10_1.displayAnswers = displayAnswers; 
	$.k2l.m7a10_1.correctAnswers = correctAnswers;
	$.k2l.m7a10_1.questionsaudio = questionsaudio;
	
}


Template.m7a10_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a10_2"); 
	} 
}); 
 
Template.m7a10_2.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a10_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a10_2.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m7a10_2.sound.src = {};
	}

});

Template.m7a10_2.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a10_2 == 'undefined') {
		$.k2l.m7a10_2 = {};
	};
	
	$.k2l.m7a10_2.sound = new Audio();
}

Template.m7a10_3.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a10_3"); 
	} 
}); 
 
Template.m7a10_3.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a10_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a10_3.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m7a10_3.sound.src = {};
	}

});

Template.m7a10_3.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a10_3 == 'undefined') {
		$.k2l.m7a10_3 = {};
	};
	
	$.k2l.m7a10_3.sound = new Audio();
}

Template.m7a10_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a10_4"); 
	} 
}); 
 
Template.m7a10_4.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a10_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a10_4.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m7a10_4.sound.src = {};
	}

});

Template.m7a10_4.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a10_4 == 'undefined') {
		$.k2l.m7a10_4 = {};
	};
	
	$.k2l.m7a10_4.sound = new Audio();
}


Template.m7a10.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 7, 10, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m7a10.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

var resetAudio = function(){
	$('.buttonaudio').removeClass('is-playing');
	$.k2l.m7a10_1.sound.src = {};
	$.k2l.m7a10_2.sound.src = {};
	$.k2l.m7a10_3.sound.src = {};
	$.k2l.m7a10_4.sound.src = {};
}