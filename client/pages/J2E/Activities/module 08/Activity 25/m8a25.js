Template.m8a25.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m8a25_end') {
			return false;
		}
		return true;
	}
});

Template.m8a25.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(8, 25);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(8, 25, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m8a25.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 8, 25, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m8a25.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m8a25_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m8a25_3");
	}
});

Template.m8a25_3.events({

	"click .lotto-button": function (evt) {
		if (evt.preventDefault) 
			evt.preventDefault();
			
		if (!$(evt.currentTarget).hasClass('noclick')) {
		//	$.k2l.m8a25_3.allowClick = false;
			var answer = $.k2l.m8a25_3.answer_index[$.k2l.m8a25_3.index];

			var isCorrect = false;
			var currentAns = $($($(evt.currentTarget).children().get(0)).children().get(0)).html();
				for(var i = 0; i < answer.length; i++){
					if(answer[i] == currentAns && currentAns != $.k2l.m8a25_3.lastAns){
						$.k2l.m8a25_3.lastAns = answer[i];
						isCorrect = true;
						break;
					}
				}
				
			if (isCorrect) {
				var parentSection = $(evt.currentTarget).parents('section');
				$.k2l.counter--;
				$(".counterleft u").html($.k2l.counter);
				$('.correctscreen').removeClass('hidden');

				if ($.k2l.m8a25_3.index >= $.k2l.m8a25_3.answer_index.length - 1) {

					setTimeout(function () {
						$('.correctscreen').addClass('hidden');
					}, 1000);

					if($.k2l.counter == 0){
						$('.lotto-button').addClass('flipOutX');
						setTimeout(function () {
							$('#welldonecap').removeClass('hidden');
						}, 1000);
						setTimeout(function () {
							setTimeout(function () {
								$('#welldonecap').addClass('hidden');
								shuffle($.k2l.m8a25_3.choices[$.k2l.m8a25_3.index]);
								for (var i = 0; i < $.k2l.m8a25_3.choices[$.k2l.m8a25_3.index].length + 1; i++) {
									$('.lotto-button').removeClass('flipOutX');
									var color = Math.floor(Math.random() * 8) + 1;
									$('#lottoc' + i).addClass('flipInX lotto' + color);
									$('#lottoc' + i).html('<div><span class="contents">' + $.k2l.m8a25_3.choices[$.k2l.m8a25_3.index][i] + "</span></div>");
								}
							}, 1);
							$('.noclick').each(function(button){
								$(this).removeClass('noclick');
								$(this).removeClass('faded');
							});
							//reset variables
							$.k2l.m8a25_3.lastAns = '';
							$.k2l.m8a25_3.index = 0;
							$.k2l.m8a25_3.allowClick = true;
							$.k2l.counter =  $.k2l.m8a25_3.answer_index[$.k2l.m8a25_3.index].length;
							$(parentSection).addClass('hidden'); // hide this page
							$(parentSection).addClass('hidden'); // hide this page
							$(parentSection).next('section').removeClass('hidden');// reveal next page.
							document.location.hash = $(parentSection).next('section').attr('id');
							Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
						}, 2000);
					}else{
						$(evt.currentTarget).addClass('noclick');
						$(evt.currentTarget).addClass('faded');
					}

				} else {

					setTimeout(function () {
						$('.correctscreen').addClass('hidden');
						$.k2l.m8a25_3.allowClick = true; // Make the buttons clickable again
					},1000);

					if($.k2l.counter == 0){
						$.k2l.m8a25_3.lastAns = '';
						$.k2l.m8a25_3.index++;
						setTimeout(function () {
							$('.lotto-button').removeClass('lotto1 lotto2 lotto3 lotto4 lotto5 lotto6 lotto7 lotto8 flipInX');
							setTimeout(function () {
								$('.noclick').each(function(button){
									$(this).removeClass('noclick');
									$(this).removeClass('faded');
								});
								shuffle($.k2l.m8a25_3.choices[$.k2l.m8a25_3.index]);
								for (var i = 0; i < $.k2l.m8a25_3.choices[$.k2l.m8a25_3.index].length + 1; i++) {
									$('.lotto-button').removeClass('flipOutX');
									var color = Math.floor(Math.random() * 8) + 1;
									$('#lottoc' + i).addClass('flipInX lotto' + color);
									$('#lottoc' + i).html('<div><span class="contents">' + $.k2l.m8a25_3.choices[$.k2l.m8a25_3.index][i] + "</span></div>");
									$("#questions").html($.k2l.m8a25_3.questions[$.k2l.m8a25_3.index]);
									$(".number").html($.k2l.m8a25_3.index + 1);
									$.k2l.counter =  $.k2l.m8a25_3.answer_index[$.k2l.m8a25_3.index].length;
									$(".counterleft u").html($.k2l.counter);

								}
							}, 1);
						}, 1000);
					}else{
						$(evt.currentTarget).addClass('noclick');
						$(evt.currentTarget).addClass('faded');
					}
				}
			} else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout(function () {
					$('.incorrectscreen').addClass('hidden');

				}, 1000);
				$.k2l.m8a25_3.allowClick = true; // Make the buttons clickable again

			}
		}
	},
	/*
	'click .pagination': function (evt) {
		$.k2l.m8a25_3.index = 0;
		$.k2l.m8a25_3.allowClick = true;
	}
	*/

});

