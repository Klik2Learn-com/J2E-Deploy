Template.m1a15.events({

	'click a.restart': function (evt) {

		$.k2l.m1a15_6.index = 0;
		$.k2l.m1a15_6.wrongCount = 0; // counter to reveal stuck button.
		$.k2l.m1a15_6.image_counter = 0;

		$.k2l.m1a15_7.index = 0;
		$.k2l.m1a15_7.wrongCount = 0; // counter to reveal stuck button.
		$.k2l.m1a15_7.image_counter = 0;

		$.k2l.m1a15.image_counter = 0;
	}

});


Template.m1a15.rendered = function () {

	document.title = "Journey 2 English";
	
	setStartActivity(1, 15);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(1, 15, subpage);
			oldLocation = location.href;
		}
	}, 500);

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	}
	if (typeof $.k2l.m1a15 == 'undefined') {
		$.k2l.m1a15 = {};
	}

	$.k2l.m1a15.image_counter = 0;

}

Template.m1a15.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m1a15_end') {
			return false;
		} return true;
	}
});


Template.m1a15.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 1, 15, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m1a15.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m1a15_1.events({
	'click .buttonaudioc': function (evt) {
		var soundfile = "audio/module1/a15/" + $(evt.currentTarget).attr('id') + ".m4a";
		$(evt.currentTarget).attr('data-audiosrc', soundfile);
		audioButtonClickSetup($.k2l.m1a15_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m1a15_1.sound, $(evt.currentTarget));
	},

	"click .pagination": function(evt){
		if($.k2l.m1a15_1.sound != undefined)
			$.k2l.m1a15_1.sound.src = {};
	}

})

Template.m1a15_1.rendered = function () {
	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	}
	if (typeof $.k2l.m1a15_1 == 'undefined') {
		$.k2l.m1a15_1 = {};
	};

	$.k2l.m1a15_1.sound = new Audio();
}

Template.m1a15_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a15_2");
	}
});

Template.m1a15_2.events({

});

Template.m1a15_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a15_2 == 'undefined') {
		$.k2l.m1a15_2 = {};
	};

	$.k2l.m1a15_2.draggedElement = {};
	$.k2l.m1a15_2.counter = 0;
	//$.k2l.m1a15_2.max = 5;


	$.k2l.m1a15_2.dragWords = [];
	$("#m1a15_2").find(".ddsourceseated").each(function () {
		$.k2l.m1a15_2.dragWords.push($(this).html());
	});

	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m1a15_2";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m1a15_2",
		nextPage: "#m1a15_3"
	};
	initDragDrop(selector, dragDropAmount, options);

}



Template.m1a15_3.events({
	'click .buttonaudioc': function (evt) {
		var soundfile = "audio/module1/a15/" + $(evt.currentTarget).attr('id') + ".m4a";
		$(evt.currentTarget).attr('data-audiosrc', soundfile);
		audioButtonClickSetup($.k2l.m1a15_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m1a15_3.sound, $(evt.currentTarget));
	},

	"click .pagination": function(evt){
		if($.k2l.m1a15_3.sound != undefined)
			$.k2l.m1a15_3.sound.src = {};
	}
})

Template.m1a15_3.rendered = function () {
	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	}
	if (typeof $.k2l.m1a15_3 == 'undefined') {
		$.k2l.m1a15_3 = {};
	};

	$.k2l.m1a15_3.sound = new Audio();
}

Template.m1a15_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a15_4");
	}
});

Template.m1a15_4.events({

});

Template.m1a15_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a15_4 == 'undefined') {
		$.k2l.m1a15_4 = {};
	};

	$.k2l.m1a15_4.draggedElement = {};
	$.k2l.m1a15_4.counter = 0;
	//$.k2l.m1a15_4.max = 5;

	$.k2l.m1a15_4.dragWords = [];
	$("#m1a15_4").find(".ddsourceseated").each(function () {
		$.k2l.m1a15_4.dragWords.push($(this).html());
	});

	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m1a15_4";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m1a15_4",
		nextPage: "#m1a15_5"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m1a15_6.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m1a15_6");
	}
})

