Template.m3a10.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 3, 10, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m3a10.rendered = function () {
	document.title = "Journey 2 English";

	setStartActivity(3, 10);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(3, 10, subpage);
			oldLocation = location.href;
		}
	}, 500);

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m2a12 == 'undefined') {
		$.k2l.m3a10 = {};
	};
	
	$.k2l.m3a10.sound = new Audio();

}

Template.m3a10.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m3a10_end') {
			return false;
		}
		return true;
	},

	activeSection: function () {
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m3a10");
	}
});

Template.m3a10.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m3a10.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m3a10.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {
		$.k2l.m3a10.sound.src = {};
	}

});

Template.m3a10.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m3a10_3.helpers( {
    activeSection: function () {
		return Session.get("activeSection");
	}
});

Template.m3a10_3.rendered = function () {
	// Add drag and drop

	setTimeout(function () {
		var dragDropAmount = 1;
		var selector = "#m3a10_3";
		var options = {
			multiAns: false,
			autoNav: false,
			currAudio: $.k2l.m3a10.sound
		};
		initDragDrop(selector, dragDropAmount, options);
	}, 1000);
}


Template.m3a10_3.events({
	"click .button1": function (evt) {
		$('.incorrectscreen').removeClass('hidden');
		setTimeout(function () {
			$('.incorrectscreen').addClass('hidden');
		}, 1000);
	}
});

Template.m3a10_4.helpers( {
    activeSection: function () {
		return Session.get("activeSection");
	}
});

Template.m3a10_4.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m3a10_4";
	setTimeout(function () {
		var options = {
			multiAns: false,
			autoNav: false,
			currAudio: $.k2l.m3a10.sound
		};
		initDragDrop(selector, dragDropAmount, options);
	}, 1000);
}


Template.m3a10_4.events({
	"click .button1": function (evt) {
		$('.incorrectscreen').removeClass('hidden');
		setTimeout(function () {
			$('.incorrectscreen').addClass('hidden');
		}, 1000);
	}
});

Template.m3a10_5.helpers( {
    activeSection: function () {
		return Session.get("activeSection");
	}
});

Template.m3a10_5.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m3a10_5";
	var options = {
		multiAns: false,
		autoNav: false,
		currAudio: $.k2l.m3a10.sound
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m3a10_5.events({
	"click .button1": function (evt) {
		$('.incorrectscreen').removeClass('hidden');
		setTimeout(function () {
			$('.incorrectscreen').addClass('hidden');
		}, 1000);
	}
});

Template.m3a10_6.helpers( {
    activeSection: function () {
		return Session.get("activeSection");
	}
});

Template.m3a10_6.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a10_6 == 'undefined') {
		$.k2l.m3a10_6 = {};
	};

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m3a10_6";
	setTimeout(function () {
		var options = {
			multiAns: false,
			autoNav: false,
			currAudio: $.k2l.m3a10.sound
		};
		initDragDrop(selector, dragDropAmount, options);
	}, 1000);
	$.k2l.m3a10_6.counter = 0;

	$.k2l.m3a10_6.answer = '<a draggable="false" href="#" title="" data-toggle="popover" data-popover="m3a10" role="button" tabindex="0"  data-trigger="manual" data-placement="top" data-content="This is the correct tense">lands</a>';
	$.k2l.m3a10_6.buttonRight = true;
	$.k2l.m3a10_6.max = 1; // number of drag spaces on this page.
}

