

Template.m2a4_intro.rendered = function() {	

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	}

	if (typeof $.k2l.m2a4 == 'undefined') {
		$.k2l.m2a4 = {};
	};

	$.k2l.m2a4.sound = new Audio();
}

Template.m2a4_intro.events({

	"click .buttonaudio": function(evt){
		$(evt.currentTarget).attr('data-audiosrc', "/audio/module2/a4/Shopping.m4a");
		audioButtonClickSetup($.k2l.m2a4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a4.sound, $(evt.currentTarget));
	},
	"click a.pagination": function(evt){
		$.k2l.m2a4.sound.pause();
		$.k2l.m2a4.sound.src = "";
	}
});


Template.m2a4_1.events({

	"click .buttonaudio": function(evt){
		$(evt.currentTarget).attr('data-audiosrc', "/audio/module2/a4/Shopping.m4a");
		audioButtonClickSetup($.k2l.m2a4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a4.sound, $(evt.currentTarget));
	},
	"click a.pagination": function(evt){
		
		$.k2l.m2a4.sound.pause();
		$.k2l.m2a4.sound.src = "";
	}
});


Template.m2a4_2.events({

	"click .buttonaudio": function(evt){
		$(evt.currentTarget).attr('data-audiosrc', "/audio/module2/a4/Shopping.m4a");
		audioButtonClickSetup($.k2l.m2a4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a4.sound, $(evt.currentTarget));
	},
	"click a.pagination": function(evt){
		$.k2l.m2a4.sound.pause();
		$.k2l.m2a4.sound.src = {};
	}
});


Template.m2a4_3.events({

	"click .buttonaudio": function(evt){
		$(evt.currentTarget).attr('data-audiosrc', "/audio/module2/a4/Shopping.m4a");
		audioButtonClickSetup($.k2l.m2a4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a4.sound, $(evt.currentTarget));
	},

	"click a.pagination": function(evt){
		$.k2l.m2a4.sound.src = {};
	}
});


Template.m2a4_4.events({

	"click .buttonaudio": function(evt){
		$(evt.currentTarget).attr('data-audiosrc', "/audio/module2/a4/Shopping.m4a");
		audioButtonClickSetup($.k2l.m2a4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a4.sound, $(evt.currentTarget));
	},

	"click a.pagination": function(evt){
		$.k2l.m2a4.sound.src = {};
	}
});


Template.m2a4_5.events({

	"click .buttonaudio": function(evt){
		$(evt.currentTarget).attr('data-audiosrc', "/audio/module2/a4/Shopping.m4a");
		audioButtonClickSetup($.k2l.m2a4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a4.sound, $(evt.currentTarget));
	},
	"click a.pagination": function(evt){
		$.k2l.m2a4.sound.src = {};
	}
});


Template.m2a4_6.events({

	"click .buttonaudio": function(evt){
		$(evt.currentTarget).attr('data-audiosrc', "/audio/module2/a4/Shopping.m4a");
		audioButtonClickSetup($.k2l.m2a4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a4.sound, $(evt.currentTarget));
	},

	"click a.pagination": function(evt){
		$.k2l.m2a4.sound.src = {};
	}
});


Template.m2a4_7.events({

	"click .buttonaudio": function(evt){
		$(evt.currentTarget).attr('data-audiosrc', "/audio/module2/a4/Shopping.m4a");
		audioButtonClickSetup($.k2l.m2a4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a4.sound, $(evt.currentTarget));
	},
	"click a.pagination": function(evt){
		$.k2l.m2a4.sound.src = {};
	}
});


Template.m2a4_8.events({

	"click .buttonaudio": function(evt){
		$(evt.currentTarget).attr('data-audiosrc', "/audio/module2/a4/Shopping.m4a");
		audioButtonClickSetup($.k2l.m2a4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a4.sound, $(evt.currentTarget));
	},

	"click a.pagination": function(evt){
		$.k2l.m2a4.sound.src = {};
	}
});

