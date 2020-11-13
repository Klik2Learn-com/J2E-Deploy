Template.m1a9.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m1a9_end') {
			return false;
		}
		return true;
	}
});

Template.m1a9.rendered = function () {
	setStartActivity(1, 9);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(1, 9, subpage);
			oldLocation = location.href;
		}
	}, 500);

    document.title = "Journey 2 English";

}

Template.m1a9.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 1, 9, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m1a9.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m1a9_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a9_3");
	}
});

Template.m1a9_3.events({

	"click .m1a9_product": function (evt) {
		evt.preventDefault();

		if ($.k2l.m1a9_3.allowClick == true) {
			$.k2l.m1a9_3.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m1a9_3.answer_index[$.k2l.m1a9_3.index]) {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m1a9_3.index++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout(function () {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				$('.buttonaudio').attr("data-audiosrc", $.k2l.m1a9_3.audio[$.k2l.m1a9_3.index]);
				
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
					$('.correctscreen').addClass('hidden');
				}, 1000);
				if ($.k2l.m1a9_3.index >= $.k2l.m1a9_3.answer_index.length) {
					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);
					setTimeout(function () {
						$.k2l.m1a9_3.index = 0;
						$('#welldonecap').addClass('hidden');
						$.k2l.m1a9_3.allowClick = true; // Make the buttons clickable again
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
					}, 2000);
				} else {
					$.k2l.m1a9_3.allowClick = true;
					// $('.numberBig').html($.k2l.m1a9_3.index+1);	
					setTimeout(function () {
						$.k2l.m1a9_3.sound.src = $('.buttonaudio').attr("data-audiosrc");
						$('.buttonaudio').addClass('is-playing');
						$.k2l.m1a9_3.sound.play();
					}, 800);

					$('.numberBig').html($.k2l.m1a9_3.index + 1);
					// $('.pagination').removeClass('hidden');
				}
			} else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$.k2l.m1a9_3.allowClick = true; // Make the buttons clickable again
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
			}
		}

	},

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m1a9_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m1a9_3.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {
		$.k2l.m1a9_3.sound.src = {};
		$.k2l.m1a9_3.index = 0;
		$.k2l.m1a9_3.allowClick = true;
	}

});

Template.m1a9_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a9_3 == 'undefined') {
		$.k2l.m1a9_3 = {};
	};

	var answer_index = ["calcu1", "dictionary1", "toaster1", "camera2", "mirror1", "microwave1", "phone1"];

	var audio = ["/audio/module1/a9/calculator2.m4a", "/audio/module1/a9/dictionary2.m4a", "/audio/module1/a9/toaster2.m4a", "/audio/module1/a9/camera2.m4a", "/audio/module1/a9/mirror2.m4a", "/audio/module1/a9/microwave2.m4a", "/audio/module1/a9/mobile2.m4a"]

	$.k2l.m1a9_3.answer_index = answer_index;
	$.k2l.m1a9_3.index = 0;
	$.k2l.m1a9_3.sound = new Audio();
	$.k2l.m1a9_3.audio = audio;

	$.k2l.m1a9_3.allowClick = true;
}

Template.m1a9_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a9_2");
	}
});

Template.m1a9_2.events({

	"click .m1a9_dept": function (evt) {
		evt.preventDefault();

		if ($.k2l.m1a9_2.allowClick == true) {
			$.k2l.m1a9_2.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m1a9_2.answer_index[$.k2l.m1a9_2.index]) {

				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m1a9_2.index++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout(function () {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				$('.buttonaudio').attr("data-audiosrc", $.k2l.m1a9_2.audio[$.k2l.m1a9_2.index]);
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
					$('.correctscreen').addClass('hidden');
				}, 1000);
				if ($.k2l.m1a9_2.index >= $.k2l.m1a9_2.answer_index.length) {
					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);
					setTimeout(function () {
						$.k2l.m1a9_2.index = 0;
						$('#welldonecap').addClass('hidden');
						$.k2l.m1a9_2.allowClick = true; // Make the buttons clickable again
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
					}, 2000);
				} else {
					$.k2l.m1a9_2.allowClick = true;
					// $('.numberBig').html($.k2l.m1a9_2.index+1);	
					setTimeout(function () {
						$.k2l.m1a9_2.sound.src = $('.buttonaudio').attr("data-audiosrc");
						$.k2l.m1a9_2.sound.play();
						$('.buttonaudio').addClass('is-playing');
					}, 800);

					$('.numberBig').html($.k2l.m1a9_2.index + 1);
					// $('.pagination').removeClass('hidden');
				}
			} else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$.k2l.m1a9_2.allowClick = true; // Make the buttons clickable again
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
			}
		}

	},

	"click .button2": function (evt) {
		evt.preventDefault();

		if ($.k2l.m1a9_2.allowClick == true) {
			$.k2l.m1a9_2.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m1a9_2.answer_index[$.k2l.m1a9_2.index]) {

				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m1a9_2.index++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout(function () {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				$('.buttonaudio').attr("data-audiosrc", $.k2l.m1a9_2.audio[$.k2l.m1a9_2.index]);
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
					$('.correctscreen').addClass('hidden');
				}, 1000);
				if ($.k2l.m1a9_2.index >= $.k2l.m1a9_2.answer_index.length) {
					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);
					setTimeout(function () {
						$.k2l.m1a9_2.index = 0;
						$('#welldonecap').addClass('hidden');
						$.k2l.m1a9_2.allowClick = true; // Make the buttons clickable again
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
					}, 2000);
				} else {
					$.k2l.m1a9_2.allowClick = true;
					// $('.numberBig').html($.k2l.m1a9_2.index+1);	
					setTimeout(function () {
						$.k2l.m1a9_2.sound.src = $('.buttonaudio').attr("data-audiosrc");
						$.k2l.m1a9_2.sound.play();
						$('.buttonaudio').addClass('is-playing');
					}, 800);

					$('.numberBig').html($.k2l.m1a9_2.index + 1);
					// $('.pagination').removeClass('hidden');
				}
			} else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$.k2l.m1a9_2.allowClick = true; // Make the buttons clickable again
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
			}
		}

	},

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m1a9_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m1a9_2.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {
		$.k2l.m1a9_2.sound.src = {};
		$.k2l.m1a9_2.index = 0;
		$.k2l.m1a9_2.allowClick = true;
	}

});

