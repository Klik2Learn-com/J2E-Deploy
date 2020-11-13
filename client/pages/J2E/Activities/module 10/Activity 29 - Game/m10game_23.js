Template.m10Game_23.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10Game_23"); 
	},

	ghost: function(){
		var r7Correct = Session.get('R7_Correct');
		return (r7Correct >= 2);
	}  
}); 
 
Template.m10Game_23.events({

	'click .buttonaudio': function(evt) {
		$.k2l.m10Game_23.sound.src = $(evt.currentTarget).attr('data-audiosrc');
		$.k2l.m10Game_23.sound.play();
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m10Game_23.sound.src = {};
	}

});

Template.m10Game_23.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10Game_23 == 'undefined') {
		$.k2l.m10Game_23 = {};
	};
	
	$.k2l.m10Game_23.sound = new Audio();
}
	