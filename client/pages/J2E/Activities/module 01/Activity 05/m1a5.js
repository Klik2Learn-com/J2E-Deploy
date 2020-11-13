
Template.m1a5.rendered = function () {
	setStartActivity(1, 5);

	var oldLocation = location.href;
	$.locationInterval = setInterval(function () {
		if (location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(1, 5, subpage);
			oldLocation = location.href;
		}
	}, 500);

	if (typeof $.k2l == 'undefined') {
		$.k2l = {};
	};

	if (typeof $.k2l.m1a5 == 'undefined') {
		$.k2l.m1a5 = {};
	};
	$.k2l.m1a5.buttonUnlocked = true;
	$.k2l.m1a5.sound = new Audio();

    document.title = "Journey 2 English";

}

Template.m1a5.helpers({
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a5");
	}
});

Template.m1a5.events({

	'click .buttonaudio': function (evt) {
		if ($.k2l.m1a5.buttonUnlocked) {
			audioButtonClickSetup($.k2l.m1a5.sound, $(evt.currentTarget));
			playPauseAudio($.k2l.m1a5.sound, $(evt.currentTarget));
		}
	},

	'click .pagination': function (evt) {

		$.k2l.m1a5.sound.src = {};
	}

});

Template.m1a5.created = function () {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 1, 5, Meteor.userId());
	Session.set('dirty', true);
	window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m1a5.destroyed = function () {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};


// Template.m1a5.rendered = function() {

//  }

// Template.m1a5.helpers({ 
// 	activeSection: function(){ 
// 		var activeSection = Session.get("activeSection"); 
// 		return (activeSection == "#m1a5"); 
// 	} 
// }); 

// Template.m1a5.events({

// 	'click .buttonaudio': function(evt) {
// 		$.k2l.m1a5.sound.src = $(evt.currentTarget).attr('data-audiosrc');
// 		$.k2l.m1a5.sound.play();
// 	},

// 	'click .pagination': function(evt) {

// 		$.k2l.m1a5.sound.src = {};
// 	}

// });

// Template.m1a5.rendered = function() {

// 	if(typeof $.k2l == 'undefined'){
// 		$.k2l = {};
// 	};

// 	if (typeof $.k2l.m1a5 == 'undefined') {
// 		$.k2l.m1a5 = {};
// 	};

// 	$.k2l.m1a5.sound = new Audio();
// }

Template.m1a5_7animation.helpers({
	// We use this trick to force the template to rerender
	// We include handlebar logic in the html for this e.g. {{#if activeSection}}
	activeSection: function () {
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m1a5_7");
	}
});

Template.m1a5_7animation.events({
	// We now select by class rather than id so we only need 1 event handler fdefinition intead of 10
	// This technique would be the same in jQuery

	"click #m5a7_audio_button": function (evt) {

		if ($.k2l.m1a5.buttonUnlocked) {
			$.k2l.m1a5.buttonUnlocked = false;

			audioButtonClickSetup($.k2l.m1a5.sound, $(evt.currentTarget));
			playPauseAudio($.k2l.m1a5.sound, $(evt.currentTarget));

			$("#numWord1").addClass('grammar');

			setTimeout(function () {
				$("#numWord1").removeClass('grammar');

				$("#numWord2").addClass('grammar');

			}, 1500);
			setTimeout(function () {
				$("#numWord2").removeClass('grammar');

				$("#numWord3").addClass('grammar');
			}, 2500);
			setTimeout(function () {
				$("#numWord3").removeClass('grammar');
				$.k2l.m1a5.buttonUnlocked = true;
			}, 3500);
		}

	}

});
