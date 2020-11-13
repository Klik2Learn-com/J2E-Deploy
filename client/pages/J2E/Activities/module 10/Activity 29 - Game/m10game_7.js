Template.m10Game_7.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10Game_7"); 
	},

	ghost: function(){
		var r2Correct = Session.get('R2_Correct');
		return (r2Correct >= 2);
	} 
}); 
 
Template.m10Game_7.events({

	'click .buttonaudio': function(evt) {
		$.k2l.m10Game_7.sound.src = $(evt.currentTarget).attr('data-audiosrc');
		$.k2l.m10Game_7.sound.play();
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m10Game_7.sound.src = {};
	}

});

Template.m10Game_7.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10Game_7 == 'undefined') {
		$.k2l.m10Game_7 = {};
	};
	
	$.k2l.m10Game_7.sound = new Audio();
}
	