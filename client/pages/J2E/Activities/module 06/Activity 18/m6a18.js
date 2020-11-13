Template.m6a18.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m6a18_end') {
			return false;
		}
		return true;
	}
});

Template.m6a18.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(6, 18);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(6, 18, subpage);
			oldLocation = location.href;
		}
	}, 500);

	$('#m6a18_4_modal').on("hidden.bs.modal", function (event) {
		var stopVideo = function (element) {
			var iframe = element.querySelector('iframe');
			if (iframe) {
				var iframeSrc = iframe.src;
				iframe.src = iframeSrc;
			}
		};

		if (event.target == this || event.target.id == "modalButton") {
			stopVideo(this);
		}
	})

}


Template.m6a18.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 6, 18, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m6a18.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m6a18_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a18_1");
	}
});


Template.m6a18_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a18_2");
	}
});


Template.m6a18_3.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m6a18_3");
	}
});

Template.m6a18_3.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m6a18_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m6a18_3.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m6a18_3.sound.src = {};
	},

	'click #m6a18_3 .button2': function (evt) {
		var buttonValue = $(evt.currentTarget).text();
		var correctAnswer = $.k2l.m6a18_3.correctAnswers[$.k2l.m6a18_3.index];
		$("#m6a18_3 .button2").addClass('noclick');

		if (buttonValue == correctAnswer) {
			$('.correctscreen').removeClass("hidden");
			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
			}, 1000);

			$.k2l.m6a18_3.index++;

			if ($.k2l.m6a18_3.index >= $.k2l.m6a18_3.sentences.length) {
				$.k2l.m6a18_3.sound.src = {};
				setTimeout(function () {
					var parentSection = $(evt.currentTarget).parents('section');

					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
				}, 1000);
			} else {
				$('.number').html($.k2l.m6a18_3.index + 1);
				$('#question_text').html($.k2l.m6a18_3.sentences[$.k2l.m6a18_3.index]);
				$("#questions_audio").attr("data-audiosrc", $.k2l.m6a18_3.questionsAudio[$.k2l.m6a18_3.index]);
				setTimeout(function () {
					$.k2l.m6a18_3.sound.src = $("#questions_audio").attr("data-audiosrc");
					audioButtonClickSetup($.k2l.m6a18_3.sound, $("#questions_audio"));
					playPauseAudio($.k2l.m6a18_3.sound, $("#questions_audio"));
				}, 800);
			}



		} else {

			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");

			}, 1000);
		}

		$("#m6a18_3 .button2").removeClass('noclick');
	}


});

Template.m6a18_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m6a18_3 == 'undefined') {
		$.k2l.m6a18_3 = {};
	};

	$.k2l.m6a18_3.sound = new Audio();

	var correctAnswers = [
		"Getting ready for work",
		"Marriage for all",
		"Public Transport",
		"Public Transport",
		"A curriculum to prepare for life",
		"Equal National Minimum Wage",
		"Getting ready for work",
		"Getting ready for work",
		"A curriculum to prepare for life",
		"Public Transport",
		"Marriage for all",
		"Equal National Minimum Wage",
		"A curriculum to prepare for life",
		"Public Transport",
		"Marriage for all",
		"Equal National Minimum Wage"];

	var questionsAudio = ["audio/module6/a18/1.m4a",
		"audio/module6/a18/2.m4a",
		"audio/module6/a18/3.m4a",
		"audio/module6/a18/4.m4a",
		"audio/module6/a18/5.m4a",
		"audio/module6/a18/6.m4a",
		"audio/module6/a18/7.m4a",
		"audio/module6/a18/8.m4a",
		"audio/module6/a18/9.m4a",
		"audio/module6/a18/10.m4a",
		"audio/module6/a18/11.m4a",
		"audio/module6/a18/12.m4a",
		"audio/module6/a18/13.m4a",
		"audio/module6/a18/14.m4a",
		"audio/module6/a18/15.m4a",
		"audio/module6/a18/16.m4a",]
	var sentences = ["Sentence 1", "Sentence 2", "Sentence 3", "Sentence 4", "Sentence 5", "Sentence 6", "Sentence 7", "Sentence 8", "Sentence 9", "Sentence 10", "Sentence 11", "Sentence 12", "Sentence 13", "Sentence 14", "Sentence 15", "Sentence 16"];

	$.k2l.m6a18_3.correctAnswers = correctAnswers;
	$.k2l.m6a18_3.sentences = sentences;
	$.k2l.m6a18_3.questionsAudio = questionsAudio;

	$.k2l.m6a18_3.index = 0;
}

Template.m6a18_4.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m6a18_4";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}


Template.m6a18_5.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a18_5");
	}
});

Template.m6a18_5.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m6a18_5.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m6a18_5.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m6a18_5.sound.src = {};
	}

});

Template.m6a18_5.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m6a18_5 == 'undefined') {
		$.k2l.m6a18_5 = {};
	};

	$.k2l.m6a18_5.sound = new Audio();
}
