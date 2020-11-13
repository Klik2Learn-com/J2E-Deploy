Template.m4a12.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m4a12_end') {
			return false;
		} return true;
	}
});

Template.m4a12.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(4, 12);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 12, subpage);
			oldLocation = location.href;
		}
	}, 500);
	Session.set('m4a12RightScore', 0);
	Session.set('m4a12WrongScore', 0);
}


Template.m4a12.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 12, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a12.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.hospitalwards.events({

	'click .flippable': function (evt) {
		$(evt.currentTarget).flip();
	}

});

Template.hospitalwards.rendered = function () {

	$('.flippable').flip();
}

Template.m4a12_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a12_1");
	}
});

Template.scorebox1.helpers({

});

Template.m4a12_2.events({

	"click .lotto-button": function (evt) {

		if ($.k2l.m4a12_2.allowClick == true) {
			$.k2l.m4a12_2.allowClick = false;
			var answer = '<div><span class="contents">' + $.k2l.m4a12_2.answer_index[$.k2l.m4a12_2.index] + "</span></div>";
			if ($(evt.currentTarget).html() == answer) {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m4a12_2.index++
				$.k2l.m4a12_2.rightscore++
				Session.set('m4a12RightScore', $.k2l.m4a12_2.rightscore);
				$('.correctscreen').removeClass('hidden');
				$('.lotto-button').addClass('flipOutX');

				if ($.k2l.m4a12_2.index > $.k2l.m4a12_2.answer_index.length - 1) {

					setTimeout(function () {
						$('.correctscreen').addClass('hidden');
					}, 1000);


					setTimeout(function () {
						$.k2l.m4a12_2.index = 0;
						$('.buttonaudio').attr("data-audiosrc", "/audio/module4/a12/" + $.k2l.m4a12_2.audio[$.k2l.m4a12_2.index] + ".m4a");
						setTimeout(function () {
							shuffle($.k2l.m4a12_2.choices);
							for (var i = 0; i < $.k2l.m4a12_2.choices.length + 1; i++) {
								$('.lotto-button').removeClass('flipOutX');
								var color = Math.floor(Math.random() * 8) + 1;
								$('#lottoc' + i).addClass('flipInX lotto' + color);
								$('#lottoc' + i).html('<div><span class="contents">' + $.k2l.m4a12_2.choices[i] + "</span></div>");
							}
						}, 1);
						$(parentSection).addClass('hidden'); // hide this page
						if ($.k2l.m4a12_2.wrongscore > 5) {
							$('#m4a12_bad').removeClass('hidden');// reveal next page.
							$('.lotto-button').removeClass('flipOutX');
						} else {
							$('#m4a12_good').removeClass('hidden');
							$('.lotto-button').removeClass('flipOutX');
						};
					}, 2000);

				} else {

					setTimeout(function () {
						$('.correctscreen').addClass('hidden');
						$.k2l.m4a12_2.allowClick = true; // Make the buttons clickable again
						$('.lotto-button').removeClass('lotto1 lotto2 lotto3 lotto4 lotto5 lotto6 lotto7 lotto8 flipInX');


						setTimeout(function () {
							shuffle($.k2l.m4a12_2.choices);
							for (var i = 0; i < $.k2l.m4a12_2.choices.length + 1; i++) {
								$('.lotto-button').removeClass('flipOutX');
								var color = Math.floor(Math.random() * 8) + 1;
								$('#lottoc' + i).addClass('flipInX lotto' + color);
								$('#lottoc' + i).html('<div><span class="contents">' + $.k2l.m4a12_2.choices[i] + "</span></div>");

							}
						}, 1);
					}, 1000);

					$('.buttonaudio').attr("data-audiosrc", "/audio/module4/a12/" + $.k2l.m4a12_2.audio[$.k2l.m4a12_2.index] + ".m4a");

					setTimeout(function () {
						resetAllAudioButtons();
						var audioButton = $('.buttonaudio')[0];
						audioButtonClickSetup($.k2l.m4a12_2.sound, audioButton);
						playPauseAudio($.k2l.m4a12_2.sound, audioButton);
					}, 1000);
				}

			} else {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m4a12_2.index++
				$.k2l.m4a12_2.wrongscore++
				Session.set('m4a12WrongScore', $.k2l.m4a12_2.wrongscore);
				$('.incorrectscreen').removeClass('hidden');
				$('.lotto-button').addClass('flipOutX');

				if ($.k2l.m4a12_2.index > $.k2l.m4a12_2.answer_index.length - 1) {

					setTimeout(function () {
						$('.incorrectscreen').addClass('hidden');
					}, 1000);

					setTimeout(function () {
						$.k2l.m4a12_2.index = 0;
						$('.buttonaudio').attr("data-audiosrc", "/audio/module4/a12/" + $.k2l.m4a12_2.audio[$.k2l.m4a12_2.index] + ".m4a");
						setTimeout(function () {
							shuffle($.k2l.m4a12_2.choices);
							for (var i = 0; i < $.k2l.m4a12_2.choices.length + 1; i++) {
								$('.lotto-button').removeClass('flipOutX');
								var color = Math.floor(Math.random() * 8) + 1;
								$('#lottoc' + i).addClass('flipInX lotto' + color);
								$('#lottoc' + i).html('<div><span class="contents">' + $.k2l.m4a12_2.choices[i] + "</span></div>");
							}
						}, 1);

						$(parentSection).addClass('hidden'); // hide this page
						if ($.k2l.m4a12_2.wrongscore > 5) {
							$.k2l.m4a12_2.allowClick = true;
							$.k2l.m4a12_2.wrongscore = 0;
							$.k2l.m4a12_2.rightscore = 0;
							$('#m4a12_bad').removeClass('hidden');// reveal next page.
							$('.lotto-button').removeClass('flipOutX');
						} else {
							$.k2l.m4a12_2.allowClick = true;
							$.k2l.m4a12_2.wrongscore = 0;
							$.k2l.m4a12_2.rightscore = 0;
							$('#m4a12_good').removeClass('hidden');
							$('.lotto-button').removeClass('flipOutX');
						};
					}, 2000);

				} else {

					setTimeout(function () {
						$('.incorrectscreen').addClass('hidden');
						$.k2l.m4a12_2.allowClick = true; // Make the buttons clickable again
						$('.lotto-button').removeClass('lotto1 lotto2 lotto3 lotto4 lotto5 lotto6 lotto7 lotto8 flipInX');

						setTimeout(function () {
							shuffle($.k2l.m4a12_2.choices);
							for (var i = 0; i < $.k2l.m4a12_2.choices.length + 1; i++) {
								$('.lotto-button').removeClass('flipOutX');
								var color = Math.floor(Math.random() * 8) + 1;
								$('#lottoc' + i).addClass('flipInX lotto' + color);
								$('#lottoc' + i).html('<div><span class="contents">' + $.k2l.m4a12_2.choices[i] + "</span></div>");
							}
						}, 1);
					}, 1000);

					$('.buttonaudio').attr("data-audiosrc", "/audio/module4/a12/" + $.k2l.m4a12_2.audio[$.k2l.m4a12_2.index] + ".m4a");

					setTimeout(function () {
						resetAllAudioButtons();
						var audioButton = $('.buttonaudio')[0];
						audioButtonClickSetup($.k2l.m4a12_2.sound, audioButton);
						playPauseAudio($.k2l.m4a12_2.sound, audioButton);
					}, 1000);
				}
			}
		}

	},

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m4a12_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m4a12_2.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {
		$.k2l.m4a12_2.index = 0;
		$.k2l.m4a12_2.allowClick = true;
		$.k2l.m4a12_2.sound.src = {};
	}

});

