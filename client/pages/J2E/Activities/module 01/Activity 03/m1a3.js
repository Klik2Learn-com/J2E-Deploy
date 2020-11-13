Template.m1a3.rendered = function () {
	setStartActivity(1, 3);

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	}
	if (typeof $.k2l.m1a3 == 'undefined') {
		$.k2l.m1a3 = {};
	}

	if (typeof $.k2l.m1a3_3 == 'undefined') {
		$.k2l.m1a3_3 = {};
	}

	$.nums = [];
	$.k2l.m1a3_sound = new Audio();

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(1, 3, subpage);
			oldLocation = location.href;
		}
	}, 500);

    document.title = "Journey 2 English";

}

Template.m1a3_numbers.helpers({
	// We use this trick to force the template to rerender
	// We include handlebar logic in the html for this e.g. {{#if activeSection}}
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a3_2");
	},
	// Note we pass in two parameters that dictates what we show
	getNumbers: function (first, last) {
		var numbers = [];
		for (var i = first; i <= last; i++) {
			numbers.push(i);
		}

		return numbers;
	}
});

Template.m1a3_numbers.events({
	'click .buttonaudio': function (evt) {
		var target = evt.currentTarget;

		//Not currently used
		//var divs = $(target).siblings('div');

		// $(divs[2]).addClass('grammar');



		// $.k2l.m1a3_sound.pause();
		// $.k2l.m1a3_sound.currentTime = 0;

		$.k2l.m1a3.animIndex = parseInt(target.getAttribute("data-start"));
		$.k2l.m1a3.animLast = $.k2l.m1a3.animIndex + 10;

		var soundfile = "audio/module1/a3/" + $.k2l.m1a3.animIndex + "-" + ($.k2l.m1a3.animLast - 1) + ".m4a";
		target.setAttribute('data-audiosrc', soundfile);

		audioButtonClickSetup($.k2l.m1a3_sound, target);
		playPauseAudio($.k2l.m1a3_sound, target);

		// $.k2l.m1a3_sound.src = soundfile;
		// addSpinner($.k2l.m1a3_sound, $(evt.currentTarget));
		// $.k2l.m1a3_sound.load();
		// $.k2l.m1a3_sound.play();

		// var m1a3_animate = function(divs, i){
		//   console.log(divs + " " + i);
		//   $(divs[i]).addClass('grammar');
		// };

		// for ( var i = 0; i < 10 ; i++){
		//   // setInterval(m1a3_animate, 1000, divs, i);
		// }


	},
	'click a.pagination': function (evt) {
		
		$.k2l.m1a3_sound.pause();
		$.k2l.m1a3_sound.src = {};
		if (typeof $.k2l != 'undefined') {
			if (typeof $.k2l.m1a3 != 'undefined') {
				if (typeof $.k2l.m1a3.timer != 'undefined') {
					Meteor.clearInterval($.k2l.m1a3.timer);
				}
			}
		}
	}
});


function audioPlayed() {
	$.k2l.m1a3.isPlaying = false;
}

function toggleHighlight(index) {
	$('.m1a3-num-off').removeClass('m1a3-num-on');
	var item = $('.m1a3-num-off').eq(index);
	item.addClass('m1a3-num-on');
}

