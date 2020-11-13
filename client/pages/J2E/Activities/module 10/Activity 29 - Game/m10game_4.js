Template.m10Game_4.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10Game_4"); 
	},

	ghost: function(){
		var r1Correct = Session.get('R1_Correct');
		return (r1Correct >= 2);
	} 
}); 
 
Template.m10Game_4.events({

	'click .buttonaudio': function(evt) {
		$.k2l.m10Game_4.sound.src = $(evt.currentTarget).attr('data-audiosrc');
		$.k2l.m10Game_4.sound.play();
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m10Game_4.sound.src = {};
	}

});

Template.m10Game_4.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10Game_4 == 'undefined') {
		$.k2l.m10Game_4 = {};
	};
	
	$.k2l.m10Game_4.sound = new Audio();
}
	