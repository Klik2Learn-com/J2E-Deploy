

Template.m2a23.helpers({ 
	endPageSect: function() { 
		var session = Session.get('activeSection'); 
		if (session == '#m2a23_end') { 
			return false; 
		}		return true;	 
  } 
});

Template.m2a23.rendered = function() {
	document.title = "Journey 2 English";
	
	setStartActivity(2, 23);

	var oldLocation = location.href;
	$.locationInterval = setInterval( function() {
		if(location.href != oldLocation) {
			subpage = location.href.split("#")[1];
			setLatestSubPage(2, 23, subpage);
			oldLocation = location.href;
		}
	}, 500);

	$("#m2a24_modal").on("click",function(event){
		if(event.target == this || $(event.target).is('span')){
			$("#m2a24_modal video")[0].pause();
		}
	});

}

Template.m2a23.created = function() {
	this.subscribe("userProgress");
	this.subscribe("pauseConnection", 2, 23, Meteor.userId());
  Session.set('dirty', true);
  window.addEventListener("beforeunload", beforeUnloadConfirm);
};

Template.m2a23.destroyed = function() {
	clearInterval($.locationInterval);
	window.removeEventListener("beforeunload", beforeUnloadConfirm);
	Session.set('dirty', false);
};

Template.m2a23_1.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a23_1");
	}
})

Template.m2a24.events({
	
	"click #m2a23hearagain": function(evt) {
		setTimeout(function(){
			$("#m2a24_modal video")[0].play();
		}, 500);
	}
	
})

Template.m2a23_1.events({

	'click .buttonaudioc': function(evt) {
		;
		audioButtonClickSetup($.k2l.m2a23_1.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a23_1.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m2a23_1.sound.src = {};
	}

});

Template.m2a23_1.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m2a23_1 == 'undefined') {
		$.k2l.m2a23_1 = {};
	};
	
	$.k2l.m2a23_1.sound = new Audio();
}

Template.m2a23_2.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a23_2");
	}
})

Template.m2a23_2.events({

	'click .buttonaudioc': function(evt) {
		;
		audioButtonClickSetup($.k2l.m2a23_2.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a23_2.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m2a23_2.sound.src = {};
	}

});

Template.m2a23_2.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m2a23_2 == 'undefined') {
		$.k2l.m2a23_2 = {};
	};
	
	$.k2l.m2a23_2.sound = new Audio();

	$("#m2a24_modal").on("click",function(event){
		if(event.target == this || $(event.target).is('span')){
			$("#m2a24_modal video")[0].pause();
		}
	});
}

Template.m2a23_3.helpers({
	
	activeSection: function(){
		var activeSection = Session.get("activeSection");
		return (activeSection == "#m2a23_3");
	}
});

Template.m2a23_3.events({
	
	"click #hint": function(evt) {
		$('#hint').addClass('hidden');
		$('#stuck').removeClass('hidden');
	},
	
	"click .pagination": function(evt){
		$('#hint').removeClass('hidden');
		$('#stuck').addClass('hidden');
	}
	
	
});

Template.m2a23_3.rendered = function() {
	
	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m2a23_3 == 'undefined') {
		$.k2l.m2a23_3 = {};
	};
	
}

Template.m2a23_4.helpers({
	activeSection: function(){
		var activeSection = Session.get('activeSection');
		return (activeSection == "#m2a23_4");
	}
})

Template.m2a23_4.events({

	'click .buttonaudio': function(evt) {
		audioButtonClickSetup($.k2l.m2a23_4.sound, $(evt.currentTarget));
		playPauseAudio($.k2l.m2a23_4.sound, $(evt.currentTarget));
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m2a23_4.sound.src = {};
	}

});

Template.m2a23_4.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m2a23_4 == 'undefined') {
		$.k2l.m2a23_4 = {};
	};
	
	$.k2l.m2a23_4.sound = new Audio();
}
