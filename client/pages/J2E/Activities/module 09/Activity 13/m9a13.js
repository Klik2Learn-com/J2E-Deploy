Template.m9a13.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m9a13_end') {
			return false;
		}
		return true;
	}
});

Template.m9a13.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(9, 13);

	// $("#m9a13_modal").on("click", function (event) {
	// 	console.log("MODAL on click");
	// 	// if (event.target == this || $(event.target).is('span')) {
	// 	// 	$("#m9a13_modal iframe")[0].pause();
	// 	// }
	// 	$("#m9a13_modal iframe").attr("src", $("#m9a13_modal iframe").attr("src"));
	// });

	// $("#m9a13_modal").on("hidden.bs.modal", function (event) {
	// 	console.log("MODAL on hidden");
	// 	$("#m9a13_modal iframe").attr("src", $("#m9a13_modal iframe").attr("src"));
	// });
	
	$('#m9a13_modal').on("hidden.bs.modal", function (event) {
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


	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(9, 13, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m9a13.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 9, 13, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m9a13.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m9a13_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a13_4");
	}
});

Template.m9a13_4.events({

});

Template.m9a13_4.rendered = function () {
}

Template.m9a13_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a13_2");
	}
});

Template.m9a13_2.events({
	// 	"click .pagination": function(evt){
	// 	$('#video-id').get(0).pause();
	// 	$('#video-id').get(0).currentTime = 0;
	// }

});

Template.m9a13_2.rendered = function () {
}

Template.m9a13_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a13_3");
	}
});

Template.m9a13_3.events({
    "click #m9a13_3 .button2.item-space": function(evt) {
		var currentSection = $(evt.currentTarget).parents('section');
		var nextSection = $(evt.currentTarget).parents('section').next('section');
		var buttonValue = $(evt.currentTarget).data("value");

		if ($.k2l.m9a13_3.questionWordLock == false) {
			$.k2l.m9a13_3.questionWordLock = true;

			var correctAnswer = $.k2l.m9a13_3.correctAnswers[$.k2l.m9a13_3.index];
			if (buttonValue == correctAnswer) {
				$('.correctscreen').removeClass("hidden");
				setTimeout(function () {
					$('.correctscreen').addClass("hidden");
				}, 1000);
				var parentSection = $(evt.currentTarget).parents('section');
				var temp = $(evt.currentTarget).data('value')
				var value = $.trim(temp);
				if (value == "True") {
					$(evt.currentTarget).addClass('noclick');
					$(evt.currentTarget).next('button').addClass('faded'); // Next Button must be False
				} else if (value == 'False') {
					$(evt.currentTarget).addClass('noclick');
					$(evt.currentTarget).prev('button').addClass('faded'); // Previous Button must be True
				}
				$.k2l.m9a13_3.index++;
				$.k2l.m9a13_3.questionWordLock = false;
				$('#m9a13_3 .row#' + $.k2l.m9a13_3.index).removeClass('hidden');

				if ($.k2l.m9a13_3.index < $.k2l.m9a13_3.correctAnswers.length) {
					setTimeout(function () {
						$('.incorrectscreen').addClass('hidden');
						$('.correctscreen').addClass('hidden');
						$.k2l.m9a13_3.questionWordLock = false; // Make the buttons clickable again						
					}, 1000);
				} else {
					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);
					setTimeout(function () {
						$('#welldonecap').addClass('hidden');
					}, 2000);
					setTimeout(function () {
						$.k2l.m9a13_3.index = 0;
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
					}, 2000);
				}
				$.k2l.m9a13_3.questionWordLock = false;
			} else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');
				}, 1000);
				$.k2l.m9a13_3.questionWordLock = false;
			}
		}
	},

	'click a.restart': function (evt) {
		// When clicking to restart the activity this should reset the variables to
		// initial values.


		if (typeof $.k2l != 'undefined') {
			if (typeof $.k2l.m9a13_3 != 'undefined') {
				if (typeof $.k2l.m9a13_3.index != 'undefined') {
					$.k2l.m9a13_3.index = 0;
				}
				if (typeof $.k2l.m9a13_3.wrongCount != 'undefined') {
					$.k2l.m9a13_3.wrongCount = 0;
				}
			}
		}
	}

})

Template.m9a13_3.rendered = function () {
	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m9a13_3 == 'undefined') {
		$.k2l.m9a13_3 = {};
	};

	var correctAnswers = ["False", "True", "False", "False"];

	$.k2l.m9a13_3.index = 0;
	$.k2l.m9a13_3.correctAnswers = correctAnswers;

	$.k2l.m9a13_3.questionWordLock = false; //variable to prevent multiple clicks of button
}

Template.m9a13_6.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a13_6");
	}
});

Template.m9a13_6.events({

});

Template.m9a13_6.rendered = function () {
}
