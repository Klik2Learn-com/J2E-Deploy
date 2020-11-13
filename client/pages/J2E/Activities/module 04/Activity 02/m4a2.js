

Template.m4a2.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m4a2_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m4a2.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(4, 2);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 2, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m4a2.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 2, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a2.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m4a2_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a2_1");
	}
});

Template.m4a2_1.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m4a2_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m4a2_1.sound, $(evt.currentTarget));

	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m4a2_1.sound.src = {};
	}

});

Template.m4a2_1.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m4a2_1 == 'undefined') {
		$.k2l.m4a2_1 = {};
	};
	
	$.k2l.m4a2_1.sound = new Audio();
}


Template.m4a2_2.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m4a2_2");
	}
});



Template.m4a2_2.events({
	"click .button2": function(evt){
		
		if ($.k2l.m4a2_2.allowClick == true) {
			$.k2l.m4a2_2.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m4a2_2.answer_index[$.k2l.m4a2_2.index]) {
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				$.k2l.m4a2_2.rightscore++;
				var rightScore = $.k2l.m4a2_2.rightscore;
				var wrongScore = $.k2l.m4a2_2.wrongscore;
				
				Session.set('m4a2_2RightScore', rightScore);
				Session.set('m4a2_2WrongScore', wrongScore);
				
				if ($.k2l.m4a2_2.index < $.k2l.m4a2_2.questions.length-1) {
					$.k2l.m4a2_2.index++;
					setTimeout(function() {
						$.k2l.m4a2_2.sound.src = {};
						$('.buttonaudio').attr("data-audiosrc",$.k2l.m4a2_2.questions[$.k2l.m4a2_2.index]);
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$('.number').html($.k2l.m4a2_2.index+1);
						$('#question_text').html($.k2l.m4a2_2.questiontext[$.k2l.m4a2_2.index]);
						
						/* Reset all audio buttons because its gonna be a new question */
						resetAllAudioButtons();
						$.k2l.m4a2_2.allowClick = true; // Make the buttons clickable again
					}, 1000);
				} else {
					$.k2l.m4a2_2.sound.src = {};
					setTimeout (function() {
						$('#welldonecap').removeClass('hidden');
					}, 1000);
					
					setTimeout(function() {
						$('#welldonecap').addClass('hidden');
						$.k2l.m4a2_2.index = 0;
						$.k2l.m4a2_2.allowClick = true; // Make the buttons clickable again
						$("#m4a2_2").addClass('hidden');
						
						if ($.k2l.m4a2_2.wrongscore <= 3) {
							$("#m4a2_2_good").removeClass('hidden');
							document.location.hash = "#m4a2_2_good";
							Session.set("activeSection", "#m4a2_2_good");
						} else {
							$("#m4a2_2_bad").removeClass('hidden');
							document.location.hash = "#m4a2_2_bad";
							Session.set("activeSection", "#m4a2_2_bad");
						}
					}, 2000);
					
					// $('.pagination').removeClass('hidden');
				}
			} else {
				$.k2l.m4a2_2.wrongscore++;
				// incorrect
				var rightScore = $.k2l.m4a2_2.rightscore;
				var wrongScore = $.k2l.m4a2_2.wrongscore;
			
				Session.set('m4a2_2RightScore', rightScore);
				Session.set('m4a2_2WrongScore', wrongScore);
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
				
				
				if ($.k2l.m4a2_2.index < $.k2l.m4a2_2.questions.length-1) {
					$.k2l.m4a2_2.index++;
					setTimeout(function() {
						$.k2l.m4a2_2.sound.src = {};
						$('.buttonaudio').attr("data-audiosrc",$.k2l.m4a2_2.questions[$.k2l.m4a2_2.index]);
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$('.number').html($.k2l.m4a2_2.index+1);
						$('#question_text').html($.k2l.m4a2_2.questiontext[$.k2l.m4a2_2.index]);
						/* Reset all audio buttons because its gonna be a new question */
						resetAllAudioButtons();
						$.k2l.m4a2_2.allowClick = true; // Make the buttons clickable again
						
					}, 1000);
				} else {
					$.k2l.m4a2_2.sound.src = {};
					setTimeout (function() {
						$('#welldonecap').removeClass('hidden');
					}, 1000);
					
					setTimeout(function() {
						$('#welldonecap').addClass('hidden');
						$("#m4a2_2").addClass('hidden');
						
						if ($.k2l.m4a2_2.wrongscore < 3) {
							$("#m4a2_2_good").removeClass('hidden');
							Session.set("activeSection", "#m4a2_2_good");
						} else {
							$("#m4a2_2_bad").removeClass('hidden');
							Session.set("activeSection", "#m4a2_2_bad");
						}
					}, 2000);
			}
		}
		}
		// ASSIGN SCORES
		$('#m4a2RightScore').html(Session.get('m4a2_2RightScore'))
		$('#m4a2WrongScore').html(Session.get('m4a2_2WrongScore'))
			
	},
	
	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m4a2_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m4a2_2.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		$.k2l.m4a2_2.sound.src = {};
		$.k2l.m4a2_2.index = 0;
		$.k2l.m4a2_2.allowClick = true;
	}

});

