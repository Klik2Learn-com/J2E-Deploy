Template.m1a4.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m1a4_end') {
			return false;
		}
		return true;
	}
});

Template.m1a4.rendered = function () {
	setStartActivity(1, 4);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(1, 4, subpage);
			oldLocation = location.href;
		}
	}, 500);
	
    document.title = "Journey 2 English";
}

Template.m1a4.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 1, 4, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m1a4.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m1a4_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a4_1");
	}
});

Template.m1a4_1.events({

	"click .lotto-button": function (evt) {
		if ($.k2l.m1a4_1.allowClick == true) {
			$(".is-playing").removeClass("is-playing");
			$.k2l.m1a4_1.allowClick = false;
			var answer = '<div><span class="contents">' + $.k2l.m1a4_1.answer_index[$.k2l.m1a4_1.index] + "</span></div>";
			if ($(evt.currentTarget).html() == answer) {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m1a4_1.index++
				$.k2l.m1a4_1.rightscore++
				Session.set('m1a4RightScore', $.k2l.m1a4_1.rightscore);
				$('.correctscreen').removeClass('hidden');
				$('.lotto-button').addClass('flipOutX');

				if ($.k2l.m1a4_1.index > $.k2l.m1a4_1.answer_index.length - 1) {

					setTimeout(function () {
						$('.correctscreen').addClass('hidden');
					}, 1000);


					setTimeout(function () {
						$.k2l.m1a4_1.index = 0;
						$('#m1a4AudioBtn').attr("data-audiosrc", "/audio/module1/a4/" + $.k2l.m1a4_1.audio[$.k2l.m1a4_1.index] + ".m4a");
						setTimeout(function () {
							shuffle($.k2l.m1a4_1.choices[$.k2l.m1a4_1.index]);
							for (var i = 0; i < $.k2l.m1a4_1.choices[$.k2l.m1a4_1.index].length + 1; i++) {
								$('.lotto-button').removeClass('flipOutX');
								var color = Math.floor(Math.random() * 8) + 1;
								$('#lottoc' + i).addClass('flipInX lotto' + color);
								$('#lottoc' + i).html('<div><span class="contents">' + $.k2l.m1a4_1.choices[$.k2l.m1a4_1.index][i] + "</span></div>");
							}
						}, 1);
						$(parentSection).addClass('hidden'); // hide this page
						if ($.k2l.m1a4_1.wrongscore > 5) {
							$('#m1a4_bad').removeClass('hidden');// reveal next page.
							$('.lotto-button').removeClass('flipOutX');
						} else {
							$('#m1a4_good').removeClass('hidden');
							$('.lotto-button').removeClass('flipOutX');
						};
					}, 2000);

				} else {

					setTimeout(function () {
						$(".is-playing").removeClass("is-playing");
						$('.correctscreen').addClass('hidden');
						$.k2l.m1a4_1.allowClick = true; // Make the buttons clickable again
						$('.lotto-button').removeClass('lotto1 lotto2 lotto3 lotto4 lotto5 lotto6 lotto7 lotto8 flipInX');


						setTimeout(function () {
							shuffle($.k2l.m1a4_1.choices[$.k2l.m1a4_1.index]);
							for (var i = 0; i < $.k2l.m1a4_1.choices[$.k2l.m1a4_1.index].length + 1; i++) {
								$('.lotto-button').removeClass('flipOutX');
								var color = Math.floor(Math.random() * 8) + 1;
								$('#lottoc' + i).addClass('flipInX lotto' + color);
								$('#lottoc' + i).html('<div><span class="contents">' + $.k2l.m1a4_1.choices[$.k2l.m1a4_1.index][i] + "</span></div>");

							}

							$(".is-playing").removeClass("is-playing");
							
						}, 1);
					}, 1000);
					$('#m1a4AudioBtn').attr("data-audiosrc", "/audio/module1/a4/" + $.k2l.m1a4_1.audio[$.k2l.m1a4_1.index] + ".m4a");
					setTimeout(function () {
						$(".is-playing").removeClass("is-playing");
						
						// audioButtonClickSetup($.k2l.m1a4_1.sound, $(evt.currentTarget));
						// playPauseAudio($.k2l.m1a4_1.sound, $(evt.currentTarget));
					}, 1000);
				}
			} else {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m1a4_1.index++
				$.k2l.m1a4_1.wrongscore++
				Session.set('m1a4WrongScore', $.k2l.m1a4_1.wrongscore);
				$('.incorrectscreen').removeClass('hidden');
				$('.lotto-button').addClass('flipOutX');

				if ($.k2l.m1a4_1.index > $.k2l.m1a4_1.answer_index.length - 1) {

					setTimeout(function () {
						$('.incorrectscreen').addClass('hidden');
					}, 1000);

					setTimeout(function () {
						$.k2l.m1a4_1.index = 0;
						$('#m1a4AudioBtn').attr("data-audiosrc", "/audio/module1/a4/" + $.k2l.m1a4_1.audio[$.k2l.m1a4_1.index] + ".m4a");
						setTimeout(function () {
							shuffle($.k2l.m1a4_1.choices[$.k2l.m1a4_1.index]);
							for (var i = 0; i < $.k2l.m1a4_1.choices[$.k2l.m1a4_1.index].length + 1; i++) {
								$('.lotto-button').removeClass('flipOutX');
								var color = Math.floor(Math.random() * 8) + 1;
								$('#lottoc' + i).addClass('flipInX lotto' + color);
								$('#lottoc' + i).html('<div><span class="contents">' + $.k2l.m1a4_1.choices[$.k2l.m1a4_1.index][i] + "</span></div>");
							}
						}, 1);
						$(parentSection).addClass('hidden'); // hide this page
						if ($.k2l.m1a4_1.wrongscore > 5) {
							$('#m1a4_bad').removeClass('hidden');// reveal next page.
							$('.lotto-button').removeClass('flipOutX');
						} else {
							$('#m1a4_good').removeClass('hidden');
							$('.lotto-button').removeClass('flipOutX');
						};
					}, 2000);

				} else {

					setTimeout(function () {
						$('.incorrectscreen').addClass('hidden');
						$.k2l.m1a4_1.allowClick = true; // Make the buttons clickable again
						$('.lotto-button').removeClass('lotto1 lotto2 lotto3 lotto4 lotto5 lotto6 lotto7 lotto8 flipInX');

						setTimeout(function () {
							shuffle($.k2l.m1a4_1.choices[$.k2l.m1a4_1.index]);
							for (var i = 0; i < $.k2l.m1a4_1.choices[$.k2l.m1a4_1.index].length + 1; i++) {
								$('.lotto-button').removeClass('flipOutX');
								var color = Math.floor(Math.random() * 8) + 1;
								$('#lottoc' + i).addClass('flipInX lotto' + color);
								$('#lottoc' + i).html('<div><span class="contents">' + $.k2l.m1a4_1.choices[$.k2l.m1a4_1.index][i] + "</span></div>");
							}
							$(".is-playing").removeClass("is-playing");
							
						}, 1);
					}, 1000);

					$('#m1a4AudioBtn').attr("data-audiosrc", "/audio/module1/a4/" + $.k2l.m1a4_1.audio[$.k2l.m1a4_1.index] + ".m4a");

					setTimeout(function () {
						$(".is-playing").removeClass("is-playing");
						
						// audioButtonClickSetup($.k2l.m1a4_1.sound, $(evt.currentTarget));
						// playPauseAudio($.k2l.m1a4_1.sound, $(evt.currentTarget));
					}, 1000);
				}
			}
		}

	},

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m1a4_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m1a4_1.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {
		$.k2l.m1a4_1.index = 0;
		$.k2l.m1a4_1.allowClick = true;
		$.k2l.m1a4_1.sound.src = {};
	}

});

