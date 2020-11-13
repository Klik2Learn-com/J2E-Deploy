Template.ukQuiz_1.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#ukQuiz_1"); 
	}
}); 
 
Template.ukQuiz_1.events({
	
	"click .lotto-button": function(evt){
		
		if ($.k2l.ukQuiz_1.allowClick == true) {
			$.k2l.ukQuiz_1.allowClick = false;
			var scoreCorrect = Session.get('quiz_Correct');
			var scoreIncorrect = Session.get('quiz_Incorrect');
			var answer = '<div><span class="contents">'+$.k2l.ukQuiz_1.answer_index[$.k2l.ukQuiz_1.index]+"</span></div>";
			if ($(evt.currentTarget).html() == answer) {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.ukQuiz_1.index++
				scoreCorrect++
				Session.set('quiz_Correct', scoreCorrect);
				$('.correctscreen').removeClass('hidden');
				$('.lotto-button').addClass('flipOutX');

				if($.k2l.ukQuiz_1.index > $.k2l.ukQuiz_1.answer_index.length-1){

				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
					$('#questions').html($.k2l.ukQuiz_1.questions[$.k2l.ukQuiz_1.index]);
				}, 1000);


				setTimeout(function() {
					// $.k2l.ukQuiz_1.index = 0;
					// // $('.buttonaudio').attr("data-audiosrc","/audio/module1/a4/"+$.k2l.ukQuiz_1.audio[$.k2l.ukQuiz_1.index]+".m4a");
					// setTimeout( function() {
					//  	shuffle($.k2l.ukQuiz_1.choices[$.k2l.ukQuiz_1.index]);
					// 	for(var i=0; i < $.k2l.ukQuiz_1.choices[$.k2l.ukQuiz_1.index].length+1; i++){
					// 		$('.lotto-button').removeClass('flipOutX');
					// 		var color = Math.floor(Math.random() * 8) + 1 ;
					// 		$('#lottoc' +i).addClass('flipInX lotto'+color);
					// 		$('#lottoc' +i).html('<div><span class="contents">'+$.k2l.ukQuiz_1.choices[$.k2l.ukQuiz_1.index][i]+"</span></div>");					
					// 		}

					// 	 },1);
					
					$(parentSection).addClass('hidden'); // hide this page
					// if($.k2l.ukQuiz_1.wrongscore >5){
						// $('#ukQuiz_bad').removeClass('hidden');// reveal next page.
						// $('.lotto-button').removeClass('flipOutX');
					// } else {
						// $('#ukQuiz_good').removeClass('hidden');
						$('.lotto-button').removeClass('flipOutX');
						$.k2l.ukQuiz_1.allowClick = true;
						$.k2l.ukQuiz_1.index = 0;
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
						
					// };
				}, 1000);

				} else {

				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
					$.k2l.ukQuiz_1.allowClick = true; // Make the buttons clickable again
					$('.lotto-button').removeClass('lotto1 lotto2 lotto3 lotto4 lotto5 lotto6 lotto7 lotto8 flipInX');
					$('#questions').html($.k2l.ukQuiz_1.questions[$.k2l.ukQuiz_1.index]);
					
					 setTimeout( function() {
					 	shuffle($.k2l.ukQuiz_1.choices[$.k2l.ukQuiz_1.index]);
						for(var i=0; i < $.k2l.ukQuiz_1.choices[$.k2l.ukQuiz_1.index].length+1; i++){
							$('.lotto-button').removeClass('flipOutX');
							var color = Math.floor(Math.random() * 8) + 1 ;
							$('#lottoc' +i).addClass('flipInX lotto'+color);
							$('#lottoc' +i).html('<div><span class="contents">'+$.k2l.ukQuiz_1.choices[$.k2l.ukQuiz_1.index][i]+"</span></div>");

							}
						 },1);
					
					}, 1000);
				// $('.buttonaudio').attr("data-audiosrc","/audio/module1/a4/"+$.k2l.ukQuiz_1.audio[$.k2l.ukQuiz_1.index]+".m4a");
				// 		setTimeout(function() {
				// 			$.k2l.ukQuiz_1.sound.src = $('.buttonaudio').attr("data-audiosrc");
				// 			$.k2l.ukQuiz_1.sound.play();
				// 		}, 1000);
				}				
				} else {				
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.ukQuiz_1.index++
				scoreIncorrect++
				Session.set('quiz_Incorrect', scoreIncorrect);
				// $('.incorrectscreen').removeClass('hidden');
				$('.lotto-button').addClass('flipOutX');

				if($.k2l.ukQuiz_1.index > $.k2l.ukQuiz_1.answer_index.length-1){

				setTimeout( function() {
					$('.incorrectscreen').addClass('hidden');
					$('#questions').html($.k2l.ukQuiz_1.questions[$.k2l.ukQuiz_1.index]);
				}, 1000);

				setTimeout(function() {
					$.k2l.ukQuiz_1.index = 0;
					// $('.buttonaudio').attr("data-audiosrc","/audio/module1/a4/"+$.k2l.ukQuiz_1.audio[$.k2l.ukQuiz_1.index]+".m4a");
					setTimeout( function() {
					 	shuffle($.k2l.ukQuiz_1.choices[$.k2l.ukQuiz_1.index]);
						for(var i=0; i < $.k2l.ukQuiz_1.choices[$.k2l.ukQuiz_1.index].length+1; i++){
							$('.lotto-button').removeClass('flipOutX');
							var color = Math.floor(Math.random() * 8) + 1 ;
							$('#lottoc' +i).addClass('flipInX lotto'+color);
							$('#lottoc' +i).html('<div><span class="contents">'+$.k2l.ukQuiz_1.choices[$.k2l.ukQuiz_1.index][i]+"</span></div>");					
							}
						 },1);
					$(parentSection).addClass('hidden'); // hide this page
					// if($.k2l.ukQuiz_1.wrongscore >5){
						// $('#ukQuiz_bad').removeClass('hidden');// reveal next page.
						// $('.lotto-button').removeClass('flipOutX');
					// } else {
						// $('#ukQuiz_good').removeClass('hidden');
						$('.lotto-button').removeClass('flipOutX');
						$.k2l.ukQuiz_1.allowClick = true;
						$.k2l.ukQuiz_1.index = 0;
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					// };
				}, 1000);

				} else {

				setTimeout( function() {
					$('.incorrectscreen').addClass('hidden');
					$.k2l.ukQuiz_1.allowClick = true; // Make the buttons clickable again
					$('.lotto-button').removeClass('lotto1 lotto2 lotto3 lotto4 lotto5 lotto6 lotto7 lotto8 flipInX');
					$('#questions').html($.k2l.ukQuiz_1.questions[$.k2l.ukQuiz_1.index]);
				
					 setTimeout( function() {
					 	shuffle($.k2l.ukQuiz_1.choices[$.k2l.ukQuiz_1.index]);
						for(var i=0; i < $.k2l.ukQuiz_1.choices[$.k2l.ukQuiz_1.index].length+1; i++){
							$('.lotto-button').removeClass('flipOutX');
							var color = Math.floor(Math.random() * 8) + 1 ;
							$('#lottoc' +i).addClass('flipInX lotto'+color);
							$('#lottoc' +i).html('<div><span class="contents">'+$.k2l.ukQuiz_1.choices[$.k2l.ukQuiz_1.index][i]+"</span></div>");					
							}
						 },1);
					}, 1000);
				// $('.buttonaudio').attr("data-audiosrc","/audio/module1/a4/"+$.k2l.ukQuiz_1.audio[$.k2l.ukQuiz_1.index]+".m4a");
				// 		setTimeout(function() {
				// 			$.k2l.ukQuiz_1.sound.src = $('.buttonaudio').attr("data-audiosrc");
				// 			$.k2l.ukQuiz_1.sound.play();
				// 		}, 1000);
				}
		}
		}
			
	},

	// 'click .buttonaudio': function(evt) {
	// 	;
	// 	$.k2l.ukQuiz_1.sound.src = $(evt.currentTarget).attr('data-audiosrc');
	// 	$.k2l.ukQuiz_1.sound.play();
	// },
	
	'click .pagination': function(evt) {
		$.k2l.ukQuiz_1.index = 0;
		$.k2l.ukQuiz_1.allowClick = true;
		// $.k2l.ukQuiz_1.sound.src = {};
	}

});

Template.ukQuiz_1.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.ukQuiz_1 == 'undefined') {
		$.k2l.ukQuiz_1 = {};
	};
	
	 var answer_index = ["to","none of these"];

	var choices = [
	["to", "at", "on", "for"],
	["a","an","the","none of these"]	
	 ];

	 var questions = ['I’m looking forward <span class="textentry-disabled"></span> my holiday.','She gave me <span class="textentry-disabled"></span> good advice']


	$.k2l.ukQuiz_1.answer_index = answer_index;
	$.k2l.ukQuiz_1.choices = choices;
	$.k2l.ukQuiz_1.questions = questions;
	$.k2l.ukQuiz_1.index = 0;
	$.k2l.ukQuiz_1.rightscore = 0;
	$.k2l.ukQuiz_1.wrongscore = 0;
	// $.k2l.ukQuiz_1.audio = audio;
	// $.k2l.ukQuiz_1.sound = new Audio();

	$.k2l.ukQuiz_1.allowClick = true;
	Session.set('ukQuizRightScore', 0);
	Session.set('ukQuizWrongScore', 0);

}

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}