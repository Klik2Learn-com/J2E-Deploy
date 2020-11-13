Template.m10Game_34.helpers({ 
	activeSection: function(){ 
		var activeSection = Session.get("activeSection"); 
		return (activeSection == "#m10Game_34"); 
	},

	ghost: function(){
		var r10Correct = Session.get('R10_Correct');
		return (r10Correct >= 2);
	}  
}); 
 
Template.m10Game_34.events({

	'click .buttonaudio': function(evt) {
		$.k2l.m10Game_34.sound.src = $(evt.currentTarget).attr('data-audiosrc');
		$.k2l.m10Game_34.sound.play();
	},
	
	'click .pagination': function(evt) {
		
		$.k2l.m10Game_34.sound.src = {};
	}

});

Template.m10Game_34.rendered = function() {

	if(typeof $.k2l == 'undefined'){
		$.k2l = {};
	};
	
	if (typeof $.k2l.m10Game_34 == 'undefined') {
		$.k2l.m10Game_34 = {};
	};
	
	$.k2l.m10Game_34.sound = new Audio();
}
	