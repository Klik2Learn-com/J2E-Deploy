Template.m4a11.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m4a11_end') {
			return false;
		}
		return true;
	},

	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m4a11");
	}
})

Template.m4a11.events({

});

Template.m4a11.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(4, 11);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(4, 11, subpage);
			oldLocation = location.href;
		}
	}, 500);


	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a11 == 'undefined') {
		$.k2l.m4a11 = {};
	};

	$.k2l.m4a11.sound = new Audio();
}


Template.m4a11.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 4, 11, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m4a11.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m4a11_1.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m4a11_1");
	}
});

Template.m4a11_1.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m4a11_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m4a11_1.sound, $(evt.currentTarget));
	},

	// 'click .pagination': function(evt) {
	// 
	// $.k2l.m4a11_1.index = 0;
	// $.k2l.m4a11_1.sound.src = {};
	// },
	/* 	'click #m4a11_1nextQuestion': function(evt) {
			if ($.k2l.m4a11_1.index >= $.k2l.m4a11_1.correctAnswers.length){
				$.k2l.m4a11_1.index = 0;
				$.k2l.m4a11_1.sound.src = {};
				var parentSection = $(evt.currentTarget).parents('section');
				$(parentSection).addClass('hidden'); // hide this page
				$(parentSection).next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(parentSection).next('section').attr('id');
				Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
			}
			$('#m4a11_1nextQuestion').addClass("hidden ");
			$("#m4a11_1 .caption").html("Report " + ($.k2l.m4a11_1.index + 1));
			$("#m4a11_1 .m4a11-pic").removeClass('noclick');
			$(".buttonaudio").attr("data-audiosrc", "/audio/module4/a11/report"+ ($.k2l.m4a11_1.index + 1) +".m4a");
		}, */

	"click #m4a11_1 .m4a11-pic": function (evt) {
		var buttonValue = $(evt.currentTarget).attr('id');
		var correctAnswer = $.k2l.m4a11_1.correctAnswers[$.k2l.m4a11_1.index];

		if ((buttonValue == correctAnswer) && $.k2l.m4a11_1.questionWordLock == false) {
			$.k2l.m4a11_1.questionWordLock = true;
			$("#m4a11_1 .m4a11-pic").addClass('noclick');
			$('.correctscreen').removeClass("hidden");
			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
				$("#m4a11_1 .m4a11-pic").removeClass('noclick');
			}, 1000);
			$.k2l.m4a11_1.index++;
			$("#m4a11_1 #report").html("Report " + ($.k2l.m4a11_1.index + 1));

			if ($.k2l.m4a11_1.index >= $.k2l.m4a11_1.correctAnswers.length) {
				$("#m4a11_1 #report").html("Report 10");
				setTimeout(function () {
					$('#m4a11_1 #welldonecap').removeClass('hidden');
				}, 1000);
				setTimeout(function () {
					$('#m4a11_1 #welldonecap').addClass('hidden');
				}, 2000);
				setTimeout(function () {
					$.k2l.m4a11_1.index = 0;
					$.k2l.m4a11_1.sound.src = {};
					var parentSection = $(evt.currentTarget).parents('section');
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
				}, 2000);

			} else {
				audioButtonClickSetup($.k2l.m4a11_1.sound, $(evt.currentTarget));
				playPauseAudio($.k2l.m4a11_1.sound, $(evt.currentTarget));
				setTimeout(function(){
					$("#m4a11_1 .m4a11-pic").removeClass('noclick');
					$(".buttonaudio").attr("data-audiosrc", "/audio/module4/a11/report"+ ($.k2l.m4a11_1.index + 1) +".m4a");
					audioButtonClickSetup($.k2l.m4a11_1.sound, $(".buttonaudio"));
					playPauseAudio($.k2l.m4a11_1.sound, $(".buttonaudio"));
				}, 1000);
			}

			
		} else if ((buttonValue != correctAnswer) && $.k2l.m4a11_1.questionWordLock == false) {
			$.k2l.m4a11_1.questionWordLock = true;
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000);
		}
		setTimeout(function () {
			$.k2l.m4a11_1.questionWordLock = false;
		}, 1000);

	}
});

Template.m4a11_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m4a11_1 == 'undefined') {
		$.k2l.m4a11_1 = {};
	};

	$.k2l.m4a11_1.sound = new Audio();

	var correctAnswers = ["6", "3", "9", "7", "1", "5", "2", "10", "8", "4"];

	$.k2l.m4a11_1.index = 0;
	$.k2l.m4a11_1.correctAnswers = correctAnswers;

	$.k2l.m4a11_1.questionWordLock = false; //variable to prevent multiple clicks of button
}
