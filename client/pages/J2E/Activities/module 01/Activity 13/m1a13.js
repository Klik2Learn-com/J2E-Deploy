Template.m1a13.events({
	
	"click #1": function(evt){
		
		
		if ($(evt.currentTarget).parents('section').attr('id') == "m1a13_2"){
			$.k2l.m1a13.handwriting_1 = 0;
			$.k2l.m1a13.handwriting_2 = 0;
			$.k2l.m1a13.handwriting_3 = 0;
			Session.set('handwriting_1', $.k2l.m1a13.handwriting_1);
			Session.set('handwriting_2', $.k2l.m1a13.handwriting_2);
			Session.set('handwriting_3', $.k2l.m1a13.handwriting_3);
		}
		$.k2l.m1a13.handwriting_1 += 1;
		Session.set('handwriting_1', $.k2l.m1a13.handwriting_1);
		$(evt.currentTarget).parents('section').addClass('hidden');
		$(evt.currentTarget).parents('section').next('section').removeClass('hidden');
		},
	
	"click #2": function(evt){
		if ($(evt.currentTarget).parents('section').attr('id') == "m1a13_2"){
			$.k2l.m1a13.handwriting_1 = 0;
			$.k2l.m1a13.handwriting_2 = 0;
			$.k2l.m1a13.handwriting_3 = 0;
			Session.set('handwriting_1', $.k2l.m1a13.handwriting_1);
			Session.set('handwriting_2', $.k2l.m1a13.handwriting_2);
			Session.set('handwriting_3', $.k2l.m1a13.handwriting_3);
		}
		$.k2l.m1a13.handwriting_2 += 1;
		Session.set('handwriting_2', $.k2l.m1a13.handwriting_2);
		$(evt.currentTarget).parents('section').addClass('hidden');
		$(evt.currentTarget).parents('section').next('section').removeClass('hidden');
	},
	
	"click #3": function(evt){
		if ($(evt.currentTarget).parents('section').attr('id') == "m1a13_2"){
			$.k2l.m1a13.handwriting_1 = 0;
			$.k2l.m1a13.handwriting_2 = 0;
			$.k2l.m1a13.handwriting_3 = 0;
			Session.set('handwriting_1', $.k2l.m1a13.handwriting_1);
			Session.set('handwriting_2', $.k2l.m1a13.handwriting_2);
			Session.set('handwriting_3', $.k2l.m1a13.handwriting_3);
		}
		$.k2l.m1a13.handwriting_3 += 1;
		Session.set('handwriting_3', $.k2l.m1a13.handwriting_3);
		$(evt.currentTarget).parents('section').addClass('hidden');
		$(evt.currentTarget).parents('section').next('section').removeClass('hidden');
	}
});

Template.m1a13.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	}
	
	if (typeof $.k2l.m1a13 == 'undefined') {
		$.k2l.m1a13 = {};
	};
	
	$.k2l.m1a13.handwriting_1 = 0;
	$.k2l.m1a13.handwriting_2 = 0;
	$.k2l.m1a13.handwriting_3 = 0;

	setStartActivity(1, 13);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(1, 13, subpage);
			oldLocation = location.href;
		}
	}, 500);

    document.title = "Journey 2 English";

	
}

Template.m1a13.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m1a13_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m1a13.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 1, 13, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m1a13.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m1a13_6.helpers({

	// helper for displaying how many times each was clicked
	// for m1a13_6 page.
	handwriting1: function (){
		var temp = Session.get('handwriting_1');
		return temp;
	},

	handwriting2: function (){
		var temp = Session.get('handwriting_2');
		return temp;
	},

	handwriting3: function (){
		var temp = Session.get('handwriting_3');
		return temp;
	},

	visibleResult1: function(){
	var temp = Session.get('handwriting_1');
	if (temp < 2) {
		return "capfade";
	}
},

	visibleResult2: function(){
		var temp = Session.get('handwriting_2');
		if (temp < 2) {
			return "capfade";
		}
	},

	visibleResult3: function(){
		var temp = Session.get('handwriting_3');
		if (temp < 2) {
			return "capfade";
		}
	}
});

