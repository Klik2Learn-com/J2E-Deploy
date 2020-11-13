Template.m10Game_37.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10Game_37"); 
	},

	ghost: function(){
		var r11Correct = Session.get('R11_Correct');
		return (r11Correct >= 2);
	}  
}); 
 
Template.m10Game_37.events({

	'click .buttonaudio': function(evt) {
		$.k2l.m10Game_37.sound.src = $(evt.currentTarget).attr('data-audiosrc');
		$.k2l.m10Game_37.sound.play();
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m10Game_37.sound.src = {};
	}

});

Template.m10Game_37.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10Game_37 == 'undefined') {
		$.k2l.m10Game_37 = {};
	};
	
	$.k2l.m10Game_37.sound = new Audio();
}
	