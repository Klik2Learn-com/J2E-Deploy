Template.m2a9.helpers({
endPageSect: function() {
var session = Session.get('activeSection');
if (session == '#m2a9_end') {
 	return false;
	}
return true;
},

	
})

Template.m2a9.events({
	
	"click .button1": function(evt){
		if($(evt.currentTarget).attr('id') == $.k2l.m2a9.correctAnswers[$.k2l.m2a9.index]){
			$('.correctscreen').removeClass('hidden');
			setTimeout( function() {
				$('.correctscreen').addClass('hidden');
			}, 1000);
			var parentSection = $(evt.currentTarget).parents('section');
			setTimeout(function() {
					$(parentSection).addClass('hidden'); // hide this page
					$(parentSection).next('section').removeClass('hidden');// reveal next page.
					document.location.hash = $(parentSection).next('section').attr('id');
					Session.set("activeSection", '#'+$(parentSection).next('section').attr('id'));
					}, 1000);
			$.k2l.m2a9.index++;
		} else {
			$('.incorrectscreen').removeClass('hidden');
			setTimeout( function() {
				$('.incorrectscreen').addClass('hidden');
			}, 1000);
		}
	},

	
})

Template.m2a9.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(2, 9);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 9, subpage);
			oldLocation = location.href;
		}
	}, 500);


	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m2a9 == 'undefined') {
		$.k2l.m2a9 = {};
	};
	
	var correctAnswers = ["2","3","5","8","9","12"];
		
	$.k2l.m2a9.correctAnswers = correctAnswers;
	$.k2l.m2a9.index = 0;

}

Template.m2a9.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 9, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m2a9.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m2a9_3.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a9_3");
	}
});

Template.m2a9_4.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a9_4");
	}
});

Template.m2a9_5.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a9_5");
	}
});

Template.m2a9_6.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a9_6");
	}
});

Template.m2a9_7.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a9_7");
	}
});

Template.m2a9_8.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a9_8");
	}
});

Template.m2a9_9.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a9_9");
	}
});

Template.m2a9_10.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a9_10");
	}
});

Template.m2a9_11.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a9_11");
	}
});

Template.m2a9_12.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a9_12");
	}
});

Template.m2a9_13.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a9_13");
	}
});

Template.m2a9_14.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a9_14");
	}
});

Template.m2a9_15.helpers({
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a9_15");
	}
});
