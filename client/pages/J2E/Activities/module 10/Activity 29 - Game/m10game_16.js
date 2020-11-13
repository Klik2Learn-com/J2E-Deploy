Template.m10Game_16.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10Game_16"); 
	},

	ghost: function(){
		var r5Correct = Session.get('R5_Correct');
		return (r5Correct >= 2);
	}  
}); 
 
Template.m10Game_16.events({

	'click .buttonaudio': function(evt) {
		$.k2l.m10Game_16.sound.src = $(evt.currentTarget).attr('data-audiosrc');
		$.k2l.m10Game_16.sound.play();
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m10Game_16.sound.src = {};
	}

});

Template.m10Game_16.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10Game_16 == 'undefined') {
		$.k2l.m10Game_16 = {};
	};
	
	$.k2l.m10Game_16.sound = new Audio();
}
	