Template.m1a9_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a9_2 == 'undefined') {
		$.k2l.m1a9_2 = {};
	};

	var answer_index = ["4", "1", "6", "2", "5", "3"];

	var audio = ["/audio/module1/a9/camera.m4a", "/audio/module1/a9/mobile.m4a", "/audio/module1/a9/mirror.m4a", "/audio/module1/a9/toaster.m4a", "/audio/module1/a9/dictionary.m4a", "/audio/module1/a9/calculator.m4a",]

	$.k2l.m1a9_2.answer_index = answer_index;
	$.k2l.m1a9_2.index = 0;
	$.k2l.m1a9_2.sound = new Audio();
	$.k2l.m1a9_2.audio = audio;

	$.k2l.m1a9_2.allowClick = true;
}

Template.m1a9_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a9_1");
	}
});

Template.m1a9_1.events({

	"click .imghover": function (evt) {
		evt.preventDefault();

		if ($.k2l.m1a9_1.allowClick == true) {
			$.k2l.m1a9_1.allowClick = false;
			if ($(evt.currentTarget).attr('id') == $.k2l.m1a9_1.answer_index[$.k2l.m1a9_1.index]) {

				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m1a9_1.index++
				// Correct
				$('.correctscreen').removeClass('hidden');
				setTimeout(function () {
					$('.correctscreen').addClass('hidden');
				}, 1000);
				$('.buttonaudio').attr("data-audiosrc", $.k2l.m1a9_1.audio[$.k2l.m1a9_1.index]);
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
					$('.correctscreen').addClass('hidden');
				}, 1000);
				if ($.k2l.m1a9_1.index >= $.k2l.m1a9_1.answer_index.length) {
					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);
					setTimeout(function () {
						$.k2l.m1a9_1.index = 0;
						$('#welldonecap').addClass('hidden');
						$.k2l.m1a9_1.allowClick = true; // Make the buttons clickable again
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
					}, 2000);
				} else {
					$.k2l.m1a9_1.allowClick = true;
					// $('.numberBig').html($.k2l.m1a9_1.index+1);	
					setTimeout(function () {
						$.k2l.m1a9_1.sound.src = $('.buttonaudio').attr("data-audiosrc");
						$.k2l.m1a9_1.sound.play();
						$('.buttonaudio').addClass('is-playing');
					}, 800);

					$('.numberBig').html($.k2l.m1a9_1.index + 1);
					// $('.pagination').removeClass('hidden');
				}
			} else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$.k2l.m1a9_1.allowClick = true; // Make the buttons clickable again
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
			}
		}

	},

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m1a9_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m1a9_1.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {
		$.k2l.m1a9_1.sound.src = {};
		$.k2l.m1a9_1.index = 0;
		$.k2l.m1a9_1.allowClick = true;
	}

});

Template.m1a9_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a9_1 == 'undefined') {
		$.k2l.m1a9_1 = {};
	};

	var answer_index = ["5", "4", "6", "1", "7", "3", "2"];

	var audio = ["/audio/module1/a9/mobile.m4a", "/audio/module1/a9/toaster.m4a", "/audio/module1/a9/camera.m4a", "/audio/module1/a9/calculator.m4a", "/audio/module1/a9/dictionary.m4a", "/audio/module1/a9/mirror.m4a", "/audio/module1/a9/microwave.m4a",]

	$.k2l.m1a9_1.answer_index = answer_index;
	$.k2l.m1a9_1.index = 0;
	$.k2l.m1a9_1.sound = new Audio();
	$.k2l.m1a9_1.audio = audio;

	$.k2l.m1a9_1.allowClick = true;
}