Template.m1a15_6.events({

	"click .buttonaudio": function (evt) {
		for (x in $.k2l.m1a15_6.id_audio_map) {
			if ($($.k2l.m1a15_6.id_audio_map[x]).attr('id') == $(evt.currentTarget).attr('id')) {
				$(evt.currentTarget).attr('data-audiosrc', "audio/module1/a15/" + $.k2l.m1a15_6.id_audio_map[x].audioFile);
				audioButtonClickSetup($.k2l.m1a15_6.sound, $(evt.currentTarget));
				playPauseAudio($.k2l.m1a15_6.sound, $(evt.currentTarget));
				break;
			}
		}
	},

	"submit form": function (evt) {

		if (evt.preventDefault) {
			evt.preventDefault();
		}

		var isCorrect = false;
		var userText = evt.target.userText.value;
		// if (userText.charAt(userText.length - 1) == '.') {
		// userText = userText.substr(0, userText.length - 1);
		// }
		userText = $.trim(userText);
		// userText = userText.toLowerCase();

		for (var i = 0; i < $.k2l.m1a15_6.correctAnswers[$.k2l.m1a15_6.index].length; i++) {
			if (userText == $.k2l.m1a15_6.correctAnswers[$.k2l.m1a15_6.index][i]) {
				isCorrect = true;
				break;
			}
		}

		if (isCorrect) {
			// Correct Answer
			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
			}, 1000);
			$('form#' + ($.k2l.m1a15_6.index + 1) + ' > input:text').closest('div').html('<h4 class="text-center">' + $.k2l.m1a15_6.displayAnswers[$.k2l.m1a15_6.index] + '</h4>');
			$.k2l.m1a15_6.index++;

			if ($.k2l.m1a15_6.index > 9) {
				$('#m1a15_6_next').removeClass('hidden');
				changeImage(); // Change the caption to an image if line finished
			} else {

				$('#' + ($.k2l.m1a15_6.index + 1)).removeClass('hidden'); //Reveal the next input box
				$('#div' + ($.k2l.m1a15_6.index + 1)).addClass('hidden');
				$($.k2l.m1a15_6.audio_form_map[$.k2l.m1a15_6.index]).removeClass('hidden'); //reveal the next audio button
				$.k2l.m1a15_6.wrongCount = 0; // reset the wrongCount

				$(".stuck").addClass('hidden'); // Hide the stuck button if it is visible
				changeImage(); // Change the caption to an image if line finished
			}

		} else {
			// Incorrect Answer
			$('.incorrectscreen').removeClass('hidden');
			setTimeout(function () {
				$('.incorrectscreen').addClass('hidden');
			}, 1000);
			$.k2l.m1a15_6.wrongCount++;

			if ($.k2l.m1a15_6.wrongCount >= 1) {
				$('.stuck').removeClass('hidden');
				$.k2l.m1a15_6.wrongCount = 0;
			}
		}
	},

	"click .stuck-button": function (evt) {
		$('form#' + ($.k2l.m1a15_6.index + 1)).nextAll('.incorrect').first().addClass('hidden');
		$('form#' + ($.k2l.m1a15_6.index + 1)).nextAll('.correct').first().removeClass('hidden');

		$('form#' + ($.k2l.m1a15_6.index + 1) + ' > input:text').closest('div').html('<h4 class="text-center">' + $.k2l.m1a15_6.displayAnswers[$.k2l.m1a15_6.index] + '</h4>');
		$(".stuck").addClass('hidden');

		$.k2l.m1a15_6.index++;
		if ($.k2l.m1a15_6.index > 9) {
			changeImage();
			$('#m1a15_6_next').removeClass('hidden');
		} else {
			$('#' + ($.k2l.m1a15_6.index + 1)).removeClass('hidden'); //Reveal the next input box
			$('#div' + ($.k2l.m1a15_6.index + 1)).addClass('hidden');
			$($.k2l.m1a15_6.audio_form_map[$.k2l.m1a15_6.index]).removeClass('hidden'); //reveal the next audio button
			$.k2l.m1a15_6.wrongCount = 0; // reset the wrongCount

			changeImage(); // Change the caption to an image if line finished
		}

	},

	"click .pagination": function(evt){
		if($.k2l.m1a15_6.sound != undefined)
			$.k2l.m1a15_6.sound.src = {};
	}
})


