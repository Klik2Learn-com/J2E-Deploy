
Template.m3a1.events({

	"click .parapaper .row .button1": function (evt) {

		if ($.k2l.m3a1.allowClick) {
			$.k2l.m3a1.allowClick = false;

			if ($(evt.currentTarget).attr('id') == $.k2l.m3a1.answers[$.k2l.m3a1.index]) {
				//correct answers
				$.k2l.m3a1.rightscore++;
				$('.correctscreen').removeClass('hidden');
				setTimeout(function () {
					$('.correctscreen').addClass('hidden');
				}, 1000);
			} else {
				// incorrect answers
				$.k2l.m3a1.wrongscore++;
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
			}
			if ($.k2l.m3a1.index < $.k2l.m3a1.answers.length - 1) {
				// Load the next section
				setTimeout(function () {
					$(evt.currentTarget).parents('section').addClass('hidden'); // hide this page
					$(evt.currentTarget).parents('section').next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(evt.currentTarget).parents('section').next('section').attr('id');
					Session.set('activeSection', '#' + $(evt.currentTarget).parents('section').next('section').attr('id'));
					$.k2l.m3a1.allowClick = true;
				}, 500);
			} else {
				$.k2l.m3a1.allowClick = true;
				// show either good or bad page
				if ($.k2l.m3a1.rightscore >= 4) {
					setTimeout(function () {
						$(evt.currentTarget).parents('section').addClass('hidden'); // hide this page
						$('#m3a1_good').removeClass('hidden');
						//document.location.hash = 'm3a1_good';
						Session.set('activeSection', '#m3a1_good');
					}, 500);
				} else {
					setTimeout(function () {
						$(evt.currentTarget).parents('section').addClass('hidden'); // hide this page
						$('#m3a1_bad').removeClass('hidden');
						document.location.hash = 'm3a1_bad';
						Session.set('activeSection', '#m3a1_bad');
					}, 500);
				}
			}
		}
		$.k2l.m3a1.index++;
		Session.set("m3a1_wrongScore", $.k2l.m3a1.wrongscore);
		Session.set("m3a1_rightScore", $.k2l.m3a1.rightscore);
	},

	'click a[data-function="restart"]': function (evt) {
		evt.preventDefault();
		$.k2l.m3a1.index = 0;
		$.k2l.m3a1.rightscore = 0;
		$.k2l.m3a1.wrongscore = 0;
		$.k2l.m3a1.allowClick = true;

		Session.set("activeSection", "#m3a1");
		Session.set("m3a1_rightScore", $.k2l.m3a1.rightscore);
		Session.set("m3a1_wrongScore", $.k2l.m3a1.wrongscore);
		//document.location.hash = 'm3a1_1';
		//$("#m3a1_bad").addClass('hidden');
		$("#m3a1").removeClass('hidden');
		forceReload();
	}

});

Template.m3a1.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(3, 1);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(3, 1, subpage);
			oldLocation = location.href;
		}
	}, 500);

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	}

	if (typeof $.k2l.m3a1 == 'undefined') {
		$.k2l.m3a1 = {};
	};

	$.k2l.m3a1.index = 0;
	$.k2l.m3a1.rightscore = 0;
	$.k2l.m3a1.wrongscore = 0;
	$.k2l.m3a1.allowClick = true;
	$.k2l.m3a1.answers = ["2", "1", "3", "1", "2"];

}

Template.m3a1.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 3, 1, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m3a1.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};



Template.m3a1.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m3a1_end') {
			return false;
		} return true;
	}
});


Template.m3a1_3.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a1_3");
	}
})

Template.m3a1_3.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m3a1_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a1_3.sound, $(evt.currentTarget));
	},

	'click .button1': function (evt) {

		$.k2l.m3a1_3.sound.src = {};
	}

});

Template.m3a1_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a1_3 == 'undefined') {
		$.k2l.m3a1_3 = {};
	};

	$.k2l.m3a1_3.sound = new Audio();
}

Template.m3a1_good.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a1_good");
	}

});

Template.m3a1_good.events({

})


Template.m3a1_6.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a1_6");
	}
})

Template.m3a1_6.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m3a1_6.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a1_6.sound, $(evt.currentTarget));
	},

	'click .button1': function (evt) {

		$.k2l.m3a1_6.sound.src = {};
	}

});

Template.m3a1_6.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a1_6 == 'undefined') {
		$.k2l.m3a1_6 = {};
	};

	$.k2l.m3a1_6.sound = new Audio();
}

Template.m3a1_bad.helpers({

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m3a1_bad");
	}

});

Template.m3a1_bad.events({

	"click .reTry": function (evt) {
		evt.preventDefault();
		$.k2l.m3a1.index = 0;
		$.k2l.m3a1.rightscore = 0;
		$.k2l.m3a1.wrongscore = 0;
		$.k2l.m3a1.allowClick = true;

		// Session.set("activeSection", "#m3a1_1");
		Session.set("m3a1_rightScore", $.k2l.m3a1.rightscore);
		Session.set("m3a1_wrongScore", $.k2l.m3a1.wrongscore);
		//document.location.hash = 'm3a1_1';
		$("#m3a1_bad").addClass('hidden');
		$("#m3a1_1").removeClass('hidden');
		forceReload();

	}
});


Template.m3a1_5.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a1_5");
	}
})

Template.m3a1_5.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m3a1_5.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a1_5.sound, $(evt.currentTarget));
	},

	'click .button1': function (evt) {

		$.k2l.m3a1_5.sound.src = {};
	}

});

Template.m3a1_5.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a1_5 == 'undefined') {
		$.k2l.m3a1_5 = {};
	};

	$.k2l.m3a1_5.sound = new Audio();
}

Template.m3a1_1.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a1_1");
	}
})

Template.m3a1_1.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m3a1_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a1_1.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m3a1_1.sound.src = {};
	}

});

Template.m3a1_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a1_1 == 'undefined') {
		$.k2l.m3a1_1 = {};
	};

	$.k2l.m3a1_1.sound = new Audio();
}

Template.m3a1_2.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a1_2");
	}
})

Template.m3a1_2.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m3a1_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a1_2.sound, $(evt.currentTarget));
	},

	'click .button1': function (evt) {

		$.k2l.m3a1_2.sound.src = {};
	}

});

Template.m3a1_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a1_2 == 'undefined') {
		$.k2l.m3a1_2 = {};
	};

	$.k2l.m3a1_2.sound = new Audio();
}

Template.m3a1_4.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a1_4");
	}
})

Template.m3a1_4.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m3a1_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a1_4.sound, $(evt.currentTarget));
	},

	'click .button1': function (evt) {

		$.k2l.m3a1_4.sound.src = {};
	}

});

Template.m3a1_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a1_4 == 'undefined') {
		$.k2l.m3a1_4 = {};
	};

	$.k2l.m3a1_4.sound = new Audio();
}