Template.m3a10_6.events({
	"click .button1": function (evt) {
		if ($.k2l.m3a10_6.buttonRight) {
			$.k2l.m3a10_6.counter++
			var parentSection = $(evt.currentTarget).parents('section');

			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
			}, 1000);

			$('#m3a10_6 #target1').removeClass('ddwidth12 dd1line2high');
			$('#m3a10_6 #target1').removeClass('ddseatedtarget');
			$('#m3a10_6 #target1').html('');
			$('#m3a10_6 .incorrectword').addClass('correctword');
			$('#m3a10_6 .incorrectword').removeClass('incorrectword');
			$('#m3a10_6 .correctword').html($.k2l.m3a10_6.answer);
			setTimeout(function () {
				$('#m3a10_6 [data-popover="m3a10"]').popover('show');
			}, 1000);
			$('#m3a10_6 .buttonaudio').addClass('faded');
			$('#m3a10_6 .button1').addClass('noclick');
			if ($.k2l.m3a10_6.counter == $.k2l.m3a10_6.max) {
				$.k2l.m3a10_6.counter = 0;
				// Load the next page automatically
				setTimeout(function () {
					$('#welldonecap').removeClass('hidden');
				}, 1000);
				setTimeout(function () {
					$('#welldonecap').addClass('hidden');
					$.k2l.m3a10.sound.src = {};
				}, 2000);
				setTimeout(function () {
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden'); // reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
				}, 4000);
				// $('.pagination').removeClass('hidden');
			};
		} else {
			$('.incorrectscreen').removeClass('hidden');
			setTimeout(function () {
				$('.incorrectscreen').addClass('hidden');
			}, 1000);
		};
	},

	"click .pagination": function (evt) {
		$.k2l.m3a10_6.counter = 0;
	}
});

Template.m3a10_7.helpers( {
    activeSection: function () {
		return Session.get("activeSection");
	}
});

Template.m3a10_7.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 1;
	setTimeout(function () {
		var selector = "#m3a10_7";
		var options = {
			multiAns: false,
			autoNav: false,
			currAudio: $.k2l.m3a10.sound
		};
		initDragDrop(selector, dragDropAmount, options);
	}, 1000);
}

Template.m3a10_7.events({
	"click .button1": function (evt) {
		$('.incorrectscreen').removeClass('hidden');
		setTimeout(function () {
			$('.incorrectscreen').addClass('hidden');
		}, 1000);
	}
});

Template.m3a10_8.helpers( {
    activeSection: function () {
		return Session.get("activeSection");
	}
});

Template.m3a10_8.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m3a10_8";
	setTimeout(function () {
		var options = {
			multiAns: false,
			autoNav: false,
			currAudio: $.k2l.m3a10.sound
		};
		initDragDrop(selector, dragDropAmount, options);
	}, 1000);
}

Template.m3a10_8.events({
	"click .button1": function (evt) {
		$('.incorrectscreen').removeClass('hidden');
		setTimeout(function () {
			$('.incorrectscreen').addClass('hidden');
		}, 1000);
	}
});

Template.m3a10_9.helpers( {
    activeSection: function () {
		return Session.get("activeSection");
	}
});

Template.m3a10_9.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a10_9 == 'undefined') {
		$.k2l.m3a10_9 = {};
	};

	// Add drag and drop
	var dragDropAmount = 1;
	setTimeout(function () {
		var selector = "#m3a10_9";
		var options = {
			multiAns: false,
			autoNav: false,
			currAudio: $.k2l.m3a10.sound
		};
		initDragDrop(selector, dragDropAmount, options);
	}, 1000);
	$.k2l.m3a10_9.counter = 0;

	$.k2l.m3a10_9.answer = '<a draggable="false" href="#" title="" data-toggle="popover" data-popover="m3a10" role="button" tabindex="0"  data-trigger="manual" data-placement="top" data-content="This is the correct tense">That&#00039;ll be great.</a>';
	$.k2l.m3a10_9.buttonRight = true;
	$.k2l.m3a10_9.max = 1; // number of drag spaces on this page.
}

