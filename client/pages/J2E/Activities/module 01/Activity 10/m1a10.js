Template.m1a10.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m1a10_end') {
			return false;
		}
		return true;
	},


	activeSection: function () {
		var activeSection = Session.get('activeSection');
		switch (activeSection) {
			case "#m1a10_2b":
				return true
				break;
			case "#m1a10_3":
				return true
				break;
			case "#m1a10_4":
				return true
				break;
			case "#m1a10_5":
				return true
				break;
			case "#m1a10_6":
				return true
				break
			case "#m1a10_7":
				return true
				break;
			case "#m1a10_8":
				return true
				break;
			case "#m1a10_9":
				return true
				break;
			case "#m1a10_10":
				return true
				break;
			case "#m1a10_11":
				return true
				break;
			case "#m1a10_12":
				return true
				break;
			case "#m1a10_13":
				return true
				break;
			case "#m1a10_14":
				return true
				break;
			case "#m1a10_15":
				return true
				break;
			case "#m1a10_16":
				return true
				break;
			case "#m1a10_17b":
				return true
				break;
			default:
				return false;
		}
	}
})

Template.m1a10.events({
	"click .button1": function (evt) {
		if ($.k2l.m1a10.clickAnswer == true) {
			return
		}
		$.k2l.m1a10.clickAnswer = true;
		if ($(evt.currentTarget).html() == $.k2l.m1a10.answers[$.k2l.m1a10.index]) {
			// put up the wee correct symbol
			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
			}, 1000);
			// if theres another page
			if ($.k2l.m1a10.index < $.k2l.m1a10.answers.length - 1) {
				$.k2l.m1a10.index += 1; // increment the counter
			} else {
				// This code hides all the tics and crosses for this section
				// which is necessary for user reloading the game.
				setTimeout(function () {
					$.k2l.m1a10.index = 0;
					$('.correctscreen').addClass('hidden');
					$('.incorrectscreen').addClass('hidden');
				}, 2000);
			}
			setTimeout(function () {
				$(evt.currentTarget).parents('section').addClass('hidden'); // hide this page
				$(evt.currentTarget).parents('section').next('section').removeClass('hidden');// reveal next page.
				document.location.hash = $(evt.currentTarget).parents('section').next('section').attr('id'); //change the hash
				$.k2l.m1a10.clickAnswer = false;
			}, 2000);
		} else {
			// put up the wee incorrect symbol.
			$('.incorrectscreen').removeClass('hidden');
			setTimeout(function () {
				$('.incorrectscreen').addClass('hidden');
			}, 1000);
			$.k2l.m1a10.clickAnswer = false;
		}
	}
})

Template.m1a10.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a10 == 'undefined') {
		$.k2l.m1a10 = {};
	};

	$.k2l.m1a10.index = 0;
	$.k2l.m1a10.answers = ["has", "is", "is", "has", "has", "is"];

	$.k2l.m1a10.clickAnswer = false; // boolean to prevent multiple clicks after correct answer.
	setStartActivity(1, 10);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(1, 10, subpage);
			oldLocation = location.href;
		}
	}, 500);

    document.title = "Journey 2 English";

}

Template.m1a10.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 1, 10, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m1a10.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m1a10_10.events({

});

Template.m1a10_10.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a10_10 == 'undefined') {
		$.k2l.m1a10_10 = {};
	};
	$.k2l.m1a10_10.counter = 0;


	$.k2l.m1a10_10.dragWords = [];
	$("#m1a10_10").find(".ddsourceseated").each(function () {
		$.k2l.m1a10_10.dragWords.push($(this).html());
	});

	// Add drag and drop
	var dragDropAmount = $.k2l.m1a10_10.dragWords.length - 1;
	var selector = "#m1a10_10";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m1a10_10",
		nextPage: "#m1a10_11"
	};
	initDragDrop(selector, dragDropAmount, options);
}



Template.m1a10_11.events({


});

Template.m1a10_11.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a10_11 == 'undefined') {
		$.k2l.m1a10_11 = {};
	};
	$.k2l.m1a10_11.counter = 0;

	$.k2l.m1a10_11.dragWords = [];
	$("#m1a10_11").find(".ddsourceseated").each(function () {
		$.k2l.m1a10_11.dragWords.push($(this).html());
	});

	// Add drag and drop
	var dragDropAmount = $.k2l.m1a10_11.dragWords.length - 1;
	var selector = "#m1a10_11";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m1a10_11",
		nextPage: "#m1a10_12"
	};
	initDragDrop(selector, dragDropAmount, options);
}



