Template.m8a2.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m8a2_end') {
			return false;
		}
		return true;
	}
});

Template.m8a2.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(8, 2);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 2, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m8a2.events({
	'click #try-again, click .pagination': function (evt) {
		$.k2l.m8a2_2.index = 0;
		$('#questions').html($.k2l.m8a2_2.questions[$.k2l.m8a2_2.index]);
		$.k2l.m8a2_2.rightscore = 0;
		$.k2l.m8a2_2.wrongscore = 0;

		$.k2l.m8a2_2.allowClick = true;
		Session.set('m8a2_2RightScore', 0);
		Session.set('m8a2_2WrongScore', 0);
		updateQNum($.k2l.m8a2_2.index + 1);
	}
})

Template.m8a2.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 2, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a2.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


Template.m8a2_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a2_1");
	}
});

Template.m8a2_1.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m8a2_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a2_1.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m8a2_1.sound.src = {};
	}

});

Template.m8a2_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a2_1 == 'undefined') {
		$.k2l.m8a2_1 = {};
	};

	$.k2l.m8a2_1.sound = new Audio();
}

Template.m8a2_2.events({

	"click .lotto-button": function (evt) {

		if ($.k2l.m8a2_2.allowClick == true) {
			$.k2l.m8a2_2.allowClick = false;
			var answer = '<div><span class="contents">' + $.k2l.m8a2_2.answer_index[$.k2l.m8a2_2.index] + "</span></div>";
			if ($(evt.currentTarget).html() == answer) {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m8a2_2.index++
				$.k2l.m8a2_2.rightscore++
				Session.set('m8a2_2RightScore', $.k2l.m8a2_2.rightscore);
				$('.correctscreen').removeClass('hidden');
				$('.lotto-button').addClass('flipOutX');

				if ($.k2l.m8a2_2.index > $.k2l.m8a2_2.answer_index.length-1) {

					setTimeout(function () {
						$('.correctscreen').addClass('hidden');
					}, 1000);


					setTimeout(function () {
						$.k2l.m8a2_2.index = 0;
						$('#questions').html($.k2l.m8a2_2.questions[$.k2l.m8a2_2.index]);
						setTimeout(function () {
							shuffle($.k2l.m8a2_2.choices);
							for (var i = 0; i < $.k2l.m8a2_2.choices.length + 1; i++) {
								$('.lotto-button').removeClass('flipOutX');
								var color = Math.floor(Math.random() * 8) + 1;
								$('#lottoc' + i).addClass('flipInX lotto' + color);
								$('#lottoc' + i).html('<div><span class="contents">' + $.k2l.m8a2_2.choices[i] + "</span></div>");
							}
						}, 1);
						$(parentSection).addClass('hidden'); // hide this page
						if ($.k2l.m8a2_2.wrongscore > 5) {
							$.k2l.m8a2_2.allowClick = true;
							$('#m8a2_bad').removeClass('hidden');// reveal next page.
							$('.lotto-button').removeClass('flipOutX');
						} else {
							$.k2l.m8a2_2.allowClick = true;
							$('#m8a2_good').removeClass('hidden');
							$('.lotto-button').removeClass('flipOutX');
						};
					}, 2000);

				} else {

					setTimeout(function () {
						$('.correctscreen').addClass('hidden');
						$.k2l.m8a2_2.allowClick = true; // Make the buttons clickable again
						$('.lotto-button').removeClass('lotto1 lotto2 lotto3 lotto4 lotto5 lotto6 lotto7 lotto8 flipInX');
						$('#questions').html($.k2l.m8a2_2.questions[$.k2l.m8a2_2.index]);
						updateQNum($.k2l.m8a2_2.index + 1);

						setTimeout(function () {
							shuffle($.k2l.m8a2_2.choices);
							for (var i = 0; i < $.k2l.m8a2_2.choices.length + 1; i++) {
								$('.lotto-button').removeClass('flipOutX');
								var color = Math.floor(Math.random() * 8) + 1;
								$('#lottoc' + i).addClass('flipInX lotto' + color);
								$('#lottoc' + i).html('<div><span class="contents">' + $.k2l.m8a2_2.choices[i] + "</span></div>");

							}
						}, 1);
					}, 1000);
				}
			} else {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m8a2_2.index++
				$.k2l.m8a2_2.wrongscore++
				Session.set('m8a2_2WrongScore', $.k2l.m8a2_2.wrongscore);
				$('.incorrectscreen').removeClass('hidden');
				$('.lotto-button').addClass('flipOutX');

				if ($.k2l.m8a2_2.index > $.k2l.m8a2_2.answer_index.length-1) {

					setTimeout(function () {
						$('.incorrectscreen').addClass('hidden');
					}, 1000);

					setTimeout(function () {
						$.k2l.m8a2_2.index = 0;
						$('#questions').html($.k2l.m8a2_2.questions[$.k2l.m8a2_2.index]);
						setTimeout(function () {
							shuffle($.k2l.m8a2_2.choices);
							for (var i = 0; i < $.k2l.m8a2_2.choices.length + 1; i++) {
								$('.lotto-button').removeClass('flipOutX');
								var color = Math.floor(Math.random() * 8) + 1;
								$('#lottoc' + i).addClass('flipInX lotto' + color);
								$('#lottoc' + i).html('<div><span class="contents">' + $.k2l.m8a2_2.choices[i] + "</span></div>");
							}
						}, 1);
						$(parentSection).addClass('hidden'); // hide this page
						if ($.k2l.m8a2_2.wrongscore > 5) {
							$.k2l.m8a2_2.allowClick = true;
							$('#m8a2_bad').removeClass('hidden');// reveal next page.
							$('.lotto-button').removeClass('flipOutX');
						} else {
							$.k2l.m8a2_2.allowClick = true;
							$('#m8a2_good').removeClass('hidden');
							$('.lotto-button').removeClass('flipOutX');
						};
					}, 2000);

				} else {

					setTimeout(function () {
						$('.incorrectscreen').addClass('hidden');
						$.k2l.m8a2_2.allowClick = true; // Make the buttons clickable again
						$('.lotto-button').removeClass('lotto1 lotto2 lotto3 lotto4 lotto5 lotto6 lotto7 lotto8 flipInX');
						$('#questions').html($.k2l.m8a2_2.questions[$.k2l.m8a2_2.index]);
						updateQNum($.k2l.m8a2_2.index + 1);

						setTimeout(function () {
							shuffle($.k2l.m8a2_2.choices);
							for (var i = 0; i < $.k2l.m8a2_2.choices.length + 1; i++) {
								$('.lotto-button').removeClass('flipOutX');
								var color = Math.floor(Math.random() * 8) + 1;
								$('#lottoc' + i).addClass('flipInX lotto' + color);
								$('#lottoc' + i).html('<div><span class="contents">' + $.k2l.m8a2_2.choices[i] + "</span></div>");
							}
						}, 1);
					}, 1000);
				}
			}
		}

	},

	'click .pagination': function (evt) {
		$.k2l.m8a2_2.index = 0;
		$('#questions').html($.k2l.m8a2_2.questions[$.k2l.m8a2_2.index]);
		$.k2l.m8a2_2.allowClick = true;
	}

});

