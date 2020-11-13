Template.m7a5.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m7a5_end') {
			return false;
		}
		return true;
	}
});

Template.m7a5.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(7, 5);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(7, 5, subpage);
			oldLocation = location.href;
		}
	}, 500);

}
Template.m7a5_1.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a5_1");
	}
});

Template.m7a5_1.events({
	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.m7a5_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m7a5_1.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {

		$.k2l.m7a5_1.sound.src = {};
	}
});

Template.m7a5_1.rendered = function () {
	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m7a5_1 == 'undefined') {
		$.k2l.m7a5_1 = {};
	};

	$.k2l.m7a5_1.sound = new Audio();
}



Template.m7a5_2.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a5_2");
	}
});


Template.m7a5_2.events({

	"click .pagination": function (evt) {
		$.k2l.m7a5_2.draggedElement = {};
		$.k2l.m7a5_2.counter = 0;
	}

});

Template.m7a5_2.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m7a5_2 == 'undefined') {
		$.k2l.m7a5_2 = {};
	};


	$.k2l.m7a5_2.draggedElement = {};
	$.k2l.m7a5_2.counter = 0;

	// $.k2l.m7a5_2.max = 6; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 6;
	var selector = "#m7a5_2";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a5_2",
		nextPage: "#m7a5_3"
	};
	initDragDrop(selector, dragDropAmount, options);
}



Template.m7a5_3.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a5_3");
	}
});


Template.m7a5_3.events({

	"click .pagination": function (evt) {
		$.k2l.m7a5_3.draggedElement = {};
		$.k2l.m7a5_3.counter = 0;
	}

});

Template.m7a5_3.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m7a5_3 == 'undefined') {
		$.k2l.m7a5_3 = {};
	};


	$.k2l.m7a5_3.draggedElement = {};
	$.k2l.m7a5_3.counter = 0;

	// $.k2l.m7a5_3.max = 5; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m7a5_3";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a5_3",
		nextPage: "#m7a5_4"
	};
	initDragDrop(selector, dragDropAmount, options);
}



Template.m7a5_4.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a5_4");
	}
});


Template.m7a5_4.events({

	"click .pagination": function (evt) {
		$.k2l.m7a5_4.draggedElement = {};
		$.k2l.m7a5_4.counter = 0;
	}

});

Template.m7a5_4.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m7a5_4 == 'undefined') {
		$.k2l.m7a5_4 = {};
	};


	$.k2l.m7a5_4.draggedElement = {};
	$.k2l.m7a5_4.counter = 0;

	// $.k2l.m7a5_4.max = 4; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 4;
	var selector = "#m7a5_4";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a5_4",
		nextPage: "#m7a5_5"
	};
	initDragDrop(selector, dragDropAmount, options);
}



Template.m7a5_5.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a5_5");
	}
});


Template.m7a5_5.events({

	"click .pagination": function (evt) {
		$.k2l.m7a5_5.draggedElement = {};
		$.k2l.m7a5_5.counter = 0;
	}

});

Template.m7a5_5.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m7a5_5 == 'undefined') {
		$.k2l.m7a5_5 = {};
	};


	$.k2l.m7a5_5.draggedElement = {};
	$.k2l.m7a5_5.counter = 0;

	// $.k2l.m7a5_5.max = 5; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 5;
	var selector = "#m7a5_5";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a5_5",
		nextPage: "#m7a5_6"
	};
	initDragDrop(selector, dragDropAmount, options);
}



Template.m7a5_6.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a5_6");
	}
});


Template.m7a5_6.events({

	"click .pagination": function (evt) {
		$.k2l.m7a5_6.draggedElement = {};
		$.k2l.m7a5_6.counter = 0;
	}

});

Template.m7a5_6.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m7a5_6 == 'undefined') {
		$.k2l.m7a5_6 = {};
	};

	$.k2l.m7a5_6.draggedElement = {};
	$.k2l.m7a5_6.counter = 0;

	// $.k2l.m7a5_6.max = 3; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m7a5_6";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a5_6",
		nextPage: "#m7a5_7"
	};
	initDragDrop(selector, dragDropAmount, options);
}



