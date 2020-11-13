Template.m4a14.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m4a14_end') {
			return false;
		}
		return true;
	},

	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m4a14");
	}
})

Template.m4a14.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m4a14.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m4a14.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m4a14.sound.src = {};
	}

});

Template.m4a14.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(4, 14);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 14, subpage);
			oldLocation = location.href;
		}
	}, 500);


	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a14 == 'undefined') {
		$.k2l.m4a14 = {};
	};

	$.k2l.m4a14.sound = new Audio();


	var correctAnswers = ["To contradict",
		"To clarify",
		"To contradict",
		"To emphasise",
		"To clarify",
		"To contradict",
		"To emphasise"
	];


	var correctWordAnswers = ["awful",
		"dinner",
		"red",
		"delighted",
		"sure",
		"that",
		"very"
	];

	$.k2l.m4a14.index = 0;
	$.k2l.m4a14.index2 = 0;

	$.k2l.m4a14.correctAnswers = correctAnswers;
	$.k2l.m4a14.correctWordAnswers = correctWordAnswers;

	$.k2l.m4a14.questionWordLock = false; //variable to prevent multiple clicks of button


};

Template.m4a14.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 14, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a14.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m4a14_10.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a14_10");
	}
});

Template.m4a14_10.events({

	'click #m4a14_10 .button1': function (evt) {
		var buttonValue = $(evt.currentTarget).text();
		var correctAnswer = $.k2l.m4a14.correctAnswers[$.k2l.m4a14.index];

		if ((buttonValue == correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$("#m4a14_10 .button1").addClass('noclick');
			$('.correctscreen').removeClass("hidden");

			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m4a14.index++;

			if ($.k2l.m4a14.index >= $.k2l.m4a14.correctAnswers.length) {
				$.k2l.m4a14.index = 0;
			}

			setTimeout(function () {
				$.k2l.m4a14.sound.src = {};
				var parentSection = $(evt.currentTarget).parents('section');
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
			}, 2000);

		}
		else if ((buttonValue != correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
		}
		setTimeout(function () {
			$.k2l.m4a14.questionWordLock = false;
		}, 1000);

	}
});

Template.m4a14_11.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a14_11");
	}
});

Template.m4a14_11.events({

	'click #m4a14_11 .clk-word': function (evt) {
		var buttonValue = $(evt.currentTarget).text();
		var correctAnswer = $.k2l.m4a14.correctWordAnswers[$.k2l.m4a14.index2];

		if ((buttonValue == correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$("#m4a14_11 .clk-word").addClass('noclick');
			$('.correctscreen').removeClass("hidden");

			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m4a14.index2++;

			if ($.k2l.m4a14.index2 >= $.k2l.m4a14.correctWordAnswers.length) {
				$.k2l.m4a14.index2 = 0;
			}

			setTimeout(function () {
				$.k2l.m4a14.sound.src = {};
				var parentSection = $(evt.currentTarget).parents('section');
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
			}, 2000);

		}
		else if ((buttonValue != correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
		}
		setTimeout(function () {
			$.k2l.m4a14.questionWordLock = false;
		}, 1000);

	}
});

Template.m4a14_12.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a14_12");
	}
});

Template.m4a14_12.events({

	'click #m4a14_12 .button1': function (evt) {
		var buttonValue = $(evt.currentTarget).text();
		var correctAnswer = $.k2l.m4a14.correctAnswers[$.k2l.m4a14.index];

		if ((buttonValue == correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$("#m4a14_12 .button1").addClass('noclick');
			$('.correctscreen').removeClass("hidden");

			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m4a14.index++;

			if ($.k2l.m4a14.index >= $.k2l.m4a14.correctAnswers.length) {
				$.k2l.m4a14.index = 0;
			}

			setTimeout(function () {
				$.k2l.m4a14.sound.src = {};
				var parentSection = $(evt.currentTarget).parents('section');
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
			}, 2000);

		}
		else if ((buttonValue != correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
		}
		setTimeout(function () {
			$.k2l.m4a14.questionWordLock = false;
		}, 1000);

	}
});

Template.m4a14_13.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a14_13");
	}
});

Template.m4a14_13.events({

	'click #m4a14_13 .clk-word': function (evt) {
		var buttonValue = $(evt.currentTarget).text();
		var correctAnswer = $.k2l.m4a14.correctWordAnswers[$.k2l.m4a14.index2];

		if ((buttonValue == correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$("#m4a14_13 .clk-word").addClass('noclick');
			$('.correctscreen').removeClass("hidden");

			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m4a14.index2++;

			if ($.k2l.m4a14.index2 >= $.k2l.m4a14.correctWordAnswers.length) {
				$.k2l.m4a14.index2 = 0;
			}

			setTimeout(function () {
				$.k2l.m4a14.sound.src = {};
				var parentSection = $(evt.currentTarget).parents('section');
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
			}, 2000);

		}
		else if ((buttonValue != correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
		}
		setTimeout(function () {
			$.k2l.m4a14.questionWordLock = false;
		}, 1000);

	}
});

Template.m4a14_14.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a14_14");
	}
});

