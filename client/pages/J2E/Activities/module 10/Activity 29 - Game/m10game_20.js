Template.m10Game_20.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10Game_20"); 
	},

	ghost: function(){
		var r6Correct = Session.get('R6_Correct');
		return (r6Correct >= 2);
	}  
}); 
 
Template.m10Game_20.events({

	'click .buttonaudio': function(evt) {
		$.k2l.m10Game_20.sound.src = $(evt.currentTarget).attr('data-audiosrc');
		$.k2l.m10Game_20.sound.play();
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m10Game_20.sound.src = {};
	}

});

Template.m10Game_20.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10Game_20 == 'undefined') {
		$.k2l.m10Game_20 = {};
	};
	
	$.k2l.m10Game_20.sound = new Audio();
}
	