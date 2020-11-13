

Template.m2a11.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m2a11_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m2a11.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(2, 11);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 11, subpage);
			oldLocation = location.href;
		}
	}, 500);

}

Template.m2a11.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 11, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m2a11.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m2a11_2.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a11_2");
	}
});

Template.m2a11_2.events({

	'click .m2a11_2ans': function(evt){
		if($.k2l.m2a11_2.questionWordLock == false){
			$.k2l.m2a11_2.questionWordLock = true;
			var clickedAnswer = $(evt.currentTarget).attr('id');
			if (clickedAnswer == 'm2a11_2ans1') {
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
					$.k2l.m2a11_2.questionWordLock = false;
					$(evt.currentTarget).parents('section').addClass('hidden'); // hide this page
					$(evt.currentTarget).parents('section').next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(evt.currentTarget).parents('section').next('section').attr('id');
					Session.set("activeSection", "#" + $(evt.currentTarget).parents('section').next('section').attr('id'));
				}, 1000);
			} else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$('.incorrectscreen').addClass('hidden');
					$.k2l.m2a11_2.questionWordLock = false;
				}, 1000);
			}
		};
	}
});

Template.m2a11_2.rendered = function() {
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m2a11_2 == 'undefined') {
		$.k2l.m2a11_2 = {};
	};

  $.k2l.m2a11_2.questionWordLock = false;
};


Template.m2a11_3.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a11_3");
	}
});

Template.m2a11_3.events({

	'click .m2a11_3ans': function(evt){
		if($.k2l.m2a11_3.questionWordLock == false){
			$.k2l.m2a11_3.questionWordLock = true;
			var clickedAnswer = $(evt.currentTarget).attr('id');
			if (clickedAnswer == 'm2a11_3ans2') {
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
					$.k2l.m2a11_3.questionWordLock = false;
					$(evt.currentTarget).parents('section').addClass('hidden'); // hide this page
					$(evt.currentTarget).parents('section').next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(evt.currentTarget).parents('section').next('section').attr('id');
					Session.set("activeSection", "#" + $(evt.currentTarget).parents('section').next('section').attr('id'));
				}, 1000);
			} else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$('.incorrectscreen').addClass('hidden');
					$.k2l.m2a11_3.questionWordLock = false;
				}, 1000);
			}
		};
	}
});

Template.m2a11_3.rendered = function() {
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m2a11_3 == 'undefined') {
		$.k2l.m2a11_3 = {};
	};

  $.k2l.m2a11_3.questionWordLock = false;
};


Template.m2a11_4.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a11_4");
	}
});

Template.m2a11_4.events({

	'click .m2a11_4ans': function(evt){
		if($.k2l.m2a11_4.questionWordLock == false){
			$.k2l.m2a11_4.questionWordLock = true;
			var clickedAnswer = $(evt.currentTarget).attr('id');
			if (clickedAnswer == 'm2a11_4ans1') {
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
					$.k2l.m2a11_4.questionWordLock = false;
					$(evt.currentTarget).parents('section').addClass('hidden'); // hide this page
					$(evt.currentTarget).parents('section').next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(evt.currentTarget).parents('section').next('section').attr('id');
					Session.set("activeSection", "#" + $(evt.currentTarget).parents('section').next('section').attr('id'));
				}, 1000);
			} else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$('.incorrectscreen').addClass('hidden');
					$.k2l.m2a11_4.questionWordLock = false;
				}, 1000);
			}
		};
	}
});

Template.m2a11_4.rendered = function() {
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m2a11_4 == 'undefined') {
		$.k2l.m2a11_4 = {};
	};

  $.k2l.m2a11_4.questionWordLock = false;
};


Template.m2a11_5.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a11_5");
	}
});

Template.m2a11_5.events({

	'click .m2a11_5ans': function(evt){
		if($.k2l.m2a11_5.questionWordLock == false){
			$.k2l.m2a11_5.questionWordLock = true;
			var clickedAnswer = $(evt.currentTarget).attr('id');
			if (clickedAnswer == 'm2a11_5ans1') {
				$('.correctscreen').removeClass('hidden');
				setTimeout( function() {
					$('.correctscreen').addClass('hidden');
					$.k2l.m2a11_5.questionWordLock = false;
					$(evt.currentTarget).parents('section').addClass('hidden'); // hide this page
					$(evt.currentTarget).parents('section').next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(evt.currentTarget).parents('section').next('section').attr('id');
					Session.set("activeSection", "#" + $(evt.currentTarget).parents('section').next('section').attr('id'));
				}, 1000);
			} else {
				$('.incorrectscreen').removeClass('hidden');
				setTimeout( function() {
					$('.incorrectscreen').addClass('hidden');
					$.k2l.m2a11_5.questionWordLock = false;
				}, 1000);
			}
		};
	}
});

Template.m2a11_5.rendered = function() {
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};

	if (typeof $.k2l.m2a11_5 == 'undefined') {
		$.k2l.m2a11_5 = {};
	};

  $.k2l.m2a11_5.questionWordLock = false;
};

