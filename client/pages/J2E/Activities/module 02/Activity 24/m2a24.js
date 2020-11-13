Template.m2a24.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m2a24_end') {
			return false;
		}
		return true;
	},

	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a24");
	}
});

Template.m2a24.events({
	"click #m2a24hearagain": function (evt) {
		setTimeout(function () {
			$("#m2a24_modal video")[0].play();
		}, 500);
		stopAllAudio();
	},

	"click .stuck-button": function (evt) {

		var currentSection = $(evt.currentTarget).parents('section');
		var nextSection = $(evt.currentTarget).parents('section').next('section');

		$('form.textentry').parent().html('<span class="correctword"> ' + $.k2l.m2a24.displayAnswers[$.k2l.m2a24.index] + ' </span>');
		$('.incorrectscreen').addClass("hidden"); // Remove a cross if there is one.


		$.k2l.m2a24.index++; //increment the counter
		$(".stuck").addClass('hidden'); // Hide the stuck button if it is visible

		setTimeout(function () {
			$('.correctscreen').addClass("hidden");
			$('.incorrectscreen').addClass("hidden");
			stopVideo();

			stopAllAudio();
			currentSection.addClass('hidden'); // hide this page
			nextSection.removeClass('hidden');// reveal next page
			document.location.hash = nextSection.attr('id'); // change the hash
			Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
		}, 4000);

		$.k2l.m2a24.wrongCount = 0; // reset the wrongCount


	},

	"submit form": function (evt) {
		if (evt.preventDefault) {
			evt.preventDefault();
		}
		var isCorrect = false;

		// Tidy up the user's input
		var userText = evt.target.userText.value;
		if (userText.charAt(userText.length - 1) == '.') {
			userText = userText.substr(0, userText.length - 1);
		}
		userText = $.trim(userText);
		userText = userText.toLowerCase();

		// Check if the answer is correct
		for (var i = 0; i < $.k2l.m2a24.correctAnswers[$.k2l.m2a24.index].length; i++) {
			if (userText == $.k2l.m2a24.correctAnswers[$.k2l.m2a24.index][i]) {
				isCorrect = true;
				break;
			}
		}

		if (isCorrect) {

			var currentSection = $(evt.currentTarget).parents('section');
			var nextSection = $(evt.currentTarget).parents('section').next('section');

			$(evt.currentTarget).parent().html('<span class="correctword">' + $.k2l.m2a24.displayAnswers[$.k2l.m2a24.index] + ' </span>');
			$('.incorrectscreen').addClass("hidden"); // Remove a cross if there is one.
			$('.correctscreen').removeClass("hidden");

			$.k2l.m2a24.index++; //increment the counter
			$(".stuck").addClass('hidden'); // Hide the stuck button if it is visible

			setTimeout(function () {
				$('.correctscreen').addClass("hidden");
				$('.incorrectscreen').addClass("hidden");
				stopVideo();
				stopAllAudio();
				currentSection.addClass('hidden'); // hide this page
				nextSection.removeClass('hidden');// reveal next page
				document.location.hash = nextSection.attr('id'); // change the hash
				Session.set("activeSection", '#' + nextSection.attr('id')); // set the active Section
			}, 1500);

			$.k2l.m2a24.wrongCount = 0; // reset the wrongCount
		} else {

			// Incorrect Answer
			$('.incorrectscreen').removeClass("hidden");
			setTimeout(function () {
				$('.incorrectscreen').addClass("hidden");
			}, 1000)
			$.k2l.m2a24.wrongCount++;

			if ($.k2l.m2a24.wrongCount >= 1) {
				$(".stuck").removeClass('hidden');

				$.k2l.m2a24.wrongCount = 0;
			}
		}
	},

	'click a.restart': function (evt) {
		// When clicking to restart the activity this should reset the variables to
		// initial values.

		if (typeof $.k2l != 'undefined') {
			if (typeof $.k2l.m2a24 != 'undefined') {
				if (typeof $.k2l.m2a24.index != 'undefined') {
					$.k2l.m2a24.index = 0;
				}
				if (typeof $.k2l.m2a24.wrongCount != 'undefined') {
					$.k2l.m2a24.wrongCount = 0;
				}
			}
		}
	}

})

