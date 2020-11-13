Template.m10Game_10.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10Game_10"); 
	},

	ghost: function(){
		var r3Correct = Session.get('R3_Correct');
		return (r3Correct >= 2);
	} 
}); 
 
Template.m10Game_10.events({

	'click .buttonaudio': function(evt) {
		$.k2l.m10Game_10.sound.src = $(evt.currentTarget).attr('data-audiosrc');
		$.k2l.m10Game_10.sound.play();
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m10Game_10.sound.src = {};
	}

});

Template.m10Game_10.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10Game_10 == 'undefined') {
		$.k2l.m10Game_10 = {};
	};
	
	$.k2l.m10Game_10.sound = new Audio();
}
	