Template.m3a10_9.events({
	"click .button1": function (evt) {
		if ($.k2l.m3a10_9.buttonRight) {
			$.k2l.m3a10_9.counter++
			var parentSection = $(evt.currentTarget).parents('section');

			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
			}, 1000);

			$('#m3a10_9 #target1').removeClass('ddwidth12 dd1line2high');
			$('#m3a10_9 #target1').removeClass('ddseatedtarget');
			$('#m3a10_9 #target1').html('');
			$('#m3a10_9 .incorrectword').addClass('correctword');
			$('#m3a10_9 .incorrectword').removeClass('incorrectword');
			$('#m3a10_9 .correctword').html($.k2l.m3a10_9.answer);
			setTimeout(function () {
				$('#m3a10_9 [data-popover="m3a10"]').popover('show');
			}, 1000);
			$('#m3a10_9 .buttonaudio').addClass('faded');
			$('#m3a10_9 .button1').addClass('noclick');
			if ($.k2l.m3a10_9.counter == $.k2l.m3a10_9.max) {
				$.k2l.m3a10_9.counter = 0;
				// Load the next page automatically
				setTimeout(function () {
					$('#welldonecap').removeClass('hidden');
				}, 1000);
				setTimeout(function () {
					$('#welldonecap').addClass('hidden');
					$.k2l.m3a10.sound.src = {};
				}, 2000);
				setTimeout(function () {

					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden'); // reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
				}, 4000);
				// $('.pagination').removeClass('hidden');
			};
		} else {
			$('.incorrectscreen').removeClass('hidden');
			setTimeout(function () {
				$('.incorrectscreen').addClass('hidden');
			}, 1000);
		};
	},

	"click .pagination": function (evt) {
		// $.k2l.m3a10_9.draggedElement = {};
		$.k2l.m3a10_9.counter = 0;
	}
});

Template.m3a10_10.helpers( {
    activeSection: function () {
		return Session.get("activeSection");
	}
});

Template.m3a10_10.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a10_10 == 'undefined') {
		$.k2l.m3a10_10 = {};
	};

	// Add drag and drop
	setTimeout(function () {
		var dragDropAmount = 1;
		var selector = "#m3a10_10";
		var options = {
			multiAns: false,
			autoNav: false,
			currAudio: $.k2l.m3a10.sound
		};
		initDragDrop(selector, dragDropAmount, options);
	}, 1000);
	$.k2l.m3a10_10.counter = 0;

	$.k2l.m3a10_10.answer = '<a draggable="false" href="#" title="" data-toggle="popover" data-popover="m3a10" role="button" tabindex="0"  data-trigger="manual" data-placement="top" data-content="This is the correct tense">I&#00039;ll bring</a>';
	$.k2l.m3a10_10.buttonRight = true;
	$.k2l.m3a10_10.max = 1; // number of drag spaces on this page.
}

Template.m3a10_10.events({
	"click .button1": function (evt) {
		if ($.k2l.m3a10_10.buttonRight) {
			$.k2l.m3a10_10.counter++
			var parentSection = $(evt.currentTarget).parents('section');

			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
			}, 1000);

			$('#m3a10_10 #target1').removeClass('ddwidth12 dd1line2high');
			$('#m3a10_10 #target1').removeClass('ddseatedtarget');
			$('#m3a10_10 #target1').html('');
			$('#m3a10_10 .incorrectword').addClass('correctword');
			$('#m3a10_10 .incorrectword').removeClass('incorrectword');
			$('#m3a10_10 .correctword').html($.k2l.m3a10_10.answer);
			setTimeout(function () {
				$('#m3a10_10 [data-popover="m3a10"]').popover('show');
			}, 1000);
			$('#m3a10_10 .buttonaudio').addClass('faded');
			$('#m3a10_10 .button1').addClass('noclick');
			if ($.k2l.m3a10_10.counter == $.k2l.m3a10_10.max) {
				$.k2l.m3a10_10.counter = 0;
				// Load the next page automatically
				setTimeout(function () {
					$('#welldonecap').removeClass('hidden');
				}, 1000);
				setTimeout(function () {
					$.k2l.m3a10.sound.src = {};
					$('#welldonecap').addClass('hidden');
				}, 2000);
				setTimeout(function () {
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden'); // reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
				}, 4000);
				// $('.pagination').removeClass('hidden');
			};
		} else {
			$('.incorrectscreen').removeClass('hidden');
			setTimeout(function () {
				$('.incorrectscreen').addClass('hidden');
			}, 1000);
		};
	},

	"click .pagination": function (evt) {
		$.k2l.m3a10_10.counter = 0;
	}
});