Template.m8a25_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m8a25_3 == 'undefined') {
		$.k2l.m8a25_3 = {};
	};

	var answer_index = [["al", "ally"], ["ful", "less"], ["able"], ["ness"], ["ful"], ["ally", "al"], ["ward"], ["ness", "ly"], ["less", "hood"], ["al", "ally"], ["ship"], ["ment", "able"], ["less"], ["y"], ["ly", "hood"]];

	var choices = [
		["al", "ful", "able", "ness", "ally", "ward", "hood", "less", "ship", "ment", "y", "ly"],
		["al", "ful", "able", "ness", "ally", "ward", "hood", "less", "ship", "ment", "y", "ly"],
		["al", "ful", "able", "ness", "ally", "ward", "hood", "less", "ship", "ment", "y", "ly"],
		["al", "ful", "able", "ness", "ally", "ward", "hood", "less", "ship", "ment", "y", "dom"],
		["al", "ful", "able", "ness", "ally", "ward", "hood", "less", "ship", "ment", "y", "ly"],
		["al", "ful", "able", "ness", "ally", "ward", "hood", "less", "ship", "ment", "y", "ly"],
		["al", "ful", "able", "ness", "ally", "ward", "hood", "less", "ship", "ment", "y", "ly"],
		["al", "ful", "able", "ness", "ally", "ward", "hood", "less", "ship", "ment", "y", "ly"],
		["al", "ful", "able", "ness", "ally", "ward", "hood", "less", "ship", "ment", "y", "ly"],
		["al", "ful", "able", "ness", "ally", "ward", "hood", "less", "ship", "ment", "y", "ly"],
		["al", "ful", "able", "ness", "ally", "ward", "hood", "less", "ship", "ment", "y", "ly"],
		["al", "ful", "able", "ness", "ally", "ward", "hood", "less", "ship", "ment", "y", "ly"],
		["al", "ful", "able", "ness", "ally", "ward", "hood", "less", "ship", "ment", "y", "ly"],
		["al", "ful", "able", "ness", "ally", "ward", "hood", "less", "ship", "ment", "y", "ly"],
		["al", "ful", "able", "ness", "ally", "ward", "hood", "less", "ship", "ment", "y", "ly"]
	];

	var questions = ["Accident", "Help", "Tax", "Quiet", "Sorrow", "Music", "Back", "Sad", "Child", "Nation", "Citizen", "Treat", "Breath", "Jealous", "Brother"]
	$.k2l.m8a25_3.answer_index = answer_index;
	$.k2l.m8a25_3.choices = choices;
	$.k2l.m8a25_3.questions = questions;
	$.k2l.m8a25_3.index = 0;
	$.k2l.counter =  $.k2l.m8a25_3.answer_index[$.k2l.m8a25_3.index].length;
	$(".counterleft u").html($.k2l.counter);
	$.k2l.m8a25_3.allowClick = true;


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