Template.m4a12_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a12_2 == 'undefined') {
		$.k2l.m4a12_2 = {};
	};

	var answer_index = ["heart patients", "children’s department", "cancer patients", "accidents/sudden illness", "mothers and babies", "brain patients", "eye patients", "X rays", "exercise and massage", "medicines", "kidney patients", "broken bones"];

	var choices = ["heart patients", "children’s department", "cancer patients", "accidents/sudden illness", "mothers and babies", "brain patients", "eye patients", "X rays", "exercise and massage", "medicines", "kidney patients", "broken bones"];

	var audio = ["Cardiology", "Paediatrics", "Oncology", "Accident_and_Emergency_(AandE)", "Maternity", "Neurology", "Ophthalmology", "Radiotherapy", "Physiotherapy", "Pharmacy", "Renal Unit", "Orthopaedics"]

	$.k2l.m4a12_2.answer_index = answer_index;
	$.k2l.m4a12_2.choices = choices;
	$.k2l.m4a12_2.index = 0;
	$.k2l.m4a12_2.rightscore = 0;
	$.k2l.m4a12_2.wrongscore = 0;
	$.k2l.m4a12_2.audio = audio;
	$.k2l.m4a12_2.sound = new Audio();

	$.k2l.m4a12_2.allowClick = true;
	Session.set('m4a12RightScore', 0);
	Session.set('m4a12WrongScore', 0);


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

Template.m4a12_3.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m4a12_3");
	}
});


Template.m4a12_3.events({

	"click .pagination": function (evt) {
		if (typeof $.k2l != 'undefined') {
			if (typeof $.k2l.m4a12_2 != 'undefined') {
				if (typeof $.k2l.m4a12_2.index != 'undefined') {
					$.k2l.m4a12_2.index = 0;
				}
				if (typeof $.k2l.m4a12_2.RightScore != 'undefined') {
					$.k2l.m4a12_2.RightScore = 0;
				}
				if (typeof $.k2l.m4a12_2.WrongScore != 'undefined') {
					$.k2l.m4a12_2.WrongScore = 0;
				}
			}
		}
		Session.set('m4a12RightScore', 0);
		Session.set('m4a12WrongScore', 0);
		// $.k2l.m4a12_2.allowClick = true;
	},

	"click #m4a12restart": function (evt) {
		$.k2l.m4a12_2.index = 0;
		$.k2l.m4a12_2.allowClick = true;
		$.k2l.m4a12_2.sound.src = {};
		$.k2l.m4a12_2.wrongscore = 0;
		$.k2l.m4a12_2.rightscore = 0;
		Session.set('m4a12RightScore', 0);
		Session.set('m4a12WrongScore', 0);
		Session.set("activeSection", "#m4a12_1");
		forceReload();
	}
});

Template.m4a12_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a12_4");
	}
});

Template.m4a12_4.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m4a12_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m4a12_4.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m4a12_4.sound.src = {};
	}

});

Template.m4a12_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a12_4 == 'undefined') {
		$.k2l.m4a12_4 = {};
	};

	$.k2l.m4a12_4.sound = new Audio();
}