// function changeImage() {
// 	$.k2l.m1a15_6.image_counter++;
	
// };

Template.m1a15_6.rendered = function () {


	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a15_6 == 'undefined') {
		$.k2l.m1a15_6 = {};
	};

	$.k2l.m1a15_6.index = 0;
	$.k2l.m1a15_6.wrongCount = 0; // counter to reveal stuck button.
	$.k2l.m1a15_6.sound = new Audio();

	// Array with an identifier and the acceptable answers
	var correctAnswers = [
		["It's in India."], // possible answers for q1.
		["It's Indian."],   // possible answers for q2.
		["It's in France."], // etc.
		["It's French."],
		["It's in China."],
		["It's Chinese."],
		["It's from Italy."],
		["It's Italian."],
		["They're in Egypt."],
		["They're Egyptian."]
	]


	var audio_form_map = ['#tm', '#tm', '#eiffelaudio', '#eiffelaudio',
		'#greatwallchinaaudio', '#greatwallchinaaudio', '#fr', '#fr',
		'#greatpyramidsaudio', '#greatpyramidsaudio'];

	var displayAnswers = ["It's in India.",
		"It's Indian.",
		"It's in France.",
		"It's French.",
		"It's in China.",
		"It's Chinese.",
		"It's from Italy.",
		"It's Italian.",
		"They're in Egypt.",
		"They're Egyptian."];
	var id_audio_map = [
		{ id: "tm", audioFile: "taj_its_in_india.m4a" },
		{ id: "eiffelaudio", audioFile: "eiffel_tower_its_in_france.m4a" },
		{ id: "greatwallchinaaudio", audioFile: "the_great_wall_its_in_china.m4a" },
		{ id: "fr", audioFile: "ferrari_its_italian.m4a" },
		{ id: "greatpyramidsaudio", audioFile: "pyramids_theyre_in_egypt.m4a" }
	];


	$.k2l.m1a15_6.image_counter = 0;

	$.k2l.m1a15_6.id_audio_map = id_audio_map;
	$.k2l.m1a15_6.correctAnswers = correctAnswers;
	$.k2l.m1a15_6.displayAnswers = displayAnswers;
	$.k2l.m1a15_6.audio_form_map = audio_form_map;

}

Template.m1a15_7.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m1a15_7");
	}
})