Template.m2a24.rendered = function () {

	document.title = "Journey 2 English";
	
	setStartActivity(2, 24);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 24, subpage);
			oldLocation = location.href;
		}
	}, 500);

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a24 == 'undefined') {
		$.k2l.m2a24 = {};
	};

	// the actual answers in acceptable form (after lowercase and trimming)
	var correctAnswers = [
		["book"],
		["date"],
		["round"],
		["return"],
		["direct"],
		["outward"],
		["gets"],
		["about"],
		["price"],
		["peak"],
		["valid"]
	]

	// The answers as they should be displayed
	var displayAnswers = ["book", "date", "round", "return", "direct", "outward", "gets",
		"about", "price", "Peak", "valid"];

	$.k2l.m2a24.index = 0;
	$.k2l.m2a24.correctAnswers = correctAnswers;
	$.k2l.m2a24.displayAnswers = displayAnswers;
	$.k2l.m2a24.wrongCount = 0;

	$.k2l.m2a24.videoPlaying = false;

	$("#m2a24_modal").on("click", function (event) {
		if (event.target == this || $(event.target).is('span')) {
			$("#m2a24_modal video")[0].pause();
		}
	});
}


Template.m2a24.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 24, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m2a24.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m2a24_1.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a24_1");
	}
})

Template.m2a24_10.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a24_10");
	}
})

Template.m2a24_10.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m2a24_10.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a24_10.sound, $(evt.currentTarget));
		stopVideo();
	},

	'click .pagination': function (evt) {
		stopAllAudio();
	}

});

Template.m2a24_10.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a24_10 == 'undefined') {
		$.k2l.m2a24_10 = {};
	};

	$.k2l.m2a24_10.sound = new Audio();
}


Template.m2a24_11.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a24_11");
	}
})

Template.m2a24_11.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m2a24_11.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a24_11.sound, $(evt.currentTarget));
		stopVideo();
	},

	'click .pagination': function (evt) {

		stopAllAudio();
	}

});

Template.m2a24_11.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a24_11 == 'undefined') {
		$.k2l.m2a24_11 = {};
	};

	$.k2l.m2a24_11.sound = new Audio();
}


Template.m2a24_12.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a24_12");
	}
})

Template.m2a24_12.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m2a24_12.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a24_12.sound, $(evt.currentTarget));
		stopVideo();
	},

	'click .pagination': function (evt) {

		stopAllAudio();
	}

});

Template.m2a24_12.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a24_12 == 'undefined') {
		$.k2l.m2a24_12 = {};
	};

	$.k2l.m2a24_12.sound = new Audio();
}


Template.m2a24_13.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a24_13");
	}
})

Template.m2a24_13.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m2a24_13.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a24_13.sound, $(evt.currentTarget));
		stopVideo();
	},

	'click .pagination': function (evt) {

		stopAllAudio();
	}

});

Template.m2a24_13.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a24_13 == 'undefined') {
		$.k2l.m2a24_13 = {};
	};

	$.k2l.m2a24_13.sound = new Audio();
}


Template.m2a24_14.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a24_14");
	}
})

Template.m2a24_14.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m2a24_14.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a24_14.sound, $(evt.currentTarget));
		stopVideo();
	},

	'click .pagination': function (evt) {

		stopAllAudio();
	}

});

Template.m2a24_14.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a24_14 == 'undefined') {
		$.k2l.m2a24_14 = {};
	};

	$.k2l.m2a24_14.sound = new Audio();
}


Template.m2a24_15.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a24_15");
	}
})

Template.m2a24_15.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m2a24_15.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a24_15.sound, $(evt.currentTarget));
		stopVideo();
	},

	'click .pagination': function (evt) {

		stopAllAudio();
	}

});

Template.m2a24_15.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a24_15 == 'undefined') {
		$.k2l.m2a24_15 = {};
	};

	$.k2l.m2a24_15.sound = new Audio();
}


Template.m2a24_16.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a24_16");
	}
})

Template.m2a24_16.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m2a24_16.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a24_16.sound, $(evt.currentTarget));
		stopVideo();
	},

	'click .pagination': function (evt) {

		stopAllAudio();
	}

});

