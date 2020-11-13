Template.m6a23.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m6a23_end') {
			return false;
		}
		return true;
	}
});

Template.m6a23.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(6, 23);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(6, 23, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m6a23.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 6, 23, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m6a23.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m6a23_1.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m6a23_1");
	},

	rightScore: function () {
		return Session.get('m6a23RightScore');
	},

	wrongScore: function () {
		return Session.get('m6a23WrongScore');
	}
})

Template.m6a23_1.events({
	"click .button2": function(evt){
		
		if ($.k2l.m6a23_1.allowClick == true) {
			
			$.k2l.m6a23_1.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m6a23_1.answer_index[$.k2l.m6a23_1.index]) {
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				$.k2l.m6a23_1.rightscore++;
				var rightScore = $.k2l.m6a23_1.rightscore;
			var wrongScore = $.k2l.m6a23_1.wrongscore;
			
			Session.set('m6a23RightScore', rightScore);
			Session.set('m6a23WrongScore', wrongScore);
				
				if ($.k2l.m6a23_1.index < $.k2l.m6a23_1.question.length-1) {
					$.k2l.m6a23_1.index++;
					setTimeout(function() {
						$('.buttonaudio').attr("data-audiosrc",$.k2l.m6a23_1.questionsaudio[$.k2l.m6a23_1.index]);
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						//$('.number').html($.k2l.m6a23_1.index+1);
						$('#question_text').html($.k2l.m6a23_1.question[$.k2l.m6a23_1.index]);
						$.k2l.m6a23_1.allowClick = true; // Make the buttons clickable again
						$.k2l.m6a23_1.sound.pause();
						$('.buttonaudio').removeClass('is-playing');
						setTimeout(function() {
							$.k2l.m6a23_1.sound.src = $('.buttonaudio').attr("data-audiosrc");
							$.k2l.m6a23_1.sound.play();
							$('.buttonaudio').addClass('is-playing');
						}, 800);
					}, 1000);
				} else {
					setTimeout (function() {
						$('#welldonecap').removeClass('hidden');
					}, 1000);
					
					setTimeout(function() {
						$('#welldonecap').addClass('hidden');
						$("#m6a23_1").addClass('hidden');
						
						if ($.k2l.m6a23_1.wrongscore < 3) {
							$("#m6a23_good").removeClass('hidden');
							Session.set("activeSection", "#m6a23_good");
						} else {
							$("#m6a23_bad").removeClass('hidden');
							Session.set("activeSection", "#m6a23_bad");
						}
					}, 2000);
					
					// $('.pagination').removeClass('hidden');
				}
			} else {
				$.k2l.m6a23_1.wrongscore++;
				// incorrect
				var rightScore = $.k2l.m6a23_1.rightscore;
			var wrongScore = $.k2l.m6a23_1.wrongscore;
			
			Session.set('m6a23RightScore', rightScore);
			Session.set('m6a23WrongScore', wrongScore);
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
				
				
				if ($.k2l.m6a23_1.index < $.k2l.m6a23_1.question.length-1) {
					$.k2l.m6a23_1.index++;
					setTimeout(function() {
						$('.buttonaudio').attr("data-audiosrc",$.k2l.m6a23_1.questionsaudio[$.k2l.m6a23_1.index]);
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						//$('.number').html($.k2l.m6a23_1.index+1);
						$('#question_text').html($.k2l.m6a23_1.question[$.k2l.m6a23_1.index]);
						$.k2l.m6a23_1.allowClick = true; // Make the buttons clickable again
						$.k2l.m6a23_1.sound.pause();
						$('.buttonaudio').removeClass('is-playing');
						setTimeout(function() {
							$.k2l.m6a23_1.sound.src = $('.buttonaudio').attr("data-audiosrc");
							$.k2l.m6a23_1.sound.play();
							$('.buttonaudio').addClass('is-playing');
						}, 800);
					}, 1000);
				} else {
					$.k2l.m6a23_1.sound.src = {};
					setTimeout (function() {
						$('#welldonecap').removeClass('hidden');
					}, 1000);
					
					setTimeout(function() {
						$('#welldonecap').addClass('hidden');
						$("#m6a23_1").addClass('hidden');
						
						if ($.k2l.m6a23_1.wrongscore < 3) {
							$("#m6a23_good").removeClass('hidden');
							Session.set("activeSection", "#m6a23_good");
						} else {
							$("#m6a23_bad").removeClass('hidden');
							Session.set("activeSection", "#m6a23_bad");
						}
					}, 2000);
			}
		}
		}
			
	},

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m6a23_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m6a23_1.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {
		$.k2l.m6a23_1.sound.src = {};
		$.k2l.m6a23_1.index = 0;
		$.k2l.m6a23_1.allowClick = true;
	}

});

Template.m6a23_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m6a23_1 == 'undefined') {
		$.k2l.m6a23_1 = {};
	};

	$.k2l.m6a23_1.sound = new Audio();

	var questions = ["Sentence 1",
		"Sentence 2",
		"Sentence 3",
		"Sentence 4",
		"Sentence 5",
		"Sentence 6",
		"Sentence 7",
		"Sentence 8",
		"Sentence 9",
		"Sentence 10",];


	var questionsaudio = ["/audio/module6/a23/q1.m4a",
		"/audio/module6/a23/q2.m4a",
		"/audio/module6/a23/q3.m4a",
		"/audio/module6/a23/q4.m4a",
		"/audio/module6/a23/q5.m4a",
		"/audio/module6/a23/q6.m4a",
		"/audio/module6/a23/q7.m4a",
		"/audio/module6/a23/q8.m4a",
		"/audio/module6/a23/q9.m4a",
		"/audio/module6/a23/q10.m4a"
	];

	var answer_index = ["true", "false", "true", "true", "true", "true", "false", "false", "false", "false"];

	$.k2l.m6a23_1.question = questions;
	$.k2l.m6a23_1.questionsaudio = questionsaudio;
	$.k2l.m6a23_1.answer_index = answer_index;
	$.k2l.m6a23_1.index = 0;
	$.k2l.m6a23_1.rightscore = 0;
	$.k2l.m6a23_1.wrongscore = 0;

	Session.set('m6a23RightScore', 0);
	Session.set('m6a23WrongScore', 0);

	$.k2l.m6a23_1.allowClick = true;
}

Template.m6a23_scores.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m6a23_scores");
	}
});


Template.m6a23_scores.events({

	"click a.restart": function (evt) {
		if (typeof $.k2l != 'undefined') {
			if (typeof $.k2l.m6a23_1 != 'undefined') {
				if (typeof $.k2l.m6a23_1.index != 'undefined') {
					$.k2l.m6a23_1.index = 0;
				}
				if (typeof $.k2l.m6a23_1.rightscore != 'undefined') {
					$.k2l.m6a23_1.rightscore = 0;
				}
				if (typeof $.k2l.m6a23_1.wrongscore != 'undefined') {
					$.k2l.m6a23_1.wrongscore = 0;
				}
			}
		}


		Session.set('m6a23RightScore', 0);
		Session.set('m6a23WrongScore', 0);
		// $('#m6a23RightScore').html(Session.get('m6a23RightScore'));
		// $('#m6a23WrongScore').html(Session.get('m6a23WrongScore'));
		$.k2l.m6a23_1.allowClick = true;
		Session.set("activeSection", "#m6a23_1");
		forceReload();
	}
});