Template.m4a14_14.events({

	'click #m4a14_14 .button1': function (evt) {
		var buttonValue = $(evt.currentTarget).text();
		var correctAnswer = $.k2l.m4a14.correctAnswers[$.k2l.m4a14.index];

		if ((buttonValue == correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$("#m4a14_14 .button1").addClass('noclick');
			$('.correctscreen').removeClass("hidden");

			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m4a14.index++;

			if ($.k2l.m4a14.index >= $.k2l.m4a14.correctAnswers.length) {
				$.k2l.m4a14.index = 0;
			}

			setTimeout(function () {
				$.k2l.m4a14.sound.src = {};
				var parentSection = $(evt.currentTarget).parents('section');
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
			}, 2000);

		}
		else if ((buttonValue != correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
		}
		setTimeout(function () {
			$.k2l.m4a14.questionWordLock = false;
		}, 1000);

	}
});

Template.m4a14_15.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a14_15");
	}
});

Template.m4a14_15.events({

	'click #m4a14_15 .clk-word': function (evt) {
		var buttonValue = $(evt.currentTarget).text();
		var correctAnswer = $.k2l.m4a14.correctWordAnswers[$.k2l.m4a14.index2];

		if ((buttonValue == correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$("#m4a14_15 .clk-word").addClass('noclick');
			$('.correctscreen').removeClass("hidden");

			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m4a14.index2++;

			if ($.k2l.m4a14.index2 >= $.k2l.m4a14.correctWordAnswers.length) {
				$.k2l.m4a14.index2 = 0;
			}

			setTimeout(function () {
				$.k2l.m4a14.sound.src = {};
				var parentSection = $(evt.currentTarget).parents('section');
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
			}, 2000);

		}
		else if ((buttonValue != correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
		}
		setTimeout(function () {
			$.k2l.m4a14.questionWordLock = false;
		}, 1000);

	}
});

Template.m4a14_16.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a14_16");
	}
});

Template.m4a14_16.events({

	'click #m4a14_16 .button1': function (evt) {
		var buttonValue = $(evt.currentTarget).text();
		var correctAnswer = $.k2l.m4a14.correctAnswers[$.k2l.m4a14.index];

		if ((buttonValue == correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$("#m4a14_16 .button1").addClass('noclick');
			$('.correctscreen').removeClass("hidden");

			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m4a14.index++;

			if ($.k2l.m4a14.index >= $.k2l.m4a14.correctAnswers.length) {
				$.k2l.m4a14.index = 0;
			}

			setTimeout(function () {
				$.k2l.m4a14.sound.src = {};
				var parentSection = $(evt.currentTarget).parents('section');
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
			}, 2000);

		}
		else if ((buttonValue != correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
		}
		setTimeout(function () {
			$.k2l.m4a14.questionWordLock = false;
		}, 1000);

	}
});

Template.m4a14_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a14_3");
	}
});

Template.m4a14_3.events({

	'click #m4a14_3 .clk-word': function (evt) {
		var buttonValue = $(evt.currentTarget).text();
		var correctAnswer = $.k2l.m4a14.correctWordAnswers[$.k2l.m4a14.index2];

		if ((buttonValue == correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$("#m4a14_3 .clk-word").addClass('noclick');
			$('.correctscreen').removeClass("hidden");

			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m4a14.index2++;

			if ($.k2l.m4a14.index2 >= $.k2l.m4a14.correctWordAnswers.length) {
				$.k2l.m4a14.index2 = 0;
			}

			setTimeout(function () {
				$.k2l.m4a14.sound.src = {};
				var parentSection = $(evt.currentTarget).parents('section');
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
			}, 2000);

		}
		else if ((buttonValue != correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
		}
		setTimeout(function () {
			$.k2l.m4a14.questionWordLock = false;
		}, 1000);

	}
});

Template.m4a14_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a14_4");
	}
});

Template.m4a14_4.events({

	'click #m4a14_4 .button1': function (evt) {
		var buttonValue = $(evt.currentTarget).text();
		var correctAnswer = $.k2l.m4a14.correctAnswers[$.k2l.m4a14.index];

		if ((buttonValue == correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$("#m4a14_4 .button1").addClass('noclick');
			$('.correctscreen').removeClass("hidden");

			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m4a14.index++;

			if ($.k2l.m4a14.index >= $.k2l.m4a14.correctAnswers.length) {
				$.k2l.m4a14.index = 0;
			}

			setTimeout(function () {
				$.k2l.m4a14.sound.src = {};
				var parentSection = $(evt.currentTarget).parents('section');
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
			}, 2000);

		}
		else if ((buttonValue != correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
		}
		setTimeout(function () {
			$.k2l.m4a14.questionWordLock = false;
		}, 1000);

	}
});

Template.m4a14_5.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a14_5");
	}
});