Template.m2a24_16.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a24_16 == 'undefined') {
		$.k2l.m2a24_16 = {};
	};

	$.k2l.m2a24_16.sound = new Audio();
}


Template.m2a24_17.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a24_17");
	}
})

Template.m2a24_17.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m2a24_17.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a24_17.sound, $(evt.currentTarget));
		stopVideo();
	},

	'click .pagination': function (evt) {

		stopAllAudio();
	}

});

Template.m2a24_17.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a24_17 == 'undefined') {
		$.k2l.m2a24_17 = {};
	};

	$.k2l.m2a24_17.sound = new Audio();
}


Template.m2a24_18.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a24_18");
	}
})

Template.m2a24_18.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m2a24_18.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a24_18.sound, $(evt.currentTarget));
		stopVideo();
	},

	'click .pagination': function (evt) {

		stopAllAudio();
	}

});

Template.m2a24_18.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a24_18 == 'undefined') {
		$.k2l.m2a24_18 = {};
	};

	$.k2l.m2a24_18.sound = new Audio();
}


Template.m2a24_19.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a24_19");
	}
})

Template.m2a24_19.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m2a24_19.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a24_19.sound, $(evt.currentTarget));
		stopVideo();
	},

	'click .pagination': function (evt) {

		stopAllAudio();
	}

});

Template.m2a24_19.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a24_19 == 'undefined') {
		$.k2l.m2a24_19 = {};
	};

	$.k2l.m2a24_19.sound = new Audio();
}


Template.m2a24_2.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a24_2");
	}
})

Template.m2a24_2.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m2a24_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a24_2.sound, $(evt.currentTarget));
		stopVideo();
	},

	'click .pagination': function (evt) {

		stopAllAudio();
	}

});

Template.m2a24_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a24_2 == 'undefined') {
		$.k2l.m2a24_2 = {};
	};

	$.k2l.m2a24_2.sound = new Audio();
}


Template.m2a24_20.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a24_20");
	}
})

Template.m2a24_20.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m2a24_20.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a24_20.sound, $(evt.currentTarget));
		stopVideo();
	},

	'click .pagination': function (evt) {

		stopAllAudio();
	}

});

Template.m2a24_20.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a24_20 == 'undefined') {
		$.k2l.m2a24_20 = {};
	};

	$.k2l.m2a24_20.sound = new Audio();
}


Template.m2a24_21.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a24_21");
	}
})

Template.m2a24_21.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m2a24_21.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a24_21.sound, $(evt.currentTarget));
		stopVideo();
	},

	'click .pagination': function (evt) {

		stopAllAudio();
	}

});

Template.m2a24_21.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a24_21 == 'undefined') {
		$.k2l.m2a24_21 = {};
	};

	$.k2l.m2a24_21.sound = new Audio();
}


Template.m2a24_22.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a24_22");
	}
})

Template.m2a24_22.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m2a24_22.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a24_22.sound, $(evt.currentTarget));
		stopVideo();
	},

	'click .pagination': function (evt) {

		stopAllAudio();
		setTimeout(function () {
			$('#welldonecap').removeClass('hidden');
			$("#m2a24_end").removeClass('hidden');
		}, 100);
	},

	'click .navfooter a': function (evt) {

		setTimeout(function () {
			$.k2l.m2a24.index = 0;
			$('#welldonecap').addClass('hidden');
			document.location.hash = $("#m2a24_end").attr('id');
			Session.set("activeSection", '#' + $("#m2a24_end").attr('id'));
		}, 2700);
	}
});

Template.m2a24_22.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a24_22 == 'undefined') {
		$.k2l.m2a24_22 = {};
	};

	$.k2l.m2a24_22.sound = new Audio();
}


Template.m2a24_3.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a24_3");
	}
})

Template.m2a24_3.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m2a24_3.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a24_3.sound, $(evt.currentTarget));
		stopVideo();
	},

	'click .pagination': function (evt) {

		stopAllAudio();
	}

});

Template.m2a24_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a24_3 == 'undefined') {
		$.k2l.m2a24_3 = {};
	};

	$.k2l.m2a24_3.sound = new Audio();
}