Template.m8a2_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	}

	if (typeof $.k2l.m8a2_2 == 'undefined') {
		$.k2l.m8a2_2 = {};
	}

	var answer_index = ["Profession",
		"Catering",
		"Decorator",
		"Strategic",
		"Automated",
		"Architect",
		"Innovation",
		"Surveyor",
		"Plumber",
		"Administration",
		"Joiner",
		"Renewable energy",
		"Environmental health",
		"Labour intensive",
		"Commercial building"];

	var choices = ["Profession", "Catering", "Decorator", "Strategic", "Automated", "Architect", "Innovation", "Surveyor", "Plumber", "Administration", "Joiner", "Renewable energy", "Environmental health", "Labour intensive", "Commercial building"];

	var questions = ["A job that requires a long period of training and a formal qualification.", "Providing food for an organisation or company.", "A person skilled in painting and finishing the interior of a building.", "Thinking about long term plans and goals.", "Using machines or computers to do a job.", "A person trained to design buildings.", "An invention or a new way of doing something.", "A person trained to examine buildings for any faults.", "A person skilled in installing water supplies to a building.", "Doing the necessary paperwork for a business or organisation.", "A person skilled in working with wood", "Energy from natural sources such as wind, tides, sunlight.", "Dealing with problems like rubbish, pollution, rats, waste material etc.", "Needing a lot of people to do a job.", "A building used for business not as a home."
	]


	$.k2l.m8a2_2.answer_index = answer_index;
	$.k2l.m8a2_2.choices = choices;
	$.k2l.m8a2_2.questions = questions;
	$.k2l.m8a2_2.index = 0;
	$('#questions').html($.k2l.m8a2_2.questions[$.k2l.m8a2_2.index]);
	$.k2l.m8a2_2.rightscore = 0;
	$.k2l.m8a2_2.wrongscore = 0;

	$.k2l.m8a2_2.allowClick = true;
	Session.set('m8a2_2RightScore', 0);
	Session.set('m8a2_2WrongScore', 0);


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


