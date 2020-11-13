Template.m10a19.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m10a19_end') {
			return false;
		}
		return true;
	}
});

Template.m10a19.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(10, 19);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(10, 19, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m10a19.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 10, 19, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m10a19.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m10a19_6.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a19_6");
	}
});

Template.m10a19_6.events({

	"click .true": function (evt) {
		if ($.k2l.m10a19_6.allowClick == true) {
			$.k2l.m10a19_6.allowClick = false;
			$.k2l.m10a19_6.counter--;
			$(evt.currentTarget).addClass('faded');
			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
				$.k2l.m10a19_6.allowClick = true;
				$(".counterleft u").html($.k2l.m10a19_6.counter);
				if ($.k2l.m10a19_6.counter <= 0) {
					$('#audio').addClass('hidden');
					$('#text').removeClass('hidden');
					$('.pagination').removeClass('hidden');
					$.k2l.m10a19_6.allowClick = false;
				}
			}, 1000);

		}
	},

	"click .false": function (evt) {
		if ($.k2l.m10a19_6.allowClick == true) {
			$.k2l.m10a19_6.allowClick = false;
			$('.incorrectscreen').removeClass('hidden');
			setTimeout(function () {
				$.k2l.m10a19_6.allowClick = true; // Make the buttons clickable again
				$('.incorrectscreen').addClass('hidden');
				$.k2l.m10a19_6.allowClick = true;
			}, 1000);
		}
	},

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m10a19_6.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m10a19_6.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m10a19_6.sound.src = {};
		$.k2l.m10a19_6.allowClick = true;
	}

});

Template.m10a19_6.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m10a19_6 == 'undefined') {
		$.k2l.m10a19_6 = {};
	};

	$.k2l.m10a19_6.sound = new Audio();

	$.k2l.m10a19_6.counter = 4;
	$.k2l.m10a19_6.allowClick = true;
}

Template.m10a19_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a19_2");
	}
});

Template.m10a19_2.events({

	"click .true": function (evt) {
		if ($.k2l.m10a19_2.allowClick == true) {
			$.k2l.m10a19_2.allowClick = false;
			$.k2l.m10a19_2.counter--;
			$(evt.currentTarget).addClass('faded');
			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
				$.k2l.m10a19_2.allowClick = true;
				$(".counterleft u").html($.k2l.m10a19_2.counter);
				if ($.k2l.m10a19_2.counter <= 0) {
					$('#audio').addClass('hidden');
					$('#text').removeClass('hidden');
					$('.pagination').removeClass('hidden');
					$.k2l.m10a19_2.allowClick = false;
				}
			}, 1000);


			// 	$.k2l.m10a19_2.index++
			// 	var parentSection = $(evt.currentTarget).parents('section');
			// 	 setTimeout(function() {
			// 		$.k2l.m10a19_2.allowClick = true; // Make the buttons clickable again
			// 		$(parentSection).addClass('hidden'); // hide this page
			// 		$(parentSection).next('section').removeClass('hidden');// reveal next page.
			// 		document.location.hash = $(parentSection).next('section').attr('id');
			// 		Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
			// 	}, 2000);

		}
	},

	"click .false": function (evt) {
		if ($.k2l.m10a19_2.allowClick == true) {
			$.k2l.m10a19_2.allowClick = false;
			$('.incorrectscreen').removeClass('hidden');
			setTimeout(function () {
				$.k2l.m10a19_2.allowClick = true; // Make the buttons clickable again
				$('.incorrectscreen').addClass('hidden');
				$.k2l.m10a19_2.allowClick = true;
			}, 1000);
		}
	},

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m10a19_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m10a19_2.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m10a19_2.sound.src = {};
		$.k2l.m10a19_2.allowClick = true;
	}

});

Template.m10a19_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m10a19_2 == 'undefined') {
		$.k2l.m10a19_2 = {};
	};

	$.k2l.m10a19_2.sound = new Audio();

	$.k2l.m10a19_2.counter = 3;
	$.k2l.m10a19_2.allowClick = true;
}

Template.m10a19_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a19_3");
	}
});

