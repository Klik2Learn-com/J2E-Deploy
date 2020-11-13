Template.m7a8.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m7a8_end') { 
			return false; 
		}
		return true;	 
	} 
});

Template.m7a8.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(7, 8);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(7, 8, subpage);
			oldLocation = location.href;
		}
	}, 500);

}
Template.m7a8_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a8_1"); 
	} 
}); 
 
Template.m7a8_1.events({ 
 
	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m7a8_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a8_1.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		$.k2l.m7a8_1.sound.src = {};
	}
}); 
 
Template.m7a8_1.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a8_1 == 'undefined') {
		$.k2l.m7a8_1 = {};
	};
	
	$.k2l.m7a8_1.sound = new Audio();

}

Template.m7a8_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m7a8_2"); 
	} 
}); 
 
Template.m7a8_2.events({ 
 
}); 
 
Template.m7a8_2.rendered = function() {
}


Template.m7a8_3.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m7a8_3");
	}
})

Template.m7a8_3.events({
	"click .button2": function(evt){
		
		if ($.k2l.m7a8_3.allowClick == true) {
			
			$.k2l.m7a8_3.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m7a8_3.answer_index[$.k2l.m7a8_3.index]) {				
			var parentSection = $(evt.currentTarget).parents('section');
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);
			// 	$.k2l.m7a8_3.rightscore++;
			// 	var rightScore = $.k2l.m7a8_3.rightscore;
			// var wrongScore = $.k2l.m7a8_3.wrongscore;
			
			// Session.set('m7a8_3RightScore', rightScore);
			// Session.set('m7a8_3WrongScore', wrongScore);
				
				if ($.k2l.m7a8_3.index < $.k2l.m7a8_3.answers.length-1) {
					$.k2l.m7a8_3.index++;
					setTimeout(function() {
						// $('.buttonaudio').attr("data-audiosrc",$.k2l.m7a8_3.answerssaudio[$.k2l.m7a8_3.index]);
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$('.number').html($.k2l.m7a8_3.index+1);
						$('#1').html($.k2l.m7a8_3.answers[$.k2l.m7a8_3.index][0]);
						$('#2').html($.k2l.m7a8_3.answers[$.k2l.m7a8_3.index][1]);
						$.k2l.m7a8_3.allowClick = true; // Make the buttons clickable again
						// setTimeout(function() {
						// 	$.k2l.m7a8_3.sound.src = $('.buttonaudio').attr("data-audiosrc");
						// 	$.k2l.m7a8_3.sound.play();
						// }, 800);
					}, 1000);
				} else {
					setTimeout(function(){
					$('#welldonecap').removeClass('hidden');
				}, 1000);
			setTimeout( function() {
				$('#welldonecap').addClass('hidden');
			}, 2000);
				setTimeout(function() {
					//$.k2l.m7a8_3.counter = 0;
					$.k2l.m7a8_3.index = 0;
					$.k2l.m7a8_3.allowClick = true;
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 2000);
					
					// $('.pagination').removeClass('hidden');
				}
			} else {
			// 	$.k2l.m7a8_3.wrongscore++;
			// 	// incorrect
			// 	var rightScore = $.k2l.m7a8_3.rightscore;
			// var wrongScore = $.k2l.m7a8_3.wrongscore;
			
			// Session.set('m7a8_3RightScore', rightScore);
			// Session.set('m7a8_3WrongScore', wrongScore);
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$('.incorrectscreen').addClass('hidden');
					$.k2l.m7a8_3.allowClick = true;
				}, 1000);
				
				
			// 	 if ($.k2l.m7a8_3.index < $.k2l.m7a8_3.answers.length-1) {
			// 	// 	$.k2l.m7a8_3.index++;
			// 	// 	setTimeout(function() {
			// 	// 		// $('.buttonaudio').attr("data-audiosrc",$.k2l.m7a8_3.answerssaudio[$.k2l.m7a8_3.index]);
			// 	// 		$('.incorrectscreen').addClass('hidden');
			// 	// 		$('.correctscreen').addClass('hidden');
			// 	// 		$('.number').html($.k2l.m7a8_3.index+1);
			// 	// 		$('.answers_text').html($.k2l.m7a8_3.answers[$.k2l.m7a8_3.index]);
			// 	// 		$.k2l.m7a8_3.allowClick = true; // Make the buttons clickable again
			// 	// 		// setTimeout(function() {
			// 	// 		// 	$.k2l.m7a8_3.sound.src = $('.buttonaudio').attr('data-audiosrc');
			// 	// 		// 	$.k2l.m7a8_3.sound.play();
			// 	// 		// }, 800);
			// 	// 	}, 1000);
			// 	} else {
			// 		// $.k2l.m7a8_3.sound.src = {};
			// 		setTimeout (function() {
			// 			$('#welldonecap').removeClass('hidden');
			// 		}, 1000);
					
			// 		setTimeout(function() {
			// 			$('#welldonecap').addClass('hidden');
			// 			// $("#m7a8_3").addClass('hidden');
						
			// 			// if ($.k2l.m7a8_3.wrongscore < 3) {
			// 			// 	$("#m7a8_3_good").removeClass('hidden');
			// 			// 	Session.set("activeSection", "#m7a8_3_good");
			// 			// } else {
			// 			// 	$("#m7a8_3_bad").removeClass('hidden');
			// 			// 	Session.set("activeSection", "#m7a8_3_bad");
			// 			// }
			// 		}, 2000);
			// }
		}
		}
			
	},
	/*
	'click .pagination': function(evt) {
		// $.k2l.m7a8_3.sound.src = {};
		$.k2l.m7a8_3.index = 0;
		$.k2l.m7a8_3.allowClick = true;
	}
	*/

});

Template.m7a8_3.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m7a8_3 == 'undefined') {
		$.k2l.m7a8_3 = {};
	};
	
	// $.k2l.m7a8_3.sound = new Audio();
	
	var answers = [["Freshers’ week is all about social life.","Freshers’ week helps students with their studies."],
	["Students have to look for societies to join.","Societies look for students to join them."],
	["Students tend to spend too much money at once.","Students are good at budgeting their money."],
	["Students eat pasta because it’s cheap.","Students all love pasta."],
	["40% of students pass first year.","You can pass first year with a mark of 40%."],
	["Most students tell their parents they are buying books with their student loan.","Most students buy books with their student loan."],
	["Most students have a garage in second year.","Most students live in poor quality houses in second year."],
	["Students enjoy having a garden.","Students tend to be untidy."],
	["Students use the internet a lot for studying.","Students use books more than the internet."],
	["Buying paper and pens for revision is helpful.","Buying paper and pens for revision is a distraction."],
	["The average student diet is not very healthy.","Students usually eat five portions of fruit and vegetables a day."],
	["After graduation most students get a good job.","After graduation most students don’t know what the future holds."],
	];
					
	var answer_index = ["1", "2", "1", "1","2","1","2","2","1","2","1","2"];
	
	$.k2l.m7a8_3.answers = answers;
	// $.k2l.m7a8_3.answerssaudio = answerssaudio;
	$.k2l.m7a8_3.answer_index = answer_index;
	$.k2l.m7a8_3.index = 0;
	// $.k2l.m7a8_3.rightscore = 0;
	// $.k2l.m7a8_3.wrongscore = 0;
	
	// Session.set('m7a8_3RightScore', 0);
	// Session.set('m7a8_3WrongScore', 0);

	$.k2l.m7a8_3.allowClick = true;
}


Template.m7a8.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 7, 8, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m7a8.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
