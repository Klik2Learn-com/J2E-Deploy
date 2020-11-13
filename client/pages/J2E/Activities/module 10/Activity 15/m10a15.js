Template.m10a15.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m10a15_end') {
			return false;
		}
		return true;
	}
});


Template.m10a15.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 10, 15, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m10a15.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


Template.m10a15.events({

	'click .buttonsmall-icon': function (evt) {
		audioButtonClickSetup($.k2l.m10a15.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m10a15.sound, $(evt.currentTarget));
	},

	"click .true": function (evt) {
		if ($.k2l.m10a15.allowClick == true) {
			$.k2l.m10a15.allowClick = false;
			// if ($(evt.currentTarget).hasClass('true')){
			$.k2l.m10a15.counter++
			$(evt.currentTarget).addClass('faded');
			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
				$.k2l.m10a15.allowClick = true;
			}, 1000);
			if ($.k2l.m10a15.counter > 2) {
				$.k2l.m10a15.index++
				var parentSection = $(evt.currentTarget).parents('section');
				setTimeout(function () {
					$.k2l.m10a15.allowClick = true; // Make the buttons clickable again
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
				}, 2000);
			}

			// } else {

		}
	},

	"click .false": function (evt) {
		$('.incorrectscreen').removeClass('hidden');
		setTimeout(function () {
			$.k2l.m10a15.allowClick = true; // Make the buttons clickable again
			$('.incorrectscreen').addClass('hidden');
		}, 1000);
	},

	"click .button2": function (evt) {

		if ($.k2l.m10a15.allowClick == true) {
			$.k2l.m10a15.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m10a15.answer_index[$.k2l.m10a15.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m10a15.index++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout(function () {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
					$('.correctscreen').addClass('hidden');
				}, 1000);

				setTimeout(function () {
					if ($.k2l.m10a15.index > $.k2l.m10a15.answer_index.length) {
						$.k2l.m10a15.index = 0;
					}
					$.k2l.m10a15.sound.src = {};
					$.k2l.m10a15.allowClick = true; // Make the buttons clickable again
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
				}, 2000);
				// $('.pagination').removeClass('hidden');
			} else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$.k2l.m10a15.allowClick = true; // Make the buttons clickable again
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
			}
		}

	},

	'click .pagination': function (evt) {
		$.k2l.m10a15.index = 0;
		$.k2l.m10a15.allowClick = true;
		$.k2l.m10a15.sound.src = {};
	}
});

Template.m10a15.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m10a15 == 'undefined') {
		$.k2l.m10a15 = {};
	};

	var answer_index = ["2", "", "2", "1", "2", "2", "1", "1", "3", "1", "2", "1", "1", "2", "3", "1", "1", "2", "1", "1"];

	$.k2l.m10a15.answer_index = answer_index;
	$.k2l.m10a15.index = 0;
	$.k2l.m10a15.counter = 0;

	$.k2l.m10a15.allowClick = true;
	$.k2l.m10a15.sound = new Audio();

	document.title = "Journey 2 English";
	
	setStartActivity(10, 15);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(10, 15, subpage);
			oldLocation = location.href;
		}
	}, 500);
}
Template.m10a15_15.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a15_15");
	}
});

Template.m10a15_10.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a15_10");
	}
});


Template.m10a15_23.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a15_23");
	}
});

Template.m10a15_23.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m10a15_23.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m10a15_23.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m10a15_23.sound.src = {};
	}

});

Template.m10a15_23.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m10a15_23 == 'undefined') {
		$.k2l.m10a15_23 = {};
	};

	$.k2l.m10a15_23.sound = new Audio();
}


Template.m10a15_6.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a15_6");
	}
});

Template.m10a15_7.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a15_7");
	}
});

Template.m10a15_21.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a15_21");
	}
});

Template.m10a15_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a15_4");
	}
});

Template.m10a15_4.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m10a15_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m10a15_4.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m10a15_4.sound.src = {};
	}

});

Template.m10a15_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m10a15_4 == 'undefined') {
		$.k2l.m10a15_4 = {};
	};

	$.k2l.m10a15_4.sound = new Audio();
}

Template.m10a15_16.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a15_16");
	}
});

Template.m10a15_5.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a15_5");
	}
});


Template.m10a15_9.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a15_9");
	}
});



Template.m10a15_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a15_2");
	}
});


Template.m10a15_14.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a15_14");
	}
});


Template.m10a15_13.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a15_13");
	}
});


Template.m10a15_20.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a15_20");
	}
});


Template.m10a15_8.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a15_8");
	}
});


Template.m10a15_18.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a15_18");
	}
});


Template.m10a15_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a15_1");
	}
});

Template.m10a15_1.events({

	'click .button-icon': function (evt) {
		;
		audioButtonClickSetup($.k2l.m10a15_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m10a15_1.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m10a15_1.sound.src = {};
	}

});

Template.m10a15_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m10a15_1 == 'undefined') {
		$.k2l.m10a15_1 = {};
	};

	$.k2l.m10a15_1.sound = new Audio();
}

Template.m10a15_17.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a15_17");
	}
});


Template.m10a15_22.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a15_22");
	}
});


Template.m10a15_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a15_3");
	}
});


Template.m10a15_19.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a15_19");
	}
});


Template.m10a15_11.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a15_11");
	}
});


Template.m10a15_12.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a15_12");
	}
});
