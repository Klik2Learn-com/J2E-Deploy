

Template.m4a17.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m4a17_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m4a17.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(4, 17);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 17, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m4a17.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 17, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a17.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m4a17_2.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m4a17_2");
	},

	rightScore: function(){
		return Session.get('m4a17_2RightScore');
	},

	wrongScore: function() {
		return Session.get('m3a17_2WrongScore');
	}
});

Template.m4a17_2.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m4a17_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m4a17_2.sound, $(evt.currentTarget));
	},

	'click .pagination': function(evt) {

		$.k2l.m4a17_2.sound.src = {};
	},

	 'click #m4a17_2 .button2': function(evt) {
		var buttonValue = $(evt.currentTarget).text();
		var correctAnswer = $.k2l.m4a17_2.correctAnswers[$.k2l.m4a17_2.index];
		/* Reset all audio buttons because its gonna be a new question */
		$.k2l.m4a17_2.sound.pause();
		resetAllAudioButtons();
		
		if((buttonValue == correctAnswer) && $.k2l.m4a17_2.questionWordLock == false){

			$.k2l.m4a17_2.questionWordLock = true;
			$("#m4a17_2 .button2").addClass('noclick');
			$('.correctscreen').removeClass("hidden");
			setTimeout(function(){
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m4a17_2.rightscore++;
			$.k2l.m4a17_2.index++;

			Session.set('m4a17_2RightScore', $.k2l.m4a17_2.rightscore);
			
			var audioUrl = "/audio/module4/a17/"+ ($.k2l.m4a17_2.questionsAudio[$.k2l.m4a17_2.index]) +".m4a";

			if($.k2l.m4a17_2.index < $.k2l.m4a17_2.questionsAudio.length){
				setTimeout(function() {
					$('.buttonaudio')[0].setAttribute('data-audiosrc', audioUrl);
					var audioButton = $('.buttonaudio')[0];
					audioButtonClickSetup($.k2l.m4a17_2.sound, audioButton);
					playPauseAudio($.k2l.m4a17_2.sound, audioButton);
				}, 1300);
			}

			if ($.k2l.m4a17_2.index >= $.k2l.m4a17_2.sentences.length){

				if ($.k2l.m4a17_2.wrongscore > 2) {
					setTimeout(function() {
						$("#m4a17_2").addClass('hidden');
						$("#m4a17_bad").removeClass('hidden');
					}, 1000);
				} else{
					setTimeout (function() {
							$('#welldonecap').removeClass('hidden');
						}, 1000);

					setTimeout(function() {
						$('#welldonecap').addClass('hidden');
						$("#m4a17_2").addClass('hidden');
						$("#m4a17_good").removeClass('hidden');
						Session.set("activeSection", "#m4a17_good");
					}, 1000);
				}
		 	}
		} else {

			$.k2l.m4a17_2.wrongscore++;
			$.k2l.m4a17_2.index++;

			Session.set('m4a17_2WrongScore', $.k2l.m4a17_2.wrongscore);

			$("#m4a17_2 .button2").addClass('noclick');

			var audioUrl = "/audio/module4/a17/"+ ($.k2l.m4a17_2.questionsAudio[$.k2l.m4a17_2.index]) +".m4a";

			$.k2l.m4a17_2.questionWordLock = true;
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function(){
				$('.incorrectscreen').addClass("hidden");
			}, 1000);

			if($.k2l.m4a17_2.index < $.k2l.m4a17_2.questionsAudio.length){
				setTimeout(function() {
					$('.buttonaudio')[0].setAttribute('data-audiosrc', audioUrl);
					var audioButton = $('.buttonaudio')[0];
					audioButtonClickSetup($.k2l.m4a17_2.sound, audioButton);
					playPauseAudio($.k2l.m4a17_2.sound, audioButton);
				}, 1300);
			}
			
		}

		setTimeout(function(){
			$("#m4a17_2 .button2").removeClass('noclick');
			$.k2l.m4a17_2.questionWordLock = false;
		}, 1000);

			if ($.k2l.m4a17_2.index >= $.k2l.m4a17_2.sentences.length){

				$.k2l.m4a17_2.sound.pause();


				if ($.k2l.m4a17_2.wrongscore > 2) {
					setTimeout(function() {
						$("#m4a17_2").addClass('hidden');
						$("#m4a17_bad").removeClass('hidden');
					}, 1000);
				}
				else{
					setTimeout (function() {
							$('#welldonecap').removeClass('hidden');
						}, 1000);

					setTimeout(function() {
						$('#welldonecap').addClass('hidden');
						$("#m4a17_2").addClass('hidden');
						$("#m4a17_good").removeClass('hidden');
						Session.set("activeSection", "#m4a17_good");
					}, 1000);
				}
		 }

		if($.k2l.m4a17_2.index < $.k2l.m4a17_2.sentences.length){
			$('.number').html($.k2l.m4a17_2.index+1);
			$('#question_text').html($.k2l.m4a17_2.sentences[$.k2l.m4a17_2.index]);
		}

		$(".buttonaudio.buttonroundbig.buttonround").attr("data-audiosrc", audioUrl);

		$('#m4a17_2RightScore').html(Session.get('m4a17_2RightScore'));
		$('#m4a17_2WrongScore').html(Session.get('m4a17_2WrongScore'));

	 }
});