Template.m1a10_12.events({

});

Template.m1a10_12.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a10_12 == 'undefined') {
		$.k2l.m1a10_12 = {};
	};
	$.k2l.m1a10_12.counter = 0;

	$.k2l.m1a10_12.dragWords = [];
	$("#m1a10_12").find(".ddsourceseated").each(function () {
		$.k2l.m1a10_12.dragWords.push($(this).html());
	});

	// Add drag and drop
	var dragDropAmount = $.k2l.m1a10_12.dragWords.length - 1;
	var selector = "#m1a10_12";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m1a10_12",
		nextPage: "#m1a10_13"
	};
	initDragDrop(selector, dragDropAmount, options);
}



Template.m1a10_13.events({

});

Template.m1a10_13.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a10_13 == 'undefined') {
		$.k2l.m1a10_13 = {};
	};
	$.k2l.m1a10_13.counter = 0;

	$.k2l.m1a10_13.dragWords = [];
	$("#m1a10_13").find(".ddsourceseated").each(function () {
		$.k2l.m1a10_13.dragWords.push($(this).html());
	});

	// Add drag and drop
	var dragDropAmount = $.k2l.m1a10_13.dragWords.length - 1;
	var selector = "#m1a10_13";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m1a10_13",
		nextPage: "#m1a10_14"
	};
	initDragDrop(selector, dragDropAmount, options);
}



Template.m1a10_14.events({

});

Template.m1a10_14.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a10_14 == 'undefined') {
		$.k2l.m1a10_14 = {};
	};
	$.k2l.m1a10_14.counter = 0;

	$.k2l.m1a10_14.dragWords = [];
	$("#m1a10_14").find(".ddsourceseated").each(function () {
		$.k2l.m1a10_14.dragWords.push($(this).html());
	});

	// Add drag and drop
	var dragDropAmount = $.k2l.m1a10_14.dragWords.length - 1;
	var selector = "#m1a10_14";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m1a10_14",
		nextPage: "#m1a10_15"
	};
	initDragDrop(selector, dragDropAmount, options);
}



Template.m1a10_15.events({

});

Template.m1a10_15.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a10_15 == 'undefined') {
		$.k2l.m1a10_15 = {};
	};
	$.k2l.m1a10_15.counter = 0;

	$.k2l.m1a10_15.dragWords = [];
	$("#m1a10_15").find(".ddsourceseated").each(function () {
		$.k2l.m1a10_15.dragWords.push($(this).html());
	});

	// Add drag and drop
	var dragDropAmount = $.k2l.m1a10_15.dragWords.length - 1;
	var selector = "#m1a10_15";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m1a10_15",
		nextPage: "#m1a10_16"
	};
	initDragDrop(selector, dragDropAmount, options);
}



Template.m1a10_16.events({

});

Template.m1a10_16.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a10_16 == 'undefined') {
		$.k2l.m1a10_16 = {};
	};
	$.k2l.m1a10_16.counter = 0;

	$.k2l.m1a10_16.dragWords = [];
	$("#m1a10_16").find(".ddsourceseated").each(function () {
		$.k2l.m1a10_16.dragWords.push($(this).html());
	});

	// Add drag and drop
	var dragDropAmount = $.k2l.m1a10_16.dragWords.length - 1;
	var selector = "#m1a10_16";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m1a10_16",
		nextPage: "#m1a10_17b"
	};
	initDragDrop(selector, dragDropAmount, options);
}



Template.m1a10_17b.events({

});

Template.m1a10_17b.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a10_17b == 'undefined') {
		$.k2l.m1a10_17b = {};

	};
	$.k2l.m1a10_17b.counter = 0;

	$.k2l.m1a10_17b.dragWords = [];
	$("#m1a10_17b").find(".ddsourceseated").each(function () {
		$.k2l.m1a10_17b.dragWords.push($(this).html());
	});

	// Add drag and drop
	var dragDropAmount = $.k2l.m1a10_17b.dragWords.length - 1;
	var selector = "#m1a10_17b";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m1a10_17b",
		nextPage: "#m1a10_18"
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m1a10_2.events({

	'click .pagination': function (evt) {
		var video = document.getElementById('m1a10_2Vid');
		video.currentTime = 0;
		video.pause();
	}

});

Template.m1a10_2b.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m1a10_2b.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m1a10_2b.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m1a10_2b.sound.src = {};
	}

});