Template.m4a14_5.events({

	'click #m4a14_5 .clk-word': function (evt) {
		var buttonValue = $(evt.currentTarget).text();
		var correctAnswer = $.k2l.m4a14.correctWordAnswers[$.k2l.m4a14.index2];

		if ((buttonValue == correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$("#m4a14_5 .clk-word").addClass('noclick');
			$('.correctscreen').removeClass("hidden");

			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m4a14.index2++;

			if ($.k2l.m4a14.index2 >= $.k2l.m4a14.correctWordAnswers.length) {
				$.k2l.m4a14.index2 = 0;
			}

			setTimeout(function () {
				$.k2l.m4a14.sound.src = {};
				var parentSection = $(evt.currentTarget).parents('section');
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
			}, 2000);

		}
		else if ((buttonValue != correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
		}
		setTimeout(function () {
			$.k2l.m4a14.questionWordLock = false;
		}, 1000);

	}
});

Template.m4a14_6.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a14_6");
	}
});

Template.m4a14_6.events({

	'click #m4a14_6 .button1': function (evt) {
		var buttonValue = $(evt.currentTarget).text();
		var correctAnswer = $.k2l.m4a14.correctAnswers[$.k2l.m4a14.index];

		if ((buttonValue == correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$("#m4a14_6 .button1").addClass('noclick');
			$('.correctscreen').removeClass("hidden");

			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m4a14.index++;

			if ($.k2l.m4a14.index >= $.k2l.m4a14.correctAnswers.length) {
				$.k2l.m4a14.index = 0;
			}

			setTimeout(function () {
				$.k2l.m4a14.sound.src = {};
				var parentSection = $(evt.currentTarget).parents('section');
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
			}, 2000);

		}
		else if ((buttonValue != correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
		}
		setTimeout(function () {
			$.k2l.m4a14.questionWordLock = false;
		}, 1000);

	}
});

Template.m4a14_7.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a14_7");
	}
});

Template.m4a14_7.events({

	'click #m4a14_7 .clk-word': function (evt) {
		var buttonValue = $(evt.currentTarget).text();
		var correctAnswer = $.k2l.m4a14.correctWordAnswers[$.k2l.m4a14.index2];

		if ((buttonValue == correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$("#m4a14_7 .clk-word").addClass('noclick');
			$('.correctscreen').removeClass("hidden");

			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m4a14.index2++;

			if ($.k2l.m4a14.index2 >= $.k2l.m4a14.correctWordAnswers.length) {
				$.k2l.m4a14.index2 = 0;
			}

			setTimeout(function () {
				$.k2l.m4a14.sound.src = {};
				var parentSection = $(evt.currentTarget).parents('section');
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
			}, 2000);

		}
		else if ((buttonValue != correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
		}
		setTimeout(function () {
			$.k2l.m4a14.questionWordLock = false;
		}, 1000);

	}
});

Template.m4a14_8.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a14_8");
	}
});

Template.m4a14_8.events({

	'click #m4a14_8 .button1': function (evt) {
		var buttonValue = $(evt.currentTarget).text();
		var correctAnswer = $.k2l.m4a14.correctAnswers[$.k2l.m4a14.index];

		if ((buttonValue == correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$("#m4a14_8 .button1").addClass('noclick');
			$('.correctscreen').removeClass("hidden");

			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m4a14.index++;

			if ($.k2l.m4a14.index >= $.k2l.m4a14.correctAnswers.length) {
				$.k2l.m4a14.index = 0;
			}

			setTimeout(function () {
				$.k2l.m4a14.sound.src = {};
				var parentSection = $(evt.currentTarget).parents('section');
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
			}, 2000);

		}
		else if ((buttonValue != correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
		}
		setTimeout(function () {
			$.k2l.m4a14.questionWordLock = false;
		}, 1000);

	}
});

Template.m4a14_9.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m4a14_9");
	}
});

Template.m4a14_9.events({

	'click #m4a14_9 .clk-word': function (evt) {
		var buttonValue = $(evt.currentTarget).text();
		var correctAnswer = $.k2l.m4a14.correctWordAnswers[$.k2l.m4a14.index2];

		if ((buttonValue == correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$("#m4a14_9 .clk-word").addClass('noclick');
			$('.correctscreen').removeClass("hidden");

			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m4a14.index2++;

			if ($.k2l.m4a14.index2 >= $.k2l.m4a14.correctWordAnswers.length) {
				$.k2l.m4a14.index2 = 0;
			}

			setTimeout(function () {
				$.k2l.m4a14.sound.src = {};
				var parentSection = $(evt.currentTarget).parents('section');
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
			}, 2000);

		}
		else if ((buttonValue != correctAnswer) && $.k2l.m4a14.questionWordLock == false) {
			$.k2l.m4a14.questionWordLock = true;
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
		}
		setTimeout(function () {
			$.k2l.m4a14.questionWordLock = false;
		}, 1000);

	}
});
