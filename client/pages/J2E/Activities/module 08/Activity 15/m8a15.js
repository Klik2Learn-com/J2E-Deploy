Template.m8a15.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m8a15_end') {
			return false;
		}
		return true;
	}
});

Template.m8a15.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(8, 15);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 15, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m8a15.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 15, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a15.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m8a15_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a15_1");
	}
});


Template.m8a15_1.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a15_1 == 'undefined') {
		$.k2l.m8a15_1 = {};
	};
		// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m8a15_1";
	var options = {
		multiAns: false,
		autoNav : true,
		currPage: "#m8a15_1",
		nextPage: "#m8a15_2",	
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m8a15_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a15_2");
	}
});

Template.m8a15_2.events({

	"click .lotto-button": function (evt) {

		if ($.k2l.m8a15_2.allowClick == true) {
			$.k2l.m8a15_2.allowClick = false;
			var answer = '<div><span class="contents">' + $.k2l.m8a15_2.answer_index[$.k2l.m8a15_2.index] + "</span></div>";
			if ($(evt.currentTarget).html() == answer) {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m8a15_2.index++
				$('.correctscreen').removeClass('hidden');
				$('.lotto-button').addClass('flipOutX');

				if ($.k2l.m8a15_2.index > $.k2l.m8a15_2.answer_index.length - 1) {

					setTimeout(function () {
						$('.correctscreen').addClass('hidden');
					}, 1000);

					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);
					setTimeout(function () {
						$.k2l.m8a15_2.index = 0;
						setTimeout(function () {
							$('#welldonecap').addClass('hidden');
							shuffle($.k2l.m8a15_2.choices);
							for (var i = 0; i < $.k2l.m8a15_2.choices.length + 1; i++) {
								$('.lotto-button').removeClass('flipOutX');
								var color = Math.floor(Math.random() * 8) + 1;
								$('#lottoc' + i).addClass('flipInX lotto' + color);
								$('#lottoc' + i).html('<div><span class="contents">' + $.k2l.m8a15_2.choices[i] + "</span></div>");
							}
						}, 1);
						//reset variables
						$.k2l.m8a15_2.index = 0;
						$.k2l.m8a15_2.allowClick = true;
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
					}, 2000);

				} else {

					setTimeout(function () {
						$('.correctscreen').addClass('hidden');
						$.k2l.m8a15_2.allowClick = true; // Make the buttons clickable again
						$('.lotto-button').removeClass('lotto1 lotto2 lotto3 lotto4 lotto5 lotto6 lotto7 lotto8 flipInX');


						setTimeout(function () {
							shuffle($.k2l.m8a15_2.choices);
							for (var i = 0; i < $.k2l.m8a15_2.choices.length + 1; i++) {
								$('.lotto-button').removeClass('flipOutX');
								var color = Math.floor(Math.random() * 8) + 1;
								$('#lottoc' + i).addClass('flipInX lotto' + color);
								$('#lottoc' + i).html('<div><span class="contents">' + $.k2l.m8a15_2.choices[i] + "</span></div>");
							}
							$("#questions").html($.k2l.m8a15_2.questions[$.k2l.m8a15_2.index]);
							$("#conditional").html($.k2l.m8a15_2.conditional[$.k2l.m8a15_2.index]);
							$("#part").html($.k2l.m8a15_2.part[$.k2l.m8a15_2.index]);
						}, 1);
					}, 1000);
				}
			} else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');

				}, 1000);
				$.k2l.m8a15_2.allowClick = true; // Make the buttons clickable again

			}
		}
	},

	/*
	'click .pagination': function (evt) {
		$.k2l.m8a15_2.index = 0;
		$.k2l.m8a15_2.allowClick = true;
	}
	*/

});

Template.m8a15_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	}

	if (typeof $.k2l.m8a15_2 == 'undefined') {
		$.k2l.m8a15_2 = {};
	}

	var answer_index = ["Present Simple", "Present Simple", "Present Simple", "Future", "Present Conditional", "Present Conditional", "Past Perfect", "Past Conditional"];

	var choices = ["Present Simple", "Future", "Present Conditional", "Past Perfect", "Past Conditional"];

	var questions = ["If something <span class='grammar'>goes</span> wrong,", "<span class='grammar'>it’s</span> never his fault.", "If <span class='grammar'>you’ve</span> got a few hours sometime,", "<span class='grammar'>I’ll</span> tell you about it.", "If I <span class='grammar'>could</span> walk out tomorrow,", "I <span class='grammar'>would</span>.", "If <span class='grammar'>I’d</span> realised how awful it was going to be,", "I <span class='grammar'>wouldn’t</span> have taken it."];

	var conditional = ["zero", "zero", "first", "first", "second", "second", "third", "third"];

	var part = ["first", "second", "first", "second", "first", "second", "first", "second", "first", "second"]


	$.k2l.m8a15_2.answer_index = answer_index;
	$.k2l.m8a15_2.choices = choices;
	$.k2l.m8a15_2.questions = questions;
	$.k2l.m8a15_2.conditional = conditional;
	$.k2l.m8a15_2.part = part;
	$.k2l.m8a15_2.index = 0;

	$.k2l.m8a15_2.allowClick = true;


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
