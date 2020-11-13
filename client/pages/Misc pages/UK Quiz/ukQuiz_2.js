Template.ukQuiz_2.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#ukQuiz_2"); 
	}
}); 
 
Template.ukQuiz_2.events({
	
	"click .lotto-button": function(evt){
		
		if ($.k2l.ukQuiz_2.allowClick == true) {
			$.k2l.ukQuiz_2.allowClick = false;
			var scoreCorrect = Session.get('quiz_Correct');
			var scoreIncorrect = Session.get('quiz_Incorrect');
			var answer = '<div><span class="contents">'+$.k2l.ukQuiz_2.answer_index[$.k2l.ukQuiz_2.index]+"</span></div>";
			if ($(evt.currentTarget).html() == answer) {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.ukQuiz_2.index++
				scoreCorrect++
				Session.set('quiz_Correct', scoreCorrect);
				$('.correctscreen').removeClass('hidden');
				$('.lotto-button').addClass('flipOutX');

				if($.k2l.ukQuiz_2.index > $.k2l.ukQuiz_2.answer_index.length-1){

				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
				}, 1000);


				setTimeout(function() {
					$.k2l.ukQuiz_2.index = 0;
					$('.buttonaudio').attr("data-audiosrc","/audio/module1/a4/"+$.k2l.ukQuiz_2.audio[$.k2l.ukQuiz_2.index]+".m4a");
					setTimeout( function() {
					 	shuffle($.k2l.ukQuiz_2.choices[$.k2l.ukQuiz_2.index]);
						for(var i=0; i < $.k2l.ukQuiz_2.choices[$.k2l.ukQuiz_2.index].length+1; i++){
							$('.lotto-button').removeClass('flipOutX');
							var color = Math.floor(Math.random() * 8) + 1 ;
							$('#lottoc' +i).addClass('flipInX lotto'+color);
							$('#lottoc' +i).html('<div><span class="contents">'+$.k2l.ukQuiz_2.choices[$.k2l.ukQuiz_2.index][i]+"</span></div>");					
							}
						 },1);
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
						
				}, 2000);

				} else {

				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
					$.k2l.ukQuiz_2.allowClick = true; // Make the buttons clickable again
					$('.lotto-button').removeClass('lotto1 lotto2 lotto3 lotto4 lotto5 lotto6 lotto7 lotto8 flipInX');

				
					 setTimeout( function() {
					 	shuffle($.k2l.ukQuiz_2.choices[$.k2l.ukQuiz_2.index]);
						for(var i=0; i < $.k2l.ukQuiz_2.choices[$.k2l.ukQuiz_2.index].length+1; i++){
							$('.lotto-button').removeClass('flipOutX');
							var color = Math.floor(Math.random() * 8) + 1 ;
							$('#lottoc' +i).addClass('flipInX lotto'+color);
							$('#lottoc' +i).html('<div><span class="contents">'+$.k2l.ukQuiz_2.choices[$.k2l.ukQuiz_2.index][i]+"</span></div>");

							}
						 },1);
					}, 1000);
				$('.buttonaudio').attr("data-audiosrc","/audio/module1/a4/"+$.k2l.ukQuiz_2.audio[$.k2l.ukQuiz_2.index]+".m4a");
						setTimeout(function() {
							$.k2l.ukQuiz_2.sound.src = $('.buttonaudio').attr("data-audiosrc");
							$.k2l.ukQuiz_2.sound.play();
						}, 1000);
				}				
				} else {	
				// $(parentSection).next('section').removeClass('hidden');// reveal next page.
				// 		document.location.hash = $(parentSection).next('section').attr('id');
				// 		Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));			
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.ukQuiz_2.index++
				$.k2l.ukQuiz_2.wrongscore++
				// Session.set('m1a4WrongScore', $.k2l.ukQuiz_2.wrongscore);
				$('.incorrectscreen').removeClass('hidden');
				$('.lotto-button').addClass('flipOutX');

				if($.k2l.ukQuiz_2.index > $.k2l.ukQuiz_2.answer_index.length-1){

				setTimeout( function() {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);

				setTimeout(function() {
					$.k2l.ukQuiz_2.index = 0;
					$('.buttonaudio').attr("data-audiosrc","/audio/module1/a4/"+$.k2l.ukQuiz_2.audio[$.k2l.ukQuiz_2.index]+".m4a");
					setTimeout( function() {
					 	shuffle($.k2l.ukQuiz_2.choices[$.k2l.ukQuiz_2.index]);
						for(var i=0; i < $.k2l.ukQuiz_2.choices[$.k2l.ukQuiz_2.index].length+1; i++){
							$('.lotto-button').removeClass('flipOutX');
							var color = Math.floor(Math.random() * 8) + 1 ;
							$('#lottoc' +i).addClass('flipInX lotto'+color);
							$('#lottoc' +i).html('<div><span class="contents">'+$.k2l.ukQuiz_2.choices[$.k2l.ukQuiz_2.index][i]+"</span></div>");					
							}
						 },1);
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
						
				}, 2000);

				} else {

				setTimeout( function() {
					$('.incorrectscreen').addClass('hidden');
					$.k2l.ukQuiz_2.allowClick = true; // Make the buttons clickable again
					$('.lotto-button').removeClass('lotto1 lotto2 lotto3 lotto4 lotto5 lotto6 lotto7 lotto8 flipInX');
				
					 setTimeout( function() {
					 	shuffle($.k2l.ukQuiz_2.choices[$.k2l.ukQuiz_2.index]);
						for(var i=0; i < $.k2l.ukQuiz_2.choices[$.k2l.ukQuiz_2.index].length+1; i++){
							$('.lotto-button').removeClass('flipOutX');
							var color = Math.floor(Math.random() * 8) + 1 ;
							$('#lottoc' +i).addClass('flipInX lotto'+color);
							$('#lottoc' +i).html('<div><span class="contents">'+$.k2l.ukQuiz_2.choices[$.k2l.ukQuiz_2.index][i]+"</span></div>");					
							}
						 },1);
					}, 1000);
				$('.buttonaudio').attr("data-audiosrc","/audio/module1/a4/"+$.k2l.ukQuiz_2.audio[$.k2l.ukQuiz_2.index]+".m4a");
						setTimeout(function() {
							$.k2l.ukQuiz_2.sound.src = $('.buttonaudio').attr("data-audiosrc");
							$.k2l.ukQuiz_2.sound.play();
						}, 1000);
				}
		}
		}
			
	},

	'click .buttonaudio': function(evt) {
		$.k2l.ukQuiz_2.sound.src = $(evt.currentTarget).attr('data-audiosrc');
		$.k2l.ukQuiz_2.sound.play();
	},
	
	'click .pagination': function(evt) {
		$.k2l.ukQuiz_2.index = 0;
		$.k2l.ukQuiz_2.allowClick = true;
		$.k2l.ukQuiz_2.sound.src = {};
	}

});