Template.m1a15_7.events({

	"click .buttonaudio": function (evt) {
		for (x in $.k2l.m1a15_7.id_audio_map) {
			if ($($.k2l.m1a15_7.id_audio_map[x]).attr('id') == $(evt.currentTarget).attr('id')) {
				$(evt.currentTarget).attr('data-audiosrc', "audio/module1/a15/" + $.k2l.m1a15_7.id_audio_map[x].audioFile);
				audioButtonClickSetup($.k2l.m1a15_7.sound, $(evt.currentTarget));
				playPauseAudio($.k2l.m1a15_7.sound, $(evt.currentTarget));
				break;
			}
		}
	},

	"submit form": function (evt) {

		if (evt.preventDefault) {
			evt.preventDefault();
		}

		var isCorrect = false;
		var userText = evt.target.userText.value;

		// if (userText.charAt(userText.length - 1) == '.') {
		// userText = userText.substr(0, userText.length - 1);
		// }
		userText = $.trim(userText);
		// userText = userText.toLowerCase();

		for (var i = 0; i < $.k2l.m1a15_7.correctAnswers[$.k2l.m1a15_7.index].length; i++) {
			if (userText == $.k2l.m1a15_7.correctAnswers[$.k2l.m1a15_7.index][i]) {
				isCorrect = true;
				break;
			}
		}

		if (isCorrect) {
			// Correct Answer
			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
			}, 1000);
			$('form#' + ($.k2l.m1a15_7.index + 11) + ' > input:text').closest('div').html('<h4>' + $.k2l.m1a15_7.displayAnswers[$.k2l.m1a15_7.index] + '</h4>');
			$.k2l.m1a15_7.index++;

			if ($.k2l.m1a15_7.index > 9) {
				$('#m1a15_7_next').removeClass('hidden');
				changeImage(); // Change the caption to an image if line finished
			} else {

				$('#' + ($.k2l.m1a15_7.index + 11)).removeClass('hidden'); //Reveal the next input box
				$('#div' + ($.k2l.m1a15_7.index + 11)).addClass('hidden');
				$($.k2l.m1a15_7.audio_form_map[$.k2l.m1a15_7.index]).removeClass('hidden'); //reveal the next audio button
				$.k2l.m1a15_7.wrongCount = 0;

				$(".stuck").addClass('hidden'); // Hide the stuck button if it is visible
				changeImage(); // Change the caption to an image if line finished
			}

		} else {
			// Incorrect Answer
			$('.incorrectscreen').removeClass('hidden');
			setTimeout(function () {
				$('.incorrectscreen').addClass('hidden');
			}, 1000);
			$.k2l.m1a15_7.wrongCount++;

			if ($.k2l.m1a15_7.wrongCount >= 1) {
				$('.stuck').removeClass('hidden');
				$.k2l.m1a15_7.wrongCount = 0;
			}

		}
	},

	"click .stuck-button": function (evt) {
		$('form#' + ($.k2l.m1a15_7.index + 11)).nextAll('.incorrect').first().addClass('hidden');
		$('form#' + ($.k2l.m1a15_7.index + 11)).nextAll('.correct').first().removeClass('hidden');

		$('form#' + ($.k2l.m1a15_7.index + 11) + ' > input:text').closest('div').html('<h4>' + $.k2l.m1a15_7.displayAnswers[$.k2l.m1a15_7.index] + '</h4>');
		$(".stuck").addClass('hidden');

		$.k2l.m1a15_7.index++;

		if ($.k2l.m1a15_7.index > 9) {
			changeImage();
			$('#m1a15_7_next').removeClass('hidden');
		} else {
			$('#' + ($.k2l.m1a15_7.index + 11)).removeClass('hidden'); //Reveal the next input box
			$('#div' + ($.k2l.m1a15_7.index + 11)).addClass('hidden');
			$($.k2l.m1a15_7.audio_form_map[$.k2l.m1a15_7.index]).removeClass('hidden'); //reveal the next audio button
			$.k2l.m1a15_7.wrongCount = 0; // reset the wrongCount

			changeImage(); // Change the caption to an image if line finished
		}
	},

	"click .pagination": function(evt){
		if($.k2l.m1a15_7.sound != undefined)
			$.k2l.m1a15_7.sound.src = {};
	}

})