Template.m10a19_3.events({

	"click .true": function (evt) {
		if ($.k2l.m10a19_3.allowClick == true) {
			$.k2l.m10a19_3.allowClick = false;
			$.k2l.m10a19_3.counter--;
			$(evt.currentTarget).addClass('faded');
			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
				$.k2l.m10a19_3.allowClick = true;
				$(".counterleft u").html($.k2l.m10a19_3.counter);
				if ($.k2l.m10a19_3.counter <= 0) {
					$('#audio').addClass('hidden');
					$('#text').removeClass('hidden');
					$('.pagination').removeClass('hidden');
					$.k2l.m10a19_3.allowClick = false;
				}
			}, 1000);

		}
	},

	"click .false": function (evt) {
		if ($.k2l.m10a19_3.allowClick == true) {
			$.k2l.m10a19_3.allowClick = false;
			$('.incorrectscreen').removeClass('hidden');
			setTimeout(function () {
				$.k2l.m10a19_3.allowClick = true; // Make the buttons clickable again
				$('.incorrectscreen').addClass('hidden');
				$.k2l.m10a19_3.allowClick = true;
			}, 1000);
		}
	},

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m10a19_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m10a19_3.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m10a19_3.sound.src = {};
		$.k2l.m10a19_3.allowClick = true;
	}

});

Template.m10a19_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m10a19_3 == 'undefined') {
		$.k2l.m10a19_3 = {};
	};

	$.k2l.m10a19_3.sound = new Audio();

	$.k2l.m10a19_3.counter = 2;
	$.k2l.m10a19_3.allowClick = true;
}

Template.m10a19_5.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a19_5");
	}
});

Template.m10a19_5.events({

	"click .true": function (evt) {
		if ($.k2l.m10a19_5.allowClick == true) {
			$.k2l.m10a19_5.allowClick = false;
			$.k2l.m10a19_5.counter--;
			$(evt.currentTarget).addClass('faded');
			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
				$.k2l.m10a19_5.allowClick = true;
				$(".counterleft u").html($.k2l.m10a19_5.counter);
				if ($.k2l.m10a19_5.counter <= 0) {
					$('#audio').addClass('hidden');
					$('#text').removeClass('hidden');
					$('.pagination').removeClass('hidden');
					$.k2l.m10a19_5.allowClick = false;
				}
			}, 1000);

		}
	},

	"click .false": function (evt) {
		if ($.k2l.m10a19_5.allowClick == true) {
			$.k2l.m10a19_5.allowClick = false;
			$('.incorrectscreen').removeClass('hidden');
			setTimeout(function () {
				$.k2l.m10a19_5.allowClick = true; // Make the buttons clickable again
				$('.incorrectscreen').addClass('hidden');
				$.k2l.m10a19_5.allowClick = true;
			}, 1000);
		}
	},

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m10a19_5.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m10a19_5.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m10a19_5.sound.src = {};
		$.k2l.m10a19_5.allowClick = true;
	}

});

Template.m10a19_5.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m10a19_5 == 'undefined') {
		$.k2l.m10a19_5 = {};
	};

	$.k2l.m10a19_5.sound = new Audio();

	$.k2l.m10a19_5.counter = 4;
	$.k2l.m10a19_5.allowClick = true;
}

Template.m10a19_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m10a19_4");
	}
});

Template.m10a19_4.events({

	"click .true": function (evt) {
		if ($.k2l.m10a19_4.allowClick == true) {
			$.k2l.m10a19_4.allowClick = false;
			$.k2l.m10a19_4.counter--;
			$(evt.currentTarget).addClass('faded');
			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
				$.k2l.m10a19_4.allowClick = true;
				$(".counterleft u").html($.k2l.m10a19_4.counter);
				if ($.k2l.m10a19_4.counter <= 0) {
					$('#audio').addClass('hidden');
					$('#text').removeClass('hidden');
					$('.pagination').removeClass('hidden');
					$.k2l.m10a19_4.allowClick = false;
				}
			}, 1000);

		}
	},

	"click .false": function (evt) {
		if ($.k2l.m10a19_4.allowClick == true) {
			$.k2l.m10a19_4.allowClick = false;
			$('.incorrectscreen').removeClass('hidden');
			setTimeout(function () {
				$.k2l.m10a19_4.allowClick = true; // Make the buttons clickable again
				$('.incorrectscreen').addClass('hidden');
				$.k2l.m10a19_4.allowClick = true;
			}, 1000);
		}
	},

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m10a19_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m10a19_4.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m10a19_4.sound.src = {};
		$.k2l.m10a19_4.allowClick = true;
	}

});

Template.m10a19_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m10a19_4 == 'undefined') {
		$.k2l.m10a19_4 = {};
	};

	$.k2l.m10a19_4.sound = new Audio();

	$.k2l.m10a19_4.counter = 5;
	$.k2l.m10a19_4.allowClick = true;
}
