Template.m10Game_13.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10Game_13"); 
	},

	ghost: function(){
		var r4Correct = Session.get('R4_Correct');
		return (r4Correct >= 2);
	}  
}); 
 
Template.m10Game_13.events({

	'click .buttonaudio': function(evt) {
		$.k2l.m10Game_13.sound.src = $(evt.currentTarget).attr('data-audiosrc');
		$.k2l.m10Game_13.sound.play();
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m10Game_13.sound.src = {};
	}

});

Template.m10Game_13.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10Game_13 == 'undefined') {
		$.k2l.m10Game_13 = {};
	};
	
	$.k2l.m10Game_13.sound = new Audio();
}
	