Template.m4a17_2.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m4a17_2 == 'undefined') {
		$.k2l.m4a17_2 = {};
	};

	$.k2l.m4a17_2.sound = new Audio();
	// $.k2l.m4a17_2.sound.src = "/audio/module4/a17/1.m4a";
	// $.k2l.m4a17_2.sound.play();

	var correctAnswers = ["True", "False", "False", "False", "True", "False", "True", "True"];
	var questionsAudio = ["1","2","3","4","5","6","7","8"]
	var sentences = ["Tu likes the menu.",
					"Elle can’t decide between mushrooms or soup.",
					"K knows what the soup of the day is.",
					"Tu is going to have a chicken burger.",
					"K is going to have the chicken salad wrap.",
					"Tu is going to have coke with his meal.",
					"Elle loves Irn Bru.",
					"K doesn’t want a fizzy drink."
	];

	$.k2l.m4a17_2.correctAnswers = correctAnswers;
	$.k2l.m4a17_2.sentences = sentences;
	$.k2l.m4a17_2.questionsAudio = questionsAudio;

	$.k2l.m4a17_2.index = 0;
	$.k2l.m4a17_2.rightscore = 0;
	$.k2l.m4a17_2.wrongscore = 0;

	Session.set('m4a17_2RightScore', 0);
	Session.set('m4a17_2WrongScore', 0);

	$.k2l.m4a17_2.questionWordLock = false; //variable to prevent multiple clicks of button
}


Template.m4a17_scores.events({
	'click #m4a17retry': function(evt) {
		Session.set("activeSection", "#m4a17_2");
		$("#m4a17_bad").addClass('hidden');
		$("#m4a17_2").removeClass('hidden');
		$.k2l.m4a17_2.index = 0;
		$.k2l.m4a17_2.rightscore = 0;
		$.k2l.m4a17_2.wrongscore = 0;
		$.k2l.m4a17_2.sound.src = "/audio/module4/a17/"+ ($.k2l.m4a17_2.questionsAudio[$.k2l.m4a17_2.index]) +".m4a";
		$('.buttonaudio').attr('data-audiosrc', $.k2l.m4a17_2.sound.src);
		$('.number').html($.k2l.m4a17_2.index+1);
		$('#question_text').html($.k2l.m4a17_2.sentences[0]);
		Session.set('m4a17_2RightScore', 0);
		Session.set('m4a17_2WrongScore', 0);
		$('#m4a17_2RightScore').html('0');
		$('#m4a17_2WrongScore').html('0');
		forceReload();
	},
	'click .pagination.next': function(evt) {
		$.k2l.m4a17_2.index = 0;
		$.k2l.m4a17_2.rightscore = 0;
		$.k2l.m4a17_2.wrongscore = 0;
		$('.number').html($.k2l.m4a17_2.index+1);
		$('#question_text').html($.k2l.m4a17_2.sentences[0]);
		Session.set('m4a17_2RightScore', 0);
		Session.set('m4a17_2WrongScore', 0);
	}
});

Template.m4a17_scores.rendered = function() {
		$('#m4a17_2RightScore').html(Session.get('m4a17_2RightScore'));
		$('#m4a17_2WrongScore').html(Session.get('m4a17_2WrongScore'));
};
