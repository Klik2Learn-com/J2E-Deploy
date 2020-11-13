Template.m9a20.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m9a20_end') {
			return false;
		}
		return true;
	}
});

Template.m9a20.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(9, 20);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(9, 20, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m9a20.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 9, 20, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m9a20.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m9a20_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m9a20_3");
	}
});

Template.m9a20_3.events({

	"click .lotto-button": function (evt) {

		if ($.k2l.m9a20_3.allowClick == true) {
			$.k2l.m9a20_3.allowClick = false;
			var answer = '<div><span class="contents">' + $.k2l.m9a20_3.answer_index[$.k2l.m9a20_3.index] + "</span></div>";
			if ($(evt.currentTarget).html() == answer) {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.m9a20_3.index++
				$('.correctscreen').removeClass('hidden');
				$('.lotto-button').addClass('flipOutX');

				if ($.k2l.m9a20_3.index > $.k2l.m9a20_3.answer_index.length - 1) {

					setTimeout(function () {
						$('.correctscreen').addClass('hidden');
					}, 1000);

					setTimeout(function () {
						$('#welldonecap').removeClass('hidden');
					}, 1000);
					setTimeout(function () {
						$.k2l.m9a20_3.index = 0;
						setTimeout(function () {
							$('#welldonecap').addClass('hidden');
							shuffle($.k2l.m9a20_3.choices);
							for (var i = 0; i < $.k2l.m9a20_3.choices.length + 1; i++) {
								$('.lotto-button').removeClass('flipOutX');
								var color = Math.floor(Math.random() * 8) + 1;
								$('#lottoc' + i).addClass('flipInX lotto' + color);
								$('#lottoc' + i).html('<div><span class="contents">' + $.k2l.m9a20_3.choices[i] + "</span></div>");
							}
						}, 1);
						//reset variables
						$.k2l.m9a20_3.index = 0;
						$.k2l.m9a20_3.allowClick = true;
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).addClass('hidden'); // hide this page
						$(parentSection).next('section').removeClass('hidden');// reveal next page.
						document.location.hash = $(parentSection).next('section').attr('id');
						Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
					}, 2000);

				} else {

					setTimeout(function () {
						$('.correctscreen').addClass('hidden');
						$.k2l.m9a20_3.allowClick = true; // Make the buttons clickable again
						$('.lotto-button').removeClass('lotto1 lotto2 lotto3 lotto4 lotto5 lotto6 lotto7 lotto8 flipInX');


						setTimeout(function () {
							shuffle($.k2l.m9a20_3.choices);
							for (var i = 0; i < $.k2l.m9a20_3.choices.length + 1; i++) {
								$('.lotto-button').removeClass('flipOutX');
								var color = Math.floor(Math.random() * 8) + 1;
								$('#lottoc' + i).addClass('flipInX lotto' + color);
								$('#lottoc' + i).html('<div><span class="contents">' + $.k2l.m9a20_3.choices[i] + "</span></div>");
								$("#questions").html($.k2l.m9a20_3.questions[$.k2l.m9a20_3.index]);
								$(".number").html($.k2l.m9a20_3.index + 1);

							}
						}, 1);
					}, 1000);
				}
			} else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');

				}, 1000);
				$.k2l.m9a20_3.allowClick = true; // Make the buttons clickable again

			}
		}
	},
	/*
	'click .pagination': function (evt) {
		$.k2l.m9a20_3.index = 0;
		$.k2l.m9a20_3.allowClick = true;
	}
	*/

});

Template.m9a20_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m9a20_3 == 'undefined') {
		$.k2l.m9a20_3 = {};
	};

	var answer_index = ["In", "Un", "Un", "Im", "Un", "Un", "Ante", "Un", "Un", "Un", "Im", "Un"];

	var choices = ["Un", "In", "Im", "Ante", "Dis", "Em", "Inter", "Sub", "Re", "Out", "Semi", "Over"];

	var questions = ["sensitive", "clear", "healthy", "perfect", "friendly", "comfortable", "room", "pack", "believable", "reasonable", "polite", "sure"]


	$.k2l.m9a20_3.answer_index = answer_index;
	$.k2l.m9a20_3.choices = choices;
	$.k2l.m9a20_3.questions = questions;
	$.k2l.m9a20_3.index = 0;

	$.k2l.m9a20_3.allowClick = true;


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