Template.m3a10_11.helpers( {
    activeSection: function () {
		return Session.get("activeSection");
	}
});

Template.m3a10_11.rendered = function () {
	// Add drag and drop
	setTimeout(function () {
		var dragDropAmount = 1;
		var selector = "#m3a10_11";
		var options = {
			multiAns: false,
			autoNav: false,
			currAudio: $.k2l.m3a10.sound
		};
		initDragDrop(selector, dragDropAmount, options);
	}, 1000);
}

Template.m3a10_11.events({
	"click .button1": function (evt) {
		$('.incorrectscreen').removeClass('hidden');
		setTimeout(function () {
			$('.incorrectscreen').addClass('hidden');
		}, 1000);
	}
});

Template.m3a10_12.helpers( {
    activeSection: function () {
		return Session.get("activeSection");
	}
});

Template.m3a10_12.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m3a10_12 == 'undefined') {
		$.k2l.m3a10_12 = {};
	};

	// Add drag and drop
	var dragDropAmount = 1;
	var selector = "#m3a10_12";
	setTimeout(function () {
		var options = {
			multiAns: false,
			autoNav: false,
			currAudio: $.k2l.m3a10.sound
		};
		initDragDrop(selector, dragDropAmount, options);
	}, 1000);
	$.k2l.m3a10_12.counter = 0;

	$.k2l.m3a10_12.answer = '<a draggable="false" href="#" title="" data-toggle="popover" data-popover="m3a10" role="button" tabindex="0"  data-trigger="manual" data-placement="top" data-content="This is the correct tense">I’ll look forward to that.</a>';
	$.k2l.m3a10_12.buttonRight = true;
	$.k2l.m3a10_12.max = 1; // number of drag spaces on this page.
}

Template.m3a10_12.events({
	"click .button1": function (evt) {
		if ($.k2l.m3a10_12.buttonRight) {
			$.k2l.m3a10_12.counter++
			var parentSection = $(evt.currentTarget).parents('section');

			$('.correctscreen').removeClass('hidden');
			setTimeout(function () {
				$('.correctscreen').addClass('hidden');
			}, 1000);

			$('#m3a10_12 #target1').removeClass('ddwidth12 dd2lines');
			$('#m3a10_12 #target1').removeClass('ddseatedtarget');
			$('#m3a10_12 #target1').html('');
			$('#m3a10_12 .incorrectword').addClass('correctword');
			$('#m3a10_12 .incorrectword').removeClass('incorrectword');
			$('#m3a10_12 .correctword').html($.k2l.m3a10_12.answer);
			setTimeout(function () {
				$('#m3a10_12 [data-popover="m3a10"]').popover('show');
			}, 1000);
			$('#m3a10_12 .buttonaudio').addClass('faded');
			$('#m3a10_12 .button1').addClass('noclick');

			if ($.k2l.m3a10_12.counter == $.k2l.m3a10_12.max) {
				$.k2l.m3a10_12.counter = 0;
				// Load the next page automatically
				setTimeout(function () {
					$('#welldonecap').removeClass('hidden');
				}, 1000);
				setTimeout(function () {
					$('#welldonecap').addClass('hidden');
					$.k2l.m3a10.sound.src = {};
				}, 2000);
				setTimeout(function () {

					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden'); // reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
				}, 4000);
				// $('.pagination').removeClass('hidden');
			};
		} else {
			$('.incorrectscreen').removeClass('hidden');
			setTimeout(function () {
				$('.incorrectscreen').addClass('hidden');
			}, 1000);
		};
	},

	"click .pagination": function (evt) {
		$.k2l.m3a10_12.counter = 0;
	}
});
//"Nice code" - rate it 10/10 Kappa - Daniel