Template.m1a3_numbers_words.helpers({
	// We use this trick to force the template to rerender
	// We include handlebar logic in the html for this e.g. {{#if activeSection}}
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a3_3");
	},
	// Note we pass in two parameters that dictates what we show
	getLabels: function (first, last) {
		var numbers = [];
		for (var i = first; i <= last; i++) {
			numbers.push(i);
		}
		var words1 = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
		var words2 = ["eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
		var words3 = ["twenty-one", "twenty-two", "twenty-three", "twenty-four", "twenty-five", "twenty-six", "twenty-seven", "twenty-eight", "twenty-nine", "thirty"];
		var words4 = ["thirty-one", "thirty-two", "thirty-three", "thirty-four", "thirty-five", "thirty-six", "thirty-seven", "thirty-eight", "thirty-nine", "forty"];
		var words5 = ["forty-one", "forty-two", "forty-three", "forty-four", "forty-five", "forty-six", "forty-seven", "forty-eight", "forty-nine", "fifty"];
		var words6 = ["fifty-one", "fifty-two", "fifty-three", "fifty-four", "fifty-five", "fifty-six", "fifty-seven", "fifty-eight", "fifty-nine", "sixty"];
		var words7 = ["sixty-one", "sixty-two", "sixty-three", "sixty-four", "sixty-five", "sixty-six", "sixty-seven", "sixty-eight", "sixty-nine", "seventy"];
		var words8 = ["seventy-one", "seventy-two", "seventy-three", "seventy-four", "seventy-five", "seventy-six", "seventy-seven", "seventy-eight", "seventy-nine", "eighty"];
		var words9 = ["eighty-one", "eighty-two", "eighty-three", "eighty-four", "eighty-five", "eighty-six", "eighty-seven", "eighty-eight", "eighty-nine", "ninety"];
		var words10 = ["ninety-one", "ninety-two", "ninety-three", "ninety-four", "ninety-five", "ninety-six", "ninety-seven", "ninety-eight", "ninety-nine", "one-hundred"];
		var words = words1.concat(words2, words3, words4, words5, words6, words7, words8, words9, words10);
		var labels = []; // square brackets
		for (i = 0; i < numbers.length; i++) {
			var label = {};  // curly brackets
			label.number = numbers[i];
			label.label = words[numbers[i] - 1];
			labels.push(label);
		}
		return labels;
	}
});

Template.m1a3_numbers_words.events({
	// We now select by class rather than id so we only need 1 event handler fdefinition intead of 10
	// This technique would be the same in jQuery
	'click .buttonaudio': function (evt) {
		var target = evt.currentTarget;

		//var divs = $(target).siblings('div');

		// $(divs[2]).addClass('grammar');

		// $.k2l.m1a3_sound.pause();
		// $.k2l.m1a3_sound.currentTime = 0;

		$.k2l.m1a3.animIndex = parseInt(target.getAttribute("data-start"));
		$.k2l.m1a3.animLast = $.k2l.m1a3.animIndex + 10;

		var soundfile = "audio/module1/a3/" + $.k2l.m1a3.animIndex + "-" + ($.k2l.m1a3.animLast - 1) + ".m4a";
		target.setAttribute('data-audiosrc', soundfile);
		audioButtonClickSetup($.k2l.m1a3_sound, target);
		playPauseAudio($.k2l.m1a3_sound, target);


		// $.k2l.m1a3_sound.src = soundfile;
		// addSpinner($.k2l.m1a3_sound, $(evt.currentTarget));
		// $.k2l.m1a3_sound.load();
		// $.k2l.m1a3_sound.play();


	},
	'click a.pagination': function (evt) {
		$.k2l.m1a3_sound.pause();
		$.k2l.m1a3_sound.src = {};
		if (typeof $.k2l != 'undefined') {
			if (typeof $.k2l.m1a3 != 'undefined') {
				if (typeof $.k2l.m1a3.timer != 'undefined') {
					Meteor.clearInterval($.k2l.m1a3.timer);
				}
			}
		}
	}
});


// The following functions are not used but left for future animations if needed.
/*
function timerFunctionWord(){
  var soundfile = "audio/module1/a3/" + $.k2l.m1a3.animIndex + ".m4a";
  toggleHighlightWord($.k2l.m1a3.animIndex-1);
  // Test if the animation is complete
  if($.k2l.m1a3.animIndex == $.k2l.m1a3.animLast){
    // Reset for next time and toggle any classes or states needed
    Meteor.clearInterval($.k2l.m1a3.timer);
    $('.numWord').removeClass('grammar');
    $('.buttonaudio').prop('disabled', false);
    $.k2l.m1a3.sound.pause();
    $.k2l.m1a3.isPlaying = true;
  }
  if(!$.k2l.m1a3.isPlaying) {
    $.k2l.m1a3_sound.src = soundfile;
    addSpinner($.k2l.m1a3_sound, $(evt.currentTarget));
    $.k2l.m1a3_sound.play();
    $.k2l.m1a3.animIndex = $.k2l.m1a3.animIndex + 1;  
  }
  
}

function toggleHighlightWord(index){
 $('.numWord').removeClass('grammar');
  var item = $('.numWord').eq(index);
  item.addClass('grammar');
}

*/

Template.m1a3.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m1a3_end') {
			return false;
		} return true;
	}
});

Template.m1a3.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 1, 3, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m1a3.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