Template.m7a5_7.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m7a5_7");
	}
});


Template.m7a5_7.events({

	//This code is commented out as it is not used anymore for mobile drag-drop activities.
	//It uses a "ghost" element that can get stuck on the screen causing very bad user experience and bugs.
	//It is left in case of major failiure as a back up code.


	// /************ ADD touchstart and touchmove WITH THE CORRECT CLASS ********/
	// "touchstart .ddsourceseated": function (evt) {
	// 	if ($.k2l.m7a5_7.isScrolling) {
	// 		clearTimeout($.k2l.m7a5_7.timer);
	// 	}
	// 	$.k2l.m7a5_7.draggedElement = evt.currentTarget;

	// 	var doc = document.documentElement;
	// 	var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
	// 	var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

	// 	var xPos = (evt.originalEvent.changedTouches[0].pageX - left) - ($(evt.currentTarget).width() / 2);
	// 	var yPos = (evt.originalEvent.changedTouches[0].pageY - top) - ($(evt.currentTarget).height() / 2);

	// 	$.k2l.m7a5_7.element = $($.k2l.m7a5_7.draggedElement).clone();

	// 	$($.k2l.m7a5_7.element).css('opacity', 0.8);
	// 	$($.k2l.m7a5_7.element).css('position', 'fixed');
	// 	$($.k2l.m7a5_7.element).css({ top: yPos, left: xPos });
	// 	$('#m7a5_7').append($.k2l.m7a5_7.element);
	// },

	// "touchmove .ddsourceseated": function (evt) {
	// 	evt.preventDefault();
	// 	var doc = document.documentElement;
	// 	var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
	// 	var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

	// 	var endTarget = document.elementFromPoint(
	// 		evt.originalEvent.changedTouches[0].pageX - left,
	// 		evt.originalEvent.changedTouches[0].pageY - top
	// 	);

	// 	var body = $('body');
	// 	var targetId = $(endTarget).attr('id');
	// 	touchScreenHandler.checkScroll($.k2l.m7a5_7, body, 3, targetId);


	// 	var xPos = (evt.originalEvent.changedTouches[0].pageX - left) - ($(evt.currentTarget).width() / 2);
	// 	var yPos = (evt.originalEvent.changedTouches[0].pageY - top) - ($(evt.currentTarget).height() / 2);
	// 	touchScreenHandler.dragGhost(xPos, yPos, $.k2l.m7a5_7.element, 0.8);

	// },
	// /*****************************************************************************************/

	// "touchend .ddsourceseated": function (evt) {
	// 	if ($.k2l.m7a5_7.isScrolling) {
	// 		clearTimeout($.k2l.m7a5_7.timer);
	// 	}
	// 	if (evt.stopPropagation) {
	// 		evt.stopPropagation();
	// 	};

	// 	/********************* ADD THESE LINES *************/
	// 	touchScreenHandler.removeGhost($.k2l.m7a5_7.element); // <-- CHANGE TO THIS ACTIVITY
	// 	$.k2l.m7a5_7.element = {};

	// 	var doc = document.documentElement;
	// 	var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
	// 	var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

	// 	var endTarget = document.elementFromPoint(
	// 		evt.originalEvent.changedTouches[0].pageX - left,
	// 		evt.originalEvent.changedTouches[0].pageY - top
	// 	);
	// 	/********************************************************/
	// 	if (!$(endTarget).hasClass('ddseatedtarget')) {
	// 		touchScreenHandler.removeGhost($.k2l.m7a5_7.element);

	// 	} else {
	// 		var destination = $.k2l.m7a5_7.draggedElement.getAttribute("data-destination");
	// 		// CHANGE evt.currentTarget to endTarget
	// 		if ($(endTarget).attr('id') == destination) {
	// 			var parentSection = $(evt.currentTarget).parents('section');
	// 			$.k2l.m7a5_7.counter++;
	// 			$.k2l.m7a5_7.draggedElement.draggable = false;

	// 			$('.correctscreen').removeClass('hidden');
	// 			setTimeout(function () {
	// 				$('.correctscreen').addClass('hidden');
	// 			}, 1000);

	// 			/********* ADD THIS LINE... **********/
	// 			sourceHTML = $($.k2l.m7a5_7.draggedElement).html();
	// 			$($.k2l.m7a5_7.draggedElement).html('');
	// 			$($.k2l.m7a5_7.draggedElement).removeClass('shadow');
	// 			$($.k2l.m7a5_7.draggedElement).removeClass('ddsourceseated');
	// 			$($.k2l.m7a5_7.draggedElement).addClass('ddsourceseated2');

	// 			/****** CHANGE EVT.CURRENTTARGET TO '#'+destination ******/
	// 			$('#' + destination).removeClass('ddwidth8 dd1line');
	// 			$('#' + destination).removeClass('ddseatedtarget');
	// 			$('#' + destination).addClass('ddseatedtarget2');
	// 			$('#' + destination).html('');
	// 			/****** ****************************/
	// 			var listItem = document.createElement('div');
	// 			$(listItem).html(sourceHTML); // CHANGE HERE
	// 			$(listItem).addClass('ddsource');
	// 			$(listItem).addClass('ddwidth8 dd1line');

	// 			// AND HERE
	// 			$('#' + destination).append(listItem);

	// 			if ($.k2l.m7a5_7.counter == $.k2l.m7a5_7.max) {
	// 				// Load the next page automatically
	// 				setTimeout(function () {
	// 					$('#welldonecap').removeClass('hidden');
	// 				}, 1000);
	// 				setTimeout(function () {
	// 					$('#welldonecap').addClass('hidden');
	// 				}, 2000);
	// 				setTimeout(function () {
	// 					$.k2l.m7a5_7.counter = 0;
	// 					$(parentSection).addClass('hidden'); // hide this page
	// 					$(parentSection).next('section').removeClass('hidden');// reveal next page.
	// 					document.location.hash = $(parentSection).next('section').attr('id');
	// 					Session.set("activeSection", '#' + $(parentSection).next('section').attr('id'));
	// 				}, 2000);
	// 				//Navigavtion to next page manually
	// 				//$('.pagination').removeClass('hidden');
	// 			};
	// 		} else {
	// 			$('.incorrectscreen').removeClass('hidden');
	// 			setTimeout(function () {
	// 				$('.incorrectscreen').addClass('hidden');
	// 			}, 1000);
	// 		};
	// 	}
	// },

	"click .pagination": function (evt) {
		$.k2l.m7a5_7.draggedElement = {};
		$.k2l.m7a5_7.counter = 0;
	}

});

Template.m7a5_7.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m7a5_7 == 'undefined') {
		$.k2l.m7a5_7 = {};
	};

	//This code is commented out as it is not used anymore for mobile drag-drop activities.
	//It uses a "ghost" element that can get stuck on the screen causing very bad user experience and bugs.
	//It is left in case of major failiure as a back up code.

	// /************* ADD THESE ***************/
	// $.k2l.m7a5_7.isScrolling = false;
	// $.k2l.m7a5_7.element = {};
	// /***************************************/

	$.k2l.m7a5_7.draggedElement = {};
	$.k2l.m7a5_7.counter = 0;

	// $.k2l.m7a5_7.max = 3; // number of drag spaces on this page.

	// Add drag and drop
	var dragDropAmount = 3;
	var selector = "#m7a5_7";
	var options = {
		multiAns: true,
		autoNav: true,
		currPage: "#m7a5_7",
		nextPage: "#m7a5_end"
	};
	initDragDrop(selector, dragDropAmount, options);
}



Template.m7a5.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 7, 5, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m7a5.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};