function changeImage() {
	$.k2l.m1a15.image_counter++;
	if ($.k2l.m1a15.image_counter == 2) {
		$("#tajMahalImage").html("<div class=\"ph-w ph-1x1 border1\"><div class=\"ph\"><img draggable=\"false\" src=\"../images/module1/tajmahal.jpeg\" alt=\"Taj Mahal\" /></div></div>");
	} else if ($.k2l.m1a15.image_counter == 4) {
		$('#eiffelTowerImage').html('<div class=\"ph-w ph-1x1 border1\"><div class=\"ph\"><img draggable="false" src="../images/module1/eiffel.jpeg" alt="Eiffel Tower" />');
	} else if ($.k2l.m1a15.image_counter == 6) {
		$('#greatWallImage').html('<div class=\"ph-w ph-1x1 border1\"><div class=\"ph\"><img draggable="false" src="../images/module1/greatwallofchina.jpeg" alt="The Great Wall of China" />');
	} else if ($.k2l.m1a15.image_counter == 8) {
		$('#ferrariImage').html('<div class=\"ph-w ph-1x1 border1\"><div class=\"ph\"><img draggable="false" src="../images/module1/ferrari.jpeg" alt="Ferrari" />');
	} else if ($.k2l.m1a15.image_counter == 10) {
		$('#greatPyramidsImage').html('<div class=\"ph-w ph-1x1 border1\"><div class=\"ph\"><img draggable="false" src="../images/module1/pyramids.jpeg" alt="The Great Pyramids" />');
	} else if ($.k2l.m1a15.image_counter == 12) {
		$("#statuelibertyImage").html("<div class=\"ph-w ph-1x1 border1\"><div class=\"ph\"><img draggable=\"false\" src=\"../images/module1/statueofliberty.jpeg\" alt=\"The Statue of Liberty\" />");
	} else if ($.k2l.m1a15.image_counter == 14) {
		$('#sydneyoperaImage').html('<div class=\"ph-w ph-1x1 border1\"><div class=\"ph\"><img draggable="false" src="../images/module1/sydney.jpeg" alt="Sydney Opera House"  />');
	} else if ($.k2l.m1a15.image_counter == 16) {
		$('#housesparliamentImage').html('<div class=\"ph-w ph-1x1 border1\"><div class=\"ph\"><img draggable="false" src="../images/module1/housesofparliament.jpeg" alt="The Houses of Parliament"  />');
	} else if ($.k2l.m1a15.image_counter == 18) {
		$('#mercBenzImage').html('<div class=\"ph-w ph-1x1 border1\"><div class=\"ph\"><img draggable="false" src="../images/module1/mercedesbenz.jpeg" alt="Mercedes Benz"  />');
	} else if ($.k2l.m1a15.image_counter == 20) {
		$('#bottleWhiskyImage').html('<div class=\"ph-w ph-1x1 border1\"><div class=\"ph\"><img draggable="false" src="../images/module1/whisky.jpeg" alt="Whisky"  />');
	}
};

Template.m1a15_7.rendered = function () {


	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a15_7 == 'undefined') {
		$.k2l.m1a15_7 = {};
	};

	$.k2l.m1a15_7.index = 0;
	$.k2l.m1a15_7.wrongCount = 0; // counter to reveal stuck button.
	$.k2l.m1a15_7.sound = new Audio();

	// Array with an identifier and the acceptable answers
	var correctAnswers = [
		["It's in America."], // Possible Answers For Q1.
		["It's American."],   // Possible Answers For Q2.
		["It's in Australia."], // Etc.
		["It's Australian."],
		["They're in Great Britain.", "They're in Britain.", "They're in England.", "They're in the Uk.", "They're in the United Kingdom."],
		["They're British.", "They're Great British.", "They're English."],
		["It's from Germany."],
		["It's German."],
		["It's from Scotland."],
		["It's Scottish."]
	];

	var audio_form_map = ['#statuelibertyaudio', '#statuelibertyaudio', '#sydoperaaud', '#sydoperaaud',
		'#housesparliamentaudio', '#housesparliamentaudio', '#ma', '#ma',
		'#bottlewhiskyaudio', '#bottlewhiskyaudio'];

	var displayAnswers = ["It's in America.",
		"It's American.",
		"It's in Australia.",
		"It's Australian.",
		"They're in Britain/England.",
		"They're British/English.",
		"It's from Germany.",
		"It's German.",
		"It's from Scotland.",
		"It's Scottish."];


	var id_audio_map = [
		{ id: "statuelibertyaudio", audioFile: "statue_of_its_in_america.m4a" },
		{ id: "sydoperaaud", audioFile: "sydney_opera_house_its_in_australia.m4a" },
		{ id: "housesparliamentaudio", audioFile: "houses_of_parliament_theyre_in_britian.m4a" },
		{ id: "ma", audioFile: "mercedez_benz_its_from_germany.m4a" },
		{ id: "bottlewhiskyaudio", audioFile: "bottle_of_whisky_its_from_scotland.m4a" }

	];

	$.k2l.m1a15_7.image_counter = 0;

	$.k2l.m1a15_7.id_audio_map = id_audio_map;
	$.k2l.m1a15_7.correctAnswers = correctAnswers;
	$.k2l.m1a15_7.displayAnswers = displayAnswers;
	$.k2l.m1a15_7.audio_form_map = audio_form_map;

}
