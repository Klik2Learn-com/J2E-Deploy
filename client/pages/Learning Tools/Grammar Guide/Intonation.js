Template.GGIntonation.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#GGIntonation"); 
	} 
}); 
 
Template.GGIntonation.events({

	'click .buttonaudio': function(evt) {
		$.k2l.GGIntonation.sound.src = $(evt.currentTarget).attr('data-audiosrc');
		addSpinner($.k2l.GGIntonation.sound,$(evt.currentTarget));
		$.k2l.GGIntonation.sound.play();
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.GGIntonation.sound.src = {};
	}

});

Template.GGIntonation.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.GGIntonation == 'undefined') {
		$.k2l.GGIntonation = {};
	};
	
	$.k2l.GGIntonation.sound = new Audio();
}
						