Template.m2a24_4.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a24_4");
	}
})

Template.m2a24_4.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m2a24_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a24_4.sound, $(evt.currentTarget));
		stopVideo();
	},

	'click .pagination': function (evt) {

		stopAllAudio();
	}

});

Template.m2a24_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a24_4 == 'undefined') {
		$.k2l.m2a24_4 = {};
	};

	$.k2l.m2a24_4.sound = new Audio();
}


Template.m2a24_5.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a24_5");
	}
})

Template.m2a24_5.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m2a24_5.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a24_5.sound, $(evt.currentTarget));
		stopVideo();
	},

	'click .pagination': function (evt) {

		stopAllAudio();
	}

});

Template.m2a24_5.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a24_5 == 'undefined') {
		$.k2l.m2a24_5 = {};
	};

	$.k2l.m2a24_5.sound = new Audio();
}


Template.m2a24_6.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a24_6");
	}
})

Template.m2a24_6.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m2a24_6.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a24_6.sound, $(evt.currentTarget));
		stopVideo();
	},

	'click .pagination': function (evt) {

		stopAllAudio();
	}

});

Template.m2a24_6.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a24_6 == 'undefined') {
		$.k2l.m2a24_6 = {};
	};

	$.k2l.m2a24_6.sound = new Audio();
}


Template.m2a24_7.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a24_7");
	}
})

Template.m2a24_7.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m2a24_7.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a24_7.sound, $(evt.currentTarget));
		stopVideo();
	},

	'click .pagination': function (evt) {

		stopAllAudio();
	}

});

Template.m2a24_7.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a24_7 == 'undefined') {
		$.k2l.m2a24_7 = {};
	};

	$.k2l.m2a24_7.sound = new Audio();
}


Template.m2a24_8.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a24_8");
	}
})

Template.m2a24_8.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m2a24_8.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a24_8.sound, $(evt.currentTarget));
		stopVideo();
	},

	'click .pagination': function (evt) {

		stopAllAudio();
	}

});

Template.m2a24_8.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a24_8 == 'undefined') {
		$.k2l.m2a24_8 = {};
	};

	$.k2l.m2a24_8.sound = new Audio();
}


Template.m2a24_9.helpers({
	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a24_9");
	}
})

Template.m2a24_9.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m2a24_9.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a24_9.sound, $(evt.currentTarget));
		stopVideo();
	},

	'click .pagination': function (evt) {

		stopAllAudio();
	}

});

Template.m2a24_9.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a24_9 == 'undefined') {
		$.k2l.m2a24_9 = {};
	};

	$.k2l.m2a24_9.sound = new Audio();
}

Template.m2a24_modal.events( {
	'click .close': function(evt) {
		stopVideo();
	}
})

var stopVideo = function(){
	var video = $("#m2a24_modal video")[0];
	video.pause();
	video.currentTime = 0;
}

var stopAllAudio = function(){
	$.k2l.m2a24_2.sound.src = {};
	$.k2l.m2a24_3.sound.src = {};
	$.k2l.m2a24_4.sound.src = {};
	$.k2l.m2a24_5.sound.src = {};
	$.k2l.m2a24_6.sound.src = {};
	$.k2l.m2a24_7.sound.src = {};
	$.k2l.m2a24_8.sound.src = {};
	$.k2l.m2a24_9.sound.src = {};
	$.k2l.m2a24_10.sound.src = {};
	$.k2l.m2a24_11.sound.src = {};
	$.k2l.m2a24_12.sound.src = {};
	$.k2l.m2a24_13.sound.src = {};
	$.k2l.m2a24_14.sound.src = {};
	$.k2l.m2a24_15.sound.src = {};
	$.k2l.m2a24_16.sound.src = {};
	$.k2l.m2a24_17.sound.src = {};
	$.k2l.m2a24_18.sound.src = {};
	$.k2l.m2a24_19.sound.src = {};
	$.k2l.m2a24_20.sound.src = {};
	$.k2l.m2a24_21.sound.src = {};
	$.k2l.m2a24_22.sound.src = {};
	$('.buttonaudio').removeClass('is-playing');
}