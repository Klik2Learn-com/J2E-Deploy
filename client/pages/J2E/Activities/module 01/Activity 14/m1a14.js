Template.m1a14.events({
	
	"click .buttonaudio": function (evt){
		for (x in $.k2l.m1a14.id_audio_map){
			if ($($.k2l.m1a14.id_audio_map[x]).attr('id') == $(evt.currentTarget).attr('id')) {
				$(evt.currentTarget).attr('data-audiosrc', "audio/module1/a14/" + $.k2l.m1a14.id_audio_map[x].audioFile);				
				audioButtonClickSetup($.k2l.m1a14.sound, $(evt.currentTarget));
				playPauseAudio($.k2l.m1a14.sound, $(evt.currentTarget));
				break;
			}
		}
		
	},
	
	"click .button1" : function (evt) {
		if ($(evt.currentTarget).attr('id') == $.k2l.m1a14.answers[$.k2l.m1a14.index]) {
			$('.correctscreen').removeClass('hidden');
			setTimeout( function() {
				$('.correctscreen').addClass('hidden');
			}, 1000);
			// if theres another page
			if ($.k2l.m1a14.index < $.k2l.m1a14.answers.length-1){
				$.k2l.m1a14.index += 1; // increment the counter
			} else {
				setTimeout(function () {
					$.k2l.m1a14.index = 0;
					$('.correctscreen').addClass('hidden');
					$('.incorrectscreen').addClass('hidden');
				}, 2000);
			}
			setTimeout(function () {
				$(evt.currentTarget).parents('section').addClass('hidden'); // hide this page
				$(evt.currentTarget).parents('section').next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(evt.currentTarget).parents('section').next('section').attr('id'); //change the hash
			}, 1000);
		} else {
			$('.incorrectscreen').removeClass('hidden');
			setTimeout( function() {
				$('.incorrectscreen').addClass('hidden');
			}, 1000);
		}
	},

	"click .pagination": function(evt){
		if($.k2l.m1a14.sound != undefined)
			$.k2l.m1a14.sound.src = {};
	}
})

Template.m1a14.rendered = function() {

    document.title = "Journey 2 English";
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m1a14 == 'undefined') {
		$.k2l.m1a14 = {};
	};
	
	var id_audio_map = [
					{id:"m1a14hairdresser", audioFile:"hairdresser.m4a"},
					{id:"m1a14sportscommentator", audioFile:"sportscommentator.m4a"},
					{id:"m1a14teacher", audioFile:"teacher.m4a"},
					{id:"m1a14student", audioFile:"student.m4a"},
					{id:"m1a14taxidriver", audioFile:"taxidriver.m4a"},
					{id:"m1a14funloving", audioFile:"funloving.m4a"},
					{id:"m1a14serious", audioFile:"serious.m4a"},
					{id:"m1a14adventurous", audioFile:"adventurous.m4a"},
					{id:"m1a14quickthinking", audioFile:"quickthinking.m4a"},
					{id:"m1a14creative", audioFile:"creative.m4a"},
					{id:"m1a14ambitious", audioFile:"ambitious.m4a"},
					{id:"m1a14talkative", audioFile:"talkative.m4a"},
					{id:"m1a14sensible", audioFile:"sensible.m4a"},
					{id:"m1a14helpful", audioFile:"helpful.m4a"}
				];
	
	var answers = ["helpfulbutton", "organisedbutton", "responsiblebutton", "talkativebutton", "ambitiousbutton"];  
	$.k2l.m1a14.answers = answers;
	$.k2l.m1a14.index = 0;
	$.k2l.m1a14.sound = new Audio();			
	$.k2l.m1a14.id_audio_map = id_audio_map;

	setStartActivity(1, 14);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(1, 14, subpage);
			oldLocation = location.href;
		}
	}, 500);
}

Template.m1a14.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m1a14_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m1a14.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 1, 14, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m1a14.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