Template.m8a2_3.events({

	"click #m8a2restart": function (evt) {

		Session.set('m8a2_2RightScore', 0);
		Session.set('m8a2_2WrongScore', 0);
		Session.set("m8a2_2ExerciseIndex", 0);
		if (typeof $.k2l != 'undefined') {
			if (typeof $.k2l.m8a2_2 != 'undefined') {
				if (typeof $.k2l.m8a2_2.index != 'undefined') {
					$.k2l.m8a2_2.index = 0;
					$('#questions').html($.k2l.m8a2_2.questions[$.k2l.m8a2_2.index]);
				}
				if (typeof $.k2l.m8a2_2.rightscore != 'undefined') {
					$.k2l.m8a2_2.rightscore = 0;
				}
				if (typeof $.k2l.m8a2_2.wrongscore != 'undefined') {
					$.k2l.m8a2_2.wrongscore = 0;
				}
			}
		}
		$.k2l.m8a2_2.rightscore = 0;
		$.k2l.m8a2_2.wrongscore = 0;
		$.k2l.m8a2_2.index = 0;
		$('#questions').html($.k2l.m8a2_2.questions[$.k2l.m8a2_2.index]);
		// $('#m8a2_2RightScore').html(Session.get('m8a2_2RightScore'));
		// $('#m8a2_2WrongScore').html(Session.get('m8a2_2InRightScore'));
		forceReload();
		// $.k2l.m8a2_2.allowClick = true;
	}
});

Template.m8a2_4.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m8a2_4");
	}
})

Template.m8a2_4.events({

	'click .button1': function (evt) {
		audioButtonClickSetup($.k2l.m8a2_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a2_4.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m8a2_4.sound.src = {};
	}

});

Template.m8a2_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a2_4 == 'undefined') {
		$.k2l.m8a2_4 = {};
	};

	$.k2l.m8a2_4.sound = new Audio();
}

Template.m8a2_5.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m8a2_5");
	}
})

Template.m8a2_5.events({

	'click .button1': function (evt) {
		audioButtonClickSetup($.k2l.m8a2_5.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a2_5.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m8a2_5.sound.src = {};
	}

});

Template.m8a2_5.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a2_5 == 'undefined') {
		$.k2l.m8a2_5 = {};
	};

	$.k2l.m8a2_5.sound = new Audio();
}

Template.m8a2_6.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m8a2_6");
	}
})

Template.m8a2_6.events({

	'click .button1': function (evt) {
		audioButtonClickSetup($.k2l.m8a2_6.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m8a2_6.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m8a2_6.sound.src = {};
	}

});

Template.m8a2_6.rendered = function () {

	// 		document.title = "Journey 2 English";
	
	setStartActivity(8,2);

	// var oldLocation = location.href;
	// $.locationInterval = setInterval( function() {
	// 	if(location.href != oldLocation) {
	// 		subpage = location.href.split("#")[1];
	// 		setLatestSubPage(8, 2, subpage);
	// 		oldLocation = location.href;
	// 	}
	// }, 500);

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a2_6 == 'undefined') {
		$.k2l.m8a2_6 = {};
	};

	$.k2l.m8a2_6.sound = new Audio();
}


updateQNum = function (num) {
	$('.number').html(num);
}