Template.m1a4_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a4_1 == 'undefined') {
		$.k2l.m1a4_1 = {};
	};

	var answer_index = ["twenty nine", "sixteen", "forty nine", "eleven", "ninety two", "fifty four", "thirty", "nine", "seventy", "fifty five", "ninety one", "thirty one", "twenty six", "thirty three", "eighty",];

	var choices = [
		["twenty nine", "seventy three", "twelve", "five", "forty two", "seventeen", "four", "one", "twenty eight", "ten", "twenty three", "ninety four"],
		["sixteen", "eighty three", "thirty two", "five", "twenty", "fifty", "ninety six", "sixty two", "ninety eight", "forty", "thirty three", "seventeen"],
		["forty nine", "sixty two", "seventy one", "fifty nine", "three", "ninety six", "thirteen", "ninety one", "forty three", "twenty two", "twelve", "thirty three"],
		["eleven", "sixty six", "forty eight", "fifty", "seventy three", "twelve", "one hundred", "thirty two", "nineteen", "twenty six", "eighty four", "ninety four"],
		["ninety two", "seventy three", "twelve", "eighteen", "forty two", "four", "eighty", "twenty eight", "one", "ninety three", "sixty four", "seven"],
		["fifty four", "five", "twenty", "sixteen", "fifty", "ninety six", "ninety eight", "sixty two", "thirty two", "fifty five", "eighty three", "sixty nine"],
		["thirty", "thirty two", "sixty two", "thirteen", "ninety one", "three", "ninety six", "forty nine", "nineteen", "forty three", "ninety one", "twenty"],
		["nine", "twenty five", "sixty seven", "nineteen", "seventy", "three", "twelve", "one hundred", "thirty two", "eleven", "ten", "forty"],
		["seventy", "seven", "seventy three", "twelve", "thirty two", "forty nine", "two", "forty four", "twenty six", "seventy one", "sixty", "four"],
		["fifty five", "seven", "seventy three", "twelve", "thirty two", "forty nine", "two", "forty four", "twenty six", "sixty five", "ninety five", "forty five"],
		["ninety one", "thirty two", "eighty three", "five", "twenty", "nine", "six", "thirteen", "sixty two", "sixty one", "ninety three", "eleven"],
		["thirty one", "seventy one", "sixty two", "fifty nine", "ninety one", "three", "ninety six", "forty four", "nineteen", "twenty one", "seventy one", "seven"],
		["twenty six", "sixty six", "forty eight", "fifty", "seventy", "eleven", "three", "one hundred", "thirty two", "thirty six", "ninety one", "twenty nine"],
		["thirty three", "seventeen", "twelve", "eighteen", "forty two", "four", "eighty", "twenty eight", "one", "forty three", "seven", "eleven"],
		["eighty", "thirty two", "fifty four", "five", "twenty", "sixteen", "ninety six", "ninety eight", "sixty two", "ninety", "twelve", "sixty six"]
	];

	var audio = ["29", "16", "49", "11", "92", "54", "30", "9", "70", "55", "91", "31", "26", "33", "80"]

	$.k2l.m1a4_1.answer_index = answer_index;
	$.k2l.m1a4_1.choices = choices;
	$.k2l.m1a4_1.index = 0;
	$.k2l.m1a4_1.rightscore = 0;
	$.k2l.m1a4_1.wrongscore = 0;
	$.k2l.m1a4_1.audio = audio;
	$.k2l.m1a4_1.sound = new Audio();

	$.k2l.m1a4_1.allowClick = true;
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



Template.m1a4_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a4_2");
	}
});

Template.m1a4_2.events({

	"click .pagination": function (evt) {
		if (typeof $.k2l != 'undefined') {
			if (typeof $.k2l.m1a4_1 != 'undefined') {
				if (typeof $.k2l.m1a4_1.index != 'undefined') {
					$.k2l.m1a4_1.index = 0;
				}
				if (typeof $.k2l.m1a4_1.rightscore != 'undefined') {
					$.k2l.m1a4_1.rightscore = 0;
				}
				if (typeof $.k2l.m1a4_1.wrongscore != 'undefined') {
					$.k2l.m1a4_1.wrongscore = 0;
				}
			}
		}
		Session.set('m1a4RightScore', 0);
		Session.set('m1a4WrongScore', 0);
		$.k2l.m1a4_1.allowClick = true;
		$('#m1a4AudioBtn').attr("data-audiosrc", "/audio/module1/a4/" + $.k2l.m1a4_1.audio[$.k2l.m1a4_1.index] + ".m4a");
		$('.lotto-button').addClass('flinInX');

	},

	"click #m1a4restart": function (evt) {
		Session.set("activeSection", "#m1a4_1");
		forceReload();
	}
});

Template.m1a4_2.rendered = function () {
}