Template.ukQuiz_2.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.ukQuiz_2 == 'undefined') {
		$.k2l.ukQuiz_2 = {};
	};
	
	 var answer_index = ["twenty nine","eleven","seventy","thirty one"];

	var choices = [
	["twenty nine", "seventy three", "twelve", "five", "forty two", "seventeen", "four", "one", "twenty eight", "ten", "twenty three", "ninety four"],
	// ["sixteen", "eighty three", "thirty two", "five", "twenty", "fifty", "ninety six", "sixty two", "ninety eight","forty", "thirty three", "seventeen"],
	// ["forty nine", "sixty two", "seventy one", "fifty nine", "three", "ninety six", "thirteen", "ninety one", "forty three", "twenty two", "twelve", "thirty three"],
	["eleven", "sixty six", "forty eight", "fifty", "seventy three", "twelve", "one hundred", "thirty two", "nineteen", "twenty six", "eighty four", "ninety four"],
	// ["ninety two", "seventy three", "twelve", "eighteen", "forty two", "four", "eighty", "twenty eight", "one", "ninety three", "sixty four", "seven"],
	// ["fifty four", "five", "twenty", "sixteen", "fifty", "ninety six", "ninety eight", "sixty two", "thirty two", "fifty five", "eighty three", "sixty nine"],
	// ["thirty", "thirty two", "sixty two", "thirteen", "ninety one", "three", "ninety six", "forty nine", "nineteen", "forty three", "ninety one", "twenty"],
	// ["nine", "twenty five", "sixty seven", "nineteen", "seventy", "three", "twelve", "one hundred", "thirty two", "eleven", "ten", "forty"],
	["seventy", "seven", "seventy three", "twelve", "thirty two", "forty nine", "two", "forty four", "twenty six", "seventy one", "sixty", "four"],
	// ["fifty five", "seven", "seventy three", "twelve", "thirty two", "forty nine", "two", "forty four", "twenty six", "sixty five", "ninety five", "forty five"],
	// ["ninety one", "thirty two", "eighty three", "five", "twenty", "nine", "six", "thirteen", "sixty two", "sixty one", "ninety three", "eleven"],
	["thirty one", "seventy one", "sixty two", "fifty nine", "ninety one", "three", "ninety six", "forty four", "nineteen", "twenty one", "seventy one", "seven"],
	// ["twenty six", "sixty six", "forty eight", "fifty", "seventy", "eleven", "three", "one hundred", "thirty two", "thirty six", "ninety one", "twenty nine"],
	// ["thirty three", "seventeen", "twelve", "eighteen", "forty two", "four", "eighty", "twenty eight", "one", "forty three", "seven", "eleven"],
	// ["eighty", "thirty two", "fifty four", "five", "twenty", "sixteen", "ninety six", "ninety eight", "sixty two", "ninety", "twelve", "sixty six"]
	 ];

	 var audio = ["29","11","70","31"]

	$.k2l.ukQuiz_2.answer_index = answer_index;
	$.k2l.ukQuiz_2.choices = choices;
	$.k2l.ukQuiz_2.index = 0;
	$.k2l.ukQuiz_2.rightscore = 0;
	$.k2l.ukQuiz_2.wrongscore = 0;
	$.k2l.ukQuiz_2.audio = audio;
	$.k2l.ukQuiz_2.sound = new Audio();

	$.k2l.ukQuiz_2.allowClick = true;
	Session.set('m1a4RightScore', 0);
	Session.set('m1a4WrongScore', 0);


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