Template.m2a4.events({

	"click .buttonaudioc": function(evt){
		$(evt.currentTarget).attr('data-audiosrc', "/audio/module2/a4/Shopping.m4a");
		audioButtonClickSetup($.k2l.m2a4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a4.sound, $(evt.currentTarget));
	},

	'click div[data-function="answer-button"]': function(evt){

		if ($.k2l.m2a4.allowClick) {
			$.k2l.m2a4.allowClick = false;
			/* Reset all audio buttons because its gonna be a new question */
			$.k2l.m2a4.sound.pause();
			$.k2l.m2a4.sound.src = "";
			resetAllAudioButtons();

			if ($(evt.currentTarget).attr('id') == $.k2l.m2a4.answers[$.k2l.m2a4.index]){
				//correct answers
				$.k2l.m2a4.rightscore++;
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1500);
			} else {
				// incorrect answers
				$.k2l.m2a4.wrongscore++;
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$('.incorrectscreen').addClass('hidden');
				}, 1500);
			}
			if($.k2l.m2a4.index < $.k2l.m2a4.answers.length-1){
				// Load the next section
				setTimeout( function() {
					$.k2l.m2a4.sound.src = {};
					$(evt.currentTarget).parents('section').addClass('hidden'); // hide this page
					$(evt.currentTarget).parents('section').next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(evt.currentTarget).parents('section').next('section').attr('id');
					Session.set('activeSection', '#' + $(evt.currentTarget).parents('section').next('section').attr('id'));
					$.k2l.m2a4.allowClick = true;
				}, 1500);
			} else {
				$.k2l.m2a4.allowClick = true;
				// show either good or bad page
				if ($.k2l.m2a4.rightscore >= 3){
					setTimeout(function() {
						$.k2l.m2a4.sound.src = {};
						$(evt.currentTarget).parents('section').addClass('hidden'); // hide this page
						$('#m2a4_good').removeClass('hidden');
						document.location.hash = 'm2a4_good';
						Session.set('activeSection', '#m2a4_good');
					}, 1500);
				} else {
					setTimeout(function() {
						$.k2l.m2a4.sound.src = {};
						$(evt.currentTarget).parents('section').addClass('hidden'); // hide this page
						$('#m2a4_bad').removeClass('hidden');
						document.location.hash = 'm2a4_bad';
						Session.set('activeSection', '#m2a4_good');
					}, 1500);
				}
			}
		}
		$.k2l.m2a4.index++;
		Session.set("m2a4_rightScore", $.k2l.m2a4.rightscore);
		Session.set("m2a4_wrongScore", $.k2l.m2a4.wrongscore);

	},

	"click a.pagination": function(evt){
		$.k2l.m2a4.sound.src = {};
	},

	'click a[data-function="restart"]': function (evt){
		$.k2l.m2a4.index = 0;
		$.k2l.m2a4.rightscore = 0;
		$.k2l.m2a4.wrongscore = 0;
		$.k2l.m2a4.allowClick = true;

		Session.set("activeSection", "#m2a4");
		Session.set("m2a4_rightScore", $.k2l.m2a4.rightscore);
		Session.set("m2a4_wrongScore", $.k2l.m2a4.wrongscore);
		//document.location.hash = 'm2a4_1';
		//$("#m2a4_bad").addClass('hidden');
		$("#m2a4").removeClass('hidden');
		forceReload();
	}

});


Template.m2a4.rendered = function() {	

	document.title = "Journey 2 English";
	
	setStartActivity(2, 4);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 4, subpage);
			oldLocation = location.href;
		}
	}, 500);


	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	}

	if (typeof $.k2l.m2a4 == 'undefined') {
		$.k2l.m2a4 = {};
	};

	$.k2l.m2a4.sound = new Audio();
	$.k2l.m2a4.index = 0;
	$.k2l.m2a4.rightscore = 0;
	$.k2l.m2a4.wrongscore = 0;
	Session.set("m2a4_rightScore", $.k2l.m2a4.rightscore);
	Session.set("m2a4_wrongScore", $.k2l.m2a4.wrongscore);
	$.k2l.m2a4.allowClick = true;
	$.k2l.m2a4.answers = ["3","3","2","1"];

}


Template.m2a4.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m2a4_end') { 
			return false; 
		}		return true;	 
  } 
});


Template.m2a4.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 4, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m2a4.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m2a4_bad.events({

	'click a[data-function="retry"]': function (evt) {
		// Click this button to reset activity 4
		$.k2l.m2a4.index = 0;
		$.k2l.m2a4.rightscore = 0;
		$.k2l.m2a4.wrongscore = 0;
		$.k2l.m2a4.allowClick = true;

		Session.set("activeSection", "#m2a4");
		Session.set("m2a4_rightScore", $.k2l.m2a4.rightscore);
		Session.set("m2a4_wrongScore", $.k2l.m2a4.wrongscore);

		//document.location.hash = 'm2a4_1';
		$("#m2a4_bad").addClass('hidden');
		$("#m2a4").removeClass('hidden');
		//$("#m2a4").height(650);
		forceReload();

	}
})


Template.m2a4_good.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a4_good");
	}
	
});

Template.m2a4_bad.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a4_bad");
	}

});

Template.m2a4_1.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a4_1");
	}
	
});

Template.m2a4_2.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a4_2");
	}
	
});

Template.m2a4_3.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a4_3");
	}
	
});

Template.m2a4_4.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a4_4");
	}
	
});

Template.m2a4_5.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a4_5");
	}
	
});

Template.m2a4_6.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a4_6");
	}
	
});

Template.m2a4_7.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a4_7");
	}
	
});

Template.m2a4_8.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a4_8");
	}
	
});
