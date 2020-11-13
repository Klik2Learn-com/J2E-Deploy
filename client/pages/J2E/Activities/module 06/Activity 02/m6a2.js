
Template.para1_modal.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.para1_modal.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.para1_modal.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {
		$.k2l.para1_modal.sound.src = {};
		$(".buttonaudio").removeClass("is-playing");
	},

	'hide.bs.modal #para1_modal': function (evt) {
		$.k2l.para1_modal.sound.src = {};
		$(".buttonaudio").removeClass("is-playing");
	}

});

Template.para1_modal.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.para1_modal == 'undefined') {
		$.k2l.para1_modal = {};
	};

	$.k2l.para1_modal.sound = new Audio();
}


Template.para2_modal.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.para2_modal.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.para2_modal.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {
		$.k2l.para2_modal.sound.src = {};
		$(".buttonaudio").removeClass("is-playing");
	},
	'hide.bs.modal #para2_modal': function (evt) {
		$.k2l.para2_modal.sound.src = {};
		$(".buttonaudio").removeClass("is-playing");
	}

});

Template.para2_modal.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.para2_modal == 'undefined') {
		$.k2l.para2_modal = {};
	};

	$.k2l.para2_modal.sound = new Audio();
}


Template.para3_modal.events({

	'click .buttonaudio': function (evt) {
		audioButtonClickSetup($.k2l.para3_modal.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.para3_modal.sound, $(evt.currentTarget));
	},

	'click .pagination': function (evt) {
		$(".buttonaudio").removeClass("is-playing");
		$.k2l.para3_modal.sound.src = {};
	},
	'hide.bs.modal #para3_modal': function (evt) {
		$.k2l.para3_modal.sound.src = {};
		$(".buttonaudio").removeClass("is-playing");
	}

});

Template.para3_modal.rendered = function () {

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.para3_modal == 'undefined') {
		$.k2l.para3_modal = {};
	};

	$.k2l.para3_modal.sound = new Audio();
}

Template.m6a2.rendered = function () {
	document.title = "Journey 2 English";
	
	setStartActivity(6, 2);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(6, 2, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m6a2.helpers({
	endPageSect: function () {
		var session = Session.get('activeSection');
		if (session == '#m6a2_end') {
			return false;
		}
		return true;
	}
});

Template.m6a2_3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a2_3");
	}
});

Template.m6a2_2.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a2_2");
	}
});

Template.m6a2_1.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m6a2_1");
	}
});


Template.m6a2.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 6, 2, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m6a2.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m6a2_1.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 9;
	var selector = "#m6a2_1";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m6a2_2.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 13;
	var selector = "#m6a2_2";
	var options = {
		multiAns: true
	};
	initDragDrop(selector, dragDropAmount, options);
}

Template.m6a2_3.rendered = function () {
	// Add drag and drop
	var dragDropAmount = 8;
	var selector = "#m6a2_3";
	var options = {
		multiAns: false
	};
	initDragDrop(selector, dragDropAmount, options);
}