Template.m4a2_2.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m4a2_2 == 'undefined') {
		$.k2l.m4a2_2 = {};
	};
	
	$.k2l.m4a2_2.sound = new Audio();
	
	var questiontext = ["Grain can be an ingredient for energy drinks.",
						"Most energy drinks are consumed by young people.",
						"Not getting enough sleep can make you fat.",
						"More women than men suffer from sleep problems.",
						"Nearly half the world’s population doesn’t get enough sleep.",
						"More people will become vegetarians in 2013.",
						"Most people stop eating meat because they don’t like animals being killed.",
						"Facebook is helping people to stay healthy through exercising.",
						"Computer games are always a bad influence on people’s health.",
						"Your mobile phone can help you identify health problems.",
						"You can use your mobile phone to take your blood pressure.",
						"By 2013 there will be more than 10,000 health apps in the app store."];
	
	var questions = ["/audio/module4/a2/energy_drinks.m4a",
					"/audio/module4/a2/energy_drinks.m4a",
					"/audio/module4/a2/sleep.m4a", 
					"/audio/module4/a2/sleep.m4a",
					"/audio/module4/a2/sleep.m4a",
					"/audio/module4/a2/flexitarians.m4a",
					"/audio/module4/a2/flexitarians.m4a",
					"/audio/module4/a2/online_motivation.m4a",
					"/audio/module4/a2/online_motivation.m4a",
					"/audio/module4/a2/diy_health_apps.m4a",
					"/audio/module4/a2/diy_health_apps.m4a",
					"/audio/module4/a2/diy_health_apps.m4a"				
					];
					
	var answer_index = ["true", "false", "true", "true","true","false","false","true","false","true","true","true"];
	
	$.k2l.m4a2_2.questions = questions;
	$.k2l.m4a2_2.questiontext = questiontext;
	$.k2l.m4a2_2.answer_index = answer_index;
	$.k2l.m4a2_2.index = 0;
	$.k2l.m4a2_2.rightscore = 0;
	$.k2l.m4a2_2.wrongscore = 0;
	
	Session.set('m4a2_2RightScore', 0);
	Session.set('m4a2_2WrongScore', 0);

	$.k2l.m4a2_2.allowClick = true;
}

Template.m4a2.events ({

	'click a[data-function="restart"]': function(evt) {
		$.k2l.m4a2_2.index = 0;
		$.k2l.m4a2_2.rightscore = 0;
		$.k2l.m4a2_2.wrongscore = 0;
		Session.set('m4a2_2RightScore', 0);
		Session.set('m4a2_2WrongScore', 0);
		$.k2l.m4a2_2.allowClick = true;
		forceReload();
	}

});


Template.m4a2_scores1.events ({

	"click .button1": function(evt) {
		Session.set("activeSection", "#m4a2_2");
		$.k2l.m4a2_2.index = 0;
		$.k2l.m4a2_2.rightscore = 0;
		$.k2l.m4a2_2.wrongscore = 0;
		Session.set('m4a2_2RightScore', 0);
		Session.set('m4a2_2WrongScore', 0);
		$.k2l.m4a2_2.allowClick = true;
		forceReload();
	}

});

Template.m4a2_scores2.events ({

	"click .button1": function(evt) {
		Session.set("activeSection", "#m4a2_2");
		$.k2l.m4a2_2.index = 0;
		$.k2l.m4a2_2.rightscore = 0;
		$.k2l.m4a2_2.wrongscore = 0;
		Session.set('m4a2_2RightScore', 0);
		Session.set('m4a2_2WrongScore', 0);
		$.k2l.m4a2_2.allowClick = true;
		forceReload();
	}

});

Template.m4a2_scores1.helpers({

	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m4a2_2_bad");
	}

});

Template.m4a2_scores2.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m4a2_2_good");
	}

});