Template.m1a10_2b.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a10_2b == 'undefined') {
		$.k2l.m1a10_2b = {};
	};

	$.k2l.m1a10_2b.sound = new Audio();
}

Template.m1a10_4.events({

});

Template.m1a10_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a10_4 == 'undefined') {
		$.k2l.m1a10_4 = {};
	};
	$.k2l.m1a10_4.counter = 0;

	$.k2l.m1a10_4.dragWords = [];
	$("#m1a10_4").find(".ddsourceseated").each(function () {
		$.k2l.m1a10_4.dragWords.push($(this).html());
	});

	// Add drag and drop
	var dragDropAmount = $.k2l.m1a10_4.dragWords.length - 1;
	//var dragDropAmount = 5;
	var selector = "#m1a10_4";
	var options = {
		multiAns: false,
		autoNav: true,
		currPage: "#m1a10_4",
		nextPage: "#m1a10_5"
	};
	initDragDrop(selector, dragDropAmount, options);
}



Template.m1a10_5.events({

});

Template.m1a10_5.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a10_5 == 'undefined') {
		$.k2l.m1a10_5 = {};
	};
	$.k2l.m1a10_5.counter = 0;

	$.k2l.m1a10_5.dragWords = [];
	$("#m1a10_5").find(".ddsourceseated").each(function () {
		$.k2l.m1a10_5.dragWords.push($(this).html());
	});

	// Add drag and drop
	var dragDropAmount = $.k2l.m1a10_5.dragWords.length - 1;
	var selector = "#m1a10_5";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m1a10_5",
		nextPage: "#m1a10_6"
	};
	initDragDrop(selector, dragDropAmount, options);
}



Template.m1a10_6.events({

});

Template.m1a10_6.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a10_6 == 'undefined') {
		$.k2l.m1a10_6 = {};
	};

	$.k2l.m1a10_6.counter = 0;

	$.k2l.m1a10_6.dragWords = [];
	$("#m1a10_6").find(".ddsourceseated").each(function () {
		$.k2l.m1a10_6.dragWords.push($(this).html());
	});

	// Add drag and drop
	var dragDropAmount = $.k2l.m1a10_6.dragWords.length - 1;
	var selector = "#m1a10_6";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m1a10_6",
		nextPage: "#m1a10_7"
	};
	initDragDrop(selector, dragDropAmount, options);
}



Template.m1a10_7.events({

});

Template.m1a10_7.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a10_7 == 'undefined') {
		$.k2l.m1a10_7 = {};
	};

	$.k2l.m1a10_7.counter = 0;

	$.k2l.m1a10_7.dragWords = [];
	$("#m1a10_7").find(".ddsourceseated").each(function () {
		$.k2l.m1a10_7.dragWords.push($(this).html());
	});

	// Add drag and drop
	var dragDropAmount = $.k2l.m1a10_7.dragWords.length - 1;
	var selector = "#m1a10_7";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m1a10_7",
		nextPage: "#m1a10_8"
	};
	initDragDrop(selector, dragDropAmount, options);
}



Template.m1a10_8.events({

});

Template.m1a10_8.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a10_8 == 'undefined') {
		$.k2l.m1a10_8 = {};
	};

	$.k2l.m1a10_8.counter = 0;

	$.k2l.m1a10_8.dragWords = [];
	$("#m1a10_8").find(".ddsourceseated").each(function () {
		$.k2l.m1a10_8.dragWords.push($(this).html());
	});

	// Add drag and drop
	var dragDropAmount = $.k2l.m1a10_8.dragWords.length - 1;
	var selector = "#m1a10_8";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m1a10_8",
		nextPage: "#m1a10_9"
	};
	initDragDrop(selector, dragDropAmount, options);
}



Template.m1a10_9.events({

});

Template.m1a10_9.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a10_9 == 'undefined') {
		$.k2l.m1a10_9 = {};
	};
	$.k2l.m1a10_9.counter = 0;

	$.k2l.m1a10_9.dragWords = [];
	$("#m1a10_9").find(".ddsourceseated").each(function () {
		$.k2l.m1a10_9.dragWords.push($(this).html());
	});

	// Add drag and drop
	var dragDropAmount = $.k2l.m1a10_9.dragWords.length - 1;
	var selector = "#m1a10_9";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m1a10_9",
		nextPage: "#m1a10_10"
	};
	initDragDrop(selector, dragDropAmount, options);
}


